import { Component, OnInit } from '@angular/core';
declare function init_plugins();

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    init_plugins();
  }

}
