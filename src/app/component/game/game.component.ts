import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { DatePipe } from '@angular/common';

// import wordleWords from '../../resources/words.json';
import { LoadWordsService } from 'src/services/load-words.service';
import { StatisticsComponent } from '../statistics/statistics.component';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes,
} from '@angular/animations';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  animations: [
    trigger('animateState', [
      state('shake', style({})),
      state('noShake', style({})),
      transition(
        'noShake => shake',
        animate(
          '200ms ease-in',
          keyframes([
            style({ transform: 'translate3d(-4%, 0, 0)', offset: 0.1 }),
            style({ transform: 'translate3d(4%, 0, 0)', offset: 0.2 }),
            style({ transform: 'translate3d(-4%, 0, 0)', offset: 0.3 }),
            style({ transform: 'translate3d(4%, 0, 0)', offset: 0.4 }),
            style({ transform: 'translate3d(-4%, 0, 0)', offset: 0.5 }),
            style({ transform: 'translate3d(4%, 0, 0)', offset: 0.6 }),
            style({ transform: 'translate3d(-4%, 0, 0)', offset: 0.7 }),
            style({ transform: 'translate3d(4%, 0, 0)', offset: 0.8 }),
            style({ transform: 'translate3d(-4%, 0, 0)', offset: 0.9 }),
          ])
        )
      ),
      transition('shake => noShake', animate('250ms ease-in')),
    ]),
  ],
})
export class GameComponent implements OnInit {
  word: any = [];
  array: any = [];
  asciiPattern: string = '';
  values: string = '';
  // the number of attempts made
  wordCount: number = 0;
  // the number of letters typed
  letterCount: number = 0;
  // the error message
  errorMessage: string = '';
  // the answer to the wordle puzzle
  wordleAnswer: string = '';
  // the state of the attempt
  correctness = '';
  // state that manages if the game is over
  gameOver = false;
  // state that manages win/loss
  gameWon = false;
  wordleNumber: any;
  // object that holds all the wordle words
  allWordleWords: any;

  readonly LOCAL_STORAGE_ARRAY: string = 'arrays';
  readonly LOCAL_STORAGE_WORDLE_ANSWER: string = 'wordleAnswer';
  readonly LOCAL_STORAGE_STATS: string = 'stats';
  //setting values for number of words
  readonly maxLetterCount: number = 5;
  readonly maxWordCount: number = 6;
  constructor(
    private modalService: NgbModal,
    private wordleWord: LoadWordsService,
    public datepipe: DatePipe
  ) {
    this.getRandomWordle();
  }

  ngOnInit(): void {
    // check if array is store in local storage
    let myArrayString = localStorage.getItem(this.LOCAL_STORAGE_ARRAY);
    if (myArrayString) {
      // restore it
      this.array = JSON.parse(myArrayString);
      // reinitialize letterCount
      this.wordCount = 0;
      for (let element of this.array) {
        // check if the letter is occupied, if it is, increment wordCount
        if (element.word[this.maxLetterCount - 1].correctness !== '') {
          ++this.wordCount;
        }
        if (this.wordCount === this.maxWordCount) {
          this.wordCount = 0;
          // localStorage.clear();
          this.clearLocalStorage();
          this.getRandomWordle();
        }
      }
    } else {
      //setup the array for first time
      for (var i = 0; i < 6; i++) {
        //setup the array and get uuids for each element
        this.word = [];
        for (var j = 0; j < 5; j++) {
          this.word.push({ letter: '', key: uuidv4(), correctness: '' });
        }
        this.array.push({ word: this.word, shakeState: 'noShake' });
      }
    }
  }

  clearLocalStorage() {
    localStorage.removeItem(this.LOCAL_STORAGE_ARRAY);
    localStorage.removeItem(this.LOCAL_STORAGE_WORDLE_ANSWER);
    localStorage.clear();
  }

