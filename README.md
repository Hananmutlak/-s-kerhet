#  Auth API – Webbtjänst med JWT-autentisering

Detta är en RESTful webbtjänst byggd med Node.js, Express och SQLite3. Webbtjänsten möjliggör:

- Registrering av nya användarkonton
- Inloggning och autentisering med JSON Web Token (JWT)
- Åtkomst till skyddade resurser för inloggade användare

## Teknisk

- **Backend:** Node.js + Express
- **Databas:** SQLite3 med Knex.js
- **Autentisering:** JWT + bcryptjs för säkra lösenord
- **Miljövariabler:** dotenv
- **CORS:** Tillåter frontend att kommunicera med backend


##  Installation

1.
   git clone https:https://github.com/Hananmutlak/-s-kerhet.git
## INSTALLERA 
-NPM INSTALL
## SKAPA MIN .ENV FIL
## STARTA SERVERN 
-NPM START
## FUNKTIONALITET
-POST OCH ANVÄNDE REQISTER  SÅ REQUEST BLIR 

{
  "username": "användarnamn",
  "password": "lösenord"
}
- RESPONSE BLIR
- {
  "id": 1

}
##Säkerhetsåtgärder
-LÖSENORD HASHADE MED BCRYPTJS
-cors aktiv till kommuniktion med fronted
-jwt använda för hantering
## för APL
-Skapa nytt konto   register   post 
-logga in och ha jwt   login   post 
-skydda route          protected  get


## webbtänsten är 
https://s-kerhet.onrender.com/
