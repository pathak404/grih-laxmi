
var firebaseConfig = {
  apiKey: "AIzaSyAsyIQlIDYB9Ns6yzyqxfHHt84KF5lgiiI",
  authDomain: "grihlakxmi.firebaseapp.com",
  projectId: "grihlakxmi",
  storageBucket: "grihlakxmi.appspot.com",
  messagingSenderId: "240407187677",
  appId: "1:240407187677:web:01f5edc603bbd3fff4cb34"
};

var app = firebase.initializeApp(firebaseConfig);
console.log("Initialisation Successful!");
var db = firebase.firestore();
const dsRef = db.collection('dealership').orderBy("time", "desc");
dsRef.get().then(snapshot => {
  var n = 1;
  snapshot.forEach(doc => {
    var docid = doc.id;
    var name = doc.data().name;
    var wnumber = doc.data().wnumber;
    var usertype = doc.data().usertype;
    var shopaddress = doc.data().shopaddress;
    var message = doc.data().message;
    var time = doc.data().time;

    if ($(window).width() >= 700) {
      $("table.dataTable").append(`<tr>
    <td>`+ n + `</td>
    <td>`+ name + `</td>
    <td>`+ usertype + `</td>
    <td>`+ wnumber + `</td>
    <td><div class="modalView" data-doc="`+ docid + `" data-id="`+ n + `" data-name="` + name + `" data-usertype="` + usertype + `"  data-wnumber="` + wnumber + `"  data-shopaddress="` + shopaddress + `"  data-message="` + message + `" id="modalOpen">View</div></td>
  </tr>`);
    }
    else {
      $("table.dataTable").append(`<tr>
      <td>`+ n + `</td>
      <td>`+ name + `</td>
      <td>`+ usertype + `</td>
      <td><div class="modalView" data-doc="`+ docid + `" data-id="`+ n + `" data-name="` + name + `" data-usertype="` + usertype + `"  data-wnumber="` + wnumber + `"  data-shopaddress="` + shopaddress + `"  data-message="` + message + `" id="modalOpen">View</div></td>
    </tr>`);
    }

    n = n + 1;
});

}).catch (err => {
  console.log('Error getting documents', err);
});


// $('button[id^="viewdatabtn-"]').click(function () {
//   let time = $(this).attr("data-time");
//   let name = $(this).attr("data-name");


$('table.dataTable').on("click", ".modalView", function () {
  // get data
  let docid = $(this).attr('data-doc');
  let id = $(this).attr('data-id');
  let uname = $(this).attr('data-name');
  let ut = $(this).attr('data-usertype');
  let wn = $(this).attr('data-wnumber');
  let sa = $(this).attr('data-shopaddress');
  let mes = $(this).attr('data-message');

  $('.dataid').text(id);
  $('.uname').text(uname);
  $('.utype').text(ut);
  $('.wnum').text(wn);
  $('.saddr').text(sa);
  $('.mess').text(mes);
// set delete btn data 
  $('.deletedata').attr("data-doc", docid);

  // modal operations
  var buttonId = $(this).attr('id');
  $('#modal-viewdata').removeAttr('class').addClass(buttonId);
  $('body').addClass('modal-active');
  $(this).toggleClass("is-active");

});

$('div#closeModal, div.closemodalbtn').click(function () {
  $('#modal-viewdata').addClass('out');
  $('body').removeClass('modal-active');
});


// delete listner
$('div.deletedata').click(function () {
  let docid = $(this).data('doc');
  handleDelete(docid);
});

function handleDelete(id) {
  return db.collection('dealership')
    .doc(id)
    .delete()
    .then(() => location.reload());
}

firebase.auth().onAuthStateChanged(firebaseUser => {
  if(!firebaseUser){
    window.location = 'https://grih-laxmi.com/auth/';
  }
});