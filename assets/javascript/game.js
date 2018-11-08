/*******************************
 * 
 *  IT'S HANGMAN HAHAHAHAH!!! WE'RE GUESSING WORDS 
 *  DESPITE A MAN IS BEING HANGED!!!!!!!!!!!!!!!!!
 * 
 *  Who needs css when you do it with the query bro hamm
 * 
 * *****************************/

$(document).ready( function(){
    var yay = document.getElementById("win");
    var won = 0;
    var diff = {

        easy : 4,
        med : 8,
        hard : 12
    }
    var skill = diff.easy;
    var curWord = 0;
    var blankWord = [];
    var tried = [];

    function randomWord(){

        let wordPick = 0;
        do{
            wordPick = words[ Math.floor(Math.random() * words.length ) ];
            
        }while( wordPick.length > skill );
        
        return ( wordPick );
    }

    function wordCheck( wordProc ){

        let temp = wordProc.join("");

        if( temp === curWord ){
            return true;
        }else{
            return false;
        }
    }

    function newGame(){
        
        curWord = randomWord();
        blankWord = [];
        tried = [];

        for( let i = 0; i < curWord.length; i++ ){
            blankWord.push('_');
        }


        $("#curWord").html( blankWord );
        $("title").html(curWord);
    }

    //set background image to fit screen
    $("html, body").css({
        
        'height' : '100%',
        'margin' : '0'

    });

    $("body").html('<div id="backDiv"></div>');

    $("#backDiv").css({

        'background-image' : 'url("./assets/images/back.jpg")',
        'background-repeat' : 'no-repeat',
        'background-size' : 'cover',
        'height' : '100%'

    });

    $("#backDiv").html('<div id="gameDiv"></div>');
    $("#gameDiv").css({

        'margin' : 'auto',
        'background-color' : 'black',
        'width' : '800px',
        'opacity' : '0.9',
        'height' : '100%',
        'color' : 'white',
        'padding' : '8px 8px 8px 8px'
    
    });

    $("#gameDiv").html('<div id="curWord"></div>');
    $("#curWord").css({

        'position' : 'relative',
        'float' : 'left',
        'background-color' : '#C6F2FF',
        'color' : 'black',
        'width' : '100%',
        'font-family' : '"Indie Flower", cursive',
        'font-size' : '40px',
        'text-align' : 'center',
        'fix' : 'clearfix',
        'padding-top' : '20px',
        'padding-bottom' : '20px',
        'opacity' : 'none'
    
    });

    $("#gameDiv").append('<p id="msg"></p>');
    $("#msg").css({

        'font-size' : '15px',
        'color' : 'red',
        'position' : 'absolute',
        'bottom' : '0px',
        'font-family' : '"Anton", sans-serif',
        'font-size' : '40px',
    });
    
    newGame();

    $(document).keypress( function ( event ){

        let letPick = String.fromCharCode( event.which );
        letPick = letPick.toLowerCase();
        
        if( letPick.charCodeAt(0) < 97 || letPick.charCodeAt(0) > 122 ){
            $("#msg").html("That's not a letter, twit");
            
        }else{
            
            let pos = 0;
            
            while( pos >= 0 ){

                pos = curWord.indexOf(letPick, pos );

                if( pos >= 0 ){
                    
                    blankWord.splice( pos, 1, letPick);
                    $("#curWord").html( blankWord );
                    pos++;
                }
            }

            tried.push( letPick );

            if( wordCheck(blankWord) ){
                $("#msg").html("You Win!!!!");
                yay.play();
                newGame();
            }else{
                $("#msg").html(tried);
            }

            
        }
        
    });

    

});