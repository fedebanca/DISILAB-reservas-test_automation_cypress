describe('Temporal', () => {

  var date, labName, period_id
  // period_id values: 1-mañana; 2-tarde; 3-noche

  context('Temporal', () =>{

      beforeEach(function(){
    cy.login('http://localhost/reservas/index.php/login','fbancalari','fbancalari*')
  })

    it.skip('confirm existing booking (not the same, dif career)', () => {
      date = '2023-10-12';
      labName = 'Laboratorio AMARILLO';
      period_id = '1';
      cy.assertBookingExists(date, labName, 'Quimica', 'Arquitectura de las computadoras', 'Ezequiel Escobar', period_id, 'fbancalari2', true, false)
    })
  })
});