import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

// import "./game.component.scss";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  word: any = [];
  array: any = [];
  values: string = '';
  letterCount: number = 0;
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
    //ignores repeat
    if (!event.repeat && this.isLetter(event.key)) {
      this.values = event.key.toUpperCase();
      // console.log("key: ", this.values);
      this.insertValue(this.values);
    }
  }
  //insert the typed key into the json
  insertValue = (letter: String) => {

    console.log("/6:", this.letterCount/5);
    console.log("%5:", this.letterCount%5);
    this.array[Math.floor(this.letterCount / 5)].word[this.letterCount%5].letter = letter;

    // console.log(
    //   this.array[Math.floor(this.letterCount / 6)].word[this.letterCount%5].letter
    // );
    ++this.letterCount;
    // console.log(letter);
  };
  //function that checks if input is letters
  isLetter = function (str: String) {
    return str.length === 1 && str.match(/[a-zA-Z]/i);
  };
}
