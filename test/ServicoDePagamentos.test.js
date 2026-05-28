import ServicoDePagamentos from "../src/ServicoDePagamentos.js";
import assert from "node:assert";

describe("Validando Gerenciador de Pagamentos com categoria padrao", () => {
    let pagamento;

    beforeEach(() => {
         pagamento = new ServicoDePagamentos();
    });
    
    it("Deve realizar um pagamento com sucesso com categoria padrão", () => {
        pagamento.realizarPagamento("1234.5678.90", "Copasa", 100.00);
        
        const pagamentoRealizado = pagamento.consultarUltimoPagamento();
        
        assert.equal(pagamentoRealizado.codigoBarras, "1234.5678.90"); 
        assert.equal(pagamentoRealizado.empresa, "Copasa");
        assert.equal(pagamentoRealizado.valor, 100.00);
        assert.equal(pagamentoRealizado.categoria, "padrão");
    });

    it("Deve realizar um pagamento com sucesso com categoria cara", () => {
        pagamento.realizarPagamento("1234.5678.90", "Copasa", 105.50);
        
        const pagamentoRealizado = pagamento.consultarUltimoPagamento();
        
        assert.equal(pagamentoRealizado.codigoBarras, "1234.5678.90"); 
        assert.equal(pagamentoRealizado.empresa, "Copasa");
        assert.equal(pagamentoRealizado.valor, 105.50);
        assert.equal(pagamentoRealizado.categoria, "cara");
    });

    it("Deve realizar um pagamento sem campos vazios", () => {
        
        assert.throws(() => {
            pagamento.realizarPagamento("", "", 0);
        }, { message: "Todos os campos devem ser preenchidos"});
    })

    it ("Deve retornar o ultimo pagamento realizado", () => {
        pagamento.realizarPagamento("3211.4544.23", "Amazon", 200.89);
        pagamento.realizarPagamento("1234.5678.90", "Copasa", 85.50);
        
        const pagamentoRealizado = pagamento.consultarUltimoPagamento();
        
        assert.equal(pagamentoRealizado.codigoBarras, "1234.5678.90"); 
        assert.equal(pagamentoRealizado.empresa, "Copasa");
        assert.equal(pagamentoRealizado.valor, 85.50);
        assert.equal(pagamentoRealizado.categoria, "padrão");
    });

    it ("Deve retornar a lista vazia", () => {
         assert.throws(() => {
            pagamento.consultarUltimoPagamento();;
        }, { message: "Lista vazia, nenhum pagamento realizado"});
    });

});
