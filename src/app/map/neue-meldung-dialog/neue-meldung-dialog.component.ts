import {Component, OnInit} from '@angular/core';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule} from '@angular/forms';
import {DynamicDialogRef} from 'primeng/dynamicdialog';

interface GehafrOptions {
  name: string,
  code: string,
}
@Component({
  selector: 'app-neue-meldung-dialog',
  imports: [
    DropdownModule,
    FormsModule
  ],
  templateUrl: './neue-meldung-dialog.component.html',
  standalone: true,
  styleUrl: './neue-meldung-dialog.component.css'
})
export class NeueMeldungDialogComponent implements OnInit{
  gefahr= '';

  gefahrOptions: GehafrOptions[] | undefined;

  constructor(dialogRef: DynamicDialogRef) {
  }

  ngOnInit() {
    this.gefahrOptions = [
      {name: 'Feuer', code: 'FEUR'},
      {name: 'Ampel', code: 'AMPL'},
      {name: 'Baustelle', code: 'BAUSTL'},
    ]
  }

}
