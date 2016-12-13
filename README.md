# Enviroment
* Docker Container `node`(official)
(no dockerfile included)
* nginx server
(ssl encryption required)

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
* body-parser
* sqlite3
* co
* sleep-async
* jschardet
* async

# Usage
## temp or debug
`$ npm install`
`$ npm start server/api.js`
## production(use pm2 in my case)
`$ npm install`
`$ pm2 start server/api.js`

# deploy including env
`docker run -it -d -p _host_port:80 -p _host_port:12000 -v /home/*****/:/share/ node`

# Security
Required CSV file contains important personal information.
Do not expose server at plane/http socket when it comes to be production!

# License
None, just for educational use only now!
Maybe MIT.

# service
Twins like credit management system

