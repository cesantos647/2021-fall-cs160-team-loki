# 2021-fall-cs160-team-loki
Fall 2021 CS 160 Team Loki


To Begin:
- Do an 'npm install' to get all of the necessary node_module folders
- Change the MongoDB URI in config/keys.example.js and rename to config/keys.js
- To run, do 'nodemon run server'. If you don't have nodemon, do 'sudo npm install -g nodemon' first

To Deploy Backend Application onto Heroku:
- Need Heroku cli and Docker installed
- `heroku login`
- `docker login --username=<username> --password=<password>`
- `heroku container:login`
- `heroku git:remote -a teamloki-savnac` * Connect to the heroku repository *
- `heroku container:push web` * Push backend iamge to repository *
- `heroku container:release web` * Deploy backend image on Heroku *

To Deploy Frontend Application onto Heroku:
- Need Heroku cli and Docker installed
- `cd client` * change directory to client folder *
- In package.json, change proxy value fomr `http://localhost:5000` to `https://teamloki-savnac.herokuapp.com/`
- `heroku login`
- `docker login --username=<username> --password=<password>`
- `heroku container:login`
- `heroku git:remote -a teamloki-savnac-frontend` * Connect to the heroku repository *
- `heroku container:push web` * Push backend iamge to repository *
- `heroku container:release web` * Deploy backend image on Heroku *