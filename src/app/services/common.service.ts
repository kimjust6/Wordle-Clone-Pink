import { Injectable } from '@angular/core';
import { correctness } from '../utilities/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {}

  /**
   * @name getRandomInt
   * @description returns a random integer from 0 to number - 1
   * @param max max-1 is the largest number that can be returned
   * @returns
   */
  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  /**
   * @name correctnessToString
   * @description converts the correctness from enum to string
   * @param _correctness enum that has the value of the correctness
   * @returns: string
   */
  correctnessToString(_correctness: correctness): string {
    let returnVal: string;
    if (_correctness == correctness.fullCorrect) {
      returnVal = 'fullCorrect';
    } else if (_correctness == correctness.halfCorrect) {
      returnVal = 'halfCorrect';
    } else if (_correctness == correctness.incorrect) {
      returnVal = 'incorrect';
    } else {
      returnVal = 'impossible';
    }
    return returnVal;
  }
}
