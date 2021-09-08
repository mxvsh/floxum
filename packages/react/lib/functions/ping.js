function ping() {
	const socket = this.socket

	socket.emit('fx-ping')

	return new Promise((resolve) => {
		socket.on('fx-pong', () => resolve())
	})
}

module.exports = ping
