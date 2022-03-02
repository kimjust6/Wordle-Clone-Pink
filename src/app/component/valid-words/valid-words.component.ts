import { Component, OnInit } from '@angular/core';
import { LoadWordsService } from 'src/services/load-words.service';

@Component({
  selector: 'app-valid-words',
  templateUrl: './valid-words.component.html',
  styleUrls: ['./valid-words.component.scss']
})
export class ValidWordsComponent implements OnInit {

  constructor(private wordleWord: LoadWordsService) { }

  wordleWords: any;
  ngOnInit(): void {
    this.wordleWords = this.wordleWord.getWords();
    // console.log(this.wordleWords);
  }



}
