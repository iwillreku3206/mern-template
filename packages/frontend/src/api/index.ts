import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import auth from './auth'

export type setupReturnType = 'needSetup' | 'needAuth' | 'loggedIn'

export default class API {
	private baseUri: string = '/api'
	private apiUser: string | undefined
	private apiKey: string | undefined
	isLoggedIn: boolean
	private isFirstTime: boolean | undefined

	public auth

	constructor() {
		// check if logged in
		const [username, key] = [
			localStorage.getItem('api-username'),
			localStorage.getItem('api-key'),
		]

		if (username && key) {
			this.isLoggedIn = true
			this.apiUser = username
			this.apiKey = key
		} else {
			this.isLoggedIn = false
		}

		this.auth = auth(this)
	}

	login(username: string, key: string) {
		this.apiUser = username
		this.apiKey = key

		localStorage.setItem('api-username', username)
		localStorage.setItem('api-key', key)
	}

	clearLogin() {
		this.apiUser = undefined
		this.apiKey = undefined
		localStorage.removeItem('api-username')
		localStorage.removeItem('api-key')
	}

	async setup(): Promise<setupReturnType> {
		// check if first time
		this.isFirstTime = (await this.get('/auth/check-firsttime', false))
			.data as boolean

		if (this.isFirstTime) return 'needSetup'

		if (!this.isLoggedIn) return 'needAuth'

		return 'loggedIn'
	}

	async get<T>(
		uri: string,
		authNeeded: boolean = true
	): Promise<AxiosResponse<T>> {
		if (authNeeded) {
			return axios.get<T>(this.baseUri + uri, {
				headers: {
					'x-auth-username': this.apiUser || '',
					'x-auth-key': this.apiKey || '',
				},
			})
		}
		return Promise.resolve(axios.get<T>(this.baseUri + uri))
	}

	async post<T>(uri: string, data: any, authNeeded: boolean = true) {
		if (authNeeded) {
			return axios.post<T>(this.baseUri + uri, data, {
				headers: {
					'x-auth-username': this.apiUser || '',
					'x-auth-key': this.apiKey || '',
				},
			})
		} else {
			return axios.post<T>(this.baseUri + uri, data)
		}
	}

	async postRaw<T>(uri: string, data: any, authNeeded: boolean = true) {
		if (authNeeded) {
			return axios({
				method: 'post',
				baseURL: this.baseUri + uri,
				data,
				headers: {
					'Context-Type': 'text/plain',
					'x-auth-username': this.apiUser || '',
					'x-auth-key': this.apiKey || '',
				},
			} as AxiosRequestConfig<T>)
		} else {
			return axios({
				method: 'post',
				baseURL: this.baseUri + uri,
				data,
				headers: {
					'Context-Type': 'text/plain',
				},
			} as AxiosRequestConfig<T>)
		}
	}

	async put<T>(uri: string, data: any, authNeeded: boolean = true) {
		if (authNeeded) {
			return axios.put<T>(this.baseUri + uri, data, {
				headers: {
					'x-auth-username': this.apiUser || '',
					'x-auth-key': this.apiKey || '',
				},
			})
		} else {
			return axios.put<T>(this.baseUri + uri, data)
		}
	}

	async putRaw<T>(uri: string, data: any, authNeeded: boolean = true) {
		if (authNeeded) {
			return axios({
				method: 'put',
				baseURL: this.baseUri + uri,
				data,
				headers: {
					'Context-Type': 'text/plain',
					'x-auth-username': this.apiUser || '',
					'x-auth-key': this.apiKey || '',
				},
			} as AxiosRequestConfig<T>)
		} else {
			return axios({
				method: 'put',
				baseURL: this.baseUri + uri,
				data,
				headers: {
					'Context-Type': 'text/plain',
				},
			} as AxiosRequestConfig<T>)
		}
	}

	async delete<T>(uri: string, data: any, authNeeded: boolean = true) {
		if (authNeeded) {
			return axios.delete<T>(this.baseUri + uri, {
				headers: {
					'x-auth-username': this.apiUser || '',
					'x-auth-key': this.apiKey || '',
				},
				data,
			})
		} else {
			return axios.delete<T>(this.baseUri + uri, { data })
		}
	}
}
