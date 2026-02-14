const PHASE_WAIT_MS = 2300;

const questionPool = [
  {
    id: 'q1',
    type: 'choice',
    title: 'When did I fall in love with you?',
    options: [
      'After our cute chess game.',
      'When we met for the first time in the judo hall.',
      'When you tried to kill me with your books.'
    ],
    correctIndex: 2
  },
  {
    id: 'q2',
    type: 'choice',
    title: 'What was the date?',
    options: ['26th January 2023', 'Mid December 2022', '2022 November end'],
    correctIndex: 1
  },
  {
    id: 'q3',
    type: 'choice',
    title: 'When did I pity you and finally decide to propose you?',
    options: ['26th Jan', 'I never pitied you', 'The day I realised I couldn’t lose you'],
    correctIndex: 0
  },
  {
    id: 'q5',
    type: 'text',
    title: 'When did you become so comfortable that you behaving like a child in front of me?'
  },
  {
    id: 'q6',
    type: 'choice',
    title: 'What is my favourite food?',
    options: ['Pani Puri', 'Pizza', 'Dal Pakwan', 'You'],
    correctIndex: 0
  },
  {
    id: 'q7',
    type: 'text',
    title: 'What is your favourite food?'
  },
  {
    id: 'q8',
    type: 'text',
    title: 'When did I teach you that kinky stuff on call?  😋 😋'
  },
  {
    id: 'q9',
    type: 'text',
    title: 'When was the first time we met?'
  }
];

let currentRound = 'intro';
let currentQuestionIndex = 0;
let answeredCurrent = false;
let currentQuestionSet = [];
let selectedIndex = null;
const chosenAnswers = {};

const landingSection = document.getElementById('landing-section');
const phaseSection = document.getElementById('phase-section');
const phaseCard = document.getElementById('phase-card');
const phaseTwoSection = document.getElementById('phase-two-section');
const phaseTwoCard = document.getElementById('phase-two-card');
const quizSection = document.getElementById('quiz-section');
const timelineSection = document.getElementById('timeline-section');
const spicySection = document.getElementById('spicy-section');

const landingYesBtn = document.getElementById('landing-yes');
const landingNoBtn = document.getElementById('landing-no');
const landingReveal = document.getElementById('landing-reveal');

const spicyUmm = document.getElementById('spicy-umm');
const spicyReady = document.getElementById('spicy-ready');

const questionTitle = document.getElementById('question-title');
const optionsEl = document.getElementById('options');
const textAnswerWrap = document.getElementById('text-answer-wrap');
const textAnswer = document.getElementById('text-answer');
const feedbackEl = document.getElementById('feedback');
const lockBtn = document.getElementById('lock-btn');
const nextBtn = document.getElementById('next-btn');
const retryBtn = document.getElementById('retry-btn');

const timelineMemory = document.getElementById('timeline-memory');
const timelineMemoryAnswer = document.getElementById('timeline-memory-answer');
const timelineQ3 = document.getElementById('timeline-q3');
const timelineQ3Answer = document.getElementById('timeline-q3-answer');
const timelineQ5 = document.getElementById('timeline-q5');
const timelineQ5Answer = document.getElementById('timeline-q5-answer');
const timelineQ8 = document.getElementById('timeline-q8');
const timelineQ8Answer = document.getElementById('timeline-q8-answer');
const timelineQ9 = document.getElementById('timeline-q9');
const timelineQ9Answer = document.getElementById('timeline-q9-answer');

const portfolioCard = document.getElementById('portfolio-card');
const timelineLoverText = document.getElementById('timeline-lover-text');
const timelineLoverExtra = document.getElementById('timeline-lover-extra');
const timelineLoverColor = document.getElementById('timeline-lover-color');
const timelineLoverLove = document.getElementById('timeline-lover-love');

