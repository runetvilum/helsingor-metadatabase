# helsingor-metadatabase
Script til at opdatere metadatabasen med poster fra et Excel fil.

Scriptet sletter først alle poster og opretter dem derefter fra Excel filen.

Installer nodejs

https://nodejs.org/en/

Installer GitHub Desktop

https://desktop.github.com/

Klon dette repository til lokal computer

Opret en konfigurationsfil config.json med indholdet:
```json
{
	"url": "http://brugernavn:password@geo.os2geo.dk/couchdb",
	"dbname": "db-066d1a39335d7a8560f936f75a6de0df"
}
```

Brugernavn skal urlencodes, f.eks.: rune@addin.dk bliver til rune%40addin.dk

dbname angiver databasen som skal opdateres.

Åben en terminal og gå til klonet bibliotek.

Installer afhængigheder:

    npm install
    
start scriptet:

    node index.js
    
Brug evt Visual Studio Code editor til at debugge.

https://code.visualstudio.com/Download

  
