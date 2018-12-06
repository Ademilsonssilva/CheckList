// Initialize Firebase
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

var obj = [0,1,2,3];

database.ref('/users').push(obj);
