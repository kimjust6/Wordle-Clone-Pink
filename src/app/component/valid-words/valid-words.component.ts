import { Component, OnInit } from '@angular/core';
import { LoadWordsService } from 'src/services/load-words.service';
import { v4 as uuidv4 } from 'uuid';



@Component({
  selector: 'app-valid-words',
  templateUrl: './valid-words.component.html',
  styleUrls: ['./valid-words.component.scss']
})

export class ValidWordsComponent implements OnInit {

  
  constructor(private allWords: LoadWordsService) { }

  // wordleWords: any = {} as words;
  wordleWords: any = [];
  ngOnInit(): void {
    // this.wordleWords = this.allWords.getWords();
    for (var i = 0; i < this.allWords.getWords().length; i++)
    {
      this.wordleWords[i] = {};
      this.wordleWords[i].wordle = this.allWords.getWords()[i].wordle.toString();
      this.wordleWords[i].key = uuidv4();
      
 
    }
    // this.contains("a");
    // this.doesNotContain("b");
    
  }

  contains(c: string)
  {
    this.wordleWords = this.wordleWords.filter((e: { wordle: string | any[]; }) =>{
      return e.wordle.includes(c);

    });
  }

  doesNotContain(c: string)
  {
    this.wordleWords = this.wordleWords.filter((e: { wordle: string | any[]; }) =>{
      return !e.wordle.includes(c);

    });
  }

}
