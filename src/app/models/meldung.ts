/**
 * Hauptkategorien (Top-Level). Aktuell:
 *  - Zu Fuß (alle untenstehenden Unterkategorien)
 */
export enum Hauptkategorie {
  ZuFuss = 'Zu Fuß',
}

export enum ZuFussUnterkategorie {
  Blockade = 'Blockade',
  SichtBeleuchtungsproblem = 'Sicht und Beleuchtungsproblem',
  WitterungsbedingteGefahren = 'Witterungsbedingte Gefahren',
  SicherheitDirekteBedrohungen = 'Sicherheit und Kriminalität - Direkte Bedrohungen',
  SicherheitVerdaechtigesVerhalten = 'Sicherheit und Kriminalität - Verdächtiges Verhalten',
  SicherheitDrogenUndAlkohol = 'Sicherheit und Kriminalität - Drogen und Alkohol',
  SicherheitVandalismus = 'Sicherheit und Kriminalität - Vandalismus',
  Infrastrukturdefekte = 'Infrastrukturdefekte',
  TierbezogeneGefahren = 'Tierbezogene Gefahren',
  BrandUndFeuergefahren = 'Brand- und Feuergefahren',
}

/**
 * Vereinigung aller möglichen Unterkategorien.
 */
export type Unterkategorie = ZuFussUnterkategorie;

/**
 * (1–10) Skala als Enum, damit überall klar typisierte Bewertungen verwendet werden.
 */
export enum Bewertungsstufe {
  Eins = 1,
  Zwei = 2,
  Drei = 3,
  Vier = 4,
  Fuenf = 5,
  Sechs = 6,
  Sieben = 7,
  Acht = 8,
  Neun = 9,
  Zehn = 10,
}

/**
 * Beschreibungen für jede Bewertungsstufe (1–10).
 */
export const Bewertungsbeschreibung: Record<Bewertungsstufe, string> = {
  [Bewertungsstufe.Eins]:   'Kein Problem: Fast keine Auswirkungen, unbedeutend.',
  [Bewertungsstufe.Zwei]:   'Minimal störend: Geringfügige Unannehmlichkeiten, leicht zu ignorieren.',
  [Bewertungsstufe.Drei]:   'Leicht störend: Spürbare, aber nicht kritische Beeinträchtigung.',
  [Bewertungsstufe.Vier]:   'Mittel störend: Kann kurzfristige Anpassungen erfordern, aber ohne größere Folgen.',
  [Bewertungsstufe.Fuenf]:  'Moderate Gefahr: Erfordert erhöhte Aufmerksamkeit und alternative Routenplanung.',
  [Bewertungsstufe.Sechs]:  'Spürbare Gefahr: Kann größere Umstände oder Zeitverluste verursachen, sollte vermieden werden.',
  [Bewertungsstufe.Sieben]: 'Kritisch: Verursacht erhebliche Verzögerungen oder Probleme, schnelle Anpassung erforderlich.',
  [Bewertungsstufe.Acht]:   'Gefährlich: Signifikante Beeinträchtigung oder potenziell gefährliche Situation.',
  [Bewertungsstufe.Neun]:   'Sehr gefährlich: Akute Gefahr, erhebliche Risiken oder Verzögerungen unvermeidlich.',
  [Bewertungsstufe.Zehn]:  'Extrem gefährlich: Lebensbedrohliche Situation oder vollständiger Stillstand.',
};

export interface Meldungsart {
  key: string;
  hauptkategorie: Hauptkategorie;
  unterkategorie: Unterkategorie;
  beschreibung: string;
  bewertungsbereich: [Bewertungsstufe, Bewertungsstufe];
  beispiele: string[];
}

/**
 * Statisch definierte Liste aller Meldungsarten unter „Zu Fuß“
 */
