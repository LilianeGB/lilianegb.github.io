import { Component, OnInit } from '@angular/core';

import { Cantor } from '../cantor';
import { CantorService } from '../cantor.service';

@Component({
  selector: 'app-cantores',
  templateUrl: './cantores.component.html',
  styleUrls: ['./cantores.component.css']
})
export class CantoresComponent implements OnInit {
  cantores: Cantor[];

  constructor(private cantorService: CantorService) { }

  ngOnInit() {
    this.getCantores();
  }

  getCantores(): void {
    this.cantorService.getCantores()
    .subscribe(cantores => this.cantores = cantores);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.cantorService.addCantor({ name } as Cantor)
      .subscribe(cantor => {
        this.cantores.push(cantor);
      });
  }

  delete(cantor: Cantor): void {
    this.cantores = this.cantores.filter(h => h !== cantor);
    this.cantorService.deleteCantor(cantor).subscribe();
  }

}