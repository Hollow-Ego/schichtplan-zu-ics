# Release Notes for Schichtplan zu ICS

## Version 1.2.1.0

- Bug fix für defektes Regex

### Neu

Keine neuen Funktionen

### Verbessert

Keine Verbesserungen

### Bug Fixes

- Regex für origin 1 (ursprüngliches Format) war falsch und wurde nun korrigiert

### Sonstiges

Keine

## Version 1.2.0.0

- Unterstützung für eine zweite PDF-Struktur hinzugefügt
- kleine optische Anpassungen

### Neu

- Zweite Struktur aus der PDF wird unterstützt

### Verbessert

Keine Verbesserungen

### Bug Fixes

Keine Bugfixes

### Sonstiges

Keine

## Version 1.1.0.0

- Bug-Fix und kleine optische Anpassung

### Neu

- Branding unten rechts hinzugefügt
- Versionsnummer in eine Konstante gespeichert
- Versionsnummer wird per JS Code eingefügt

### Verbessert

- Hintergrund ist dunkler
- Blau etwas heller
- Maximale Breite ist nun 70%

### Bug Fixes

- Ein Leerzeichen führte dazu, dass die ICS Datei für den Google Kalender nicht lesbar war

### Sonstiges

- Rechtschreibfehler bei "Dateinamen" behoben.
- Rechtschreibfehler bei "Kommata" behoben.

## Version 1.0.1.0

Kleiner Bug-Fix

### Neu

Nichts

### Verbessert

keine Verbesserungen

### Bug Fixes

- Letzter Termin wurde nicht übertragen, da das Hinzufügen durchgeführt wird, wenn das nächste Element geprüft wird. Der schnelle Fix fügt das zuletzt erstellte Objekt nach dem Loop hinzu, da wir davon ausgehen können, dass dieses an der Stelle valide Daten enthält.

### Sonstiges

keine Ergänzungen

## Version 1.0.0.0

Die erste stabile Version.

### Neu

- Schichten können als eine Einheit oder mehrere Untereinheiten erstellt werden
- Urlaub kann ignoriert oder hinzugefügt werden
- Freie Beschriftung der Schichten, wenn als eine Einheit erstellt
- Kommaseparierte Liste mit Wörtern die entfernt werden sollen, wenn als mehrere Untereinheiten erstellt
- Frei anpassbarer Dateiname

### Verbessert

keine Verbesserungen

### Bug Fixes

keine Bugfixes

### Sonstiges

keine Ergänzungen
