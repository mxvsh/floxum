const login = (strapi, socket) => {
	socket.on('fx-login', async (credentials) => {
		const { identifier, password } = credentials

		// find user from database and verify pasword
		const user = await strapi
			.query('user', 'users-permissions')
			.findOne({ email: identifier })

		const isValidPass = await strapi.admin.services.auth.validatePassword(
			password,
			user.password
		)

		if (isValidPass) {
			// generate jwt token if password matched
			const token = await strapi.plugins[
				'users-permissions'
			].services.jwt.issue(user)

			const { password, resetPasswordToken, registrationToken, ...rest } = user
			socket.emit('fx-login-success', { token, ...rest })
		} else {
			socket.emit('fx-login-error', { error: 'Invalid user' })
		}
	})
}

module.exports = login
