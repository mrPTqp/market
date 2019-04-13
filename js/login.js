"use strict";

function controlCookies() {
  //document.cookie = "test=123";
  //alert( document.cookie );

  var email = document.getElementById('exampleInputEmail1').value;
  var password = document.getElementById('exampleInputPassword1').value;
  var date = new Date;
  date.setDate(date.getDate() + 1);

  Cookies.set('email', email, { expires: 365 });
  Cookies.set('password', password, { expires: 365 });

  var autorizationForm = document.getElementById('autorization');
  autorizationForm.innerHTML = '<div class="d-flex flex-column bd-highlight mb-3 row"><div class="d-flex justify-content-center col-"><p>Привет, <b>' + email + '</b></p></div><div class="d-flex justify-content-center col-"><button type="button" class="btn btn-sm btn btn-light ml-2" id="quit" onclick="deleteCookie()">Выйти</button></div></div></div>'; 
  console.log(document.cookie);
};

function deleteCookie() {
  Cookies.remove('email');
  Cookies.remove('password');
  var autorizationForm = document.getElementById('autorization');
  autorizationForm.innerHTML = '<form class="form-inline"><div class="row"><div class="col-"><input type="email" class="form-control ml-2" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Введите email"></div><div class="col-"><input type="password" class="form-control ml-2" id="exampleInputPassword1" placeholder="Введите пароль"></div><div class="col-"><button type="submit" class="btn btn-xs btn-primary ml-2" id="submit" onclick="controlCookies()">Войти</button></div></div></form>'
  console.log(document.cookie);
};

