const { default: axios } = require('axios')
const { HOST } = require('../variales')

const register = (strapi, socket) => {
	socket.on('fx-register', async (data) => {
		const strategy = 'local'
		const endpoint = `${HOST}/auth/${strategy}/register`

		axios
			.post(endpoint, data)
			.then(({ data }) => socket.emit('fx-register-success', data))
			.catch((err) => {
				const error = err.response.data
				socket.emit('fx-register-error', error)
			})
	})
}

module.exports = register
