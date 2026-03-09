import { ProcessadorPagamento } from "./ProcessadorPagamento";

export class PagamentoCartao implements ProcessadorPagamento{
    processarPagamento(valor: number): void {
        console.log(`Gerando cartão: R$ ${valor}`);
    } ;
}