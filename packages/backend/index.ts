import os from 'os'
import Server from './API/Server'
import Config from './Config/Config'

console.log('Starting up...')
console.log(`Detected platform: ${os.platform}`)
console.log(`Detected platform version: ${os.release}`)
console.log(`Detected arch: ${os.arch}`)
console.log(`Detected node version: ${process.version}`)
console.log(`Detected environment: ${process.env.NODE_ENV || 'production'}`)

console.log('Loading Settings...')

// this object can be imported in other classes/functions
export const ConfigObject = new Config()

console.log(
	`Detected DB info: \n Name: ${ConfigObject.config.Database.DbName}\n URI: ${ConfigObject.config.Database.MongoUri}`
)

console.log('Starting express server...')
const server = new Server()
server.Start()
