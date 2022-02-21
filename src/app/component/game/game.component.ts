import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import wordleWords from '../../resources/words.json';




@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  word: any = [];
  array: any = [];
  values: string = '';
  wordCount: number = 0;
  letterCount: number = 0;
  errorMessage:string = '';
  wordleAnswer: string = 'CRANE';

  setErrorMessage(message: string){
    this.errorMessage = message;
  }
  
  //setting values for number of words
  readonly maxLetterCount: number = 5;
  readonly maxWordCount: number = 6;
  constructor() {}

  ngOnInit(): void {
    //setup the array
    for (var i = 0; i < 6; i++) {
      //setup the array and get uuids for each element
      this.word = [];
      for (var j = 0; j < 5; j++) {
        this.word.push({ letter: '', key: uuidv4() });
      }
      this.array.push({ word: this.word });
    }
  }

  //on keypressdown for the whole page
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {

    
    //ignores repeat and keys that are not letters
    if (!event.repeat && this.isLetter(event.key)) {
      //clears error messages
      if (this.errorMessage !=""){
        this.errorMessage="";
      }
      //converts to upper case
      this.values = event.key.toUpperCase();
      //adds the value to the wordle square
      this.insertValue(this.values);
    }
    // check for backpsace
    else if( !event.repeat && event.key == "Backspace" ) {
    	this.handleBackspace();
    }
    // check for enter key
    else if( !event.repeat && event.key == "Enter" ) {
      this.handleEnter();
    }
  }
  //insert the typed key into the json
  insertValue = (letter: String) => {

    if ( this.letterCount < this.maxLetterCount )
    {
      this.array[Math.floor(this.wordCount)].word[this.letterCount].letter = letter;
      ++this.letterCount;
    }
    
  };
  //function that checks if input is letters
  isLetter = function (str: String) {
    return str.length === 1 && str.match(/[a-zA-Z]/i);
  };

  //erase the last letter
  handleBackspace = () =>{
    //check for errors
    if (this.letterCount > 0)
    {
      --this.letterCount;
      // erase the last value and decrement
      this.array[Math.floor(this.wordCount)].word[this.letterCount].letter = "";
      
    }
  }
  //validate word and 
  handleEnter = () =>{
    //check if we have enough letters
    if ( this.letterCount < this.maxLetterCount )
    {
      //handle not enough letters
      this.setErrorMessage("Not enough letters.")
    }
    //not working currently
    else if(this.wordCount == this.maxWordCount)
    {
      //lose the game
      this.setErrorMessage("You lose! Better luck next time!")
    }
    //try the word to see how many letters are correct
    else if (this.wordCount < this.maxWordCount - 1)
    {
      //check if word is valid
      if (this.isValidWord())
      {
        this.wordCount++;
        this.letterCount = 0;
      }
      //if word is invalid set error message
      else{         
          this.setErrorMessage("Not in word list!");
      }
      
    }
  }

  // loop through words to see if word attempted is valid
  isValidWord = () =>{
    var foundWord = false;
    //construct the word from the array
    var theGuessWord="";
    for (var i = 0; i < this.maxLetterCount; ++i)
    {
      //loop through array and concatenate
      theGuessWord = theGuessWord.concat(this.array[this.wordCount].word[i].letter);
    }
   
    for (let [key,value] of Object.entries(wordleWords)){
      if (value.wordle.toString().toUpperCase() == theGuessWord.toUpperCase())
      {
        
        foundWord = true;
        this.handleValidWord();
        break;
      }
    }
    return foundWord;
  }

  //handle valid words
  handleValidWord()
  {

  }
}
