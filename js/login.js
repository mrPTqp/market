"use strict";

var cartItem = document.getElementById('cart-item'); //сущность корзины
var cart = []; //промежуточный объект корзины
var mainScreenAmountGoods = 8; //переменная, отображающая текущее количество товаров на странице
var previouslyMainScreenAmountGoods = 8; //а эта для фиксации разницы в количестве отрисованных товаров
var goodsFromServer; //переменная для сохранения перечня товаров, полученного с сервера
var usersFromServer; //переменная для сохранения перечня пользователей, полученного с сервера
//var categorizedGoodsFromServer; //переменная для сохранения перечня категоризированных товаров, полученного с сервера
var paramGoods = ''; //тип параметра, который запрашиваем с сервера, в нашем случае category
var valueParam = ''; //значение параметра, конкретная категория товара, например eggs
var paramUsers = ''; //тип параметра, который запрашиваем с сервера, в нашем случае login или passwordDB
var valueUsers = ''; //значение параметра, конкретная категория товара, например mrPTqp@gmail.com или 123
var sessionIDFromServer; //sessionID с сервера
var moneyFromServer; //количество денег с сервера
var totalPrice; //итоговая рассчитанная цена

//запрос продуктов с сервера
function xhrGoods(param, value) {
  var getGoods = new XMLHttpRequest();
  var URL = 'http://localhost:3000';
  var URI = '/goods?' + param + '=' + value;
  //console.log(URI);
  getGoods.open('GET', URL + URI, true);
  getGoods.send();

  getGoods.onreadystatechange = function () {
    if (getGoods.readyState != 4) return;
    if (getGoods.status != 200) {
      // обработать ошибку
      alert(getGoods.status + ': ' + getGoods.statusText); // пример вывода: 404: Not Found
    } else {
      goodsFromServer = JSON.parse(getGoods.responseText); // пропарсенный массив объектов с сервера 
      //console.log(goodsFromServer);
    };
    if (URI == '/goods?=') {
      productGridGeneration(mainScreenAmountGoods);
    } else {
      categorizedGridGeneration(goodsFromServer);
    };
  };
};

//запрос пользователей с сервера
function xhrUsers(param, value) {
  var getUsers = new XMLHttpRequest();
  var URL = 'http://localhost:3000';
  var URI = '/users?' + param + '=' + value;
  //console.log(URI);
  getUsers.open('GET', URL + URI, true);
  getUsers.send();

  getUsers.onreadystatechange = function () {
    if (getUsers.readyState != 4) return;
    if (getUsers.status != 200) {
      // обработать ошибку
      alert(getUsers.status + ': ' + getUsers.statusText); // пример вывода: 404: Not Found
    } else {
      usersFromServer = JSON.parse(getUsers.responseText); // пропарсенный массив объектов с сервера 
      //console.log(goodsFromServer);
    };
  };
};

function xhrSessionID(param, value) {
  var userObjesctFromServer;
  var getSessionID = new XMLHttpRequest();
  var URL = 'http://localhost:3000';
  var URI = '/users?' + param + '=' + value;
  //console.log(URI);
  getSessionID.open('GET', URL + URI, true);
  getSessionID.send();

  getSessionID.onreadystatechange = function () {
    if (getSessionID.readyState != 4) return;
    if (getSessionID.status != 200) {
      // обработать ошибку
      alert(getSessionID.status + ': ' + getSessionID.statusText); // пример вывода: 404: Not Found
    } else {
      userObjesctFromServer = JSON.parse(getSessionID.responseText); // пропарсенный массив объектов с сервера 
      sessionIDFromServer = userObjesctFromServer[0].sessionIDDB;
      //console.log(sessionIDFromServer);
      moneyFromServer = userObjesctFromServer[0].moneyBalanceDB;
      //console.log(moneyFromServer);
    };
  };
};

