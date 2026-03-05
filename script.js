//your JS code here.
// Do not change code below this line
// This code will just display the questions to the screen
// DOM elements
const questionsElement = document.getElementById("questions");

// load saved progress
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

// Do not change code below this line
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Display questions
function renderQuestions() {

  questionsElement.innerHTML = "";

  for (let i = 0; i < questions.length; i++) {

    const question = questions[i];

    const questionElement = document.createElement("div");

    const questionText = document.createTextNode(question.question);

    questionElement.appendChild(questionText);

    for (let j = 0; j < question.choices.length; j++) {

      const choice = question.choices[j];

      const input = document.createElement("input");

      input.setAttribute("type", "radio");
      input.setAttribute("name", `question-${i}`);
      input.setAttribute("value", choice);

      if (userAnswers[i] === choice) {
        input.setAttribute("checked", "true");
      }

      input.addEventListener("change", function () {

        userAnswers[i] = choice;

        sessionStorage.setItem("progress", JSON.stringify(userAnswers));

      });

      const label = document.createTextNode(choice);

      questionElement.appendChild(input);
      questionElement.appendChild(label);

    }

    questionsElement.appendChild(questionElement);

  }

}

renderQuestions();

// Submit quiz
function submitQuiz() {

  let score = 0;

  for (let i = 0; i < questions.length; i++) {

    if (userAnswers[i] === questions[i].answer) {
      score++;
    }

  }

  document.getElementById("score").innerText =
    "Your score is " + score + " out of 5.";

  localStorage.setItem("score", score);

}

// button click
document.getElementById("submit").addEventListener("click", submitQuiz);

// show stored score
const savedScore = localStorage.getItem("score");

if (savedScore) {

  document.getElementById("score").innerText =
    "Your score is " + savedScore + " out of 5.";

}