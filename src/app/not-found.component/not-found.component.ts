import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundService } from './not-found.service';

@Component({
    selector: 'not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.css'],
    providers: [NotFoundService]
})
export class NotFoundComponent implements OnInit {

    profile = {};

    constructor(private notFoundService: NotFoundService) {}

    ngOnInit() { this.notFoundService.getStatus().subscribe(data => this.profile = data) }
}