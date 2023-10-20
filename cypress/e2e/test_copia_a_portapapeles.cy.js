describe('Test - RF2 - Copiar al portapapeles', () => {  

  context('Test - Copiar al portapapeles', () =>{    

    var date, labName, period_id, careerName, subjectName, teacherName, userName
    // period_id values: 1-mañana; 2-tarde; 3-noche

    beforeEach(function(){
      cy.login('http://localhost/reservas/index.php/login','fbancalari','fbancalari*')
    })

    // DONE
    it('Crear - reserva correcta', () => {
      date = new Date();
      labName = 'Laboratorio VERDE';
      careerName = 'Sistemas'
      subjectName = 'Arquitectura de las computadoras'
      teacherName = 'Ezequiel Escobar'
      period_id = '1';
      userName = 'fbancalari'

      cy.bookingLogs(date, labName, period_id)
      cy.log('careerName: ' + careerName)
      cy.log('subjectName: '+ subjectName)
      cy.log('teacherName: ' + teacherName)
      cy.log('userName: ' + userName)

      cy.createBooking(date, labName, careerName, subjectName, teacherName, period_id, userName)
      cy.pressCopyToClipboardButton(date, labName, period_id)

      cy.assertValuesCopiedToClipboard(date, period_id, labName, careerName, subjectName, teacherName, 'fbancalari')
    });

    // DONE
    it('Editar - carrera sin materias cargadas', () => {
      date = new Date();
      labName = 'Laboratorio VERDE';
      careerName = 'Quimica'
      subjectName = null
      teacherName = null
      period_id = '2';
      userName = 'fbancalari'
  
      cy.bookingLogs(date, labName, period_id)
      cy.log('careerName: ' + careerName)
      cy.log('subjectName: '+ subjectName)
      cy.log('teacherName: ' + teacherName)
      cy.log('userName: ' + userName)

      cy.createBooking(date, labName, careerName, subjectName, teacherName, period_id, userName)
      cy.pressCopyToClipboardButton(date, labName, period_id)

      cy.assertValuesCopiedToClipboard(date, period_id, labName, careerName, subjectName, teacherName, 'fbancalari')
    })
  
    // DONE
    it('Editar - asignatura sin docentes cargados', () => {
      date = new Date();
      labName = 'Laboratorio VERDE';
      careerName = 'Sistemas'
      subjectName = 'Gestion de Datos'
      teacherName = null
      period_id = '3';
      userName = 'fbancalari'
  
      cy.bookingLogs(date, labName, period_id)
      cy.log('careerName: ' + careerName)
      cy.log('subjectName: '+ subjectName)
      cy.log('teacherName: ' + teacherName)
      cy.log('userName: ' + userName)

      cy.createBooking(date, labName, careerName, subjectName, teacherName, period_id, userName)
      cy.pressCopyToClipboardButton(date, labName, period_id)

      cy.assertValuesCopiedToClipboard(date, period_id, labName, careerName, subjectName, teacherName, 'fbancalari')
    })
  
    afterEach(function(){
      cy.bookingLogs(date, labName, period_id)
      cy.deleteBooking(date, labName, period_id)
    })
  })
})