# Books x People

Books x People is a little app where users can **add their book recomendations so others can read and discover** new things, specially during COVID-19 quarantine.

It's quite simple, really. It has an add book and a search book by tags functionality. It also has a detail view for each book, while the main booklist view looks like a bookshelf.

Initially, this was a code-along of [this GraphQL + React tutorial](https://www.youtube.com/playlist?list=PL4cUxeGkcC9iK6Qhn-QLcXCXPQUov1U7f) from @iamshaunjp. So thanks for the inspiration!



📁 

#### Download the project 

```
git clone https://github.com/mariasimo/Books-x-People
```



⚙️ 

#### Config the project

Project is divided in two main folders. Client and Server.

In order to start the project, you have to create a .env file at the server folder and write in it:

```
PORT=4000
DBSTR=<string-to-cloud-db-here>
DBLOCAL=<string-to-local-db-here>
MAILUSER='<mail-password-for-nodemailer-transport>
MAILPASS=<mail-password-for-nodemailer-transport>
```

**Note that you will need your own mail transport account in order to receive mails with the book submitted and moderate them as admin.*



Then, go to **client** folder and create a .env.dev file:

```
REACT_APP_GRAPHQL_URL=http://localhost:4000/graphql
REACT_APP_API_URL=http://localhost:4000/api
REACT_APP_URL=http://localhost:3000
```



🚀

#### Run the project

First, start the ***\*server\**** with one of these commands:

```node app.js
nodemon app.js
```



And then, start ***\*client\**** with command:

```
npm start
```

Ta-da! Go visit http://localhost:3000



 🏗

#### Built with

- GraphQL — https://graphql.org/
- MongoDB & Mongoose — https://www.mongodb.com/
- Node js — https://github.com/nodejs/node
- Express — https://github.com/expressjs/express
- Nodemailer — https://www.npmjs.com/package/nodemailer
- React (create-react-app) — https://github.com/facebook/react
- Apollo — https://www.apollographql.com
- Sass — https://github.com/sass/node-sass
-  Axios — https://github.com/axios/axios



✌🏽

#### Contributions and feedback

This project is made for the only purpose of learning. 

As next implementations, I intend to add animated transitions to pages, add redux, new features with tags and unit testing.

Please feel free to use this repo for your own evil plans. Any comments, feedback or contributions will be very much appreciated 

🛎

#### Changelog

- [x] Allow user to add new tags to list at AddBook.js

- [x] Being able to moderate new tags via nodemailer

- [x] Being able to delete unwanted books and tags

- [x] Sharing options

- [ ] Btn hover effect

- [ ] Footer

- [ ] Getting book from the shelf effect

- [ ] Animate transitions between pages

- [ ] Get width of book for the number of pages

  
