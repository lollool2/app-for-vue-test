import config from "../js/config.json" assert { type: "json" };
$("#botoncrear").on("click", () => {
	const user = $("#user").val()
	const password = $("#password").val()
	const skill = $("#skill").val()
	var settings = {
		"url": "https://localhost:9035/makeuser",
		"method": "POST",
		"timeout": 0,
		"headers": {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		"data": {
			"user": user,
			"password": password,
			"skill": skill
		}
	};

	$.ajax(settings).done(function (response) {
		if (response.length > 0) {
			Swal.fire(
				'Correcto',
				'Usuario Creado',
				'success'
			)
				.then(() => {
					window.location.reload()
				});
		} else {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Algo salio mal!',
			})
				.then(() => {
					window.location.reload()
				});
		}
	});
});