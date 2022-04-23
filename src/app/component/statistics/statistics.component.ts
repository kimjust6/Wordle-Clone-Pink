import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  @Input() didWin: any;
  @Input() modalRef: any;
  @Input() asciiPattern: any = [];
  constructor() {}

  ngOnInit(): void {
    console.log("In stats: Array: ");
    console.log(this.asciiPattern);
  }
  handleClose() {
    // this.IsmodelShow = true;
    this.modalRef.close();
  }
}
