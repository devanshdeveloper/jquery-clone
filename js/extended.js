class ElementSelector {
  constructor(query) {
    this.query = query;
    this.elementList = [...document.querySelectorAll(query)];
    this.element = document.querySelector(query);
  }

  // looping over elements
  mapElements(func = () => { }) {
    if (this.elementList.length === 0) return;
    return this.elementList.length < 1
      ? func(this.elementList[0])
      : this.elementList.map(func);
  }

  forEachELement(func = () => { }) {
    if (this.elementList.length === 0) return;
    this.elementList.length < 1
      ? func(this.elementList[0])
      : this.elementList.forEach(func);
    return this;
  }

  forEach(func) {
    this.elementList.forEach((e, i) => {
      func(new CreateReference(e), i);
    });
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

  select(i) {
    return this.setEls([this.elementList[i]]);
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
    this.hover(() => (eventInterval = setTimeout(func, delay)));
    this.on("mousedown", () => clearInterval(eventInterval));
    return this;
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

  // animate(
  //   cssString,
  //   selector,
  //   { prop = "all", duration = 2000, timingFunc = "liner", delay = 0 } = {}
  // ) {
  //   this.css(
  //     `transition: ${prop} ${duration / 1000}s ${timingFunc} ${
  //       delay === 0 ? delay : delay / 1000
  //     }s;`
  //   );
  //   this.css(cssString, selector);
  //   return this
  // }

  // props
  hide(boolean = true, prop = "block") {
    return this.forEachELement((e) => (e.style.display = boolean ? "none" : prop));
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
  previousElement() {
    return this.setEls(this.mapElements((e) => e.previousElementSibling));
  }
  nextElement() {
    return this.setEls(this.mapElements((e) => e.nextElementSibling));
  }
  parent() {
    return this.setEls(this.mapElements((e) => e.parentElement));
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
  constructor(node) {
    super();
    this.elementList = [node];
    this.element = this.elementList[0];
  }
}

function $(query) {
  return new ElementSelector(query);
}

function $$$(tagName, num = 1) {
  return new CreateElement(tagName, num);
}

function onload(func) {
  addEventListener("DOMContentLoaded", func);
}
