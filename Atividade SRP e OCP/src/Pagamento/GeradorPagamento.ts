
import { ProcessadorPagamento } from "./ProcessadorPagamento";

export class GeradorPagamento {
private estrategia: ProcessadorPagamento;
constructor(estrategia: ProcessadorPagamento) {
this.estrategia = estrategia;
}
gerar(valor: number): void {
return this.estrategia.processarPagamento(valor);
}
}
