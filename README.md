## Demo

link: [My site](http://mkeas.org/)

## How to Get Started

```bash
# First install dependencies
#
npm install

# If MongoDB is not installed on your machine 
# (You will need to edit this to install the latest version of MongoDB)
#
curl http://downloads.mongodb.org/linux/mongodb-linux-x86_64-x.y.z.tgz > mongo.tgz
tar -zxvf mongo.tgz
cp -R -n  mongodb-osx-20??-??-??/ mongodb

# run MongoDB
mongod &

# now modify ```config/config.js``` and enter necessary information.

# run this dude
sudo node app.js

# or if it floats your boat
npm install -g nodemon
sudo nodemon app.js
```

## About ```config/config.js```

Uses passport and passport-google for authentication, so admins are simply a list authenticated via Google whose Gmail address exists in the admins array from config.js

```
var config = {
  session_secret: "Your Session Key Random String To Use with Express",
  admins: ["myemail@gmail.com"],
  http_port: 80,
  google_return_url: 'http://<yoursite>/auth/google/return',
  root_url: 'http://<yoursite>',
  title: '<your site title>',
  DB_name: '<your MongoDB database name>',
  DB_ip: 'localhost',
  DB_port: 27017
};

exports.options = config;
```

Then you open a browser on [http://127.0.0.1:80/](http://127.0.0.1:80/) to see it running. Up to you to modify ```views/index.jade``` and associated CSS and Javascript until it fits your needs.

