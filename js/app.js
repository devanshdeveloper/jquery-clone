const questions = [
  {
    id: 1,
    q: "What is the capital of Andhra Pradesh",
    options: ["Dispur", "Amaravati", "Itanagar", "None of the Above"],
    correct: 2,
  },
  {
    id: 2,
    q: "What is the capital of Assam",
    options: ["Dispur", "Amaravati", "Itanagar", "None of the Above"],
    correct: 1,
  },
  {
    id: 3,
    q: "What is the capital of Bihar",
    options: ["Dispur", "Amaravati", "Patna", "None of the Above"],
    correct: 3,
  },
  {
    id: 4,
    q: "What is the capital of Chhattisgarh",
    options: ["Dispur", "Raipur", "Patna", "None of the Above"],
    correct: 2,
  },
  {
    id: 5,
    q: "What is the capital of Goa",
    options: ["Panali", "Raipur", "Patna", "None of the Above"],
    correct: 1,
  },
  {
    id: 6,
    q: "What is the capital of Gujarat",
    options: ["Gandhinagar", "Amaravati", "Patna", "None of the Above"],
    correct: 1,
  },
  {
    id: 7,
    q: "What is the capital of Haryanar",
    options: ["Dispur", "Chandigarh", "Patna", "None of the Above"],
    correct: 2,
  },
  {
    id: 8,
    q: "What is the capital of Karnataka",
    options: ["Dispur", "Bengaluru", "Patna", "None of the Above"],
    correct: 2,
  },
  {
    id: 9,
    q: "What is the capital of Madhya Pradesh",
    options: ["Dispur", "Amaravati", "Bhopal", "None of the Above"],
    correct: 3,
  },
  {
    id: 10,
    q: "What is the capital of Tamil Nadu",
    options: ["Dispur", "Amaravati", "Chennai", "None of the Above"],
    correct: 3,
  },
];
let currentQ = 0;

function updateScore(score) {
  $("#score").html(+$("#score").html() + score);
}

function loadQuestion(i) {
  currentQ = i > questions.length - 1 ? 0 : i;
  let q = questions[currentQ];
  $("#q").html(q.q);
  $("#options label").forEach((e, i) =>
    e.html(q.options[i]).style({ color: "black" })
  );
  $("#options input").disable(false).checked(false);
  $("#next").disable();
}

function checkAns(id) {
  let correctOption = questions[currentQ].correct;
  if (correctOption === id) updateScore(1);
  $("#options input")
    .disable()
    .select(correctOption)
    .previousNode()
    .style("color : green;");
  $("#next").disable(false);
}

onload(() => {
  loadQuestion(currentQ);
  $("#options input").on("change", (e) => checkAns(+e.target.id - 1));
  $("#next")
    .click(() => loadQuestion(currentQ + 1))
    .html("next");
  $("#next").attri;
});
