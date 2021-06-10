const question = document.querySelector(".question-box");
const choices = Array.from(document.querySelectorAll(".choice-text"));
// console.log(choices, "choices")
const scoreText = document.querySelector(".score");
const progressText = document.querySelector(".progress-container");
//review
const progressBar = document.querySelector(".progress-bar");

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
  startTimer()
};

startTimer = () => {
  let timeLeft = 120;
  setInterval(function() {
    timeLeft--
    if(timeLeft >= 0) {
      const timer = document.querySelector(".timer");
      seconds = timeLeft % 60
      minutes = Math.floor(timeLeft/60)
      if(minutes < 10) {
        minutes = `0${minutes}`
      }
      if(seconds < 10) {
        seconds= `0${seconds}`
      }
      timer.innerHTML = `${minutes}: ${seconds}`
    }
   
    if(timeLeft === 0) {
      alert("Sorry out of time!")
      clearInterval(timeLeft)
      startQuiz()
    }
  }, 1000)
}

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
    
    choice.dataset.innerHTML = currentQuestion[choice.dataset["letter"]];
    console.log(currentQuestion[choice.dataset["letter"]])
    console.log(choices.innerText, "cho")
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
