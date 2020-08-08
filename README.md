# MERN-PROJECT-BACKEND

# Developers: 
Jesús Santana

# Link to App: 
https://escape-rooms-fm.herokuapp.com/auth/login

* use in mode mobile device at browser, iphone X prefered


## Description

An app where users create Escape room sessions.
 
## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
- **sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **events list** - As a user I want to see all escape-rooms event available so that I can choose which ones I want to do.
- **events create** - As a user I want I want create a new escape-room event.
- **event details** - As a user I want to see the event detail and so that I can decide if I want to join it.
- **event attend** - As a user I want to be able to attend to event so that the organizers can count me in.
- **escape-rooms list** - As a user I want to see which escape-rooms are available so I can explore them.

## Backlog

List of other features outside of the MVPs scope

User profile:
- see my profile
- upload my pictures and my description
- see other users profile
- search filters
- add friends to the event

Geo Location:
- add geolocation to events when creating
- show event in a map in event detail page
- show all events in a map in the event list page



## ROUTES:

|Method|URL|Description|
|---|---|---|
GET | /auth/login | redirects to / if user logged in. Renders auth/login
POST | /auth/login | redirects to / if user logged in

```
body:
    - username
    - password

```

GET | /auth/signup| redirects to / if user logged in. Renders auth/signup

```
body:
    - username
    - password
```
GET | / | renders the homepage. if the user is not logged in, render access. 
GET | /event/id | renders event-detail
POST | /event/id | update event. redirect /event-detail
```
body:
    - username
    - event id 
    - image
```
GET | /escape-room-list | renders escape-room-list
POST | /logout | redirects to /
GET | /escape-room-detail | renders escape-room-detail
POST | /escape-room/id | 
```
body:
    - username
    - escape-room
    - date
    - reserved time
    - escape-room id
```



## Models

```
User model
- username: String
- password: String
- image: String
- description: String
- escape-rooms: Array

```
```
EscapeRoom model
- name: String
- adress: String
- description: String
- schedule: enum
- date: 
- time: 
```
```
Event model
- escape-room: Object ID
- creator: Object ID
- date: 
- time: 
```
``` 

## Links


### Git

The url to your repository and to your deployed project

[Repository Link] (http://github.com)

[Deploy Link] ('https://escape-rooms-fm.herokuapp.com/ ')


### Slides

The url to your presentation slides

[Slides Link](http://slides.com)
