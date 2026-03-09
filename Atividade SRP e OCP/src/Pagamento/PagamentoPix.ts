import { ProcessadorPagamento } from "./ProcessadorPagamento";

export class PagamentoPix implements ProcessadorPagamento{
    processarPagamento(valor: number): void {
        return console.log(`Gerando QR Code PIX: R$ ${valor}`);
    } ;
}