const oneSecond = 1000;
const gametime = 60000;
var allocatedTimeForQuiz = gametime;
var score = 0;
var current_question = 0;
// User interface elements
var count_down = document.querySelector('#count_down');
var btn_start = document.querySelector('#btn_start');
var start_ui = document.querySelector('#start_ui');
var quiz_game_ui = document.querySelector('#quiz_game_ui');
var get_user_details_ui = document.querySelector('#get_user_details_ui');
var show_result = document.querySelector('#show_result');
var btn_get_user_details = document.querySelector('#btn_get_user_details');
var user_initials = document.querySelector('#user_initials');
var display_user_score = document.querySelector('#display_user_score');
var display_high_scores_ui = document.querySelector('#display_high_scores_ui');
var top_five_high_scores = document.querySelector('#top_five_high_scores');
var btn_go_back = document.querySelector('#btn_go_back');
var btn_view_high_scores = document.querySelector('#btn_view_high_scores');
var top_link_view_high_score = document.querySelector('#top_link_view_high_score');

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
];

function save_score_to_local_storage(initials,score)
{
    if (localStorage.getItem('high_scores')){
       var  high_score_array =  JSON.parse(localStorage.getItem('high_scores'));
    }
    else{
        var  high_score_array = [];
    }
    var score  = {
        'initials': initials,
        'score': score
    }
    high_score_array.push(score);
    high_score_array.sort(function(a, b){return b.score - a.score});
    let top_five_scores = high_score_array.slice(0,5);
    localStorage.setItem('high_scores', JSON.stringify(top_five_scores));
}

function clearStorage()
{
    localStorage.removeItem('high_scores');
    top_five_high_scores.innerHTML = '';
}

function display_high_scores_stored_in_local_storage()
{
    let high_score_array = JSON.parse(localStorage.getItem('high_scores'));
    let high_score_list = "<UL>";

    high_score_array.sort(function(a, b){return b.score - a.score});
    console.log(high_score_array.length);
    high_score_array.forEach(high_score => {
        high_score_list += '<LI class="list">'+high_score.initials+' - '+high_score.score+'</LI>';
    });

    high_score_list += '<UL>';
    top_five_high_scores.innerHTML = high_score_list;
}

function getUserDetails()
{
    clearInterval(gameTimer);
    count_down.innerHTML = '0';
    quiz_game_ui.style.display = "none";
    get_user_details_ui.style.display = "block"; 
    display_user_score.innerHTML = 'Your score is '+score; 
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

function displayQuestion(question_number)
{
    let question = document.querySelector('#question');
    let multiple_questions = document.querySelector('#multiple_questions');
    question.innerHTML = quetions_array[question_number].question; 
    multiple_questions.innerHTML = "";
    for (let i = 0; i < quetions_array[question_number].choices.length; i++) {
         multiple_questions.innerHTML += '<li class="list" onclick="processAnswer(this.innerHTML)">'+quetions_array[question_number].choices[i]+'</li>';
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

function resetGame()
{
    score = 0;
    current_question = 0;
    allocatedTimeForQuiz = gametime;
}

btn_start.addEventListener("click", function(){
    start_ui.style.display = "none";
    quiz_game_ui.style.display = "block";
    countDown();
    displayQuestion(current_question);
});

btn_get_user_details.addEventListener("click", function(){
    save_score_to_local_storage(user_initials.value,score);
    get_user_details_ui.style.display = "none";
    display_high_scores_ui.style.display = "block";
    display_high_scores_stored_in_local_storage();
});

btn_go_back.addEventListener("click", function(){
    display_high_scores_ui.style.display = "none";
    start_ui.style.display = "block";
    resetGame();
});

btn_clear_high_scores.addEventListener("click", function(){
    clearStorage();
});

top_link_view_high_score.addEventListener("click", function(){
    start_ui.style.display = "none";
    quiz_game_ui.style.display = "none";
    get_user_details_ui.style.display = "none";
    display_high_scores_ui.style.display = "block";
    clearInterval(gameTimer);
    count_down.innerHTML = '0';
    resetGame();
    display_high_scores_stored_in_local_storage();
});

