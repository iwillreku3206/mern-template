import {
	Box,
	Button,
	Container,
	Grid,
	Paper,
	TextField,
	Typography,
} from '@mui/material'
import { red } from '@mui/material/colors'
import React, { FormEvent, useContext, useState } from 'react'
import { APIContext } from '../../App'

interface Props {
	done: () => void
}

interface FormData {
	username: string
	key: string
}

const Login = (props: Props) => {
	const API = useContext(APIContext)

	const [formData, setFormData] = useState<FormData>({
		username: '',
		key: '',
	})

	const [freezeTextFields, setFreezeTextFields] = useState(false)
	const [error, setError] = useState(false)

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault()
		setFreezeTextFields(true)
		setError(false)

		API.login(formData.username, formData.key)

		const correctCredentials = await API.get<boolean>(
			'/auth/test-auth',
			true
		).catch((error) => {
			console.error(error)
			setError(true)
			setFreezeTextFields(false)
			API.clearLogin()
		})

		if (correctCredentials) {
			setError(!correctCredentials.data)
			setFreezeTextFields(false)

			if (correctCredentials.data) {
				props.done()
			}
		}
	}
	return (
		<Container>
			<Box pt={10}>
				<Paper>
					<Box p={3}>
						<Typography variant="h4">Login to MERN Template</Typography>
						<br />
						<form onSubmit={handleSubmit}>
							<Grid container gap={2}>
								<Grid item xs={12}>
									<TextField
										label="Username"
										fullWidth
										value={formData.username}
										onChange={(e) =>
											setFormData({ ...formData, username: e.target.value })
										}
										disabled={freezeTextFields}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										label="Key"
										fullWidth
										value={formData.key}
										onChange={(e) =>
											setFormData({ ...formData, key: e.target.value })
										}
										disabled={freezeTextFields}
									/>
								</Grid>
							</Grid>
							<Button type="submit" disabled={freezeTextFields}>
								Submit
							</Button>
							{error && (
								<Typography variant="caption" color={red[400]}>
									Incorrent Username/API key. Check log for details
								</Typography>
							)}
						</form>
					</Box>
				</Paper>
			</Box>
		</Container>
	)
}

export default Login
