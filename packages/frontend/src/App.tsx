import {
	CircularProgress,
	createTheme,
	CssBaseline,
	Grid,
	ThemeProvider,
	Typography,
	useMediaQuery,
} from '@mui/material'
import React, { createContext, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import API, { setupReturnType } from './api'
import Dashboard from './pages/dashboard'
import Login from './pages/login'
import Setup from './pages/setup'

export const APIContext = createContext<API>(new API())

function App() {
	const dark = useMediaQuery('(prefers-color-scheme: dark)')

	const theme = createTheme({
		palette: {
			mode: dark ? 'dark' : 'light',
		},
	})

	const [api, setAPI] = useState<API>()

	const [apiState, setApiState] = useState<setupReturnType>()

	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const api = new API()
		setLoading(true)
		api.setup().then((returnType) => {
			setAPI(api)
			setApiState(returnType)
			setLoading(false)
		})
	}, [])

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{loading && (
				<Grid
					container
					alignItems="center"
					justifyContent="center"
					style={{ minHeight: '100vh' }}
					direction="column"
					gap={2}>
					<CircularProgress /> <br />
					<Typography variant="caption">Loading...</Typography>
				</Grid>
			)}
			{apiState === 'needSetup' && (
				<Setup
					done={() => {
						setApiState('needAuth')
					}}
				/>
			)}
			{apiState === 'needAuth' && (
				<Login
					done={() => {
						setApiState('loggedIn')
					}}
				/>
			)}
			{api && apiState === 'loggedIn' && (
				<APIContext.Provider value={api}>
					<CssBaseline />
					<BrowserRouter>
						<Dashboard />
					</BrowserRouter>
				</APIContext.Provider>
			)}
		</ThemeProvider>
	)
}

export default App
