const _ = require('lodash')

const services = async (strapi, socket) => {
	socket.on('fx-service', async (data) => {
		let user = socket.user

		const { name, method, params, _fx } = data

		if (!user) {
			// assign user to socket
			const { jwt } = _fx
			try {
				const tokenData = await strapi.plugins[
					'users-permissions'
				].services.jwt.verify(jwt)

				const _user = await strapi
					.query('user', 'users-permissions')
					.findOne({ id: tokenData.id })

				user = _user
				socket.user = _user
			} catch (e) {
				socket.emit('fx-service-reject', {
					error: `Invalid user`,
				})
			}
		}

		/** ============== SERVICE VALIDATION ============== */
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

		// get persmissions data based on the user's role
		const roles = await strapi
			.query('role', 'users-permissions')
			.findOne({ id: user.role.id })

		let userRolePermissions = roles.userRolePermissions

		try {
			const servicePermission = _.find(userRolePermissions, {
				type: 'application',
				controller: name,
				action: method,
			})

			if (
				servicePermission.role === user.role.id &&
				servicePermission.enabled
			) {
				const result = await strapi.services[name][method](params)
				socket.emit('fx-service-resolve', result)
			} else {
				socket.emit('fx-service-reject', { error: `Unauthorized user` })
			}
		} catch (e) {
			socket.emit('fx-service-reject', { error: e.toString() })
		}
	})
}

module.exports = services
