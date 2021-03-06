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

		fdb.ref('users-coach/'+ uid).once('value', function(snapshot){
					
			//se esta no nó users-coach, retorna erro no login
			if(snapshot.val()){

				localStorage.setItem("coach", 1);
			}	
			else{
				localStorage.setItem("coach", 0);
			}
		});
		name = ""

		swal({
			html: 'Login efetuado com sucesso!',
			type: 'success',
			toast: true,
			timer: 2500,
			onClose: () => {
				window.location.href = 'home.html';
			}
		});

		firebase.database().ref('pessoa/' + uid ).once("value", function(snapshot){


			localStorage.setItem("userName", snapshot.val().nome);
		}).then((name)=>{



		});

		

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