export const meldungsarten: Meldungsart[] = [
  // ======= Zu Fuß – Blockade =======
  {
    key: 'blockade',
    hauptkategorie: Hauptkategorie.ZuFuss,
    unterkategorie: ZuFussUnterkategorie.Blockade,
    beschreibung:
      'Gefahren oder Hindernisse, die den Weg von Fußgängern oder anderen Verkehrsteilnehmern blockieren und den normalen Verkehrsfluss behindern.',
    bewertungsbereich: [Bewertungsstufe.Eins, Bewertungsstufe.Vier],
    beispiele: [
      'Baustellen: Fehlende Absperrungen, schlecht markierte Umleitungen.',
      'Kaputte Gehwege: Schlaglöcher, Stolperkanten.',
      'Falsch parkende Fahrzeuge: Blockierte Gehwege oder Einfahrten.',
      'Überflutungen: Wasseransammlungen auf Gehwegen.',
      'Müllablagerungen: Große Mengen Müll, die Wege versperren.',
      'Veranstaltungen: Straßenfeste oder Demonstrationen ohne klare Umleitungen.',
    ],
  },

  // ======= Zu Fuß – Sicht und Beleuchtungsproblem =======
  {
    key: 'sicht_beleuchtungsproblem',
    hauptkategorie: Hauptkategorie.ZuFuss,
    unterkategorie: ZuFussUnterkategorie.SichtBeleuchtungsproblem,
    beschreibung:
      'Gefahren, die durch schlechte Sichtverhältnisse oder unzureichende Beleuchtung entstehen.',
    bewertungsbereich: [Bewertungsstufe.Eins, Bewertungsstufe.Sechs],
    beispiele: [
      'Dunkle Bereiche: Defekte Straßenlaternen oder Bereiche ohne Beleuchtung.',
      'Gefährliche Zebrastreifen: Fehlende Beleuchtung oder unübersichtliche Stellen.',
      'Falsch parkende Fahrzeuge: Sichtbehinderungen an Kreuzungen oder Überwegen.',
    ],
  },

  // ======= Zu Fuß – Witterungsbedingte Gefahren =======
  {
    key: 'witterungsbedingte_gefahren',
    hauptkategorie: Hauptkategorie.ZuFuss,
    unterkategorie: ZuFussUnterkategorie.WitterungsbedingteGefahren,
    beschreibung:
      'Gefahren, die durch Wetterbedingungen oder Naturereignisse verursacht werden.',
    bewertungsbereich: [Bewertungsstufe.Eins, Bewertungsstufe.Sechs],
    beispiele: [
      'Glätte: Vereiste Gehwege oder rutschige Stellen.',
      'Umgestürzte Bäume oder Äste: Nach Stürmen oder starkem Wind.',
      'Lose Gebäudeteile: Herabfallende Dachziegel, Fassadenteile oder Eiszapfen.',
    ],
  },

  // ======= Zu Fuß – Sicherheit und Kriminalität: Direkte Bedrohungen =======
  {
    key: 'sicherheit_direkte_bedrohungen',
    hauptkategorie: Hauptkategorie.ZuFuss,
    unterkategorie: ZuFussUnterkategorie.SicherheitDirekteBedrohungen,
    beschreibung:
      'Gefährdungen, die unmittelbar auf Personen abzielen und eine akute Gefahr darstellen.',
    bewertungsbereich: [Bewertungsstufe.Sechs, Bewertungsstufe.Zehn],
    beispiele: [
      'Raubüberfälle: Taschendiebstähle, Trickdiebstähle oder gewaltsames Entwenden von Wertgegenständen.',
      'Körperliche Gewalt: Prügeleien, Angriffe oder andere Übergriffe, die Personen verletzen können.',
      'Verbale Bedrohungen: Aggressives Verhalten, Einschüchterung oder direkte Drohungen gegen Personen.',
    ],
  },

  // ======= Zu Fuß – Sicherheit und Kriminalität: Verdächtiges Verhalten =======
  {
    key: 'sicherheit_verdaechtiges_verhalten',
    hauptkategorie: Hauptkategorie.ZuFuss,
    unterkategorie: ZuFussUnterkategorie.SicherheitVerdaechtigesVerhalten,
    beschreibung:
      'Ungewöhnliches oder auffälliges Verhalten, das auf eine potenzielle Gefahr oder kriminelle Absicht hinweist.',
    bewertungsbereich: [Bewertungsstufe.Vier, Bewertungsstufe.Sieben],
    beispiele: [
      'Verdächtige Personen: Personen, die ungewöhnlich oft Beobachtungen machen, sich unauffällig bewegen oder sich in Bereichen aufhalten, in denen sie nicht hingehören.',
      'Manipulation/Einbruch: Personen, die sich an Fahrzeugen, Türen oder Fenstern zu schaffen machen, um potenziell einzubrechen.',
    ],
  },

  // ======= Zu Fuß – Sicherheit und Kriminalität: Drogen und Alkohol =======
  {
    key: 'sicherheit_drogen_alkohol',
    hauptkategorie: Hauptkategorie.ZuFuss,
    unterkategorie: ZuFussUnterkategorie.SicherheitDrogenUndAlkohol,
    beschreibung:
      'Gefahren oder Störungen durch Drogenkonsum, Handel oder stark alkoholisierte Personen.',
    bewertungsbereich: [Bewertungsstufe.Fuenf, Bewertungsstufe.Neun],
    beispiele: [
      'Öffentlicher Drogenkonsum: Konsum illegaler Substanzen an öffentlichen Orten.',
      'Aggressives Verhalten durch Alkohol oder Drogen: Betrunkene oder unter Drogeneinfluss stehende Personen, die andere gefährden oder belästigen.',
      'Drogenhandel: Verdacht oder Beobachtung des Verkaufs illegaler Substanzen.',
    ],
  },

  // ======= Zu Fuß – Sicherheit und Kriminalität: Vandalismus =======
  {
    key: 'sicherheit_vandalismus',
    hauptkategorie: Hauptkategorie.ZuFuss,
    unterkategorie: ZuFussUnterkategorie.SicherheitVandalismus,
    beschreibung:
      'Mutwillige Beschädigungen oder Zerstörungen öffentlicher oder privater Gegenstände.',
    bewertungsbereich: [Bewertungsstufe.Fuenf, Bewertungsstufe.Zehn],
    beispiele: [
      'Beschädigte Infrastruktur: Zerstörte Lampen, Bänke oder Schilder.',
      'Sachbeschädigungen: Absichtliches Zerstören von öffentlichen oder privaten Einrichtungen.',
    ],
  },

  // ======= Zu Fuß – Infrastrukturdefekte =======
  {
    key: 'infrastrukturdefekte',
    hauptkategorie: Hauptkategorie.ZuFuss,
    unterkategorie: ZuFussUnterkategorie.Infrastrukturdefekte,
    beschreibung:
      'Probleme oder Schäden an der öffentlichen Infrastruktur, die die Nutzung beeinträchtigen oder Gefahren darstellen.',
    bewertungsbereich: [Bewertungsstufe.Vier, Bewertungsstufe.Sieben],
    beispiele: [
      'Defekte Ampeln: Nicht funktionierende Fußgängerampeln.',
      'Kaputte Gehwege: Schlaglöcher, Stolperkanten.',
      'Unzureichende Barrierefreiheit: Fehlende Rampen, defekte Aufzüge oder Hindernisse für Personen mit eingeschränkter Mobilität.',
    ],
  },

  // ======= Zu Fuß – Tierbezogene Gefahren =======
  {
    key: 'tierbezogene_gefahren',
    hauptkategorie: Hauptkategorie.ZuFuss,
    unterkategorie: ZuFussUnterkategorie.TierbezogeneGefahren,
    beschreibung:
      'Gefahren durch Tiere in urbanen oder natürlichen Umgebungen.',
    bewertungsbereich: [Bewertungsstufe.Eins, Bewertungsstufe.Zehn],
    beispiele: [
      'Tiere: Gefährliche oder ungewohnte Tiere, die eine Bedrohung darstellen und potenziell aggressiv oder unsicher wirken.',
    ],
  },

  // ======= Zu Fuß – Brand- und Feuergefahren =======
  {
    key: 'brand_feuergefahren',
    hauptkategorie: Hauptkategorie.ZuFuss,
    unterkategorie: ZuFussUnterkategorie.BrandUndFeuergefahren,
    beschreibung:
      'Gefahren durch offene oder unkontrollierte Feuer.',
    bewertungsbereich: [Bewertungsstufe.Sieben, Bewertungsstufe.Zehn],
    beispiele: [
      'Offene Feuerstellen: Brennende Mülltonnen, Lagerfeuer oder Feuerstellen.',
      'Brandgefahr: Rauchentwicklung oder verdächtige Hitzequellen.',
    ],
  },

  // ======= Im Auto – Platzhalter (noch keine konkreten Unterkategorien) =======
  // {
  //   key: 'im_auto_beispiel',
  //   hauptkategorie: Hauptkategorie.ImAuto,
  //   unterkategorie: ImAutoUnterkategorie.Unfall, // später definieren
  //   beschreibung: 'Beispiel: Gefahren im Automobilverkehr.',
  //   bewertungsbereich: [Bewertungsstufe.Drei, Bewertungsstufe.Sieben],
  //   beispiele: ['Unfall: Auffahrunfälle, Sichtbehinderungen durch Gegenverkehr.'],
  // },
];

/**
 * Beispiel-Nutzung:
 *
 * import {
 *   Hauptkategorie,
 *   ZuFussUnterkategorie,
 *   Meldungsart,
 *   meldungsarten,
 *   Bewertungsbeschreibung,
 *   Bewertungsstufe,
 * } from './meldungsarten';
 *
 * // Alle Meldungen unter „Zu Fuß“ herausfiltern:
 * const zuFussMeldungen = meldungsarten.filter(
 *   (m) => m.hauptkategorie === Hauptkategorie.ZuFuss
 * );
 *
 * // Konkrete Meldung „Blockade” abrufen:
 * const blockade = meldungsarten.find((m) => m.key === 'blockade');
 * console.log(blockade?.unterkategorie); // ZuFussUnterkategorie.Blockade
 *
 * // Text zur Bewertungsstufe:
 * console.log(Bewertungsbeschreibung[Bewertungsstufe.Vier]);
 * // → "Mittel störend: Kann kurzfristige Anpassungen..."
 */
