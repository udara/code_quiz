var allocatedTimeForQuiz = 60000;
var score = 0; 
const oneSecond = 1000;
var count_down = document.querySelector('#count_down');
var btn_start = document.querySelector('#btn_start');
var start_ui = document.querySelector('#start_ui');
var quiz_game_ui = document.querySelector('#quiz_game_ui');
var get_user_details_ui = document.querySelector('#get_user_details_ui');
var show_result = document.querySelector('#show_result');
var multiple_choice_questions = document.querySelectorAll(".choice");
var current_question = 0;

var quetions_array = [
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
        answer: '(a), (b) and (c) above.choice 4'
    },
    {
        question: 'Java Multiple Choice Questions 32) In java, objects are passed as',
        choices: ['Copy of that object','Method called call by value','Memory address', 'Constructor'],
        answer: 'Memory address'
    }
]

function getUserDetails()
{
    clearInterval(gameTimer);
    count_down.innerHTML = '0';
    quiz_game_ui.style.display = "none";
    get_user_details_ui.style.display = "block";
    
}

function processAnswer(answer)
{
    if(isAnswerCorrect(current_question,answer)){
        scorePoints();
        showResult("Correct");
        if(isQuestionsOver()){
            getUserDetails();
        }
        else {
            displayQuestion(++current_question);   
        }
    }
    else{
        applyTimePenelty();
        showResult("Wrong");
    }
}

function displayQuestion(question_number){
    let question = document.querySelector('#question');
    let multiple_questions = document.querySelector('#multiple_questions');
    question.innerHTML = quetions_array[question_number].question; 
    multiple_questions.innerHTML = "";
    for (let i = 0; i < quetions_array[question_number].choices.length; i++) {
         multiple_questions.innerHTML += '<li class="choice" onclick="processAnswer(this.innerHTML)">'+quetions_array[question_number].choices[i]+'</li>';
     }
}

function isAnswerCorrect(question_number,user_answer){
    return quetions_array[question_number].answer === user_answer;
}

function isQuestionsOver(){
   return  current_question >= quetions_array.length - 1;
}

function scorePoints(){
    return ++score;
}

function applyTimePenelty(){
    const timePenelty = oneSecond * 5;
    return allocatedTimeForQuiz = allocatedTimeForQuiz - timePenelty; 
}

function Timeleft(){
    return allocatedTimeForQuiz = (allocatedTimeForQuiz - oneSecond);
}

function countDown(){
    gameTimer = setInterval(function(){   
        allocatedTimeForQuiz <= 0 ? getUserDetails() : count_down.innerHTML=Timeleft()/1000;
    },oneSecond);
}

function showResult(result)
{
    show_result.innerHTML = result;
    setTimeout(function(){   
    show_result.innerHTML = "";
    },oneSecond);
}

btn_start.addEventListener("click", function(){
    start_ui.style.display = "none";
    quiz_game_ui.style.display = "block";
    countDown();
    displayQuestion(current_question);
});