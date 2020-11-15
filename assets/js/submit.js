var firebaseConfig = {
	apiKey: "AIzaSyAN7v1APHiTgjYZmtjaZZvI9HEwi3lx-Ss",
	authDomain: "burningtiles-web.firebaseapp.com",
	databaseURL: "https://burningtiles-web.firebaseio.com",
	projectId: "burningtiles-web",
	storageBucket: "burningtiles-web.appspot.com",
	messagingSenderId: "976031931366",
	appId: "1:976031931366:web:2a07b6e17d1796a53b1427",
	measurementId: "G-PQ4QPWJH98"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

var messagesRef = firebase.database().ref('messages');

const sendToFirebase = (name, email, message) => {
	var newMessageRef = messagesRef.push();
	newMessageRef.set({
		name: name,
		email: email,
		message: message
	});
};

const get = (id) => {
	return document.getElementById(id).value;
};

const send = (e) => {
	e.preventDefault();

	var name = get('name');
	var email = get('email');
	var message = get('message');

	sendToFirebase(name, email, message);
	window.confirm("Message sent");
};

document.getElementById("contact-form").addEventListener("submit", send);