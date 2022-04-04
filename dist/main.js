/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

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
        return _typeof(child) === "object" ? child : createTextElement(child);
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

function render(element, container) {
  var dom = element.type === "TEXT_ELEMENT" ? document.createTextNode("") : document.createElement(element.type); // children を除く property の割り当て

  var isProperty = function isProperty(key) {
    return key !== "children";
  };

  Object.keys(element.props).filter(isProperty).forEach(function (name) {
    dom[name] = element.props[name];
  });
  element.props.children.forEach(function (child) {
    return render(child, dom);
  });
  container.appendChild(dom);
}

var Didact = {
  createElement: createElement,
  render: render
};
/** @jsx Didact.createElement */

var element = Didact.createElement("div", {
  id: "foo"
}, Didact.createElement("a", null, "bar"), Didact.createElement("b", null));
var container = document.getElementById("root");
Didact.render(element, container);
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsU0FBU0EsYUFBVCxDQUF1QkMsSUFBdkIsRUFBNkJDLEtBQTdCLEVBQWlEO0FBQUEsb0NBQVZDLFFBQVU7QUFBVkEsSUFBQUEsUUFBVTtBQUFBOztBQUMvQyxTQUFPO0FBQ0xGLElBQUFBLElBQUksRUFBSkEsSUFESztBQUVMQyxJQUFBQSxLQUFLLGtDQUNBQSxLQURBO0FBRUhDLE1BQUFBLFFBQVEsRUFBRUEsUUFBUSxDQUFDQyxHQUFULENBQWEsVUFBQ0MsS0FBRDtBQUFBLGVBQ3JCLFFBQU9BLEtBQVAsTUFBaUIsUUFBakIsR0FBNEJBLEtBQTVCLEdBQW9DQyxpQkFBaUIsQ0FBQ0QsS0FBRCxDQURoQztBQUFBLE9BQWI7QUFGUDtBQUZBLEdBQVA7QUFTRDs7QUFFRCxTQUFTQyxpQkFBVCxDQUEyQkMsSUFBM0IsRUFBaUM7QUFDL0IsU0FBTztBQUNMTixJQUFBQSxJQUFJLEVBQUUsY0FERDtBQUVMQyxJQUFBQSxLQUFLLEVBQUU7QUFDTE0sTUFBQUEsU0FBUyxFQUFFRCxJQUROO0FBRUxKLE1BQUFBLFFBQVEsRUFBRTtBQUZMO0FBRkYsR0FBUDtBQU9EOztBQUVELFNBQVNNLE1BQVQsQ0FBZ0JDLE9BQWhCLEVBQXlCQyxTQUF6QixFQUFvQztBQUNsQyxNQUFNQyxHQUFHLEdBQ1BGLE9BQU8sQ0FBQ1QsSUFBUixLQUFpQixjQUFqQixHQUNJWSxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsRUFBeEIsQ0FESixHQUVJRCxRQUFRLENBQUNiLGFBQVQsQ0FBdUJVLE9BQU8sQ0FBQ1QsSUFBL0IsQ0FITixDQURrQyxDQU1sQzs7QUFDQSxNQUFNYyxVQUFVLEdBQUcsU0FBYkEsVUFBYSxDQUFDQyxHQUFEO0FBQUEsV0FBU0EsR0FBRyxLQUFLLFVBQWpCO0FBQUEsR0FBbkI7O0FBQ0FDLEVBQUFBLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZUixPQUFPLENBQUNSLEtBQXBCLEVBQ0dpQixNQURILENBQ1VKLFVBRFYsRUFFR0ssT0FGSCxDQUVXLFVBQUNDLElBQUQsRUFBVTtBQUNqQlQsSUFBQUEsR0FBRyxDQUFDUyxJQUFELENBQUgsR0FBWVgsT0FBTyxDQUFDUixLQUFSLENBQWNtQixJQUFkLENBQVo7QUFDRCxHQUpIO0FBTUFYLEVBQUFBLE9BQU8sQ0FBQ1IsS0FBUixDQUFjQyxRQUFkLENBQXVCaUIsT0FBdkIsQ0FBK0IsVUFBQ2YsS0FBRDtBQUFBLFdBQVdJLE1BQU0sQ0FBQ0osS0FBRCxFQUFRTyxHQUFSLENBQWpCO0FBQUEsR0FBL0I7QUFFQUQsRUFBQUEsU0FBUyxDQUFDVyxXQUFWLENBQXNCVixHQUF0QjtBQUNEOztBQUVELElBQU1XLE1BQU0sR0FBRztBQUNidkIsRUFBQUEsYUFBYSxFQUFiQSxhQURhO0FBRWJTLEVBQUFBLE1BQU0sRUFBTkE7QUFGYSxDQUFmO0FBS0E7O0FBQ0EsSUFBTUMsT0FBTyxHQUNYO0FBQUssSUFBRSxFQUFDO0FBQVIsR0FDRSxzQ0FERixFQUVFLCtCQUZGLENBREY7QUFPQSxJQUFNQyxTQUFTLEdBQUdFLFFBQVEsQ0FBQ1csY0FBVCxDQUF3QixNQUF4QixDQUFsQjtBQUNBRCxNQUFNLENBQUNkLE1BQVAsQ0FBY0MsT0FBZCxFQUF1QkMsU0FBdkIsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2J1aWxkLXlvdXItb3duLXJlYWN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodHlwZSwgcHJvcHMsIC4uLmNoaWxkcmVuKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZSxcbiAgICBwcm9wczoge1xuICAgICAgLi4ucHJvcHMsXG4gICAgICBjaGlsZHJlbjogY2hpbGRyZW4ubWFwKChjaGlsZCkgPT5cbiAgICAgICAgdHlwZW9mIGNoaWxkID09PSBcIm9iamVjdFwiID8gY2hpbGQgOiBjcmVhdGVUZXh0RWxlbWVudChjaGlsZClcbiAgICAgICksXG4gICAgfSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVGV4dEVsZW1lbnQodGV4dCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IFwiVEVYVF9FTEVNRU5UXCIsXG4gICAgcHJvcHM6IHtcbiAgICAgIG5vZGVWYWx1ZTogdGV4dCxcbiAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICB9LFxuICB9O1xufVxuXG5mdW5jdGlvbiByZW5kZXIoZWxlbWVudCwgY29udGFpbmVyKSB7XG4gIGNvbnN0IGRvbSA9XG4gICAgZWxlbWVudC50eXBlID09PSBcIlRFWFRfRUxFTUVOVFwiXG4gICAgICA/IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiXCIpXG4gICAgICA6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudC50eXBlKTtcblxuICAvLyBjaGlsZHJlbiDjgpLpmaTjgY8gcHJvcGVydHkg44Gu5Ymy44KK5b2T44GmXG4gIGNvbnN0IGlzUHJvcGVydHkgPSAoa2V5KSA9PiBrZXkgIT09IFwiY2hpbGRyZW5cIjtcbiAgT2JqZWN0LmtleXMoZWxlbWVudC5wcm9wcylcbiAgICAuZmlsdGVyKGlzUHJvcGVydHkpXG4gICAgLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICAgIGRvbVtuYW1lXSA9IGVsZW1lbnQucHJvcHNbbmFtZV07XG4gICAgfSk7XG5cbiAgZWxlbWVudC5wcm9wcy5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4gcmVuZGVyKGNoaWxkLCBkb20pKTtcblxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZG9tKTtcbn1cblxuY29uc3QgRGlkYWN0ID0ge1xuICBjcmVhdGVFbGVtZW50LFxuICByZW5kZXIsXG59O1xuXG4vKiogQGpzeCBEaWRhY3QuY3JlYXRlRWxlbWVudCAqL1xuY29uc3QgZWxlbWVudCA9IChcbiAgPGRpdiBpZD1cImZvb1wiPlxuICAgIDxhPmJhcjwvYT5cbiAgICA8YiAvPlxuICA8L2Rpdj5cbik7XG5cbmNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKTtcbkRpZGFjdC5yZW5kZXIoZWxlbWVudCwgY29udGFpbmVyKTtcbiJdLCJuYW1lcyI6WyJjcmVhdGVFbGVtZW50IiwidHlwZSIsInByb3BzIiwiY2hpbGRyZW4iLCJtYXAiLCJjaGlsZCIsImNyZWF0ZVRleHRFbGVtZW50IiwidGV4dCIsIm5vZGVWYWx1ZSIsInJlbmRlciIsImVsZW1lbnQiLCJjb250YWluZXIiLCJkb20iLCJkb2N1bWVudCIsImNyZWF0ZVRleHROb2RlIiwiaXNQcm9wZXJ0eSIsImtleSIsIk9iamVjdCIsImtleXMiLCJmaWx0ZXIiLCJmb3JFYWNoIiwibmFtZSIsImFwcGVuZENoaWxkIiwiRGlkYWN0IiwiZ2V0RWxlbWVudEJ5SWQiXSwic291cmNlUm9vdCI6IiJ9