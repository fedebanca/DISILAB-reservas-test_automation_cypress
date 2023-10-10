describe('Temporal', () => {
  beforeEach(function(){
    cy.login('http://localhost/reservas/index.php/login','fbancalari','fbancalari*')
  })

  var date, labName, period_id
  // period_id values: 1-mañana; 2-tarde; 3-noche

  context('Temporal', () =>{

    it('confirm existing booking (not the same, dif career)', () => {
      date = '2023-10-12';
      labName = 'Laboratorio AMARILLO';
      period_id = '1';
      cy.assertBookingExists(date, labName, 'Quimica', 'Arquitectura de las computadoras', 'Ezequiel Escobar', period_id, 'fbancalari2', true, false)
    })

    it('confirm existing booking (not the same, dif user)', () => {
      date = '2023-10-12';
      labName = 'Laboratorio AMARILLO';
      period_id = '1';
      cy.assertBookingExists(date, labName, 'Sistemas', 'Arquitectura de las computadoras', 'Ezequiel Escobar', period_id, 'fbancalari', true, false)
    })

    it('confirm existing booking (should exist)', () => {
      date = '2023-10-12';
      labName = 'Laboratorio AMARILLO';
      period_id = '1';
      cy.assertBookingExists(date, labName, 'Sistemas', 'Arquitectura de las computadoras', 'Ezequiel Escobar', period_id, 'fbancalari2', true, false)
    })

    it('confirm existing booking (should NOT exist)', () => {
      date = '2023-10-12';
      labName = 'Laboratorio AMARILLO';
      period_id = '1';
      cy.assertBookingExists(date, labName, 'Sistemas', 'Arquitectura de las computadoras', 'Ezequiel Escobar', period_id, 'fbancalari2', false, false)
    })

    it('confirm unexisting booking (should exist)', () => {
      date = '2023-10-12';
      labName = 'Laboratorio AMARILLO';
      period_id = '3';
      cy.assertBookingExists(date, labName, 'Sistemas', 'Arquitectura de las computadoras', 'Ezequiel Escobar', period_id, 'fbancalari2', true, false)
    })

    it('confirm unexisting booking (should NOT exist)', () => {
      date = '2023-10-12';
      labName = 'Laboratorio AMARILLO';
      period_id = '3';
      cy.assertBookingExists(date, labName, 'Sistemas', 'Arquitectura de las computadoras', 'Ezequiel Escobar', period_id, 'fbancalari2', false, false)
    })
  })
});