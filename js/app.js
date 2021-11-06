const questions = [
  {
    id: 1,
    q: "What is the capital of Andhra Pradesh ?",
    options: ["Dispur", "Amaravati", "Itanagar", "None of the Above"],
    correct: 1,
  },
  {
    id: 2,
    q: "What is the capital of Assam ?",
    options: ["Dispur", "Amaravati", "Itanagar", "None of the Above"],
    correct: 0,
  },
  {
    id: 3,
    q: "What is the capital of Bihar ?",
    options: ["Dispur", "Amaravati", "Patna", "None of the Above"],
    correct: 2,
  },
  {
    id: 4,
    q: "What is the capital of Chhattisgarh ?",
    options: ["Dispur", "Raipur", "Patna", "None of the Above"],
    correct: 1,
  },
  {
    id: 5,
    q: "What is the capital of Goa ?",
    options: ["Panali", "Raipur", "Patna", "None of the Above"],
    correct: 0,
  },
  {
    id: 6,
    q: "What is the capital of Gujarat ?",
    options: ["Gandhinagar", "Amaravati", "Patna", "None of the Above"],
    correct: 0,
  },
  {
    id: 7,
    q: "What is the capital of Haryanar ?",
    options: ["Dispur", "Chandigarh", "Patna", "None of the Above"],
    correct: 1,
  },
  {
    id: 8,
    q: "What is the capital of Karnataka ?",
    options: ["Dispur", "Bengaluru", "Patna", "None of the Above"],
    correct: 1,
  },
  {
    id: 9,
    q: "What is the capital of Madhya Pradesh ?",
    options: ["Dispur", "Amaravati", "Bhopal", "None of the Above"],
    correct: 2,
  },
  {
    id: 10,
    q: "What is the capital of Tamil Nadu ?",
    options: ["Dispur", "Amaravati", "Chennai", "None of the Above"],
    correct: 2,
  },
];
let currentQ = 0;

function gameOver() {
  $("#modal").parent().hide(false, "flex")
  $("#modal p").html(`Score : ${+$("#score").html()}`)
  $("#score").html(0)
  $("#modal button").click(() => $("#modal").parent().hide())
  return 0
}

function loadQuestion(i) {  
  currentQ = i > questions.length - 1 ? gameOver() : i;
  let q = questions[currentQ];
  $("#q").html(q.q).attr("title", q.q);
  $("#options label").forEach((e, i) =>
    e
      .html(q.options[i])
      .attr("title", q.options[i])
      .style({ color: "black" })
      .parent()
      .style("background-color : #fff;")
  );
  $("#options input").disable(false).checked(false);
  $("#next").disable();
}

function checkAns(id) {
  let correctOption = questions[currentQ].correct;
  if (correctOption === id) $("#score").html(+$("#score").html() + 1);
  else $("#options input")
    .select(id)
    .nextElement()
    .style("color : white;")
    .parent()
    .style("background-color : red;")
  $("#options input")
    .disable()
    .select(correctOption)
    .nextElement()
    .style("color : white;")
    .parent()
    .style("background-color : green;");
  $("#next").disable(false);
}

onload(() => {
  loadQuestion(currentQ);
  $("#options input").change((e) => checkAns(+e.target.id - 1));
  $("#next")
    .click(() => loadQuestion(currentQ + 1))
    .html("Next -->");
  $("#modal").parent().hide()
  // console.log($("#result").styles);
});
