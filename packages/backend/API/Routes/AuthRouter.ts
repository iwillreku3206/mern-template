import { Request, Response, Router } from 'express'
import { AuthObject } from '../Server'

export default () => {
	const router = Router()
	router.post(
		'/add-key-firsttime',
		async (request: Request, response: Response) => {
			if (await AuthObject.hasKeys()) {
				response.status(403)
				response.send('ERROR: database already has keys')
				return
			}

			const key = await AuthObject.addKey(Object.keys(request.body)[0]).catch(
				(error) => {
					console.error(error)
					response.status(422)
					response.send('Invalid username or server error!')
					return
				}
			)
			response.status(201)
			response.send(key)
		}
	)

	router.get(
		'/check-firsttime',
		async (_request: Request, response: Response) => {
			AuthObject.hasKeys()
				.then((hasKeys) => {
					response.status(200)
					response.send(!hasKeys)
				})
				.catch((reason) => {
					console.error(reason)
					response.status(500)
					response.send(true)
				})
		}
	)

	router.get(
		'/test-auth',
		AuthObject.isAuthenticated,
		(_request: Request, response: Response) => {
			response.send(true)
		}
	)

	router.post(
		'/add-key',
		AuthObject.isAuthenticated,
		async (request: Request, response: Response) => {
			// check if valid username
			if (!/[A-z0-9]/.test(request.body)) {
				response.status(422)
				response.send('Invalid username!')
				return
			}

			// check if user exists
			if (await AuthObject.userExists(request.body)) {
				response.status(409)
				response.send('User already exists!')
				return
			}

			const key = await AuthObject.addKey(request.body).catch((error) => {
				console.error(error)
				response.send(500)
				response.send('Error processing request')
				return
			})

			response.status(201)
			response.send(key)
		}
	)

	return router
}
