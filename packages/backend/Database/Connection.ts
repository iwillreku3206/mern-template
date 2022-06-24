import { Db, MongoClient } from 'mongodb'
import { ConfigObject } from '..'

/**
 *
 * @param callback function to run with client
 * @description This function connects to the database and performs actions on it
 */
export default async function connectToDatabase<T>(
	callback: (db: Db) => T
): Promise<T> {
	const connectionUri = ConfigObject.config.Database.MongoUri

	const client = new MongoClient(connectionUri)

	await client.connect()

	const db = client.db(ConfigObject.config.Database.DbName)

	return Promise.resolve(callback(db)).then((cbOut: T) => {
		return cbOut
	})
}
