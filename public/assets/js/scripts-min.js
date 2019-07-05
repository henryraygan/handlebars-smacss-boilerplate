(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _sliderBanner = require('./modules/slider-banner');

var _reservationBox = require('./modules/reservation-box');

(0, _sliderBanner.SliderBanner)(4000);
(0, _reservationBox.initDates)();

(0, _reservationBox.boxRoom)();

},{"./modules/reservation-box":2,"./modules/slider-banner":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var initDates = exports.initDates = function initDates() {
  console.log('hello world');
};

var boxRoom = exports.boxRoom = function boxRoom() {
  var currentRoom = document.getElementById('rooms');
  var controlPax = document.getElementById('box-room-pax');

  var h = buildHTML(1);
  controlPax.innerHTML = h;

  currentRoom.addEventListener('change', function (e) {
    var html = '';
    switch (e.target.value) {
      case '2':
        html = buildHTML(2);
        controlPax.innerHTML = html;
        break;
      case '3':
        html = buildHTML(3);
        controlPax.innerHTML = html;
        break;
      case '1':
      default:
        html = buildHTML(1);
        controlPax.innerHTML = html;
        break;
    }
  });
};

var buildHTML = function buildHTML(index) {
  var build = '';
  for (var i = 0; i < index; i++) {
    build += getAddPeople(i);
  }
  return build;
};

var getAddPeople = function getAddPeople(index) {
  return '<div class="box-room__pax-item">\n  <div>\n    <div class="form__group">\n      <label class="form__label" for="adults-' + index + '">\n        Adultos\n      </label>\n      <select class="form__select" name="adults-' + index + '" id="adults-' + index + '">\n        <option value="1">1</option>\n        <option value="2">2</option>\n        <option value="3">3</option>\n      </select>\n    </div>\n  </div>\n  <div>\n    <div class="form__group">\n      <label class="form__label" for="children-' + index + '">\n        Ni\xF1os\n      </label>\n      <select class="form__select" name="children-' + index + '" id="children-' + index + '">\n        <option value="1">1</option>\n        <option value="2">2</option>\n        <option value="3">3</option>\n      </select>\n    </div>\n  </div>\n</div>';
};

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var SliderBanner = exports.SliderBanner = function SliderBanner(duration) {
	var current = 0,
	    slides = [].concat(_toConsumableArray(document.querySelectorAll('.main-header__slider-image')));

	setInterval(function () {
		for (var i = 0; i < slides.length; i++) {
			slides[i].style.opacity = 0;
		}
		current = current != slides.length - 1 ? current + 1 : 0;
		slides[current].style.opacity = 1;
	}, duration);
};

},{}]},{},[1]);

//# sourceMappingURL=scripts-min.js.map
