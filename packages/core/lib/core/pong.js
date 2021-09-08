const pong = (strapi, socket) => {
	socket.on('fx-ping', () => {
		socket.emit('fx-pong')
	})
}

module.exports = pong