  getRandomWordle() {
    // get all the wordle words
    this.allWordleWords = this.wordleWord.getWords();
    // check if there is a word already cached, otherwise get a random one
    let tempWordleAnswer = localStorage.getItem(
      this.LOCAL_STORAGE_WORDLE_ANSWER
    );
    if (tempWordleAnswer && tempWordleAnswer != '') {
      this.wordleAnswer = tempWordleAnswer;
    } else {
      this.wordleAnswer =
        this.allWordleWords[
          this.getRandomInt(this.allWordleWords.length)
        ].wordle.toUpperCase();
      localStorage.setItem(this.LOCAL_STORAGE_WORDLE_ANSWER, this.wordleAnswer);
    }
  }
  setErrorMessage(message: string) {
    this.errorMessage = message;
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  //on keypressdown for the whole page
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    //check if game is over
    if (this.gameOver) {
      return;
    }

    //ignores repeat and keys that are not letters
    if (!event.repeat && this.isLetter(event.key)) {
      //clears error messages
      if (this.errorMessage != '') {
        this.errorMessage = '';
        this.array[this.wordCount].shakeState = 'noShake';
      }

      //converts to upper case
      this.values = event.key.toUpperCase();
      //adds the value to the wordle square
      this.insertValue(this.values);
    }
    // check for backpsace
    else if (!event.repeat && event.key == 'Backspace') {
      this.errorMessage = '';
      this.array[this.wordCount].shakeState = 'noShake';
      this.handleBackspace();
    }
    // check for enter key
    else if (!event.repeat && event.key == 'Enter') {
      this.handleEnter();
    }
  }
  //insert the typed key into the json
  insertValue = (letter: String) => {
    if (this.letterCount < this.maxLetterCount) {
      this.array[Math.floor(this.wordCount)].word[this.letterCount].letter =
        letter;
      ++this.letterCount;
    }
  };
  //function that checks if input is letters
  isLetter = function (str: String) {
    return str.length === 1 && str.match(/[a-zA-Z]/i);
  };

  //erase the last letter
  handleBackspace = () => {
    //check for errors
    if (this.letterCount > 0) {
      --this.letterCount;
      // erase the last value and decrement
      this.array[Math.floor(this.wordCount)].word[this.letterCount].letter = '';
    }
  };
  //validate word and
  handleEnter = () => {
    //check if we have enough letters
    if (this.letterCount < this.maxLetterCount) {
      //handle not enough letters
      this.setErrorMessage('Not enough letters.');
      //set the shake to true
      this.array[this.wordCount].shakeState = 'shake';
    }
    //not working currently
    else if (this.wordCount == this.maxWordCount) {
      //lose the game
      this.setErrorMessage('You lose! Better luck next time!');
    }
    //try the word to see how many letters are correct
    else if (this.wordCount < this.maxWordCount) {
      //check if word is valid
      if (this.isValidWord()) {
        this.wordCount++;
        this.letterCount = 0;
      }
      //if word is invalid set error message
      else {
        this.setErrorMessage('Not in word list!');
        //set the shake to true
        this.array[this.wordCount].shakeState = 'shake';
      }
    }
  };

  // loop through words to see if word attempted is valid
  isValidWord = () => {
    var foundWord = false;
    //construct the word from the array
    var theGuessWord = '';
    for (var i = 0; i < this.maxLetterCount; ++i) {
      //loop through array and concatenate
      theGuessWord = theGuessWord.concat(
        this.array[this.wordCount].word[i].letter
      );
    }
    for (let [key, value] of Object.entries(this.wordleWord.getWords())) {
      if (value.wordle.toString().toUpperCase() == theGuessWord.toUpperCase()) {
        foundWord = true;
        this.handleValidWord();
        break;
      }
    }
    return foundWord;
  };

