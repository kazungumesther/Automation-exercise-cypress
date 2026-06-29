describe('Automation Exercise - Core Assignment Workflows', () => {

  beforeEach(() => {
    // Prevent Google Ads and third-party scripts from throwing uncaught exceptions and failing tests
    cy.on('uncaught:exception', (err, runnable) => {
      return false;
    });

    cy.viewport(1280, 800);
    
    // Use failOnStatusCode false to bypass stubborn network resource blocks
    cy.visit('https://automationexercise.com', { failOnStatusCode: false });

    // Handle and remove overlapping modals or ad overlays safely
    cy.get('body').then(($body) => {
      if ($body.find('.modal-content').length > 0) {
        cy.get('.modal-content').invoke('remove');
      }
    });
  });

  it('Test Case 1: Verify Homepage Loads', () => {
    cy.get('#header').should('be.visible');
    cy.get('.logo img').should('be.visible');
    cy.get('.navbar-nav').should('be.visible');
    cy.contains('Signup / Login').should('be.visible');
  });

  it('Test Case 2: Register a New User', () => {
    const email = `esther${Date.now()}@test.com`;

    cy.contains('Signup / Login').click();
    cy.get('.signup-form').should('be.visible');

    cy.get('[data-qa="signup-name"]').type('Esther Kazungu');
    cy.get('[data-qa="signup-email"]').type(email);
    cy.get('[data-qa="signup-button"]').click();

    cy.get('#id_gender1').check();
    cy.get('[data-qa="password"]').type('SecurePass123!');
    cy.get('[data-qa="days"]').select('15');
    cy.get('[data-qa="months"]').select('January');
    cy.get('[data-qa="years"]').select('2000');

    cy.get('[data-qa="first_name"]').type('Esther');
    cy.get('[data-qa="last_name"]').type('Kazungu');
    cy.get('[data-qa="address"]').type('123 Test Automation Way');
    cy.get('[data-qa="country"]').select('United States');
    cy.get('[data-qa="state"]').type('California');
    cy.get('[data-qa="city"]').type('Los Angeles');
    cy.get('[data-qa="zipcode"]').type('90001');
    cy.get('[data-qa="mobile_number"]').type('1234567890');

    cy.get('[data-qa="create-account"]').click();
    cy.get('[data-qa="account-created"]').should('be.visible');
    cy.get('[data-qa="continue-button"]').click();

    cy.get('.navbar-nav').should('contain.text', 'Logged in as Esther Kazungu');

    cy.get('a[href="/delete_account"]').click();
    cy.get('[data-qa="account-deleted"]').should('be.visible');
    cy.get('[data-qa="continue-button"]').click();
  });

  it('Test Case 3: Login With Valid Credentials', () => {
    const email = `login_esther_${Date.now()}@test.com`;

    cy.contains('Signup / Login').click();
    cy.get('[data-qa="signup-name"]').type('Esther Kazungu');
    cy.get('[data-qa="signup-email"]').type(email);
    cy.get('[data-qa="signup-button"]').click();
    cy.get('#id_gender1').check();
    cy.get('[data-qa="password"]').type('SecurePass123!');
    cy.get('[data-qa="first_name"]').type('Esther');
    cy.get('[data-qa="last_name"]').type('Kazungu');
    cy.get('[data-qa="address"]').type('123 Test St');
    cy.get('[data-qa="country"]').select('United States');
    cy.get('[data-qa="state"]').type('California');
    cy.get('[data-qa="city"]').type('LA');
    cy.get('[data-qa="zipcode"]').type('90001');
    cy.get('[data-qa="mobile_number"]').type('1234567890');
    cy.get('[data-qa="create-account"]').click();
    cy.get('[data-qa="continue-button"]').click();
    cy.get('a[href="/logout"]').click();

    cy.login(email, 'SecurePass123!');
    cy.get('.navbar-nav').should('contain.text', 'Logged in as Esther Kazungu');

    cy.get('a[href="/logout"]').click();
    cy.url().should('include', '/login');
  });

  it('Test Case 4: Login With Invalid Credentials', () => {
    cy.contains('Signup / Login').click();
    cy.get('[data-qa="login-email"]').type('fake_nonexistent_user@invalid.com');
    cy.get('[data-qa="login-password"]').type('WrongPassword123');
    cy.get('[data-qa="login-button"]').click();

    cy.get('.login-form form p').should('be.visible')
      .and('contain.text', 'Your email or password is incorrect!');
  });

  it('Test Case 5: Search for a Product', () => {
    cy.get('a[href="/products"]').click();
    cy.get('#search_product').type('Dress');
    cy.get('#submit_search').click();
    cy.get('.title').should('contain.text', 'Searched Products');
    cy.get('.features_items').should('contain.text', 'Dress');
  });

  it('Test Case 6: View Product Details', () => {
    cy.get('a[href="/products"]').click();
    // Replaced problematic selector with a forced, clear click to bypass ad overlays
    cy.get('.choose > .nav > li > a').first().click({ force: true });
    cy.url().should('include', '/product_details/');

    cy.get('.product-information h2').should('be.visible');
    cy.get('.product-information p').should('contain.text', 'Category:');
    cy.get('.product-information span span').should('be.visible');
    cy.get('.product-information').should('contain.text', 'Availability:')
      .and('contain.text', 'Condition:')
      .and('contain.text', 'Brand:');
  });

  it('Test Case 7: Add Product to Cart', () => {
    cy.get('a[href="/products"]').click();
    // Added force:true inside within block because Google Ads often hover invisibly over these buttons
    cy.get('.features_items .col-sm-4').first().within(() => {
      cy.get('.add-to-cart').first().click({ force: true });
    });

    cy.get('.modal-content').should('be.visible');
    cy.get('.modal-body a[href="/view_cart"]').click();
    cy.url().should('include', '/view_cart');

    cy.get('#cart_info_table tbody tr').should('have.length.at.least', 1);
    cy.get('.cart_price').should('be.visible');
    cy.get('.cart_quantity').should('be.visible');
  });

  it('Test Case 8: Remove Product From Cart', () => {
    cy.get('a[href="/products"]').click();
    cy.get('.features_items .col-sm-4').first().within(() => {
      cy.get('.add-to-cart').first().click({ force: true });
    });
    cy.get('.modal-body a[href="/view_cart"]').click();

    cy.get('.cart_quantity_delete').click();
    cy.get('#empty_cart').should('be.visible');
  });

  it('Test Case 9: Submit Contact Us Form', () => {
    cy.get('a[href="/contact_us"]').click();
    cy.get('.contact-form').should('be.visible');

    cy.get('[data-qa="name"]').type('Esther Kazungu');
    cy.get('[data-qa="email"]').type('esther.kazungu@example.com');
    cy.get('[data-qa="subject"]').type('Automation Query');
    cy.get('[data-qa="message"]').type('Automating this form using Cypress.');

    cy.on('window:alert', (text) => {
      expect(text).to.contain('Press OK');
    });
    cy.on('window:confirm', () => {
      return true;
    });

    cy.get('[data-qa="submit-button"]').click();
    cy.get('.status').should('be.visible')
      .and('contain.text', 'Success! Your details have been submitted successfully.');
  });

  it('Challenge Task 2: Verify Product Quantity', () => {
    cy.get('a[href="/products"]').click();
    cy.get('.choose > .nav > li > a').first().click({ force: true });

    cy.get('#quantity').clear().type('3');
    // Replaced brittle positional :nth-child selector with explicit text/class target
    cy.get('button.cart').contains('Add to cart').click();

    cy.get('.modal-body a[href="/view_cart"]').click();
    cy.get('.cart_quantity button').should('contain.text', '3');
  });

  it('Challenge Task 3: Subscribe to Newsletter', () => {
    cy.get('#footer').scrollIntoView();
    cy.get('.single-widget h2').should('contain.text', 'Subscription');

    cy.get('#susbscribe_email').type('subscriber@example.com');
    cy.get('#subscribe').click();

    cy.get('.alert-success').should('be.visible')
      .and('contain.text', 'You have been successfully subscribed!');
  });
});
