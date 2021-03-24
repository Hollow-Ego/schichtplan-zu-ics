# Schichtplan zu ICS

**Note:** This project follows the [code null guidelines](https://github.com/code-null/organization/blob/main/guidelines.md) in version (2.0.0.0)

Dieses Programm extrahiert die Arbeitszeiten aus der eingegebenen PDF und erstellt daraus eine ics-Datei. Es wurde für ein bestimmtes Format entwickelt, kann aber angepasst werden um für andere Formate zu funktionieren. Je vorhersehbarer und gleichbleibender die Struktur, desto einfacher.

Da keine Abhängigkeit zu einem Webserver besteht, kann das Programm auch offline und/oder über das File-Protokoll genutzt werden.

Der ausgegebene Dateiname kann frei gewählt werden. Die Schichten können als ein Termin (z.B.: 8:00 Uhr - 16:00 Uhr) oder als separate Termine (z.B.: 8:00 Uhr - 13:00 Uhr Dienst A, 13:00 Uhr - 13:30 Uhr Pause) extrahiert werden. Bei einem Termin kann angegeben werden, wie diese benannt werden sollen, bei mehreren Terminen können bestimmte Wörter rausgefiltert werden. Weiterhin ist es möglich, den Urlaub mit zu übertragen und dort ebenfalls anzugeben, wie dieser benannt werden soll.

Aktuell wird von einer der folgenden Strukturen ausgegangen:

> Datum Startzeit Endzeit
>
> Tätigkeitstart Tätigkeitende Tätigkeit
>
> Tätigkeitstart Tätigkeitende Tätigkeit
>
> Tätigkeitstart Tätigkeitende Tätigkeit
>
> Datum Startzeit Endzeit
>
> Tätigkeitstart Tätigkeitende Tätigkeit
>
> Tätigkeitstart Tätigkeitende Tätigkeit
>
> Tätigkeitstart Tätigkeitende Tätigkeit

In dieser Struktur werden die Tätigkeitszeilen umgekehrt ausgelesen. Bei einer Anpassung sollte dies daher berücksichtigt werden

> Datum Von Bis Tätigkeitsgruppe Tätigkeit
>
> Datum Von Bis Tätigkeitsgruppe Tätigkeit
>
> Datum Von Bis Tätigkeitsgruppe Tätigkeit

In dieser Struktur wird, im Gegensatz zur Ersten, eine Unterscheidung zwischen Tätigkeit und Tätigkeitsgruppe getroffen.

## Status

Stage: Released

Latest Stable Version: 1.2.0.0

## Technical Details

| Segment | Technical ID | Public ID            | Official Name      | Type    | Requires Accounts | Technology      | Versioning                                             |
| ------- | ------------ | -------------------- | ------------------ | ------- | ----------------- | --------------- | ------------------------------------------------------ |
| Program | PSZUI        | alpaSchichtplanZuICS | Schichtplan zu ICS | Inquire | false             | HTML, CSS, POJS | [CNV 1.0.0.2](https://github.com/code-null/versioning) |

## Dependencies to other Devices, Server, Programs, Components

| Name                                                   | Needed for             |
| ------------------------------------------------------ | ---------------------- |
| [pdf.js](https://github.com/mozilla/pdf.js) (included) | PDF Auslesen           |
| [ics.js](https://github.com/nwcell/ics.js) (included)  | ICS Dateien generieren |

## Direct Access Databases

Keine

## Exposed APIs

None

## Notes

Keine

## License

[MIT](LICENSE)
