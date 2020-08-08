# MERN-PROJECT-BACKEND

BRANDDED - SCORE - REACH - SCOPE - RANGE

Ironhack project at end of module 3 of Barcelona Full Stack Web Development Part Time March 2020

# Developers:

- [Chus Santana](https://github.com/chusantana/)

# Link to App:

## Description

It is a social media application that will allow you to control your online presence. It will measure your influence and give you a unified view of all your social media accounts. Presence, reach, interaction of the publications, make a ranking of punctuation compared to your friends on social networks

## Epics / User Stories

- Website

  - **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
  - **about** - As a user I want to be know who are rear this project and know how to contact if I have a problem
  - **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
  - **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault

- Authentication

  - **signup** - As a user I want to sign up on the application so that I can trade with my money
  - **login** - As a user I want to be able to log in on the application so that I can get back to my account
  - **logout** - As a user I want to be able to log out from the application so that I can make sure no one will access my account

- Applicaction

  - **dashboard** - As a logged user I want to trade whit global exchange markets like NASDAQ, IBEX35 or CryptoMoney
  - **trade** - As a user I want trade with investments, buy or selling in the market.
  - **wallet** - As a user I want to work and know all the information of my money and my investments.

- Reports

  - **markets** - As a user I want to see all information in trade and cryptocurrency markets.
  - **transactions** - As a user I want to see all the transaction I made.

- Utilities

  - **profile** - As a user I want to see and update all information refered to me.
  - **support** - As a user I want te see and crete suppor tickets.
  - **log** - As a user I want to see all my activity in application.

## Backlog

List of other features outside of the MVPs scope

REAL Transactions

## ROUTES:

| Method | URL         | Description                                              |
| ------ | ----------- | -------------------------------------------------------- |
| GET    | /           | Renders index                                            |
| GET    | /about      | Renders about                                            |
| GET    | /auth/login | Redirects to /app/ if user logged in. Renders auth/login |
| POST   | /auth/login | Redirects to /app/ if user logged in.                    |

```
body:
    - username
    - password
```

| Method | URL          | Description                                               |
| ------ | ------------ | --------------------------------------------------------- |
| POST   | /auth/logout | Reditect to /                                             |
| GET    | /auth/signup | Redirects to /app/ if user logged in. Renders auth/signup |
| POST   | /auth/signup | Redirects to /app/ if user logged in. Redirect auth/login |

```
body:
    - name
    - email
    - password
```

| Method | URL         | Description                                                        |
| ------ | ----------- | ------------------------------------------------------------------ |
| GET    | /app/       | Redirects to /auth/login/ if user not logged in. Renders dashboard |
| GET    | /app/wallet | Redirects to /auth/login/ if user not logged in. Renders wallet    |
| GET    | /app/wallet | Redirects to /auth/login/ if user not logged in. Renders wallet    |

| Method | URL                                | Description                                                               |
| ------ | ---------------------------------- | ------------------------------------------------------------------------- |
| GET    | /app/trade                         | Redirects to /auth/login/ if user not logged in. Renders app/trade/index  |
| GET    | /app/trade/buy                     | Redirects to /auth/login/ if user not logged in. Renders app/trade/trade  |
| GET    | /app/trade/buy/:type/:symbol-:name | Redirects to /auth/login/ if user not logged in. Renders app/trade/trade  |
| POST   | /app/trade/buy                     | Redirects to /auth/login/ if user not logged in. Redirect app/trade/index |

```
body:
    - symbolCode
    - symbolName
    - type
    - units
    - price
```

| Method | URL                                        | Description                                                               |
| ------ | ------------------------------------------ | ------------------------------------------------------------------------- |
| GET    | /app/trade/sell/:type/:units/:symbol-:name | Redirects to /auth/login/ if user not logged in. Renders app/trade/trade  |
| POST   | /app/trade/sell                            | Redirects to /auth/login/ if user not logged in. Redirect app/trade/index |

```
body:
    - symbolCode
    - symbolName
    - type
    - units
    - price
```

| Method | URL       | Description                                                              |
| ------ | --------- | ------------------------------------------------------------------------ |
| GET    | /app/user | Redirects to /auth/login/ if user not logged in. Renders app/user/index  |
| POST   | /app/user | Redirects to /auth/login/ if user not logged in. Redirect app/user/index |

```
body:
    - name
    - email
    - password
    - imgPath
    - imgName
    - occupation
    - adress
    - city
    - country
    - postalCode
    - about
```

| Method | URL                 | Description                                                                 |
| ------ | ------------------- | --------------------------------------------------------------------------- |
| GET    | /app/transactions   | Redirects to /auth/login/ if user not logged in. Renders app/transactions   |
| GET    | /app/markets        | Redirects to /auth/login/ if user not logged in. Renders app/markets        |
| GET    | /app/support        | Redirects to /auth/login/ if user not logged in. Renders app/support/list   |
| GET    | /app/support/ticket | Redirects to /auth/login/ if user not logged in. Renders app/support/ticket |
| POST   | /app/support/ticket | Redirects to /auth/login/ if user not logged in. Redirect app/support       |

```
body:
    - name
    - email
    - subject
    - message
```

## Models

User model

Nerworks model

```
User model
{
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  imgPath: { type: String },
  imgName: { type: String },
  occupation: { type: String },
  adress: { type: String },
  city: { type: String },
  country: { type: String },
  postalCode: { type: String },
  about: { type: String },
}
```

```
Wallet model
{
  user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  movements: [
    {
      date: { type: Date, required: true },
      type: {
        type: String,
        enum: ['deposit', 'widthdraw', 'buy', 'sell'],
        required: true,
      },
      amount: { type: Number, required: true },
    },
  ],
}
```

```
Stock model
{
  user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
  symbol: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, enum: ['stock', 'crypto'], required: true },
  units: { type: Number, required: true },
}
```

```
Transaction model
{
  date: { type: Date, required: true },
  user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
  stock: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Stock',
    required: true,
  },
  type: { type: String, enum: ['buy', 'sell'], required: true },
  units: { type: Number, required: true },
  price: { type: Number, required: true },
}
```

```
Support model
{
  user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String },
  message: { type: String },
  status: { type: String, required: true },
}
```

```
Log model
{
  date: { type: Date, required: true },
  user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
}
```

## Links

### GitHub Reapository

The url to your repository and to your deployed project

- [Repository Link Frontend] (https://github.com/jesussantana/MERN-PROJECT-FRONTEND)
- [Repository Link Backend] (https://github.com/jesussantana/MERN-PROJECT-BACKEND)

- [Deploy Link]()

### Wireframe

- [Wireframe Link](https://excalidraw.com/#json=5756475787968512,giKZUdwBx2-XYlq2FVzCkA)

### Agile Board

- [Trello Link]()

### Slides

The url to your presentation slides

[Slides Link]()
