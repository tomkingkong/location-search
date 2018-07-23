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
/***/ (function(module, exports) {

module.exports = class Node {
  constructor() {
    this.endOfWord = false;
    this.children = {};
  }
};

/***/ }),

/***/ "./lib/Trie.js":
/*!*********************!*\
  !*** ./lib/Trie.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Node = __webpack_require__(/*! ../lib/Node */ "./lib/Node.js");

module.exports = class Trie {
  constructor() {
    this.wordCount = 0;
    this.root = new Node();
  }

  count() {
    return this.wordCount;
  }

  insert(word) {
    let letters = [...word.toLowerCase()];
    let currNode = this.root;

    while (letters.length) {
      let letter = letters[0];
      let node = new Node();

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

  getSuggestions(string, root) {
    let allSuggestions = [];

    searchForWords(string);

    return allSuggestions;

    function searchForWords(string) {
      let letters = [...string];
      let currNode = root;

      for (let i = 0; i < letters.length; i++) {
        if (!currNode) {
          return [];
        }
        currNode = currNode.children[letters[i]];
      }

      Object.keys(currNode.children).forEach(currLetter => {
        let newSearch = string + currLetter;

        if (currNode.children[currLetter].endOfWord) {
          allSuggestions.push(newSearch);
        }
        searchForWords(newSearch);
      });
    }
  }

  populate(words) {
    words.forEach(word => this.insert(word));
  }

  removeWord(word) {
    let inputs = [...word];
    let currNode = this.root;

    for (let i = 0; i < inputs.length; i++) {
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
};

/***/ }),

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Trie = __webpack_require__(/*! ../lib/Trie */ "./lib/Trie.js");
const Node = __webpack_require__(/*! ../lib/Node.js */ "./lib/Node.js");
// const fs = require('fs');
const text = "/usr/share/dict/words";
const dictionary = fs.readFileSync(text).toString().trim().split('\n');

const textInput = document.querySelector('input');
const display = document.querySelector('ul');

const prefixTrie = new Trie();

prefixTrie.populate(dictionary);

textInput.addEventListener('keyup', function () {
  display.innerHTML = `<li>${prefixTrie.getSuggestions(textInput.value, prefixTrie.root)}</li>`;
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbGliL05vZGUuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL1RyaWUuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2luZGV4LmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJOb2RlIiwiY29uc3RydWN0b3IiLCJlbmRPZldvcmQiLCJjaGlsZHJlbiIsInJlcXVpcmUiLCJUcmllIiwid29yZENvdW50Iiwicm9vdCIsImNvdW50IiwiaW5zZXJ0Iiwid29yZCIsImxldHRlcnMiLCJ0b0xvd2VyQ2FzZSIsImN1cnJOb2RlIiwibGVuZ3RoIiwibGV0dGVyIiwibm9kZSIsInNoaWZ0IiwiZ2V0U3VnZ2VzdGlvbnMiLCJzdHJpbmciLCJhbGxTdWdnZXN0aW9ucyIsInNlYXJjaEZvcldvcmRzIiwiaSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwiY3VyckxldHRlciIsIm5ld1NlYXJjaCIsInB1c2giLCJwb3B1bGF0ZSIsIndvcmRzIiwicmVtb3ZlV29yZCIsImlucHV0cyIsInRleHQiLCJkaWN0aW9uYXJ5IiwiZnMiLCJyZWFkRmlsZVN5bmMiLCJ0b1N0cmluZyIsInRyaW0iLCJzcGxpdCIsInRleHRJbnB1dCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImRpc3BsYXkiLCJwcmVmaXhUcmllIiwiYWRkRXZlbnRMaXN0ZW5lciIsImlubmVySFRNTCIsInZhbHVlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMx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ImZpbGUiOiJtYWluLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vbGliL2luZGV4LmpzXCIpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBOb2RlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5lbmRPZldvcmQgPSBmYWxzZTtcbiAgICB0aGlzLmNoaWxkcmVuID0ge307XG4gIH1cbn0iLCJjb25zdCBOb2RlID0gcmVxdWlyZSgnLi4vbGliL05vZGUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBUcmllIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy53b3JkQ291bnQgPSAwO1xuICAgIHRoaXMucm9vdCA9IG5ldyBOb2RlKCk7XG4gIH1cblxuICBjb3VudCgpIHtcbiAgICByZXR1cm4gdGhpcy53b3JkQ291bnQ7XG4gIH1cblxuICBpbnNlcnQod29yZCkge1xuICAgIGxldCBsZXR0ZXJzID0gWy4uLndvcmQudG9Mb3dlckNhc2UoKV07XG4gICAgbGV0IGN1cnJOb2RlID0gdGhpcy5yb290O1xuXG4gICAgd2hpbGUgKGxldHRlcnMubGVuZ3RoKSB7XG4gICAgICBsZXQgbGV0dGVyID0gbGV0dGVyc1swXTtcbiAgICAgIGxldCBub2RlID0gbmV3IE5vZGUoKTtcblxuICAgICAgaWYgKCFjdXJyTm9kZS5jaGlsZHJlbltsZXR0ZXJdKSB7XG4gICAgICAgIGN1cnJOb2RlLmNoaWxkcmVuW2xldHRlcl0gPSBub2RlO1xuICAgICAgICBjdXJyTm9kZSA9IGN1cnJOb2RlLmNoaWxkcmVuW2xldHRlcl07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjdXJyTm9kZSA9IGN1cnJOb2RlLmNoaWxkcmVuW2xldHRlcl07XG4gICAgICB9XG4gICAgICBsZXR0ZXJzLnNoaWZ0KCk7XG4gICAgfVxuXG4gICAgaWYgKCFjdXJyTm9kZS5lbmRPZldvcmQpIHtcbiAgICAgIGN1cnJOb2RlLmVuZE9mV29yZCA9IHRydWU7XG4gICAgICB0aGlzLndvcmRDb3VudCsrO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cblxuICBnZXRTdWdnZXN0aW9ucyhzdHJpbmcsIHJvb3QpIHtcbiAgICBsZXQgYWxsU3VnZ2VzdGlvbnMgPSBbXTtcblxuICAgIHNlYXJjaEZvcldvcmRzKHN0cmluZyk7XG5cbiAgICByZXR1cm4gYWxsU3VnZ2VzdGlvbnM7XG5cbiAgICBmdW5jdGlvbiBzZWFyY2hGb3JXb3JkcyhzdHJpbmcpIHtcbiAgICAgIGxldCBsZXR0ZXJzID0gWy4uLnN0cmluZ107XG4gICAgICBsZXQgY3Vyck5vZGUgPSByb290O1xuICAgICAgXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxldHRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKCFjdXJyTm9kZSkge1xuICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICBjdXJyTm9kZSA9IGN1cnJOb2RlLmNoaWxkcmVuW2xldHRlcnNbaV1dO1xuICAgICAgfVxuXG4gICAgICBPYmplY3Qua2V5cyhjdXJyTm9kZS5jaGlsZHJlbikuZm9yRWFjaChjdXJyTGV0dGVyID0+IHtcbiAgICAgICAgbGV0IG5ld1NlYXJjaCA9IHN0cmluZyArIGN1cnJMZXR0ZXI7XG5cbiAgICAgICAgaWYgKGN1cnJOb2RlLmNoaWxkcmVuW2N1cnJMZXR0ZXJdLmVuZE9mV29yZCkge1xuICAgICAgICAgIGFsbFN1Z2dlc3Rpb25zLnB1c2gobmV3U2VhcmNoKTtcbiAgICAgICAgfSBcbiAgICAgICAgc2VhcmNoRm9yV29yZHMobmV3U2VhcmNoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHBvcHVsYXRlKHdvcmRzKSB7XG4gICAgd29yZHMuZm9yRWFjaCh3b3JkID0+IHRoaXMuaW5zZXJ0KHdvcmQpKTtcbiAgfVxuXG4gIHJlbW92ZVdvcmQod29yZCkge1xuICAgIGxldCBpbnB1dHMgPSBbLi4ud29yZF07XG4gICAgbGV0IGN1cnJOb2RlID0gdGhpcy5yb290O1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnB1dHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICghY3Vyck5vZGUpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBjdXJyTm9kZSA9IGN1cnJOb2RlLmNoaWxkcmVuW2lucHV0c1tpXV07XG4gICAgfVxuICAgIGlmIChjdXJyTm9kZS5lbmRPZldvcmQpIHtcbiAgICAgIGN1cnJOb2RlLmVuZE9mV29yZCA9IGZhbHNlO1xuICAgICAgdGhpcy53b3JkQ291bnQtLTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG59XG5cbiIsImNvbnN0IFRyaWUgPSByZXF1aXJlKCcuLi9saWIvVHJpZScpO1xuY29uc3QgTm9kZSA9IHJlcXVpcmUoJy4uL2xpYi9Ob2RlLmpzJyk7XG4vLyBjb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5jb25zdCB0ZXh0ID0gXCIvdXNyL3NoYXJlL2RpY3Qvd29yZHNcIjtcbmNvbnN0IGRpY3Rpb25hcnkgPSBmcy5yZWFkRmlsZVN5bmModGV4dCkudG9TdHJpbmcoKS50cmltKCkuc3BsaXQoJ1xcbicpO1xuXG5jb25zdCB0ZXh0SW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpO1xuY29uc3QgZGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3VsJyk7XG5cbmNvbnN0IHByZWZpeFRyaWUgPSBuZXcgVHJpZSgpO1xuXG5wcmVmaXhUcmllLnBvcHVsYXRlKGRpY3Rpb25hcnkpO1xuXG50ZXh0SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbigpIHtcbiAgZGlzcGxheS5pbm5lckhUTUwgPSBgPGxpPiR7cHJlZml4VHJpZS5nZXRTdWdnZXN0aW9ucyh0ZXh0SW5wdXQudmFsdWUsIHByZWZpeFRyaWUucm9vdCl9PC9saT5gXG59KTsiXSwic291cmNlUm9vdCI6IiJ9