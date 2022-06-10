export enum correctness {
  fullCorrect = 1,
  halfCorrect = 2,
  incorrect = 3,
}

export interface kbCorrectness {
  letter: string;
  correctness: correctness;
}