const luckyCard = document.getElementById('lucky-card');
const timelineLuckyText = document.getElementById('timeline-lucky-text');
const timelineLuckyExtra = document.getElementById('timeline-lucky-extra');
const timelineLuckyColor = document.getElementById('timeline-lucky-color');
const timelineLuckyLove = document.getElementById('timeline-lucky-love');

const surpriseWrap = document.getElementById('surprise-wrap');
const surpriseBtn = document.getElementById('surprise-btn');
const finaleHeart = document.getElementById('finale-heart');
const loverNameOverlay = document.getElementById('lover-name-overlay');
const luckyNameOverlay = document.getElementById('lucky-name-overlay');
const finalQuestionModal = document.getElementById('final-question-modal');
const fq1Input = document.getElementById('fq1-input');
const fq2Input = document.getElementById('fq2-input');
const fq3Input = document.getElementById('fq3-input');
const fqFeedback = document.getElementById('fq-feedback');
const finalRevealBtn = document.getElementById('final-reveal-btn');
const yesOverlay = document.getElementById('yes-overlay');
const yesMidChar = document.getElementById('yes-mid-char');
const modalHearts = document.getElementById('modal-hearts');
const bgMusic = document.getElementById('bg-music');

function hidePortfolioCard() {
  surpriseWrap.classList.add('hidden');
  surpriseWrap.classList.remove('show');

  portfolioCard.classList.add('hidden');
  portfolioCard.classList.remove('show');
  timelineLoverText.textContent = '';
  timelineLoverExtra.textContent = '';
  timelineLoverColor.innerHTML = '';
  timelineLoverLove.textContent = '';

  luckyCard.classList.add('hidden');
  luckyCard.classList.remove('show');
  timelineLuckyText.textContent = '';
  timelineLuckyExtra.textContent = '';
  timelineLuckyColor.innerHTML = '';
  timelineLuckyLove.textContent = '';

  timelineSection.classList.remove('timeline-fading');
  portfolioCard.classList.remove('center-stage', 'center-left');
  luckyCard.classList.remove('center-stage', 'center-right', 'center-open', 'finale-hide-content');
  portfolioCard.classList.remove('center-open', 'finale-hide-content');

  finaleHeart.classList.add('hidden');
  finaleHeart.classList.remove('show');
  loverNameOverlay.classList.remove('show');
  luckyNameOverlay.classList.remove('show');
  loverNameOverlay.textContent = '';
  luckyNameOverlay.textContent = '';
  finalQuestionModal.classList.add('hidden');
  finalQuestionModal.classList.remove('show', 'revealed');
  yesOverlay.classList.add('hidden');
  yesOverlay.classList.remove('show', 'hearts-on', 'proposal-on');
  yesMidChar.textContent = '3';
  yesMidChar.classList.remove('to-e');
  fq1Input.value = '';
  fq2Input.value = '';
  fq3Input.value = '';
  fqFeedback.textContent = '';
  modalHearts.innerHTML = '';
}

function runFinalQuestionReveal() {
  const a1 = fq1Input.value.trim().toUpperCase();
  const a2 = fq2Input.value.trim();
  const a3 = fq3Input.value.trim().toUpperCase();

  if (a1 !== 'Y' || a2 !== '3' || a3 !== 'S') {
    fqFeedback.textContent = 'Hint: the vertical word should become YES 💗';
    return;
  }

  fqFeedback.textContent = '';
  finalQuestionModal.classList.add('revealed');
  yesOverlay.classList.remove('hidden');
  yesOverlay.classList.add('show');

  setTimeout(() => {
    yesMidChar.classList.add('to-e');
    yesMidChar.textContent = 'E';
  }, 900);

  setTimeout(() => {
    modalHearts.innerHTML = '';
    for (let i = 0; i < 22; i += 1) {
      const heart = document.createElement('span');
      heart.textContent = '💗';
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.animationDelay = `${Math.random() * 1.8}s`;
      heart.style.animationDuration = `${4 + Math.random() * 2.4}s`;
      modalHearts.appendChild(heart);
    }
    yesOverlay.classList.add('hearts-on');
  }, 1500);

  setTimeout(() => {
    yesOverlay.classList.add('proposal-on');
  }, 2200);
}

