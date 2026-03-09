import { ProcessadorPagamento } from "./ProcessadorPagamento";

export class PagamentoBoleto implements ProcessadorPagamento{
    processarPagamento(valor: number): void {
        console.log(`Gerando boleto: R$ ${valor}`);
    } ;
}