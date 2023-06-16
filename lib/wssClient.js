const {cot} = require("@vidterra/tak.js")
const objects = require('./objectcache.js')
const WebSocket = require('ws')
const Pws = require('pws');

const apiKey = process.env.API_KEY


const run = () => {

	const socket = new Pws("wss://stream.aisstream.io/v0/stream",WebSocket);

	socket.onopen = function (_) {
	  let subscriptionMessage = {
		Apikey: apiKey,
		BoundingBoxes: [[[-90, -180], [90, 180]]]
	  }
	  socket.send(JSON.stringify(subscriptionMessage));
	};
  
	socket.onmessage = function (event) {
	  let aisMessage = JSON.parse(event.data)
	  objects.store(aisMessage)
	};
  
}

if (apiKey) {
	run()
}
