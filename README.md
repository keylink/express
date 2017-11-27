# Node.js + express + mongoDB + Passport simple CRUD app!

[![](http://www.aaronpeltz.com/assets/logo_node.png)](https://nodejs.org/)


## Official Docs
* [NodeJS ](https://nodejs.org/)
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
| express-fileupload | [express-fileupload](https://www.npmjs.com/package/express-fileupload) |
| mongoose-validate | [mongoose-validate](https://www.npmjs.com/package/mongoose-validate) |
| uuid | [uuid](https://www.npmjs.com/package/uuid) |

### Installation

This app requires [Node.js](https://nodejs.org/), [express.js](https://expressjs.com/en/guide/routing.html), [mongoDB](https://www.mongodb.com/), [mongoose.js](http://mongoosejs.com/docs/guide.html), [passport.js](http://www.passportjs.org/docs) install it before you run the application

## MongoDb installation .
* To Import and Export a MongoDB Database Open command line (Ctrl + Alt + T) if you use linux or write to navigation line on Windows (cmd) and write the command

to Import data to MongoDb use command


```sh
$ sudo mongoimport --db passport_local_mongoose_express4 --collection accounts --file accounts.json
```

you have to locate your file in this directory where you calling the command line


to export data from mongoDb use command

```sh
$ sudo mongoexport --db passport_local_mongoose_express4 -c accounts --out /home/accounts.json
```


- how to check that data exist in db use command

```sh
$ mongo
$ show dbs
$ use passport_local_mongoose_express4
$ show collections
$ db.accounts.find()
```

you can read more about the db in official docs [mongo](https://www.mongodb.com/)


### Install the dependencies and devDependencies and start the server.

```sh
$ cd express
$ npm install
$ npm start
```

#### open the browser at

```sh
localhost:3000
```

## TODO List for learn NodeJs technology

| Number | Description |
| ------ | ------ |
| 1 | Create functionality for delete image from folder in product page |
| 2 | Try to convert object before pass the values from server to client ( use library to decode text ) |
| 3 | Create design form product (Images looks very big on blocks with products) |
| 4 | Minimize code in project |
| 5 | Read official docs about technology |
| 6 | Add for all requests status with code & try to send Json objects from server to client |
| 7 | Create search form on page with products |

Enjoy! thank you.