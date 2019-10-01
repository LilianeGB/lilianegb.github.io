import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Cantor }         from '../cantor';
import { CantorService }  from '../cantor.service';

@Component({
  selector: 'app-cantor-detail',
  templateUrl: './cantor-detail.component.html',
  styleUrls: [ './cantor-detail.component.css' ]
})
export class CantorDetailComponent implements OnInit {
  @Input() cantor: Cantor;

  constructor(
    private route: ActivatedRoute,
    private cantorService: CantorService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getCantor();
  }

  getCantor(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.cantorService.getCantor(id)
      .subscribe(cantor => this.cantor = cantor);
  }

  goBack(): void {
    this.location.back();
  }

 save(): void {
    this.cantorService.updateCantor(this.cantor)
      .subscribe(() => this.goBack());
  }
}