const config = require("./config");
const jwt = require('jsonwebtoken');
//models
const users = require("../models/users");
const tokens = require("../models/tokens");
const moment = require("moment/moment");
const rol = require("../models/roles");

module.exports = {
	form: async (req, res) => {
		try {
			if (!req.body.email || !req.body.password) {
				res.send({ login: false, error: "por favor ingrese correo y contraseña" })
			} else {
				const FindUser = await users.findOne({
					correo: req.body.email,
				});

				if (FindUser) {
					if (FindUser.password == req.body.password) {
						// Crear un token con la información del usuario
						const role = await rol.findOne({_id:FindUser.role})

						const token = jwt.sign({ userId: FindUser._id }, 'g8SlhhpH6O', { expiresIn: '1h' });
						const tokenRole = jwt.sign({role:role.nombre},'g8SlhhpH6O', { expiresIn: '1h' })

						if (!req.body.rememberme == 'false') {
							const crearToken = new tokens({ token: token, name: FindUser.name, whenWasMaked: moment().format("YYYY-MM-DD") });
							await crearToken.save();
						}

						res.send({ user: true, login: true, error: null, token, tokenRole })
					} else {
						res.send({ user: true, login: false, error: null })
					}
				} else {
					res.send({ user: false, login: false, error: null })
				}
			}
		} catch (error) {
			console.log(error);
		}
	},
	makeUser: async (req, res) => {
		try {
			if (!req.body.email || !req.body.password || !req.body.name) {
				res.send({ login: false, error: "por favor ingrese correo y contraseña" })
			} else {
				const makeUser = new users({
					correo: req.body.email,
					password: req.body.password,
					name: req.body.name,
					role:'643a94f8b34aea00f52a6251',
					active:false
				})
				await makeUser.save();
				res.send({ makeUser })
			}
		} catch (error) {
			console.log(error);
		}
	},
	updateUser: async (req, res) => {
		try {
			if (!req.body.id) {
				res.send({ login: false, error: "por favor ingrese el id del usuario" })
			} else {
				var dataForUpdate = {

				}
				if (req.body.email) {
					dataForUpdate.correo = req.body.email
				}
				if (req.body.password) {
					dataForUpdate.password = req.body.password
				}

				const update = await users.updateOne({ _id: req.body.id }, dataForUpdate);

				res.send({ update })
			}
		} catch (error) {
			console.log(error);
		}
	},
	deletUser: async (req, res) => {
		try {
			if (!req.body.id) {
				res.send({ login: false, error: "por favor ingrese el id del usuario" })
			} else {

				const deleteOneUser = await users.deleteOne({ _id: req.body.id });

				res.send({ deleteOneUser })
			}
		} catch (error) {
			console.log(error);
		}
	},
	userToken: async (req, res) => {
		try {
			const { token } = req.body

			const info = await tokens.find({ token })
			if (info.length > 0) {
				res.send({ token: true })
			} else {
				res.send({ token: false })
			}
		} catch (error) {
			console.log(error);
		}
	},
	userEmailExist: async (req, res) => {
		try {
			if (!req.body.email) {
				res.send({ login: false, error: "por favor ingrese correo y contraseña" })
			} else {
				const FindUser = await users.findOne({
					correo: req.body.email,
				})

				if (FindUser) {
					res.send({ user: true, error: null })
				} else {
					res.send({ user: false, error: null })
				}
			}
		} catch (error) {
			console.log(error);
		}
	},
}