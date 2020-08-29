# MERN-PROJECT-BACKEND

KLOUT

Ironhack project at end of module 3 of Barcelona Full Stack Web Development Part Time March 2020

# Developers:

- [Chus Santana](https://github.com/chusantana/)

# Link to App:

https://klout.one

## Description

It is a social media application that will allow you to control your online presence. It will measure your influence and give you a unified view of all your social media accounts. Presence, reach, interaction of the publications, make a ranking of punctuation compared to your friends on social networks

## MVP

The user registers and links his social networks.
View reports of your presence, reach and interaction of your social networks

## Epics / User Stories

- App

  - **homepage start** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
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

  - **profile** - 
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
    - username
    - name
    - email
    - password
```


## Models

```
User model

- username: String
- email: String
- name: String
- password: String
- image: String
 

```

```
Network model

  facebook: {
    - username: String
    - password: String
  }

  twitter: {
    - username: String
    - password: String
  }

  instagram: {
    - username: String
    - password: String
  }

  user: User id

```
Report model

Ranking model



## Links

### GitHub Reapository

The url to your repository and to your deployed project

- [Repository Link Frontend] (https://github.com/jesussantana/MERN-PROJECT-FRONTEND)
- [Repository Link Backend] (https://github.com/jesussantana/MERN-PROJECT-BACKEND)

- [Deploy Link]()

### Wireframe

- [Wireframe Link](https://excalidraw.com/#json=5083460385374208,A_crmZXs0-GzenOPz1zLBw)

### Agile Board

- [Trello Link](https://trello.com/b/Nkjk9Np1/klout)

### Slides

The url to your presentation slides

[Slides Link]()
