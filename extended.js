class ElementSelector {
  constructor(...elements) {
    if (!elements || elements.length === 0) return;
    this.elementList = [...elements];
    this.queries = this.mapElements((e) => {
      let query = e.tagName.toLowerCase();
      if (e.id) query += `#${e.id}`;
      if (e.className) query += `.${e.className}`;
      return query;
    }).removeDuplicates();
    this.element = this.elementList[0];
    this.eventListenerList = [];
  }
  // looping over elements
  mapElements(func = () => {}) {
    if (!isFunc(func)) return;
    if (this.elementList.length === 0) return [];
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
    if (this.elementList.length === 0 || !isFunc(func)) return;
    if (this.elementList.length === 1) func(this.elementList[0]);
    else {
      for (let i = 0; i < this.elementList.length; i++) {
        console.log("Loop", i);
        func(this.elementList[i], i, this.elementList);
      }
    }
    return this;
  }
  forEach(func = () => {}) {
    if (this.elementList.length === 0 || !isFunc(func)) return;
    if (this.elementList.length === 1)
      func(new ElementSelector(this.elementList[0]));
    for (let i = 0; i < this.elementList.length; i++) {
      func(new ElementSelector(this.elementList[i]));
    }
    return this;
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
    return getComputedStyle(this.el);
  }
  setEls(newNodeList) {
    if (!newNodeList) return;
    this.elementList = [...newNodeList];
    this.element = this.elementList[0];
    this.queries = this.mapElements((e) => e.tagName);
    this.eventListenerList = [];
    return this;
  }
  selectTill(index = 0) {
    if (isNaN(index)) return;
    return this.setEls(this.elementList.slice(0, index + 1));
  }
  select(...index) {
    if (!index || index.length === 0) return;
    if (index.length === 1) return this.setEls(this.elementList[0]);
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
  hasClass(className) {
    return this.forEachELement((e) => e.classList.contains(className));
  }
  // events
  on(type, func) {
    if (isString(type)) {
      this.eventListenerList.push({ type, func, elementList: this.els });
      return this.forEachELement((e) => e.addEventListener(type, func));
    } else
      return this.forEachELement((e) => {
        mapObject(type, (x, y) => {
          this.eventListenerList.push({
            type: x,
            func: y,
            elementList: this.els,
          });
          e.addEventListener(x, y);
        });
      });
  }
  removerEvent(type, func) {
    return this.forEachELement((e) => e.removeEventListener(type, func));
  }
  click(func = () => {}) {
    return this.on("click", func);
  }
  hover(func = () => {}) {
    return this.on("mouseover", func);
  }
  dblclick(func = () => {}) {
    return this.on("dblclick", func);
  }
  keypress(obj) {
    return this.on("keypress", (e) => {
      mapObject(obj, (x, y) => {
        if (x === e.key) y();
      });
    });
  }
  change(func = () => {}) {
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
toggleStyle(stylesObj, { animation = false, duration = 0.25 } = {}) {
    if (!isObject(stylesObj)) return;
    return this.forEachELement((e) => {
      if (animation) e.style.transition = `all ${duration}s linear`;
      mapObject(stylesObj, (x, y) => {
        if (e.style[x] === y[0]) e.style[x] = y[1];
        else e.style[x] = y[0];
      });
    });
  }
  // direct css
  css(cssString, selector = "") {
    declareStyles(this.queries.joinArr(`${selector}`, ","), cssString);
    return this;
  }
  // props
  id(elId) {
    if (!elId) return this.element.id;
    else return this.forEachELement((e) => (e.id = elId));
  }
  hide(boolean = true, prop = "block") {
    return this.forEachELement(
      (e) => (e.style.display = boolean ? "none" : prop)
    );
  }
  isHided() {
    return this.styles.display === "none";
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
  // dataset
  data(key, value) {
    if (!key) return this;
    return value
      ? this.forEachELement((e) => (e.dataset[key] = value))
      : this.mapElements((e) => e.dataset[key]);
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
}
function $(...queries) {
  return new ElementSelector(...document.querySelectorAll(queries));
}
function $$(...el) {
  return new ElementSelector(...el);
}
function $$$(tagName) {
  return new ElementSelector(document.createElement(tagName));
}
function on(type, func) {
  addEventListener(type, func);
}
function onload(func = () => {}) {
  on("DOMContentLoaded", func);
}
function keypress(obj) {
  on("keypress", (e) => {
    mapObject(obj, (x, y) => {
      if (x === e.key) y();
    });
  });
}
function useLoop(arr, func) {
  if (arr.length === 0 || !arr) return;
  if (arr.length === 1) func(arr[0], 0, arr);
  else for (let i = 0; i < arr.length; i++) func(arr[i], i, arr);
}
function useMap(arr, func) {
  let tempArr = [];
  useLoop(arr, (e, i, array) => tempArr.push(func(e, i, array)));
  return tempArr;
}
function useFont(fontName, ...elements) {
  function createLinkTag(attrObj) {
    $$$("link").attr(attrObj).prependTo($("head"));
  }
  let linkTag = document.getElementById("LinkTag");
  let linkTag2 = document.getElementById("LinkTag2");
  if (!linkTag)
    createLinkTag({
      id: "LinkTag",
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    });
  if (!linkTag2)
    createLinkTag({
      id: "LinkTag2",
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossorigin: "true",
    });
  createLinkTag({
    href: `https://fonts.googleapis.com/css2?family=${fontName}&display=swap`,
    rel: "stylesheet",
  });
  useLoop(elements, (e) => e.style({ fontFamily: fontName }));
}
function declareStyles(selector, styles) {
  function getStyles() {
    return `${selector}{${styleToString(styles)}}`;
  }
  let appendedStyleTag = document.getElementById("styleTag");
  if (appendedStyleTag) appendedStyleTag.innerHTML += getStyles();
  else $$$("style").id("styleTag").html(getStyles()).appendTo($("head"));
}
function useQuery(breakPoint, func = () => {}, func2 = () => {}) {
  if (innerWidth > breakPoint) func();
  else func2();
  on("resize", () => {
    if (innerWidth > breakPoint) func();
    else func2();
  });
}
function useStorage(storageObject) {
  function setItem(key, value) {
    if (key || value) return;
    storageObject.setItem(key, JSON.stringify(value));
  }
  function getItem(key) {
    if (key) return;
    let value = storageObject.getItem(key);
    if (value) return JSON.parse(value);
  }
  function removeItem(key) {
    if (key) return;
    storageObject.removeItem(key);
  }
  function clear() {
    storageObject.clear();
  }
  return [setItem, getItem, removeItem, clear];
}
function useLocalStorage() {
  return useStorage(localStorage);
}
function useSessionStorage() {
  return useStorage(sessionStorage);
}
function useTheme(theme) {
  let body = $("body");
  if (theme) {
    let [setLS] = useLocalStorage();
    body.data("theme", theme);
    setLS("theme", theme);
  }
  return body.data("theme")[0];
}