//для MD5 https://stackoverflow.com/questions/14733374/how-to-generate-md5-file-hash-on-javascript
var MD5 = function (d) {
  var result = M(V(Y(X(d), 8 * d.length)));
  return result.toLowerCase()
};
function M(d) {
  for (var _, m = "0123456789ABCDEF", f = "", r = 0; r < d.length; r++)_ = d.charCodeAt(r), f += m.charAt(_ >>> 4 & 15) + m.charAt(15 & _);
  return f
}
function X(d) {
  for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++)_[m] = 0;
  for (m = 0; m < 8 * d.length; m += 8)_[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32; return _
}
function V(d) {
  for (var _ = "", m = 0; m < 32 * d.length; m += 8)_ += String.fromCharCode(d[m >> 5] >>> m % 32 & 255);
  return _
}
function Y(d, _) {
  d[_ >> 5] |= 128 << _ % 32, d[14 + (_ + 64 >>> 9 << 4)] = _;
  for (var m = 1732584193, f = -271733879, r = -1732584194, i = 271733878, n = 0; n < d.length; n += 16) {
    var h = m, t = f, g = r, e = i; f = md5_ii(f = md5_ii(f = md5_ii(f = md5_ii(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_ff(f = md5_ff(f = md5_ff(f = md5_ff(f, r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 0], 7, -680876936), f, r, d[n + 1], 12, -389564586), m, f, d[n + 2], 17, 606105819), i, m, d[n + 3], 22, -1044525330), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 4], 7, -176418897), f, r, d[n + 5], 12, 1200080426), m, f, d[n + 6], 17, -1473231341), i, m, d[n + 7], 22, -45705983), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 8], 7, 1770035416), f, r, d[n + 9], 12, -1958414417), m, f, d[n + 10], 17, -42063), i, m, d[n + 11], 22, -1990404162), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 12], 7, 1804603682), f, r, d[n + 13], 12, -40341101), m, f, d[n + 14], 17, -1502002290), i, m, d[n + 15], 22, 1236535329), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 1], 5, -165796510), f, r, d[n + 6], 9, -1069501632), m, f, d[n + 11], 14, 643717713), i, m, d[n + 0], 20, -373897302), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 5], 5, -701558691), f, r, d[n + 10], 9, 38016083), m, f, d[n + 15], 14, -660478335), i, m, d[n + 4], 20, -405537848), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 9], 5, 568446438), f, r, d[n + 14], 9, -1019803690), m, f, d[n + 3], 14, -187363961), i, m, d[n + 8], 20, 1163531501), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 13], 5, -1444681467), f, r, d[n + 2], 9, -51403784), m, f, d[n + 7], 14, 1735328473), i, m, d[n + 12], 20, -1926607734), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 5], 4, -378558), f, r, d[n + 8], 11, -2022574463), m, f, d[n + 11], 16, 1839030562), i, m, d[n + 14], 23, -35309556), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 1], 4, -1530992060), f, r, d[n + 4], 11, 1272893353), m, f, d[n + 7], 16, -155497632), i, m, d[n + 10], 23, -1094730640), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 13], 4, 681279174), f, r, d[n + 0], 11, -358537222), m, f, d[n + 3], 16, -722521979), i, m, d[n + 6], 23, 76029189), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 9], 4, -640364487), f, r, d[n + 12], 11, -421815835), m, f, d[n + 15], 16, 530742520), i, m, d[n + 2], 23, -995338651), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 0], 6, -198630844), f, r, d[n + 7], 10, 1126891415), m, f, d[n + 14], 15, -1416354905), i, m, d[n + 5], 21, -57434055), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 12], 6, 1700485571), f, r, d[n + 3], 10, -1894986606), m, f, d[n + 10], 15, -1051523), i, m, d[n + 1], 21, -2054922799), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 8], 6, 1873313359), f, r, d[n + 15], 10, -30611744), m, f, d[n + 6], 15, -1560198380), i, m, d[n + 13], 21, 1309151649), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 4], 6, -145523070), f, r, d[n + 11], 10, -1120210379), m, f, d[n + 2], 15, 718787259), i, m, d[n + 9], 21, -343485551), m = safe_add(m, h), f = safe_add(f, t), r = safe_add(r, g), i = safe_add(i, e)
  }
  return Array(m, f, r, i)
}
function md5_cmn(d, _, m, f, r, i) {
  return safe_add(bit_rol(safe_add(safe_add(_, d), safe_add(f, i)), r), m)
}
function md5_ff(d, _, m, f, r, i, n) {
  return md5_cmn(_ & m | ~_ & f, d, _, r, i, n)
}
function md5_gg(d, _, m, f, r, i, n) {
  return md5_cmn(_ & f | m & ~f, d, _, r, i, n)
}
function md5_hh(d, _, m, f, r, i, n) {
  return md5_cmn(_ ^ m ^ f, d, _, r, i, n)
}
function md5_ii(d, _, m, f, r, i, n) {
  return md5_cmn(m ^ (_ | ~f), d, _, r, i, n)
}
function safe_add(d, _) {
  var m = (65535 & d) + (65535 & _);
  return (d >> 16) + (_ >> 16) + (m >> 16) << 16 | 65535 & m
}
function bit_rol(d, _) {
  return d << _ | d >>> 32 - _
}

//для создания сессии и сохранения ее в куки
function controlCookiesAndSessions() {

  var email = document.getElementById('exampleInputEmail1').value;
  var password = document.getElementById('exampleInputPassword1').value;

  //функция сравнивает введенные логин и пароль с базой данных (users)
  function authentication(email, password) {
    var a = 0; //метка, говорящая о том, прошел ли кто-то аутентификацию
    for (var i = 0; i < usersFromServer.length; i++) {
      if (usersFromServer[i].login == email && usersFromServer[i].passwordDB == password) {
        generateToken(email, password);
        replaceAuthenticationFormToGreeting(email);
        a = 1;
      };
    };
    if (!a) {
      alert('Ошибка при вводе email или пароль. Попробуйте еще раз');
      a = 0;
    };
  };

  //генерирует на основе достоверных email и password токен для sessionID
  function generateToken(email, password) {
    var sumEmailPassword = email + password;
    var token = MD5(sumEmailPassword);
    //console.log(token);

    setCookie(email, token);
    xhrSessionID('login', email);
  };

  //записывает токен и email пользователя в куки
  function setCookie(userlogin, token) {
    Cookies.set('id', userlogin, { expires: 365 });
    Cookies.set('sessionID', token, { expires: 365 });
    //console.log(document.cookie);
  };

  authentication(email, password);
};

