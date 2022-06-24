export default interface ConfigSchema {
	Web: WebSettings
	Database: DatabaseSettings
}

export interface DatabaseSettings {
	MongoUri: string
	DbName: string
}

export interface WebSettings {
	HttpPort: number
	WebBuildDir: string
	WebBuildDirRelative: boolean
}