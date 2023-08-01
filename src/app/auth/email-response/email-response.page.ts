import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-email-response',
  templateUrl: './email-response.page.html',
  styleUrls: ['./email-response.page.scss'],
})
export class EmailResponsePage implements OnInit {

  mode!: string;

  constructor( private activatedRoute: ActivatedRoute ) { }

  ngOnInit() {
    this.mode = this.activatedRoute.snapshot.queryParams['mode'];
    console.log(this.mode)
  }

}
