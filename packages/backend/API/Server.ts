import cors from 'cors'
import express from 'express'
import { ConfigObject } from '..'
import Auth from '../Authentication/Auth'
import AuthRouter from './Routes/AuthRouter'
import PingRouter from './Routes/PingRouter'
import WebRoutes from './Routes/WebRoutes'

export const AuthObject = new Auth()

export default class Server {
	api = express()

	constructor() {
		this.api.use(express.json())
		this.api.use(express.text())
		this.api.use(express.urlencoded({ extended: true }))
		this.api.use(cors())
	}

	async registerRoutes() {
		this.api.use('/ping', PingRouter)
		this.api.use('/api/auth', AuthRouter())
		WebRoutes(this.api)
	}

	public async Start() {
		const port = ConfigObject.config.Web.HttpPort
		await this.registerRoutes()
		this.api.listen(port, () => {
			console.log(`Listening on port ${port}`)
		})
	}
}
