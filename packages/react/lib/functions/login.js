async function login(identifier, password) {
	const socket = this.socket
	socket.emit('fx-login', { identifier, password })

	return new Promise((resolve, reject) => {
		socket.on('fx-login-success', resolve)
		socket.on('fx-login-error', reject)
	})
}

module.exports = login
