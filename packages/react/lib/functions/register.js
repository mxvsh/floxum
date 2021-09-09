function register(data, stringifyError = false) {
	const socket = this.socket

	socket.emit('fx-register', data)

	return new Promise((resolve, reject) => {
		socket.on('fx-register-success', resolve)
		socket.on('fx-register-error', (error) => {
			if (!stringifyError) {
				reject(error)
				return
			}

			let final = error.error // set default error
			if (error.data) {
				error = error.data[0].messages

				if (error.length > 0) {
					final = error[0].message
				}
			}

			reject(final)
		})
	})
}

module.exports = register
