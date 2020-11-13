import { Component, OnInit } from '@angular/core';
 
declare function init_plugins();

@Component({
  selector: 'app-pagenofound',
  templateUrl: './pagenofound.component.html',
  styleUrls: ['./pagenofound.component.css']
})
export class PagenofoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    init_plugins();
  }

}