function applyPortfolioStage(targets, stage) {
  const {
    foodEl,
    extraEl,
    colorEl,
    loveEl,
    foodText,
    colorHtml
  } = targets;

  realisticTypewriter(foodEl, foodText);
  setTimeout(() => { colorEl.innerHTML = colorHtml; }, 520);

  if (stage === 'tharak' || stage === 'love') {
    setTimeout(() => realisticTypewriter(extraEl, 'Tharak: ∞'), 980);
  }

  if (stage === 'love') {
    setTimeout(() => realisticTypewriter(loveEl, 'Love for each other: ∞++'), 1520);
  }
}

function showPanel(panelToShow) {
  [landingSection, phaseSection, phaseTwoSection, quizSection, timelineSection, spicySection]
    .forEach((panel) => panel.classList.remove('active'));
  panelToShow.classList.add('active');

  if (panelToShow !== timelineSection) {
    hidePortfolioCard();
  }
}

function typeWriter(el, text, speed = 45) {
  el.textContent = '';
  let index = 0;
  const timer = setInterval(() => {
    el.textContent += text[index];
    index += 1;
    if (index >= text.length) clearInterval(timer);
  }, speed);
}

function realisticTypewriter(el, finalText) {
  el.textContent = '';
  let i = 0;

  function step() {
    if (i >= finalText.length) return;
    el.textContent += finalText[i];
    i += 1;
    setTimeout(step, 40 + Math.floor(Math.random() * 90));
  }

  step();
}

function handleLandingNo() {
  landingNoBtn.disabled = true;
  landingNoBtn.classList.add('blasted');

  setTimeout(() => {
    landingNoBtn.classList.add('hidden');
    typeWriter(landingReveal, 'Haha! You thought so?!');

    landingYesBtn.classList.remove('hover-locked');
    landingYesBtn.classList.add('yes-reveal');

    setTimeout(() => {
      landingYesBtn.classList.remove('yes-reveal');
      landingYesBtn.classList.add('floating-btn');
    }, 1700);
  }, 1450);
}

function startQuiz() {
  currentRound = 'intro';
  document.body.classList.add('quiz-mode');

  showPanel(phaseSection);
  phaseCard.classList.remove('show');
  setTimeout(() => phaseCard.classList.add('show'), 120);

  setTimeout(() => {
    showPanel(quizSection);
    setQuestionByIds(['q1', 'q2']);
  }, PHASE_WAIT_MS);
}

function showPhaseTwoThenQ5() {
  currentRound = 'q5';
  showPanel(phaseTwoSection);
  phaseTwoCard.classList.remove('show');
  setTimeout(() => phaseTwoCard.classList.add('show'), 120);

  setTimeout(() => {
    showPanel(quizSection);
    document.body.classList.add('quiz-mode');
    setQuestionByIds(['q5']);
  }, PHASE_WAIT_MS);
}

function startQ6FromSpicy() {
  currentRound = 'q6';
  document.body.classList.add('quiz-mode');
  showPanel(quizSection);
  setQuestionByIds(['q6']);
}

function runSpicySequenceThenQ6() {
  showPanel(spicySection);
  spicyUmm.classList.remove('show');
  spicyReady.classList.remove('show');
  spicyUmm.classList.add('hidden');
  spicyReady.classList.add('hidden');

  setTimeout(() => {
    spicyUmm.classList.remove('hidden');
    spicyUmm.classList.add('show');
  }, 150);

  setTimeout(() => {
    spicyReady.classList.remove('hidden');
    spicyReady.classList.add('show');
  }, 3150);

  setTimeout(() => startQ6FromSpicy(), 8150);
}

function setQuestionByIds(ids, index = 0) {
  currentQuestionIndex = index;
  currentQuestionSet = ids.map((id) => questionPool.find((q) => q.id === id));
  renderQuestion();
}

