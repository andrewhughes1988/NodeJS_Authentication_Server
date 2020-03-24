# NodeJS_Authentication_Server
#### A simple *User Authentication* system using access and refresh tokens: built with express, mongoDB, mongoose, bcrypt, and JWT.


The user system is independent of any client used with it, as long as the client 
verifies the access token with the same *SECRET* a user can be authenticated with their token
on a completely different server.
<br> <br>
The client should submit the *user's credentials* to obtain a new access token and refresh token **OR** 
submit a *refresh token* to the authentication server to obtain a new access token. The client should verify 
the user with the access token client side. 

Access tokens expire in 24 hours by default. Refresh tokens expire in 5 days by default.


## Setup:

**Download or Clone repository** <br>
Run `npm install` to install the dependencies (listed in package.json)

Create file *.env* as shown below:
```
PORT=CHOSEN_PORT
MONGO_DB_URI=mongodb://YOUR_DATABASE_URL
ACCESS_TOKEN_SECRET=YOUR_SECRET
REFRESH_TOKEN_SECRET=YOUR_SECRET
```

## Use:

**Start Server** <br>
Run `npm start`

**Server Responses** <br>
The authentication server responds using JSON. <br>
The Server will just respond with HTTP CODE 401/403 if a post is made to /token without a valid refresh token. <br>
Otherwise, most responses are in the format of: <br>
`{ success: *boolean*, message: *reason for response*, *tokens if authenication successful* }`
<br><br>
**Client Integration**

*Register a user:* POST request to SERVER_URL/register with `name, email, password` 
The password will be hashed before saving to database. Server will respond with:

`{success: true, message: 'User Created'}`
<br><br>

*Authenticate user with email/password:* POST request to SERVER_URL/login with `email, password`
On successful authentication tokens are generated and the server will respond with:

`{success: true, message: 'User Authenticated', access_token: *TOKEN*, refresh_token: *TOKEN*}`
<br><br>

*Authenticate user with refresh token:* POST request to SERVER_URL/token with `token`
On successful authentication and access token is generated and the server will respond with:

`{success: true, message: 'Access token refreshed', access_token: *TOKEN*}`
<br><br>

*Delete refresh token:* DELETE request to SERVER_URL/logout with `token`
On successful deletion the server will respond with:

`{success: true, message: 'Token removed'}`




