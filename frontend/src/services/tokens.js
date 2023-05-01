import axios from "./axios";

export default {
	sendToken: async (task) => {
		const qs = require('qs');
		let data = qs.stringify(task);

		let config = {
			method: 'post',
			maxBodyLength: Infinity,
			url: 'http://localhost:9035/api/token',
			headers: { 
			  'Content-Type': 'application/x-www-form-urlencoded'
			},
			data : data
		};

		const info = await axios.request(config)
			
		return info.data;
	},
}