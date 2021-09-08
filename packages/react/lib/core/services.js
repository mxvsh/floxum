async function services(name, method, params) {
	const socket = this.socket

	socket.emit('fx-service', {
		name,
		method,
		params,
	})

	return new Promise((resolve, reject) => {
		socket.on('fx-service-resolve', (data) => resolve(data))
		socket.on('fx-service-reject', (data) => reject(data))
	})
}

module.exports = services
