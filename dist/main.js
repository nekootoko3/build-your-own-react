/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
var currentRoot = null;
var wipRoot = null;
var deletions = null;

function commitRoot() {
  deletions.forEach(commitWork); // dom に node を追加する

  commitWork(wipRoot.child); // dom にコミットした最後のファイバーツリーを currentRoot として参照を保存する

  currentRoot = wipRoot; // ファイバーツリーの root を null にする

  wipRoot = null;
}

function render(element, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [element]
    },
    alternate: currentRoot
  };
  deletions = [];
  nextUnitOfWork = wipRoot;
}

function commitWork(fiber) {
  if (!fiber) {
    return;
  } // 関数コンポーネントから作られるファイバーには dom ノードがないので DOMノードを持つファイバーが見つかるまでファイバーツリーを上に移動


  var domParentFiber = fiber.parent;

  while (!domParentFiber.dom) {
    domParentFiber = domParentFiber.parent;
  }

  var domParent = domParentFiber.dom; // fiber の effectTag に応じて fiber.dom を dom に反映する

  if (fiber.effectTag === "PLACEMENT" && fiber.dom != null) {
    domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag === "UPDATE" && fiber.dom != null) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props);
  } else if (fiber.effectTag === "DELETION") {
    commitDeletion(fiber, domParent); // ノードを削除するときは、DOMノードを持つ子が見つかるまで探索を続行
  } // child と sibling も再帰的に処理


  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

var isNew = function isNew(prev, next) {
  return function (key) {
    return prev[key] !== next[key];
  };
};

var isGone = function isGone(prev, next) {
  return function (key) {
    return !(key in next);
  };
};

var isEvent = function isEvent(key) {
  return key.startsWith("on");
};

var isProperty = function isProperty(key) {
  return key !== "children" && !isEvent(key);
};

function updateDom(dom, prevProps, nextProps) {
  // 古い、または変更されたイベントリスナーを削除
  Object.keys(prevProps).filter(isEvent).filter(function (key) {
    return !(key in nextProps) || isNew(prevProps, nextProps)(key);
  }).forEach(function (name) {
    var eventType = name.toLowerCase().substring(2);
    dom.removeEventListener(eventType, prevProps[name]);
  }); // 古い properties を削除

  Object.keys(prevProps).filter(isProperty).filter(isGone(prevProps, nextProps)).forEach(function (name) {
    dom[name] = "";
  }); // 新規 or 変更された property を反映

  Object.keys(nextProps).filter(isProperty).filter(isNew(prevProps, nextProps)).forEach(function (name) {
    dom[name] = nextProps[name];
  }); // イベントリスナーを追加

  Object.keys(nextProps).filter(isEvent).filter(isNew(prevProps, nextProps)).forEach(function (name) {
    var eventType = name.toLowerCase().substring(2);
    dom.addEventListener(eventType, nextProps[name]);
  });
}

