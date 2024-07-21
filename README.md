# evangelos

## Description
This application is a social network api that leverages a NoSQL database. The intended purpose of this app is to demonstrate the ability to utilize unstructured data with an api driven framework.

## Table of Contents
- [Installation Instructions](#Installation-Instructions)
- [Usage Information](#Usage-Information)
- [License](#License)
- [Contributions](#Contributions)
- [Test Instructions](#Test-Instructions)
- [Additional Questions](#additional-questions-send-an-email-or-follow-the-link-to-my-github-profile)
- [Walkthrough Video](#Link-to-Walkthrough-Video) 

## Installation Instructions
This application utilizes node package manager (npm). In order to run this application clone the repository and then enter "npm install" in the terminal. The database is mongo and is required  for this app to function. In order to configure the database supply the following environment variables to a .env file: MONGOURI='YOURMONGOURI'. the repository's package.json file maintains the scripts necessary to install and run this application. After installing npm and configuring the .env file, start the application by entering the following command : 'npm start'.

## Usage Information
the intended usage of this application is to create a noSQL data framework leveraging node, mongoose ODM and express.js in order to provide users with the ability to create users, publish thoughts, react to other users's thoughts and to create friend lists to provide social networking opertunities as well as demonstrate a relateivley lean backend framework. 

## Link to Walkthrough Video

## License
![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)

## Contributions
there are no additional contributors to the development of this application.

## Test Instructions
This app can only be tested manually. After cloning the project, installing node.js, and configuring the mongodb URL in a .env file the project can be started by executing the following command in the terminal 'npm start'. API's can be tested manually using postman or insomnia. All API endpoints can be determined by inspecting the Routes/api files for user and thoughts. When the app is running successfully locally, connect your insomnia or postman app to an endpoint via the url and supply the necessary data to either the parameter or body of a request and evaluate the functionality.

## Additional Questions? Send an email or follow the link to my github profile:
Email - peter.appliedanalyticalsciences@gmail.com 
Github profile link - https://github.com/peteCodes4u
