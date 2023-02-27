/// <reference types="cypress" />

import comprarProdutosPage from '../support/page_objects/comprar-produtos.page'

const dadosFaturamento = require('../fixtures/enderecoFaturamento.json')

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {      
              
        cy.visit('produtos')
    });

    afterEach(() => {
        cy.screenshot()
    });
    
    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        //TODO 
        cy.addProdutos('Abominable Hoodie','S','Green',2)
        cy.addProdutos('Argus All-Weather Tank','XL','Gray',3)
        cy.get('#cart > .dropdown-toggle').click()   

        cy.visit('carrinho')
        cy.get('.checkout-button').click()

        comprarProdutosPage.editarDetallesDeFaturamento(
            dadosFaturamento[1].nome,
            dadosFaturamento[1].sobrenome,
            dadosFaturamento[1].empresa,
            dadosFaturamento[1].pais,
            dadosFaturamento[1].endereco,
            dadosFaturamento[1].numero,
            dadosFaturamento[1].cidade,
            dadosFaturamento[1].estado,
            dadosFaturamento[1].cep,
            dadosFaturamento[1].telefone,
            dadosFaturamento[1].email
        )
        cy.get('#place_order').click
        cy.visit('checkout/order-received/5176/?key=wc_order_VstfYFj3L3nVo')
        cy.get('.woocommerce-notice').should('contain','Obrigado. Seu pedido foi recebido.')



    });


})