//при успешной авторизации заменяет форму для ввода логина и пароля на приветствие и кнопку "выйти"
function replaceAuthenticationFormToGreeting(emailForGreeting) {
  var autorizationForm = document.getElementById('autorization');

  autorizationForm.innerHTML = '<div class="d-flex flex-column bd-highlight mb-3 row"><div class="d-flex justify-content-center col-"><p>Привет, <b>' + emailForGreeting + '</b></p></div><div class="d-flex justify-content-center col-"><button type="button" class="btn btn-sm btn btn-light ml-2" id="quit">Выйти</button></div></div></div>';
  listenerForQuit();
};

//при нажатии кнопки "Выйти" удаляем sessionID из куки и заменяем приветствие на форму авторизации
function deleteSessionIDfromCookie() {
  Cookies.remove('id');
  Cookies.remove('sessionID');
  var autorizationForm = document.getElementById('autorization');
  autorizationForm.innerHTML = '<form class="form-inline"><div class="row"><div class="col-"><input type="email" class="form-control ml-2" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Введите email"></div><div class="col-"><input type="password" class="form-control ml-2" id="exampleInputPassword1" placeholder="Введите пароль"></div><div class="col-"><button type="button" class="btn btn-xs btn-primary ml-2" id="button">Войти</button></div></div></form>'
  console.log(document.cookie);
};

//изменяем количество товаров, отображаемое на главном экране, при прокрутке над сеткой товаров
function changeMainScreenAmountGoods(e) {
  if (e.deltaY > 75) {
    var a = goodsFromServer.length - mainScreenAmountGoods;
    switch (a) {
      case 0:
        break;
      case 1:
        mainScreenAmountGoods = mainScreenAmountGoods + 1;
        addProductGridGeneration(mainScreenAmountGoods);
        break;
      case 2:
        mainScreenAmountGoods = mainScreenAmountGoods + 2;
        addProductGridGeneration(mainScreenAmountGoods);
        break;
      case 3:
        mainScreenAmountGoods = mainScreenAmountGoods + 3;
        addProductGridGeneration(mainScreenAmountGoods);
        break;
      default:
        mainScreenAmountGoods = mainScreenAmountGoods + 4;
        addProductGridGeneration(mainScreenAmountGoods);
    };
  };
};

//генерация начальной товарной сетки
function productGridGeneration(mainScreenAmountGoods) {
  var rowContentGrid = document.querySelector('.content-grid');
  rowContentGrid.innerHTML = '';

  for (var i = 0; i < mainScreenAmountGoods; i++) {
    var divCol = document.createElement('div');
    divCol.className = "col-md-3 content-item";
    rowContentGrid.appendChild(divCol);

    var divWrap = document.createElement('div');
    divWrap.className = "item-wrapper my-3";
    divCol.appendChild(divWrap);

    var divItemImage = document.createElement('div');
    divItemImage.className = "item-image";
    divWrap.appendChild(divItemImage);

    var itemImage = document.createElement('img');
    itemImage.className = "mx-auto d-block";
    itemImage.setAttribute("src", goodsFromServer[i].imageOfGoods);
    divItemImage.appendChild(itemImage);

    var divFluid = document.createElement('div');
    divFluid.className = "container-fluid";
    divWrap.appendChild(divFluid);

    var itemTitle = document.createElement('h5');
    itemTitle.className = "item-title text-center";
    itemTitle.innerHTML = goodsFromServer[i].goodsName;
    divFluid.appendChild(itemTitle);

    var divRowPriceAndBuy = document.createElement('div');
    divRowPriceAndBuy.className = "row no-gutters";
    divFluid.appendChild(divRowPriceAndBuy);

    var divColPrice = document.createElement('div');
    divColPrice.className = "col-6";
    divRowPriceAndBuy.appendChild(divColPrice);

    var spanPriceRub = document.createElement('span');
    spanPriceRub.className = "item-price";
    spanPriceRub.innerHTML = Math.trunc(goodsFromServer[i].goodPrice) + 'р.';
    divColPrice.appendChild(spanPriceRub);

    var supPriceKop = document.createElement('sup');
    supPriceKop.innerHTML = Number(String(goodsFromServer[i].goodPrice).split('.')[1] || 0) + 'коп.';
    divColPrice.appendChild(supPriceKop);

    var divWrapColButtonToCart = document.createElement('div');
    divWrapColButtonToCart.className = "col-6";
    divRowPriceAndBuy.appendChild(divWrapColButtonToCart);

    var divColButtonToCart = document.createElement('div');
    divColButtonToCart.className = "item-actions";
    divWrapColButtonToCart.appendChild(divColButtonToCart);

    var buttonBuy = document.createElement('button');
    buttonBuy.className = "btn btn-outline-success my-2 my-sm-0 add_item";
    buttonBuy.setAttribute("data-id", goodsFromServer[i].id);
    buttonBuy.innerHTML = "В корзину";
    divColButtonToCart.appendChild(buttonBuy);

    var iTag = document.createElement('i');
    iTag.className = "fas fa-shopping-cart";
    iTag.setAttribute("aria-hidden", true);
    buttonBuy.appendChild(iTag);
  };
  listenerForButtonsBuy();
  listenerForCategorized();
};

