# MASTER BRANCH
## About The Project:
### Master Branch is a social networking (api) app that allows users to create accounts, build profiles, and engage in discussions on a centralized platform known as the master branch. Users can explore various topics and ideas, create branches for focused conversations, and even enjoy the ability to directly message each other for full open and encrypted conversations. With its flexible structure, Master Branch empowers users to connect, share, and exchange ideas in a dynamic and collaborative environment, fostering meaningful interactions and connections among its users.

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
### 1. On your computer, open the terminal. The terminal allows you to run commands on your machine as well as access the internet for data. We will use your terminal to download a copy all the files from this project. Once you have navigated to your choice of installation create a directory(folder) to where you would like to store all project files. You can use the command  ```mkdir whateverFolderNameYouLike``` to do so. Now let’s move into this folder via command ```cd whateverFolderNameYouLike```. In this folder you will need to create a couple of files that you will not get from the clone. You can create them with the ```touch``` command. Run the commmand as such: ```touch .env .gitignore```. This will create 2 files in your project .env, which will help you link your App to a database and a SECRET kay, and gitignore, in which you will reference files that contain sensitive information which will be blocked in your commits to github such as .env and /node_modules files.

## How to clone project into your local machine
### 1. From your browser on GitHub.com navigate to <pre><code>https://github.com/GundogCodes/project_2</code></pre>. From there you can see all the project files and information you need to install and run this project on your local device. On the site, there will be a green "code" button, click that button to see a drop down menu that will contain a project link, copy that link.

### 2. Now navigate back to the terminal, and move your project directory and type the following: ```git clone git@github.com:GundogCodes/project_2.git ``` This will begin to download all the project files on to your machine. You can now open the project in your favourite code editor.

## Installation
(all global and local packages you need)
### Once your project is open, there will be 2 more things you need to do before you can start running the app. On the command line, enter: ```npm i``` which will download all the necessary packages that the app needs to run. Next, open the project in your code editor, navigate to the .env file where you will add your desired sha256 hash key = to SECRET. This is necessary to properly authenicate your users.

## Starting App 

### You can first run the app in dev mode by simply running ```npm run dev```. The app should be running on your localhost:3000

## Using App
(how to use with postman and make requests)
### You can begin to make request to the app with Postman. Open Postman and click on the + icon in the top left corner to initate a request session. In the url section type: ```localhost:3000/users/new```       

## Testing App

## Start App (Without Dev Mode)
- run command: npm start