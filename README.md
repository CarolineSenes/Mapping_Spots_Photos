Application qui permet de partager des spots photos et d'en découvrir d'autres.

Stack : React.js, Node.js/Express, MongoDB/mongoose, yarn
Lib : Mapbox, nodemon, dotenv, bcrypt

Roadmap :
Creating Node.js Express App (backend)
    init
    install lib : express, mongoose (https://mongoosejs.com/), nodemon, dotenv
    créer script nodemon : "start": "nodemon index.js"
    créer app dans index.js

Connecting MongoDB with Mongoose (backend)
    changer le nom de la database dans l'URL de connection

Creating Node.js Rest API
    créer dossiers models + ss/dossiers : Pin.js + User.js
        User.js : créer schéma
        Pin.js : créer schéma
    créer dossiers routes + ss/dossiers : pins.js + users.js
        pins.js : créer requêtes POST et GET + vérifier avec Postman
        users.js : créer requêtes POST pour register et login + vérifier avec Postman

Creating a React App
    yarn create react-app my-app

Using React Mapbox (gratuit jusqu'à 50 000 chargements : https://account.mapbox.com/)
    stocker le token de Mapbox dans .env sous en commençant par REACT_APP_ (nécessaire pour les app React)
    install lib : 
        react-map-gl (https://visgl.github.io/react-map-gl/docs/get-started/get-started),
    intégrer react-map-gl App.js (voir le Get Start)
    adapter taille de la map + coordonnées gps par defaut dans App.js

Creating Mapbox Marker
    install lib : 
        @mui/material @emotion/react @emotion/styled (https://mui.com/getting-started/installation/)
        @mui/material @mui/icons-material (https://mui.com/components/icons/)
    
    intégrer le marqueur de la position par defaut (https://visgl.github.io/react-map-gl/docs/api-reference/marker)
    appliquer une icône personnalisée et changer couleur (material ui)
    changer design carte (https://docs.mapbox.com/api/maps/styles/)

Creating Mapbox Popup
    intégrer moddule popup (https://visgl.github.io/react-map-gl/docs/api-reference/popup)
    personnaliser texte popup + css

React Fetching data from Node.js using Axios
    install lib : axios timeago.js (https://timeago.org/)
    appeller le backend depuis le front : ajouter proxy au package.json du front
    tester affichage d'un nouveau lieu en l'ajoutant dans MongoDB
    styliser pins perso et ceux des autres users

React Mapbox adding new Location
    ouvrir une popup au doubleclik pour ajouter un lieu
    styliser

React Post request using Axios


React Login and Register Page
    conditions d'affichage des boutons (si user connecté ou non)
    créer et intégrer les components register et login avec leur css : raccourcis pour React Functionnal Component "rfc"

Mern Stack Login and Register System
        Utiliser hook useRef pour récupérer les valeurs du form et les envoyer via axios à MongoDB

Using React Local Storage
    Récupérer le username dans le localstorage

React Logout System using Local Storage

