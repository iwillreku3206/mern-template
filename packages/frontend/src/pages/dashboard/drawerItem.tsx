import { Box, ListItemButton, ListItemText } from '@mui/material'
import React from 'react'

interface Props {
	displayName: string
	navigationHandler: () => void
}

const DrawerItem = (props: Props) => {
	const { navigationHandler, displayName } = props
	return (
		<ListItemButton key={displayName} onClick={navigationHandler}>
			<Box padding="0.25em">
				<ListItemText primary={displayName} />
			</Box>
		</ListItemButton>
	)
}

export default DrawerItem
