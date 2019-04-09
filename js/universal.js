"use strict";
alert( document.cookie );

var email = document.getElementById('exampleInputEmail1').value;
var password = document.getElementById('exampleInputPassword1').value;
var date = new Date;
date.setDate(date.getDate() + 1);

document.cookies.set({
  name: "email",
  value: email,
  //expirationDate: date
});

browser.cookies.set({
  name: "password",
  value: password,
  //expirationDate: date
});

alert( document.cookie );

var resultEmail = browser.cookies.get({
  name: "email",  
});

var resultPassword = browser.cookies.get({
  name: "password",  
});

alert(resultEmail);

