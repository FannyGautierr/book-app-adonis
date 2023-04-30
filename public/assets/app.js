/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/css/app.css":
/*!*******************************!*\
  !*** ./resources/css/app.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/node-fetch/browser.js":
/*!********************************************!*\
  !*** ./node_modules/node-fetch/browser.js ***!
  \********************************************/
/***/ ((module, exports, __webpack_require__) => {



// ref: https://github.com/tc39/proposal-global
var getGlobal = function () {
	// the only reliable means to get the global object is
	// `Function('return this')()`
	// However, this causes CSP violations in Chrome apps.
	if (typeof self !== 'undefined') { return self; }
	if (typeof window !== 'undefined') { return window; }
	if (typeof __webpack_require__.g !== 'undefined') { return __webpack_require__.g; }
	throw new Error('unable to locate global object');
}

var globalObject = getGlobal();

module.exports = exports = globalObject.fetch;

// Needed for TypeScript and Webpack.
if (globalObject.fetch) {
	exports["default"] = globalObject.fetch.bind(globalObject);
}

exports.Headers = globalObject.Headers;
exports.Request = globalObject.Request;
exports.Response = globalObject.Response;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_app_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/app.css */ "./resources/css/app.css");

var category = document.querySelectorAll(".category");
category.forEach(function (item) {
  item.addEventListener("click", function () {
    document.cookie = "category=" + item.innerHTML.toLowerCase();
    console.log(document.cookie);
  });
});
function getCookieValue(cookieName) {
  var cookieString = decodeURIComponent(document.cookie);
  var cookies = cookieString.split(';');
  for (var _i = 0; _i < cookies.length; _i++) {
    var cookie = cookies[_i].trim();
    if (cookie.startsWith(cookieName + '=')) {
      return cookie.substring(cookieName.length + 1);
    }
  }
  return null;
}
var recoUrl = document.querySelector(".reco");
document.addEventListener("DOMContentLoaded", function () {
  var category = getCookieValue('category');
  if (category !== null) {
    recoUrl.href = '/reco/' + category;
  } else {
    recoUrl.href = '/reco/classics';
  }
});
var searchInput = document.querySelector(".search-input");
searchInput.addEventListener("keydown", function () {
  var query = searchInput.value;
  var fetch = __webpack_require__(/*! node-fetch */ "./node_modules/node-fetch/browser.js");

  /*const url = `http://openlibrary.org/search.json?title=${query}&language:eng`;*/
  var url = "https://www.googleapis.com/books/v1/volumes?q=".concat(query, "&orderBy=relevance");
  console.log(url);
  fetch(url).then(function (res) {
    return res.json();
  }).then(function (json) {
    console.log(json);
    var dropdown = document.querySelector(".drop-down");
    dropdown.classList.remove("hidden");
    dropdown.innerHTML = "";
    for (var _i2 = 0; _i2 < 10; _i2++) {
      var _dropdown = document.querySelector(".drop-down");
      var link = document.createElement("a");
      var key = json.items[_i2].id;
      link.href = "/book/" + key;
      var title = document.createElement("p");
      title.innerHTML = json.items[_i2].volumeInfo.title;
      link.appendChild(title);
      _dropdown.appendChild(link);
    }
  })["catch"](function (err) {
    return console.log(err);
  });
});
var dropdown = document.querySelector(".drop-down");
dropdown.addEventListener("mouseleave", function () {
  dropdown.classList.add("hidden");
});
var homeSelect = document.querySelectorAll(".home-select");
for (var i = 0; i < homeSelect.length; i++) {
  homeSelect[i].addEventListener('click', function () {
    var categories = document.querySelector("#category-component");
    var trending = document.querySelector("#trending-component");
    var discover = document.querySelector("#discover-component");
    for (var j = 0; j < homeSelect.length; j++) {
      homeSelect[j].classList.remove('active');
    }
    this.classList.add('active');
    if (this.classList.contains("our-categories")) {
      console.log("categories");
      categories.classList.remove('hidden');
      trending.classList.add('hidden');
      discover.classList.add('hidden');
    } else if (this.classList.contains("trending")) {
      console.log("trend");
      trending.classList.remove('hidden');
      categories.classList.add('hidden');
      discover.classList.add('hidden');
    } else {
      discover.classList.remove('hidden');
      categories.classList.add('hidden');
      trending.classList.add('hidden');
    }
  });
}
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUcsQ0FBQyxZQUFZLENBQUM7TUFDekJ1QyxVQUFVLENBQUNiLFNBQVMsQ0FBQ0MsTUFBTSxDQUFDLFFBQVEsQ0FBQztNQUNyQ2EsUUFBUSxDQUFDZCxTQUFTLENBQUNXLEdBQUcsQ0FBQyxRQUFRLENBQUM7TUFDaENJLFFBQVEsQ0FBQ2YsU0FBUyxDQUFDVyxHQUFHLENBQUMsUUFBUSxDQUFDO0lBRWxDLENBQUMsTUFBSyxJQUFHLElBQUksQ0FBQ1gsU0FBUyxDQUFDaUIsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFDO01BQzNDNUMsT0FBTyxDQUFDQyxHQUFHLENBQUMsT0FBTyxDQUFDO01BRXBCd0MsUUFBUSxDQUFDZCxTQUFTLENBQUNDLE1BQU0sQ0FBQyxRQUFRLENBQUM7TUFDbkNZLFVBQVUsQ0FBQ2IsU0FBUyxDQUFDVyxHQUFHLENBQUMsUUFBUSxDQUFDO01BQ2xDSSxRQUFRLENBQUNmLFNBQVMsQ0FBQ1csR0FBRyxDQUFDLFFBQVEsQ0FBQztJQUNsQyxDQUFDLE1BQUk7TUFDSEksUUFBUSxDQUFDZixTQUFTLENBQUNDLE1BQU0sQ0FBQyxRQUFRLENBQUM7TUFDbkNZLFVBQVUsQ0FBQ2IsU0FBUyxDQUFDVyxHQUFHLENBQUMsUUFBUSxDQUFDO01BQ2xDRyxRQUFRLENBQUNkLFNBQVMsQ0FBQ1csR0FBRyxDQUFDLFFBQVEsQ0FBQztJQUNsQztFQUNGLENBQUMsQ0FBQztBQUNKLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ib29rLWNsdWIvLi9yZXNvdXJjZXMvY3NzL2FwcC5jc3M/NTMwNCIsIndlYnBhY2s6Ly9ib29rLWNsdWIvLi9ub2RlX21vZHVsZXMvbm9kZS1mZXRjaC9icm93c2VyLmpzIiwid2VicGFjazovL2Jvb2stY2x1Yi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ib29rLWNsdWIvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9ib29rLWNsdWIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9ib29rLWNsdWIvLi9yZXNvdXJjZXMvanMvYXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vLyByZWY6IGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLWdsb2JhbFxudmFyIGdldEdsb2JhbCA9IGZ1bmN0aW9uICgpIHtcblx0Ly8gdGhlIG9ubHkgcmVsaWFibGUgbWVhbnMgdG8gZ2V0IHRoZSBnbG9iYWwgb2JqZWN0IGlzXG5cdC8vIGBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpYFxuXHQvLyBIb3dldmVyLCB0aGlzIGNhdXNlcyBDU1AgdmlvbGF0aW9ucyBpbiBDaHJvbWUgYXBwcy5cblx0aWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykgeyByZXR1cm4gc2VsZjsgfVxuXHRpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHsgcmV0dXJuIHdpbmRvdzsgfVxuXHRpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHsgcmV0dXJuIGdsb2JhbDsgfVxuXHR0aHJvdyBuZXcgRXJyb3IoJ3VuYWJsZSB0byBsb2NhdGUgZ2xvYmFsIG9iamVjdCcpO1xufVxuXG52YXIgZ2xvYmFsT2JqZWN0ID0gZ2V0R2xvYmFsKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGdsb2JhbE9iamVjdC5mZXRjaDtcblxuLy8gTmVlZGVkIGZvciBUeXBlU2NyaXB0IGFuZCBXZWJwYWNrLlxuaWYgKGdsb2JhbE9iamVjdC5mZXRjaCkge1xuXHRleHBvcnRzLmRlZmF1bHQgPSBnbG9iYWxPYmplY3QuZmV0Y2guYmluZChnbG9iYWxPYmplY3QpO1xufVxuXG5leHBvcnRzLkhlYWRlcnMgPSBnbG9iYWxPYmplY3QuSGVhZGVycztcbmV4cG9ydHMuUmVxdWVzdCA9IGdsb2JhbE9iamVjdC5SZXF1ZXN0O1xuZXhwb3J0cy5SZXNwb25zZSA9IGdsb2JhbE9iamVjdC5SZXNwb25zZTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi4vY3NzL2FwcC5jc3MnXG5cblxubGV0IGNhdGVnb3J5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jYXRlZ29yeVwiKVxuXG5jYXRlZ29yeS5mb3JFYWNoKChpdGVtKT0+e1xuICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IFwiY2F0ZWdvcnk9XCIraXRlbS5pbm5lckhUTUwudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc29sZS5sb2coZG9jdW1lbnQuY29va2llKVxuICAgIH0pXG59KVxuXG5mdW5jdGlvbiBnZXRDb29raWVWYWx1ZShjb29raWVOYW1lKSB7XG4gICAgY29uc3QgY29va2llU3RyaW5nID0gZGVjb2RlVVJJQ29tcG9uZW50KGRvY3VtZW50LmNvb2tpZSk7XG4gICAgY29uc3QgY29va2llcyA9IGNvb2tpZVN0cmluZy5zcGxpdCgnOycpO1xuICBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvb2tpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGNvb2tpZSA9IGNvb2tpZXNbaV0udHJpbSgpO1xuICBcbiAgICAgIGlmIChjb29raWUuc3RhcnRzV2l0aChjb29raWVOYW1lICsgJz0nKSkge1xuICAgICAgICByZXR1cm4gY29va2llLnN1YnN0cmluZyhjb29raWVOYW1lLmxlbmd0aCArIDEpO1xuICAgICAgfVxuICAgIH1cbiAgXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuXG5sZXQgcmVjb1VybCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVjb1wiKVxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIixmdW5jdGlvbigpe1xuICAgIFxuICAgIGxldCBjYXRlZ29yeSA9IGdldENvb2tpZVZhbHVlKCdjYXRlZ29yeScpO1xuICAgIGlmKGNhdGVnb3J5ICE9PSBudWxsKXtcbiAgICAgICAgcmVjb1VybC5ocmVmID0gJy9yZWNvLycrY2F0ZWdvcnlcbiAgICB9ZWxzZXtcbiAgICAgICAgcmVjb1VybC5ocmVmID0gJy9yZWNvL2NsYXNzaWNzJ1xuICAgIH1cblxufSlcblxuXG5sZXQgc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlYXJjaC1pbnB1dFwiKVxuXG5zZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBmdW5jdGlvbigpe1xuICAgIGxldCBxdWVyeSA9IHNlYXJjaElucHV0LnZhbHVlIFxuICAgIGNvbnN0IGZldGNoID0gcmVxdWlyZSgnbm9kZS1mZXRjaCcpO1xuICBcbiAgICAvKmNvbnN0IHVybCA9IGBodHRwOi8vb3BlbmxpYnJhcnkub3JnL3NlYXJjaC5qc29uP3RpdGxlPSR7cXVlcnl9Jmxhbmd1YWdlOmVuZ2A7Ki9cbiAgICBjb25zdCB1cmwgPSBgaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYm9va3MvdjEvdm9sdW1lcz9xPSR7cXVlcnl9Jm9yZGVyQnk9cmVsZXZhbmNlYFxuICAgIGNvbnNvbGUubG9nKHVybClcbiAgXG4gICAgZmV0Y2godXJsKVxuICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgIC50aGVuKGpzb24gPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhqc29uKVxuICAgICAgICBsZXQgZHJvcGRvd24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRyb3AtZG93blwiKVxuICAgICAgICBkcm9wZG93bi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpXG4gICAgICAgIGRyb3Bkb3duLmlubmVySFRNTD1cIlwiXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPDEwIDsgaSsrKXtcbiAgICAgICAgICAgIGxldCBkcm9wZG93biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZHJvcC1kb3duXCIpXG4gICAgICAgICAgICBsZXQgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpXG4gICAgICAgICAgICBsZXQga2V5ID0ganNvbi5pdGVtc1tpXS5pZFxuICAgICAgICAgICAgbGluay5ocmVmID0gXCIvYm9vay9cIisga2V5IFxuICAgICAgICAgICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIilcbiAgICAgICAgICAgIHRpdGxlLmlubmVySFRNTCA9IGpzb24uaXRlbXNbaV0udm9sdW1lSW5mby50aXRsZVxuICAgICAgICAgICAgbGluay5hcHBlbmRDaGlsZCh0aXRsZSlcbiAgICAgICAgICAgIGRyb3Bkb3duLmFwcGVuZENoaWxkKGxpbmspXG4gICAgXG4gICAgICAgIH1cbiAgICB9KVxuICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coZXJyKSkgIFxuXG5cbn0pXG5cbmxldCBkcm9wZG93biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZHJvcC1kb3duXCIpXG5cbmRyb3Bkb3duLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsZnVuY3Rpb24oKXtcbiAgICBkcm9wZG93bi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpXG59KVxuXG5sZXQgaG9tZVNlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaG9tZS1zZWxlY3RcIilcblxuXG5cbmZvciAodmFyIGkgPSAwOyBpIDwgaG9tZVNlbGVjdC5sZW5ndGg7IGkrKykge1xuXG4gICAgaG9tZVNlbGVjdFtpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgY2F0ZWdvcmllcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2F0ZWdvcnktY29tcG9uZW50XCIpXG4gICAgICAgIGxldCB0cmVuZGluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdHJlbmRpbmctY29tcG9uZW50XCIpXG4gICAgICAgIGxldCBkaXNjb3ZlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGlzY292ZXItY29tcG9uZW50XCIpXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGhvbWVTZWxlY3QubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaG9tZVNlbGVjdFtqXS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICBpZih0aGlzLmNsYXNzTGlzdC5jb250YWlucyhcIm91ci1jYXRlZ29yaWVzXCIpKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJjYXRlZ29yaWVzXCIpXG4gICAgICAgIGNhdGVnb3JpZXMuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcbiAgICAgICAgdHJlbmRpbmcuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcbiAgICAgICAgZGlzY292ZXIuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcblxuICAgICAgfWVsc2UgaWYodGhpcy5jbGFzc0xpc3QuY29udGFpbnMoXCJ0cmVuZGluZ1wiKSl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwidHJlbmRcIilcblxuICAgICAgICB0cmVuZGluZy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxuICAgICAgICBjYXRlZ29yaWVzLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpXG4gICAgICAgIGRpc2NvdmVyLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpXG4gICAgICB9ZWxzZXtcbiAgICAgICAgZGlzY292ZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcbiAgICAgICAgY2F0ZWdvcmllcy5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuICAgICAgICB0cmVuZGluZy5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgIl0sIm5hbWVzIjpbImNhdGVnb3J5IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsIml0ZW0iLCJhZGRFdmVudExpc3RlbmVyIiwiY29va2llIiwiaW5uZXJIVE1MIiwidG9Mb3dlckNhc2UiLCJjb25zb2xlIiwibG9nIiwiZ2V0Q29va2llVmFsdWUiLCJjb29raWVOYW1lIiwiY29va2llU3RyaW5nIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwiY29va2llcyIsInNwbGl0IiwiaSIsImxlbmd0aCIsInRyaW0iLCJzdGFydHNXaXRoIiwic3Vic3RyaW5nIiwicmVjb1VybCIsInF1ZXJ5U2VsZWN0b3IiLCJocmVmIiwic2VhcmNoSW5wdXQiLCJxdWVyeSIsInZhbHVlIiwiZmV0Y2giLCJyZXF1aXJlIiwidXJsIiwiY29uY2F0IiwidGhlbiIsInJlcyIsImpzb24iLCJkcm9wZG93biIsImNsYXNzTGlzdCIsInJlbW92ZSIsImxpbmsiLCJjcmVhdGVFbGVtZW50Iiwia2V5IiwiaXRlbXMiLCJpZCIsInRpdGxlIiwidm9sdW1lSW5mbyIsImFwcGVuZENoaWxkIiwiZXJyIiwiYWRkIiwiaG9tZVNlbGVjdCIsImNhdGVnb3JpZXMiLCJ0cmVuZGluZyIsImRpc2NvdmVyIiwiaiIsImNvbnRhaW5zIl0sInNvdXJjZVJvb3QiOiIifQ==