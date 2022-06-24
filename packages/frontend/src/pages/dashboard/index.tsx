import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Home from '../home'
import NavigationDrawer, { CurrentPage } from './navigationDrawer'

const Dashboard = () => {
	const [navigationOpen, setNavigationOpen] = useState(false)

	const toggleNavigationOpen = () => setNavigationOpen(!navigationOpen)

	const navigate = useNavigate()

	const navigationHandler = (route: string) => () => {
		navigate(route)
		setNavigationOpen(false)
	}

	const location = useLocation()

	return (
		<>
			<AppBar position="sticky">
				<Toolbar>
					<IconButton onClick={toggleNavigationOpen}>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6">{CurrentPage(location.pathname)}</Typography>
				</Toolbar>
			</AppBar>
			<NavigationDrawer
				navigationHandler={navigationHandler}
				open={navigationOpen}
				setOpen={setNavigationOpen}
			/>
			<Box pt={1}>
				<Routes>
					<Route path="/">
						<Route index element={<Home />} />
					</Route>
				</Routes>
			</Box>
		</>
	)
}

export default Dashboard
