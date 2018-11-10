/*******************************
 * 
 *  IT'S HANGMAN HAHAHAHAH!!! WE'RE GUESSING WORDS 
 *  DESPITE A MAN IS BEING HANGED!!!!!!!!!!!!!!!!!
 * 
 *  Who needs css when you do it with the query bro hamm
 * 
 * *****************************/
var yay = document.getElementById("win");
    var chances = 10;
    var curWord = 0;
    var blankWord = [];
    var tried = [];
    var skill = 0;

    function randomWord(){

        let wordPick = 0;
        do{
            wordPick = words[ Math.floor(Math.random() * words.length ) ];    
        }while( wordPick.length > 8 );
        
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

    function newGame( ){ 
        
        curWord = randomWord();
        blankWord = [];
        tried = [];
        chances = 10;

        for( let i = 0; i < curWord.length; i++ ){
            blankWord.push('_');
        }

        document.getElementById("curWord").innerHTML = blankWord.join("");
        document.getElementById("chances").innerHTML = "Chances: " + chances;    
        document.title = curWord;  
    }

    window.onload = newGame();

    document.addEventListener( "keypress", function ( event ){

        let letPick = String.fromCharCode( event.keyCode );
        letPick = letPick.toLowerCase();
          
        if( letPick.charCodeAt(0) < 97 || letPick.charCodeAt(0) > 122 ){
            document.getElementById("msg").innerHTML = "That's not a letter";
            
        }else{
            
            let pos = 0;

            if( tried.indexOf( letPick ) < 0 ){
                tried.push( letPick );
                tried.push(" ");

                while( pos >= 0 ){

                    pos = curWord.indexOf(letPick, pos );

                    if( pos >= 0 ){
                    
                        blankWord.splice( pos, 1, letPick);
                        document.getElementById("curWord").innerHTML = blankWord.join("");
                        pos++;
                    }
                }

                document.getElementById("msg").innerHTML = tried.join("");


                if( wordCheck(blankWord) ){
                    document.getElementById("msg").innerHTML = "You Win!";
                    yay.play();
                    newGame();
                }else{

                    if( curWord.indexOf( letPick ) < 0 ){
                        chances--;
                    }
                
                    if( chances === 0 ){
                        document.getElementById("msg").innerHTML = "You Lose...";
                        document.getElementById("curWord").innerHTML = curWord;
                        newGame();
                    }else{
                
                        document.getElementById("chances").innerHTML = "Chances: " + chances;               
                        
                    }

                }
            }

    }
});
