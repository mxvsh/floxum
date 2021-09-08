async function authenticate(jwt) {
	jwt = jwt || localStorage.getItem('fx-jwt')
	if (!jwt) {
		throw new Error('Invalid JWT')
	}

	const socket = this.socket
	socket.emit('fx-authenticate', { jwt })

	return new Promise((resolve, reject) => {
		socket.on('fx-auth-resolve', (data) => resolve(data))
		socket.on('fx-auth-reject', (data) => reject(data))
	})
}

module.exports = authenticate
