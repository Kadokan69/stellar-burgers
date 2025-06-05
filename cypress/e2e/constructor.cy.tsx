describe('Burger Constructor Page', () => {
   const selectors = {
      ingredientItem: '[data-cy="ingredient-item"]',
      buttonOrder: '[data-cy="button-order"]',
      modals: '#modals',
      constructorOrder: '[data-cy="constructor-order"]'
  };

    beforeEach(() => {
        cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
        cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as('getUser');
        cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as('createOrder');
        cy.visit('/');
        cy.wait('@getIngredients');
        cy.wait('@getUser');
        window.localStorage.setItem('accessToken', 'mockAccessToken123');
    });

    it('Все элементы отображаются', () => {
        cy.get(selectors.ingredientItem).should('have.length', 15);
    });

    it('Добавление ингредиента из списка в конструктор', () => {
        cy.get(selectors.ingredientItem).contains('Краторная булка N-200i').parent('li').contains('Добавить').click()
    });

    it('Тестировие открытия модального окона', () => {
       cy.get(selectors.ingredientItem).contains('Краторная булка N-200i').click()

    });

    it('Тестировие закрытие модального окона на крестик', () => {
        cy.get(selectors.ingredientItem).contains('Краторная булка N-200i').click()
 
        cy.get(selectors.modals).find('button').click()
 
     });

     it('Проверяем что пользователь получен и присвоен accessToken', () => {
        cy.wait('@getUser').its('response.statusCode').should('eq', 200);
        cy.expect(localStorage.getItem('accessToken')).equal('mockAccessToken123');
     });

     it('Тест соборки заказа', () => {
        cy.get(selectors.ingredientItem).contains('Краторная булка N-200i').parent('li').contains('Добавить').click()
        cy.get(selectors.ingredientItem).contains('Биокотлета из марсианской Магнолии').parent('li').contains('Добавить').click()
        cy.get(selectors.ingredientItem).contains('Соус Spicy-X').parent('li').contains('Добавить').click()
        
     });

     it('Тест оформления заказа', () => {
        cy.get(selectors.ingredientItem).contains('Краторная булка N-200i').parent('li').contains('Добавить').click()
        cy.get(selectors.ingredientItem).contains('Биокотлета из марсианской Магнолии').parent('li').contains('Добавить').click()
        cy.get(selectors.ingredientItem).contains('Соус Spicy-X').parent('li').contains('Добавить').click()
        cy.get(selectors.buttonOrder).find('button').click()
        cy.wait('@createOrder');
     });

     it('Проверяется, что модальное окно открылось и номер заказа верный', () => {
        cy.get(selectors.ingredientItem).contains('Краторная булка N-200i').parent('li').contains('Добавить').click()
        cy.get(selectors.ingredientItem).contains('Биокотлета из марсианской Магнолии').parent('li').contains('Добавить').click()
        cy.get(selectors.ingredientItem).contains('Соус Spicy-X').parent('li').contains('Добавить').click()
        cy.get(selectors.buttonOrder).find('button').click()
        cy.wait('@createOrder');
        cy.get(selectors.modals).contains('64308')
     });

     it('Проверяется успешность закрытия модального окна', () => {
        cy.get(selectors.ingredientItem).contains('Краторная булка N-200i').parent('li').contains('Добавить').click()
        cy.get(selectors.ingredientItem).contains('Биокотлета из марсианской Магнолии').parent('li').contains('Добавить').click()
        cy.get(selectors.ingredientItem).contains('Соус Spicy-X').parent('li').contains('Добавить').click()
        cy.get(selectors.buttonOrder).find('button').click()
        cy.wait('@createOrder');
        cy.get(selectors.modals).contains('64308')
        cy.get(selectors.modals).find('button').click()
        cy.get(selectors.modals).children().should('not.exist')
     });

     it('Проверяется, что конструктор пуст', () => {
        cy.get(selectors.ingredientItem).contains('Краторная булка N-200i').parent('li').contains('Добавить').click()
        cy.get(selectors.ingredientItem).contains('Биокотлета из марсианской Магнолии').parent('li').contains('Добавить').click()
        cy.get(selectors.ingredientItem).contains('Соус Spicy-X').parent('li').contains('Добавить').click()
        cy.get(selectors.buttonOrder).find('button').click()
        cy.wait('@createOrder');
        cy.get(selectors.modals).contains('64308')
        cy.get(selectors.modals).find('button').click()
        cy.get(selectors.modals).children().should('not.exist')
        cy.get(selectors.constructorOrder).find('.constructor-element').should('not.exist');
     });
});
