import { PagamentoBoleto } from "./PagamentoBoleto";
import { PagamentoCartao } from "./PagamentoCartao";
import { PagamentoPix } from "./PagamentoPix";
import { ProcessadorPagamento } from "./ProcessadorPagamento";

class GeradorPagamento {
private estrategia: ProcessadorPagamento;
constructor(estrategia: ProcessadorPagamento) {
this.estrategia = estrategia;
}
gerar(valor: number): void {
return this.estrategia.processarPagamento(valor);
}
}

const calc1 = new GeradorPagamento(new PagamentoBoleto())
console.log(calc1.gerar(400))

const calc2 = new GeradorPagamento(new PagamentoCartao())
console.log(calc2.gerar(700.50))

const calc3 = new GeradorPagamento(new PagamentoPix())
console.log(calc3.gerar(20))