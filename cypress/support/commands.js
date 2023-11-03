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

const { formatToInvertedDate, period_idToText } = require('../utils/common');

Cypress.Commands.add('login', (website, username, password) => {
  cy.visit(website)
  cy.get('#username').type(username);
  cy.get('#password').type(password);
  cy.get('.submit > input').click();
})

Cypress.Commands.add('deleteBooking', (date, labName, period_id) => {
  const formattedDate = formatToInvertedDate(date);

  cy.visit('http://localhost/reservas/index.php/bookings?date='+formattedDate)

  clickBookingsTableButton(labName, period_id, 'button[name=cancel]')
})

Cypress.Commands.add('pressReservarButton', () => {
  cy.visit('http://localhost/reservas/index.php/bookings')

  clickBookingsTableButton('Laboratorio AMARILLO', '3', 'a')
})

Cypress.Commands.add('pressCopyToClipboardButton', (date, labName, period_id) => {
  const formattedDate = formatToInvertedDate(date);
  cy.visit('http://localhost/reservas/index.php/bookings?date='+formattedDate)

  clickBookingsTableButton(labName, period_id, '.copyToClipboard')
})

Cypress.Commands.add('assertValuesCopiedToClipboard', (date, period_id, labName, careerName, subjectName, teacherName, userText) => {
  if (!subjectName){
    subjectName = '(Sin Asginar)'
  }
  if (!teacherName){
    teacherName = '(Sin Asignar)'
  }
  // Retrieve the pasted text from the clipboard
  cy.window()
  .invoke('prompt', 'Paste here:')
  .then((pastedText) => {
    // Define an array of expected text extracts
    const fields = ['• Fecha: ', '• Turno: ', '• Laboratorio: ', '• Carrera: ', '• Asignatura: ', '• Docente: ', '• Realizado Por: '];
    const expectedValues = [formatToInvertedDate(date), period_idToText(period_id), labName, careerName, subjectName, teacherName, userText];

    for (let i = 0; i < fields.length; i++) {
      expect(pastedText).to.include(fields[i] + expectedValues[i]);
    }
  });
})

Cypress.Commands.add('createAndEditBooking', (date, labName, period_id) => {
  // Dummy booking
  cy.createBooking(date, labName, 'Sistemas', 'Arquitectura de las computadoras', 'Ezequiel Escobar', period_id, 'fbancalari')

  const formattedDate = formatToInvertedDate(date);
  cy.visit('http://localhost/reservas/index.php/bookings?date='+formattedDate)

  clickBookingsTableButton(labName, period_id, 'a[title="Edit this booking"]')  
})

Cypress.Commands.add('createBooking', (date, labName, careerName, subjectName, teacherName, period_id, userName) => {
  // cy.visit('http://localhost/reservas/index.php/bookings/book')
  cy.pressReservarButton()

  cy.submitBookingForm(date, labName, careerName, subjectName, teacherName, period_id, userName)
})

Cypress.Commands.add('submitBookingForm', (date, labName, careerName, subjectName, teacherName, period_id, userName, formatToInvertedDate = true) => {
  // if (formatToInvertedDate){
  //   cy.get('#date').clear().type(date.toLocaleDateString('en-GB'));
  // } else{
  //   cy.get('#date').clear().type(date);
  // }
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
  cy.log('BOOKING LOGS')
  cy.log('date = ' + date)
  cy.log('labName = ' + labName)
  cy.log('period_id = ' + period_id)
})

Cypress.Commands.add('assertBookingExists', (date, labName, careerName, subjectName, teacherName, period_id, userName, bookingShouldExist, formatDate = true) =>{

  if (formatDate){
    date = formatToInvertedDate(date);
  }
  var bookingShouldExistText
  if (bookingShouldExist) {
    bookingShouldExistText = 'SHOULD'
  } else { 
    bookingShouldExistText = 'SHOULD <NOT>'
  }
  if (!subjectName){
    subjectName = ""
  }
  if (!teacherName){
    teacherName = ""
  }
  cy.log('ASSERTION: THE FOLLOWING BOOKING ' + bookingShouldExistText + ' EXIST:\ndate = ' + date + '\nlabName = ' + labName + '\ncareerName = ' + careerName + '\nsubjectName = ' + subjectName + '\nteacherName = ' + teacherName + '\nperiod_id = ' + period_id + '\nuserName = ' + userName)

  cy.visit('http://localhost/reservas/index.php/bookings?date='+date)

  const rowNumber = labNameToTableRow(labName)

  cy.get('table[class=bookings] > tbody > tr')
  .eq(rowNumber)
  .find('td')
  .eq(period_id)
  .then(($td) => {
    if ($td.find('div > div').length > 0){ // Booking exists
      cy.log("EXISTS")
      cy.wrap($td)
      .find('div > div')
      .then(($divs) => {
        let sameUserName = $divs.eq(0).text().includes(userName)
        let sameBookingData
        const upTooltipAttribute = $divs.eq(1).attr('up-tooltip');
        if(upTooltipAttribute !== undefined){ // Check if the 'up-tooltip' attribute is present
          sameBookingData = upTooltipAttribute === careerName + ' - ' + subjectName + ' - ' + teacherName
        } else {
          sameBookingData = $divs.eq(1).text().includes(careerName + ' - ' + subjectName + ' - ' + teacherName)
        }
        
        if (bookingShouldExist){
          expect(sameUserName && sameBookingData).to.be.true;
        } else {
          expect(sameUserName && sameBookingData).not.to.be.true;
        }
      })
    } else { // Booking does NOT exist
      cy.log("DOES NOT EXIST")
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