//генерация добавляющейся товарной сетки
function addProductGridGeneration(mainScreenAmountGoods) {
  var rowContentGrid = document.querySelector('.content-grid');


  for (var i = previouslyMainScreenAmountGoods; i < mainScreenAmountGoods; i++) {
    var divCol = document.createElement('div');
    divCol.className = "col-md-3 content-item";
    rowContentGrid.appendChild(divCol);

    var divWrap = document.createElement('div');
    divWrap.className = "item-wrapper my-3";
    divCol.appendChild(divWrap);

    var divItemImage = document.createElement('div');
    divItemImage.className = "item-image";
    divWrap.appendChild(divItemImage);

    var itemImage = document.createElement('img');
    itemImage.className = "mx-auto d-block";
    itemImage.setAttribute("src", goodsFromServer[i].imageOfGoods);
    divItemImage.appendChild(itemImage);

    var divFluid = document.createElement('div');
    divFluid.className = "container-fluid";
    divWrap.appendChild(divFluid);

    var itemTitle = document.createElement('h5');
    itemTitle.className = "item-title text-center";
    itemTitle.innerHTML = goodsFromServer[i].goodsName;
    divFluid.appendChild(itemTitle);

    var divRowPriceAndBuy = document.createElement('div');
    divRowPriceAndBuy.className = "row no-gutters";
    divFluid.appendChild(divRowPriceAndBuy);

    var divColPrice = document.createElement('div');
    divColPrice.className = "col-6";
    divRowPriceAndBuy.appendChild(divColPrice);

    var spanPriceRub = document.createElement('span');
    spanPriceRub.className = "item-price";
    spanPriceRub.innerHTML = Math.trunc(goodsFromServer[i].goodPrice) + 'р.';
    divColPrice.appendChild(spanPriceRub);

    var supPriceKop = document.createElement('sup');
    supPriceKop.innerHTML = Number(String(goodsFromServer[i].goodPrice).split('.')[1] || 0) + 'коп.';
    divColPrice.appendChild(supPriceKop);

    var divWrapColButtonToCart = document.createElement('div');
    divWrapColButtonToCart.className = "col-6";
    divRowPriceAndBuy.appendChild(divWrapColButtonToCart);

    var divColButtonToCart = document.createElement('div');
    divColButtonToCart.className = "item-actions";
    divWrapColButtonToCart.appendChild(divColButtonToCart);

    var buttonBuy = document.createElement('button');
    buttonBuy.className = "btn btn-outline-success my-2 my-sm-0 add_item";
    buttonBuy.setAttribute("data-id", goodsFromServer[i].id);
    buttonBuy.innerHTML = "В корзину";
    divColButtonToCart.appendChild(buttonBuy);

    var iTag = document.createElement('i');
    iTag.className = "fas fa-shopping-cart";
    iTag.setAttribute("aria-hidden", true);
    buttonBuy.appendChild(iTag);
  };
  listenerForButtonsBuy();
  previouslyMainScreenAmountGoods = mainScreenAmountGoods;
};

function categorizedGridGeneration(goodsFromServer) {
  var rowContentGrid = document.querySelector('.content-grid');
  rowContentGrid.innerHTML = '';

  for (var i = 0; i < goodsFromServer.length; i++) {
    var divCol = document.createElement('div');
    divCol.className = "col-md-3 content-item";
    rowContentGrid.appendChild(divCol);

    var divWrap = document.createElement('div');
    divWrap.className = "item-wrapper my-3";
    divCol.appendChild(divWrap);

    var divItemImage = document.createElement('div');
    divItemImage.className = "item-image";
    divWrap.appendChild(divItemImage);

    var itemImage = document.createElement('img');
    itemImage.className = "mx-auto d-block";
    itemImage.setAttribute("src", goodsFromServer[i].imageOfGoods);
    divItemImage.appendChild(itemImage);

    var divFluid = document.createElement('div');
    divFluid.className = "container-fluid";
    divWrap.appendChild(divFluid);

    var itemTitle = document.createElement('h5');
    itemTitle.className = "item-title text-center";
    itemTitle.innerHTML = goodsFromServer[i].goodsName;
    divFluid.appendChild(itemTitle);

    var divRowPriceAndBuy = document.createElement('div');
    divRowPriceAndBuy.className = "row no-gutters";
    divFluid.appendChild(divRowPriceAndBuy);

    var divColPrice = document.createElement('div');
    divColPrice.className = "col-6";
    divRowPriceAndBuy.appendChild(divColPrice);

    var spanPriceRub = document.createElement('span');
    spanPriceRub.className = "item-price";
    spanPriceRub.innerHTML = Math.trunc(goodsFromServer[i].goodPrice) + 'р.';
    divColPrice.appendChild(spanPriceRub);

    var supPriceKop = document.createElement('sup');
    supPriceKop.innerHTML = Number(String(goodsFromServer[i].goodPrice).split('.')[1] || 0) + 'коп.';
    divColPrice.appendChild(supPriceKop);

    var divWrapColButtonToCart = document.createElement('div');
    divWrapColButtonToCart.className = "col-6";
    divRowPriceAndBuy.appendChild(divWrapColButtonToCart);

    var divColButtonToCart = document.createElement('div');
    divColButtonToCart.className = "item-actions";
    divWrapColButtonToCart.appendChild(divColButtonToCart);

    var buttonBuy = document.createElement('button');
    buttonBuy.className = "btn btn-outline-success my-2 my-sm-0 add_item";
    buttonBuy.setAttribute("data-id", goodsFromServer[i].id);
    buttonBuy.innerHTML = "В корзину";
    divColButtonToCart.appendChild(buttonBuy);

    var iTag = document.createElement('i');
    iTag.className = "fas fa-shopping-cart";
    iTag.setAttribute("aria-hidden", true);
    buttonBuy.appendChild(iTag);
  };
  listenerForButtonsBuy();
  listenerForCategorized();
  listenerForAllGoods();
};

