// Initialize counts
let correctCount = 0;
let incorrectCount = 0;

// Initialize question count
let questionCount = 0;
const totalQuestions = 10;

// Update counts in the page
document.getElementById('correct-count').innerText = correctCount;
document.getElementById('incorrect-count').innerText = incorrectCount;

// Update current question number
document.getElementById('current-question-number').innerText = questionCount;

// Functions to show/hide screens
function showHome() {
    document.getElementById('home').classList.remove('hidden');
    document.getElementById('quiz').classList.add('hidden');
    document.getElementById('feedback').classList.add('hidden');
}

function showQuiz() {
    document.getElementById('home').classList.add('hidden');
    document.getElementById('quiz').classList.remove('hidden');
    document.getElementById('feedback').classList.add('hidden');
}

function showFeedback() {
    document.getElementById('home').classList.add('hidden');
    document.getElementById('quiz').classList.add('hidden');
    document.getElementById('feedback').classList.remove('hidden');

    // Update final score
    document.getElementById('final-score').innerText = `You got ${correctCount} out of ${totalQuestions} correct!`;
}

// Event listener for 'Start Quiz' button
document.getElementById('start-quiz-btn').addEventListener('click', function() {
    // Get selected difficulty from home page
    const selectedOption = document.querySelector('input[name="difficulty"]:checked');
    if (selectedOption) {
        let difficulty = selectedOption.value;

        // Set the same difficulty in the quiz section
        document.querySelector(`input[name="quiz-difficulty"][value="${difficulty}"]`).checked = true;

        // Reset counts and start quiz
        questionCount = 0;
        correctCount = 0;
        incorrectCount = 0;
        document.getElementById('correct-count').innerText = correctCount;
        document.getElementById('incorrect-count').innerText = incorrectCount;
        fetchQuestion();
        showQuiz();
    } else {
        alert('Please select a difficulty level.');
    }
});

// Fetch question from API
function fetchQuestion() {
    // Get selected difficulty from quiz section
    const selectedOption = document.querySelector('input[name="quiz-difficulty"]:checked');
    let difficulty = 'Easy'; 
    if (selectedOption) {
        difficulty = selectedOption.value;
    }
    const API_KEY = 'GUhVmZbRReZgXp2JTNZly8QapTzQWprofH5AmA7Z'; 
    const apiUrl = `https://quizapi.io/api/v1/questions?apiKey=${API_KEY}&limit=1&difficulty=${difficulty}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                displayQuestion(data[0]);
            } else {
                alert('No questions available.');
                showHome();
            }
        })
        .catch(error => {
            console.error('Error fetching the question:', error);
        });
}

// Display the question and answers
function displayQuestion(question) {
    // Update the current question number
    document.getElementById('current-question-number').innerText = questionCount + 1;

    // Display the question text
    document.getElementById('question-container').innerHTML = `<h2>${question.question}</h2>`;

    // Clear previous answers
    const answersList = document.getElementById('answers-list');
    answersList.innerHTML = '';

    // Clear result message
    document.getElementById('result-message').innerText = '';

    // Hide 'Next Question' button
    document.getElementById('next-question').style.display = 'none';

    // Get the answers and correct answers
    const answers = question.answers;
    const correctAnswers = question.correct_answers;

    const answerKeys = ['answer_a', 'answer_b', 'answer_c', 'answer_d', 'answer_e', 'answer_f'];

    answerKeys.forEach(key => {
        if (answers[key] && answers[key] !== null) {
          
            const li = document.createElement('li');
            const button = document.createElement('button');
            button.innerText = answers[key];
            button.classList.add('answer-btn');

         
            const isCorrect = correctAnswers[`${key}_correct`] === 'true';

         
            button.setAttribute('data-correct', isCorrect);

         
            button.addEventListener('click', handleAnswer);

            li.appendChild(button);
            answersList.appendChild(li);
        }
    });
}


function handleAnswer(event) {
    const isCorrect = event.target.getAttribute('data-correct') === 'true';

    if (isCorrect) {
        correctCount++;
        document.getElementById('result-message').innerText = 'Correct!';
    } else {
        incorrectCount++;
        document.getElementById('result-message').innerText = 'Incorrect.';
    }

    // Update counts in the page
    document.getElementById('correct-count').innerText = correctCount;
    document.getElementById('incorrect-count').innerText = incorrectCount;

    // Disable all answer buttons
    const answerButtons = document.querySelectorAll('.answer-btn');
    answerButtons.forEach(button => {
        button.disabled = true;
    });

    // Show 'Next Question' button
    document.getElementById('next-question').style.display = 'inline-block';

    // Increment question count
    questionCount++;

    // If reached total questions, change 'Next Question' button to 'View Results'
    if (questionCount >= totalQuestions) {
        document.getElementById('next-question').innerText = 'View Results';
    } else {
        document.getElementById('next-question').innerText = 'Next Question';
    }
}

// Add event listener to 'Next Question' button
document.getElementById('next-question').addEventListener('click', function() {
    if (questionCount < totalQuestions) {
       
        fetchQuestion();
    } else {
        
        showFeedback();
    }
});

// Add event listener to 'Reset Stats' button
document.getElementById('reset-stats').addEventListener('click', function() {
    correctCount = 0;
    incorrectCount = 0;
    document.getElementById('correct-count').innerText = correctCount;
    document.getElementById('incorrect-count').innerText = incorrectCount;
});

// Start Again function
function startAgain() {
    correctCount = 0;
    incorrectCount = 0;
    questionCount = 0;
    document.getElementById('correct-count').innerText = correctCount;
    document.getElementById('incorrect-count').innerText = incorrectCount;
    showHome();
}
