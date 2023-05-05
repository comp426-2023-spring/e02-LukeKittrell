// If you would like to see some examples of similar code to make an interface interact with an API, 
// check out the coin-server example from a previous COMP 426 semester.
// https://github.com/jdmar3/coinserver

// This function shows and hides the shot selection in the interface based 
// on whether or not the #opponent checkbox is checked

var formShow = true;
var resultShow = false;


function showHideShots() {
// Get the info from the checkbox
  	let check = document.getElementById('opponent');
	let game = $('input[type=radio][name=game]:checked').val();
// Check if the checkbox is checked and show or hide options accordingly
	if (check.checked == true) {
		$('.shots').show()
		if (game == 'rps'){
			$('.rpsls').hide()
		}
	} else {
		$('.shots').hide()
	}
}
// This function clears the input form and also resets the shot selection
// radio buttons. 
function startOver () {
	document.getElementById('userinput').reset();
	showHideShots();
}

async function playGame () {
	// Get which game is being played based on the value in the form
	let game = $('input[type=radio][name=game]:checked').val();
	// Identify the base URL based on browser information
	let baseurl = window.location.href + 'app/'
	console.log(baseurl)
	// This constructs a URL for the opponent option ONLY. To incorporate
	// the other option, you can use a conditional to change the URL based
	// on what is selected. You could also write separate functions, or use
	// a conditional somewhere above in this function to construct the 
	// correct URL
	let url = baseurl + game + '/play/' + shot
	console.log(url)	

	let checkbox = document.getElementById('opponent');
	if(checkbox.checked){
		let shot = $('input[type=radio][name=shot]:checked').val();
		url = url + shot
	}

	let response = await fetch(url)
	let result = await response.json()
	console.log(result)

	if (result.opponent) {
		$('#opponentImg').attr('src', 'img/' + result.opponent + '.jpg');
		$('.opponentResult').show();
	}
	$('#playImg').attr('src', 'img/' + result.player + '.jpg');
	if ( result.result){
		let game_result = document.getElementById('gameResult');
		gameResult.innerHTML = result.result.toUpperCase();
		$('#gameResult').show();
	}
}

function showRules() {
	$('.game').hide();
	$('.rulesPg').show();
}

function hideRules() {
	$('.game').show();
	$('.rulesPg').hide();
}

function formToggle() {
	if (formShow){
		$('#userinput').hide();
		formShow = false;
	}else{
		$('userinput').show();
		$('#play').show();
		$('#startover').show();
		$('#showRules').show();
		formShow = true;
	}
}

function resultsToggle() {
	if (resultShow) {
		$('#results') .hide();
		$('#opponentImg').attr('src', 'img/rock.jpg);
		$('#opponentImg').attr('alt', 'ROCK');
		$('.opponentResult').hide();
		$('#playerImg').attr('src', 'img/rock.jpg');
		$('#playerImg').attr('alt', 'ROCK');
		let gameResult = document.getElementById('gameResult');
		gameResult.innerHTML = "";
		$('gameResult').hide();
		resultShow = false;
	}else {
		$('#results').show();
		resultsShow = true;
	}
}
