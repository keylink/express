# Node.js + express + mongoDB + Passport simple CRUD app!

[![N|Solid](https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwiI--2Y7s7XAhXoYZoKHbXNAlYQjRwIBw&url=https%3A%2F%2Fsdtimes.com%2Fnode-js-5-0-arrives%2F&psig=AOvVaw2fPGE9yhm3jZ8xEB0b8ueF&ust=1511325976110230)](https://nodesource.com/products/nsolid)


## Official Docs
* [NodeJS](https://nodejs.org/)
* [Express](https://expressjs.com/en/guide/routing.html)
* [MongoDB](https://www.mongodb.com/)
* [mongoose.js](http://mongoosejs.com/docs/guide.html)
* [passport.js](http://www.passportjs.org/docs)

### Plugins

This Application is currently extended with the following plugins. Instructions on how to use them in your own application are linked below.

| Plugin | LINK |
| ------ | ------ |
| Express | [Express](https://www.npmjs.com/package/express) |
| mongoose | [mongoose](https://www.npmjs.com/package/mongoose) |
| passport.js | [passport](https://www.npmjs.com/package/passport) |

### Installation

This app requires [Node.js](https://nodejs.org/), [express.js](https://expressjs.com/en/guide/routing.html), [mongoDB](https://www.mongodb.com/), [mongoose.js](http://mongoosejs.com/docs/guide.html), [passport.js](http://www.passportjs.org/docs)

##MongoDb installation .
* To Import and Export a MongoDB Database Open command line (Ctrl + Alt + T) if you use linux or write to navigation line on Window (cmd) and write the command

to Import data to MongoDb use command


```sh
$ sudo mongoimport --db passport_local_mongoose_express4 --collection accounts --file accounts.json
```

you have to locate your file in this directory where you calling the command line

to export data from mongoDb use command

```sh
$ sudo mongoexport --db passport_local_mongoose_express4 -c accounts --out /home/accounts.json
```

### how to check that data exist in db use command

```sh
$ mongo
$ show dbs
$ use passport_local_mongoose_express4
$ show collections
$ db.accounts.find()
```

you can read more about the db in official docs [mongo](https://www.mongodb.com/)


## Install the dependencies and devDependencies and start the server.

```sh
$ cd express
$ npm install
$ npm start
```

## open the browser at

```sh
localhost:3000
```

Enjoy! thank you.