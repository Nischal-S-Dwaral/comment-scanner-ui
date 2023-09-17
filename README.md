
# Comment-Scanner Platform UI

The Comment-Scanner Platform is a React.js-based web application that provides a comprehensive solution for analysing documentation comments in your Java projects hosted on GitHub.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Screenshots](#screenshots)
- [Contact Information](#contact-information)

## Features

1. **User Authentication and Authorisation:** Secure user authentication with email and password to prevent unauthorised access using Firebase.

2. **Initiating Analysis:** Create projects with GitHub configurations and initiate documentation comments analysis for selected projects.

3. **Viewing Analysis Results:** Display analysis results, including summary metrics and code views for Java files with necessary review comments.

4. **Quality Gate:** Enforce specific project coverage percentages and update quality gates for projects.

5. **Access Control:** Ensure all use cases require user authentication.

## Technologies Used

The following technologies and tools were used in the development of the Comment-Scanner platform:

- **React JS:** JavaScript library for building user interfaces.
- **Axios:** Used for making API calls to the backend.
- **Redux:** Used for state management.
- **Firebase Authentication:** Provides secure user login, registration, and authentication.
- **Persist Storage:** Used for local data storage to enhance user experience, including the persistence of user keys across page refreshes.

## Installation

To run the Comment-Scanner Platform locally, follow these steps:

1. Clone the repository to your local machine.

   ```bash
   git clone https://github.com/Nischal-S-Dwaral/comment-scanner-ui
   ```

2. Navigate to the project directory.

   ```bash
   cd comment-scanner-ui
   ```

3. Install the project dependencies.

   ```bash
   npm install
   ```

4. Start the development server.

   ```bash
   npm start
   ```

5. Access the application in your web browser at `http://localhost:3000`.

## Usage

To use the Comment-Scanner Platform, follow these steps:

1. Log in to your Comment-Scanner account or register if you don't have an account yet.

2. Create new projects by configuring GitHub repository access by the "Create Project" button.

3. Initiate documentation comments analysis for selected projects.

4. View analysis results, including documentation coverage metrics and code views.

## Configuration

To configure Firebase service account credentials in the `firebase.js` file, follow these steps:

1. Navigate to the `src` directory of the project.

2. Open the `firebase.js` file.

3. Locate the Firebase configuration section.

4. Replace the placeholder values with your Firebase service account credentials.

   ```javascript
   // Your Firebase configuration
   const firebaseConfig = {
     apiKey: 'YOUR_API_KEY',
     authDomain: 'YOUR_AUTH_DOMAIN',
     projectId: 'YOUR_PROJECT_ID',
     storageBucket: 'YOUR_STORAGE_BUCKET',
     messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
     appId: 'YOUR_APP_ID',
   };
   ```

5. Save the file.

## Screenshots


![Home Page](https://github.com/Nischal-S-Dwaral/comment-scanner-ui/blob/main/sample/home.png)
*Caption: Platform Homepage*


![GitHub Configurations](https://github.com/Nischal-S-Dwaral/comment-scanner-ui/blob/main/sample/create_project_config.png)
*Caption: GitHub Configurations - Customising GitHub Settings for Repository Integration*


![Project Overview Pass](https://github.com/Nischal-S-Dwaral/comment-scanner-ui/blob/main/sample/project_overview_passed.png)
*Caption: Project Overview - Scan History and Passed Quality Gate Status*

![Project Overview Fail](https://github.com/Nischal-S-Dwaral/comment-scanner-ui/blob/main/sample/project_overview_failed.png)
*Caption: Project Overview - Scan History and Failed Quality Gate Status*

![Codebase Folder Structure](https://github.com/Nischal-S-Dwaral/comment-scanner-ui/blob/main/sample/codebase_treeview.png)
*Caption: Codebase Folder Structure - Hierarchical Overview*

![Code View Mix](https://github.com/Nischal-S-Dwaral/comment-scanner-ui/blob/main/sample/codeview_mixed.png)
*Caption: Code View - Mixed Documentation Comments Coverage (Complete, Incomplete and Absent)*

![Code View Fail](https://github.com/Nischal-S-Dwaral/comment-scanner-ui/blob/main/sample/codeview_0_coverage.png)
*Caption: Code View - 0% Documentation Comments Coverage*

![Login Page](https://github.com/Nischal-S-Dwaral/comment-scanner-ui/blob/main/sample/login_page.png)
*Caption: Login Page*

## Contact Information

- Author: Nischal Srinivas Dwaral
- Email: nischal.dwaral@gmail.com
- GitHub: [https://github.com/Nischal-S-Dwaral](https://github.com/Nischal-S-Dwaral)