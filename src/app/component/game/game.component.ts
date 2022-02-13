import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

// import "./game.component.scss";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {
  word:any = [];
  array:any = [];
  constructor() { }
  
  ngOnInit(): void {
    for (var j = 0; j < 6; j++)
    {
      this.word.push({letter: "A", key: uuidv4()})
    }
    for (var i = 0; i < 5; i++)
    {
      
      this.array.push({word: this.word });
    }
  }

}
