/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/Node.js":
/*!*********************!*\
  !*** ./lib/Node.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function Node() {
  _classCallCheck(this, Node);

  this.endOfWord = false;
  this.children = {};
};

/***/ }),

/***/ "./lib/Trie.js":
/*!*********************!*\
  !*** ./lib/Trie.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Node = __webpack_require__(/*! ../lib/Node */ "./lib/Node.js");

module.exports = function () {
  function Trie() {
    _classCallCheck(this, Trie);

    this.wordCount = 0;
    this.root = new Node();
  }

  _createClass(Trie, [{
    key: 'count',
    value: function count() {
      return this.wordCount;
    }
  }, {
    key: 'insert',
    value: function insert(word) {
      var letters = [].concat(_toConsumableArray(word.toLowerCase()));
      var currNode = this.root;

      while (letters.length) {
        var letter = letters[0];
        var node = new Node();

        if (!currNode.children[letter]) {
          currNode.children[letter] = node;
          currNode = currNode.children[letter];
        } else {
          currNode = currNode.children[letter];
        }
        letters.shift();
      }

      if (!currNode.endOfWord) {
        currNode.endOfWord = true;
        this.wordCount++;
      }
      return;
    }
  }, {
    key: 'getSuggestions',
    value: function getSuggestions(string, root) {
      var allSuggestions = [];

      searchForWords(string);

      return allSuggestions;

      function searchForWords(string) {
        var letters = [].concat(_toConsumableArray(string));
        var currNode = root;

        for (var i = 0; i < letters.length; i++) {
          if (!currNode) {
            return [];
          }
          currNode = currNode.children[letters[i]];
        }

        Object.keys(currNode.children).forEach(function (currLetter) {
          var newSearch = string + currLetter;

          if (currNode.children[currLetter].endOfWord) {
            allSuggestions.push(newSearch);
          }
          searchForWords(newSearch);
        });
      }
    }
  }, {
    key: 'populate',
    value: function populate(words) {
      var _this = this;

      words.forEach(function (word) {
        return _this.insert(word);
      });
    }
  }, {
    key: 'removeWord',
    value: function removeWord(word) {
      var inputs = [].concat(_toConsumableArray(word));
      var currNode = this.root;

      for (var i = 0; i < inputs.length; i++) {
        if (!currNode) {
          return null;
        }
        currNode = currNode.children[inputs[i]];
      }
      if (currNode.endOfWord) {
        currNode.endOfWord = false;
        this.wordCount--;
      }
      return;
    }
  }]);

  return Trie;
}();

/***/ }),

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Trie = __webpack_require__(/*! ../lib/Trie */ "./lib/Trie.js");
var Node = __webpack_require__(/*! ../lib/Node.js */ "./lib/Node.js");
// const fs = require('fs');
var text = "/usr/share/dict/words";
var dictionary = fs.readFileSync(text).toString().trim().split('\n');

var textInput = document.querySelector('input');
var display = document.querySelector('ul');

var prefixTrie = new Trie();

prefixTrie.populate(dictionary);

