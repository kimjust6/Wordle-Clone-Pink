import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-anagram',
  templateUrl: './anagram.component.html',
  styleUrls: ['./anagram.component.scss'],
})
export class AnagramComponent implements OnInit {
  constructor() {}

  words = [

    "scare",
    "scarf",
    "scary",
    "shard",
    "share",
    "shark",
    "sharp",
    "spare",
    "spark",
  ];

  ngOnInit(): void {
    for (let i = 0; i < this.words.length; i++)
    {
      for (let j = i + 1; j < this.words.length; j++)
      {
        var temp1 = this.words[i];
        var temp2 = this.words[j];
        // console.log(temp1);
        if (this.isAnagram(temp1,temp2))
        {
          console.log(temp1);
          console.log(temp2);

        }
      }

    }



  }
  isAnagram = function(s: string, t: string) {
    return s.split('').sort().join('') === t.split('').sort().join('');
};
}
