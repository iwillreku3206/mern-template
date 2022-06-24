import { Box, Container, Typography } from '@mui/material'
import React from 'react'

const Home = () => {
	return (
		<Container>
			<Box padding={2}>
				<Typography variant="h3">MERN Template</Typography>
				<Typography>
					Try editing <code>src/packages/frontend/pages/home/index.tsx</code> to
					get started
				</Typography>
			</Box>
		</Container>
	)
}

export default Home
