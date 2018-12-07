$('#cadastrar').on('click', function () {

    email = $('#email').val();
    nome = $('#nome').val();
	pass = $('#pass').val();

	if(email == '' || pass == '' || nome == '') {

		swal({
			title: 'Ops',
			html: 'Não deixe campos em branco!',
			type: 'warning',
		})

		
		return;
	}

    firebase.auth().onAuthStateChanged(function(user) {
		  
        if (user) {
           // User is signed in.
           //alert('vc esta logado')
           
            
           
            //firebase.database().ref('coach/' + user.uid ).once('value').then(function(snapshot) {

           // firebase.auth().createUserWithEmailAndPassword(email, pass).then(function () {

                firebase.database().ref('coach/' + user.uid + '/clientes' ).push({
                    
                    nome: $('#nome').val(),
                    telefone: $('#telefone').val(),
                    email: $('#email').val(),

                });

                swal({
                    html: 'Usuário cadastrado com sucesso!',
                    type: 'success',
                    toast: true,
                    timer: 2500,
                })

            /*}).catch(function (error) {

            });*/
              
            //$('#name_user').html(snapshot.val().nome);

            // ...
            //});

        } else {
           
           window.location.href = 'login.html';
        }
    });

});