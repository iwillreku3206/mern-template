import { Box, Drawer, Typography } from '@mui/material'
import React from 'react'
import DrawerItem from './drawerItem'

interface Props {
	open: boolean
	setOpen: (open: boolean) => void
	navigationHandler: (route: string) => () => void
}

export const pages = [
	{
		displayName: 'Home',
		route: '/',
	},
]

export const CurrentPage = (route: string) =>
	pages.find((page) => page.route === route)?.displayName || ''

const NavigationDrawer = (props: Props) => {
	const { open, setOpen, navigationHandler } = props
	return (
		<Drawer
			anchor="left"
			open={open}
			onClose={() => {
				setOpen(false)
			}}>
			<Box>
				<Typography variant="h6" padding="1em" minWidth="250px">
					Navigation
				</Typography>
				<hr />
				{pages.map((page) => (
					<DrawerItem
						displayName={page.displayName}
						navigationHandler={navigationHandler(page.route)}
					/>
				))}
			</Box>
		</Drawer>
	)
}

export default NavigationDrawer
