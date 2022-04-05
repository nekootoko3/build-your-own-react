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

var nextUnitOfWork = null;
var wipRoot = null;

function render(element, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [element]
    }
  };
  nextUnitOfWork = wipRoot;
}

function commitRoot() {
  // dom に node を追加する
  commitWork(wipRoot.child);
  wipRoot = null;
}

function commitWork(fiber) {
  if (!fiber) {
    return;
  } // 全ての node を dom に再帰的に追加する


  var domParent = fiber.parent.dom;
  domParent.appendChild(fiber.dom);
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function workLoop(deadline) {
  // rendering phase
  var shouldYield = false;

  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  } // commit phase


  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }

  requestIdleCallback(workLoop);
} // メインスレッドがアイドル状態のときにブラウザがコールバックを実行


requestIdleCallback(workLoop);

function performUnitOfWork(fiber) {
  // もし追加されていなければ、自身の dom を fiber から作成し親ノードに追加
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  } // 子要素ごとに新しいファイバーを作成


  var elements = fiber.props.children;
  var index = 0;
  var prevSibling = null;

  while (index < elements.length) {
    var _element = elements[index];
    var newFiber = {
      type: _element.type,
      props: _element.props,
      parent: fiber,
      dom: null
    };

    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    index++;
  } // 作業単位を検索。 最初に子要素、次に兄弟、次におじというように試みる


  if (fiber.child) {
    return fiber.child;
  }

  var nextFiber = fiber;

  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }

    nextFiber = nextFiber.parent;
  }
}

