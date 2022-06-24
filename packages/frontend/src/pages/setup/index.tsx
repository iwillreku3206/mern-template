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

interface FormData {
	username: string
}

interface Props {
	done: () => void
}

const Setup = (props: Props) => {
	const { done } = props
	const [formData, setFormData] = useState<FormData>({
		username: '',
	})

	const [apiKey, setApiKey] = useState<string>()
	const [error, setError] = useState(false)
	const [freezeTextFields, setFreezeTextFields] = useState(false)

	const API = useContext(APIContext)

	const handleSetup = async (event: FormEvent) => {
		event.preventDefault()
		setFreezeTextFields(true)
		setError(false)
		API.auth
			.addFirstTimeUser(formData.username)
			.then((key) => {
				setApiKey(key)
			})
			.catch((reason) => {
				console.error(reason)
				setFreezeTextFields(false)
				setError(true)
			})
	}

	return (
		<Container>
			<Box pt={10}>
				<Paper>
					<Box p={3}>
						<form onSubmit={handleSetup}>
							<Grid container gap={3}>
								<Grid item xs={12}>
									<Typography variant="h4">Setup MERN Template</Typography>
								</Grid>

								<Grid item xs={12}>
									<Typography>
										Set up your username and get you API key.
									</Typography>
								</Grid>
								<Grid item xs={12}>
									<TextField
										value={formData.username}
										onChange={(e) => {
											setFormData({ ...formData, username: e.target.value })
										}}
										label="Username"
										disabled={freezeTextFields}
									/>
								</Grid>
								<Grid item xs={12}>
									<Button type="submit" disabled={freezeTextFields}>
										Submit
									</Button>
								</Grid>
							</Grid>
						</form>
						{error && (
							<Typography variant="caption" color={red[400]}>
								An error has occured. Please check log for details
							</Typography>
						)}
						{apiKey && (
							<>
								<Typography variant="caption">
									Created your user ID. Your API key is <code>{apiKey}</code>
									<br />
									Copy it elsewhere as you will not be able to see this again
								</Typography>
								<br />
								<Button onClick={done}>OK</Button>
							</>
						)}
					</Box>
				</Paper>
			</Box>
		</Container>
	)
}

export default Setup
