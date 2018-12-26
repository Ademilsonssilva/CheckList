$(document).ready(function () {

    logged_user = '';
    user_coach = false;

    firebase.auth().onAuthStateChanged(function(user) {
		  
        if (user) {

            logged_user = firebase.auth().currentUser.uid;

            fdb.ref('users-coach/'+ logged_user).once('value').then(function(snapshot){
                if(snapshot.val()){
                    user_coach = true

                }
                    
            });

        } else {
         
            window.location.href = 'login.html';
            
        }

    });
})
  
	