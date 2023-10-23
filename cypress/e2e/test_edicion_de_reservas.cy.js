const { getDateNextDayOfWeek } = require('../utils/common');

describe('Test - RF1 - Editar reserva', () => {  

  context('Test - Editar reserva correcta (Link)', () =>{    

    var date, labName, period_id, careerName, subjectName, teacherName, userName, dateSup, labNameSup, period_idSup, deletebk = true
    // period_id values: 1-mañana; 2-tarde; 3-noche

    before(function(){
      cy.login('http://localhost/reservas/index.php/login','fbancalari','fbancalari*')
      // Crear evento para superponer
      dateSup = new Date();
      labNameSup = 'Laboratorio VERDE';
      period_idSup = '3';
      cy.createBooking(dateSup, labNameSup, 'Sistemas', 'Arquitectura de las computadoras', 'Ezequiel Escobar', period_idSup, 'fbancalari')
    })

    beforeEach(function(){
      cy.login('http://localhost/reservas/index.php/login','fbancalari','fbancalari*')
      date = new Date();
      labName = 'Laboratorio AMARILLO';
      period_id = '1';
      cy.createAndEditBooking(date, labName, period_id);
    })

    // DONE
    it('Editar - reserva correcta', () => {
      date = new Date();
      labName = 'Laboratorio AZUL';
      period_id = '3';
      careerName = 'Sistemas'
      subjectName = 'Arquitectura de las computadoras'
      teacherName = 'Ezequiel Escobar'
      userName = 'fbancalari'
      cy.bookingLogs(date, labName, period_id)
      cy.submitBookingForm(date, labName, careerName, subjectName, teacherName, period_id, userName)

      cy.location('pathname').should('eq', '/reservas/index.php/bookings/index')
      cy.get('p.msgbox.info').should('have.text','Se actualizó la reserva.')
      cy.assertBookingExists(date, labName, careerName, subjectName, teacherName, period_id, userName, true)
    })

    // DONE
    it('Editar - reserva para una fecha pasada', () => {
      date = new Date();
      date.setDate(date.getDate() - 4)
      labName = 'Laboratorio AZUL';
      period_id = '3';
      careerName = 'Sistemas'
      subjectName = 'Arquitectura de las computadoras'
      teacherName = 'Ezequiel Escobar'
      userName = 'fbancalari'
      cy.bookingLogs(date, labName, period_id)
      cy.submitBookingForm(date, labName, careerName, subjectName, teacherName, period_id, userName)

      cy.location('pathname').should('eq', '/reservas/index.php/bookings/index')
      cy.get('p.msgbox.info').should('have.text','Se actualizó la reserva.')
      cy.assertBookingExists(date, labName, careerName, subjectName, teacherName, period_id, userName, true)
    })

    // DONE
    it('Editar - fecha imposible 33/09/23', () => {
      cy.bookingLogs('33/09/2023', 'Laboratorio AMARILLO', '2')
      cy.submitBookingForm('33/09/2023', 'Laboratorio AMARILLO', 'Sistemas', 'Arquitectura de las computadoras', 'Ezequiel Escobar', '2', 'fbancalari', false)

      cy.location('pathname').should('eq', '/reservas/index.php/bookings/save')
      cy.get('p.hint.error').should('have.text','Fecha Invalida')
    })

    // DONE
    it('Editar - fecha con mes imposible 01/13/23', () => {
      cy.bookingLogs('01/13/2023', 'Laboratorio AMARILLO', '3')
      cy.submitBookingForm('01/13/2023', 'Laboratorio AMARILLO', 'Sistemas', 'Arquitectura de las computadoras', 'Ezequiel Escobar', '3', 'fbancalari', false)

      cy.location('pathname').should('eq', '/reservas/index.php/bookings/save')
      cy.get('p.hint.error').should('have.text','Fecha Invalida')
    })

    // DONE
    it('Editar - fecha con mes imposible 01/00/23', () => {
      cy.bookingLogs('01/00/23', 'Laboratorio AZUL', '1')
      cy.submitBookingForm('01/00/23', 'Laboratorio AZUL', 'Sistemas', 'Arquitectura de las computadoras', 'Ezequiel Escobar', '1', 'fbancalari', false)

      cy.location('pathname').should('eq', '/reservas/index.php/bookings/save')
      cy.get('p.hint.error').should('have.text','Fecha Invalida')
    })

    // DONE
    it('Editar - fecha como texto', () => {
      cy.bookingLogs('texto', 'Laboratorio AMARILLO', '2')
      cy.submitBookingForm('texto', 'Laboratorio AMARILLO', 'Sistemas', 'Arquitectura de las computadoras', 'Ezequiel Escobar', '2', 'fbancalari', false)

      cy.location('pathname').should('eq', '/reservas/index.php/bookings/save')
      cy.get('p.hint.error').should('have.text','Fecha Invalida')
    })

    // DONE
    it('Editar - carrera sin materias cargadas', () => {
      labName = 'Laboratorio AZUL';
      period_id = '2';
      careerName = 'Quimica'
      subjectName = null
      teacherName = null
      userName = 'fbancalari'
      cy.bookingLogs(date, labName, period_id)
      cy.submitBookingForm(date, labName, careerName, subjectName, teacherName, period_id, userName)

      cy.location('pathname').should('eq', '/reservas/index.php/bookings/index')
      cy.get('p.msgbox.info').should('have.text','Se actualizó la reserva.')
      cy.assertBookingExists(date, labName, careerName, subjectName, teacherName, period_id, userName, true)
    })

    // DONE
    it('Editar - asignatura sin docentes cargados', () => {
      labName = 'Laboratorio AZUL';
      period_id = '3';
      careerName = 'Sistemas'
      subjectName = 'Gestion de Datos'
      teacherName = null
      userName = 'fbancalari'
      cy.bookingLogs(date, labName, period_id)
      cy.submitBookingForm(date, labName, careerName, subjectName, teacherName, period_id, userName)

      cy.location('pathname').should('eq', '/reservas/index.php/bookings/index')
      cy.get('p.msgbox.info').should('have.text','Se actualizó la reserva.')
      cy.assertBookingExists(date, labName, careerName, subjectName, teacherName, period_id, userName, true)
    })

    // DONE
    it('Editar - reserva superpuesta', () => {
      careerName = 'Sistemas'
      subjectName = 'Arquitectura de las computadoras'
      teacherName = 'Ezequiel Escobar'
      userName = 'fbancalari'
      cy.bookingLogs(dateSup, labNameSup, period_idSup)
      cy.submitBookingForm(dateSup, labNameSup, careerName, subjectName, teacherName, period_idSup, userName)

      cy.location('pathname').should('eq', '/reservas/index.php/bookings/save')
      cy.get('p.msgbox.exclamation').should('have.text','Ya hay una reserva para ese laboratorio en ese dia y horario.')
      cy.assertBookingExists(dateSup, labNameSup, careerName, subjectName, teacherName, period_idSup, userName, true)
    })

    // DONE
    it('Editar - reserva fuera del ciclo lectivo (sabado noche)', () => {
      dateAux = getDateNextDayOfWeek('saturday');
      labNameAux = 'Laboratorio AMARILLO';
      period_idAux = '3';
      deletebk = false
      cy.bookingLogs(date, labName, period_id)
      cy.submitBookingForm(date, labName, 'Sistemas', 'Arquitectura de las computadoras', 'Ezequiel Escobar', period_id, 'fbancalari')

      cy.location('pathname').should('not.eq', '/reservas/index.php/bookings/index')

      // Check if the element with the expected text exists
      cy.contains('p.msgbox.exclamation', 'Ya hay una reserva para ese laboratorio en ese dia y horario.').then(($element) => {
        if ($element.length > 0) {
          cy.get('p.msgbox.exclamation').should('not.have.text','Ya hay una reserva para ese laboratorio en ese dia y horario.')
          deletebk = false
        } else {
          // If the element is not found (text is absent), you can handle it as needed
          cy.log('Text is not present, which is expected.');
        }
      });

      // Check if the element with the expected text exists
      cy.contains('p.msgbox.info', 'Se realizó la reserva.').then(($element) => {
        if ($element.length > 0) {
          cy.get('p.msgbox.info').should('not.have.text','Se realizó la reserva.')
        } else {
          // If the element is not found (text is absent), you can handle it as needed
          cy.log('Text is not present, which is expected.');
        }
      });
      // cy.get('p.msgbox.exclamation').should('not.have.text','Ya hay una reserva para ese laboratorio en ese dia y horario.')
      // cy.get('p.msgbox.info').should('not.have.text','Se realizó la reserva.')
    })

    // DONE
    it('Editar - reserva fuera del ciclo lectivo (domingo)', () => {
      dateAux = getDateNextDayOfWeek('sunday');
      labNameAux = 'Laboratorio AMARILLO';
      period_idAux = '1';
      deletebk = false
      cy.bookingLogs(date, labName, period_id)
      cy.submitBookingForm(date, labName, 'Sistemas', 'Arquitectura de las computadoras', 'Ezequiel Escobar', period_id, 'fbancalari')

      cy.location('pathname').should('not.eq', '/reservas/index.php/bookings/index')

      // Check if the element with the expected text exists
      cy.contains('p.msgbox.exclamation', 'Ya hay una reserva para ese laboratorio en ese dia y horario.').then(($element) => {
        if ($element.length > 0) {
          cy.get('p.msgbox.exclamation').should('not.have.text','Ya hay una reserva para ese laboratorio en ese dia y horario.')
          deletebk = false
        } else {
          // If the element is not found (text is absent), you can handle it as needed
          cy.log('Text is not present, which is expected.');
        }
      });
      // Check if the element with the expected text exists
      cy.contains('p.msgbox.info', 'Se realizó la reserva.').then(($element) => {
        if ($element.length > 0) {
          cy.get('p.msgbox.info').should('not.have.text','Se realizó la reserva.')
        } else {
          // If the element is not found (text is absent), you can handle it as needed
          cy.log('Text is not present, which is expected.');
        }
      });

      // cy.get('p.msgbox.exclamation').should('not.have.text','Ya hay una reserva para ese laboratorio en ese dia y horario.')
      // cy.get('p.msgbox.info').should('not.have.text','Se realizó la reserva.')
    })

  // DONE
  it('Editar - reserva con usuario distinto (fbancalari2)', () => {
    date = new Date();
    labName = 'Laboratorio AZUL';
    period_id = '3';
    careerName = 'Sistemas'
    subjectName = 'Arquitectura de las computadoras'
    teacherName = 'Ezequiel Escobar'
    userName = 'fbancalari2'
    cy.bookingLogs(date, labName, period_id)
    cy.submitBookingForm(date, labName, careerName, subjectName, teacherName, period_id, userName)

    cy.location('pathname').should('eq', '/reservas/index.php/bookings/index')
    cy.get('p.msgbox.info').should('have.text','Se actualizó la reserva.')
    cy.assertBookingExists(date, labName, careerName, subjectName, teacherName, period_id, userName, true)
  })

  afterEach(function(){
    if (deletebk){
      cy.bookingLogs(date, labName, period_id)
      cy.deleteBooking(date, labName, period_id)
    }
  })

  after(function(){
    cy.deleteBooking(dateSup, labNameSup, period_idSup)
    cy.log('Booking deleted')
  })
})
});