  //handle valid words
  //ie checks if the letters are in the right spot etc
  handleValidWord() {
    var correctLetters = 0;
    var hashmap: any = {};
    //count each letter in the theGuessWord
    for (var i = 0; i < this.maxLetterCount; ++i) {
      if (hashmap[this.wordleAnswer[i]] == null) {
        hashmap[this.wordleAnswer[i]] = 1;
      } else {
        hashmap[this.wordleAnswer[i]] += 1;
      }
    }
    //get all the fully correct answers
    for (var i = 0; i < this.maxLetterCount; i++) {
      if (this.array[this.wordCount].word[i].letter == this.wordleAnswer[i]) {
        hashmap[this.array[this.wordCount].word[i].letter] -= 1;
        this.array[this.wordCount].word[i].correctness = 'fullCorrect';
        ++correctLetters;
      } else {
        this.array[this.wordCount].word[i].correctness = 'incorrect';
      }
    }

    // check if we are fully correct
    if (correctLetters == this.maxLetterCount) {
      this.gameOver = true;
      this.gameWon = true;
      this.updateStats(this.wordCount);
      this.openStatisticsComponent(true);
    } else {
      //partial answers
      for (var j = 0; j < this.maxLetterCount; ++j) {
        for (var i = 0; i < this.maxLetterCount; ++i) {
          if (
            this.array[this.wordCount].word[j].letter == this.wordleAnswer[i] &&
            hashmap[this.array[this.wordCount].word[j].letter] > 0 &&
            this.array[this.wordCount].word[j].correctness == 'incorrect'
          ) {
            hashmap[this.array[this.wordCount].word[j].letter] -= 1;
            this.array[this.wordCount].word[j].correctness = 'halfCorrect';
          }
        }
      }

      if (this.wordCount == this.maxWordCount - 1) {
        this.gameOver = true;
        this.updateStats(this.wordCount);
        // this.setErrorMessage("Game Over!");
        this.openStatisticsComponent(false);
      }
    }
    // if game isn't over, store it in local storage
    if (!this.gameOver) {
      localStorage.setItem(
        this.LOCAL_STORAGE_ARRAY,
        JSON.stringify(this.array)
      );
    }
  }

  updateStats(result: number) {
    // update the stats localstorage
    let tempStats = localStorage.getItem(this.LOCAL_STORAGE_STATS);
    let tempStatsArr = [];
    if (tempStats) {
      tempStatsArr = JSON.parse(tempStats);
    } else {
      // initialize the array
      for (let i = 0; i < this.maxWordCount + 1; ++i) {
        tempStatsArr[i] = 0;
      }
    }
    // push the current result into the array
    ++tempStatsArr[this.wordCount - 1];
    this.clearLocalStorage();
    localStorage.setItem(
      this.LOCAL_STORAGE_STATS,
      JSON.stringify(tempStatsArr)
    );
  }

  //open game over modal
  openStatisticsComponent(didWin: boolean) {
    const modalRef = this.modalService.open(StatisticsComponent, {
      backdrop: false,
    });

    //get the game number for today
    let startDate = new Date('2021-06-19T11:59:59');
    let today = new Date();
    this.wordleNumber = Math.floor(
      (today.getTime() - startDate.getTime()) / 3600 / 24 / 1000
    );

    //create the ascii array that will be copied onclick
    this.asciiPattern += 'Wordle ' + this.wordleNumber + ' ';

    this.asciiPattern += this.wordCount + 1;
    this.asciiPattern += '/' + this.maxWordCount + '\n';
    for (var i = 0; i < this.wordCount + 1; ++i) {
      for (var j = 0; j < this.maxLetterCount; ++j) {
        if (this.array[i].word[j].correctness === 'fullCorrect') {
          this.asciiPattern += '🟩';
        } else if (this.array[i].word[j].correctness === 'halfCorrect') {
          this.asciiPattern += '🟨';
        } else {
          this.asciiPattern += '⬜';
        }
      }
      this.asciiPattern += '\n';
    }

    //pass didWin to StatisticsComponent
    (<StatisticsComponent>modalRef.componentInstance).didWin = didWin;
    (<StatisticsComponent>modalRef.componentInstance).modalRef = modalRef;
    (<StatisticsComponent>modalRef.componentInstance).asciiPattern =
      this.asciiPattern;
  }
}
