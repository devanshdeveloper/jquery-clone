class ElementSelector {
  constructor(query) {
    this.elementList = [...document.querySelectorAll(query)];
    // if(this.elementList.length === 0) {
    //   throw TypeError(`no element found with ${this.query}`)
    // }
    this.query = query;
    this.element = document.querySelector(query);
  }

  // looping over elements
  mapElements(func = () => {}) {
    if (this.elementList.length === 0) return;
    if (this.elementList.length === 1) return [func(this.elementList[0])];
    else {
      let arr = [];
      for (let i = 0; i < this.elementList.length; i++) {
        arr.push(func(this.elementList[i], i, this.elementList));
      }
      return arr;
    }
  }

  forEachELement(func = () => {}) {
    if (this.elementList.length === 0) return;
    if (this.elementList.length === 1) func(this.elementList[0]);
    else {
      for (let i = 0; i < this.elementList.length; i++) {
        func(this.elementList[i], i, this.elementList);
      }
    }
    return this;
  }

  forEach(func) {
    for (let i = 0; i < this.elementList.length; i++) {
      func(new CreateReference(this.elementList[i]), i);
    }
  }

  // getters
  get el() {
    return this.element;
  }

  get els() {
    return this.elementList;
  }

  get attri() {
    return this.element.attributes;
  }

  get styles() {
    return this.element.style;
  }

  // setters

  setEls(newNodeList) {
    this.elementList = [...newNodeList];
    this.element = this.elementList[0];
    return this;
  }

  first(num = 1) {
    return this.setEls(this.elementList.slice(0, num));
  }

  select(...index) {
    return this.setEls(this.elementList.filter((e, i) => index.includes(i)));
  }

  // classes
  addClass(...className) {
    return this.forEachELement((e) => e.classList.add(...className));
  }
  removeClass(classToRemove) {
    return this.forEachELement((e) => e.classList.remove(classToRemove));
  }
  toggleClass(classToToggle) {
    return this.forEachELement((e) => e.classList.toggle(classToToggle));
  }

  // events
  on(type, func) {
    if (isString(type))
      return this.forEachELement((e) => e.addEventListener(type, func));
    else
      return this.forEachELement((e) => {
        mapObject(type, (x, y) => e.addEventListener(x, y));
      });
  }

  removerEvent(type, func) {
    return this.forEachELement((e) => e.removeEventListener(type, func));
  }

  click(func) {
    return this.on("click", func);
  }

  hover(func) {
    return this.on("mouseover", func);
  }

  dblclick(func) {
    return this.on("dblclick", func);
  }

  hold(func, delay = 2000) {
    let eventInterval;
    const clearFunc = () => {
      clearInterval(eventInterval);
      console.log("clearFunc");
    };
    this.on(
      "mouseenter",
      (e) =>
        (eventInterval = setTimeout(() => {
          console.log("hover");
          func(e, clearFunc);
        }, delay))
    );
    this.on("mousedown", clearFunc);
    return this;
  }

  removeHold(func, clearFunc) {
    this.removerEvent("mouseover", func);
    return this.removerEvent("mousedown", clearFunc);
  }

  keypress(obj) {
    return this.on("keypress", (e) => {
      mapObject(obj, (x, y) => {
        if (x === e.key) y();
      });
    });
  }

  change(func) {
    return this.on("change", func);
  }

  // styling
  style(styles) {
    if (isString(styles))
      return this.forEachELement((e) => (e.style.cssText += styles));
    else
      return this.forEachELement((e) => {
        mapObject(styles, (x, y) => (e.style[x] = y));
      });
  }

  // direct css
  css(cssString, selector = "") {
    $$$("style")
      .html(`${this.query}${selector}{${styleToString(cssString)}}`)
      .appendTo($("head"));
  }

  // props
  hide(boolean = true, prop = "block") {
    return this.forEachELement(
      (e) => (e.style.display = boolean ? "none" : prop)
    );
  }

  html(innerHTML) {
    if (!innerHTML) return this.element.innerHTML;
    else return this.forEachELement((e) => (e.innerHTML = innerHTML));
  }

  disable(boolean = true) {
    return this.forEachELement((e) => (e.disabled = boolean));
  }

  checked(boolean = true) {
    return this.forEachELement((e) => (e.checked = boolean));
  }

  attr(attr, value) {
    if (isString(attr)) {
      return value
        ? this.forEachELement((e) => e.setAttribute(attr, value))
        : this.mapElements((e) => e.getAttribute(attr));
    } else {
      return this.forEachELement((e) =>
        mapObject(attr, (x, y) => e.setAttribute(x, y))
      );
    }
  }

  // document
  appendTo(el) {
    return this.forEachELement((e) => el.el.append(e));
  }
  prependTo(el) {
    return this.forEachELement((e) => el.el.prepend(e));
  }
  previousElement() {
    return this.setEls(this.mapElements((e) => e.previousElementSibling));
  }
  nextElement() {
    return this.setEls(this.mapElements((e) => e.nextElementSibling));
  }
  parent() {
    return this.setEls(this.mapElements((e) => e.parentElement));
  }
  child() {
    return this.setEls(this.mapElements((e) => e.children));
  }
}

class CreateElement extends ElementSelector {
  constructor(tagName) {
    super();
    this.elementList = [document.createElement(tagName)];
    this.element = this.elementList[0];
  }
}
class CreateReference extends ElementSelector {
  constructor(...node) {
    super();
    this.elementList = [...node];
    this.element = this.elementList[0];
  }
}

function $(query) {
  return new ElementSelector(query);
}

function $$$(tagName, num = 1) {
  return new CreateElement(tagName, num);
}

function on(type, func) {
  addEventListener(type, func);
}

function onload(func) {
  on("DOMContentLoaded", func);
}

function keypress(obj) {
  on("keypress", (e) => {
    mapObject(obj, (x, y) => {
      if (x === e.key) y();
    });
  });
}

function useFont(fontName) {
  function createLinkTag(attrObj) {
    $$$("link").attr(attrObj).prependTo($("head"));
  }
  createLinkTag({
    rel: "preconnect",
    href: "https://fonts.googleapis.com",
  });
  createLinkTag({
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossorigin: "true",
  });
  createLinkTag({
    href: `https://fonts.googleapis.com/css2?family=${fontName}&display=swap`,
    rel: "stylesheet",
  });
}

function refEl(...el) {
  return new CreateReference(...el);
}
