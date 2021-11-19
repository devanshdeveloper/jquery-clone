// check for type
function is(type, e, constructor) {
  return typeof e === type || e instanceof constructor;
}
function isString(e) {
  return is("string", e, String);
}
function isFunc(e) {
  return is("function", e, Function);
}

function isObject(obj) {
  return obj === Object(obj);
}

const styleToString = (style) => {
  if (isString(style)) return style;
  return Object.keys(style).reduce(
    (acc, key) =>
      `${acc}${key
        .split(/(?=[A-Z])/)
        .join("-")
        .toLowerCase()}: ${style[key]};`,
    ""
  );
};

function mapObject(obj, func) {
  let arr = [];
  for (const key in obj) arr.push(func(key, obj[key]));
  return arr;
}

Array.prototype.removeDuplicates = function () {
  if (this.length === 0) return "";
  if (this.length === 1) return this;
  else {
    let doneEls = [];
    for (let i = 0; i < this.length; i++) {
      if (doneEls.includes(this[i])) continue;
      doneEls.push(this[i]);
    }
    return doneEls;
  }
};

Array.prototype.joinArr = function (str = "", str2 = "") {
  if (this.length === 0) return "";
  if (this.length === 1) return this[0] + str;
  else {
    let temp = "";
    for (let i = 0; i < this.length; i++) {
      temp += this[i] + str + str2;
    }
    temp = temp.substring(0, temp.length - 1);
    return temp;
  }
};
Array.prototype.loop = function (func) {
  if (this.length === 0) return;
  if (this.length === 1) func(this[0], 0, this);
  else {
    for (let i = 0; i < this.length; i++) func(this[i], i, this);
  }
};
