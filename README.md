# API Documentation

[![Maintainability](https://api.codeclimate.com/v1/badges/d9d450333b0f06f4ceca/maintainability)](https://codeclimate.com/github/Lambda-School-Labs/wowo-be/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d9d450333b0f06f4ceca/test_coverage)](https://codeclimate.com/github/Lambda-School-Labs/wowo-be/test_coverage)

## Backend deployed at https://serverprod.expresswash.us

## 1️⃣ Getting started

To get the server running locally:

- Clone this repo
- Install PostgresSQL then **createdb wowo-dev**
- **npm install** to install all required dependencies
- **npm run server** to start the local server
- **npm run unit-test** to start server using testing environment

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
| GET    | `/users`                   | all users                   | View all users.                                                            |
| GET    | `/users/:id`               | all users                   | View a user by id.                                                         |
| PUT    | `/users/:id`               | all users                   | Update a user.                                                             |
| DELETE | `/users/:id`               | all users                   | Remove a user.                                                             |
| PUT    | `/users/rating/:id`        | all washers                 | Update rating of a user.                                                   |
| PUT    | `/users/washer/:id`        | all washers                 | Update washer.                                                             |
| PUT    | `/users/washer/rating/:id` | all users                   | Update rating of a washer.                                                 |
| GET    | `/users/available/:city`   | all users                   | Returns all Active Washers in given City.                                  |
| GET    | `/cars`                    | all users                   | Returns all car makes.                                                     |
| POST   | `/cars`                    | all users                   | Takes in make and model and returns carId.                                 |
| GET    | `/cars/:id`                | all users                   | Returns all car models for a given make.                                   |
| PUT    | `/cars/:id`                | all users                   | Takes in userId, carId, color and license plate, ties car to user profile. |
| PUT    | `/cars/:id`                | all users                   | Takes in userId, carId, color and license plate, ties car to user profile. |
| DELETE | `/cars/:id`                | all users                   | Takes in userId, carId, color and license plate, ties car to user profile. |
| POST   | `/jobs/new`                | all users                   | Creates a new job.                                                         |
| GET    | `/jobs/available/:id`      | all washers                 | Returns all jobs with washerId null (new available jobs).                  |
| GET    | `/jobs/jobInfo/:id`        | all users                   | Returns all job info for given jobId                                       |
| PUT    | `/jobs/selectJob/:id`      | all washers                 | Adds the washer to a job.                                                  |
| DELETE | `/jobs/job/:id`            | all users                   | Deletes Job by Job ID                                                      |
| PUT    | `/jobs/job/:id`            | all users                   | Edits Job by Job ID                                                        |
| GET    | `/jobs/user/:id`           | all users                   | Gets Jobs by User ID                                                       |
| GET    | `/jobs/washer/:id`         | all washers                 | Gets Jobs by Washer ID                                                     |
| POST   | `/images/profile/:id`      | all users                   | Posts profile image of user                                                |
| PUT    | `/images/profile/:id`      | all users                   | Edits profile image of user                                                |
| DELETE | `/images/profile/:id`      | all users                   | Delete profile image of user                                               |
| POST   | `/images/banner/:id`       | all users                   | Posts banner image of user                                                 |
| PUT    | `/images/banner/:id`       | all users                   | Edits banner image of user                                                 |
| DELETE | `/images/banner/:id`       | all users                   | Delete banner image of user                                                |
| POST   | `/images/before/:id`       | all washers                 | Posts before photo of job                                                  |
| POST   | `/images/after/:id`        | all washers                 | Posts after photo of job                                                   |

## Endpoint Details

---

### Auth Routes

The POST `/auth/registerClient` Endpoint takes the following JSON information:

```#! json
{
  "accountType":"client"                --Required  --String  --Must be "washer" or "client"
  "email":"test@test.com",              --Required  --String  --Must be Unique
  "firstName":"Test",                   --Required  --String
  "lastName":"Testerson",               --Required  --String
  "password":"12345678",                --Required  --String  --Min 8 characters
  "phoneNumber":"1234567890",                       --String
  "streetAddress":"1051 Market St",                 --String
  "streetAddress2":"APT 240",                       --String
  "city":"San Francisco",                           --String
  "State":"California",                             --String
  "zip":"94103",                                    --String
  "profilePicture":"some url",                      --String
  "bannerImage":"some url"                          --String
}
```

The POST `/auth/registerClient` Endpoint returns the following JSON information:

```#! json
{
  "message": "user created successfully", --String  --Success Message
    "token": "Auth token",                --String  --auto generated auth token
    "user": {                                       --New user Object
        "id": 1,                          --Int     --User Id
        "accountType": "client",          --String  --user's account type "washer/client"
        "email": "test@test.com",         --String  --Users Unique Email
        "firstName": "Test",              --String  --Users First Name
        "lastName": "Testerson",          --String  --Users Last Name
        "phoneNumber": "1234567890",      --String  --Phone Number
        "stripeUUID": null,               --String  --Stripe Id Unique Identifier
        "streetAddress": "1051 Market St",--String  --Street Address
        "streetAddress2": "APT 240",      --String  --Secondary address field
        "city": "San Francisco",          --String  --City
        "state": "CA",                    --String  --State --Max Length 2
        "zip": "94103",                   --String  --Zip code
        "profilePicture": "some url",     --String  --Url location of profile img
        "bannerImage": "some url",        --String  --Url location of banner img
        "creationDate": "date",           --String  --Timestamp auto generated
        "userRating": 4,                  --Float   --Current Users Rating
        "userRatingTotal": 1              --Int     --Number of ratings for user
    }
}
```

---

The POST `auth/login` Endpoint needs the following JSON information:

```#! json
{
  "email":"test@test.com",              --String  --Registered Email Address
  "password":"12345678"                 --String  --Users Password
}
```

The POST `/auth/login` Endpoint returns the following JSON information:

```#!json
{
  "token": "auth token",                  --String  --Generated Auth Token
    "user": {                                       --Logged In User Object
        "id": 26,                                   --User Id
        "accountType": "washer",                    --user's account type "washer/client"
        "email": "test@test.com",         --String  --Users Unique Email
        "firstName": "Test",              --String  --Users First Name
        "lastName": "Testerson",          --String  --Users Last Name
        "phoneNumber": "1234567890",      --String  --Phone Number
        "stripeUUID": null,               --String  --Stripe Id Unique Identifier
        "streetAddress": "1051 Market St",--String  --Street Address
        "streetAddress2": "APT 240",      --String  --Secondary address field
        "city": "San Francisco",          --String  --City
        "state": "CA",                    --String  --State --Max Length 2
        "zip": "94103",                   --String  --Zip code
        "profilePicture": "some url",     --String  --Url location of profile img
        "bannerImage": "some url",        --String  --Url location of banner img
        "creationDate": "date",           --String  --Timestamp auto generated
        "userRating": 4,                  --Float   --Current Users Rating
        "userRatingTotal": 1              --Int     --Number of ratings for user
        "washer": {                                 --Washer Object(only if registered as a washer)
          "userId": 26,                    --Int     --User's Id
          "workStatus": true,              --Boolean --If washer is available for work
          "rateSmall": "30.00",            --Float   --Washer price for small job
          "rateMedium": "50.00",           --Float   --Washer price for medium job
          "rateLarge": "75.00",            --Float   --Washer price for large job
          "aboutMe": "I am a washer",      --String  --Description of washer/Bio
          "currentLocationLat": "55.777",  --Float   --Current location latitude
          "currentLocationLon": "35.555",  --Float   --Current location longitude
          "washerRating": 3,               --Float   --Current washer rating
          "washerRatingTotal": 1           --Int     --Number of ratings for washer
        }
    }
}
```

---

The POST `/auth/registerWasher/:id` Endpoint needs the following JSON information:
Takes in a valid user id in the url and must be registered with the account type of "washer"

```#! json
{
  "workStatus": true,                           --Boolean --Defaults to false
  "rateSmall": "30.00",                         --Float
  "rateMedium": "50.00",            --Required  --Float
  "rateLarge": "75.00",                         --Float
  "aboutMe": "I am a washer",                   --String
  "currentLocationLat": "55.777",               --Float
  "currentLocationLon": "35.555",               --Float
}
```

The POST `/auth/registerWasher/:id` Endpoint returns the following JSON information:

```@!json
{
  "user": {                                       --Logged In User Object
        "id": 26,                                   --User Id
        "accountType": "washer",                    --user's account type "washer/client"
        "email": "test@test.com",         --String  --Users Unique Email
        "firstName": "Test",              --String  --Users First Name
        "lastName": "Testerson",          --String  --Users Last Name
        "phoneNumber": "1234567890",      --String  --Phone Number
        "stripeUUID": null,               --String  --Stripe Id Unique Identifier
        "streetAddress": "1051 Market St",--String  --Street Address
        "streetAddress2": "APT 240",      --String  --Secondary address field
        "city": "San Francisco",          --String  --City
        "state": "CA",                    --String  --State --Max Length 2
        "zip": "94103",                   --String  --Zip code
        "profilePicture": "some url",     --String  --Url location of profile img
        "bannerImage": "some url",        --String  --Url location of banner img
        "creationDate": "date",           --String  --Timestamp auto generated
        "userRating": 4,                  --Float   --Current Users Rating
        "userRatingTotal": 1              --Int     --Number of ratings for user
        "washer": {                                 --Washer Object
          "userId": 26,                   --Int     --User's Id
          "workStatus": true,             --Boolean --If washer is available for work
          "rateSmall": "30.00",           --Float   --Washer price for small job
          "rateMedium": "50.00",          --Float   --Washer price for medium job
          "rateLarge": "75.00",           --Float   --Washer price for large job
          "aboutMe": "I am a washer",     --String  --Description of washer/Bio
          "currentLocationLat": "55.777", --Float   --Current location latitude
          "currentLocationLon": "35.555", --Float   --Current location longitude
          "washerRating": 3,              --Float   --Current washer rating
          "washerRatingTotal": 1          --Int     --Number of ratings for washer
        }
    }
}
```

---

### Users routs

The GET `/users/` Endpoint returns the following array of JSON information:

```#!json
{
  [
    {
        "id": 1,                          --Int     --User Id
        "accountType": "client",          --String  --user's account type "washer/client"
        "email": "test@test.com",         --String  --Users Unique Email
        "firstName": "Test",              --String  --Users First Name
        "lastName": "Testerson",          --String  --Users Last Name
        "phoneNumber": "1234567890",      --String  --Phone Number
        "stripeUUID": null,               --String  --Stripe Id Unique Identifier
        "streetAddress": "1051 Market St",--String  --Street Address
        "streetAddress2": "APT 240",      --String  --Secondary address field
        "city": "San Francisco",          --String  --City
        "state": "CA",                    --String  --State --Max Length 2
        "zip": "94103",                   --String  --Zip code
        "profilePicture": "some url",     --String  --Url location of profile img
        "bannerImage": "some url",        --String  --Url location of banner img
        "creationDate": "date",           --String  --Timestamp auto generated
        "userRating": 4,                  --Float   --Current Users Rating
        "userRatingTotal": 1              --Int     --Number of ratings for user
    },
  ]
}
```

---

The GET `/users/:id` Endpoint returns the following JSON information:
Takes in a valid user id in the url.

```#!json
{
  "id": 1,                          --Int     --User Id
  "accountType": "client",          --String  --user's account type "washer/client"
  "email": "test@test.com",         --String  --Users Unique Email
  "firstName": "Test",              --String  --Users First Name
  "lastName": "Testerson",          --String  --Users Last Name
  "phoneNumber": "1234567890",      --String  --Phone Number
  "stripeUUID": null,               --String  --Stripe Id Unique Identifier
  "streetAddress": "1051 Market St",--String  --Street Address
  "streetAddress2": "APT 240",      --String  --Secondary address field
  "city": "San Francisco",          --String  --City
  "state": "CA",                    --String  --State --Max Length 2
  "zip": "94103",                   --String  --Zip code
  "profilePicture": "some url",     --String  --Url location of profile img
  "bannerImage": "some url",        --String  --Url location of banner img
  "creationDate": "date",           --String  --Timestamp auto generated
  "userRating": 4,                  --Float   --Current Users Rating
  "userRatingTotal": 1,             --Int     --Number of ratings for user
  "cars:[                           --Array   --Array of users cars
        {
            "carId": 3,
            "clientId": 3,
            "make": "ford",
            "model": "escort",
            "year": 1994,
            "color": "red",
            "licensePlate": "xyz123",
            "photo": "some url",
            "category": "car",
            "size": "small"
        },
        {
            "carId": 4,
            "clientId": 3,
            "make": "chevrolet",
            "model": "camaro",
            "year": 2010,
            "color": "blue",
            "licensePlate": "zyx321",
            "photo": "some url",
            "category": "car",
            "size": "medium"
        }
  ]
  "washer": {                                 --Washer Object(if user is registered as a washer)
    "userId": 26,                   --Int     --User's Id
    "workStatus": true,             --Boolean --If washer is available for work
    "rateSmall": "30.00",           --Float   --Washer price for small job
    "rateMedium": "50.00",          --Float   --Washer price for medium job
    "rateLarge": "75.00",           --Float   --Washer price for large job
    "aboutMe": "I am a washer",     --String  --Description of washer/Bio
    "currentLocationLat": "55.777", --Float   --Current location latitude
    "currentLocationLon": "35.555", --Float   --Current location longitude
    "washerRating": 3,              --Float   --Current washer rating
    "washerRatingTotal": 1          --Int     --Number of ratings for washer
  }
}
```

---

The PUT `/users/:id` Endpoint takes in any of the following JSON information:
Takes in a valid user id in the url.

```#!json
{
  "accountType": "client",          --String  --user's account type "washer/client"
  "firstName": "Test",              --String  --Users First Name
  "lastName": "Testerson",          --String  --Users Last Name
  "phoneNumber": "1234567890",      --String  --Phone Number
  "streetAddress": "1051 Market St",--String  --Street Address
  "streetAddress2": "APT 240",      --String  --Secondary address field
  "city": "San Francisco",          --String  --City
  "state": "CA",                    --String  --State --Max Length 2
  "zip": "94103",                   --String  --Zip code
  "profilePicture": "some url",     --String  --Url location of profile img
  "bannerImage": "some url",        --String  --Url location of banner img
}
```

The PUT `/users/:id` Endpoint returns the following JSON information:

```#!json
{
  "id": 1,                          --Int     --User Id
  "accountType": "client",          --String  --user's account type "washer/client"
  "email": "test@test.com",         --String  --Users Unique Email
  "firstName": "Test",              --String  --Users First Name
  "lastName": "Testerson",          --String  --Users Last Name
  "phoneNumber": "1234567890",      --String  --Phone Number
  "stripeUUID": null,               --String  --Stripe Id Unique Identifier
  "streetAddress": "1051 Market St",--String  --Street Address
  "streetAddress2": "APT 240",      --String  --Secondary address field
  "city": "San Francisco",          --String  --City
  "state": "CA",                    --String  --State --Max Length 2
  "zip": "94103",                   --String  --Zip code
  "profilePicture": "some url",     --String  --Url location of profile img
  "bannerImage": "some url",        --String  --Url location of banner img
  "creationDate": "date",           --String  --Timestamp auto generated
  "userRating": 4,                  --Float   --Current Users Rating
  "userRatingTotal": 1              --Int     --Number of ratings for user
}
```

---

The DELETE `/users/:id` Endpoint returns following JSON information:
Takes in a valid user id in the url.

```#!json
{
    "message": "The user has been successfully removed from the database"
}
```

---

The PUT `/users/rating/:id` Endpoint takes in the following JSON information:
Takes in a valid user id in the url.

```#!json
{
 "userRating": 4                    --Float --updates and averages automatically
}
```

The PUT `/users/rating/:id` Endpoint returns the following JSON information:

```#!json
{
  "id": 1,                          --Int     --User Id
  "accountType": "client",          --String  --user's account type "washer/client"
  "email": "test@test.com",         --String  --Users Unique Email
  "firstName": "Test",              --String  --Users First Name
  "lastName": "Testerson",          --String  --Users Last Name
  "phoneNumber": "1234567890",      --String  --Phone Number
  "stripeUUID": null,               --String  --Stripe Id Unique Identifier
  "streetAddress": "1051 Market St",--String  --Street Address
  "streetAddress2": "APT 240",      --String  --Secondary address field
  "city": "San Francisco",          --String  --City
  "state": "CA",                    --String  --State --Max Length 2
  "zip": "94103",                   --String  --Zip code
  "profilePicture": "some url",     --String  --Url location of profile img
  "bannerImage": "some url",        --String  --Url location of banner img
  "creationDate": "date",           --String  --Timestamp auto generated
  "userRating": 3.6667,             --Float   --Updated user rating
  "userRatingTotal": 2              --Int     --Number of ratings for user
}
```

---

The PUT `/users/washer/:id` Endpoint takes in any of the following JSON information:
Takes in a valid washer id in the url.

```#!json
{
  "workStatus": true,             --Boolean --If washer is available for work
  "rateSmall": "30.00",           --Float   --Rate for a small job
  "rateMedium": "50.00",          --Float   --Rate for a medium job
  "rateLarge": "75.00",           --Float   --Rate for a large job
  "aboutMe": "I am a washer",     --String  --Washer bio
  "currentLocationLat": "55.667", --Float   --Washer current location latitude
  "currentLocationLon": "35.553"  --Float   --Washer current location longitude
}
```

The PUT `/users/washer/:id` Endpoint returns the following JSON information:

```#!json
{
  "washerId": 2,                  --Int     --Washer Id
  "userId": 26,                   --Int     --User Id for washer
  "workStatus": true,             --Boolean --If washer is available for work
  "rateSmall": "30.00",           --Float   --Rate for a small job
  "rateMedium": "50.00",          --Float   --Rate for a medium job
  "rateLarge": "75.00",           --Float   --Rate for a large job
  "aboutMe": "I am a washer",     --String  --Washer bio
  "currentLocationLat": "55.667", --Float   --Washer current location latitude
  "currentLocationLon": "35.553", --Float   --Washer current location longitude
  "washerRating": 4,              --Float   --Washer's current rating
  "washerRatingTotal": 3,         --Int     --Number of ratings for the washer
}
```

---

The PUT `/users/washer/rating/:id` Endpoint takes in the following JSON information:
Takes in a valid washer id in the url.

```#!json
{
 "washerRating": 4                    --Float --updates and averages automatically
}
```

The PUT `/users/washer/rating/:id` Endpoint returns the following JSON information:

```#!json
{
  "washerId": 2                     --Int     --Washer Id
  "userId": 26,                     --Int     --User's Id
  "workStatus": true,               --Boolean --If washer is available for work
  "rateSmall": "30.00",             --Float   --Washer price for small job
  "rateMedium": "50.00",            --Float   --Washer price for medium job
  "rateLarge": "75.00",             --Float   --Washer price for large job
  "aboutMe": "I am a washer",       --String  --Description of washer/Bio
  "currentLocationLat": "55.777",   --Float   --Current location latitude
  "currentLocationLon": "35.555",   --Float   --Current location longitude
  "washerRating": 3,                --Float   --Updated washer rating
  "washerRatingTotal": 2            --Int     --Number of ratings for washer
}
```

---

The GET `/users/available/:city` Endpoint returns the following JSON information:
Takes a city name in the url.

```#!json
[
    {
        "id": 2,
        "accountType": "washer",
        "email": "chriswasher@test.com",
        "firstName": "chris",
        "lastName": "chris2",
        "phoneNumber": null,
        "stripeUUID": null,
        "streetAddress": null,
        "streetAddress2": null,
        "city": "tampa",
        "state": null,
        "zip": null,
        "profilePicture": "",
        "bannerImage": "",
        "creationDate": "2020-06-08T22:58:28.769-04:00",
        "userRating": null,
        "userRatingTotal": 1,
        "washerId": 1,
        "userId": 2,
        "workStatus": true,
        "rateSmall": null,
        "rateMedium": "50.00",
        "rateLarge": null,
        "aboutMe": null,
        "currentLocationLat": 55.67123,
        "currentLocationLon": -121.445511,
        "washerRating": null,
        "washerRatingTotal": 1
    }
]
```

---

### Cars routes

The GET `/cars/` Endpoint returns the following array of JSON information:

```#! json
[
  {
    "carId": 1,                     --Int     --Id of car object
    "clientId": 6,                  --Int     --Id of user
    "make": "ford",                 --String  --Make of car
    "model": "mustang",             --String  --Model of car
    "year": 1996,                   --Int     --Year of car
    "color": "blue",                --String  --Color of car
    "licensePlate": "xyz 123",      --String  --License plate number
    "photo": "some url",            --String  --Url address of photo of car
    "category": "car",              --String  --Type of car(car/suv/truck/van/etc.)
    "size": "small"                 --String  --Size of car(small/medium/large)
  }
]
```

---

The POST `/cars/` Endpoint takes in the following JSON information:

```#! json
{
  "clientId": 6,                  --Required  --Int     --Id of user
  "make": "ford",                 --Required  --String  --Make of car
  "model": "mustang",             --Required  --String  --Model of car
  "year": 1996,                   --Required  --Int     --Year of car
  "color": "blue",                --Required  --String  --Color of car
  "licensePlate": "xyz 123",      --Required  --String  --License plate number
  "photo": "some url",                        --String  --Url address of photo of car
  "category": "car",              --Required  --String  --Type of car(car/suv/truck/van/etc.)
  "size": "small"                 --Required  --String  --Size of car(small/medium/large)
}
```

The POST `/cars/` Endpoint returns the following JSON information:

```#! json
{
  "carId": 1,                     --Int     --Id of new car object
  "clientId": 6,                  --Int     --Id of user
  "make": "ford",                 --String  --Make of car
  "model": "mustang",             --String  --Model of car
  "year": 1996,                   --Int     --Year of car
  "color": "blue",                --String  --Color of car
  "licensePlate": "xyz 123",      --String  --License plate number
  "photo": "some url",            --String  --Url address of photo of car
  "category": "car",              --String  --Type of car(car/suv/truck/van/etc.)
  "size": "small"                 --String  --Size of car(small/medium/large)
}
```

---

The GET `/cars/:id` Endpoint returns the following JSON information:
Takes in a valid car id in the url.

```#! json
{
  "carId": 1,                     --Int     --Id of car object
  "clientId": 6,                  --Int     --Id of user
  "make": "ford",                 --String  --Make of car
  "model": "mustang",             --String  --Model of car
  "year": 1996,                   --Int     --Year of car
  "color": "blue",                --String  --Color of car
  "licensePlate": "xyz 123",      --String  --License plate number
  "photo": "some url",            --String  --Url address of photo of car
  "category": "car",              --String  --Type of car(car/suv/truck/van/etc.)
  "size": "small"                 --String  --Size of car(small/medium/large)
}
```

---

The PUT `/cars/:id` Endpoint takes in any of the following JSON information:
Takes in a valid car id in the url.

```#! json
{
  "make": "ford",                 --String  --Make of car
  "model": "mustang",             --String  --Model of car
  "year": 1996,                   --Int     --Year of car
  "color": "blue",                --String  --Color of car
  "licensePlate": "xyz 123",      --String  --License plate number
  "photo": "some url",            --String  --Url address of photo of car
  "category": "car",              --String  --Type of car(car/suv/truck/van/etc.)
  "size": "small"                 --String  --Size of car(small/medium/large)
}
```

The PUT `/cars/:id` Endpoint returns the following JSON information:

```#! json
{
  "carId": 1,                     --Int     --Id of new car object
  "clientId": 6,                  --Int     --Id of user
  "make": "ford",                 --String  --Make of car
  "model": "mustang",             --String  --Model of car
  "year": 1996,                   --Int     --Year of car
  "color": "blue",                --String  --Color of car
  "licensePlate": "xyz 123",      --String  --License plate number
  "photo": "some url",            --String  --Url address of photo of car
  "category": "car",              --String  --Type of car(car/suv/truck/van/etc.)
  "size": "small"                 --String  --Size of car(small/medium/large)
}
```

---

The DELETE `/cars/:id` Endpoint returns the following JSON information:
Takes in a valid car id in the url.

```#! json
{
    "message": "Successfully deleted 1 car"
}
```

---

### Jobs Routes

The POST `/jobs/new` Endpoint needs the following JSON information:

```#! json
{
  "washAddress": "42 Wallaby Way Sydney", --Required  --String  --Address of job(used to calculate jobLocationLat and jobLocationLon variables if none are provided with the request. Only works for US addresses.)
  "scheduled": true,                                  --Boolean --Defaults to true
  "completed": false,                                 --Boolean --Defaults to false
  "paid": false,                                      --Boolean --Defaults to false
  "clientId": 4,                          --Required  --Int     --Represents the user's ID
  "washerId": null,                                   --Int     --Represents Id of accepting washer
  "carId": 1,                             --Required  --Int     --Represents the car ID
  "address": "123 First St",              --Required  --String  --Address of Job
  "address2": "APT 2",                                --String  --Adress second line
  "jobLocationLat": null,                             --Float   --Latitude of job location
  "jobLocationLon": null,                             --Float   --Longitude of job location
  "city": "tampa",                        --Required  --String  --City of job location
  "state": "FL",                          --Required  --String  --State of job location
  "zip": "60184",                         --Required  --String  --Zip of job location
  "notes": null,                                      --String  --Additional notes or requests
  "jobType": "basic",                     --Required  --String  --Type of service(basic/premium/full)
  "photoBeforeJob": null,                             --String  --photo url of before job
  "photoAfterJob": null,                              --String  --photo url of after job
  "timeRequested": "12:00 PM",            --Required  --String  --Time requested for job
  "timeCompleted": null                               --String  --Time job was completed
  "dateScheduled": "05-30-1983"             --String  --Date the job was scheduled
  "timeArrrived": "12:00 PM"                --String  --Time arrived at the job
}
```

The POST `/jobs/new` Endpoint returns the following JSON information:

```#! json
{
  "jobId": 1,                               --Int     --New Job Id
  "washAddress": "42 Wallaby Way Sydney",   --String  --Address of job
  "scheduled": true,                        --Boolean --Defaults to true
  "completed": false,                       --Boolean --Defaults to false
  "paid": false,                            --Boolean --Defaults to false
  "clientId": 4,                            --Int     --Represents the user's ID
  "washerId": null,                         --Int     --Represents Id of accepting washer
  "carId": 1,                               --Int     --Represents the car ID
  "creationDate": "time stamp",             --String  --Time stamp of job creation
  "address": "123 First St",                --String  --Address of Job
  "address2": "APT 2",                      --String  --Adress second line
  "jobLocationLat": "38.132456",            --Float   --Latitude of job location(calculated by washAddress unless provided)
  "jobLocationLon": "-121.123654",          --Float   --Longitude of job location(calculated by washAddress unless provided)
  "city": "tampa",                          --String  --City of job location
  "state": "FL",                            --String  --State of job location
  "zip": "60184",                           --String  --Zip of job location
  "notes": null,                            --String  --Additional notes or requests
  "jobType": "basic",                       --String  --Type of service(basic/premium/full)
  "photoBeforeJob": null,                   --String  --photo url of before job
  "photoAfterJob": null,                    --String  --photo url of after job
  "timeRequested": "12:00 PM",              --String  --Time requested for job
  "timeCompleted": null                     --String  --Time job was completed
  "dateScheduled": "05-30-1983"             --String  --Date the job was scheduled
  "timeArrrived": "12:00 PM"                --String  --Time arrived at the job
}
```

---

The GET `/jobs/available/:id` Endpoint returns an array of the following JSON information:
Takes in a washer id in the url.

```!#json
[
   {
    "id": 5,                        --Int     --User's Id
    "accountType": "washer",        --String  --User's account type
    "email": "chris2@chris.com",    --String  --User's Email
    "firstName": "Chris2",          --String  --User's First Name
    "lastName": "Adams",            --String  --User's Last Name
    "phoneNumber": null,            --String  --User's Phone Number
    "stripeUUID": null,             --String  --Stipe Id
    "streetAddress": null,          --String  --User's Address
    "streetAddress2": null,         --String  --User's Address
    "city": "Kingman",              --String  --User/Job City
    "state": "AZ",                  --String  --User/Job State
    "zip": "86409",                 --String  --User/Job Zip
    "profilePicture": "",           --String  --User's profile url
    "bannerImage": "",              --String  --User's banner image
    "creationDate": "date created", --String  --Job creation Date
    "userRating": null,             --Float   --User's Rating
    "userRatingTotal": 1,           --Int     --Amount of ratings
    "jobId": 5,                     --Int     --Job Id
    "washAddress": "123 s street",  --String  --Address of job
    "scheduled": true,              --Boolean --Wether Job is scheduled
    "completed": false,             --Boolean --Wether Job is completed
    "paid": false,                  --Boolean --Wether Job is Paid
    "clientId": 2,                  --Int     --User Id for the Job
    "washerId": null,               --Int     --Populates with washer id when accepted
    "carId": 7,                     --Int     --Id of car for job
    "address": "123 main st",       --String  --Address of Job
    "address2": null,               --String  --Address of Job
    "jobLocationLat": null,         --Float   --Job location latitude
    "jobLocationLon": null,         --Float   --Job location Longitude
    "notes": null,                  --String  --Notes for job
    "jobType": "basic",             --String  --Type of service requested
    "photoBeforeJob": null,         --String  --Url of before photo
    "photoAfterJob": null,          --String  --Url of after photo
    "timeRequested": "12:00 PM",    --String  --Time requested for job
    "timeCompleted": null           --String  --Time of job completion
    "dateScheduled": "05-30-1983"             --String  --Date the job was scheduled
    "timeArrrived": "12:00 PM"                --String  --Time arrived at the job
  },
]
```

---

The GET `/jobs/jobInfo/:id` Endpoint returns the following JSON information:
Takes in a valid job id in the url.

```#!json
{
  "jobId": 1,                               --Int     --New Job Id
  "washAddress": "42 Wallaby Way Sydney",   --String  --Address of job
  "scheduled": true,                        --Boolean --Defaults to true
  "completed": false,                       --Boolean --Defaults to false
  "paid": false,                            --Boolean --Defaults to false
  "clientId": 4,                            --Int     --Represents the user's ID
  "washerId": null,                         --Int     --Represents Id of accepting washer
  "creationDate": "time stamp",             --String  --Time stamp of job creation
  "carId": 1,                               --Int     --Represents the car ID
  "address": "123 First St",                --String  --Address of Job
  "address2": "APT 2",                      --String  --Adress second line
  "jobLocationLat": null,                   --Float   --Latitude of job location
  "jobLocationLon": null,                   --Float   --Longitude of job location
  "city": "tampa",                          --String  --City of job location
  "state": "FL",                            --String  --State of job location
  "zip": "60184",                           --String  --Zip of job location
  "notes": null,                            --String  --Additional notes or requests
  "jobType": "basic",                       --String  --Type of service(basic/premium/full)
  "photoBeforeJob": null,                   --String  --photo url of before job
  "photoAfterJob": null,                    --String  --photo url of after job
  "timeRequested": "12:00 PM",              --String  --Time requested for job
  "timeCompleted": null                     --String  --Time job was completed
  "dateScheduled": "05-30-1983"             --String  --Date the job was scheduled
  "timeArrrived": "12:00 PM"                --String  --Time arrived at the job
}
```

---

The GET `/jobs/user/:id` Endpoint returns an array with the following JSON information:
Takes in a valid user id in the url.

```#!json
[
  {
    "jobId": 1,                               --Int     --Job Id
    "washAddress": "42 Wallaby Way Sydney",   --String  --Address of job
    "scheduled": true,                        --Boolean --Defaults to true
    "completed": false,                       --Boolean --Defaults to false
    "paid": false,                            --Boolean --Defaults to false
    "clientId": 4,                            --Int     --Represents the user's ID
    "washerId": null,                         --Int     --Represents Id of accepting washer
    "creationDate": "time stamp",             --String  --Time stamp of job creation
    "carId": 1,                               --Int     --Represents the car ID
    "address": "123 First St",                --String  --Address of Job
    "address2": "APT 2",                      --String  --Adress second line
    "jobLocationLat": null,                   --Float   --Latitude of job location
    "jobLocationLon": null,                   --Float   --Longitude of job location
    "city": "tampa",                          --String  --City of job location
    "state": "FL",                            --String  --State of job location
    "zip": "60184",                           --String  --Zip of job location
    "notes": null,                            --String  --Additional notes or requests
    "jobType": "basic",                       --String  --Type of service(basic/premium/full)
    "photoBeforeJob": null,                   --String  --photo url of before job
    "photoAfterJob": null,                    --String  --photo url of after job
    "timeRequested": "12:00 PM",              --String  --Time requested for job
    "timeCompleted": null                     --String  --Time job was completed
    "dateScheduled": "05-30-1983"             --String  --Date the job was scheduled
    "timeArrrived": "12:00 PM"                --String  --Time arrived at the job
  }
]
```

---

The GET `/jobs/washer/:id` Endpoint returns an array with the following JSON information:
Takes in a valid washer id in the url.

```#!json
[
  {
    "jobId": 1,
    "washAddress": "123 this way",
    "scheduled": true,
    "completed": false,
    "paid": false,
    "clientId": 1,
    "washerId": 2,
    "creationDate": "2020-06-11T22:47:14.545-04:00",
    "carId": 1,
    "address": "123 this way",
    "address2": null,
    "jobLocationLat": "38.238646",
    "jobLocationLon": "-84.547482",
    "city": "chicago",
    "state": "IL",
    "zip": "33612",
    "notes": null,
    "jobType": "basic",
    "photoBeforeJob": null,
    "photoAfterJob": null,
    "timeRequested": "asap",
    "timeCompleted": null
  }
]
```

---

The PUT `/jobs/selectJob/:id` Endpoint needs the following JSON information:
Takes in a valid job id in the url and assigns a washer to a job.

```#! json
{
  "washerID": 1  --Required --washer id to be assigned to job
}
```

The PUT `/jobs/selectJob/:id` Endpoint returns the following JSON information:

```#!json
{
  "jobId": 1,                               --Int     --Job Id
  "washAddress": "42 Wallaby Way Sydney",   --String  --Address of job
  "scheduled": true,                        --Boolean --Defaults to true
  "completed": false,                       --Boolean --Defaults to false
  "paid": false,                            --Boolean --Defaults to false
  "clientId": 4,                            --Int     --Represents the user's ID
  "washerId": 2,                            --Int     --Newly added washer Id
  "creationDate": "time stamp",             --String  --Time stamp of job creation
  "carId": 1,                               --Int     --Represents the car ID
  "address": "123 First St",                --String  --Address of Job
  "address2": "APT 2",                      --String  --Adress second line
  "jobLocationLat": null,                   --Float   --Latitude of job location
  "jobLocationLon": null,                   --Float   --Longitude of job location
  "city": "tampa",                          --String  --City of job location
  "state": "FL",                            --String  --State of job location
  "zip": "60184",                           --String  --Zip of job location
  "notes": null,                            --String  --Additional notes or requests
  "jobType": "basic",                       --String  --Type of service(basic/premium/full)
  "photoBeforeJob": null,                   --String  --photo url of before job
  "photoAfterJob": null,                    --String  --photo url of after job
  "timeRequested": "12:00 PM",              --String  --Time requested for job
  "timeCompleted": null                     --String  --Time job was completed
  "dateScheduled": "05-30-1983"             --String  --Date the job was scheduled
  "timeArrrived": "12:00 PM"                --String  --Time arrived at the job
}
```

---

The PUT `/jobs/job/:id` Endpoint any of the following in JSON information:
Takes in a valid job id in the url.

```#!json
{
  "washAddress": "42 Wallaby Way Sydney",   --String  --Address of job
  "scheduled": true,                        --Boolean --Defaults to true
  "completed": false,                       --Boolean --Defaults to false
  "paid": false,                            --Boolean --Defaults to false
  "clientId": 4,                            --Int     --Represents the user's ID
  "washerId": 2,                            --Int     --Newly added washer Id
  "carId": 1,                               --Int     --Represents the car ID
  "address": "123 First St",                --String  --Address of Job
  "address2": "APT 2",                      --String  --Adress second line
  "jobLocationLat": null,                   --Float   --Latitude of job location
  "jobLocationLon": null,                   --Float   --Longitude of job location
  "city": "tampa",                          --String  --City of job location
  "state": "FL",                            --String  --State of job location
  "zip": "60184",                           --String  --Zip of job location
  "notes": null,                            --String  --Additional notes or requests
  "jobType": "basic",                       --String  --Type of service(basic/premium/full)
  "photoBeforeJob": null,                   --String  --photo url of before job
  "photoAfterJob": null,                    --String  --photo url of after job
  "timeRequested": "12:00 PM",              --String  --Time requested for job
  "timeCompleted": null                     --String  --Time job was completed
  "dateScheduled": "05-30-1983"             --String  --Date the job was scheduled
  "timeArrrived": "12:00 PM"                --String  --Time arrived at the job
}
```

The PUT `/jobs/job/:id` Endpoint returns following in JSON information:

```#!json
{
  "jobId": 1,                               --Int     --Job Id
  "washAddress": "42 Wallaby Way Sydney",   --String  --Address of job
  "scheduled": true,                        --Boolean --Defaults to true
  "completed": false,                       --Boolean --Defaults to false
  "paid": false,                            --Boolean --Defaults to false
  "clientId": 4,                            --Int     --Represents the user's ID
  "washerId": 2,                            --Int     --Newly added washer Id
  "creationDate": "time stamp",             --String  --Time stamp of job creation
  "carId": 1,                               --Int     --Represents the car ID
  "address": "123 First St",                --String  --Address of Job
  "address2": "APT 2",                      --String  --Adress second line
  "jobLocationLat": null,                   --Float   --Latitude of job location
  "jobLocationLon": null,                   --Float   --Longitude of job location
  "city": "tampa",                          --String  --City of job location
  "state": "FL",                            --String  --State of job location
  "zip": "60184",                           --String  --Zip of job location
  "notes": null,                            --String  --Additional notes or requests
  "jobType": "basic",                       --String  --Type of service(basic/premium/full)
  "photoBeforeJob": null,                   --String  --photo url of before job
  "photoAfterJob": null,                    --String  --photo url of after job
  "timeRequested": "12:00 PM",              --String  --Time requested for job
  "timeCompleted": null                     --String  --Time job was completed
  "dateScheduled": "05-30-1983"             --String  --Date the job was scheduled
  "timeArrrived": "12:00 PM"                --String  --Time arrived at the job
}
```

---

The DELETE `/jobs/job/:id` Endpoint returns following in JSON information:
Takes in a valid job id in the url.

```#! json
{
  "message": "Job has been deleted"
}
```

---

### Images Routes

The POST `/images/profile/:id` Endpoint needs the following Form-data information and takes a valid user id in the url:

```#!file
The Key needs to be `profilePicture`,
The Value file can only have the types of .jpeg or .png
```

The POST `/images/profile/:id` Endpoint returns the following JSON information with the hosted image url:

```#!json
{
    "id": 2,
    "accountType": "washer",
    "email": "testing@wowo.com",
    "firstName": "test",
    "lastName": "last test",
    "phoneNumber": null,
    "stripeUUID": null,
    "streetAddress": "123 nowhere",
    "streetAddress2": null,
    "city": "chicago",
    "state": "IL",
    "zip": "33612",
    "profilePicture": "https://wowo-images.s3.amazonaws.com/1589567300843",
    "bannerImage": "",
    "creationDate": "2020-05-15T14:23:16.122-04:00",
    "userRating": null,
    "userRatingTotal": 1
}
```

---

The PUT `/images/profile/:id` Endpoint needs the following Form-data information and takes a valid user id in the url:

```#!file
The Key needs to be `profilePicture`,
The Value file can only have the types of .jpeg or .png
```

The PUT `/images/profile/:id` Endpoint returns the following JSON information with the hosted image url:

```#!json
{
    "id": 2,
    "accountType": "washer",
    "email": "testing@wowo.com",
    "firstName": "test",
    "lastName": "last test",
    "phoneNumber": null,
    "stripeUUID": null,
    "streetAddress": "123 nowhere",
    "streetAddress2": null,
    "city": "chicago",
    "state": "IL",
    "zip": "33612",
    "profilePicture": "https://wowo-images.s3.amazonaws.com/1589567300843",
    "bannerImage": "",
    "creationDate": "2020-05-15T14:23:16.122-04:00",
    "userRating": null,
    "userRatingTotal": 1
}
```

---

The DELETE `/images/profile/:id` Endpoint needs a valid user id in the url and returns the following JSON information:

```#!json
{
  "message" "picture deleted successfully"
}
```

---

The POST `/images/banner/:id` Endpoint needs the following Form-data information and takes a valid user id in the url:

```#!file
The Key needs to be `bannerImage`,
The Value file can only have the types of .jpeg or .png
```

The POST `images/banner/:id` Endpoint returns the following JSON information with the hosted image url:

```#!json
{
    "id": 2,
    "accountType": "washer",
    "email": "testing@wowo.com",
    "firstName": "test",
    "lastName": "last test",
    "phoneNumber": null,
    "stripeUUID": null,
    "streetAddress": "123 nowhere",
    "streetAddress2": null,
    "city": "chicago",
    "state": "IL",
    "zip": "33612",
    "profilePicture": "",
    "bannerImage": "https://wowo-images.s3.amazonaws.com/1589567300843",
    "creationDate": "2020-05-15T14:23:16.122-04:00",
    "userRating": null,
    "userRatingTotal": 1
}
```

---

The PUT `/images/banner/:id` Endpoint needs the following Form-data information and takes a valid user id in the url:

```#!file
The Key needs to be `bannerImage`,
The Value file can only have the types of .jpeg or .png
```

The PUT `/images/banner/:id` Endpoint returns the following JSON information with the hosted image url:

```#!json
{
    "id": 2,
    "accountType": "washer",
    "email": "testing@wowo.com",
    "firstName": "test",
    "lastName": "last test",
    "phoneNumber": null,
    "stripeUUID": null,
    "streetAddress": "123 nowhere",
    "streetAddress2": null,
    "city": "chicago",
    "state": "IL",
    "zip": "33612",
    "profilePicture": "",
    "bannerImage": "https://wowo-images.s3.amazonaws.com/1589567300843",
    "creationDate": "2020-05-15T14:23:16.122-04:00",
    "userRating": null,
    "userRatingTotal": 1
}
```

---

The DELETE `/images/banner/:id` Endpoint needs a valid user id in the url and returns the following JSON information:

```#!json
{
  "message" "picture deleted successfully"
}
```

---

The POST `/images/job/before/:id` Endpoint needs the following Form-data information and takes a valid job id in the url:

```#!file
The Key needs to be `photoBeforeJob`,
The Value file can only have the types of .jpeg or .png
```

The POST `/images/job/before/:id` Endpoint returns the following JSON information with the hosted image url:

```#!json
{
    "jobId": 2,
    "washAddress": "123 this way",
    "scheduled": true,
    "completed": false,
    "paid": false,
    "clientId": 2,
    "washerId": null,
    "creationDate": "2020-05-15T14:42:34.168-04:00",
    "carId": 1,
    "address": "123 this way",
    "address2": null,
    "jobLocationLat": null,
    "jobLocationLon": null,
    "city": "chicago",
    "state": "IL",
    "zip": "33612",
    "notes": null,
    "jobType": "basic",
    "photoBeforeJob": "https://wowo-images.s3.amazonaws.com/1589568241194",
    "photoAfterJob": null,
    "timeRequested": "asap",
    "timeCompleted": null
}
```

---

The POST `/images/job/after/:id` Endpoint needs the following Form-data information and takes a valid job id in the url:

```#!file
The Key needs to be `photoAfterJob`,
The Value file can only have the types of .jpeg or .png
```

The POST `/images/job/after/:id` Endpoint returns the following JSON information with the hosted image url:

```#!json
{
    "jobId": 2,
    "washAddress": "123 this way",
    "scheduled": true,
    "completed": false,
    "paid": false,
    "clientId": 2,
    "washerId": null,
    "creationDate": "2020-05-15T14:42:34.168-04:00",
    "carId": 1,
    "address": "123 this way",
    "address2": null,
    "jobLocationLat": null,
    "jobLocationLon": null,
    "city": "chicago",
    "state": "IL",
    "zip": "33612",
    "notes": null,
    "jobType": "basic",
    "photoBeforeJob": null,
    "photoAfterJob": "https://wowo-images.s3.amazonaws.com/1589568241194",
    "timeRequested": "asap",
    "timeCompleted": null
}
```

---

The POST `/images/car/:id` Endpoint needs the following Form-data information and takes a valid car id in the url:

```#!file
The Key needs to be `photo`,
The Value file can only have the types of .jpeg or .png
```

The POST `/images/car/:id` Endpoint returns the following JSON information with the hosted image url:

```#!json
{
    "carId": 1,
    "clientId": 1,
    "make": "carmake",
    "model": "carmodel",
    "year": 1998,
    "color": "red",
    "licensePlate": "xyf 123",
    "photo": "https://wowo-images.s3.amazonaws.com/1590543592174",
    "category": "truck",
    "size": "small"
}
```

---

## 2️⃣ Actions

Github Actions are in place to run unit tests an update the code climate coverage.

## 3️⃣ Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:

LOCAL_DB_PASSWORD= Your local postgres database password
LOCAL_DB_DATABASE_DEV= Your local database name
LOCAL_DB_HOST= Your local database host
LOCAL_DB_PORT= Your local database port
LOCAL_DB_USER= Your local database username
JWT_SECRET= A string of your chosing for the web token encryption
STRIPE_SECRET=sk_test_TmP3OMa8RzmSvdwTxgvpDt4J000NX2dVjV
S3_IMAGES_SECRET_KEY
S3_IMAGES_SECRET_KEY_ID
S3_REGION

## Documentation

See [Frontend Documentation](https://github.com/Lambda-School-Labs/wowo-fe/blob/master/README.md) for details on the frontend of our project.
