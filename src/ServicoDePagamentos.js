export default class ServicoDePagamentos {
  #pagamentos;

  constructor() {
    this.#pagamentos = [];
  }

  realizarPagamento(codigoBarras, empresa, valor) {
    const novoPagamento = {
      codigoBarras: codigoBarras,
      empresa: empresa,
      valor: valor,
      categoria: valor > 100 ? "cara" : "padrão",
    };
    if (codigoBarras == "" || empresa == "" || valor == "") {
      throw new Error("Todos os campos devem ser preenchidos");
    }
    this.#pagamentos.push(novoPagamento);
  }

  consultarUltimoPagamento() {
    if (this.#pagamentos.length == 0) {
      throw new Error("Lista vazia, nenhum pagamento realizado");
    }
    return this.#pagamentos.at(-1);
  }
}
