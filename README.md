# API Documentation

[![Maintainability](https://api.codeclimate.com/v1/badges/d9d450333b0f06f4ceca/maintainability)](https://codeclimate.com/github/Lambda-School-Labs/wowo-be/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d9d450333b0f06f4ceca/test_coverage)](https://codeclimate.com/github/Lambda-School-Labs/wowo-be/test_coverage)

## Backend deployed at [Heroku](https://pt6-wowo.herokuapp.com/)

## 1️⃣ Getting started

To get the server running locally:

- Clone this repo
- Install PostgresSQL then **createdb databasePG**
- **npm install** to install all required dependencies
- **npm run server** to start the local server
- **npm run test** to start server using testing environment

### Backend Framework

Server Uses PostgresSQL, Express and Knex.

## 2️⃣ Endpoints

The endpoints currently operational on the server are listed below.

### All Routes

| Method | Endpoint                   | Access Control              | Description                                                                |
| ------ | -------------------------- | --------------------------- | -------------------------------------------------------------------------- |
| POST   | `/auth/RegisterClient`     | all users                   | Register for a client account.                                             |
| POST   | `/auth/RegisterWasher/:id` | users registered as washers | Register for a washer account.                                             |
| POST   | `/auth/login`              | all users                   | Login to an existing account.                                              |
| GET    | `/carsPG/makes`            | all users                   | Returns all car makes.                                                     |
| POST   | `/carsPG/models`           | all users                   | Returns all car models for a given make.                                   |
| POST   | `/carsPG/getCarId`         | all users                   | Takes in make and model and returns carId.                                 |
| POST   | `/carsPG/addACar`          | all users                   | Takes in userId, carId, color and license plate, ties car to user profile. |
| POST   | `/jobs/new`                | all users                   | Creates a new job.                                                         |
| GET    | `/jobs/available/:id`      | all users                   | Returns all jobs with washerId null (new available jobs).                  |
| GET    | `/jobs/jobInfo/:id`        | all users                   | Returns all job info for given jobId                                       |
| PUT    | `/jobs/selectJob/:id`      | all users                   | Adds the washer to a job.                                                  |
| DELETE | `/jobs/job/:id`            | all users                   | Deletes Job by Job ID                                                      |
| PUT    | `/jobs/job/:id`            | all users                   | Edits Job by Job ID                                                        |
| GET    | `/jobs/user/:id`           | all users                   | Gets Jobs by User ID                                                       |
| POST   | `/ratings/washerAverage`   | all users                   | Returns average rating for a washer.                                       |
| POST   | `/ratings/clientAverage`   | all users                   | Returns average rating for a client.                                       |
| POST   | `/ratings/rateWasher`      | all users                   | Add a washer rating.                                                       |
| POST   | `/ratings/rateClient`      | all users                   | Add a client rating.                                                       |
| GET    | `/users/`                  | all users                   | View all users.                                                            |
| GET    | `/users/:id`               | all users                   | View a user by id.                                                         |
| DELETE | `/users/:id`               | all users                   | Remove a user.                                                             |
| PUT    | `/users/:id`               | all users                   | Update a user.                                                             |

## Data Model

The `auth/registerClient` Endpoint need the following JSON information:

```#! json
{
  "email":"test@test.com",  --Required
  "firstName":"Test",       --Required
  "lastName":"Testerson",   --Required
  "password":"1234",        --Required
  "phoneNumber":"1234567890",
  "streetAddress":"1051 Market St",
  "streetAddress2":"APT 240",
  "city":"San Francisco",
  "State":"California",
  "zip":"94103",
  "profilePicture":"some url",
  "bannerImage":"some url"
}
```

The `auth/login` Endpoint needs the following JSON information:

```#! json
{
  "email":"test@test.con",
  "password":"1234"
}
```

The `auth/registerWasher` Endpoint needs the following JSON information. Must be registered as a washer to access:

```#! json
{
  "userId": 1,              --Required
  "workStatus": true,       --Defaults to false
  "rateSmall": 30,
  "rateMedium": 50,         --Required
  "rateLarge": 80,
  "aboutMe": "washer bio",
  "currentLoaction":"lat/lon string",
  "available": true,
}
```

The Car Models Endpoint needs the following JSON information:

```#! json
{
  "make":"Acura"
}
```

The GetCarId Endpoint needs the following JSON information:

```#! json
{
  "make":"Acura",
  "model":"Integra"
}
```

The AddACar Endpoint needs the following JSON information:

```#! json
{
  "id":1,
  "carId":42,
  "color":"beige",
  "licensePlate":"542-EXF"
}
```

The `jobs/new` Endpoint needs the following JSON information:

```#! json
{
        "washAddress": "42 Wallaby Way Sydney",      --Required
        "scheduled": true,                        --Defaults to true
        "completed": false,                       --Defaults to false
        "paid": false,                            --Defaults to false
        "clientId": 4,                            --Represents the user's ID
        "washerId": null,
        "creationDate": "2020-04-29T22:59:51.775-04:00",   --Required Auto Generated from Database
        "carId": 1,                              --Represents the car ID
        "address": "123 First St",               --Required
        "address2": "APT 2",
        "jobLocationLat": null,
        "jobLocationLon": null,
        "city": "tampa",                        --Required
        "state": "FL",                          --Required
        "zip": "60184",                         --Required
        "notes": null,
        "jobType": "basic",                     --Required
        "photoBeforeJob": null,
        "photoAfterJob": null,
        "timeRequested": "12:00 PM",                --Required
        "timeCompleted": null
    }
```

The `jobs/available/:id` Endpoint needs the following JSON information:

ID in the URL/ URI

The `jobs/jobInfo/:id` Endpoint needs the following JSON information:

ID in the URL/ URI

The `jobs/selectJob/:id` Endpoint needs the following JSON information:

```#! json
{
  "washerID": 1  --Required
}
```

The `jobs/job/:id` Endpoint needs the following JSON information:

GET Requires ID in the URL/ URI

DELETE Requires ID in the URL/ URI

PUT Requires changes to the Job

```#! json
{
  "washAddress": "updated address"
}
```

The WasherAverage Endpoint needs the following JSON information:

```#! json
{
  "id":2
}
```

The ClientAverage Endpoint needs the following JSON information:

```#! json
{
  "id":1
}
```

The RateWasher Endpoint needs the following JSON information (with the exception of notes, which is not required):

```#! json
{
  "id":2,
  "rating":5,
  "notes":"This field is optional and takes a string >400 characters in length"
}
```

The RateClient Endpoint needs the following JSON information (with the exception of notes, which is not required):

```#! json
{
  "id":1,
  "rating":5,
  "notes":"This field is optional and takes a string >400 characters in length"
}
```

### USERS

---

```#! json
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

Tests are on the way and will be coded using Jest and Supertest for all of the endpoints, coming soon.

## 3️⃣ Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:

- PORT - set the port you wish the server to run on on your local machine
- JWT_SECRET - you can generate this by using a python shell and running import random''.join([random.SystemRandom().choice('abcdefghijklmnopqrstuvwxyz0123456789!@#\$%^&amp;*(-*=+)') for i in range(50)])

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

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
