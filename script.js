//your JS code here.

// Do not change code below this line
// container for questions
const questionsElement = document.getElementById("questions");

// load saved answers from sessionStorage
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
    choices: ["Earth", "Jupiter", "Mars", "Saturn"],
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

  for (let i = 0; i < questions.length; i++) {

    const question = questions[i];

    const questionElement = document.createElement("div");

    const questionText = document.createTextNode(question.question);

    questionElement.appendChild(questionText);
    questionElement.appendChild(document.createElement("br"));

    for (let j = 0; j < question.choices.length; j++) {

      const choice = question.choices[j];

      const choiceElement = document.createElement("input");

      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      // restore saved selection
      if (userAnswers[i] === choice) {
        choiceElement.checked = true;
      }

      // save progress in sessionStorage
      choiceElement.addEventListener("change", function () {

        userAnswers[i] = choice;

        sessionStorage.setItem(
          "progress",
          JSON.stringify(userAnswers)
        );

      });

      const label = document.createTextNode(choice);

      questionElement.appendChild(choiceElement);
      questionElement.appendChild(label);
      questionElement.appendChild(document.createElement("br"));

    }

    questionElement.appendChild(document.createElement("br"));

    questionsElement.appendChild(questionElement);
  }
}

renderQuestions();


// submit quiz
function submitQuiz() {

  let score = 0;

  for (let i = 0; i < questions.length; i++) {

    if (userAnswers[i] === questions[i].answer) {
      score++;
    }

  }

  document.getElementById("result").innerText =
    "Your score is " + score + " out of 5.";

  // store score in localStorage
  localStorage.setItem("score", score);
}


// show saved score after refresh
const savedScore = localStorage.getItem("score");

if (savedScore) {

  document.getElementById("result").innerText =
    "Your score is " + savedScore + " out of 5.";

}