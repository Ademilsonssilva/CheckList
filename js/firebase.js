// Initialize Firebase

//alert('firebase.js')

var config = {
 apiKey: "AIzaSyAP9WB5CPcOS13NiwXvwN8pHXmzdIwtuC8",
 authDomain: "checklist-9c6f7.firebaseapp.com",
 databaseURL: "https://checklist-9c6f7.firebaseio.com",
 projectId: "checklist-9c6f7",
 storageBucket: "checklist-9c6f7.appspot.com",
 messagingSenderId: "286687253624"
};
firebase.initializeApp(config);

  // Get a reference to the database service
var database = firebase.database();

//var obj = [0,1,2,3];



/*var key = firebase.database().ref('users/').push({
    username: 'Luiz',
    email: 'luiz@actuary.com.br',
    profile_picture : 'img/photo001'
  });*/
  
  
//database.ref('/users').push(obj);


/* firebase.auth().createUserWithEmailAndPassword('luiz@actuary.com.br', '123456').catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});
 */


function logar(){

	var email = $('#user').val();
	var password = $('#pass').val();

	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // ...
	  
	  
  });
  	
}

$('#logout').on('click',function(){
	
	firebase.auth().signOut().then(function() {
	  // Sign-out successful.
	  
	  window.location.href = 'login.html';
	}).catch(function(error) {
	  // An error happened.
	  
	});
			
});