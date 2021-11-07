// check for type
function isString(e) {
  return typeof e === "string" || e instanceof String;
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

function evalString(e) {
  return e.replaceAll(" ", "");
}

function is(type, e, ...otherBooleans) {
  if (typeof e != type) {
    throw new TypeError(`needs ${type} instead got ${e}`);
  }
  if (!otherBooleans.every((e) => e)) {
    throw new TypeError(``);
  }
}