function renderQuestion() {
  const question = currentQuestionSet[currentQuestionIndex];
  answeredCurrent = false;
  selectedIndex = null;
  feedbackEl.textContent = '';
  lockBtn.classList.remove('hidden');
  lockBtn.disabled = false;
  nextBtn.classList.add('hidden');
  retryBtn.classList.add('hidden');
  questionTitle.textContent = question.title;

  optionsEl.innerHTML = '';
  textAnswerWrap.classList.add('hidden');
  textAnswer.value = '';

  if (question.type === 'text') {
    lockBtn.textContent = 'Proceed';
    optionsEl.classList.add('hidden');
    textAnswerWrap.classList.remove('hidden');
    return;
  }

  lockBtn.textContent = 'Lock the answer 🔒';
  optionsEl.classList.remove('hidden');
  question.options.forEach((option, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'option-btn';
    btn.textContent = `${idx + 1}. ${option}`;
    btn.addEventListener('click', () => selectOption(idx));
    optionsEl.appendChild(btn);
  });
}

function selectOption(index) {
  if (answeredCurrent) return;
  selectedIndex = index;

  const optionButtons = [...document.querySelectorAll('.option-btn')];
  optionButtons.forEach((button, idx) => button.classList.toggle('selected', idx === selectedIndex));
}

function playMusicFrom31WithFade() {
  if (!bgMusic) return;

  bgMusic.pause();
  bgMusic.currentTime = 31;
  bgMusic.volume = 0;

  bgMusic.play().catch(() => {});

  const fadeDuration = 2000; // 2 seconds
  const steps = 40;
  const stepTime = fadeDuration / steps;
  let currentStep = 0;

  const fade = setInterval(() => {
    currentStep++;
    bgMusic.volume = currentStep / steps;

    if (currentStep >= steps) {
      bgMusic.volume = 0.5;
      clearInterval(fade);
    }
  }, stepTime);
}

function fadeInMusic(audio, {
  startTime = 0,
  targetVolume = 0.5,
  duration = 2000
} = {}) {
  if (!audio) return;

  audio.pause();
  audio.currentTime = startTime;
  audio.volume = 0;

  audio.play().catch(() => {});

  const steps = 40;
  const stepTime = duration / steps;
  let currentStep = 0;

  const fade = setInterval(() => {
    currentStep++;
    audio.volume = (currentStep / steps) * targetVolume;

    if (currentStep >= steps) {
      audio.volume = targetVolume;
      clearInterval(fade);
    }
  }, stepTime);
}


function advanceRound() {
  if (currentRound === 'intro') {
    renderTimeline();
    setTimeout(() => beginQ3Round(), 5100);
    return;
  }

  if (currentRound === 'q3') {
    renderTimeline({ includeQ3: true });
    setTimeout(() => showPhaseTwoThenQ5(), 5100);
    return;
  }

  if (currentRound === 'q5') {
    renderTimeline({ includeQ3: true, includeQ5: true, triggerSpicy: true });
    return;
  }

  if (currentRound === 'q6') {
    currentRound = 'q7';
    setQuestionByIds(['q7']);
    return;
  }

  if (currentRound === 'q7') {
    renderTimeline({ includeQ3: true, includeQ5: true, includePortfolio: true, includeLucky: true, portfolioStage: 'food', autoNextRound: 'q8' });
    return;
  }

  if (currentRound === 'q8') {
  renderTimeline({
    includeQ3: true,
    includeQ5: true,
    includeQ8: true,
    includePortfolio: true,
    includeLucky: true,
    portfolioStage: 'tharak',
    autoNextRound: 'q9'
  });

  setTimeout(() => {
  fadeInMusic(bgMusic, {
    startTime: 31,
    targetVolume: 0.5,
    duration: 3000
  });
}, 4000);


  return;
  }

  if (currentRound === 'q9') {
    renderTimeline({ includeQ3: true, includeQ5: true, includeQ8: true, includeQ9: true, includePortfolio: true, includeLucky: true, portfolioStage: 'love' });
  }
}

