const question = document.querySelector(".question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const scoreText = document.querySelector(".score");
const progressText = document.querySelector("#progress-text");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

const questionList = questionBank;

const SCORE_POINTS = 10;
const MAX_QUESTIONS = 10;

startQuiz = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questionList];
  getNewQuestion();
  startTimer();
};

startTimer = () => {
  let timeLeft = 120;
  setInterval(function () {
    timeLeft--;
    if (timeLeft >= 0) {
      const timer = document.querySelector(".timer");
      seconds = timeLeft % 60;
      minutes = Math.floor(timeLeft / 60);
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      if (seconds < 10) {
        seconds = `0${seconds}`;
      }
      timer.innerHTML = `${minutes}: ${seconds}`;
    }

    if (timeLeft === 0) {
      alert("Sorry you are out of time!");
      clearInterval(timeLeft);
      startQuiz();
    }
  }, 1000);
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("/end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const letter = choice.dataset["letter"];
    choice.innerHTML = currentQuestion[letter];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", event => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = event.target;
    const selectedAnswer = selectedChoice.dataset["letter"];

    let classToApply =
      selectedAnswer === currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = nums => {
  score += nums;
  scoreText.innerHTML = score;
};

startQuiz();
