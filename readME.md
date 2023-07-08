# BRANCH
## About The Project:
### Branch is a social networking (api) app that allows users to create accounts, build profiles, and engage in discussions on a centralized platform known as the master branch. Users can explore various topics and ideas, create branches for focused conversations, and even enjoy the ability to directly message each other for full open and encrypted conversations. With its flexible structure, Branch empowers users to connect, share, and exchange ideas in a dynamic and collaborative environment, fostering meaningful interactions and connections among its users.

## Built With:
- JavaScript (programming language)
- Git/Github (version control)
- Express (server control)
- Node.js (local javascript environment)
- MongoDB/Mongoose (database control)
- Brcypt (encryption) 
- Jsonwebtoken (authentication)
- Artillery (load testing) 
- Jest & Supertest (unit testing) 

## Prerequisites
|            | List       |           |
| ---------- | ---------- | --------- |
| Postman    |Node.js/npm | Mongodb   |
| Express    | VSCode     |JavaScript |
| Git/Github | Homebrew   | Zsh       |

## Before Getting Started:
###  In Additon to the prerequisites needed to use this project you must also have nodemon installed globally to be able to run the app in development mode. To do so verify you have npm and Node.js installed on your machine by running ```node -v``` and ```npm -v``` in your terminal. Once you have verified you have node and npm installed run ```npm install -g nodemon```. This is will install a development package globally on your machine and will help us run and debug the app in real time.

## Create a directory for your folder
### 1. On your computer, open the terminal. The terminal allows you to run commands on your machine as well as access the internet for data. We will use your terminal to download a copy all the files from this project. Once you have navigated to your choice of installation create a directory(folder) to where you would like to store all project files. You can use the command  ```mkdir whateverFolderNameYouLike``` to do so. Now let’s move into this folder via command ```cd whateverFolderNameYouLike```. 

## How to clone project into your local machine
### 1. From your browser on GitHub.com navigate to <pre><code>https://github.com/GundogCodes/project_2</code></pre>. From there you can see all the project files and information you need to install and run this project on your local device. On the site, there will be a green "code" button, click that button to see a drop down menu that will contain a project link, copy that link.

### 2. Now navigate back to the terminal, and move your project directory and type the following: ```git clone git@github.com:GundogCodes/project_2.git ``` This will begin to download all the project files on to your machine. Cd into this new folder. In this folder you will need to create a couple of files that you will not get from the clone. You can create them with the ```touch``` command. Run the commmand as such: ```touch .env .gitignore```. This will create 2 files in your project .env, which will help you link your App to a database and a SECRET key, and gitignore, in which you will reference files that contain sensitive information which will be blocked in your commits to github such as .env and /node_modules files.You can now open the project in your favourite code editor.

## Installation

### Once your project is open, there will be 2 more things you need to do before you can start running the app. On the command line, enter: ```npm i``` which will download all the necessary packages that the app needs to run. You can see these dependencies in your node_modules file. Next, open the project in your code editor, navigate to the .env file where you will add your MONGO_URI=<key> to connect your app to a MongoDB database and desired secret sha256 hash key = to SECRET ```SECRET=<yourHashedKey>```. This is necessary to properly authenicate your users. You can create a hashed key from here ```https://emn178.github.io/online-tools/sha256.html```

## Starting App 

### You can first run the app in dev mode by simply running ```npm run dev```. The app should be running on your localhost:3000 and ```ctrl + C ``` when you want to stop.

## Using App
(how to use with postman and make requests)
### 1.Setting up request: You can begin to make request to the app with Postman. Open Postman and click on the + icon in the top left corner to initate a request session. In the url section type: ```localhost:3000/home``` and send a GET request. You will be taken to the homepage of the app where you will see a breif description of the app as as well as prompts to create an account or login.

### 2.Creating an Account: If you don't already have an account, click on the ```localhost:3000/users/new/``` in createAnAccount's value and you will be taken to the ```users/new``` route where you will POST a raw json request with the keys of an unique 'username', an unique 'email', and a 'password' along with your preferred credentials. This will create a user. Now, type ```localhost:3000users/login``` in your URL.

### 3.Logging in: On the ```localhost:3000users/login``` route POST your email and password in a raw json package and you will be returned with your hashed login credentials and a login jsonwebtoken. Copy the token, move over to the Authorization tab and select 'Bearer Token' in the types dropdown menu. Next, paste the token in the token text box, now the app knows which user is logged in. CONGRATS YOU ARE NOW LOGGED IN!

### 4. Chatting on the Main Forum: Send GET request to ```localhost:3000/main``` to see the main forum chats. Feel free to read through what people are talking about! If you would like to add to the conversation send a POST to ```localhost:3000/main/new```. Be sure to add a 'text' key with whatever comment you would like to post check back on the main to see your comment live! If you would like to modify(update) your comment simply send a PUT request to ```localhost:3000/main/yourCommentID``` and modify the message along tied to a 'text' key. Similarly, you can view the isolated message withe the same URL route but with a GET request. You can also Delete your comment by doing a DELETE request on the same route.

### 5. Private messaging users: From the main chat you can see the users commenting along with their userIDs (a long string) if you would like to privately message them copy their userID and in the URL type ```localhost:3000/pm/:userID``` send a POST with a 'text' key along with your message and your message will appear in the user's and your chats. You can also find users by seeing all users with a GET request on the ```/users``` route. When You would like to see your chats simply find your userID from your user name on the users or main GET routes and send a GET to ```localhost:3000/pm/yourUserID```. You are not allowed access to other users chats.

## Testing App
### 1. Load testing with Artillery: If its not there already, in the scripts object in package.json, add a "load" key with the value of "artillery run tests/artillery.yml". Now within the artillery.yml file in tests you will see load testing script of sending 20 GET requests to ```localhost:3000/home``` every second for 60 seconds. To verify that the test is sucessful run the app from code editor terminal ```npm run dev``` then in your system terminal navigate to the project file and run the command ```npm run load``` this will trigger the load testing on that route and you can see that the test is successful. If you would like to run further testing on other routes feel free to do so, just speicify the route and the type of request, if it is a post or put request you must provide a json with the appropriate properties to test the load properly.

### 2. Unit testing with Jest, Supertest, MongoMemoryServer: If its not there already, in package.json , in the scripts object, test should have its value be 'jest'. Navigating to tests/app.test.js, you can see all the unit testing for all the app routes. Feel free to run further tests. when you would like to execute the unit tests, simply run ```npm run test``` in the code editor terminal or in the project directory of your machine terminal.

## Start App (Without Dev Mode)
- run command: npm start

# Wireframes 
### https://trello.com/b/aDPYrUfn/api