# TaxRise Client and Task Managment Application

The API that supports the

## Features

- Create Admin or Client accounts and securly use these accounts with JSON Web Tokens.
- Admins can view all tasks and create/assign new tasks to Clients.
- Clients can view their assigned tasks and respond to their tasks by sending a message or updating the tasks's status.
- Clients will soon be able to upload file attachments for the Client and Admin to view.

## Tech

This frontend web application uses a number of open source projects to work properly. The Frontend technologies utilized are:

- [ReactJS] - HTML enhanced for web apps!
- [React Bootstrap] - UI boilerplate for modern web apps
- [JSON Web Tokens] - A way to securely transmit information between parties
- [UUID] - Tool to create unique ID's
- [Firebase] - Database used to store files

The Backend technologies utilized are:

- [Node.JS] - HTML enhanced for web apps!
- [Express.JS] - UI boilerplate for modern web apps
- [JSON Web Tokens] - A way to securely transmit information between parties
- [UUID] - Tool to create unique ID's
- [JSON Schema] - A JSON payload validation tool
- [Bcrypt] - A hashing tool to secure passwords
- [Mongoose] - A MongoDB object modeling tool

## How to Run the Project

This application requires [ReactJS](https://nodejs.org/) v18.2.0+ to run. To get a local copy up and running follow these steps:

### Clone Repos

1. Clone the frontend repo by enter the following in a CLI in your desired directory:

   ```sh
   git clone https://github.com/Bolmstead/taxrise-frontend.git
   ```

2. Clone the backend repo to a separate directory by entering the following in a CLI:

   ```sh
   git clone https://github.com/Bolmstead/taxrise-backend.git
   ```

### Library Installations

3. Install the libraries in each frontend and backend directories

   ```sh
   npm install
   ```

### Create a MondoDB Cluster

4. Create a [MongoDB](https://www.mongodb.com/) account and create your own cluster.
5. Create a MONGO_URI environment variable in your backend repository using your cluster's connection string as the value.

### Create Other Environment Variables in Backend Repository

6. If working in a local environment, set your NODE_ENV environment variable to "development". If working in production, set it to "production".
7. Set a JWT_SECRET environment variable to a secure key of your choice.

### Connect to Firebase

8. Create a [Firebase](https://firebase.google.com/) account and follow their provided steps in connecting with a React Application. In your frontend, set your FIREBASE_API_KEY, FIREBASE_MESSAGING_SENDER_ID, FIREBASE_APP_ID, and FIREBASE_MEASUREMENT_ID environment variables based on the information Firebase provides.

### Create Environment Variables in Frontend Repository

9. Set REACT_APP_ENV to either "development" or "production" depending on your environment.
10. Set REACT_APP_BACKEND_PORT to a port of your choice.

### Start your project

11. Run local servers in your frontend and backend repositories by running:

```sh
npm start
```

## Project Links

[Live Site](https://freebay.netlify.app/)
[https://github.com/Bolmstead/taxrise-frontend](https://github.com/Bolmstead/taxrise-frontend)
[https://github.com/Bolmstead/taxrise-backend](https://github.com/Bolmstead/taxrise-backend)

## Contact

Berkley Olmstead - olms2074@gmail.com - [Linkedin](https://www.linkedin.com/in/berkleyolmstead/)

[node.js]: http://nodejs.org
[React Bootstrap]: https://react-bootstrap.netlify.app/
[Express.JS]: http://expressjs.com
[ReactJS]: https://react.dev/
[JSON Web Tokens]: https://www.npmjs.com/package/jsonwebtoken
[UUID]: https://www.npmjs.com/package/uuid
[Bcrypt]: https://www.npmjs.com/package/bcrypt
[JSON Schema]: https://www.npmjs.com/package/jsonschema
[Mongoose]: https://www.npmjs.com/package/mongoose
[Firebase]: https://firebase.google.com/
