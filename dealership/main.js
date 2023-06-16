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
const docRef = db.collection("dealership");
const myTimestamp = firebase.firestore.Timestamp.fromDate(new Date());


document.getElementById('dealershipform').addEventListener('submit', formSubmit);


function formSubmit(e) {
  e.preventDefault();
  let name = document.querySelector('#name').value;
  let wnum = document.querySelector('#wnumber').value;
  let shopaddr = document.querySelector('#shopaddress').value;
  let utype = document.querySelector('#usertype').value;
  let message = document.querySelector('#message').value;

  if(utype == 0){
    alert("Please select your occupation");
    return;
  }
  if(wnum.length < 10 || wnum.length > 10){
    alert("Please enter your 10 digit number");
    return;
  }

  sendMessage(name, wnum, shopaddr, utype, message);
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

function sendMessage(name, wnum, shopaddr, utype, message) {
  docRef.add({
    name: name,
    wnumber: wnum,
    shopaddress: shopaddr,
    usertype: utype,
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
    document.getElementById('alertmessage').innerHTML = "Your details have been sent successfully!";
    document.getElementById('alertmessage').style.display = "block";
    document.getElementById('closealert').style.display = "block";
    document.getElementById('dealershipform').reset();
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


// take only 10 numbers 
function setInputFilter(textbox, inputFilter) {
  ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
    textbox.addEventListener(event, function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  });
}
setInputFilter(document.getElementById("wnumber"), function(value) {
  return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 9999999999); });