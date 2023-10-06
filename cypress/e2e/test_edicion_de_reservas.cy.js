describe('Test - RF1 - Editar reserva', () => {  

  // Se hace la diferencia entre la creación de reservar utilizando el boton de reservas encontrado en la tabla dentro del link http://localhost/reservas/index.php/bookings/index debido a que tiene comportamiento distinto a que si se utiliza el formulario accedido directamente con el link http://localhost/reservas/index.php/bookings/book
  context('Test - Editar reserva correcta (Link)', () =>{    

    var date, labName, period_id, dateSup, labNameSup, period_idSup
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

      cy.bookingLogs(date, labName, period_id)

      cy.get('#date').clear().type(date.toLocaleDateString('en-GB'));
      cy.get('select[name=room_id]').select(labName);
      cy.get('#career_id').select('Sistemas');
      cy.get('#subject_id').select('Arquitectura de las computadoras')
      cy.get('#teacher_id').select('Ezequiel Escobar')
      cy.get('select[name=period_id]').select(period_id)
      cy.get('#user_id').select('fbancalari')
      // cy.get('#notes').clear().type('Editar reserva correcta');
      cy.get('.submit > input').click();

      cy.location('pathname').should('eq', '/reservas/index.php/bookings/index')

      cy.get('p.msgbox.info').should('have.text','Se actualizó la reserva.')
    })

    // DOING
    it('Editar - reserva para una fecha pasada', () => {
      date = new Date();
      date.setDate(date.getDate() - 1)
      labName = 'Laboratorio AZUL';
      period_id = '3';

      cy.bookingLogs(date, labName, period_id)

      cy.get('#date').clear().type(date.toLocaleDateString('en-GB'));
      cy.get('select[name=room_id]').select(labName);
      cy.get('#career_id').select('Sistemas');
      cy.get('#subject_id').select('Arquitectura de las computadoras')
      cy.get('#teacher_id').select('Ezequiel Escobar')
      cy.get('select[name=period_id]').select(period_id)
      cy.get('#user_id').select('fbancalari')
      // cy.get('#notes').clear().type('Editar reserva correcta');
      cy.get('.submit > input').click();

      cy.location('pathname').should('eq', '/reservas/index.php/bookings/index')

      cy.get('p.msgbox.info').should('have.text','Se actualizó la reserva.')
    })

    // DONE
    it('Editar - fecha imposible 33/09/23', () => {
      cy.get('#date').clear().type('33/09/2023');
      cy.get('select[name=room_id]').select('Laboratorio AMARILLO');
      cy.get('#career_id').select('Sistemas');
      cy.get('#subject_id').select('Arquitectura de las computadoras')
      cy.get('#teacher_id').select('Ezequiel Escobar')
      cy.get('select[name=period_id]').select('2')
      cy.get('#user_id').select('fbancalari')
      // cy.get('#notes').clear().type('Editar reserva con fecha incorrecta');
      cy.get('.submit > input').click();

      cy.location('pathname').should('eq', '/reservas/index.php/bookings/save')

      cy.get('p.hint.error').should('have.text','Fecha Invalida')
    })

    // DONE
    it('Editar - fecha con mes imposible 01/13/23', () => {
      cy.get('#date').clear().type('01/13/2023');
      cy.get('select[name=room_id]').select('Laboratorio AMARILLO');
      cy.get('#career_id').select('Sistemas');
      cy.get('#subject_id').select('Arquitectura de las computadoras')
      cy.get('#teacher_id').select('Ezequiel Escobar')
      cy.get('select[name=period_id]').select('3')
      cy.get('#user_id').select('fbancalari')
      // cy.get('#notes').clear().type('Editar - fecha con mes imposible 01/13/23');
      cy.get('.submit > input').click();

      cy.location('pathname').should('eq', '/reservas/index.php/bookings/save')

      cy.get('p.hint.error').should('have.text','Fecha Invalida')
    })

    // DONE
    it('Editar - fecha con mes imposible 01/00/23', () => {
      cy.get('#date').clear().type('01/00/23');
      cy.get('select[name=room_id]').select('Laboratorio AZUL');
      cy.get('#career_id').select('Sistemas');
      cy.get('#subject_id').select('Arquitectura de las computadoras')
      cy.get('#teacher_id').select('Ezequiel Escobar')
      cy.get('select[name=period_id]').select('1')
      cy.get('#user_id').select('fbancalari')
      // cy.get('#notes').clear().type('Editar reserva con fecha imposible 01/00/23');
      cy.get('.submit > input').click();

      cy.location('pathname').should('eq', '/reservas/index.php/bookings/save')

      cy.get('p.hint.error').should('have.text','Fecha Invalida')
    })

    // DONE
    it.only('Editar - fecha como texto', () => {

      cy.get('#date').clear().type('texto');
      cy.get('select[name=room_id]').select('Laboratorio AMARILLO');
      cy.get('#career_id').select('Sistemas');
      cy.get('#subject_id').select('Arquitectura de las computadoras')
      cy.get('#teacher_id').select('Ezequiel Escobar')
      cy.get('select[name=period_id]').select('2')
      cy.get('#user_id').select('fbancalari')
      // cy.get('#notes').clear().type('Editar reserva con fecha incorrecta');
      cy.get('.submit > input').click();

      cy.location('pathname').should('eq', '/reservas/index.php/bookings/save')

      cy.get('p.hint.error').should('have.text','Fecha Invalida')
    })

    // DONE
    it('Editar - carrera sin materias cargadas', () => {
      labName = 'Laboratorio AZUL';
      period_id = '2';

      cy.bookingLogs(date, labName, period_id)

      cy.submitBookingForm(date, labName, 'Quimica', null, null, period_id, 'fbancalari')

      // cy.get('#date').clear().type(date.toLocaleDateString('en-GB'));
      // cy.get('select[name=room_id]').select(labName);
      // cy.get('#career_id').select('Quimica');
      // cy.get('select[name=period_id]').select(period_id)
      // cy.get('#user_id').select('fbancalari')
      // // cy.get('#notes').clear().type('Carrera sin materias cargadas');
      // cy.get('.submit > input').click();

      cy.location('pathname').should('eq', '/reservas/index.php/bookings/index')

      cy.get('p.msgbox.info').should('have.text','Se actualizó la reserva.')
    })

    // DONE
    it('Editar - asignatura sin docentes cargados', () => {
      labName = 'Laboratorio AZUL';
      period_id = '3';

      cy.bookingLogs(date, labName, period_id)

      cy.submitBookingForm(date, labName, 'Sistemas', 'Gestion de Datos', null, period_id, 'fbancalari')

      // cy.get('#date').clear().type(date.toLocaleDateString('en-GB'));
      // cy.get('select[name=room_id]').select(labName);
      // cy.get('#career_id').select('Sistemas');
      // cy.get('#subject_id').select('Gestion de Datos')
      // cy.get('select[name=period_id]').select(period_id)
      // cy.get('#user_id').select('fbancalari')
      // // cy.get('#notes').clear().type('Asignatura sin docentes cargados');
      // cy.get('.submit > input').click();

      cy.location('pathname').should('eq', '/reservas/index.php/bookings/index')

      cy.get('p.msgbox.info').should('have.text','Se actualizó la reserva.')
    })

    // DOING
    it('Editar - reserva correcta', () => {
      cy.bookingLogs(dateSup, labNameSup, period_idSup)

      cy.submitBookingForm(dateSup, labNameSup, 'Sistemas', 'Arquitectura de las computadoras', 'Ezequiel Escobar', period_idSup, 'fbancalari')

      // cy.get('#date').clear().type(dateSup.toLocaleDateString('en-GB'));
      // cy.get('select[name=room_id]').select(labNameSup);
      // cy.get('#career_id').select('Sistemas');
      // cy.get('#subject_id').select('Arquitectura de las computadoras')
      // cy.get('#teacher_id').select('Ezequiel Escobar')
      // cy.get('select[name=period_id]').select(period_idSup)
      // cy.get('#user_id').select('fbancalari')
      // // cy.get('#notes').clear().type('Editar reserva correcta');
      // cy.get('.submit > input').click();

      cy.location('pathname').should('eq', '/reservas/index.php/bookings/save')

      cy.get('p.msgbox.exclamation').should('have.text','Ya hay una reserva para ese laboratorio en ese dia y horario.')
    })

  afterEach(function(){
    cy.deleteBooking(date, labName, period_id)
  })

  after(function(){
    cy.deleteBooking(dateSup, labNameSup, period_idSup)
  })
})
});