function productFilter(e) {
  var category = this.getAttribute('id');
  paramGoods = 'category';
  valueParam = category;
  //console.log(category, paramGoods, valueParam);
  xhrGoods(paramGoods, valueParam);
};

//слушатель для каждой кнопки "В корзину" на странице
function listenerForButtonsBuy() {
  var contentItems = document.querySelectorAll('.content-item'); //все элементы товаров
  //console.log(contentItems);
  for (var i = 0; i < contentItems.length; i++) {
    addEvent(contentItems[i].querySelector('.add_item'), 'click', addToCart);
  };
};

function listenerForCategorized() {
  var categorizedItems = document.querySelectorAll('.categorized'); //все элементы категорий
  //console.log(categorizedItems);
  for (var i = 0; i < categorizedItems.length; i++) {
    addEvent(categorizedItems[i], 'click', productFilter);
  };
};

function listenerForAllGoods() {
  var allGoodsElem = document.getElementById('all-goods');
  console.log(allGoodsElem);
  paramGoods = '';
  valueParam = '';
  addEvent(allGoodsElem, 'click', function () {
    xhrGoods(paramGoods, valueParam)
  });
};

function listenerForAutorization() {
  var autorizationButton = document.getElementById('button-atrz');
  addEvent(autorizationButton, 'click', controlCookiesAndSessions);
};

function listenerForQuit() {
  var quitButton = document.getElementById('quit');
  addEvent(quitButton, 'click', deleteSessionIDfromCookie);
};

//кроссбраузерный обработчик событий
function addEvent(elem, type, handler) {
  if (elem.addEventListener) {
    elem.addEventListener(type, handler, false);
  } else {
    elem.attachEvent('on' + type, function () { handler.call(elem); });
  }
  return false;
};

//добавляет товар в промежуточную корзину
function addToCart(e) {

  var itemId = this.getAttribute('data-id'); // ID товара
  var marker = false; //маркер наличия товара в cart

  //проверяет есть ли товар в корзине
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id != itemId) {
      marker = false;
    } else {
      marker = true;
    };
  };
  //если маркер говорит, что товара в корзине не, то получив itemID перебираем массив goods и, если находим нужный нам объект, то передаем его в корзину
  if (!marker) {
    for (var j = 0; j < goodsFromServer.length; j++) {
      if (goodsFromServer[j].id == itemId) {
        cart.push(goodsFromServer[j]);
        cartRender(itemId);
      };
    };
  };
  //console.log(cart);
  //а теперь вызываем функцию для отрисовки корзины  
  calculateTotalPrice();
};

