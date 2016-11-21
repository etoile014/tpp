# Enviroment
* Docker Container `node`(official)
(no dockerfile included)
* nginx server
(https reverse proxy required)

# Language
## Frontend
* html
* css
* js
* jquery
## Backend
* js
* Node.js
## Database
* sqlite3 (3.8.7.1-1)

# Initial contributers
Team TpP from enpit2 program, University of Tsukuba.

# Dependencies(npm)
* node
* express
* pm2
* body-parser
* sqlite3
* co
* sleep-async

# Usage
## temp or debug
`$ npm install`
`$ npm start server/api.js`
## production
`$ npm install`
`$ pm2 start server/api.js`

# Security
Required CSV file contains important personal information.
Do not expose server at plane/http socket when it comes to be production!

# License
None, just for educational use only now!
Maybe MIT.

# service
Twins like credit management system

