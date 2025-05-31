import {Component, OnInit} from '@angular/core';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule} from '@angular/forms';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {Hauptkategorie, Meldungsart, ZuFussUnterkategorie} from '../../models/meldung';
import {InputNumber} from 'primeng/inputnumber';
import {InputText} from 'primeng/inputtext';
import {ButtonDirective, ButtonLabel} from 'primeng/button';
import {Textarea} from 'primeng/textarea';

interface GehafrOptions {
  name: string,
  code: string,
}
@Component({
  selector: 'app-neue-meldung-dialog',
  imports: [
    DropdownModule,
    FormsModule,
    InputNumber,
    InputText,
    ButtonDirective,
    Textarea,
    ButtonLabel
  ],
  templateUrl: './neue-meldung-dialog.component.html',
  standalone: true,
  styleUrl: './neue-meldung-dialog.component.css'
})
export class NeueMeldungDialogComponent implements OnInit{

  // ----------------------------------------------------------------------------------------------------------------
  // 1. Modell-Eigenschaften (entsprechend der Vorgabe:
  //    hauptkategorie = "Zu Fuß", unterkategorie, description, beispiele, bewertung)
  // ----------------------------------------------------------------------------------------------------------------

  /** Hauptkategorie ist fest auf "Zu Fuß" gesetzt */
  readOnlyHauptkategorie: Hauptkategorie = Hauptkategorie.ZuFuss;

  /** Unterkategorie – Optionen aus dem Enum ZuFussUnterkategorie */
  unterkategorieOptions: { label: string; value: ZuFussUnterkategorie }[] = [];

  /** Ausgewählte Unterkategorie */
  selectedUnterkategorie: ZuFussUnterkategorie | null = null;

  /** Beschreibung (entspricht dem Feld `beschreibung` im Modell) */
  description: string = '';

  /** Textarea für Beispiele, später in string[] umgewandelt */
  beispieleText: string = '';

  /** Einzelne Bewertung (1–10). Wir ordnen im Modell das Tuple [bewertung, bewertung] zu */
  bewertung: number | null = null;

  constructor(private dialogRef: DynamicDialogRef) {}

  ngOnInit() {
    // Alle Unterkategorien unter "Zu Fuß" befüllen
    this.unterkategorieOptions = Object.values(ZuFussUnterkategorie).map((uk) => ({
      label: uk,
      value: uk as ZuFussUnterkategorie,
    }));
  }

  /**
   * Baut ein vollständiges Meldungsart-Objekt und schließt den Dialog,
   * indem es dieses Objekt an den Parent zurückgibt.
   */
  saveAndClose() {
    // Minimaler Check: Unterkategorie und Bewertung müssen gesetzt sein
    if (!this.selectedUnterkategorie || this.bewertung === null) {
      return;
    }

    // Beispiele-Array erzeugen (nach Zeilenumbruch)
    const beispieleArray: string[] = this.beispieleText
      .split('\n')
      .map((zeile) => zeile.trim())
      .filter((zeile) => zeile.length > 0);

    // Schlüssel (key) generieren: z. B. Unterkategorie in Kleinbuchstaben ohne Leerzeichen
    const normalizedKey = this.selectedUnterkategorie
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_');

    // Name einfach als die Unterkategorie-Text verwenden


    const neueMeldung: Meldungsart = {
      key: normalizedKey,
      hauptkategorie: this.readOnlyHauptkategorie,
      unterkategorie: this.selectedUnterkategorie,
      beschreibung: this.description.trim(),
      bewertungsbereich: [this.bewertung, this.bewertung],
      beispiele: beispieleArray,
    };

    this.dialogRef.close(neueMeldung);
  }

  /** Schließt den Dialog ohne Rückgabe */
  cancel() {
    this.dialogRef.close();
  }
}


