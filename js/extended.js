class ElementSelector {
  constructor(query) {
    this.elementList = [...document.querySelectorAll(query)];
    this.element = document.querySelector(query);
  }

  // looping over elements
  mapElements(func) {
    if (this.elementList.length === 0) return;
    return this.elementList.length < 2
      ? func(this.elementList[0])
      : this.elementList.map(func);
  }
  forEachELement(func) {
    if (this.elementList.length === 0) return;
    this.elementList.length < 2
      ? func(this.elementList[0])
      : this.elementList.forEach(func);
    return this;
  }

  // getters
  get el() {
    return this.element;
  }

  get els() {
    return this.elementList;
  }

  first(num = 1) {
    this.elementList = this.elementList.slice(0, num);
    return this;
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
    else {
      return this.forEachELement((e) => {
        for (const key in type) e.addEventListener(key, type[key]);
      });
    }
  }

  click(func) {
    return this.on("click", func);
  }

  // styling
  style(styles) {
    return this.forEachELement(() => {
      this.attr(
        "style",
        (this.attr("style") ?? "") +
          (isString(styles) ? styles : styleToString(styles))
      );
    });
  }

  // direct css
  hide(boolean = true) {
    return this.forEachELement((e) => (e.hidden = boolean));
  }

  // props
  html(innerHTML) {
    return this.forEachELement((e) => (e.innerHTML = innerHTML));
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
}

class CreateElement extends ElementSelector {
  constructor(tagName, num) {
    super();
    this.element = document.createElement(tagName);
    this.elementList = Array(num).fill(document.createElement(tagName));
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

onload(() => {
  $$$("p")
    .click(() => {
      $("input").style({
        accentColor: "green",
      });
    })
    .appendTo($("div"));
  $$$("input")
    .addClass("input")
    .style({
      accentColor: "red",
    })
    .attr("type", "range")
    .on("input", (e) => {
      $("p").first(2).html(e.target.value);
    })
    .appendTo($("div"));
});
