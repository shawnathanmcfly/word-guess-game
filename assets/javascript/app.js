/*************************************
 * 
 *  Game question data
 * 
 ************************************/

class Question {
    
    constructor(){
        this.data = [ //correct answers are marked with an star

            ["What is the code to activate the ability to submerge your submarine?", "474", "*747", "666", "777"],
            ["What is the name of the protagonists submarine?", "Big Dipper", "Sub-See", "Sink-D", "*Sub-C"],
            ["What weapon does the protagonist obtain after the Island Yo-yo?", "*Morning Star", "Super Nova", "Torch", "Laser Gun"],
    
        ];
        this.trackz = [ document.getElementById("wrong"), 
                        document.getElementById("correct"), 
                        document.getElementById("start") 
        ];

        this.checkedQ = [];
        this.numberC = 0;
        this.correctAnswer;
        this.qNum = 0;
        this.curTime;
        this.populatePage();
        this.getNewQ();
        this.timer;

    }

    playSound( sound ){
        this.trackz[ sound ].play();
        this.trackz[ sound ].currentTime = 0;
    }

    stopSound( sound ){
        this.trackz[ sound ].pause();
    }

    decreaseTime(){

        if( --this.curTime === 0 ){
            $("#timer").html('Out Of Time<br>Answer<br><br>' + this.correctAnswer ).css( 'font-size', '40px');
            this.stopTimer();
            this.playSound( 0 );
            this.waitNext();
        }else
            $("#timer").html( "TIME<br>" + this.curTime );
            
    }

    startTimer( ){
        this.curTime = 20;
        this.timer = setInterval(this.decreaseTime.bind(this), 1000 );
    }

    stopTimer(){
        clearInterval(this.timer);
    }

    //returns an array with question data.
    //if question was already answered, returns 0
    randomQ(){
        
        let r = Math.floor( Math.random() * this.data.length );
        let q = this.checkedQ.includes( r );

        if( q === false ){

            this.checkedQ.push( r );
            return( this.data[ r ] );
            
        }else
            return 0;
    }

    hideGameStuff(){

        $("#questionNum").hide();
        $("#curQuestion").hide();
        $("#qList").hide();
        $("#timer").hide();

    }

    showGameStuff(){

        $("#questionNum").show();
        $("#curQuestion").show();
        $("#qList").show();
        $("#timer").show();

    }

    resetGame(){

        $("#startButton").remove();
        $("#results").remove();
        this.stopSound( 2 );
        this.showGameStuff();
        this.checkedQ = [];
        this.numberC = 0;
        this.qNum = 0;
        this.getNewQ();
    }

    gameOver(){
        
        this.stopTimer();
        this.hideGameStuff();
        
        $("#gameSpace").append('<h1 id="results">Game Over<br><br>Number Correct:<br>' + this.numberC + '/' + this.qNum  + '</h1>').css({

            'font-size' : '50px',
            'color' : 'green',
            'text-align' : 'center',
            'font-family' : '"Black Han Sans", sans-serif',

        });
        
        $("#gameSpace").append('<div id="startButton">RESTART</div>');
        this.playSound( 2 );
        
    }

    //gets new question. If all questions were answered, returns 0
    getNewQ() {
        let newQ, corr;

        if( this.qNum === this.data.length ){
            this.gameOver();
            return;
        }else
            while( !(newQ = this.randomQ()) )
                ;

        this.startTimer();
        $("#timer").html("TIME<br>" + this.curTime ).css( 'font-size', '60px');
        $("#timer").html( "TIME<br>" + this.curTime );

        this.qNum++;

        $("#questionNum").html( "Question " + this.qNum );
        $("#curQuestion").html( newQ[0] );
        newQ.slice( 1, 5).forEach( function( v, i ){
            
            if( v.indexOf('*') != -1 ){
                v = v.replace('*', '');
                corr = v;
            }
            
            $('label[for=choice'+ i +']').html( v );
            $('#choice'+ i).prop( 'checked', false );
           
        });

        $("#qList").show();

        this.correctAnswer = corr;

        return newQ;
    }

    waitNext(){

        setTimeout( this.getNewQ.bind(this), 4000 );
    }

    populatePage(){

        $(".backGround").append('<div id="gameSpace"></div>');
        $("#gameSpace").append( '<h1 id="questionNum" class="qNum"></h1><hr>' );
        $("#gameSpace").append( '<h1 id="curQuestion" class="qNum"></h1>');
        $("#gameSpace").append( '<form id="qList"></form>' );

        for( let i = 0; i < 4; i++ ){
            $("#qList").append('<input id="choice' + i + '" type="radio" name="gameQuestions"></input>');
            $("#qList").append('<label for="choice' + i + '"></label><br>');
        }

        $("#gameSpace").append( '<div id="timer"></div>' );
    }
 }
 
 $(document).ready(function(){

    var currentGame = new Question();

    $("#gameSpace").on('click', '#startButton', function(){ 
        currentGame.resetGame();
    }).on( 'mouseover', '#startButton', function(){ $("#startButton").css('cursor', 'crosshair'); });

    $('input[type="radio"]').on( "click", function(){
    
        let $s = $("label[for='"+$(this).attr('id')+"']");

        if( $s.text() === currentGame.correctAnswer ){
            
            $("#timer").html('Correct!').css( 'font-size', '80px');
            currentGame.playSound(1);
            currentGame.numberC++;
            currentGame.stopTimer();
            currentGame.waitNext();
            $("#qList").hide();
            
        }else{

            $("#timer").html('Incorrect<br><br>' + currentGame.correctAnswer ).css( 'font-size', '40px');
            currentGame.stopTimer();
            currentGame.waitNext();
            currentGame.playSound(0);
            $("#qList").hide();
        }
     });
 });

 

 
 