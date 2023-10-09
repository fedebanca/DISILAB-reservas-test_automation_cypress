const { getDateNextDayOfWeek } = require('../utils/common');

describe('Test - RF1 - Crear reserva', () => {  

  // Se hace la diferencia entre la creación de reservar utilizando el boton de reservas encontrado en la tabla dentro del link http://localhost/reservas/index.php/bookings/index debido a que tiene comportamiento distinto a que si se utiliza el formulario accedido directamente con el link http://localhost/reservas/index.php/bookings/book
  context('Test - Crear reserva correcta (Link)', () =>{    

    var date, labName, period_id, shouldBeCreated
    // period_id values: 1-mañana; 2-tarde; 3-noche

    beforeEach(function(){
      cy.login('http://localhost/reservas/index.php/login','fbancalari','fbancalari*')
      cy.visit('http://localhost/reservas/index.php/bookings/book')
    })

    // DONE
    it('Crear - reserva correcta', () => {
      date = new Date();
      labName = 'Laboratorio AMARILLO';
      period_id = '1';
      shouldBeCreated = true
      cy.bookingLogs(date, labName, period_id)
      cy.submitBookingForm(date, labName, 'Sistemas', 'Arquitectura de las computadoras', 'Ezequiel Escobar', period_id, 'fbancalari')

      cy.location('pathname').should('eq', '/reservas/index.php/bookings/index')
      cy.get('p.msgbox.info').should('have.text','Se realizó la reserva.')
    })

    // DONE
    it('Crear - reserva correcta con fecha pasada', () => {
      date = new Date();
      date.setDate(date.getDate() - 7)
      labName = 'Laboratorio AMARILLO';
      period_id = '1';
      shouldBeCreated = true
      cy.bookingLogs(date, labName, period_id)
      cy.submitBookingForm(date, labName, 'Sistemas', 'Arquitectura de las computadoras', 'Ezequiel Escobar', period_id, 'fbancalari')

      cy.location('pathname').should('eq', '/reservas/index.php/bookings/index')
      cy.get('p.msgbox.info').should('have.text','Se realizó la reserva.')
    })    

    // DONE
    it('Crear - fecha imposible 33/09/23', () => {
      date = '33/09/2023';
      labName = 'Laboratorio AMARILLO';
      period_id = '2';
      shouldBeCreated = false
      cy.bookingLogs(date, labName, period_id)
      cy.submitBookingForm(date, labName, 'Sistemas', 'Arquitectura de las computadoras', 'Ezequiel Escobar', period_id, 'fbancalari', false)

      cy.location('pathname').should('eq', '/reservas/index.php/bookings/save')
      cy.get('p.hint.error').should('have.text','Fecha Invalida')
    })

    // DONE
    it('Crear - fecha con mes imposible 01/13/23', () => {
      date = '01/13/2023';
      labName = 'Laboratorio AMARILLO';
      period_id = '3';
      shouldBeCreated = false
      cy.bookingLogs(date, labName, period_id)
      cy.submitBookingForm(date, labName, 'Sistemas', 'Arquitectura de las computadoras', 'Ezequiel Escobar', period_id, 'fbancalari', false)

      cy.location('pathname').should('eq', '/reservas/index.php/bookings/save')
      cy.get('p.hint.error').should('have.text','Fecha Invalida')
    })

    // DONE
    it('Crear - fecha con mes imposible 01/00/23', () => {
      date = '01/00/2023';
      labName = 'Laboratorio AZUL';
      period_id = '1';
      shouldBeCreated = false
      cy.bookingLogs(date, labName, period_id)
      cy.submitBookingForm(date, labName, 'Sistemas', 'Arquitectura de las computadoras', 'Ezequiel Escobar', period_id, 'fbancalari', false)

      cy.location('pathname').should('eq', '/reservas/index.php/bookings/save')
      cy.get('p.hint.error').should('have.text','Fecha Invalida')
    })

    // DONE
    it('Crear - fecha como texto escrito', () => {
      date = 'texto';
      labName = 'Laboratorio AZUL';
      period_id = '1';
      shouldBeCreated = false
      cy.bookingLogs(date, labName, period_id)
      cy.submitBookingForm(date, labName, 'Sistemas', 'Arquitectura de las computadoras', 'Ezequiel Escobar', period_id, 'fbancalari', false)

      cy.location('pathname').should('eq', '/reservas/index.php/bookings/save')
      cy.get('p.hint.error').should('have.text','Fecha Invalida')
    })

    // DONE
    it('Crear - reservas simultaneas', () => {
      date = new Date();
      labName = 'Laboratorio AMARILLO';
      period_id = '1';
      shouldBeCreated = true
      cy.bookingLogs(date, labName, period_id)
      cy.submitBookingForm(date, labName, 'Sistemas', 'Arquitectura de las computadoras', 'Ezequiel Escobar', period_id, 'fbancalari')

      cy.visit('http://localhost/reservas/index.php/bookings/book')
      cy.submitBookingForm(date, labName, 'Sistemas', 'Paradigmas de Programacion', 'Juan Manuel Fernandez Dos Santos', period_id, 'fbancalari')

      cy.location('pathname').should('eq', '/reservas/index.php/bookings/save')
      cy.get('p.msgbox.exclamation').should('have.text','Ya hay una reserva para ese laboratorio en ese dia y horario.')
    })

    // DONE
    it('Crear - carrera sin materias cargadas', () => {
      date = new Date();
      labName = 'Laboratorio AZUL';
      period_id = '2';
      shouldBeCreated = true
      cy.bookingLogs(date, labName, period_id)
      cy.submitBookingForm(date, labName, 'Quimica', null, null, period_id, 'fbancalari')

      cy.location('pathname').should('eq', '/reservas/index.php/bookings/index')
      cy.get('p.msgbox.info').should('have.text','Se realizó la reserva.')
    })

    // DONE
    it('Crear - asignatura sin docentes cargados', () => {
      date = new Date();
      labName = 'Laboratorio AZUL';
      period_id = '3';
      shouldBeCreated = true
      cy.bookingLogs(date, labName, period_id)
      cy.submitBookingForm(date, labName, 'Sistemas', 'Gestion de Datos', null, period_id, 'fbancalari')

      cy.location('pathname').should('eq', '/reservas/index.php/bookings/index')
      cy.get('p.msgbox.info').should('have.text','Se realizó la reserva.')
    })

    // DONE
    it('Crear - reserva fuera del ciclo lectivo (sabado noche)', () => {
      date = getDateNextDayOfWeek('saturday');
      labName = 'Laboratorio AMARILLO';
      period_id = '3';
      shouldBeCreated = false
      cy.bookingLogs(date, labName, period_id)
      cy.submitBookingForm(date, labName, 'Sistemas', 'Arquitectura de las computadoras', 'Ezequiel Escobar', period_id, 'fbancalari')

      cy.location('pathname').should('not.eq', '/reservas/index.php/bookings/index')
      cy.get('p.msgbox.exclamation').should('not.have.text','Ya hay una reserva para ese laboratorio en ese dia y horario.')
      cy.get('p.msgbox.info').should('not.have.text','Se realizó la reserva.')
    })


    // DONE
    it('Crear - reserva fuera del ciclo lectivo (domingo)', () => {
      date = getDateNextDayOfWeek('sunday');
      labName = 'Laboratorio AMARILLO';
      period_id = '1';
      shouldBeCreated = false
      cy.bookingLogs(date, labName, period_id)
      cy.submitBookingForm(date, labName, 'Sistemas', 'Arquitectura de las computadoras', 'Ezequiel Escobar', period_id, 'fbancalari')

      cy.location('pathname').should('not.eq', '/reservas/index.php/bookings/index')
      cy.get('p.msgbox.exclamation').should('not.have.text','Ya hay una reserva para ese laboratorio en ese dia y horario.')
      cy.get('p.msgbox.info').should('not.have.text','Se realizó la reserva.')
    })


  afterEach(function(){
    if (shouldBeCreated){
      cy.deleteBooking(date, labName, period_id)
    }
  })
})

  context('Test - Crear reserva correcta (Boton <Reservar>)', () =>{    

    var date, labName, period_id, shouldBeCreated
    // period_id values: 1-mañana; 2-tarde; 3-noche

    beforeEach(function(){
      cy.login('http://localhost/reservas/index.php/login','fbancalari','fbancalari*')
      cy.pressReservarButton();
    })

    // DONE
    it('Crear reserva correcta', () => {
      date = new Date();
      labName = 'Laboratorio NARANJA';
      period_id = '1';
      shouldBeCreated = true
      cy.bookingLogs(date, labName, period_id)
      cy.submitBookingForm(date, labName, 'Sistemas', 'Arquitectura de las computadoras', 'Ezequiel Escobar', period_id, 'fbancalari')

      cy.location('pathname').should('eq', '/reservas/index.php/bookings/index')
      cy.get('p.msgbox.info').should('have.text','Se realizó la reserva.')
    })

    // DONE
    it('Crear - reserva correcta con fecha pasada', () => {
      date = new Date();
      date.setDate(date.getDate() - 7)
      labName = 'Laboratorio AMARILLO';
      period_id = '1';
      shouldBeCreated = true
      cy.bookingLogs(date, labName, period_id)
      cy.submitBookingForm(date, labName, 'Sistemas', 'Arquitectura de las computadoras', 'Ezequiel Escobar', period_id, 'fbancalari')

      cy.location('pathname').should('eq', '/reservas/index.php/bookings/index')
      cy.get('p.msgbox.info').should('have.text','Se realizó la reserva.')
    })

    // DONE
    it('Crear - fecha imposible 33/09/23', () => {
      date = '33/09/2023';
      labName = 'Laboratorio NARANJA';
      period_id = '2';
      shouldBeCreated = false
      cy.bookingLogs(date, labName, period_id)
      cy.submitBookingForm(date, labName, 'Sistemas', 'Arquitectura de las computadoras', 'Ezequiel Escobar', period_id, 'fbancalari', false)

      cy.location('pathname').should('eq', '/reservas/index.php/bookings/save')
      cy.get('p.hint.error').should('have.text','Fecha Invalida')
    })

    // DONE
    it('Crear - fecha con mes imposible 01/13/23', () => {
      date = '01/13/2023';
      labName = 'Laboratorio NARANJA';
      period_id = '3';
      shouldBeCreated = false
      cy.bookingLogs(date, labName, period_id)
      cy.submitBookingForm(date, labName, 'Sistemas', 'Arquitectura de las computadoras', 'Ezequiel Escobar', period_id, 'fbancalari', false)

      cy.location('pathname').should('eq', '/reservas/index.php/bookings/save')
      cy.get('p.hint.error').should('have.text','Fecha Invalida')
    })

    // DONE
    it('Crear - fecha con mes imposible 01/00/23', () => {
      date = '01/00/2023';
      labName = 'Laboratorio ROJO';
      period_id = '1';
      shouldBeCreated = false
      cy.bookingLogs(date, labName, period_id)
      cy.submitBookingForm(date, labName, 'Sistemas', 'Arquitectura de las computadoras', 'Ezequiel Escobar', period_id, 'fbancalari', false)

      cy.location('pathname').should('eq', '/reservas/index.php/bookings/save')
      cy.get('p.hint.error').should('have.text','Fecha Invalida')
    })

    // DONE
    it('Crear - fecha como texto escrito', () => {
      date = 'texto';
      labName = 'Laboratorio AZUL';
      period_id = '1';
      shouldBeCreated = false
      cy.bookingLogs(date, labName, period_id)
      cy.submitBookingForm(date, labName, 'Sistemas', 'Arquitectura de las computadoras', 'Ezequiel Escobar', period_id, 'fbancalari', false)

      cy.location('pathname').should('eq', '/reservas/index.php/bookings/save')
      cy.get('p.hint.error').should('have.text','Fecha Invalida')
    })

    // DONE
    it('Crear - reservas simultaneas', () => {
      date = new Date();
      labName = 'Laboratorio AMARILLO';
      period_id = '1';
      shouldBeCreated = true
      cy.bookingLogs(date, labName, period_id)
      cy.submitBookingForm(date, labName, 'Sistemas', 'Arquitectura de las computadoras', 'Ezequiel Escobar', period_id, 'fbancalari')

      cy.pressReservarButton();
      cy.submitBookingForm(date, labName, 'Sistemas', 'Paradigmas de Programacion', 'Juan Manuel Fernandez Dos Santos', period_id, 'fbancalari')

      cy.location('pathname').should('eq', '/reservas/index.php/bookings/save')
      cy.get('p.msgbox.exclamation').should('have.text','Ya hay una reserva para ese laboratorio en ese dia y horario.')
    })

    // DONE
    it('Crear - carrera sin materias cargadas', () => {
      date = new Date();
      labName = 'Laboratorio ROJO';
      period_id = '2';
      shouldBeCreated = true
      cy.bookingLogs(date, labName, period_id)
      cy.submitBookingForm(date, labName, 'Quimica', null, null, period_id, 'fbancalari')

      cy.location('pathname').should('eq', '/reservas/index.php/bookings/index')
      cy.get('p.msgbox.info').should('have.text','Se realizó la reserva.')
    })

    // DONE
    it('Crear - asignatura sin docentes cargados', () => {
      date = new Date();
      labName = 'Laboratorio ROJO';
      period_id = '3';
      shouldBeCreated = true
      cy.bookingLogs(date, labName, period_id)
      cy.submitBookingForm(date, labName, 'Sistemas', 'Gestion de Datos', null, period_id, 'fbancalari')

      cy.location('pathname').should('eq', '/reservas/index.php/bookings/index')
      cy.get('p.msgbox.info').should('have.text','Se realizó la reserva.')
    })

    // DONE
    it('Crear - reserva fuera del ciclo lectivo (sabado noche)', () => {
      date = getDateNextDayOfWeek('saturday');
      labName = 'Laboratorio AMARILLO';
      period_id = '3';
      shouldBeCreated = false
      cy.bookingLogs(date, labName, period_id)
      cy.submitBookingForm(date, labName, 'Sistemas', 'Arquitectura de las computadoras', 'Ezequiel Escobar', period_id, 'fbancalari')

      cy.location('pathname').should('not.eq', '/reservas/index.php/bookings/index')
      cy.get('p.msgbox.exclamation').should('not.have.text','Ya hay una reserva para ese laboratorio en ese dia y horario.')
      cy.get('p.msgbox.info').should('not.have.text','Se realizó la reserva.')
    })

    // DONE
    it('Crear - reserva fuera del ciclo lectivo (domingo)', () => {
      date = getDateNextDayOfWeek('sunday');
      labName = 'Laboratorio AMARILLO';
      period_id = '1';
      shouldBeCreated = false
      cy.bookingLogs(date, labName, period_id)
      cy.submitBookingForm(date, labName, 'Sistemas', 'Arquitectura de las computadoras', 'Ezequiel Escobar', period_id, 'fbancalari')

      cy.location('pathname').should('not.eq', '/reservas/index.php/bookings/index')
      cy.get('p.msgbox.exclamation').should('not.have.text','Ya hay una reserva para ese laboratorio en ese dia y horario.')
      cy.get('p.msgbox.info').should('not.have.text','Se realizó la reserva.')
    })

  afterEach(function(){
    if (shouldBeCreated){
      cy.deleteBooking(date, labName, period_id)
    }
  })
})  
});