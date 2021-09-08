async function services(name, method, params) {
	const socket = this.socket

	const _fx = {
		jwt: localStorage.getItem('fx-jwt'),
	}

	socket.emit('fx-service', {
		name,
		method,
		params,
		_fx,
	})

	return new Promise((resolve, reject) => {
		socket.on('fx-service-resolve', (data) => resolve(data))
		socket.on('fx-service-reject', (data) => reject(data))
	})
}

module.exports = services
