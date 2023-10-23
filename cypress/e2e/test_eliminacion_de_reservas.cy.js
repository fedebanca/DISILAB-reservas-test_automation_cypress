const { getDateNextDayOfWeek } = require('../utils/common');

describe('Test - RF1 - Editar reserva', () => {  

  context('Test - Editar reserva correcta (Link)', () =>{    

    var date, labName, period_id, careerName, subjectName, teacherName, userName, bookingShouldExist
    // period_id values: 1-mañana; 2-tarde; 3-noche

    beforeEach(function(){
      cy.login('http://localhost/reservas/index.php/login','fbancalari','fbancalari*')
      date = new Date();
      labName = 'Laboratorio AMARILLO';
      careerName = 'Sistemas'
      subjectName = 'Arquitectura de las computadoras'
      teacherName = 'Ezequiel Escobar'
      period_id = '1';
      userName = 'fbancalari'
      cy.createBooking(date, labName, careerName, subjectName, teacherName, period_id, userName)
    })

    // DONE
    it('Eliminar - cancelar eliminación', () => {
      bookingShouldExist = true
      cy.bookingLogs(date, labName, period_id)
      cy.deleteBooking(date, labName, period_id)

      cy.on('window:confirm', (str) => {
        expect(str).to.equal(`Esta seguro que quiere cancelar esta reserva?`)
      })
      cy.on('window:confirm', () => false)
      cy.location('pathname').should('eq', '/reservas/index.php/bookings')
      cy.assertBookingExists(date, labName, careerName, subjectName, teacherName, period_id, userName, bookingShouldExist)
    })

    // DONE
    it('Eliminar - cancelar eliminación de otro administrador', () => {
      bookingShouldExist = true
      cy.login('http://localhost/reservas/index.php/login','fbancalari2','fbancalari2*')
      cy.bookingLogs(date, labName, period_id)
      cy.deleteBooking(date, labName, period_id)

      cy.on('window:confirm', (str) => {
        expect(str).to.equal(`Esta seguro que quiere cancelar esta reserva?\n\n(**) Tenga cuidado, usted no ha pedido esta reserva.`)
      })
      cy.on('window:confirm', () => false)
      cy.location('pathname').should('eq', '/reservas/index.php/bookings')
      cy.assertBookingExists(date, labName, careerName, subjectName, teacherName, period_id, userName, bookingShouldExist)
    })

    // DONE
    it('Eliminar - reserva propia', () => {
      bookingShouldExist = false
      cy.bookingLogs(date, labName, period_id)
      cy.deleteBooking(date, labName, period_id)

      cy.on('window:confirm', (str) => {
        expect(str).to.equal(`Esta seguro que quiere cancelar esta reserva?`)
      })
      cy.on('window:confirm', () => true)
      cy.location('pathname').should('eq', '/reservas/index.php/bookings/index')
      cy.get('p.msgbox.info').should('have.text','La reserva ha sido cancelada.')
      cy.assertBookingExists(date, labName, careerName, subjectName, teacherName, period_id, userName, bookingShouldExist)
    })

    // DONE
    it('Eliminar - reserva de otro administrador', () => {
      bookingShouldExist = false
      cy.login('http://localhost/reservas/index.php/login','fbancalari2','fbancalari2*')
      cy.bookingLogs(date, labName, period_id)
      cy.deleteBooking(date, labName, period_id)

      cy.on('window:confirm', (str) => {
        expect(str).to.equal(`Esta seguro que quiere cancelar esta reserva?\n\n(**) Tenga cuidado, usted no ha pedido esta reserva.`)
      })
      cy.on('window:confirm', () => true)
      cy.location('pathname').should('eq', '/reservas/index.php/bookings/index')
      cy.get('p.msgbox.info').should('have.text','La reserva ha sido cancelada.')
      cy.assertBookingExists(date, labName, careerName, subjectName, teacherName, period_id, userName, bookingShouldExist)
    })
})
});