# MERN-PROJECT-BACKEND

BRANDDED - SCORE - RANKING - REACH - SCOPE - RANGE

Ironhack project at end of module 3 of Barcelona Full Stack Web Development Part Time March 2020

# Developers:

- [Chus Santana](https://github.com/chusantana/)

# Link to App:

## Description

It is a social media application that will allow you to control your online presence. It will measure your influence and give you a unified view of all your social media accounts. Presence, reach, interaction of the publications, make a ranking of punctuation compared to your friends on social networks

## MVP

The user registers and links his social networks.
View reports of your presence, reach and interaction of your social networks

## Epics / User Stories

- Website

  - **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
  - **about** - As a user I want to be know who are rear this project and know how to contact if I have a problem
  - **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
  - **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault

- Authentication

  - **signup** - As a user I want to sign up on the application
  - **login** - As a user I want to be able to log in on the application
  - **logout** - As a user I want to be able to log out from the application so that I can make sure no one will access my account

- Applicaction Reports

  - **home** - 
  - **social profile** - 
  - **evolution** - 
  - **post** - 
  
- Applicaction Config

  - **add networks** - 
  - **link network** - 
  - **network account** - 
  - **post** - 
  - **top ranking** -

## Backlog

List of other features outside of the MVPs scope

REAL Transactions

## ROUTES:  POR DEFINIR

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

Networks model

Report model

Ranking model

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

## Links

### GitHub Reapository

The url to your repository and to your deployed project

- [Repository Link Frontend] (https://github.com/jesussantana/MERN-PROJECT-FRONTEND)
- [Repository Link Backend] (https://github.com/jesussantana/MERN-PROJECT-BACKEND)

- [Deploy Link]()

### Wireframe

- [Wireframe Link](https://excalidraw.com/#json=5083460385374208,A_crmZXs0-GzenOPz1zLBw)

### Agile Board

- [Trello Link]()

### Slides

The url to your presentation slides

[Slides Link]()
