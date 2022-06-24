import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import path from 'path'
import { ConfigObject } from '../..'

export default (server: express.Express) => {
	if (process.env.NODE_ENV == 'development') {
		server.use(
			'/',
			createProxyMiddleware({
				target: 'http://127.0.0.1:3000',
				changeOrigin: true,
			})
		)
	} else {
		const webCfg = ConfigObject.config.Web
		server.use(
			'/',
			express.static(
				webCfg.WebBuildDirRelative
					? path.resolve(__dirname, webCfg.WebBuildDir)
					: webCfg.WebBuildDir
			)
		)
	}
}
