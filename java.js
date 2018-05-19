//You'll create a trivia form with multiple choice or true/false options (your choice).
//The player will have a limited amount of time to finish the quiz.
//The game ends when the time runs out. The page will reveal the number of questions that players answer correctly and incorrectly.
//Don't let the player pick more than one answer per question.
//Don't forget to include a countdown timer.


// Create global variable to hold Countdown Timer

// Create an object or multiple arrays of trivia question and generate a random question by randomizing index.. Use quiz questions or javascript questions

// Create either booleans and true or false answers and create atleast one multiple choice answer


// Questions and Answers  Which does not belong. Strings Booleans Numbers Use if, else if else, prompt alerts.

var triviaQuestions = [{
	question: "What word does not belong?",
	answerList: ["string", "boolean", "number", "modius"],
	answer: 3
},{
	question: "Inside which HTML element do we put the JavaScript?",
	answerList: ["script", "link", "js", "javascript"],
	answer: 0
},{
	question: "What is the correct syntax for referring to an external script called xxx.js?",
	answerList: ["script src=xxx.js", "script href=xxx.js", "link src=xxx.js", "linkhref=xxx.js"],
	answer: 0
},{
	question: "The external JavaScript file must contain the script tag.",
	answerList: ["True", "False","both","neither"],
	answer: 1
},{
	question: " How to write an IF statement in JavaScript?",
	answerList: ["if i = 5 then", "if i==5", "if i===5 then", "if (i==5)"],
	answer: 3
},{
	question: "How does a FOR loop start?",
	answerList: ["for (i = 0; i <= 5; i++)", "for i=0; i <= 5;", "for i = 1 to 5", "for i=1 loop to 5"],
	answer: 0
},{
	question: "How can you add a comment in a JavaScript?",
	answerList: ["<!--comment", "//comment", "!!comment", "</!commment"],
	answer: 1
},{
	question: "How to insert a comment in javascript that has more than one line?",
	answerList: ["<!--comment", "//comment", "/* comment */", "<// comment"],
	answer: 2
},{
	question: "What do you wrap an array in ?",
	answerList: ["()", "[]", "{}", "{()}"],
	answer: 1
},{
	question: "How do you round the number 7.25, to the nearest integer?",
	answerList: ["round.Math", "Math.Round", "math.round", "Math.round"],
	answer: 3
},{
	question: "How do you find the number with the highest value of x and y?",
	answerList: ["Math.max(x,y)", "Math.greatest(x,y)", "Math.ceil(x,y)", "Math.floor(x,y)"],
	answer: 0
},{
	question: "JavaScript is the same as Java?",
	answerList: ["False", "True","both","neither"],
	answer: 0
},{
	question: "Which event occurs when the user clicks on an HTML element??",
	answerList: ["mouseunder", "hoverover", "mouseover", "onclick"],
	answer: 3
},{
	question: "How do you declare a JavaScript variable?",
	answerList: ["var nameHere", "variable; nameHere", "var; nameHere", "variablenameHere;"],
	answer: 0
},{
	question: " Which operator is used to assign a value to a variable?",
	answerList: ["+", "!=", "=", "/="],
	answer: 2
}];

//var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; 
var correctAnswer; 
var incorrectAnswer; 
var unanswered; 
var seconds; 
var time; 
var answered; 
var userSelect;
var messages = {
	correct: "Genius!!!!",
	incorrect: "Not Quite, study more! Porn Less!",
	endTime: "Times Up",
	finished: "Alright! Let's see how dumb you are"
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}
function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}


function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	//$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}





function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	// $('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	//$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}