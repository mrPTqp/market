"use strict";

function controlCookies() {
  document.cookie = "test=123";

  alert( document.cookie );

  var email = document.getElementById('exampleInputEmail1').value;
  var password = document.getElementById('exampleInputPassword1').value;
  var date = new Date;
  date.setDate(date.getDate() + 1);

  document.cookies.set({
    //url: tabs[0].url,
    name: "email",
    value: email,
    //expirationDate: date
  });

  document.cookies.set({
    //url: tabs[0].url,
    name: "password",
    value: password,
    //expirationDate: date
  });

  alert(document.cookie);

  var resultEmail = document.cookies.get({
    name: "email",
  });

  var resultPassword = document.cookies.get({
    name: "password",
  });

  alert(resultEmail);
 
};

