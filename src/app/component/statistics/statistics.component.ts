import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';



@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  
  @Input() didWin: any;
  @Input() modalRef: any;
  constructor() { }

  ngOnInit(): void {
    
  }
  handleClose()
  { 
    // this.IsmodelShow = true;
    this.modalRef.close();
  }
}
