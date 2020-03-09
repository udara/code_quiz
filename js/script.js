var allocatedTimeForQuiz = 5000;
var score = 0; 
const oneSecond = 1000;
var count_down = document.querySelector('#count_down');
var btn_start = document.querySelector('#btn_start');
var start_ui = document.querySelector('#start_ui');
var quiz_game_ui = document.querySelector('#quiz_game_ui');

var quetions = [
    {
        question: 'To prevent any method from overriding, we declare the method as',
        choices: ['static','const','final', 'abstract'],
        answer: 'final'
    },
    {
        question: 'The fields in an interface are implicitly specified as',
        choices: ['static only','protected','private', 'both static and final'],
        answer: 'both static and final'
    },
    {
        question: 'Which of the following variable declaration would NOT compile in a java program?',
        choices: ['int var;','int VAR;','int var1;', 'int 1_var;'],
        answer: 'int 1_var;'
    },
    {
        question: 'A constructor',
        choices: ['Must have the same name as the class it is declared within.','Is used to create objects.','May be declared private', '(a), (b) and (c) above.choice 4'],
        answer: '(a), (b) and (c) above.'
    },
    {
        question: 'Java Multiple Choice Questions 32) In java, objects are passed as',
        choices: ['Copy of that object','Method called call by value','Memory address', 'Constructor'],
        answer: 'Memory address'
    }
]

function displayQuestion(quection_number){
    console.log(quetions[quection_number].question);
}

function isAnswerCorrect(question_number,user_answer){
    return quetions[question_number].answer === user_answer;
}

function scorePoints(){
    return score++;
}

function applyTimePenelty(){
    const timePenelty = oneSecond * 5;
    return allocatedTimeForQuiz - timePenelty; 
}

function Timeleft(){
    return allocatedTimeForQuiz = (allocatedTimeForQuiz - oneSecond);
}

function countDown(){
    let gameTimer = setInterval(function(){   
        allocatedTimeForQuiz <= 0 ? clearInterval(gameTimer) : count_down.innerHTML=Timeleft();
    },oneSecond);
}

function startGame()
{
    start_ui.style.display = "none";
    quiz_game_ui.style.display = "block";
    countDown();
}

//countDown();

//console.log(isAnswerCorrect(2,'int 1_var;'));

btn_start.addEventListener("click", function(){
    startGame();
});