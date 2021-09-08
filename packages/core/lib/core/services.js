const services = (strapi, socket) => {
	socket.on('fx-service', async (data) => {
		const { name, method, params, _fx } = data

		// const { token } = _fx
		// console.log('token', token)

		try {
			const obj = await strapi.plugins['users-permissions'].services.jwt.verify(
				'asdsa'
			)
		} catch (e) {
			socket.emit('fx-service-reject', {
				error: e.toString(),
			})
		}
	})
}

module.exports = services
