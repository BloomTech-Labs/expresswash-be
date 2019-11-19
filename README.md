# API Documentation

#### 1️⃣ Backend delpoyed at [🚫name service here](🚫add URL here) <br>

## 1️⃣ Getting started

To get the server running locally:

🚫 adjust these scripts to match your project

- Clone this repo
- **npm install** to install all required dependencies
- **npm run server** to start the local server
- **npm run test** to start server using testing environment

### Backend framework goes here

Server Uses SQLite3, Express and Knex.

-    Postgres Migration in process

## 2️⃣ Endpoints

The endpoints currently operational on the server are RegisterWasher, RegisterClient, and Login (located on the branch /auth/).

#### Organization Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| POST   | `/auth/RegisterClient`  | all users      | Register for a client account.               |
| POST   | `/auth/RegisterWasher`  | all users      | Register for a washer account.               |
| POST   | `/auth/login`           | all users      | Login to an existing account.                |

#### User Routes

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| GET    | `/auth/users/`          | all users           | Returns list of user accounts by email.            |
|        |                         |                     |                                                    |

# Data Model

The Register Washer and Client Endpoints need the following JSON information (with the exception of streetAddress2, which is not required):

{
	"email":"test@test.con",
	"firstName":"Test",
	"lastName":"Testerson",
	"password":"1234",
	"phoneNumber":"1234567890",
	"streetAddress":"1051 Market St",
	"streetAddress2":"APT 240",
	"city":"San Francisco",
	"State":"California", 
	"zip":"94103"
}

The Login User Endpoint needs the following JSON information:

{
	"email":"test@test.con",
	"password":"1234"
}


#### USERS

---

```
{
  id: UUID,
  email: STRING,
  first_name: STRING,
  last_name: STRING,
  password: STRING,
  phoneNumber: STRING,
  streetAddress: STRING,
  streetAddress2: STRING,
  city: STRING,
  state: STRING,
  zip: STRING,
  userType: STRING [ 'admin', 'washer', 'client' ],
}
```

## 2️⃣ Actions

Currently no actions are coded for the server.

Tests are coded using Jest and Supertest for all of the endpoints.

## 3️⃣ Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:
    
    *  PORT - set the port you wish the server to run on on your local machine
    *  JWT_SECRET - you can generate this by using a python shell and running import random''.join([random.SystemRandom().choice('abcdefghijklmnopqrstuvwxyz0123456789!@#\$%^&amp;*(-*=+)') for i in range(50)])
    
## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

 **If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**
 - Check first to see if your issue has already been reported.
 - Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
 - Create a live example of the problem.
 - Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes,  where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](https://github.com/Lambda-School-Labs/wowo-fe/blob/master/README.md) for details on the frontend of our project.

