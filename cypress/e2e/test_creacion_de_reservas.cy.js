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

      cy.get('#date').type(date.toLocaleDateString('en-GB'));
      cy.get('select[name=room_id]').select(labName);
      cy.get('#career_id').select('Sistemas');
      cy.get('#subject_id').select('Arquitectura de las computadoras')
      cy.get('#teacher_id').select('Ezequiel Escobar')
      cy.get('select[name=period_id]').select(period_id)
      cy.get('#user_id').select('fbancalari')
      // cy.get('#notes').clear().type('Crear reserva correcta');
      cy.get('.submit > input').click();

      cy.location('pathname').should('eq', '/reservas/index.php/bookings/index')

      cy.get('p.msgbox.info').should('have.text','Se realizó la reserva.')
    })

    // DONE
    it('Crear - reserva correcta con fecha pasada', () => {
      date = new Date();
      // Create a new Date object by subtracting two days (2 * 24 * 60 * 60 * 1000 milliseconds) from today's date
      date = new Date(date.getTime() - 2 * 24 * 60 * 60 * 1000);
      labName = 'Laboratorio AMARILLO';
      period_id = '1';
      shouldBeCreated = true

      cy.bookingLogs(date, labName, period_id)

      cy.get('#date').type(date.toLocaleDateString('en-GB'));
      cy.get('select[name=room_id]').select(labName);
      cy.get('#career_id').select('Sistemas');
      cy.get('#subject_id').select('Arquitectura de las computadoras')
      cy.get('#teacher_id').select('Ezequiel Escobar')
      cy.get('select[name=period_id]').select(period_id)
      cy.get('#user_id').select('fbancalari')
      // cy.get('#notes').clear().type('Crear - reserva correcta con fecha pasada');
      cy.get('.submit > input').click();

      cy.location('pathname').should('eq', '/reservas/index.php/bookings/index')

      cy.get('p.msgbox.info').should('have.text','Se realizó la reserva.')
    })    

    // DONE
    it('Crear - fecha imposible 33/09/23', () => {
      date = '33/09/2023';
      labName = 'Laboratorio AMARILLO';
      period_id = '2';
      shouldBeCreated = false

      cy.get('#date').type(date);
      cy.get('select[name=room_id]').select(labName);
      cy.get('#career_id').select('Sistemas');
      cy.get('#subject_id').select('Arquitectura de las computadoras')
      cy.get('#teacher_id').select('Ezequiel Escobar')
      cy.get('select[name=period_id]').select(period_id)
      cy.get('#user_id').select('fbancalari')
      // cy.get('#notes').clear().type('Crear reserva con fecha incorrecta');
      cy.get('.submit > input').click();

      cy.location('pathname').should('eq', '/reservas/index.php/bookings/save')

      cy.get('p.hint.error').should('have.text','Fecha Invalida')
    })

    // DONE
    it('Crear - fecha con mes imposible 01/13/23', () => {
      date = '01/13/2023';
      labName = 'Laboratorio AMARILLO';
      period_id = '3';
      shouldBeCreated = false

      cy.get('#date').type(date);
      cy.get('select[name=room_id]').select(labName);
      cy.get('#career_id').select('Sistemas');
      cy.get('#subject_id').select('Arquitectura de las computadoras')
      cy.get('#teacher_id').select('Ezequiel Escobar')
      cy.get('select[name=period_id]').select(period_id)
      cy.get('#user_id').select('fbancalari')
      // cy.get('#notes').clear().type('Crear - fecha con mes imposible 01/13/23');
      cy.get('.submit > input').click();

      cy.location('pathname').should('eq', '/reservas/index.php/bookings/save')

      cy.get('p.hint.error').should('have.text','Fecha Invalida')
    })

    // DONE
    it('Crear - fecha con mes imposible 01/00/23', () => {
      date = '01/00/2023';
      labName = 'Laboratorio AZUL';
      period_id = '1';
      shouldBeCreated = false

      cy.get('#date').type(date);
      cy.get('select[name=room_id]').select(labName);
      cy.get('#career_id').select('Sistemas');
      cy.get('#subject_id').select('Arquitectura de las computadoras')
      cy.get('#teacher_id').select('Ezequiel Escobar')
      cy.get('select[name=period_id]').select(period_id)
      cy.get('#user_id').select('fbancalari')
      // cy.get('#notes').clear().type('Crear reserva con fecha imposible 01/00/23');
      cy.get('.submit > input').click();

      cy.location('pathname').should('eq', '/reservas/index.php/bookings/save')

      cy.get('p.hint.error').should('have.text','Fecha Invalida')
    })

    // DONE
    it('Crear - fecha como texto escrito', () => {
      date = 'texto';
      labName = 'Laboratorio AZUL';
      period_id = '1';
      shouldBeCreated = false

      cy.get('#date').type(date);
      cy.get('select[name=room_id]').select(labName);
      cy.get('#career_id').select('Sistemas');
      cy.get('#subject_id').select('Arquitectura de las computadoras')
      cy.get('#teacher_id').select('Ezequiel Escobar')
      cy.get('select[name=period_id]').select(period_id)
      cy.get('#user_id').select('fbancalari')
      // cy.get('#notes').clear().type('Crear - fecha como texto escrito');
      cy.get('.submit > input').click();

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

      cy.get('#date').type(date.toLocaleDateString('en-GB'));
      cy.get('select[name=room_id]').select(labName);
      cy.get('#career_id').select('Sistemas');
      cy.get('#subject_id').select('Arquitectura de las computadoras')
      cy.get('#teacher_id').select('Ezequiel Escobar')
      cy.get('select[name=period_id]').select(period_id)
      cy.get('#user_id').select('fbancalari')
      // cy.get('#notes').clear().type('Crear reserva correcta');
      cy.get('.submit > input').click();

      cy.visit('http://localhost/reservas/index.php/bookings/book')

      cy.get('#date').type(date.toLocaleDateString('en-GB'));
      cy.get('select[name=room_id]').select(labName);
      cy.get('#career_id').select('Sistemas');
      cy.get('#subject_id').select('Paradigmas de Programacion')
      cy.get('#teacher_id').select('Juan Manuel Fernandez Dos Santos')
      cy.get('select[name=period_id]').select(period_id)
      cy.get('#user_id').select('fbancalari')
      // cy.get('#notes').clear().type('Crear reserva correcta');
      cy.get('.submit > input').click();

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

      cy.get('#date').type(date.toLocaleDateString('en-GB'));
      cy.get('select[name=room_id]').select(labName);
      cy.get('#career_id').select('Quimica');
      cy.get('select[name=period_id]').select(period_id)
      cy.get('#user_id').select('fbancalari')
      // cy.get('#notes').clear().type('Carrera sin materias cargadas');
      cy.get('.submit > input').click();

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

      cy.get('#date').type(date.toLocaleDateString('en-GB'));
      cy.get('select[name=room_id]').select(labName);
      cy.get('#career_id').select('Sistemas');
      cy.get('#subject_id').select('Gestion de Datos')
      cy.get('select[name=period_id]').select(period_id)
      cy.get('#user_id').select('fbancalari')
      // cy.get('#notes').clear().type('Asignatura sin docentes cargados');
      cy.get('.submit > input').click();

      cy.location('pathname').should('eq', '/reservas/index.php/bookings/index')

      cy.get('p.msgbox.info').should('have.text','Se realizó la reserva.')
    })

    // DONE
    it('Crear - reserva fuera del ciclo lectivo (domingo)', () => {
      const today = new Date(); // Create a new Date object for today
      const currentDayOfWeek = today.getDay(); // Get the current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
      const daysUntilNextSunday = 7 - currentDayOfWeek; // Calculate the number of days until the next Sunday
      const nextSunday = new Date(today); // Create a new Date object for the next Sunday
      nextSunday.setDate(today.getDate() + daysUntilNextSunday);

      date = nextSunday;
      labName = 'Laboratorio AMARILLO';
      period_id = '1';
      shouldBeCreated = false

      cy.bookingLogs(date, labName, period_id)

      cy.get('#date').type(date.toLocaleDateString('en-GB'));
      cy.get('select[name=room_id]').select(labName);
      cy.get('#career_id').select('Sistemas');
      cy.get('#subject_id').select('Arquitectura de las computadoras')
      cy.get('#teacher_id').select('Ezequiel Escobar')
      cy.get('select[name=period_id]').select(period_id)
      cy.get('#user_id').select('fbancalari')
      // cy.get('#notes').clear().type('Crear reserva correcta');
      cy.get('.submit > input').click();

      cy.location('pathname').should('not.eq', '/reservas/index.php/bookings/index')

      cy.get('p.msgbox.exclamation').should('not.have.text','Ya hay una reserva para ese laboratorio en ese dia y horario.')

      cy.get('p.msgbox.info').should('not.have.text','Se realizó la reserva.')
    })

    // DONE
    it('Crear - reserva fuera del ciclo lectivo (sabado noche)', () => {
      const today = new Date(); // Create a new Date object for today
      const currentDayOfWeek = today.getDay(); // Get the current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
      const daysUntilNextSaturday = 6 - currentDayOfWeek; // Calculate the number of days until the next Saturday
      const nextSaturday = new Date(today); // Create a new Date object for the next Saturday
      nextSaturday.setDate(today.getDate() + daysUntilNextSaturday);

      date = nextSaturday;
      labName = 'Laboratorio AMARILLO';
      period_id = '3';
      shouldBeCreated = false

      cy.bookingLogs(date, labName, period_id)

      cy.get('#date').type(date.toLocaleDateString('en-GB'));
      cy.get('select[name=room_id]').select(labName);
      cy.get('#career_id').select('Sistemas');
      cy.get('#subject_id').select('Arquitectura de las computadoras')
      cy.get('#teacher_id').select('Ezequiel Escobar')
      cy.get('select[name=period_id]').select(period_id)
      cy.get('#user_id').select('fbancalari')
      // cy.get('#notes').clear().type('Crear reserva correcta');
      cy.get('.submit > input').click();

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

      cy.get('#date').clear().type(date.toLocaleDateString('en-GB'));
      cy.get('select[name=room_id]').select(labName);
      cy.get('#career_id').select('Sistemas');
      cy.get('#subject_id').select('Arquitectura de las computadoras')
      cy.get('#teacher_id').select('Ezequiel Escobar')
      cy.get('select[name=period_id]').select(period_id)
      cy.get('#user_id').select('fbancalari')
      // cy.get('#notes').clear().type('Crear reserva correcta');
      cy.get('.submit > input').click();

      cy.location('pathname').should('eq', '/reservas/index.php/bookings/index')

      cy.get('p.msgbox.info').should('have.text','Se realizó la reserva.')
    })

    // DONE
    it('Crear - reserva correcta con fecha pasada', () => {
      date = new Date();
      // Create a new Date object by subtracting two days (2 * 24 * 60 * 60 * 1000 milliseconds) from today's date
      date = new Date(date.getTime() - 2 * 24 * 60 * 60 * 1000);
      labName = 'Laboratorio AMARILLO';
      period_id = '1';
      shouldBeCreated = true

      cy.bookingLogs(date, labName, period_id)

      cy.get('#date').clear().type(date.toLocaleDateString('en-GB'));
      cy.get('select[name=room_id]').select(labName);
      cy.get('#career_id').select('Sistemas');
      cy.get('#subject_id').select('Arquitectura de las computadoras')
      cy.get('#teacher_id').select('Ezequiel Escobar')
      cy.get('select[name=period_id]').select(period_id)
      cy.get('#user_id').select('fbancalari')
      // cy.get('#notes').clear().type('Crear - reserva correcta con fecha pasada');
      cy.get('.submit > input').click();

      cy.location('pathname').should('eq', '/reservas/index.php/bookings/index')

      cy.get('p.msgbox.info').should('have.text','Se realizó la reserva.')
    })

    // DONE
    it('Crear - fecha imposible 33/09/23', () => {
      date = '33/09/2023';
      labName = 'Laboratorio NARANJA';
      period_id = '2';
      shouldBeCreated = false

      cy.get('#date').clear().type(date);
      cy.get('select[name=room_id]').select(labName);
      cy.get('#career_id').select('Sistemas');
      cy.get('#subject_id').select('Arquitectura de las computadoras')
      cy.get('#teacher_id').select('Ezequiel Escobar')
      cy.get('select[name=period_id]').select(period_id)
      cy.get('#user_id').select('fbancalari')
      // cy.get('#notes').clear().type('Crear reserva con fecha incorrecta');
      cy.get('.submit > input').click();

      cy.location('pathname').should('eq', '/reservas/index.php/bookings/save')

      cy.get('p.hint.error').should('have.text','Fecha Invalida')
    })

    // DONE
    it('Crear - fecha con mes imposible 01/13/23', () => {
      date = '01/13/2023';
      labName = 'Laboratorio NARANJA';
      period_id = '3';
      shouldBeCreated = false

      cy.get('#date').clear().type(date);
      cy.get('select[name=room_id]').select(labName);
      cy.get('#career_id').select('Sistemas');
      cy.get('#subject_id').select('Arquitectura de las computadoras')
      cy.get('#teacher_id').select('Ezequiel Escobar')
      cy.get('select[name=period_id]').select(period_id)
      cy.get('#user_id').select('fbancalari')
      // cy.get('#notes').clear().type('Crear - fecha con mes imposible 01/13/23');
      cy.get('.submit > input').click();

      cy.location('pathname').should('eq', '/reservas/index.php/bookings/save')

      cy.get('p.hint.error').should('have.text','Fecha Invalida')
    })

    // DONE
    it('Crear - fecha con mes imposible 01/00/23', () => {
      date = '01/00/2023';
      labName = 'Laboratorio ROJO';
      period_id = '1';
      shouldBeCreated = false

      cy.get('#date').clear().type(date);
      cy.get('select[name=room_id]').select(labName);
      cy.get('#career_id').select('Sistemas');
      cy.get('#subject_id').select('Arquitectura de las computadoras')
      cy.get('#teacher_id').select('Ezequiel Escobar')
      cy.get('select[name=period_id]').select(period_id)
      cy.get('#user_id').select('fbancalari')
      // cy.get('#notes').clear().type('Crear reserva con fecha imposible 01/00/23');
      cy.get('.submit > input').click();

      cy.location('pathname').should('eq', '/reservas/index.php/bookings/save')

      cy.get('p.hint.error').should('have.text','Fecha Invalida')
    })

    // DONE
    it('Crear - fecha como texto escrito', () => {
      date = 'texto';
      labName = 'Laboratorio AZUL';
      period_id = '1';
      shouldBeCreated = false

      cy.get('#date').clear().type(date);
      cy.get('select[name=room_id]').select(labName);
      cy.get('#career_id').select('Sistemas');
      cy.get('#subject_id').select('Arquitectura de las computadoras')
      cy.get('#teacher_id').select('Ezequiel Escobar')
      cy.get('select[name=period_id]').select(period_id)
      cy.get('#user_id').select('fbancalari')
      // cy.get('#notes').clear().type('Crear - fecha como texto escrito');
      cy.get('.submit > input').click();

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

      cy.get('#date').type(date.toLocaleDateString('en-GB'));
      cy.get('select[name=room_id]').select(labName);
      cy.get('#career_id').select('Sistemas');
      cy.get('#subject_id').select('Arquitectura de las computadoras')
      cy.get('#teacher_id').select('Ezequiel Escobar')
      cy.get('select[name=period_id]').select(period_id)
      cy.get('#user_id').select('fbancalari')
      // cy.get('#notes').clear().type('Crear reserva correcta');
      cy.get('.submit > input').click();

      cy.pressReservarButton();

      cy.get('#date').type(date.toLocaleDateString('en-GB'));
      cy.get('select[name=room_id]').select(labName);
      cy.get('#career_id').select('Sistemas');
      cy.get('#subject_id').select('Paradigmas de Programacion')
      cy.get('#teacher_id').select('Juan Manuel Fernandez Dos Santos')
      cy.get('select[name=period_id]').select(period_id)
      cy.get('#user_id').select('fbancalari')
      // cy.get('#notes').clear().type('Crear reserva correcta');
      cy.get('.submit > input').click();

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

      cy.get('#date').clear().type(date.toLocaleDateString('en-GB'));
      cy.get('select[name=room_id]').select(labName);
      cy.get('#career_id').select('Quimica');
      cy.get('select[name=period_id]').select(period_id)
      cy.get('#user_id').select('fbancalari')
      // cy.get('#notes').clear().type('Carrera sin materias cargadas');
      cy.get('.submit > input').click();

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

      cy.get('#date').clear().type(date.toLocaleDateString('en-GB'));
      cy.get('select[name=room_id]').select(labName);
      cy.get('#career_id').select('Sistemas');
      cy.get('#subject_id').select('Gestion de Datos')
      cy.get('select[name=period_id]').select(period_id)
      cy.get('#user_id').select('fbancalari')
      // cy.get('#notes').clear().type('Asignatura sin docentes cargados');
      cy.get('.submit > input').click();

      cy.location('pathname').should('eq', '/reservas/index.php/bookings/index')

      cy.get('p.msgbox.info').should('have.text','Se realizó la reserva.')
    })

    // DONE
    it('Crear - reserva fuera del ciclo lectivo (domingo)', () => {
      const today = new Date(); // Create a new Date object for today
      const currentDayOfWeek = today.getDay(); // Get the current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
      const daysUntilNextSunday = 7 - currentDayOfWeek; // Calculate the number of days until the next Sunday
      const nextSunday = new Date(today); // Create a new Date object for the next Sunday
      nextSunday.setDate(today.getDate() + daysUntilNextSunday);

      date = nextSunday;
      labName = 'Laboratorio AMARILLO';
      period_id = '1';
      shouldBeCreated = false

      cy.bookingLogs(date, labName, period_id)

      cy.get('#date').clear().type(date.toLocaleDateString('en-GB'));
      cy.get('select[name=room_id]').select(labName);
      cy.get('#career_id').select('Sistemas');
      cy.get('#subject_id').select('Arquitectura de las computadoras')
      cy.get('#teacher_id').select('Ezequiel Escobar')
      cy.get('select[name=period_id]').select(period_id)
      cy.get('#user_id').select('fbancalari')
      // cy.get('#notes').clear().type('Crear reserva correcta');
      cy.get('.submit > input').click();

      cy.location('pathname').should('not.eq', '/reservas/index.php/bookings/index')

      cy.get('p.msgbox.exclamation').should('not.have.text','Ya hay una reserva para ese laboratorio en ese dia y horario.')

      cy.get('p.msgbox.info').should('not.have.text','Se realizó la reserva.')
    })

    // DONE
    it('Crear - reserva fuera del ciclo lectivo (sabado noche)', () => {
      const today = new Date(); // Create a new Date object for today
      const currentDayOfWeek = today.getDay(); // Get the current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
      const daysUntilNextSaturday = 6 - currentDayOfWeek; // Calculate the number of days until the next Saturday
      const nextSaturday = new Date(today); // Create a new Date object for the next Saturday
      nextSaturday.setDate(today.getDate() + daysUntilNextSaturday);

      date = nextSaturday;
      labName = 'Laboratorio AMARILLO';
      period_id = '3';
      shouldBeCreated = false

      cy.bookingLogs(date, labName, period_id)

      cy.get('#date').clear().type(date.toLocaleDateString('en-GB'));
      cy.get('select[name=room_id]').select(labName);
      cy.get('#career_id').select('Sistemas');
      cy.get('#subject_id').select('Arquitectura de las computadoras')
      cy.get('#teacher_id').select('Ezequiel Escobar')
      cy.get('select[name=period_id]').select(period_id)
      cy.get('#user_id').select('fbancalari')
      // cy.get('#notes').clear().type('Crear reserva correcta');
      cy.get('.submit > input').click();

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