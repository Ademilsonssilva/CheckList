$('#cadastrar').on('click', function () {

	email = $('#email').val();
	pass = $('#pass').val();

	if(email == '' || pass == '') {

		swal({
			title: 'Ops',
			html: 'Não deixe campos em branco!',
			type: 'warning',
		})

		
		return;
	}

	usuario = firebase.auth().createUserWithEmailAndPassword(email, pass).then(function () {

		swal({
			html: 'Usuário cadastrado com sucesso!',
			type: 'success',
			toast: true,
			timer: 2500,
			onClose: () => {
				window.location.href = 'home.html';
			}
		});
		
		
		var uid = firebase.auth().currentUser.uid;
		
		firebase.database().ref('pessoa/' + uid ).set({nome: $('#nome').val()});
		//firebase.database().ref('users-coach/' + uid ).set(true);
		

	}).catch(function(error) {
		
		mensagem = '';

		console.info(error.message);
		console.info(error.code);

		switch(error.code) {
			case 'auth/email-already-in-use': 
				mensagem = 'O email informado já existe';
				break;
			case 'auth/weak-password':
				mensagem = 'A senha deve ter pelo menos 6 caracteres';
				break;
			case 'auth/invalid-email':
				mensagem = 'O email informado não é válido';
				break;
			default: 
				mensagem = 'Ocorreu um erro inesperado!';
				break;
		}

		swal({
			title: 'Ops',
			html: mensagem,
			type: 'warning',	
		});

	});			

})