function lockAnswer() {
  if (answeredCurrent) return;
  const question = currentQuestionSet[currentQuestionIndex];

  if (question.type === 'text') {
    const value = textAnswer.value.trim();
    if (!value) {
      feedbackEl.textContent = 'Type your answer first, then proceed 💜';
      return;
    }

    answeredCurrent = true;
    chosenAnswers[question.id] = value;
    lockBtn.classList.add('hidden');
    feedbackEl.textContent = 'You got it right cutieee ;)';
    setTimeout(() => advanceRound(), 700);
    return;
  }

  if (selectedIndex === null) {
    feedbackEl.textContent = 'Pick an option first, then lock it 💜';
    return;
  }

  answeredCurrent = true;
  const optionButtons = [...document.querySelectorAll('.option-btn')];

  optionButtons.forEach((button, idx) => {
    button.classList.remove('selected');
    if (idx === question.correctIndex) button.classList.add('correct');
    else if (idx === selectedIndex) button.classList.add('wrong');
    button.disabled = true;
  });

  lockBtn.classList.add('hidden');

  if (question.id === 'q6' && selectedIndex === 3) {
    feedbackEl.textContent = 'Haha. You think so? Duh.';
    retryBtn.classList.remove('hidden');
    return;
  }

  if (selectedIndex === question.correctIndex) {
    chosenAnswers[question.id] = question.options[question.correctIndex];
    feedbackEl.textContent = 'You got it right cutieee ;)';
    nextBtn.classList.remove('hidden');
    return;
  }

  feedbackEl.textContent = 'Cute try DUH. You are such a dumbo.';
  retryBtn.classList.remove('hidden');
}

function revealCards(cards) {
  cards.forEach((card, index) => setTimeout(() => card.classList.add('show'), 320 * index + 120));
}

