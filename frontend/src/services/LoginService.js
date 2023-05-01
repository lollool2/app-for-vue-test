import axios from "./axios";

export default {
	sendLogin: async (task) => {
		const qs = require('qs');
		let data = qs.stringify(task);

		let config = {
			method: 'post',
			maxBodyLength: Infinity,
			url: 'http://localhost:9035/api/login',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: data
		};

		const info = await axios.request(config)

		return info.data;
	},
	addUser: async (task) => {
		const qs = require('qs');
		let data = qs.stringify(task);

		let config = {
			method: 'post',
			maxBodyLength: Infinity,
			url: 'http://localhost:9035/api/addUser',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: data
		};

		const info = await axios.request(config)

		return info.data;
	},
	validateUser: async (task) => {
		const qs = require('qs');
		let data = qs.stringify(task);

		let config = {
			method: 'post',
			maxBodyLength: Infinity,
			url: 'http://localhost:9035/api/exists',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: data
		};

		const info = await axios.request(config)

		return info.data;
	},
}