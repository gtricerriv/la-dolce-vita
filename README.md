
Setup
This project is a simple example of how to set up a Node.js project with MySQL and a React project, both with TypeScript.

Prerequisites
To follow this guide, you will need the following:

Node.js and npm
A MySQL database server
Installation
Clone the repository
Install the dependencies for the back-end project:
cd back
npm install
Create a MySQL database:
mysql> CREATE DATABASE test;
Create a user for the MySQL database:
mysql> CREATE USER 'test'@'localhost' IDENTIFIED BY 'password';
Grant the user access to the database:
mysql> GRANT ALL PRIVILEGES ON my_database.* TO 'test'@'localhost';
Install the dependencies for the front-end project:
cd front
npm install
Running the projects
Start the back-end project:
cd back
npm start
Start the front-end project:
cd front
npm start
The back-end project will be running on port 3000 and the front-end project will be running on port 3001.

Testing the projects
You can test the projects by visiting the following URLs in your browser:

Back-end: http://localhost:3000
Front-end: http://localhost:3001
You should see a simple "Hello, world!" message.

Extending the projects
You can extend the projects by adding new features or functionality. For example, you could add a new route to the back-end project or create a new component in the front-end project.

Documentation
For more information on Node.js, MySQL, and TypeScript, please refer to the following documentation:

Node.js documentation: https://nodejs.org/en/docs/
MySQL documentation: https://dev.mysql.com/doc/
TypeScript documentation: https://www.typescriptlang.org/docs/
This README provides step-by-step instructions for installing the back-end and front-end projects. It also includes instructions for running the projects and testing them.
