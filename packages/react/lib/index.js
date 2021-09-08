const { io } = require('socket.io-client')

// core functions
const ping = require('./functions/ping')
const services = require('./functions/services')

const error = require('./functions/error')
const authenticate = require('./functions/authenticate')

function Floxum(socket) {
	this.socket = socket

	this.socket.on('fx-error', error)
}

// prototypes
Floxum.prototype.ping = ping
Floxum.prototype.services = services
Floxum.prototype.onError = error
Floxum.prototype.authenticate = authenticate

// main function
const main = (host) => {
	const socket = io(host)

	return new Floxum(socket)
}

module.exports = main
