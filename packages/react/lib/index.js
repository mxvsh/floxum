const { io } = require('socket.io-client')

// core functions
const ping = require('./core/ping')
const services = require('./core/services')

const error = require('./core/error')

function Floxum(socket) {
	this.socket = socket

	this.socket.on('fx-error', error)
}

// prototypes
Floxum.prototype.ping = ping
Floxum.prototype.services = services
Floxum.prototype.onError = error

// main function
const main = (host) => {
	const socket = io(host)

	return new Floxum(socket)
}

module.exports = main
