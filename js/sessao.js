$(document).ready(function () {

    logged_user = '';

    firebase.auth().onAuthStateChanged(function(user) {
		  
        if (user) {

            logged_user = firebase.auth().currentUser.uid;
          
        } else {
         
            window.location.href = 'login.html';
            
        }

    });
})
  
	