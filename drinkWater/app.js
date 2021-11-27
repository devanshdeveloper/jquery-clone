const cups = $(".cups");
let glassSize = 250;
let goal = 2.5;
let noOfGlasses = 10;
const liters = $("#liters");
const percentage = $("#percentage");
const remained = $("#remained");
updateBigCup();
useLoop(noOfGlasses, (i) => {
  $$$("div", cups)
    .addClass("cup", "cup-small")
    .html(`${glassSize} ml`)
    .click(() => highlightCups(i));
});
let smallCups = $(".cup-small");
function highlightCups(i) {
  smallCups.forEach((e, i2) =>
    i2 <= i ? e.addClass("full") : e.removeClass("full")
  );
  updateBigCup();
}
function updateBigCup() {
  const fullCups = $(".cup-small.full").length;
  fullCups === 0
    ? percentage.style({ visibility: "hidden", height: "0px" })
    : percentage
        .style({
          visibility: "visible",
          height: `${(fullCups / noOfGlasses) * 330}px`,
        })
        .html(`${(fullCups / noOfGlasses) * 100}%`);
  if (fullCups === noOfGlasses)
    remained.style({ visibility: "hidden", height: "0px" });
  else {
    liters.html(`${goal - (glassSize * fullCups) / 1000}L`);
    remained.style({ visibility: "visible" });
  }
}