function authenticate(strapi, socket) {
	socket.on('fx-authenticate', async (data) => {
		const { jwt } = data
		try {
			const tokenData = await strapi.plugins[
				'users-permissions'
			].services.jwt.verify(jwt)

			const user = await strapi
				.query('user', 'users-permissions')
				.findOne({ id: tokenData.id })

			let { password, resetPasswordToken, confirmationToken, ...rest } = user

			if (user) {
				socket.emit('fx-auth-resolve', rest)
			}
		} catch (e) {
			socket.emit('fx-auth-reject', {
				error: e.toString(),
			})
		}
	})
}

module.exports = authenticate
