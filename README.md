# About the project
The web application is a social network where developers can share their details like expirience company they work for and even showcase their work by connecting their github repo to the website. People visiting the website can post comments and like the other people post. There is a single user associated to every profile on the basis of their email. This webapp similar to facebook but relates to developers.

Database: mongodb, moongose object document mapper.

Total three schemas a) User: Contain name, email, password and avatar i.e the picture from the email address is automatically added as their profile picture. If no pic is available a default avatar is added if there are some nudes in the profile picture of the email address it is automatically excluded.

b)Profile: This refers to a particular user that is already registered.Apart from that other fields are company, skills, website, location, status, bio, githubusername. Experience: it is an array of objects with different fields related to expirience, data for this field is not mandatory so backend validation is not performed. Education: it is an array of objects with different fields related to education, data for this field is not mandatory so backend validation is not performed. Social: Contain field like facebook, linkedin etc.

c) Posts: This refers to a particular user it has fields like comments, like. A user makes a post his avatar, name, and text post are visible.

Backend: Express, jwt authentication, bycrypt, express-validator , gravatar, config.

Protected routes: In backend some routes are private and others public which is done by using json web token where the user id is sent as a payload through headers. This is done in auth middleware. To make a route private the auth middleware is called in router.get , post or delete.

Routes User: This is a public route to perform user registration for the first time all the fields except avatar are required so backend validation are performed by using express-validator. Salting and hashing of the password is done by using bycrypt. Accessing the email photo is done using gravatar. Jwt sign in to pass the payload using jsonwebtoken. This is a post route.

Routes Profile: a) To get the profile of registered and signed in user this is a private route. b) To create or update profile wis a private route and validation is performed on the backend for the fields that are mentioned as required in the moongoose schema. Though not all fields are required. c) This route gets the profile information of all users it is a public route this info is visible to anyone visiting the website. d) This route gets the user profile on basis of the user id it is a public route. e) This route deletes the profile as well as the user and the posts it is a private route. f) This route updates the expirience array of objects in moongose schema it is a put route and private. g) This route deletes the user expirience. h) This route is exactly same as expirience it is used to update and delete user education both is private route one is put other is delete. i) This route is a private to get the github repo on the basis of the githubusername it is done using the github api.

Routes Post: a) There are two get routes and both public to get the post of all users and by user id. b) This is a post route to make a new posts it is a private route. c) This route deletes the posts it is private route. d) There are two routes to like and unlike a comment both are private. e) Comment route it is a private and post route to make comments. f) Delete comment private route.

Config: Js library to handle global variable like json web token secret key, mongo cloud key with database name and password etc.This library helps to access the values on the basis of the keys stored in a js object.

Frontend: React, react-redux, redux-thunk, react-hooks.

There is posts page, sign up, dashboard, profile page

In the frontend the first landing page have two option signup or login with a background image. On basis of choosing the option it goes to the desired route. On the landing page at the top right corner there is a option called developers to view all the developers profile anyone without registaring can view the profiles and the github public repos.

After logging in the dashboard for every user there are fields like education and expirience to update and delete them.There is also an option to edit profile.Social network links.

Posts can be liked by the same user only once or unliked.

React class component are used to maintain state in functional components.Store is created using redux and react-redux for global state management of the application to pass the data to child components from the global state.The are total six reducers inside client/src/reducers they are alert, auth, profile post.The above mentioned reducers are combined using the combineReducers method inside the index.js in the destination mentioned above.The jwt id is stored in local storage.

This web app is deployed in heroku : https://dry-lake-22867.herokuapp.com/