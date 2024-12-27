describe('Burger Constructor Page', () => {
    beforeEach(() => {
        cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
        cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as('getUser');
        cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as('createOrder');
        cy.visit('http://localhost:4000/');
        cy.wait('@getIngredients');
        cy.wait('@getUser');
        window.localStorage.setItem('accessToken', 'mockAccessToken123');
    });

    it('Все элементы отображаются', () => {
        cy.get('[data-cy="ingredient-item"]').should('have.length', 15);
    });

    it('Добавление ингредиента из списка в конструктор', () => {
        const item = cy.get('[data-cy="ingredient-item"]').contains('Краторная булка N-200i').parent('li')
        item.contains('Добавить').click()
    });

    it('Тестировие открытия модального окона', () => {
       cy.get('[data-cy="ingredient-item"]').contains('Краторная булка N-200i').click()

    });

    it('Тестировие закрытие модального окона на крестик', () => {
        cy.get('[data-cy="ingredient-item"]').contains('Краторная булка N-200i').click()
 
        cy.get('#modals').find('button').click()
 
     });

     it('Проверяем что пользователь получен и присвоен accessToken', () => {
        cy.wait('@getUser').its('response.statusCode').should('eq', 200);
        cy.expect(localStorage.getItem('accessToken')).equal('mockAccessToken123');
     });

     it('Тест соборки заказа', () => {
        cy.get('[data-cy="ingredient-item"]').contains('Краторная булка N-200i').parent('li').contains('Добавить').click()
        cy.get('[data-cy="ingredient-item"]').contains('Биокотлета из марсианской Магнолии').parent('li').contains('Добавить').click()
        cy.get('[data-cy="ingredient-item"]').contains('Соус Spicy-X').parent('li').contains('Добавить').click()
        
     });

     it('Тест оформления заказа', () => {
        cy.get('[data-cy="ingredient-item"]').contains('Краторная булка N-200i').parent('li').contains('Добавить').click()
        cy.get('[data-cy="ingredient-item"]').contains('Биокотлета из марсианской Магнолии').parent('li').contains('Добавить').click()
        cy.get('[data-cy="ingredient-item"]').contains('Соус Spicy-X').parent('li').contains('Добавить').click()
        cy.get('[data-cy="button-order"]').find('button').click()
        cy.wait('@createOrder');
     });

     it('Проверяется, что модальное окно открылось и номер заказа верный', () => {
        cy.get('[data-cy="ingredient-item"]').contains('Краторная булка N-200i').parent('li').contains('Добавить').click()
        cy.get('[data-cy="ingredient-item"]').contains('Биокотлета из марсианской Магнолии').parent('li').contains('Добавить').click()
        cy.get('[data-cy="ingredient-item"]').contains('Соус Spicy-X').parent('li').contains('Добавить').click()
        cy.get('[data-cy="button-order"]').find('button').click()
        cy.wait('@createOrder');
        cy.get('#modals').contains('64308')
     });

     it('Проверяется успешность закрытия модального окна', () => {
        cy.get('[data-cy="ingredient-item"]').contains('Краторная булка N-200i').parent('li').contains('Добавить').click()
        cy.get('[data-cy="ingredient-item"]').contains('Биокотлета из марсианской Магнолии').parent('li').contains('Добавить').click()
        cy.get('[data-cy="ingredient-item"]').contains('Соус Spicy-X').parent('li').contains('Добавить').click()
        cy.get('[data-cy="button-order"]').find('button').click()
        cy.wait('@createOrder');
        cy.get('#modals').contains('64308')
        cy.get('#modals').find('button').click()
        cy.get('#modals').children().should('not.exist')
     });

     it('Проверяется, что конструктор пуст', () => {
        cy.get('[data-cy="ingredient-item"]').contains('Краторная булка N-200i').parent('li').contains('Добавить').click()
        cy.get('[data-cy="ingredient-item"]').contains('Биокотлета из марсианской Магнолии').parent('li').contains('Добавить').click()
        cy.get('[data-cy="ingredient-item"]').contains('Соус Spicy-X').parent('li').contains('Добавить').click()
        cy.get('[data-cy="button-order"]').find('button').click()
        cy.wait('@createOrder');
        cy.get('#modals').contains('64308')
        cy.get('#modals').find('button').click()
        cy.get('#modals').children().should('not.exist')
        cy.get('[data-cy="constructor-order"]').find('.constructor-element').should('not.exist');
     });
});
