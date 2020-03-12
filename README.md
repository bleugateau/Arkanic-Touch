## Arkanic (Proof of Concept)
This is a reproduction of the game server of the mobile game Dofus Touch (Ankama) in NodeJs with ES6.
Stars repos for more :heart:

![Arkanic Touch Emulator](https://i.gyazo.com/6304eb72c61cb358737ad8c6787a6fd7.png)

## Installation

 1. Install dependencies:

For npm:
> npm install

If you use yarn
> yarn install

 2. Install database in MySQL server.
 3. Configure file config/config.js with your MYSQL informations
 4. If you have change AUTH_PORT value in config/config.js you need to change this line in config/config.json:

actual:

    "dataUrl": "http://localhost:3000",  
    "haapi": {  
      "id": 18,  
      "url": "https://haapi.ankama.com/json/Ankama/v2",  
      "url": "http://localhost:3000/haapi",  
      "hostname": "ankama.com"  
    },


 by 

    "dataUrl": "http://localhost:YOUR AUTH PORT",  
    "haapi": {  
      "id": 18,  
      "url": "https://haapi.ankama.com/json/Ankama/v2",  
      "url": "http://localhost:YOUR AUTH PORT/haapi",  
      "hostname": "ankama.com"  
    },

5. Now you can run the server:

For yarn:
> yarn build

For npm:
>npm build