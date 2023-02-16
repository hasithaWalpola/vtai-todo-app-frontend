# VTAI Todo App Frontend

[Deployed Application](https://vtai-todo.uc.r.appspot.com)

To register as a user - https://vtai-todo.uc.r.appspot.com/signup

To register as an admin - https://vtai-todo.uc.r.appspot.com/signup/admin

This README outlines the steps to setup the project, provides a brief description of the application and its design, highlights the important design and implementation decisions taken.

## Content

- [VTAI Todo App Frontend](#vtai-todo-app-frontend)
  - [Content](#content)
  - [Setting Up](#setting-up)
    - [Install](#install)
    - [Run](#run)
    - [Run the unit tests](#run-the-unit-tests)
  - [Build](#build)
  - [The Application](#the-application)
    - [Design](#design)
      - [Auth](#auth)
      - [Normal User](#normal-user)
      - [Admin User](#admin-user)
    - [Implementation](#implementation)
      - [Auth](#auth-1)
      - [Normal User](#normal-user-1)
      - [Admin User](#admin-user-1)
  - [Important Decisions](#important-decisions)
    - [Implementation Decisions](#implementation-decisions)
  - [Checklist](#checklist)
    - [✅ Unit Tests](#-unit-tests)
    - [✅ Deployemnt](#-deployemnt)

## Setting Up

The following steps are necessary to set up the project in the development environment:

### Install

Install dependencies by running the following command in the root of the project:

```bash
# From root of the project.
yarn install or npm install
```
### Run

Run the following command to start the Websocket server and the front-end application.

```bash
# From root of the project.
npm start or ng serve
```
Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

Need to add Google Translate API key to the local environment when run localy
### Run the unit tests

To run the unit test suite, execute the following command:

```bash
# From root of the project.
ng test
```
## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## The Application

The application consists of two flows: the admin user flow and the normal user flow.

### Design

The design process started with creating a wireframe for each page to have a better visual understanding of the application.


#### Auth

Login and Signup screeens.

<img src="./docs/resources/login-wf.png" width="600" />

<img src="./docs/resources/signup-wf.png" width="600" />

#### Normal User

This todo list page displayed when the user logged as normal user.

<img src="./docs/resources/normal-user-todo-wf.png" width="600" />

<img src="./docs/resources/add-todo.png" width="600" />


#### Admin User

This user list page displayed when the user logged as admin user and can view the user translation history.

<img src="./docs/resources/admin-user-view.png" width="600" />

<img src="./docs/resources/translation-history.png" width="600" />

### Implementation

The low-fidelity design was used as a starting point for the implementation, skipping the high-fidelity design phase due to time constraints.

#### Auth

Implementation of the auth pages:


<img src="./docs/resources/login.PNG" width="600" />

<img src="./docs/resources/signup.PNG" width="600" />

#### Normal User

Implementation of the normal user flow:

<img src="./docs/resources/todo-list-en.PNG" width="600" />

<img src="./docs/resources/add-todo-modal.PNG" width="600" />

#### Admin User

Implementation of the normal user flow:

<img src="./docs/resources/user-view.PNG" width="600" />

<img src="./docs/resources/trans-history.PNG" width="600" />

## Important Decisions

The following implementation decisions were taken throughout the development process:

### Implementation Decisions

- Angular was used for the implementation of the frontend with Angular Material.
- Typescript was the primary language used for development.
- Google Translation API used for translations


## Checklist

This section provides a summary of my adherence to the requirements listed.

### ✅ Unit Tests

- Implemented with Jasmine.
- To run tests: `ng test` from project root
- Coverage:

  <img src="./docs/resources/test.PNG" width="600" />

### ✅ Deployemnt

[Deployement Document](/docs/resources/VTAI_Todo_App.pdf)

- Application deployed to the Google Cloud using Github Cloud Builder
- Application deployed automatically when push to main branch(CI/CD)