textInput.addEventListener('keyup', function () {
  display.innerHTML = '<li>' + prefixTrie.getSuggestions(textInput.value, prefixTrie.root) + '</li>';
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbGliL05vZGUuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL1RyaWUuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2luZGV4LmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJlbmRPZldvcmQiLCJjaGlsZHJlbiIsIk5vZGUiLCJyZXF1aXJlIiwid29yZENvdW50Iiwicm9vdCIsIndvcmQiLCJsZXR0ZXJzIiwidG9Mb3dlckNhc2UiLCJjdXJyTm9kZSIsImxlbmd0aCIsImxldHRlciIsIm5vZGUiLCJzaGlmdCIsInN0cmluZyIsImFsbFN1Z2dlc3Rpb25zIiwic2VhcmNoRm9yV29yZHMiLCJpIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJuZXdTZWFyY2giLCJjdXJyTGV0dGVyIiwicHVzaCIsIndvcmRzIiwiaW5zZXJ0IiwiaW5wdXRzIiwiVHJpZSIsInRleHQiLCJkaWN0aW9uYXJ5IiwiZnMiLCJyZWFkRmlsZVN5bmMiLCJ0b1N0cmluZyIsInRyaW0iLCJzcGxpdCIsInRleHRJbnB1dCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImRpc3BsYXkiLCJwcmVmaXhUcmllIiwicG9wdWxhdGUiLCJhZGRFdmVudExpc3RlbmVyIiwiaW5uZXJIVE1MIiwiZ2V0U3VnZ2VzdGlvbnMiLCJ2YWx1ZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRkFBLE9BQU9DLE9BQVAsR0FDRSxnQkFBYztBQUFBOztBQUNaLE9BQUtDLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxPQUFLQyxRQUFMLEdBQWdCLEVBQWhCO0FBQ0QsQ0FKSCxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBLElBQU1DLE9BQU8sbUJBQUFDLENBQVEsa0NBQVIsQ0FBYjs7QUFFQUwsT0FBT0MsT0FBUDtBQUNFLGtCQUFjO0FBQUE7O0FBQ1osU0FBS0ssU0FBTCxHQUFpQixDQUFqQjtBQUNBLFNBQUtDLElBQUwsR0FBWSxJQUFJSCxJQUFKLEVBQVo7QUFDRDs7QUFKSDtBQUFBO0FBQUEsNEJBTVU7QUFDTixhQUFPLEtBQUtFLFNBQVo7QUFDRDtBQVJIO0FBQUE7QUFBQSwyQkFVU0UsSUFWVCxFQVVlO0FBQ1gsVUFBSUMsdUNBQWNELEtBQUtFLFdBQUwsRUFBZCxFQUFKO0FBQ0EsVUFBSUMsV0FBVyxLQUFLSixJQUFwQjs7QUFFQSxhQUFPRSxRQUFRRyxNQUFmLEVBQXVCO0FBQ3JCLFlBQUlDLFNBQVNKLFFBQVEsQ0FBUixDQUFiO0FBQ0EsWUFBSUssT0FBTyxJQUFJVixJQUFKLEVBQVg7O0FBRUEsWUFBSSxDQUFDTyxTQUFTUixRQUFULENBQWtCVSxNQUFsQixDQUFMLEVBQWdDO0FBQzlCRixtQkFBU1IsUUFBVCxDQUFrQlUsTUFBbEIsSUFBNEJDLElBQTVCO0FBQ0FILHFCQUFXQSxTQUFTUixRQUFULENBQWtCVSxNQUFsQixDQUFYO0FBQ0QsU0FIRCxNQUdPO0FBQ0xGLHFCQUFXQSxTQUFTUixRQUFULENBQWtCVSxNQUFsQixDQUFYO0FBQ0Q7QUFDREosZ0JBQVFNLEtBQVI7QUFDRDs7QUFFRCxVQUFJLENBQUNKLFNBQVNULFNBQWQsRUFBeUI7QUFDdkJTLGlCQUFTVCxTQUFULEdBQXFCLElBQXJCO0FBQ0EsYUFBS0ksU0FBTDtBQUNEO0FBQ0Q7QUFDRDtBQWhDSDtBQUFBO0FBQUEsbUNBa0NpQlUsTUFsQ2pCLEVBa0N5QlQsSUFsQ3pCLEVBa0MrQjtBQUMzQixVQUFJVSxpQkFBaUIsRUFBckI7O0FBRUFDLHFCQUFlRixNQUFmOztBQUVBLGFBQU9DLGNBQVA7O0FBRUEsZUFBU0MsY0FBVCxDQUF3QkYsTUFBeEIsRUFBZ0M7QUFDOUIsWUFBSVAsdUNBQWNPLE1BQWQsRUFBSjtBQUNBLFlBQUlMLFdBQVdKLElBQWY7O0FBRUEsYUFBSyxJQUFJWSxJQUFJLENBQWIsRUFBZ0JBLElBQUlWLFFBQVFHLE1BQTVCLEVBQW9DTyxHQUFwQyxFQUF5QztBQUN2QyxjQUFJLENBQUNSLFFBQUwsRUFBZTtBQUNiLG1CQUFPLEVBQVA7QUFDRDtBQUNEQSxxQkFBV0EsU0FBU1IsUUFBVCxDQUFrQk0sUUFBUVUsQ0FBUixDQUFsQixDQUFYO0FBQ0Q7O0FBRURDLGVBQU9DLElBQVAsQ0FBWVYsU0FBU1IsUUFBckIsRUFBK0JtQixPQUEvQixDQUF1QyxzQkFBYztBQUNuRCxjQUFJQyxZQUFZUCxTQUFTUSxVQUF6Qjs7QUFFQSxjQUFJYixTQUFTUixRQUFULENBQWtCcUIsVUFBbEIsRUFBOEJ0QixTQUFsQyxFQUE2QztBQUMzQ2UsMkJBQWVRLElBQWYsQ0FBb0JGLFNBQXBCO0FBQ0Q7QUFDREwseUJBQWVLLFNBQWY7QUFDRCxTQVBEO0FBUUQ7QUFDRjtBQTdESDtBQUFBO0FBQUEsNkJBK0RXRyxLQS9EWCxFQStEa0I7QUFBQTs7QUFDZEEsWUFBTUosT0FBTixDQUFjO0FBQUEsZUFBUSxNQUFLSyxNQUFMLENBQVluQixJQUFaLENBQVI7QUFBQSxPQUFkO0FBQ0Q7QUFqRUg7QUFBQTtBQUFBLCtCQW1FYUEsSUFuRWIsRUFtRW1CO0FBQ2YsVUFBSW9CLHNDQUFhcEIsSUFBYixFQUFKO0FBQ0EsVUFBSUcsV0FBVyxLQUFLSixJQUFwQjs7QUFFQSxXQUFLLElBQUlZLElBQUksQ0FBYixFQUFnQkEsSUFBSVMsT0FBT2hCLE1BQTNCLEVBQW1DTyxHQUFuQyxFQUF3QztBQUN0QyxZQUFJLENBQUNSLFFBQUwsRUFBZTtBQUNiLGlCQUFPLElBQVA7QUFDRDtBQUNEQSxtQkFBV0EsU0FBU1IsUUFBVCxDQUFrQnlCLE9BQU9ULENBQVAsQ0FBbEIsQ0FBWDtBQUNEO0FBQ0QsVUFBSVIsU0FBU1QsU0FBYixFQUF3QjtBQUN0QlMsaUJBQVNULFNBQVQsR0FBcUIsS0FBckI7QUFDQSxhQUFLSSxTQUFMO0FBQ0Q7QUFDRDtBQUNEO0FBbEZIOztBQUFBO0FBQUEsSTs7Ozs7Ozs7Ozs7Ozs7QUNGQSxJQUFNdUIsT0FBTyxtQkFBQXhCLENBQVEsa0NBQVIsQ0FBYjtBQUNBLElBQU1ELE9BQU8sbUJBQUFDLENBQVEscUNBQVIsQ0FBYjtBQUNBO0FBQ0EsSUFBTXlCLE9BQU8sdUJBQWI7QUFDQSxJQUFNQyxhQUFhQyxHQUFHQyxZQUFILENBQWdCSCxJQUFoQixFQUFzQkksUUFBdEIsR0FBaUNDLElBQWpDLEdBQXdDQyxLQUF4QyxDQUE4QyxJQUE5QyxDQUFuQjs7QUFFQSxJQUFNQyxZQUFZQyxTQUFTQyxhQUFULENBQXVCLE9BQXZCLENBQWxCO0FBQ0EsSUFBTUMsVUFBVUYsU0FBU0MsYUFBVCxDQUF1QixJQUF2QixDQUFoQjs7QUFFQSxJQUFNRSxhQUFhLElBQUlaLElBQUosRUFBbkI7O0FBRUFZLFdBQVdDLFFBQVgsQ0FBb0JYLFVBQXBCOztBQUVBTSxVQUFVTSxnQkFBVixDQUEyQixPQUEzQixFQUFvQyxZQUFXO0FBQzdDSCxVQUFRSSxTQUFSLFlBQTJCSCxXQUFXSSxjQUFYLENBQTBCUixVQUFVUyxLQUFwQyxFQUEyQ0wsV0FBV2xDLElBQXRELENBQTNCO0FBQ0QsQ0FGRCxFIiwiZmlsZSI6ImRpc3QvbWFpbi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2xpYi9pbmRleC5qc1wiKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gY2xhc3MgTm9kZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZW5kT2ZXb3JkID0gZmFsc2U7XG4gICAgdGhpcy5jaGlsZHJlbiA9IHt9O1xuICB9XG59IiwiY29uc3QgTm9kZSA9IHJlcXVpcmUoJy4uL2xpYi9Ob2RlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgVHJpZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMud29yZENvdW50ID0gMDtcbiAgICB0aGlzLnJvb3QgPSBuZXcgTm9kZSgpO1xuICB9XG5cbiAgY291bnQoKSB7XG4gICAgcmV0dXJuIHRoaXMud29yZENvdW50O1xuICB9XG5cbiAgaW5zZXJ0KHdvcmQpIHtcbiAgICBsZXQgbGV0dGVycyA9IFsuLi53b3JkLnRvTG93ZXJDYXNlKCldO1xuICAgIGxldCBjdXJyTm9kZSA9IHRoaXMucm9vdDtcblxuICAgIHdoaWxlIChsZXR0ZXJzLmxlbmd0aCkge1xuICAgICAgbGV0IGxldHRlciA9IGxldHRlcnNbMF07XG4gICAgICBsZXQgbm9kZSA9IG5ldyBOb2RlKCk7XG5cbiAgICAgIGlmICghY3Vyck5vZGUuY2hpbGRyZW5bbGV0dGVyXSkge1xuICAgICAgICBjdXJyTm9kZS5jaGlsZHJlbltsZXR0ZXJdID0gbm9kZTtcbiAgICAgICAgY3Vyck5vZGUgPSBjdXJyTm9kZS5jaGlsZHJlbltsZXR0ZXJdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3Vyck5vZGUgPSBjdXJyTm9kZS5jaGlsZHJlbltsZXR0ZXJdO1xuICAgICAgfVxuICAgICAgbGV0dGVycy5zaGlmdCgpO1xuICAgIH1cblxuICAgIGlmICghY3Vyck5vZGUuZW5kT2ZXb3JkKSB7XG4gICAgICBjdXJyTm9kZS5lbmRPZldvcmQgPSB0cnVlO1xuICAgICAgdGhpcy53b3JkQ291bnQrKztcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZ2V0U3VnZ2VzdGlvbnMoc3RyaW5nLCByb290KSB7XG4gICAgbGV0IGFsbFN1Z2dlc3Rpb25zID0gW107XG5cbiAgICBzZWFyY2hGb3JXb3JkcyhzdHJpbmcpO1xuXG4gICAgcmV0dXJuIGFsbFN1Z2dlc3Rpb25zO1xuXG4gICAgZnVuY3Rpb24gc2VhcmNoRm9yV29yZHMoc3RyaW5nKSB7XG4gICAgICBsZXQgbGV0dGVycyA9IFsuLi5zdHJpbmddO1xuICAgICAgbGV0IGN1cnJOb2RlID0gcm9vdDtcbiAgICAgIFxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZXR0ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICghY3Vyck5vZGUpIHtcbiAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgICAgY3Vyck5vZGUgPSBjdXJyTm9kZS5jaGlsZHJlbltsZXR0ZXJzW2ldXTtcbiAgICAgIH1cblxuICAgICAgT2JqZWN0LmtleXMoY3Vyck5vZGUuY2hpbGRyZW4pLmZvckVhY2goY3VyckxldHRlciA9PiB7XG4gICAgICAgIGxldCBuZXdTZWFyY2ggPSBzdHJpbmcgKyBjdXJyTGV0dGVyO1xuXG4gICAgICAgIGlmIChjdXJyTm9kZS5jaGlsZHJlbltjdXJyTGV0dGVyXS5lbmRPZldvcmQpIHtcbiAgICAgICAgICBhbGxTdWdnZXN0aW9ucy5wdXNoKG5ld1NlYXJjaCk7XG4gICAgICAgIH0gXG4gICAgICAgIHNlYXJjaEZvcldvcmRzKG5ld1NlYXJjaCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwb3B1bGF0ZSh3b3Jkcykge1xuICAgIHdvcmRzLmZvckVhY2god29yZCA9PiB0aGlzLmluc2VydCh3b3JkKSk7XG4gIH1cblxuICByZW1vdmVXb3JkKHdvcmQpIHtcbiAgICBsZXQgaW5wdXRzID0gWy4uLndvcmRdO1xuICAgIGxldCBjdXJyTm9kZSA9IHRoaXMucm9vdDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5wdXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoIWN1cnJOb2RlKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgY3Vyck5vZGUgPSBjdXJyTm9kZS5jaGlsZHJlbltpbnB1dHNbaV1dO1xuICAgIH1cbiAgICBpZiAoY3Vyck5vZGUuZW5kT2ZXb3JkKSB7XG4gICAgICBjdXJyTm9kZS5lbmRPZldvcmQgPSBmYWxzZTtcbiAgICAgIHRoaXMud29yZENvdW50LS07XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxufVxuXG4iLCJjb25zdCBUcmllID0gcmVxdWlyZSgnLi4vbGliL1RyaWUnKTtcbmNvbnN0IE5vZGUgPSByZXF1aXJlKCcuLi9saWIvTm9kZS5qcycpO1xuLy8gY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuY29uc3QgdGV4dCA9IFwiL3Vzci9zaGFyZS9kaWN0L3dvcmRzXCI7XG5jb25zdCBkaWN0aW9uYXJ5ID0gZnMucmVhZEZpbGVTeW5jKHRleHQpLnRvU3RyaW5nKCkudHJpbSgpLnNwbGl0KCdcXG4nKTtcblxuY29uc3QgdGV4dElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcbmNvbnN0IGRpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd1bCcpO1xuXG5jb25zdCBwcmVmaXhUcmllID0gbmV3IFRyaWUoKTtcblxucHJlZml4VHJpZS5wb3B1bGF0ZShkaWN0aW9uYXJ5KTtcblxudGV4dElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZnVuY3Rpb24oKSB7XG4gIGRpc3BsYXkuaW5uZXJIVE1MID0gYDxsaT4ke3ByZWZpeFRyaWUuZ2V0U3VnZ2VzdGlvbnModGV4dElucHV0LnZhbHVlLCBwcmVmaXhUcmllLnJvb3QpfTwvbGk+YFxufSk7Il0sInNvdXJjZVJvb3QiOiIifQ==