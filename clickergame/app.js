let count = 0;

onload(() => {
  function updateCount(newCount) {
    return $("span").html(`Count : ${newCount}`);
  }
  useFont("Poppins");
  $("*:not(script , head , link , html)").style({
    margin: 0,
    padding: 0,
    fontFamily: "Poppins",
  });
  $("body").style({
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    margin: "10px",
  });
  $$$("span")
    .style({
      fontSize: "1.5rem",
    })
    .html(`Count : ${count}`)
    .prependTo($("body"));
  function createBtn(html, func) {
    $$$("button")
      .click(func)
      .html(html)
      .style({
        fontSize: "1.3rem",
      })
      .appendTo($("body"));
  }
  createBtn("Addition", () => updateCount(++count));
  createBtn("Subtration", () => updateCount(--count));
  keypress({
    "+": () => updateCount(++count),
    "-": () => updateCount(--count),
  });
});
