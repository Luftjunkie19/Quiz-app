const quizContainer = document.querySelector(".quiz-container");
const numberOfQuizes = document.querySelector(".number");
const answers = document.querySelectorAll(".answer");
const gameContainer = document.querySelector(`.game-container`);
const gameOver = document.querySelector(".game-over");
const question = document.querySelector(".question");
const answerA = document.querySelector(".answer-a");
const answerB = document.querySelector(".answer-b");
const answerC = document.querySelector(".answer-c");
const answerD = document.querySelector(".answer-d");
const scoreAmount = document.querySelector(".score");
const timeHolder = document.querySelector(".time");
const nextBtn = document.querySelector(".btn.next");
const finalInfo = document.querySelector(".info");
const finalMessage = document.querySelector(".message");

function removeChecked() {
  answers.forEach((answer) => {
    answer.checked = false;
  });
}

function getSelected() {
  let finalAnswer;
  answers.forEach((answer) => {
    answer.addEventListener("click", () => {
      removeChecked();
      answer.checked = true;

      if (answer.checked) {
        finalAnswer = answer;
        console.log(finalAnswer);
        return finalAnswer;
      }
    });
  });
}

async function renderQuizes() {
  const res = await fetch("/json/data.json");

  const data = await res.json();

  console.log(data.length);

  numberOfQuizes.innerText = data.length;

  data.forEach((quiz, i) => {
    const div = document.createElement("div");
    div.classList.add("quiz-choice");
    div.innerHTML = `<div class="img-control">
<img
  src="${quiz.image}"
  alt="Programming-language Quiz"
/>
</div>
<h2 class="quiz-name">${quiz.language} Quiz</h2>
<p class="quest">Questions: ${quiz.questions.length}</p>
<button class="btn move-to" id="${i}">Go to ${quiz.language}-quiz</button>`;

    quizContainer.append(div);
  });
}
renderQuizes();

let currentQuestion = 0;
let currentPoints = 0;
let timeForAnswer = 0;

async function getQuiz(e) {
  const res = await fetch("/json/data.json");

  const data = await res.json();

  let target = e.target;
  if (target.classList.contains("move-to")) {
    e.preventDefault();
    gameContainer.style.display = "flex";
    quizContainer.style.display = "none";

    let numberOfQuiz = +target.id;
    console.log(numberOfQuiz);
    console.log(data[numberOfQuiz].questions[currentQuestion]);

    question.innerText = data[numberOfQuiz].questions[currentQuestion].question;
    answerA.innerText = data[numberOfQuiz].questions[currentQuestion].a;
    answerB.innerText = data[numberOfQuiz].questions[currentQuestion].b;
    answerC.innerText = data[numberOfQuiz].questions[currentQuestion].c;
    answerD.innerText = data[numberOfQuiz].questions[currentQuestion].d;
    scoreAmount.innerText = `Score: ${currentPoints}`;

    setInterval(() => {
      timeForAnswer++;
      timeHolder.innerText = `${timeForAnswer}`;
    }, 1000);

    nextBtn.addEventListener(`click`, (e) => {
      e.preventDefault();
      removeChecked();
      currentQuestion++;

      console.log(data[numberOfQuiz].questions.length);

      if (currentQuestion > data[numberOfQuiz].questions.length - 1) {
        currentQuestion = data[numberOfQuiz].questions.length - 1;
        gameContainer.style.display = "none";
        gameOver.style.display = "flex";
        finalInfo.innerText = "Oh not this time";
        finalMessage.innerText = `Your score is ${currentPoints}/${data[numberOfQuiz].questions.length}`;
      }

      question.innerText =
        data[numberOfQuiz].questions[currentQuestion].question;

      answerA.innerText = data[numberOfQuiz].questions[currentQuestion].a;
      answerB.innerText = data[numberOfQuiz].questions[currentQuestion].b;
      answerC.innerText = data[numberOfQuiz].questions[currentQuestion].c;
      answerD.innerText = data[numberOfQuiz].questions[currentQuestion].d;
      scoreAmount.innerText = `Score: ${currentPoints}`;
    });
  }
}

quizContainer.addEventListener("click", getQuiz);
