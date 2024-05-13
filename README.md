# "Film Collection" - Katalog kolekcji filmów

Spis treści:
- opis
- funkcjonalności
- instrukcja

## Opis
Projekt ten prezentuje małą, prywatną kolekcję/katalog filmowy z różnymi funkcjonalnościami mającymi za zadanie umożliwić wygodne zarządzanie tą kolekcją.
Projekt zaliczeniowy na uniwersytet.

## Funkcjonalności
- routing i obsługa zapytań - wykorzystując 'express'
- SSR - wykorzytsująć 'ejs'
- przesyłanie, zapisywanie i przechowywanie plików - wykorzytsując 'multar' oraz pliki JSON
- pogląd kolecji na stronie głównej
- pogląd szczegółowy pojedynczych filmów na podstronach
- możliwość edytowania filmów na podstronach
- możliwość usuwania filmów
- podręczny szablon opisujący wymagane dane
- prosta oprawa graficzna

## Instrukcja
Projekt wykorzystuje zależności:
- body-parser
- ejs
- express
- fs
- multer
- path

Inicjalizacja nastąpiła za pomocą komendy `npm init`.
Wszystkie pakiety wymagają instalacji za pomocą komendy `npm install [package] --save`.
Projekt uruchamiany jest za pomocą komendy `node app.js`.
Powyższe komendy trzeba wykonywać z poziomu katalogu root'a projektu.

Folder 'data' przechowuje dane przykładowe
Folder 'public/uploads' przechowuje zdjęcia do danych przykładowych
