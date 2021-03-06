$('#logar').on('click', function () {

	email = $('#email').val();
	pass = $('#pass').val();
	
	if(email == "" || pass == "") {

		swal({
			title: 'Ops',
			html: 'Não deixe campos em branco!',
			type: 'warning',
		})

		
		return;
	}

	usuario = firebase.auth().signInWithEmailAndPassword(email, pass).then(function () {

		var uid = firebase.auth().currentUser.uid;

		alert(uid)

		fdb.ref('users-coach/'+ uid).once('value').then(function(snapshot){
			
			if(!snapshot.val()){
				swal({
					html: 'Usuario não encontrado',
					type: 'error',
					toast: true,
					timer: 2500
					
				});
			}

			return;

		});

		//if()
		swal({
			html: 'Login efetuado com sucesso!',
			type: 'success',
			toast: true,
			timer: 2500,
			onClose: () => {
				window.location.href = 'home.html';
			}
		});
		
		
		/*firebase.database().ref('users/' + uid ).set({nome: $('#nome').val()});*/
		
	}).catch(function(error) {
		
		mensagem = '';

		console.info(error.message);
		console.info(error.code);

		switch(error.code) {
			case 'auth/user-not-found': 
				mensagem = 'O usuário informado não existe';
				break;
			case 'auth/wrong-password':
				mensagem = 'A senha incorreta';
				break;
			case 'auth/invalid-email':
				mensagem = 'O email informado não é válido';
				break;
			case 'auth/user-disabled':
				mensagem = 'O usuário esta bloqueado';
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

});