function createDom(fiber) {
  // element type に応じてノードを作成
  var dom = fiber.type === "TEXT_ELEMENT" ? document.createTextNode("") : document.createElement(fiber.type); // children を除く property の割り当て

  var isProperty = function isProperty(key) {
    return key !== "children";
  };

  Object.keys(fiber.props).filter(isProperty).forEach(function (name) {
    dom[name] = fiber.props[name];
  });
  return dom;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUZ3QixDQU94Qjs7QUFDQSxNQUFNb0MsVUFBVSxHQUFHLFNBQWJBLFVBQWEsQ0FBQ0MsR0FBRDtBQUFBLFdBQVNBLEdBQUcsS0FBSyxVQUFqQjtBQUFBLEdBQW5COztBQUNBQyxFQUFBQSxNQUFNLENBQUNDLElBQVAsQ0FBWXZCLEtBQUssQ0FBQ2YsS0FBbEIsRUFDR3VDLE1BREgsQ0FDVUosVUFEVixFQUVHSyxPQUZILENBRVcsVUFBQ0MsSUFBRCxFQUFVO0FBQ2pCN0IsSUFBQUEsR0FBRyxDQUFDNkIsSUFBRCxDQUFILEdBQVkxQixLQUFLLENBQUNmLEtBQU4sQ0FBWXlDLElBQVosQ0FBWjtBQUNELEdBSkg7QUFNQSxTQUFPN0IsR0FBUDtBQUNEOztBQUVELElBQU04QixNQUFNLEdBQUc7QUFDYjVDLEVBQUFBLGFBQWEsRUFBYkEsYUFEYTtBQUViVyxFQUFBQSxNQUFNLEVBQU5BO0FBRmEsQ0FBZjtBQUtBOztBQUNBLElBQU1DLE9BQU8sR0FDWDtBQUFLLElBQUUsRUFBQztBQUFSLEdBQ0Usc0NBREYsRUFFRSwrQkFGRixDQURGO0FBT0EsSUFBTUMsU0FBUyxHQUFHc0IsUUFBUSxDQUFDVSxjQUFULENBQXdCLE1BQXhCLENBQWxCO0FBQ0FELE1BQU0sQ0FBQ2pDLE1BQVAsQ0FBY0MsT0FBZCxFQUF1QkMsU0FBdkIsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2J1aWxkLXlvdXItb3duLXJlYWN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodHlwZSwgcHJvcHMsIC4uLmNoaWxkcmVuKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZSxcbiAgICBwcm9wczoge1xuICAgICAgLi4ucHJvcHMsXG4gICAgICBjaGlsZHJlbjogY2hpbGRyZW4ubWFwKChjaGlsZCkgPT5cbiAgICAgICAgdHlwZW9mIGNoaWxkID09PSBcIm9iamVjdFwiID8gY2hpbGQgOiBjcmVhdGVUZXh0RWxlbWVudChjaGlsZClcbiAgICAgICksXG4gICAgfSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVGV4dEVsZW1lbnQodGV4dCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IFwiVEVYVF9FTEVNRU5UXCIsXG4gICAgcHJvcHM6IHtcbiAgICAgIG5vZGVWYWx1ZTogdGV4dCxcbiAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICB9LFxuICB9O1xufVxuXG5sZXQgbmV4dFVuaXRPZldvcmsgPSBudWxsO1xubGV0IHdpcFJvb3QgPSBudWxsO1xuXG5mdW5jdGlvbiByZW5kZXIoZWxlbWVudCwgY29udGFpbmVyKSB7XG4gIHdpcFJvb3QgPSB7XG4gICAgZG9tOiBjb250YWluZXIsXG4gICAgcHJvcHM6IHtcbiAgICAgIGNoaWxkcmVuOiBbZWxlbWVudF0sXG4gICAgfSxcbiAgfTtcbiAgbmV4dFVuaXRPZldvcmsgPSB3aXBSb290O1xufVxuXG5mdW5jdGlvbiBjb21taXRSb290KCkge1xuICAvLyBkb20g44GrIG5vZGUg44KS6L+95Yqg44GZ44KLXG4gIGNvbW1pdFdvcmsod2lwUm9vdC5jaGlsZCk7XG4gIHdpcFJvb3QgPSBudWxsO1xufVxuXG5mdW5jdGlvbiBjb21taXRXb3JrKGZpYmVyKSB7XG4gIGlmICghZmliZXIpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyDlhajjgabjga4gbm9kZSDjgpIgZG9tIOOBq+WGjeW4sOeahOOBq+i/veWKoOOBmeOCi1xuICBjb25zdCBkb21QYXJlbnQgPSBmaWJlci5wYXJlbnQuZG9tO1xuICBkb21QYXJlbnQuYXBwZW5kQ2hpbGQoZmliZXIuZG9tKTtcbiAgY29tbWl0V29yayhmaWJlci5jaGlsZCk7XG4gIGNvbW1pdFdvcmsoZmliZXIuc2libGluZyk7XG59XG5cbmZ1bmN0aW9uIHdvcmtMb29wKGRlYWRsaW5lKSB7XG4gIC8vIHJlbmRlcmluZyBwaGFzZVxuICBsZXQgc2hvdWxkWWllbGQgPSBmYWxzZTtcbiAgd2hpbGUgKG5leHRVbml0T2ZXb3JrICYmICFzaG91bGRZaWVsZCkge1xuICAgIG5leHRVbml0T2ZXb3JrID0gcGVyZm9ybVVuaXRPZldvcmsobmV4dFVuaXRPZldvcmspO1xuICAgIHNob3VsZFlpZWxkID0gZGVhZGxpbmUudGltZVJlbWFpbmluZygpIDwgMTtcbiAgfVxuXG4gIC8vIGNvbW1pdCBwaGFzZVxuICBpZiAoIW5leHRVbml0T2ZXb3JrICYmIHdpcFJvb3QpIHtcbiAgICBjb21taXRSb290KCk7XG4gIH1cblxuICByZXF1ZXN0SWRsZUNhbGxiYWNrKHdvcmtMb29wKTtcbn1cblxuLy8g44Oh44Kk44Oz44K544Os44OD44OJ44GM44Ki44Kk44OJ44Or54q25oWL44Gu44Go44GN44Gr44OW44Op44Km44K244GM44Kz44O844Or44OQ44OD44Kv44KS5a6f6KGMXG5yZXF1ZXN0SWRsZUNhbGxiYWNrKHdvcmtMb29wKTtcblxuZnVuY3Rpb24gcGVyZm9ybVVuaXRPZldvcmsoZmliZXIpIHtcbiAgLy8g44KC44GX6L+95Yqg44GV44KM44Gm44GE44Gq44GR44KM44Gw44CB6Ieq6Lqr44GuIGRvbSDjgpIgZmliZXIg44GL44KJ5L2c5oiQ44GX6Kaq44OO44O844OJ44Gr6L+95YqgXG4gIGlmICghZmliZXIuZG9tKSB7XG4gICAgZmliZXIuZG9tID0gY3JlYXRlRG9tKGZpYmVyKTtcbiAgfVxuXG4gIC8vIOWtkOimgee0oOOBlOOBqOOBq+aWsOOBl+OBhOODleOCoeOCpOODkOODvOOCkuS9nOaIkFxuICBjb25zdCBlbGVtZW50cyA9IGZpYmVyLnByb3BzLmNoaWxkcmVuO1xuICBsZXQgaW5kZXggPSAwO1xuICBsZXQgcHJldlNpYmxpbmcgPSBudWxsO1xuICB3aGlsZSAoaW5kZXggPCBlbGVtZW50cy5sZW5ndGgpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZWxlbWVudHNbaW5kZXhdO1xuXG4gICAgY29uc3QgbmV3RmliZXIgPSB7XG4gICAgICB0eXBlOiBlbGVtZW50LnR5cGUsXG4gICAgICBwcm9wczogZWxlbWVudC5wcm9wcyxcbiAgICAgIHBhcmVudDogZmliZXIsXG4gICAgICBkb206IG51bGwsXG4gICAgfTtcblxuICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgZmliZXIuY2hpbGQgPSBuZXdGaWJlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJldlNpYmxpbmcuc2libGluZyA9IG5ld0ZpYmVyO1xuICAgIH1cblxuICAgIHByZXZTaWJsaW5nID0gbmV3RmliZXI7XG4gICAgaW5kZXgrKztcbiAgfVxuXG4gIC8vIOS9nOalreWNmOS9jeOCkuaknOe0ouOAgiDmnIDliJ3jgavlrZDopoHntKDjgIHmrKHjgavlhYTlvJ/jgIHmrKHjgavjgYrjgZjjgajjgYTjgYbjgojjgYbjgavoqabjgb/jgotcbiAgaWYgKGZpYmVyLmNoaWxkKSB7XG4gICAgcmV0dXJuIGZpYmVyLmNoaWxkO1xuICB9XG4gIGxldCBuZXh0RmliZXIgPSBmaWJlcjtcbiAgd2hpbGUgKG5leHRGaWJlcikge1xuICAgIGlmIChuZXh0RmliZXIuc2libGluZykge1xuICAgICAgcmV0dXJuIG5leHRGaWJlci5zaWJsaW5nO1xuICAgIH1cbiAgICBuZXh0RmliZXIgPSBuZXh0RmliZXIucGFyZW50O1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZURvbShmaWJlcikge1xuICAvLyBlbGVtZW50IHR5cGUg44Gr5b+c44GY44Gm44OO44O844OJ44KS5L2c5oiQXG4gIGNvbnN0IGRvbSA9XG4gICAgZmliZXIudHlwZSA9PT0gXCJURVhUX0VMRU1FTlRcIlxuICAgICAgPyBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIlwiKVxuICAgICAgOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGZpYmVyLnR5cGUpO1xuXG4gIC8vIGNoaWxkcmVuIOOCkumZpOOBjyBwcm9wZXJ0eSDjga7libLjgorlvZPjgaZcbiAgY29uc3QgaXNQcm9wZXJ0eSA9IChrZXkpID0+IGtleSAhPT0gXCJjaGlsZHJlblwiO1xuICBPYmplY3Qua2V5cyhmaWJlci5wcm9wcylcbiAgICAuZmlsdGVyKGlzUHJvcGVydHkpXG4gICAgLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICAgIGRvbVtuYW1lXSA9IGZpYmVyLnByb3BzW25hbWVdO1xuICAgIH0pO1xuXG4gIHJldHVybiBkb207XG59XG5cbmNvbnN0IERpZGFjdCA9IHtcbiAgY3JlYXRlRWxlbWVudCxcbiAgcmVuZGVyLFxufTtcblxuLyoqIEBqc3ggRGlkYWN0LmNyZWF0ZUVsZW1lbnQgKi9cbmNvbnN0IGVsZW1lbnQgPSAoXG4gIDxkaXYgaWQ9XCJmb29cIj5cbiAgICA8YT5iYXI8L2E+XG4gICAgPGIgLz5cbiAgPC9kaXY+XG4pO1xuXG5jb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIik7XG5EaWRhY3QucmVuZGVyKGVsZW1lbnQsIGNvbnRhaW5lcik7XG4iXSwibmFtZXMiOlsiY3JlYXRlRWxlbWVudCIsInR5cGUiLCJwcm9wcyIsImNoaWxkcmVuIiwibWFwIiwiY2hpbGQiLCJjcmVhdGVUZXh0RWxlbWVudCIsInRleHQiLCJub2RlVmFsdWUiLCJuZXh0VW5pdE9mV29yayIsIndpcFJvb3QiLCJyZW5kZXIiLCJlbGVtZW50IiwiY29udGFpbmVyIiwiZG9tIiwiY29tbWl0Um9vdCIsImNvbW1pdFdvcmsiLCJmaWJlciIsImRvbVBhcmVudCIsInBhcmVudCIsImFwcGVuZENoaWxkIiwic2libGluZyIsIndvcmtMb29wIiwiZGVhZGxpbmUiLCJzaG91bGRZaWVsZCIsInBlcmZvcm1Vbml0T2ZXb3JrIiwidGltZVJlbWFpbmluZyIsInJlcXVlc3RJZGxlQ2FsbGJhY2siLCJjcmVhdGVEb20iLCJlbGVtZW50cyIsImluZGV4IiwicHJldlNpYmxpbmciLCJsZW5ndGgiLCJuZXdGaWJlciIsIm5leHRGaWJlciIsImRvY3VtZW50IiwiY3JlYXRlVGV4dE5vZGUiLCJpc1Byb3BlcnR5Iiwia2V5IiwiT2JqZWN0Iiwia2V5cyIsImZpbHRlciIsImZvckVhY2giLCJuYW1lIiwiRGlkYWN0IiwiZ2V0RWxlbWVudEJ5SWQiXSwic291cmNlUm9vdCI6IiJ9