function renderTimeline({
  includeQ3 = false,
  includeQ5 = false,
  includeQ8 = false,
  includeQ9 = false,
  includePortfolio = false,
  includeLucky = false,
  portfolioStage = null,
  autoNextRound = null,
  waitAfterInfoMs = 4000,
  triggerSpicy = false
} = {}) {
  timelineMemoryAnswer.innerHTML = `<strong>${chosenAnswers.q1 || ''}</strong><br /><span>${chosenAnswers.q2 || ''}</span>`;

  timelineQ3.classList.toggle('hidden', !includeQ3);
  timelineQ5.classList.toggle('hidden', !includeQ5);
  timelineQ8.classList.toggle('hidden', !includeQ8);
  timelineQ9.classList.toggle('hidden', !includeQ9);

  if (includeQ3) timelineQ3Answer.textContent = chosenAnswers.q3 || '';
  if (includeQ5) timelineQ5Answer.textContent = chosenAnswers.q5 || '';
  if (includeQ8) timelineQ8Answer.textContent = chosenAnswers.q8 || '';
  if (includeQ9) timelineQ9Answer.textContent = chosenAnswers.q9 || '';

  document.body.classList.remove('quiz-mode');
  showPanel(timelineSection);

  const cardsToReveal = [timelineMemory];
  if (includeQ3) cardsToReveal.push(timelineQ3);
  if (includeQ5) cardsToReveal.push(timelineQ5);
  if (includeQ8) cardsToReveal.push(timelineQ8);
  if (includeQ9) cardsToReveal.push(timelineQ9);

  cardsToReveal.forEach((card) => card.classList.remove('show'));
  revealCards(cardsToReveal);

  const totalCards = cardsToReveal.length;
  const timelineCompleteDelay = 120 + (totalCards - 1) * 320 + 700;

  let infoReadyAt = timelineCompleteDelay;

  if (includePortfolio || includeLucky) {
    hidePortfolioCard();

    if (includePortfolio) {
      setTimeout(() => {
        portfolioCard.classList.remove('hidden');
        portfolioCard.classList.add('show');
        setTimeout(() => {
          if (portfolioStage) {
            applyPortfolioStage({
              foodEl: timelineLoverText,
              extraEl: timelineLoverExtra,
              colorEl: timelineLoverColor,
              loveEl: timelineLoverLove,
              foodText: 'Fav food: Pani Puri',
              colorHtml: 'Fav color: white'
            }, portfolioStage);
          }
        }, 420);
      }, timelineCompleteDelay);
    }

    if (includeLucky) {
      setTimeout(() => {
        luckyCard.classList.remove('hidden');
        luckyCard.classList.add('show');
        setTimeout(() => {
          if (portfolioStage) {
            applyPortfolioStage({
              foodEl: timelineLuckyText,
              extraEl: timelineLuckyExtra,
              colorEl: timelineLuckyColor,
              loveEl: timelineLuckyLove,
              foodText: `Fav food: ${chosenAnswers.q7 || ''}`,
              colorHtml: 'Fav color: <span class="lavender-word">lavendar</span>'
            }, portfolioStage);
          }
        }, 420);
      }, timelineCompleteDelay + 220);
    }

    infoReadyAt = timelineCompleteDelay + 2000;
  }

  if (triggerSpicy) {
    setTimeout(() => runSpicySequenceThenQ6(), 4700);
  }

  if (autoNextRound) {
    setTimeout(() => {
      currentRound = autoNextRound;
      document.body.classList.add('quiz-mode');
      showPanel(quizSection);
      setQuestionByIds([autoNextRound]);
    }, infoReadyAt + waitAfterInfoMs);
  }

  if (includeQ9 && includePortfolio && includeLucky) {
    setTimeout(() => {
      surpriseWrap.classList.remove('hidden');
      surpriseWrap.classList.add('show');
      surpriseWrap.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, timelineCompleteDelay + 2600);
  }
}

function beginQ3Round() {
  currentRound = 'q3';
  document.body.classList.add('quiz-mode');
  showPanel(quizSection);
  setQuestionByIds(['q3']);
}

function retryCurrentQuestion() {
  renderQuestion();
}

function runFinaleCenterAnimation() {
  surpriseBtn.disabled = true;
  timelineSection.classList.add('timeline-fading');

  setTimeout(() => {
    portfolioCard.classList.remove('hidden');
    luckyCard.classList.remove('hidden');
    portfolioCard.classList.add('center-stage', 'center-left');
    luckyCard.classList.add('center-stage', 'center-right');

    setTimeout(() => {
      portfolioCard.classList.add('center-open');
      luckyCard.classList.add('center-open');
      finaleHeart.classList.remove('hidden');
      finaleHeart.classList.add('show');

      setTimeout(() => {
        portfolioCard.classList.add('finale-hide-content');
        luckyCard.classList.add('finale-hide-content');
        loverNameOverlay.textContent = 'Siddharth';
        luckyNameOverlay.textContent = 'Saanvi';
        loverNameOverlay.classList.add('show');
        luckyNameOverlay.classList.add('show');

        setTimeout(() => {
          finalQuestionModal.classList.remove('hidden');
          finalQuestionModal.classList.add('show');
        }, 5000);
      }, 3000);
    }, 1000);
  }, 520);
}

nextBtn.addEventListener('click', () => {
  if (currentQuestionIndex < currentQuestionSet.length - 1) {
    currentQuestionIndex += 1;
    renderQuestion();
    return;
  }
  advanceRound();
});

landingNoBtn.addEventListener('click', handleLandingNo);
landingYesBtn.addEventListener('click', startQuiz);
lockBtn.addEventListener('click', lockAnswer);
retryBtn.addEventListener('click', retryCurrentQuestion);
surpriseBtn.addEventListener('click', runFinaleCenterAnimation);
finalRevealBtn.addEventListener('click', runFinalQuestionReveal);
