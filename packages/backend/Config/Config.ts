import fs from 'fs'
import ini from 'ini'
import os from 'os'
import path from 'path'
import ConfigSchema from './ConfigSchema'

export default class Config {
	configPath: string
	configData: string
	config: ConfigSchema

	constructor() {
		this.configPath = path.resolve(
			os.homedir(),
			'mern-template-app',
			'config.ini'
		)
		try {
			this.configData = fs.readFileSync(this.configPath).toString()
		} catch (e) {
			console.error('No config file found!')
			this.configData = fs
				.readFileSync(path.join(__dirname, 'fallback.ini'))
				.toString()
		}

		this.config = ini.parse(this.configData) as ConfigSchema
	}
}
