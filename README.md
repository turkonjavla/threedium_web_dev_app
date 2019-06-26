# Threedium Coding Test

Code test for Threedium

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure that you have the latest version of Node.js installed on your machine

```
[Node.js](https://nodejs.org/en/)
[Git](https://git-scm.com/)
```

### Installing

In order to run the app locally clone or download the app to your machine

```
git clone https://github.com/turkonjavla/threedium_web_dev_app.git
```

Go into the app folder

```
cd threedium_web_dev_app
```

Run the following command to install backend dependencies

```
npm install
```

Go to the client directory

```
cd client
```

Install frontend/react dependencies

```
npm install
```

Go back to app directory

```
cd ..
```

In order to run the server, sign up for a MongoDB Atlas account.
After signing up, create a new project, then create a cluster, create a user for that cluster.
Finally get the mongodb connection string by clicking connect => connect your application
Add the two env vars specified bellow to your .env file and change the username and password with the one you created for your cluster

```
MONGO_URI = 'your_mongo_uri_goes_here'
JWT_SECRET = 'threedium'
```

Finally type the following command to run the app

```
npm run dev
```

## Built With

* [Node.js](https://nodejs.org/en/)
* [Express.js](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)