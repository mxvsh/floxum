const socketio = require('socket.io')

const main = (strapi) => {
	if (!strapi) {
		console.error("Strapi couldn't be found")
		return
	}

	// start socket server with strapi

	const io = socketio(strapi.server, {
		cors: {
			origin: '*',
			methods: ['GET', 'POST'],
		},
	})

	io.on('connection', (socket) => {
		console.log('\nconnected', socket.id)

		const modules = ['pong', 'services', 'authenticate']

		modules.map((i) => {
			console.log(`loading module: ${i}`)
			require(`./modules/${i}`)(strapi, socket)
		})

		setTimeout(
			() => socket.emit('fx-auth-resolve', { data: 'something' }),
			4000
		)
	})
}

module.exports = main
