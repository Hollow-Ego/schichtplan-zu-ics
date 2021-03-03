# Schicht zu ICS

Hinweis: Dieses Projekt folgt den [code null Vorgaben](https://github.com/code-null/organization/blob/main/guidelines.md) in der Version 1.3.0.

Dieses Programm extrahiert die Arbeitszeiten aus der eingegebenen PDF und erstellt daraus eine ics-Datei. Es wurde für ein bestimmtes Format entwickwelt, kann aber angepasst werden um für andere Formate zu funktionieren. Je vorhersehbarer und gleichbleibender die Struktur, desto einfacher.

Der ausgegebene Dateiname kann frei gewählt werden. Die Schichten können als ein Termin (z.B.: 8:00 Uhr - 16:00 Uhr) oder als separtate Termine (z.B.: 8:00 Uhr - 13:00 Uhr Dienst A, 13:00 Uhr - 13:30 Uhr Pause) extrahiert werden. Bei einem Termin kann angegeben werden, wie diese benannt werden sollen, bei mehreren Terminen können bestimmte Wörter rausgefiltert werden. Weiterhin ist es möglich, den urlaub mit zu übertragen und dort ebenfalls anzugeben, wie dieser benannt werden soll.

Aktuell wird von folgender Struktur ausgegangen:

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

In dem Fall, für den dieses Programm entwickelt wurde, werden die Tätigkeitszeilen umgekehrt ausgelesen. Bei einer Anpassung sollte dies daher berücksichtigt werden

## Status

Stage: Released
Latest Stable Version: 1.0.0

## Technical Details

| Stack   | Technical ID | Reference Name     | Official Name      | Type    | Requires Accounts | Technology      |
| ------- | ------------ | ------------------ | ------------------ | ------- | ----------------- | --------------- |
| Program | PSZUI        | schichtplan-zu-ics | Schichtplan zu ICS | Inquire | false             | HTML, CSS, POJS |

## Dependencies to other Devices, Server, Programms, Components

- [pdf.js](https://github.com/mozilla/pdf.js) (included)
- [ics.js](https://github.com/nwcell/ics.js) (included)

## Databases

Keine

## Exposed APIs

Keine

## Notes

## License

[MIT License](https://github.com/Hollow-Ego/schichtplan-zu-ics/blob/main/LICENSE)
