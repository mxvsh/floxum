const services = (strapi, socket) => {
	socket.on('fx-service', async (data) => {
		const { name, method, params, _fx } = data

		if (typeof strapi.services[name] !== 'object') {
			// Service could not be found
			socket.emit('fx-service-reject', {
				error: `Service couldn't be found`,
			})
			return
		}

		if (typeof strapi.services[name][method] !== 'function') {
			// Method could not be found
			socket.emit('fx-service-reject', {
				error: `Method couldn't be found`,
			})
			return
		}

		try {
			const result = await strapi.services[name][method](params)
			socket.emit('fx-service-resolve', result)
		} catch (e) {
			socket.emit('fx-service-reject', e)
		}
	})
}

module.exports = services
