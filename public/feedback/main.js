
var firebaseConfig = {
    apiKey: "AIzaSyAsyIQlIDYB9Ns6yzyqxfHHt84KF5lgiiI",
    authDomain: "grihlakxmi.firebaseapp.com",
    projectId: "grihlakxmi",
    storageBucket: "grihlakxmi.appspot.com",
    messagingSenderId: "240407187677",
    appId: "1:240407187677:web:01f5edc603bbd3fff4cb34"
};

var app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const docRef = db.collection("feedback");
const myTimestamp = firebase.firestore.Timestamp.fromDate(new Date());


document.getElementById('feedbackform').addEventListener('submit', formSubmit);


function formSubmit(e) {
    e.preventDefault();
    let name = document.querySelector('#name').value;
    let email = document.querySelector('#email').value;
    let message = document.querySelector('#message').value;

    sendMessage(name, email, message);
    document.getElementById("alert").classList.add("open");
    document.body.classList.add("modal-active");
    
    var loader = document.getElementById('loader');
    const loaderstyle = getComputedStyle(loader);
    // console.log(loaderstyle);
    var counter = 15;
    setInterval(function () {
        counter--;
        if (counter === 0 && loaderstyle.display === "block") {
            onerrorForm();
            clearInterval(counter);
        }
    }, 1000);
}

function sendMessage(name, email, message) {
    docRef.add({
        name: name,
        email: email,
        message: message,
        time: myTimestamp
    })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            onsuccessForm();

        })
        .catch((error) => {
            console.error("Error adding document: ", error);
            // onerrorForm();
        });
}


function onsuccessForm() {
    setTimeout(function () {
        document.getElementById('loader').style.display = "none";
        document.getElementById('alertmessage').innerHTML = "Thank you for your feedback";
        document.getElementById('alertmessage').style.display = "block";
        document.getElementById('feedbackform').reset();
        document.getElementById('closealert').style.display = "block";
    }, 4000);
}

function onerrorForm() {
    setTimeout(function () {
        document.getElementById('loader').style.display = "none";
        document.getElementById('alertmessage').innerHTML = "Something went wrong!";
        document.getElementById('alertmessage').style.display = "block";
        document.getElementById('closealert').style.display = "block";

    }, 4000);
}


document.getElementById('closealert').addEventListener("click", hideModal);
function hideModal() {
    document.getElementById("alert").classList.add("out");
    document.body.classList.remove("modal-active");
    document.getElementById("alert").className = '';
    document.getElementById('loader').setAttribute('style', '');
    document.getElementById('alertmessage').setAttribute('style', '');
    document.getElementById('closealert').setAttribute('style', '');
}