//функция для отрисовки корзины
function cartRender(itemId) {
  var indexItem;
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id == itemId) {
      indexItem = i;
    };
  };
  //console.log(indexItem);
  // создаем div для row и вставляем его в сущность корзины
  var divRow = document.createElement('div');
  divRow.className = "row no-gutters string";
  cartItem.appendChild(divRow);
  //в divRow добавляем divColImage для изображения товара
  var divColImage = document.createElement('div');
  divColImage.className = "col-2";
  divRow.appendChild(divColImage);
  //в divColImage вставляем divItemImage
  var divItemImage = document.createElement('div');
  divItemImage.className = "item-image";
  divColImage.appendChild(divItemImage);
  //в divItemImage вставляем саму картинку
  var imgProduct = document.createElement('img');
  imgProduct.className = "mx-auto d-block";
  imgProduct.setAttribute("src", cart[indexItem].imageOfGoods);
  divItemImage.appendChild(imgProduct);

  //в divRow добавляем divColName для наименования и описания товара
  var divColName = document.createElement('div');
  divColName.className = "col-3";
  divRow.appendChild(divColName);
  //в divColName вставляем абзац с наименованием и описанием товара
  var pName = document.createElement('p');
  pName.className = "item-title text-left";
  pName.innerHTML = cart[indexItem].goodsName;
  divColName.appendChild(pName);

  //в divRow добавляем divColPriceForPiece 
  var divColPriceForPiece = document.createElement('div');
  divColPriceForPiece.className = "col-2";
  divRow.appendChild(divColPriceForPiece);
  //в divColPriceForPiece вставляем divPriceForPiece
  var divPriceForPiece = document.createElement('div');
  divPriceForPiece.className = "item-price";
  divColPriceForPiece.appendChild(divPriceForPiece);
  //в divColPriceForPiece добавляем специальный тег для отображения РУБЛЕЙ
  var pDivPriceForPiece = document.createElement('span');
  pDivPriceForPiece.innerHTML = Math.trunc(cart[indexItem].goodPrice) + 'р.';
  divPriceForPiece.appendChild(pDivPriceForPiece);
  //в divColPriceForPiece добавляем специальный тег для отображения КОПЕЕК
  var supIndex = document.createElement('sup');
  supIndex.innerHTML = Number(String(cart[indexItem].goodPrice).split('.')[1]) + 'коп.';
  divPriceForPiece.appendChild(supIndex);

  //в divRow добавляем divColNumber для уменьшения/увеличения кол-во одного продукта
  var divColNumber = document.createElement('div');
  divColNumber.className = "col-2";
  divRow.appendChild(divColNumber);
  //в divColNumber добавляем контейнер-обертку divContainer
  var divContainer = document.createElement('div');
  divContainer.className = "container-fluid";
  divColNumber.appendChild(divContainer);
  //в divContainer добавляем свою строку divRawNumber
  var divRawNumber = document.createElement('div');
  divRawNumber.className = "row no-gutters";
  divContainer.appendChild(divRawNumber);

  //в divRawNumber добавляем divColButtonDecrease
  var divColButtonDecrease = document.createElement('div');
  divColButtonDecrease.className = "col-2 mx-auto";
  divRawNumber.appendChild(divColButtonDecrease);
  //в divColButtonDecrease добавляем кнопку для уменьшения количества товара
  var buttonDecrease = document.createElement('button');
  buttonDecrease.setAttribute("type", "button");
  buttonDecrease.className = "btn btn-outline-primary btn-sm decrease-amount-product";
  buttonDecrease.innerHTML = '-';
  divColButtonDecrease.appendChild(buttonDecrease);

  //в divRawNumber добавляем divColValueOfProduct
  var divColValueOfProduct = document.createElement('div');
  divColValueOfProduct.className = "col-8 mx-auto text-center";
  divRawNumber.appendChild(divColValueOfProduct);
  //в divColValueOfProduct добавляем абзац с количеством товара в корзине
  var ValueOfProduct = document.createElement('p');
  ValueOfProduct.className = "text-center present-amount";
  ValueOfProduct.setAttribute("id", "present-amount-of-a-product");
  ValueOfProduct.setAttribute("data-id", cart[indexItem].id);
  ValueOfProduct.innerHTML = 1;
  divColValueOfProduct.appendChild(ValueOfProduct);

  //в divRawNumber добавляем divColButtonIncrease
  var divColButtonIncrease = document.createElement('div');
  divColButtonIncrease.className = "col-2 mx-auto";
  divRawNumber.appendChild(divColButtonIncrease);
  //в divColButtonIncrease добавляем кнопку для увеличения количества товара
  var buttonIncrease = document.createElement('button');
  buttonIncrease.setAttribute("type", "button");
  buttonIncrease.className = "btn btn-outline-primary btn-sm increase-amount-product";
  buttonIncrease.innerHTML = '+';
  divColButtonIncrease.appendChild(buttonIncrease);

  //в divRow добавляем divColTotalPriceForSuchAProduct 
  var divColTotalPriceForSuchAProduct = document.createElement('div');
  divColTotalPriceForSuchAProduct.className = "col-2";
  divRow.appendChild(divColTotalPriceForSuchAProduct);
  //в divColTotalPriceForSuchAProduct добавляем divTotalPriceForSuchAProduct
  var divTotalPriceForSuchAProduct = document.createElement('div');
  divTotalPriceForSuchAProduct.className = "item-price-total text-center";
  divColTotalPriceForSuchAProduct.appendChild(divTotalPriceForSuchAProduct)
  //в divTotalPriceForSuchAProduct добавим sup для отображения общей суммы РУБЛЕЙ
  var TotalPriceForSuchAProduct = document.createElement('span');
  TotalPriceForSuchAProduct.innerHTML = Math.trunc(cart[indexItem].goodPrice) + 'р.';
  divTotalPriceForSuchAProduct.appendChild(TotalPriceForSuchAProduct);
  //в divTotalPriceForSuchAProduct добавим sup для отображения общей суммы КОПЕЕК
  var supIndexTotal = document.createElement('sup');
  supIndexTotal.innerHTML = Number(String(cart[indexItem].goodPrice).split('.')[1]) + 'коп.';
  divTotalPriceForSuchAProduct.appendChild(supIndexTotal);

  //в divRow добавляем divColDeleteProduct для удаления товара из корзины
  var divColDeleteProduct = document.createElement('div');
  divColDeleteProduct.className = "col-1";
  divRow.appendChild(divColDeleteProduct);
  //в divColDeleteProduct добавляем кнопку для удаления товара
  var buttonDeleteProduct = document.createElement('button');
  buttonDeleteProduct.setAttribute("type", "button");
  buttonDeleteProduct.setAttribute("data-id", cart[indexItem].id);
  buttonDeleteProduct.className = "close";
  divColDeleteProduct.appendChild(buttonDeleteProduct);
  //внутрь кнопки buttonDeleteProduct добавляем span
  var spanX = document.createElement('span');
  spanX.setAttribute("aria-hidden", "btrue");
  spanX.innerHTML = '×';
  buttonDeleteProduct.appendChild(spanX);

  listenerChangeAmountProductInCart();
  listenerDeleteProductFromCart();
  listenerPlaceAnOrder();
};

//слушатель для изменения количества товара в корзине
function listenerChangeAmountProductInCart() {
  var decreaseProductButtons = document.querySelectorAll('.decrease-amount-product'); //все кнопки уменьшить кол-во товара в корзине
  for (var i = 0; i < decreaseProductButtons.length; i++) {
    addEvent(decreaseProductButtons[i], 'click', decreaseProductAmountInCart);
    addEvent(decreaseProductButtons[i], 'click', changeTotalPriceForSuchAProduct);
    addEvent(decreaseProductButtons[i], 'click', calculateTotalPrice);
  };

  var increaseProductButtons = document.querySelectorAll('.increase-amount-product'); //все кнопки уменьшить кол-во товара в корзине
  for (var i = 0; i < increaseProductButtons.length; i++) {
    addEvent(increaseProductButtons[i], 'click', increaseProductAmountInCart);
    addEvent(increaseProductButtons[i], 'click', changeTotalPriceForSuchAProduct);
    addEvent(increaseProductButtons[i], 'click', calculateTotalPrice);
  };
};

