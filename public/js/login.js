import config from "../js/config.json" assert { type: "json" };
(async () => {
	const { value: formValues } = await Swal.fire({
		title: "User",
		html:
			'<label for="exampleFormControlInput1" class="form-label">Usuario</label>' +
			'<input id="user" class="swal2-input" name="user">' +
			'<p></p>' +
			'<label for="exampleFormControlInput1" class="form-label">Contraseña</label>' +
			'<input id="password" type="password" class="swal2-input" name="password">',
		allowEscapeKey: false,
		allowOutsideClick: false,
		focusConfirm: false,
		preConfirm: () => {
			return {
				user: document.getElementById("user").value,
				password: document.getElementById("password").value,
			};
		},
	});

	if (!formValues) {
		window.location.reload();
	} else {

		var settings = {
			"url": `https://${config.ip}:9035/login`,
			"method": "POST",
			"timeout": 0,
			"headers": {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			"data": {
				"user": formValues.user,
				"password": formValues.password
			}
		};

		$.ajax(settings).done(function (response) {
			if (response.login) {
				Swal.fire("Bienvenido")
				window.location.href = "/";
			} else {
				window.location.reload();
			}
		});

	}
})();