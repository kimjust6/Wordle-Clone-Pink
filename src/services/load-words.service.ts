import { Injectable } from '@angular/core';
import wordleWords from '../app/resources/words.json';


@Injectable({
  providedIn: 'root'
})
export class LoadWordsService {

  constructor() { }

  public getWords = () => {
    return wordleWords;
  }
}