//слушатель для удаления товара из корзины
function listenerDeleteProductFromCart() {
  var deleteProductButton = document.querySelectorAll('.close'); //все кнопки удаления товара
  for (var i = 0; i < deleteProductButton.length; i++) {
    addEvent(deleteProductButton[i], 'click', deleteProduct);
  };
};

//уменьшение количества товара в корзине
function decreaseProductAmountInCart(e) {
  var closestRow = this.closest('.row');
  var elemContentAmount = closestRow.getElementsByTagName('p');
  var presentValueOfProduct = elemContentAmount[0].innerHTML;
  if (+presentValueOfProduct >= 1) {
    elemContentAmount[0].innerHTML = +presentValueOfProduct - 1;
  };
};

//увеличение количества товара в корзине
function increaseProductAmountInCart(e) {
  var closestRow = this.closest('.row');
  var elemContentAmount = closestRow.getElementsByTagName('p');
  var presentValueOfProduct = elemContentAmount[0].innerHTML;
  //console.log(presentValueOfProduct);
  var idProduct = elemContentAmount[0].getAttribute('data-id');
  var tempObjProduct = {};
  for (var i = 0; i < goodsFromServer.length; i++) {
    if (goodsFromServer[i].id == idProduct) {
      tempObjProduct = goodsFromServer[i];
      //console.log(tempObjProduct);
    };
  };
  if (+presentValueOfProduct < tempObjProduct.numberOfGoods) {
    elemContentAmount[0].innerHTML = +presentValueOfProduct + 1;
    //console.log(elemContentAmount[0].innerHTML = +presentValueOfProduct + 1);
  };
};

function changeTotalPriceForSuchAProduct(e) {
  var closestRow = this.closest('.row');
  var elemContentAmount = closestRow.getElementsByTagName('p');
  var parentOfRow = closestRow.parentNode;
  var secondRow = parentOfRow.closest('.row');
  var elemTotalPriceFotSuchProduct = secondRow.getElementsByClassName('item-price-total')[0];
  var idProduct = elemContentAmount[0].getAttribute('data-id');
  //console.log(idProduct);
  var tempObjProduct;
  for (var i = 0; i < goodsFromServer.length; i++) {
    if (goodsFromServer[i].id == idProduct) {
      tempObjProduct = goodsFromServer[i];
    };
  };
  elemTotalPriceFotSuchProduct.innerHTML = '';
  //console.log(elemTotalPriceFotSuchProduct.innerHTML);
  var priceForPiece = tempObjProduct.goodPrice;
  //console.log(priceForPiece);
  var presentValueOfProduct = elemContentAmount[0].innerHTML;
  var TotalPriceFor = (((+priceForPiece * 100) * +presentValueOfProduct) / 100).toFixed(2);
  var pIndexTotal = document.createElement('span');
  pIndexTotal.innerHTML = Math.trunc(TotalPriceFor) + 'р.';
  elemTotalPriceFotSuchProduct.appendChild(pIndexTotal);
  var supIndexTotal = document.createElement('sup');
  supIndexTotal.innerHTML = Math.trunc((Number(String(TotalPriceFor).split('.')[1])).toFixed(2)) + 'коп.';
  elemTotalPriceFotSuchProduct.appendChild(supIndexTotal);
};

function deleteProduct() {
  var removeProductID = this.getAttribute('data-id');
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id == removeProductID) {
      cart.splice(i, 1);
      break
    };
  };
  var elem = this.closest('.string');
  elem.remove();
  //console.log(elem);
  calculateTotalPrice();
};

function calculateTotalPrice() {
  var elemTotalPrice = document.getElementById('total-price'); //див в футере модалки
  var elemsItemPriceTotal = document.getElementsByClassName('item-price-total'); //элементы с итоговой ценой позиции
  var itemPriceTotalRUB = [];
  var itemPriceTotalCOP = [];
  var totalPriceNoFixed = 0;

  //сформируем массив с рублями и копейками от каждого продукта в корзине
  for (var i = 0; i < elemsItemPriceTotal.length; i++) {
    //console.log(elemsItemPriceTotal);
    var stringRUB = elemsItemPriceTotal[i].firstChild.innerHTML;
    //console.log(stringRUB);
    var stringCOP = elemsItemPriceTotal[i].lastChild.innerHTML;
    //console.log(stringCOP);
    var numberRUB = ((stringRUB + '').match(/\d/g)).join('');
    //console.log(numberRUB);
    var numberCOP = ((stringCOP + '').match(/\d/g)).join('');
    //console.log(numberCOP);
    itemPriceTotalRUB.push(+numberRUB);
    itemPriceTotalCOP.push(+numberCOP);
  };
  //console.log(itemPriceTotalRUB);
  //console.log(itemPriceTotalCOP);

  //рассчитаем общую сумму заказа
  for (var i = 0; i < itemPriceTotalRUB.length; i++) {
    var RUB = itemPriceTotalRUB[i];
    var COP = itemPriceTotalCOP[i];
    totalPriceNoFixed += Number(+(RUB + '.' + COP));
    totalPrice = totalPriceNoFixed.toFixed(2);
    //console.log(totalPrice);
  };
  //console.log(totalPrice);

  //обнулим содержимое того дива, в котором сейчас указана общая цена
  elemTotalPrice.innerHTML = '';

  //сделаем жирный шрифт для отображения итоговой цены
  var bold = document.createElement('b');
  elemTotalPrice.appendChild(bold);

  //вставим рубли
  var totalRUB = document.createElement('span');
  totalRUB.setAttribute('id', 'total-RUB');
  totalRUB.innerHTML = Math.trunc(totalPrice) + 'р.';;
  bold.appendChild(totalRUB);
  //вставим копейки
  var totalCOP = document.createElement('sup');
  totalCOP.setAttribute('id', 'total-COP');
  totalCOP.innerHTML = Math.trunc((Number(String(totalPrice).split('.')[1])).toFixed(2)) + 'коп.';
  bold.appendChild(totalCOP);

  renderTotalAmountAndPriceMainPage();
};

