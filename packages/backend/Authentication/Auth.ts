import { compareSync, hashSync } from 'bcrypt'
import crypto from 'crypto'
import { NextFunction, Request, Response } from 'express'
import connectToDatabase from '../Database/Connection'
import { AuthUser, AuthUserSchema } from '../Database/Schemas/AuthUser'

export default class Auth {
	/**
	 *
	 * @param username username of user
	 * @param key api key of user
	 * @returns if the user has access
	 * @description This method verifies if a user has access to the APi
	 */
	public async userExists(username: string): Promise<boolean> {
		return connectToDatabase<Promise<boolean>>(async (db) => {
			const authCollection = db.collection('auth')
			return authCollection
				.findOne({
					username: username,
				})
				.then((d) => {
					if (d) return true
					return false
				})
				.catch(() => {
					return false
				})
		})
	}

	/**
	 * @description Authentication middleware
	 */
	public isAuthenticated = (
		request: Request,
		response: Response,
		next: NextFunction
	) => {
		const username = request.get('x-auth-username')
		const key = request.get('x-auth-key')

		if (username === undefined || key === undefined) {
			response.status(401)
			response.send('X-Auth-Username or X-Auth-Key fields not set')
			return
		}

		this.hasAccess(username, key).then((authorized) => {
			if (authorized) next()
			else {
				response.status(401)
				response.send('Invalid key or username!')
				return
			}
		})
	}

	public async hasAccess(username: string, key: string): Promise<boolean> {
		const user = await connectToDatabase<Promise<AuthUser | undefined>>(
			async (db) => {
				const authCollection = db.collection('auth')
				return authCollection
					.findOne({
						username: username,
					})
					.then((document) => {
						return document as unknown as AuthUser
					})
					.catch(() => {
						return undefined
					})
			}
		)

		if (user) return compareSync(key, user.hashedKey)
		return false
	}

	public async addKey(username: string): Promise<string> {
		return connectToDatabase((db) => {
			const key = crypto.randomBytes(18).toString('base64')

			console.log(username)

			const userObject = {
				username,
				hashedKey: hashSync(key, 10),
			}

			if (AuthUserSchema.validate(userObject).error)
				throw new Error('Invalid Username!')

			db.collection('auth').insertOne(userObject)

			return key
		})
	}

	public async hasKeys(): Promise<boolean> {
		return connectToDatabase(async (db) => {
			const count = await db.collection('auth').countDocuments({}, { limit: 1 })

			return count > 0
		})
	}
}
