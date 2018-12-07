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
					
					
					myUserId = firebase.auth().currentUser.uid;
		
		 
					// firebase.database().ref('coach/' + myUserId + '/clientes').once("value").then(function(snapshot){
					// 	$('#clientes').html("");
					// 	snapshot.forEach(function(child){
					// 		$('#clientes').append("<tr>");
					// 	    $('#clientes').append("<td>" + child.val().nome + "</td>");
					// 	    $('#clientes').append("<td>" + child.val().email + "</td>");
					// 	    $('#clientes').append("<td>" + child.val().telefone + "</td>");
					// 	    $('#clientes').append("</tr>");
					// 	    //alert( child.val().nome)
						  
					// 	});
                    // })
					
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