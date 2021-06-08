const question = document.querySelector(".question-box");
const choices = Array.from(document.querySelectorAll(".choice-text"));

const scoreText = document.querySelector(".score");
const timer = document.querySelector("timer-box");
const progressText = document.querySelector(".progress-container");
//review
const progressBar = document.querySelector(".progress-bar");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let timeLeft = 120;
let availableQuestions = [];

const questionList = questionBank;
// console.log(questionList, "QL");

const SCORE_POINTS = 10;
const MAX_QUESTIONS = 10;

startQuiz = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questionList];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("/end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  //review
  progressBar.style.width = `${(questionCounter/MAX_QUESTIONS) * 100 }%`

  //review - should questions be random?
  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;
  // console.log(question.innerText, "?")

  choices.forEach(choice => {
    // const letter = choice.dataset["letter"];
    // review - why isn't this displaying to the DOM, innerText?
    console.log(choices.innerText, "IT")
    choice.innerText = currentQuestion[choice.dataset["letter"]];
    console.log(currentQuestion[choice.dataset["letter"]])
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["letter"];

    let classToApply =
      selectedAnswer === currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove.classToApply;
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = nums => {
  score += nums;
  scoreText.innerText = score;
};

startQuiz();
