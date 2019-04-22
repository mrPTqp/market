"use strict";
//для хранения товаров (вместо бэк-энда)
var goods = [
  {
    id: 1,
    goodsName: 'Сок Добрый Яблоко 2л',
    goodsPrice: 102.99,
    numberOfGoods: 13,
    imageOfGoods: './icon/juice.jpeg'
  },
  {
    id: 2,
    goodsName: 'Кофе Jacobs Tassimo Cappuccino Т-диски 8шт',
    goodsPrice: 299.99,
    numberOfGoods: 5,
    imageOfGoods: './icon/coffee.jpeg'
  },
  {
    id: 3,
    goodsName: 'Масло оливковое 0,5л',
    goodsPrice: 585.99,
    numberOfGoods: 123,
    imageOfGoods: './icon/oil.jpeg'
  },
  {
    id: 4,
    goodsName: 'Чай Richard 100п.',
    goodsPrice: 299.99,
    numberOfGoods: 4321,
    imageOfGoods: './icon/tea.jpeg'
  },
  {
    id: 5,
    goodsName: 'Сок Добрый Яблоко 2л',
    goodsPrice: 102.99,
    numberOfGoods: 13,
    imageOfGoods: './icon/juice.jpeg'
  },
  {
    id: 6,
    goodsName: 'Кофе Jacobs Tassimo Cappuccino Т-диски 8шт',
    goodsPrice: 299.99,
    numberOfGoods: 5,
    imageOfGoods: './icon/coffee.jpeg'
  },
  {
    id: 7,
    goodsName: 'Масло оливковое 0,5л',
    goodsPrice: 585.99,
    numberOfGoods: 123,
    imageOfGoods: './icon/oil.jpeg'
  },
  {
    id: 8,
    goodsName: 'Чай Richard 100п.',
    goodsPrice: 299.99,
    numberOfGoods: 4321,
    imageOfGoods: './icon/tea.jpeg'
  },
  {
    id: 9,
    goodsName: 'Сок Добрый Яблоко 2л',
    goodsPrice: 102.99,
    numberOfGoods: 13,
    imageOfGoods: './icon/juice.jpeg'
  },
  {
    id: 10,
    goodsName: 'Кофе Jacobs Tassimo Cappuccino Т-диски 8шт',
    goodsPrice: 299.99,
    numberOfGoods: 5,
    imageOfGoods: './icon/coffee.jpeg'
  },
  {
    id: 11,
    goodsName: 'Масло оливковое 0,5л',
    goodsPrice: 585.99,
    numberOfGoods: 123,
    imageOfGoods: './icon/oil.jpeg'
  },
  {
    id: 12,
    goodsName: 'Чай Richard 100п.',
    goodsPrice: 299.99,
    numberOfGoods: 4321,
    imageOfGoods: './icon/tea.jpeg'
  },
  {
    id: 13,
    goodsName: 'Сок Добрый Яблоко 2л',
    goodsPrice: 102.99,
    numberOfGoods: 13,
    imageOfGoods: './icon/juice.jpeg'
  },
  {
    id: 14,
    goodsName: 'Кофе Jacobs Tassimo Cappuccino Т-диски 8шт',
    goodsPrice: 299.99,
    numberOfGoods: 5,
    imageOfGoods: './icon/coffee.jpeg'
  },
  {
    id: 15,
    goodsName: 'Масло оливковое 0,5л',
    goodsPrice: 585.99,
    numberOfGoods: 123,
    imageOfGoods: './icon/oil.jpeg'
  },
  {
    id: 16,
    goodsName: 'Чай Richard 100п.',
    goodsPrice: 299.99,
    numberOfGoods: 4321,
    imageOfGoods: './icon/tea.jpeg'
  },
]

//объект для хранения idDB (это ID в базе данных), passwordDB (это пароль в базе данных) и баланса
var users = [
  {
    idDB: 'mrPTqp@gmail.com',
    passwordDB: '123',
    moneyBalanceDB: 12873
  },
  {
    idDB: 'PTqp@yandex.ru',
    passwordDB: '321',
    moneyBalanceDB: 3333
  }
]

//объект для хранения токена сессии и idDB пользователя
var sessions = {};

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
    for (var i = 0; i < users.length; i++) {
      if (users[i].idDB == email && users[i].passwordDB == password) {
        generateToken(email, password);
        replaceAuthenticationFormToGreeting();
      }
    }
    if (!sessions.idDB) alert('Ошибка при вводе email или пароль. Попробуйте еще раз');
  }

  //генерирует на основе достоверных email и password токен для sessionID
  function generateToken(email, password) {
    var sumEmailPassword = email + password;
    var token = MD5(sumEmailPassword);

    setSessions(token);
    setCookie(email, token);
  }

  //записывает полученный токен в sessions
  function setSessions(token) {
    sessions.idDB = token;
    console.log(sessions);
  }

  //записывает токен и email пользователя в куки
  function setCookie(userIdDB, token) {
    Cookies.set('id', userIdDB, { expires: 365 });
    Cookies.set('sessionID', token, { expires: 365 });
    console.log(document.cookie);
  }

  //при успешной авторизации заменяет форму для ввода логина и пароля на приветствие и кнопку "выйти"
  function replaceAuthenticationFormToGreeting() {
    var autorizationForm = document.getElementById('autorization');

    autorizationForm.innerHTML = '<div class="d-flex flex-column bd-highlight mb-3 row"><div class="d-flex justify-content-center col-"><p>Привет, <b>' + email + '</b></p></div><div class="d-flex justify-content-center col-"><button type="button" class="btn btn-sm btn btn-light ml-2" id="quit" onclick="deleteSessionIDfromCookie()">Выйти</button></div></div></div>';
  };
  authentication(email, password);
};

//при нажатии кнопки "Выйти" удаляем sessionID из куки и объекта sessions и заменяем приветствие на форму авторизации
function deleteSessionIDfromCookie() {
  Cookies.remove('id');
  Cookies.remove('sessionID');
  var autorizationForm = document.getElementById('autorization');
  autorizationForm.innerHTML = '<form class="form-inline"><div class="row"><div class="col-"><input type="email" class="form-control ml-2" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Введите email"></div><div class="col-"><input type="password" class="form-control ml-2" id="exampleInputPassword1" placeholder="Введите пароль"></div><div class="col-"><button type="submit" class="btn btn-xs btn-primary ml-2" id="submit" onclick="controlCookiesAndSessions()">Войти</button></div></div></form>'
  console.log(document.cookie);
};

var contentItems = document.querySelectorAll('.content-item'); //все кнопки "В корзину"
var cartItem = document.getElementById('.cart-item'); //сущность корзины

function addEvent(elem, type, handler) {
  if (elem.addEventListener) {
    elem.addEventListener(type, handler, false);
  } else {
    elem.attachEvent('on' + type, function () { handler.call(elem); });
  }
  return false;
};

//вызываем слушателя для каждой кнопки "В корзину" на странице
for (var i = 0; i < contentItems.length; i++) {
  addEvent(contentItems[i].querySelector('.add_item'), 'click', addToCart);
};

function addToCart(e) {
  
  if (!cart) {
    var cart = [];
  }; // получаем данные корзины или создаём новый массив, если данных еще нет

  var parentBox = this.parentNode; // родительский элемент кнопки "Добавить в корзину"
  var itemId = this.getAttribute('data-id'); // ID товара

  for (var j = 1; j < goods.length; j++) {
    for (var id in goods[j]) {
      if (id == itemId) {
      cart.push(goods[j]);
      } else continue;
    };
  };

  alert(cart);
}
