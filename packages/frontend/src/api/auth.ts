import API from '.'

// eslint-disable-next-line import/no-anonymous-default-export
export default (api: API) => {
	const addFirstTimeUser = async (username: string) => {
		return api
			.postRaw('/auth/add-key-firsttime', username, false)
			.then((value) => value.data as string)
	}

	return {
		addFirstTimeUser,
	}
}