function commitDeletion(fiber, domParent) {
  if (fiber.dom) {
    domParent.removeChild(fiber.dom);
  } else {
    commitDeletion(fiber.child, domParent);
  }
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
  var isFunctionComponent = fiber.type instanceof Function;

  if (isFunctionComponent) {
    updateFunctionComponent(fiber);
  } else {
    updateHostComponent(fiber);
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

var wipFiber = null;
var hookIndex = null;

function updateFunctionComponent(fiber) {
  wipFiber = fiber;
  hookIndex = 0;
  wipFiber.hooks = [];
  var children = [fiber.type(fiber.props)];
  reconcileChildren(fiber, children);
}

function useState(initial) {
  var oldHook = wipFiber.alternate && wipFiber.alternate.hooks && wipFiber.alternate.hooks[hookIndex];
  var hook = {
    state: oldHook ? oldHook.state : initial,
    queue: []
  }; // 次回コンポーネントをレンダリングするときにこれを行い、古いフックキューからすべてのアクションを取得し、それらを1つずつ新しいフックのstateに適用して、stateを返すときに更新

  var actions = oldHook ? oldHook.queue : [];
  actions.forEach(function (action) {
    hook.state = action(hook.state);
  });

  var setState = function setState(action) {
    hook.queue.push(action);
    wipRoot = {
      dom: currentRoot.dom,
      props: currentRoot.props,
      alternate: currentRoot
    };
    nextUnitOfWork = wipRoot;
    deletions = [];
  };

  wipFiber.hooks.push(hook);
  hookIndex++;
  return [hook.state, setState];
}

function updateHostComponent(fiber) {
  // もし追加されていなければ、自身の dom を fiber から作成し親ノードに追加
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  reconcileChildren(fiber, fiber.props.children);
} // wipFiber の子とその兄弟について、古いファイバーと新しいファイバーを比較し wipFiber を更新する


function reconcileChildren(wipFiber, elements) {
  var index = 0;
  var oldFiber = wipFiber.alternate && wipFiber.alternate.child;
  var prevSibling = null; // 配列( elements )とリンクリスト ( oldFiber は sibling を通したリンクリストになっている )を同時にループ処理する

  while (index < elements.length || oldFiber != null) {
    var _element = elements[index];
    var newFiber = null;
    var sameType = oldFiber && _element && _element.type === oldFiber.type; // 古いファイバーとelementが同じタイプの場合、dom を古いファイバーから保持し、props は element から保持するように、新しいファイバーを作成

    if (sameType) {
      newFiber = {
        type: oldFiber.type,
        props: _element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: "UPDATE"
      };
    } // 要素に新しいDOMノードが必要な場合は、新しいファイバーにPLACEMENTをタグ付け


    if (_element && !sameType) {
      newFiber = {
        type: _element.type,
        props: _element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: "PLACEMENT"
      };
    } // ノードを削除する必要がある場合は、新しいファイバーがないため、古いファイバーにエフェクトタグを追加


    if (oldFiber && !sameType) {
      oldFiber.effectTag = "DELETION";
      deletions.push(oldFiber);
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    if (index === 0) {
      wipFiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    index++;
  }
}

function createDom(fiber) {
  // element type に応じてノードを作成
  var dom = fiber.type === "TEXT_ELEMENT" ? document.createTextNode("") : document.createElement(fiber.type); // children を除く property の割り当て

  updateDom(dom, {}, fiber.props);
  return dom;
}

var Didact = {
  createElement: createElement,
  render: render,
  useState: useState
};
/** @jsx Didact.createElement */

function Counter() {
  var _Didact$useState = Didact.useState(1),
      _Didact$useState2 = _slicedToArray(_Didact$useState, 2),
      state = _Didact$useState2[0],
      setState = _Didact$useState2[1];

  return Didact.createElement("h1", {
    onClick: function onClick() {
      return setState(function (c) {
        return c + 1;
      });
    }
  }, "Count: ", state);
}

var element = Didact.createElement(Counter, null);
var container = document.getElementById("root");
Didact.render(element, container);
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QU9JLEtBQVA7QUFBQSxNQUFjSSxRQUFkOztBQUNBLFNBQU87QUFBSSxXQUFPLEVBQUU7QUFBQSxhQUFNQSxRQUFRLENBQUMsVUFBQ2MsQ0FBRDtBQUFBLGVBQU9BLENBQUMsR0FBRyxDQUFYO0FBQUEsT0FBRCxDQUFkO0FBQUE7QUFBYixnQkFBbURsQixLQUFuRCxDQUFQO0FBQ0Q7O0FBRUQsSUFBTXBELE9BQU8sR0FBRyxxQkFBQyxPQUFELE9BQWhCO0FBQ0EsSUFBTUMsU0FBUyxHQUFHaUUsUUFBUSxDQUFDSyxjQUFULENBQXdCLE1BQXhCLENBQWxCO0FBQ0FILE1BQU0sQ0FBQ3JFLE1BQVAsQ0FBY0MsT0FBZCxFQUF1QkMsU0FBdkIsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2J1aWxkLXlvdXItb3duLXJlYWN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodHlwZSwgcHJvcHMsIC4uLmNoaWxkcmVuKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZSxcbiAgICBwcm9wczoge1xuICAgICAgLi4ucHJvcHMsXG4gICAgICBjaGlsZHJlbjogY2hpbGRyZW4ubWFwKChjaGlsZCkgPT5cbiAgICAgICAgdHlwZW9mIGNoaWxkID09PSBcIm9iamVjdFwiID8gY2hpbGQgOiBjcmVhdGVUZXh0RWxlbWVudChjaGlsZClcbiAgICAgICksXG4gICAgfSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVGV4dEVsZW1lbnQodGV4dCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IFwiVEVYVF9FTEVNRU5UXCIsXG4gICAgcHJvcHM6IHtcbiAgICAgIG5vZGVWYWx1ZTogdGV4dCxcbiAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICB9LFxuICB9O1xufVxuXG5sZXQgbmV4dFVuaXRPZldvcmsgPSBudWxsO1xubGV0IGN1cnJlbnRSb290ID0gbnVsbDtcbmxldCB3aXBSb290ID0gbnVsbDtcbmxldCBkZWxldGlvbnMgPSBudWxsO1xuXG5mdW5jdGlvbiBjb21taXRSb290KCkge1xuICBkZWxldGlvbnMuZm9yRWFjaChjb21taXRXb3JrKTtcbiAgLy8gZG9tIOOBqyBub2RlIOOCkui/veWKoOOBmeOCi1xuICBjb21taXRXb3JrKHdpcFJvb3QuY2hpbGQpO1xuICAvLyBkb20g44Gr44Kz44Of44OD44OI44GX44Gf5pyA5b6M44Gu44OV44Kh44Kk44OQ44O844OE44Oq44O844KSIGN1cnJlbnRSb290IOOBqOOBl+OBpuWPgueFp+OCkuS/neWtmOOBmeOCi1xuICBjdXJyZW50Um9vdCA9IHdpcFJvb3Q7XG4gIC8vIOODleOCoeOCpOODkOODvOODhOODquODvOOBriByb290IOOCkiBudWxsIOOBq+OBmeOCi1xuICB3aXBSb290ID0gbnVsbDtcbn1cblxuZnVuY3Rpb24gcmVuZGVyKGVsZW1lbnQsIGNvbnRhaW5lcikge1xuICB3aXBSb290ID0ge1xuICAgIGRvbTogY29udGFpbmVyLFxuICAgIHByb3BzOiB7XG4gICAgICBjaGlsZHJlbjogW2VsZW1lbnRdLFxuICAgIH0sXG4gICAgYWx0ZXJuYXRlOiBjdXJyZW50Um9vdCxcbiAgfTtcbiAgZGVsZXRpb25zID0gW107XG4gIG5leHRVbml0T2ZXb3JrID0gd2lwUm9vdDtcbn1cblxuZnVuY3Rpb24gY29tbWl0V29yayhmaWJlcikge1xuICBpZiAoIWZpYmVyKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8g6Zai5pWw44Kz44Oz44Od44O844ON44Oz44OI44GL44KJ5L2c44KJ44KM44KL44OV44Kh44Kk44OQ44O844Gr44GvIGRvbSDjg47jg7zjg4njgYzjgarjgYTjga7jgacgRE9N44OO44O844OJ44KS5oyB44Gk44OV44Kh44Kk44OQ44O844GM6KaL44Gk44GL44KL44G+44Gn44OV44Kh44Kk44OQ44O844OE44Oq44O844KS5LiK44Gr56e75YuVXG4gIGxldCBkb21QYXJlbnRGaWJlciA9IGZpYmVyLnBhcmVudDtcbiAgd2hpbGUgKCFkb21QYXJlbnRGaWJlci5kb20pIHtcbiAgICBkb21QYXJlbnRGaWJlciA9IGRvbVBhcmVudEZpYmVyLnBhcmVudDtcbiAgfVxuICBjb25zdCBkb21QYXJlbnQgPSBkb21QYXJlbnRGaWJlci5kb207XG5cbiAgLy8gZmliZXIg44GuIGVmZmVjdFRhZyDjgavlv5zjgZjjgaYgZmliZXIuZG9tIOOCkiBkb20g44Gr5Y+N5pig44GZ44KLXG4gIGlmIChmaWJlci5lZmZlY3RUYWcgPT09IFwiUExBQ0VNRU5UXCIgJiYgZmliZXIuZG9tICE9IG51bGwpIHtcbiAgICBkb21QYXJlbnQuYXBwZW5kQ2hpbGQoZmliZXIuZG9tKTtcbiAgfSBlbHNlIGlmIChmaWJlci5lZmZlY3RUYWcgPT09IFwiVVBEQVRFXCIgJiYgZmliZXIuZG9tICE9IG51bGwpIHtcbiAgICB1cGRhdGVEb20oZmliZXIuZG9tLCBmaWJlci5hbHRlcm5hdGUucHJvcHMsIGZpYmVyLnByb3BzKTtcbiAgfSBlbHNlIGlmIChmaWJlci5lZmZlY3RUYWcgPT09IFwiREVMRVRJT05cIikge1xuICAgIGNvbW1pdERlbGV0aW9uKGZpYmVyLCBkb21QYXJlbnQpOyAvLyDjg47jg7zjg4njgpLliYrpmaTjgZnjgovjgajjgY3jga/jgIFET03jg47jg7zjg4njgpLmjIHjgaTlrZDjgYzopovjgaTjgYvjgovjgb7jgafmjqLntKLjgpLntprooYxcbiAgfVxuXG4gIC8vIGNoaWxkIOOBqCBzaWJsaW5nIOOCguWGjeW4sOeahOOBq+WHpueQhlxuICBjb21taXRXb3JrKGZpYmVyLmNoaWxkKTtcbiAgY29tbWl0V29yayhmaWJlci5zaWJsaW5nKTtcbn1cblxuY29uc3QgaXNOZXcgPSAocHJldiwgbmV4dCkgPT4gKGtleSkgPT4gcHJldltrZXldICE9PSBuZXh0W2tleV07XG5jb25zdCBpc0dvbmUgPSAocHJldiwgbmV4dCkgPT4gKGtleSkgPT4gIShrZXkgaW4gbmV4dCk7XG5jb25zdCBpc0V2ZW50ID0gKGtleSkgPT4ga2V5LnN0YXJ0c1dpdGgoXCJvblwiKTtcbmNvbnN0IGlzUHJvcGVydHkgPSAoa2V5KSA9PiBrZXkgIT09IFwiY2hpbGRyZW5cIiAmJiAhaXNFdmVudChrZXkpO1xuZnVuY3Rpb24gdXBkYXRlRG9tKGRvbSwgcHJldlByb3BzLCBuZXh0UHJvcHMpIHtcbiAgLy8g5Y+k44GE44CB44G+44Gf44Gv5aSJ5pu044GV44KM44Gf44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5YmK6ZmkXG4gIE9iamVjdC5rZXlzKHByZXZQcm9wcylcbiAgICAuZmlsdGVyKGlzRXZlbnQpXG4gICAgLmZpbHRlcigoa2V5KSA9PiAhKGtleSBpbiBuZXh0UHJvcHMpIHx8IGlzTmV3KHByZXZQcm9wcywgbmV4dFByb3BzKShrZXkpKVxuICAgIC5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgICBjb25zdCBldmVudFR5cGUgPSBuYW1lLnRvTG93ZXJDYXNlKCkuc3Vic3RyaW5nKDIpO1xuICAgICAgZG9tLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBwcmV2UHJvcHNbbmFtZV0pO1xuICAgIH0pO1xuICAvLyDlj6TjgYQgcHJvcGVydGllcyDjgpLliYrpmaRcbiAgT2JqZWN0LmtleXMocHJldlByb3BzKVxuICAgIC5maWx0ZXIoaXNQcm9wZXJ0eSlcbiAgICAuZmlsdGVyKGlzR29uZShwcmV2UHJvcHMsIG5leHRQcm9wcykpXG4gICAgLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICAgIGRvbVtuYW1lXSA9IFwiXCI7XG4gICAgfSk7XG5cbiAgLy8g5paw6KaPIG9yIOWkieabtOOBleOCjOOBnyBwcm9wZXJ0eSDjgpLlj43mmKBcbiAgT2JqZWN0LmtleXMobmV4dFByb3BzKVxuICAgIC5maWx0ZXIoaXNQcm9wZXJ0eSlcbiAgICAuZmlsdGVyKGlzTmV3KHByZXZQcm9wcywgbmV4dFByb3BzKSlcbiAgICAuZm9yRWFjaCgobmFtZSkgPT4ge1xuICAgICAgZG9tW25hbWVdID0gbmV4dFByb3BzW25hbWVdO1xuICAgIH0pO1xuXG4gIC8vIOOCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoFxuICBPYmplY3Qua2V5cyhuZXh0UHJvcHMpXG4gICAgLmZpbHRlcihpc0V2ZW50KVxuICAgIC5maWx0ZXIoaXNOZXcocHJldlByb3BzLCBuZXh0UHJvcHMpKVxuICAgIC5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgICBjb25zdCBldmVudFR5cGUgPSBuYW1lLnRvTG93ZXJDYXNlKCkuc3Vic3RyaW5nKDIpO1xuICAgICAgZG9tLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBuZXh0UHJvcHNbbmFtZV0pO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBjb21taXREZWxldGlvbihmaWJlciwgZG9tUGFyZW50KSB7XG4gIGlmIChmaWJlci5kb20pIHtcbiAgICBkb21QYXJlbnQucmVtb3ZlQ2hpbGQoZmliZXIuZG9tKTtcbiAgfSBlbHNlIHtcbiAgICBjb21taXREZWxldGlvbihmaWJlci5jaGlsZCwgZG9tUGFyZW50KTtcbiAgfVxufVxuXG5mdW5jdGlvbiB3b3JrTG9vcChkZWFkbGluZSkge1xuICAvLyByZW5kZXJpbmcgcGhhc2VcbiAgbGV0IHNob3VsZFlpZWxkID0gZmFsc2U7XG4gIHdoaWxlIChuZXh0VW5pdE9mV29yayAmJiAhc2hvdWxkWWllbGQpIHtcbiAgICBuZXh0VW5pdE9mV29yayA9IHBlcmZvcm1Vbml0T2ZXb3JrKG5leHRVbml0T2ZXb3JrKTtcbiAgICBzaG91bGRZaWVsZCA9IGRlYWRsaW5lLnRpbWVSZW1haW5pbmcoKSA8IDE7XG4gIH1cblxuICAvLyBjb21taXQgcGhhc2VcbiAgaWYgKCFuZXh0VW5pdE9mV29yayAmJiB3aXBSb290KSB7XG4gICAgY29tbWl0Um9vdCgpO1xuICB9XG5cbiAgcmVxdWVzdElkbGVDYWxsYmFjayh3b3JrTG9vcCk7XG59XG5cbi8vIOODoeOCpOODs+OCueODrOODg+ODieOBjOOCouOCpOODieODq+eKtuaFi+OBruOBqOOBjeOBq+ODluODqeOCpuOCtuOBjOOCs+ODvOODq+ODkOODg+OCr+OCkuWun+ihjFxucmVxdWVzdElkbGVDYWxsYmFjayh3b3JrTG9vcCk7XG5cbmZ1bmN0aW9uIHBlcmZvcm1Vbml0T2ZXb3JrKGZpYmVyKSB7XG4gIGNvbnN0IGlzRnVuY3Rpb25Db21wb25lbnQgPSBmaWJlci50eXBlIGluc3RhbmNlb2YgRnVuY3Rpb247XG4gIGlmIChpc0Z1bmN0aW9uQ29tcG9uZW50KSB7XG4gICAgdXBkYXRlRnVuY3Rpb25Db21wb25lbnQoZmliZXIpO1xuICB9IGVsc2Uge1xuICAgIHVwZGF0ZUhvc3RDb21wb25lbnQoZmliZXIpO1xuICB9XG5cbiAgLy8g5L2c5qWt5Y2Y5L2N44KS5qSc57Si44CCIOacgOWIneOBq+WtkOimgee0oOOAgeasoeOBq+WFhOW8n+OAgeasoeOBq+OBiuOBmOOBqOOBhOOBhuOCiOOBhuOBq+ippuOBv+OCi1xuICBpZiAoZmliZXIuY2hpbGQpIHtcbiAgICByZXR1cm4gZmliZXIuY2hpbGQ7XG4gIH1cbiAgbGV0IG5leHRGaWJlciA9IGZpYmVyO1xuICB3aGlsZSAobmV4dEZpYmVyKSB7XG4gICAgaWYgKG5leHRGaWJlci5zaWJsaW5nKSB7XG4gICAgICByZXR1cm4gbmV4dEZpYmVyLnNpYmxpbmc7XG4gICAgfVxuICAgIG5leHRGaWJlciA9IG5leHRGaWJlci5wYXJlbnQ7XG4gIH1cbn1cblxubGV0IHdpcEZpYmVyID0gbnVsbDtcbmxldCBob29rSW5kZXggPSBudWxsO1xuXG5mdW5jdGlvbiB1cGRhdGVGdW5jdGlvbkNvbXBvbmVudChmaWJlcikge1xuICB3aXBGaWJlciA9IGZpYmVyO1xuICBob29rSW5kZXggPSAwO1xuICB3aXBGaWJlci5ob29rcyA9IFtdO1xuICBjb25zdCBjaGlsZHJlbiA9IFtmaWJlci50eXBlKGZpYmVyLnByb3BzKV07XG4gIHJlY29uY2lsZUNoaWxkcmVuKGZpYmVyLCBjaGlsZHJlbik7XG59XG5cbmZ1bmN0aW9uIHVzZVN0YXRlKGluaXRpYWwpIHtcbiAgY29uc3Qgb2xkSG9vayA9XG4gICAgd2lwRmliZXIuYWx0ZXJuYXRlICYmXG4gICAgd2lwRmliZXIuYWx0ZXJuYXRlLmhvb2tzICYmXG4gICAgd2lwRmliZXIuYWx0ZXJuYXRlLmhvb2tzW2hvb2tJbmRleF07XG4gIGNvbnN0IGhvb2sgPSB7XG4gICAgc3RhdGU6IG9sZEhvb2sgPyBvbGRIb29rLnN0YXRlIDogaW5pdGlhbCxcbiAgICBxdWV1ZTogW10sXG4gIH07XG5cbiAgLy8g5qyh5Zue44Kz44Oz44Od44O844ON44Oz44OI44KS44Os44Oz44OA44Oq44Oz44Kw44GZ44KL44Go44GN44Gr44GT44KM44KS6KGM44GE44CB5Y+k44GE44OV44OD44Kv44Kt44Ol44O844GL44KJ44GZ44G544Gm44Gu44Ki44Kv44K344On44Oz44KS5Y+W5b6X44GX44CB44Gd44KM44KJ44KSMeOBpOOBmuOBpOaWsOOBl+OBhOODleODg+OCr+OBrnN0YXRl44Gr6YGp55So44GX44Gm44CBc3RhdGXjgpLov5TjgZnjgajjgY3jgavmm7TmlrBcbiAgY29uc3QgYWN0aW9ucyA9IG9sZEhvb2sgPyBvbGRIb29rLnF1ZXVlIDogW107XG4gIGFjdGlvbnMuZm9yRWFjaCgoYWN0aW9uKSA9PiB7XG4gICAgaG9vay5zdGF0ZSA9IGFjdGlvbihob29rLnN0YXRlKTtcbiAgfSk7XG5cbiAgY29uc3Qgc2V0U3RhdGUgPSAoYWN0aW9uKSA9PiB7XG4gICAgaG9vay5xdWV1ZS5wdXNoKGFjdGlvbik7XG4gICAgd2lwUm9vdCA9IHtcbiAgICAgIGRvbTogY3VycmVudFJvb3QuZG9tLFxuICAgICAgcHJvcHM6IGN1cnJlbnRSb290LnByb3BzLFxuICAgICAgYWx0ZXJuYXRlOiBjdXJyZW50Um9vdCxcbiAgICB9O1xuICAgIG5leHRVbml0T2ZXb3JrID0gd2lwUm9vdDtcbiAgICBkZWxldGlvbnMgPSBbXTtcbiAgfTtcblxuICB3aXBGaWJlci5ob29rcy5wdXNoKGhvb2spO1xuICBob29rSW5kZXgrKztcbiAgcmV0dXJuIFtob29rLnN0YXRlLCBzZXRTdGF0ZV07XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUhvc3RDb21wb25lbnQoZmliZXIpIHtcbiAgLy8g44KC44GX6L+95Yqg44GV44KM44Gm44GE44Gq44GR44KM44Gw44CB6Ieq6Lqr44GuIGRvbSDjgpIgZmliZXIg44GL44KJ5L2c5oiQ44GX6Kaq44OO44O844OJ44Gr6L+95YqgXG4gIGlmICghZmliZXIuZG9tKSB7XG4gICAgZmliZXIuZG9tID0gY3JlYXRlRG9tKGZpYmVyKTtcbiAgfVxuXG4gIHJlY29uY2lsZUNoaWxkcmVuKGZpYmVyLCBmaWJlci5wcm9wcy5jaGlsZHJlbik7XG59XG5cbi8vIHdpcEZpYmVyIOOBruWtkOOBqOOBneOBruWFhOW8n+OBq+OBpOOBhOOBpuOAgeWPpOOBhOODleOCoeOCpOODkOODvOOBqOaWsOOBl+OBhOODleOCoeOCpOODkOODvOOCkuavlOi8g+OBlyB3aXBGaWJlciDjgpLmm7TmlrDjgZnjgotcbmZ1bmN0aW9uIHJlY29uY2lsZUNoaWxkcmVuKHdpcEZpYmVyLCBlbGVtZW50cykge1xuICBsZXQgaW5kZXggPSAwO1xuICBsZXQgb2xkRmliZXIgPSB3aXBGaWJlci5hbHRlcm5hdGUgJiYgd2lwRmliZXIuYWx0ZXJuYXRlLmNoaWxkO1xuICBsZXQgcHJldlNpYmxpbmcgPSBudWxsO1xuXG4gIC8vIOmFjeWIlyggZWxlbWVudHMgKeOBqOODquODs+OCr+ODquOCueODiCAoIG9sZEZpYmVyIOOBryBzaWJsaW5nIOOCkumAmuOBl+OBn+ODquODs+OCr+ODquOCueODiOOBq+OBquOBo+OBpuOBhOOCiyAp44KS5ZCM5pmC44Gr44Or44O844OX5Yem55CG44GZ44KLXG4gIHdoaWxlIChpbmRleCA8IGVsZW1lbnRzLmxlbmd0aCB8fCBvbGRGaWJlciAhPSBudWxsKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGVsZW1lbnRzW2luZGV4XTtcbiAgICBsZXQgbmV3RmliZXIgPSBudWxsO1xuXG4gICAgY29uc3Qgc2FtZVR5cGUgPSBvbGRGaWJlciAmJiBlbGVtZW50ICYmIGVsZW1lbnQudHlwZSA9PT0gb2xkRmliZXIudHlwZTtcblxuICAgIC8vIOWPpOOBhOODleOCoeOCpOODkOODvOOBqGVsZW1lbnTjgYzlkIzjgZjjgr/jgqTjg5fjga7loLTlkIjjgIFkb20g44KS5Y+k44GE44OV44Kh44Kk44OQ44O844GL44KJ5L+d5oyB44GX44CBcHJvcHMg44GvIGVsZW1lbnQg44GL44KJ5L+d5oyB44GZ44KL44KI44GG44Gr44CB5paw44GX44GE44OV44Kh44Kk44OQ44O844KS5L2c5oiQXG4gICAgaWYgKHNhbWVUeXBlKSB7XG4gICAgICBuZXdGaWJlciA9IHtcbiAgICAgICAgdHlwZTogb2xkRmliZXIudHlwZSxcbiAgICAgICAgcHJvcHM6IGVsZW1lbnQucHJvcHMsXG4gICAgICAgIGRvbTogb2xkRmliZXIuZG9tLFxuICAgICAgICBwYXJlbnQ6IHdpcEZpYmVyLFxuICAgICAgICBhbHRlcm5hdGU6IG9sZEZpYmVyLFxuICAgICAgICBlZmZlY3RUYWc6IFwiVVBEQVRFXCIsXG4gICAgICB9O1xuICAgIH1cbiAgICAvLyDopoHntKDjgavmlrDjgZfjgYRET03jg47jg7zjg4njgYzlv4XopoHjgarloLTlkIjjga/jgIHmlrDjgZfjgYTjg5XjgqHjgqTjg5Djg7zjgatQTEFDRU1FTlTjgpLjgr/jgrDku5jjgZFcbiAgICBpZiAoZWxlbWVudCAmJiAhc2FtZVR5cGUpIHtcbiAgICAgIG5ld0ZpYmVyID0ge1xuICAgICAgICB0eXBlOiBlbGVtZW50LnR5cGUsXG4gICAgICAgIHByb3BzOiBlbGVtZW50LnByb3BzLFxuICAgICAgICBkb206IG51bGwsXG4gICAgICAgIHBhcmVudDogd2lwRmliZXIsXG4gICAgICAgIGFsdGVybmF0ZTogbnVsbCxcbiAgICAgICAgZWZmZWN0VGFnOiBcIlBMQUNFTUVOVFwiLFxuICAgICAgfTtcbiAgICB9XG4gICAgLy8g44OO44O844OJ44KS5YmK6Zmk44GZ44KL5b+F6KaB44GM44GC44KL5aC05ZCI44Gv44CB5paw44GX44GE44OV44Kh44Kk44OQ44O844GM44Gq44GE44Gf44KB44CB5Y+k44GE44OV44Kh44Kk44OQ44O844Gr44Ko44OV44Kn44Kv44OI44K/44Kw44KS6L+95YqgXG4gICAgaWYgKG9sZEZpYmVyICYmICFzYW1lVHlwZSkge1xuICAgICAgb2xkRmliZXIuZWZmZWN0VGFnID0gXCJERUxFVElPTlwiO1xuICAgICAgZGVsZXRpb25zLnB1c2gob2xkRmliZXIpO1xuICAgIH1cblxuICAgIGlmIChvbGRGaWJlcikge1xuICAgICAgb2xkRmliZXIgPSBvbGRGaWJlci5zaWJsaW5nO1xuICAgIH1cblxuICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgd2lwRmliZXIuY2hpbGQgPSBuZXdGaWJlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJldlNpYmxpbmcuc2libGluZyA9IG5ld0ZpYmVyO1xuICAgIH1cblxuICAgIHByZXZTaWJsaW5nID0gbmV3RmliZXI7XG4gICAgaW5kZXgrKztcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVEb20oZmliZXIpIHtcbiAgLy8gZWxlbWVudCB0eXBlIOOBq+W/nOOBmOOBpuODjuODvOODieOCkuS9nOaIkFxuICBjb25zdCBkb20gPVxuICAgIGZpYmVyLnR5cGUgPT09IFwiVEVYVF9FTEVNRU5UXCJcbiAgICAgID8gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJcIilcbiAgICAgIDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudChmaWJlci50eXBlKTtcblxuICAvLyBjaGlsZHJlbiDjgpLpmaTjgY8gcHJvcGVydHkg44Gu5Ymy44KK5b2T44GmXG4gIHVwZGF0ZURvbShkb20sIHt9LCBmaWJlci5wcm9wcyk7XG5cbiAgcmV0dXJuIGRvbTtcbn1cblxuY29uc3QgRGlkYWN0ID0ge1xuICBjcmVhdGVFbGVtZW50LFxuICByZW5kZXIsXG4gIHVzZVN0YXRlLFxufTtcblxuLyoqIEBqc3ggRGlkYWN0LmNyZWF0ZUVsZW1lbnQgKi9cbmZ1bmN0aW9uIENvdW50ZXIoKSB7XG4gIGNvbnN0IFtzdGF0ZSwgc2V0U3RhdGVdID0gRGlkYWN0LnVzZVN0YXRlKDEpO1xuICByZXR1cm4gPGgxIG9uQ2xpY2s9eygpID0+IHNldFN0YXRlKChjKSA9PiBjICsgMSl9PkNvdW50OiB7c3RhdGV9PC9oMT47XG59XG5cbmNvbnN0IGVsZW1lbnQgPSA8Q291bnRlciAvPjtcbmNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKTtcbkRpZGFjdC5yZW5kZXIoZWxlbWVudCwgY29udGFpbmVyKTtcbiJdLCJuYW1lcyI6WyJjcmVhdGVFbGVtZW50IiwidHlwZSIsInByb3BzIiwiY2hpbGRyZW4iLCJtYXAiLCJjaGlsZCIsImNyZWF0ZVRleHRFbGVtZW50IiwidGV4dCIsIm5vZGVWYWx1ZSIsIm5leHRVbml0T2ZXb3JrIiwiY3VycmVudFJvb3QiLCJ3aXBSb290IiwiZGVsZXRpb25zIiwiY29tbWl0Um9vdCIsImZvckVhY2giLCJjb21taXRXb3JrIiwicmVuZGVyIiwiZWxlbWVudCIsImNvbnRhaW5lciIsImRvbSIsImFsdGVybmF0ZSIsImZpYmVyIiwiZG9tUGFyZW50RmliZXIiLCJwYXJlbnQiLCJkb21QYXJlbnQiLCJlZmZlY3RUYWciLCJhcHBlbmRDaGlsZCIsInVwZGF0ZURvbSIsImNvbW1pdERlbGV0aW9uIiwic2libGluZyIsImlzTmV3IiwicHJldiIsIm5leHQiLCJrZXkiLCJpc0dvbmUiLCJpc0V2ZW50Iiwic3RhcnRzV2l0aCIsImlzUHJvcGVydHkiLCJwcmV2UHJvcHMiLCJuZXh0UHJvcHMiLCJPYmplY3QiLCJrZXlzIiwiZmlsdGVyIiwibmFtZSIsImV2ZW50VHlwZSIsInRvTG93ZXJDYXNlIiwic3Vic3RyaW5nIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVDaGlsZCIsIndvcmtMb29wIiwiZGVhZGxpbmUiLCJzaG91bGRZaWVsZCIsInBlcmZvcm1Vbml0T2ZXb3JrIiwidGltZVJlbWFpbmluZyIsInJlcXVlc3RJZGxlQ2FsbGJhY2siLCJpc0Z1bmN0aW9uQ29tcG9uZW50IiwiRnVuY3Rpb24iLCJ1cGRhdGVGdW5jdGlvbkNvbXBvbmVudCIsInVwZGF0ZUhvc3RDb21wb25lbnQiLCJuZXh0RmliZXIiLCJ3aXBGaWJlciIsImhvb2tJbmRleCIsImhvb2tzIiwicmVjb25jaWxlQ2hpbGRyZW4iLCJ1c2VTdGF0ZSIsImluaXRpYWwiLCJvbGRIb29rIiwiaG9vayIsInN0YXRlIiwicXVldWUiLCJhY3Rpb25zIiwiYWN0aW9uIiwic2V0U3RhdGUiLCJwdXNoIiwiY3JlYXRlRG9tIiwiZWxlbWVudHMiLCJpbmRleCIsIm9sZEZpYmVyIiwicHJldlNpYmxpbmciLCJsZW5ndGgiLCJuZXdGaWJlciIsInNhbWVUeXBlIiwiZG9jdW1lbnQiLCJjcmVhdGVUZXh0Tm9kZSIsIkRpZGFjdCIsIkNvdW50ZXIiLCJjIiwiZ2V0RWxlbWVudEJ5SWQiXSwic291cmNlUm9vdCI6IiJ9