function renderTotalAmountAndPriceMainPage() {
  var elemAmountMainPage = document.getElementById('total-amount-main-page');
  var elemPriceMainPageRUB = document.getElementById('total-price-main-page-RUB');
  var elemPriceMainPageCOP = document.getElementById('total-price-main-page-COP');
  var elemModalCartTotalPriceRUB = document.getElementById('total-RUB');
  var ModalCartTotalPriceRUB = elemModalCartTotalPriceRUB.innerHTML;
  var elemModalCartTotalPriceCOP = document.getElementById('total-COP');
  var ModalCartTotalPriceCOP = elemModalCartTotalPriceCOP.innerHTML;
  var elemsAmountModal = document.getElementsByClassName('present-amount');
  var totlaAmount = 0;

  for (var i = 0; i < elemsAmountModal.length; i++) {
    var amountOfSuchAProduct = elemsAmountModal[i].innerHTML;
    //console.log(amountOfSuchAProduct);
    totlaAmount += +amountOfSuchAProduct;
  };
  //console.log(totlaAmount);

  elemAmountMainPage.innerHTML = totlaAmount;
  elemPriceMainPageRUB.innerHTML = ModalCartTotalPriceRUB;
  elemPriceMainPageCOP.innerHTML = ModalCartTotalPriceCOP;
};

//слушатель для оформления заказа
function listenerPlaceAnOrder() {
  var buttonPlaceAnOrder = document.getElementById("place-an-order");
  addEvent(buttonPlaceAnOrder, 'click', placeAnOrder);
};

function getCookie(name) {
  var results = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  if (results) return (unescape(results[2]));
  else return null;
};

function placeAnOrder() {
  //console.log(sessionIDFromServer);
  var cookiesSessionID = getCookie('sessionID');
  //console.log(cookiesSessionID);
  //console.log(moneyFromServer);
  //console.log(totalPrice);
  if (sessionIDFromServer == cookiesSessionID) {

    if (totalPrice < moneyFromServer) {
      alert('Ваш заказ передан специалисту, который вскоре свяжется с вами для уточнения деталей');
      document.getElementById('cart-item').innerHTML = '';
      document.getElementById('total-price').innerHTML = '';
      $('#cartModalCenter').modal('hide');
    } else {
      alert('Недостаточно средств, пополните баланс');
    };
  } else {
    alert('Ошибка авторизации, попробуйте войти еще раз');
  };
};

function xhrSessionIDForCookie(value, callback) {
  var getSessionIDForCookie = new XMLHttpRequest();
  var URL = 'http://localhost:3000';
  var URI = '/users?' + 'sessionIDDB' + '=' + value;
  //console.log(URI);
  getSessionIDForCookie.open('GET', URL + URI, true);
  getSessionIDForCookie.send();

  getSessionIDForCookie.onreadystatechange = function () {
    if (this.readyState != 4) return;

    if (this.status == 200) {
      if (typeof callback === "function") {
        callback.apply(getSessionIDForCookie);
      };
    } else {
      // обработать ошибку
      alert(this.status + ': ' + this.statusText); // пример вывода: 404: Not Found
      return;
    };
  };
};

function checkAviableCoockie() {
  listenerForAutorization();
  var aviableCookiesSessionID = getCookie('sessionID');
  if (aviableCookiesSessionID) {
    var aviableCookiesID = getCookie('id');
    xhrSessionIDForCookie(aviableCookiesSessionID, function () {
      var userObj = JSON.parse(this.responseText); // пропарсенный массив объектов с сервера 
      var loginFromServer = userObj[0].login;
      if (loginFromServer == aviableCookiesID) {
        replaceAuthenticationFormToGreeting(loginFromServer);
      };
    });
  };
  xhrSessionID('login', aviableCookiesID);
};

xhrGoods(paramGoods, valueParam);
xhrUsers(paramUsers, valueUsers);

//слушатель на прокрутку на сетке товаров
addEvent(document.querySelector('.content-grid'), 'wheel', changeMainScreenAmountGoods);


window.addEventListener('DOMContentLoaded', checkAviableCoockie);




