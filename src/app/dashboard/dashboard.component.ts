import { Component, OnInit } from '@angular/core';
import { Cantor } from '../cantor';
import { CantorService } from '../cantor.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  cantores: Cantor[] = [];

  constructor(private cantorService: CantorService) { }

  ngOnInit() {
    this.getCantores();
  }

  getCantores(): void {
    this.cantorService.getCantores()
      .subscribe(cantores => this.cantores = cantores.slice(1, 5));
  }
}