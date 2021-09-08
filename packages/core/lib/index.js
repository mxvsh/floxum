const socketio = require('socket.io')

function Floxum(strapi, socket) {
	const modules = ['pong', 'services']

	// load each modules
	modules.map((i) => {
		console.log(`loading module: ${i}`)
		require(`./core/${i}`)(strapi, socket)
	})
}

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

		new Floxum(strapi, socket)
	})
}

module.exports = main
