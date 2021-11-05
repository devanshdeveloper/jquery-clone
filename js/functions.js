// check for type
function isString(e) {
  return typeof e === "string" || e instanceof String;
}

function mapObject(obj, func) {
  let arr = [];
  for (const key in obj) arr.push(func(key, obj[key]));
  return arr;
}

function evalString(e) {
  return e.replaceAll(" ", "");
}

const styleToString = (style) => {
  return Object.keys(style).reduce(
    (acc, key) =>
      acc +
      key
        .split(/(?=[A-Z])/)
        .join("-")
        .toLowerCase() +
      ":" +
      style[key] +
      ";",
    ""
  );
};
