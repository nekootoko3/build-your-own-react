/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createElement(type, props) {
  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  return {
    type: type,
    props: _objectSpread(_objectSpread({}, props), {}, {
      children: children.map(function (child) {
        return typeof child === "obejct" ? child : createTextElement(child);
      })
    })
  };
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: []
    }
  };
}

var Didact = {
  createElement: createElement
};
/** @jsx Didact.createElement */

var element = Didact.createElement("div", {
  id: "foo"
}, Didact.createElement("a", null, "bar"), Didact.createElement("b", null));
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLFNBQVNBLGFBQVQsQ0FBdUJDLElBQXZCLEVBQTZCQyxLQUE3QixFQUFpRDtBQUFBLG9DQUFWQyxRQUFVO0FBQVZBLElBQUFBLFFBQVU7QUFBQTs7QUFDL0MsU0FBTztBQUNMRixJQUFBQSxJQUFJLEVBQUpBLElBREs7QUFFTEMsSUFBQUEsS0FBSyxrQ0FDQUEsS0FEQTtBQUVIQyxNQUFBQSxRQUFRLEVBQUVBLFFBQVEsQ0FBQ0MsR0FBVCxDQUFhLFVBQUNDLEtBQUQ7QUFBQSxlQUNyQixPQUFPQSxLQUFQLEtBQWlCLFFBQWpCLEdBQTRCQSxLQUE1QixHQUFvQ0MsaUJBQWlCLENBQUNELEtBQUQsQ0FEaEM7QUFBQSxPQUFiO0FBRlA7QUFGQSxHQUFQO0FBU0Q7O0FBRUQsU0FBU0MsaUJBQVQsQ0FBMkJDLElBQTNCLEVBQWlDO0FBQy9CLFNBQU87QUFDTE4sSUFBQUEsSUFBSSxFQUFFLGNBREQ7QUFFTEMsSUFBQUEsS0FBSyxFQUFFO0FBQ0xNLE1BQUFBLFNBQVMsRUFBRUQsSUFETjtBQUVMSixNQUFBQSxRQUFRLEVBQUU7QUFGTDtBQUZGLEdBQVA7QUFPRDs7QUFFRCxJQUFNTSxNQUFNLEdBQUc7QUFDYlQsRUFBQUEsYUFBYSxFQUFiQTtBQURhLENBQWY7QUFJQTs7QUFDQSxJQUFNVSxPQUFPLEdBQ1g7QUFBSyxJQUFFLEVBQUM7QUFBUixHQUNFLHNDQURGLEVBRUUsK0JBRkYsQ0FERixDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYnVpbGQteW91ci1vd24tcmVhY3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0eXBlLCBwcm9wcywgLi4uY2hpbGRyZW4pIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlLFxuICAgIHByb3BzOiB7XG4gICAgICAuLi5wcm9wcyxcbiAgICAgIGNoaWxkcmVuOiBjaGlsZHJlbi5tYXAoKGNoaWxkKSA9PlxuICAgICAgICB0eXBlb2YgY2hpbGQgPT09IFwib2JlamN0XCIgPyBjaGlsZCA6IGNyZWF0ZVRleHRFbGVtZW50KGNoaWxkKVxuICAgICAgKSxcbiAgICB9LFxuICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVUZXh0RWxlbWVudCh0ZXh0KSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogXCJURVhUX0VMRU1FTlRcIixcbiAgICBwcm9wczoge1xuICAgICAgbm9kZVZhbHVlOiB0ZXh0LFxuICAgICAgY2hpbGRyZW46IFtdLFxuICAgIH0sXG4gIH07XG59XG5cbmNvbnN0IERpZGFjdCA9IHtcbiAgY3JlYXRlRWxlbWVudCxcbn07XG5cbi8qKiBAanN4IERpZGFjdC5jcmVhdGVFbGVtZW50ICovXG5jb25zdCBlbGVtZW50ID0gKFxuICA8ZGl2IGlkPVwiZm9vXCI+XG4gICAgPGE+YmFyPC9hPlxuICAgIDxiIC8+XG4gIDwvZGl2PlxuKTtcbiJdLCJuYW1lcyI6WyJjcmVhdGVFbGVtZW50IiwidHlwZSIsInByb3BzIiwiY2hpbGRyZW4iLCJtYXAiLCJjaGlsZCIsImNyZWF0ZVRleHRFbGVtZW50IiwidGV4dCIsIm5vZGVWYWx1ZSIsIkRpZGFjdCIsImVsZW1lbnQiXSwic291cmNlUm9vdCI6IiJ9