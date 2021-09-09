const socketio = require('socket.io')

const main = (strapi, config = {}) => {
	const { log = false, origin = '*' } = config

	if (!strapi) {
		console.error("Strapi couldn't be found")
		return
	}

	// start socket server with strapi

	const io = socketio(strapi.server, {
		allowEIO3: true,
		cors: {
			origin,
			methods: ['GET', 'POST'],
		},
	})

	io.on('connection', (socket) => {
		if (log) {
			console.log(socket.id, 'connected')
		}

		const modules = ['pong', 'services', 'login', 'register', 'authenticate']

		modules.map((i) => {
			require(`./modules/${i}`)(strapi, socket)
		})
	})
}

module.exports = main
