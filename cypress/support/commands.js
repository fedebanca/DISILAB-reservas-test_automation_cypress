// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (website, username, password) => {
  cy.visit(website)
  cy.get('#username').type(username);
  cy.get('#password').type(password);
  cy.get('.submit > input').click();
})

Cypress.Commands.add('deleteBooking', (date, labName, period_id) => {
  const formattedDate = formatDate(date);

  cy.visit('http://localhost/reservas/index.php/bookings?date='+formattedDate)

  clickBookingsTableButton(labName, period_id, 'button[name=cancel]')
})

Cypress.Commands.add('pressReservarButton', () => {
  cy.visit('http://localhost/reservas/index.php/bookings')

  clickBookingsTableButton('Laboratorio AMARILLO', '3', 'a')
})

Cypress.Commands.add('createAndEditBooking', (date, labName, period_id) => {
  // Dummy booking
  cy.createBooking(date, labName, 'Sistemas', 'Arquitectura de las computadoras', 'Ezequiel Escobar', period_id, 'fbancalari')

  const formattedDate = formatDate(date);
  cy.visit('http://localhost/reservas/index.php/bookings?date='+formattedDate)

  clickBookingsTableButton(labName, period_id, 'a[title="Edit this booking"]')  
})

Cypress.Commands.add('createBooking', (date, labName, careerName, subjectName, teacherName, period_id, userName) => {
  cy.visit('http://localhost/reservas/index.php/bookings/book')

  cy.submitBookingForm(date, labName, careerName, subjectName, teacherName, period_id, userName)
})

Cypress.Commands.add('submitBookingForm', (date, labName, careerName, subjectName, teacherName, period_id, userName, formatDate = true) => {
  if (formatDate){
    cy.get('#date').clear().type(date.toLocaleDateString('en-GB'));
  } else{
    cy.get('#date').clear().type(date);
  }
  cy.get('select[name=room_id]').select(labName);
  cy.get('#career_id').select(careerName);
  if (subjectName){
    cy.get('#subject_id').select(subjectName)
  }
  if (teacherName){
    cy.get('#teacher_id').select(teacherName)
  }
  cy.get('select[name=period_id]').select(period_id)
  cy.get('#user_id').select(userName)
  cy.get('.submit > input').click();
})

Cypress.Commands.add('bookingLogs', (date, labName, period_id) => {
  cy.log('date = ' + date)
  cy.log('labName = ' + labName)
  cy.log('period_id = ' + period_id)
})

Cypress.Commands.add('assertBookingExists', (date, labName, careerName, subjectName, teacherName, period_id, userName, bookingShouldExist, formatDate = true) =>{
  cy.log("Date: " + date)
  if (formatDate){
    date = date.toLocaleDateString('en-GB');
  }
  cy.log("FormatedDate: " + date)
  cy.visit('http://localhost/reservas/index.php/bookings?date='+date)

  const rowNumber = labNameToTableRow(labName)
  
  cy.get('table[class=bookings] > tbody > tr')
  .eq(rowNumber)
  .find('td')
  .eq(period_id)
  .then(($td) => {
    if ($td.find('div > div').length > 0){
        cy.wrap($td)
        .find('div > div')
        .should(($divs) => {
          if (bookingShouldExist){
            const condition1 = $divs.eq(0).text() === userName
            const condition2 = $divs.eq(1).attr('up-tooltip') === careerName + ' - ' + subjectName + ' - ' + teacherName
            expect(condition1 && condition2).to.be.true;
          } else {
            const condition1 = !$divs.eq(0).text(userName)
            const condition2 = !$divs.eq(1).attr('up-tooltip') === careerName + ' - ' + subjectName + ' - ' + teacherName
            expect(condition1 || condition2).to.be.true;
          }
        })
    } else {
      if (bookingShouldExist){
        cy.wrap($td).find('div > div').should('exist');
      } else {
        cy.wrap($td).find('div > div').should('not.exist');
      }      
    }
  })
})

function clickBookingsTableButton(labName, period_id, buttonSelectorString){
    const rowNumber = labNameToTableRow(labName)
    cy.get('table[class=bookings] > tbody > tr')
    .eq(rowNumber)
    .find('td')
    .eq(period_id)
    .find(buttonSelectorString)
    .click();
  }  

function formatDate(date) {
  if (!(date instanceof Date)) {
    throw new Error('Input is not a Date object');
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
  const day = String(date.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

function labNameToTableRow(labName){
  switch (labName) {
    case 'Laboratorio AMARILLO':
      return 1
      break;
    case 'Laboratorio AZUL':
      return 2
      break;
    case 'Laboratorio NARANJA':
      return 3
      break;
    case 'Laboratorio ROJO':
      return 4
      break;
    case 'Laboratorio VERDE':
      return 5
      break;
    default:
      console.log('Invalid labName');
  }
}