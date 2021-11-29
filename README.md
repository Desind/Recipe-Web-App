# Instrukcja uruchomienia projektu

#### Wymagania oprogramowania:
Docker desktop:   
https://hub.docker.com/editions/community/docker-ce-desktop-windows \

Java SDK w wersji minimum 8:\
Ważne, żeby podczas instalacji java została dodana do ścieżki systemowej. 
Zweryfikować to można poprzez wpisanie w konsolę 
`java -version`
https://www.oracle.com/java/technologies/downloads/#java8 

Node.js:\
https://nodejs.org/en/

#### Użyte technologii:

- Frontend: React.js
- Backend: Spring Boot (Java)
- Baza danych: MongoDB (znajdujące się w kontenerze dockera) 

## Uruchomienie serwera

1. Uruchomienie Docker Desktop
2. Z folderu głównego należy przejść do /auth-server-lz
3. Z wybranego folderu uruchomić polecenie `docker-compose up`
4. Z tego samego folderu uruchomić polecenie `java -jar auth-server-lz-0.0.1-SNAPSHOT.jar` (Serwer został zbudowany do pliku uruchomieniowego w celu prostrzego uruchomienia)
5. Podgląd bazy danych będzie znajdował się pod adresem http://localhost:8081 (Baza danych oraz odpowiednia kolekcja zostaną utworzone dopiero po rejestracji pierwszego użytkownika)

## Uruchomienie aplikacji frontendowej

1. Przejście do folderu głównego projektu.
2. Uruchomienie z konsoli polecenia `yarn install && yarn start`
3. Jeśli podczas instalacji Node.js nie został doinstalowane menedżer pakietów Yarn, należy wpisać polecenie `npm install && npm start`
3. Aplikacja powinna uruchomić się automatycznie w przeglądarce pod adresem http://localhost:3000


