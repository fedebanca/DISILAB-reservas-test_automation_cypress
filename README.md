# DISILAB-reservas-test_automation_cypress
This repository represents an internship project at UTN FRBA (Universidad Tecnológica Nacional, Facultad Regional Buenos Aires). During this internship, I had the opportunity to test a web application developed by another student at UTN FRBA. The application serves a crucial purpose: enabling users (both professors and students) to create booking requests, while administrators manage bookings and communicate status updates to users.

The foundation of this web app was built upon “Classroom Bookings,” an open-source application designed for school classroom reservations. However, this adaptation aimed to meet the specific needs of DISIs (Departamento de Ingeniería en Sistemas de Información) without being production-ready initially. Quality assurance (QA) was not part of the initial internship scope, which prompted the need for automated tests.

To ensure the application’s quality and completeness, I developed multiple sets of black-box tests. These tests directly interact with the app’s user interface, validating critical functionalities. The primary tool used for test automation was Cypress.

Key Functionalities Tested:

1. Booking Management:
    - Creation, modification, and deletion of bookings
    - Test files: test_creacion_de_reservas.cy.js, test_edicion_de_reservas.cy.js, test_eliminacion_de_reservas.cy.js
2. Data Copying:
    - Copying data from existing bookings
    - Test file: test_copia_a_portapapeles.cy.js
<!-- This is a project for an internship contract at UTN FRBA.
Here I tested a web application made by another student at UTN FRBA. Its purpose is to let users (professors or students) to make booking requests, and administrators to manage bookings and notify users about their status.
The application was made based on Classroom Bookings, an open source application for school classroom bookings. This app was adapted to meet DISIs needs, but was not ready for production deployment, because QA was not in the scope of the first internchip project.
That's why the development of automatized tests for each functionality was needed, with the objective of assuring quality and completeness of the application's developement.
This project consists of multiple sets of black box tests, directly interacting with the app's UI. For the making of the tests, the tool used was Cypress.
The app's functionalities tested where:
- Booking management: bookings creation, modification and deletion of bookings (test_creacion_de_reservas.cy.js, test_edicion_de_reservas.cy.js, test_eliminacion_de_reservas.cy.js)
- Data copying: copying data from already created bookings. (test_copia_a_portapapeles.cy.js) -->
