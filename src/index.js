function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    },
  };
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

let nextUnitOfWork = null;
let currentRoot = null;
let wipRoot = null;
let deletions = null;

function commitRoot() {
  deletions.forEach(commitWork);
  // dom に node を追加する
  commitWork(wipRoot.child);
  // dom にコミットした最後のファイバーツリーを currentRoot として参照を保存する
  currentRoot = wipRoot;
  // ファイバーツリーの root を null にする
  wipRoot = null;
}

function render(element, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
    alternate: currentRoot,
  };
  deletions = [];
  nextUnitOfWork = wipRoot;
}

function commitWork(fiber) {
  if (!fiber) {
    return;
  }

  // 関数コンポーネントから作られるファイバーには dom ノードがないので DOMノードを持つファイバーが見つかるまでファイバーツリーを上に移動
  let domParentFiber = fiber.parent;
  while (!domParentFiber.dom) {
    domParentFiber = domParentFiber.parent;
  }
  const domParent = domParentFiber.dom;

  // fiber の effectTag に応じて fiber.dom を dom に反映する
  if (fiber.effectTag === "PLACEMENT" && fiber.dom != null) {
    domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag === "UPDATE" && fiber.dom != null) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props);
  } else if (fiber.effectTag === "DELETION") {
    commitDeletion(fiber, domParent); // ノードを削除するときは、DOMノードを持つ子が見つかるまで探索を続行
  }

  // child と sibling も再帰的に処理
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

const isNew = (prev, next) => (key) => prev[key] !== next[key];
const isGone = (prev, next) => (key) => !(key in next);
const isEvent = (key) => key.startsWith("on");
const isProperty = (key) => key !== "children" && !isEvent(key);
function updateDom(dom, prevProps, nextProps) {
  // 古い、または変更されたイベントリスナーを削除
  Object.keys(prevProps)
    .filter(isEvent)
    .filter((key) => !(key in nextProps) || isNew(prevProps, nextProps)(key))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[name]);
    });
  // 古い properties を削除
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach((name) => {
      dom[name] = "";
    });

  // 新規 or 変更された property を反映
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      dom[name] = nextProps[name];
    });

  // イベントリスナーを追加
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
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
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }

  // commit phase
  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }

  requestIdleCallback(workLoop);
}

// メインスレッドがアイドル状態のときにブラウザがコールバックを実行
requestIdleCallback(workLoop);

function performUnitOfWork(fiber) {
  const isFunctionComponent = fiber.type instanceof Function;
  if (isFunctionComponent) {
    updateFunctionComponent(fiber);
  } else {
    updateHostComponent(fiber);
  }

  // 作業単位を検索。 最初に子要素、次に兄弟、次におじというように試みる
  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
}

let wipFiber = null;
let hookIndex = null;

function updateFunctionComponent(fiber) {
  wipFiber = fiber;
  hookIndex = 0;
  wipFiber.hooks = [];
  const children = [fiber.type(fiber.props)];
  reconcileChildren(fiber, children);
}

function useState(initial) {
  const oldHook =
    wipFiber.alternate &&
    wipFiber.alternate.hooks &&
    wipFiber.alternate.hooks[hookIndex];
  const hook = {
    state: oldHook ? oldHook.state : initial,
    queue: [],
  };

  // 次回コンポーネントをレンダリングするときにこれを行い、古いフックキューからすべてのアクションを取得し、それらを1つずつ新しいフックのstateに適用して、stateを返すときに更新
  const actions = oldHook ? oldHook.queue : [];
  actions.forEach((action) => {
    hook.state = action(hook.state);
  });

  const setState = (action) => {
    hook.queue.push(action);
    wipRoot = {
      dom: currentRoot.dom,
      props: currentRoot.props,
      alternate: currentRoot,
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
}

// wipFiber の子とその兄弟について、古いファイバーと新しいファイバーを比較し wipFiber を更新する
function reconcileChildren(wipFiber, elements) {
  let index = 0;
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child;
  let prevSibling = null;

  // 配列( elements )とリンクリスト ( oldFiber は sibling を通したリンクリストになっている )を同時にループ処理する
  while (index < elements.length || oldFiber != null) {
    const element = elements[index];
    let newFiber = null;

    const sameType = oldFiber && element && element.type === oldFiber.type;

    // 古いファイバーとelementが同じタイプの場合、dom を古いファイバーから保持し、props は element から保持するように、新しいファイバーを作成
    if (sameType) {
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: "UPDATE",
      };
    }
    // 要素に新しいDOMノードが必要な場合は、新しいファイバーにPLACEMENTをタグ付け
    if (element && !sameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: "PLACEMENT",
      };
    }
    // ノードを削除する必要がある場合は、新しいファイバーがないため、古いファイバーにエフェクトタグを追加
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
  const dom =
    fiber.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type);

  // children を除く property の割り当て
  updateDom(dom, {}, fiber.props);

  return dom;
}

const Didact = {
  createElement,
  render,
  useState,
};

/** @jsx Didact.createElement */
function Counter() {
  const [state, setState] = Didact.useState(1);
  return <h1 onClick={() => setState((c) => c + 1)}>Count: {state}</h1>;
}

const element = <Counter />;
const container = document.getElementById("root");
Didact.render(element, container);
