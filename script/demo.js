function setSize() {
	var tempHeight = (($(document).height() - $('#boxSimon').width() - 50) /2);
	if(tempHeight < 0) tempHeight = 0;
	$('#boxSimon').css({'marginTop': tempHeight + 'px'})
	$('.itemSimon').height($('.itemSimon').width());
	$('.itemSimon span').height($('.itemSimon').width());
	$('#setPanel').css({'top': ($('.itemSimon').height()) - 10 - ($('#setPanel').height()/2), 'left': ($('.itemSimon').width()) - ($('#setPanel').width()/2)});
}
function init() {
	$('#onOff').addClass('bgRed');
	$('#start').addClass('bgGray');
	$('#strict').addClass('bgGray');
	clear();
}
$(window).on('resize', setSize);
$(document).ready(function() {
	init();
	setSize();
});

var onOffLicz = false;
var startLicz = false;
var strictLicz = false;
var maxStep = 20;
var arrayColor = ['green', 'red', 'blue', 'yellow'];
var series, currentCount, tempStep, temp2Step, canClick, timerRepeat;	
var simonSound1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var simonSound2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var simonSound3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var simonSound4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
var arraySound = [simonSound1, simonSound2, simonSound3, simonSound4];

$('#onOff').on('click', function() {
	if(!onOffLicz) {
		onOffLicz = true;
		$(this).removeClass('bgRed');
		$(this).addClass('bgGreen');
		$('.display').text('--');
	} else {
		onOffLicz = false;
		$(this).removeClass('bgGreen');
		$(this).addClass('bgRed');
		$('.display').html('&nbsp;&nbsp;');
		$('#start').removeClass('bgGreen');
		$('#start').addClass('bgGray');
		$('#strict').removeClass('bgGreen');
		$('#strict').addClass('bgGray');
		strictLicz = false;
		clear();
	}	
});

$('#start').on('click', function() {
	if(onOffLicz) {
		clearTimeout(timerRepeat);
		clear();
		$('.display').text(currentCount);
		$(this).removeClass('bgGray');
		$(this).addClass('bgGreen');			
		randSeries();
		play();
	} 
});

$('#strict').on('click', function() {
	if(onOffLicz) {
		if(!strictLicz) {
			strictLicz = true;
			$(this).removeClass('bgGray');
			$(this).addClass('bgGreen');
		} else {
			strictLicz = false;
			$(this).removeClass('bgGreen');
			$(this).addClass('bgGray');
		}
	}
});

function randSeries() {
	for(var i = 0; i < maxStep; i++) {
		series.push(Math.floor(Math.random() * 4));
	}
}
function displaySeries() {
	canClick = false;
	// console.log('series', series);
	// console.log('temp', temp2Step);
	animateItem(temp2Step);
	var index = $.inArray(arrayColor[series[temp2Step]], arrayColor);
	if(arraySound[index])
		arraySound[index].play();	
	setTimeout(function() {
		if(temp2Step < (currentCount-1)) {
			temp2Step++;
			displaySeries();
		} else {
			canClick = true;
			timerRepeat = setTimeout(function(){
				play();
			}, 4000);
		}
	}, 1500);

}
function animateItem(currentColor) {
	$('#' + arrayColor[series[currentColor]] + ' span').animate({
		'opacity': '.7'
	}, 700).animate({
		'opacity': '1'
	}, 700);
}
function play() {
	if(currentCount <= maxStep) {
		tempStep = 0;
		temp2Step = 0;
		displaySeries();	
	} else {
		console.log('win');
		$('.display').text('WIN');
		setTimeout(function() {
			clear();
			$('#start').click();
		}, 3000);
	}
}
$('.itemSimon').on('mousedown', function() {	
	clearTimeout(timerRepeat);
	if(canClick) {
		var index = $.inArray($(this).attr('id'), arrayColor);
		arraySound[index].play();		
		$(this).find('span').animate({
			'opacity': '.7'
		}, 300);
	}	
});
$('.itemSimon').on('mouseup', function() {
	if(canClick) {
		$(this).find('span').animate({
			'opacity': '1'
		}, 300);
		var temp = $(this).attr('id');
		setTimeout(function() {
			if(checkAll(temp)) {
				if(tempStep == currentCount) {
					//console.log('ok. next');
					currentCount++;
					$('.display').text(currentCount);
					setTimeout(play, 1000);
				}
			} else {
				//console.log('one more time');
				$('.display').text('!!');
				clearTimeout(timerRepeat);
				if(strictLicz) {
					clear();
					setTimeout(function() {
						$('#start').click();
					}, 2000);
				} else {
					setTimeout(function() {
					play();
					$('.display').text(currentCount);
					}, 2000);
				}		
			}
		}, 500);
	}
});
function checkAll(check2) {
	if(checkSeries(tempStep, check2)) {
		tempStep++;
		return true;
	} else {
		return false;
	}
}
function checkSeries(check1, check2) {
	// console.log('temp step ' + tempStep);
	// console.log('computer :' + arrayColor[series[check1]]);
	// console.log('player :' + check2);
	return (arrayColor[series[check1]] == check2);
}
function clear() {
	clearTimeout(timerRepeat);
	series = [];
	currentCount = 1;
	tempStep = 0;
	temp2Step = 0;	
	canClick = false;
	clearTimeout(timerRepeat);
}