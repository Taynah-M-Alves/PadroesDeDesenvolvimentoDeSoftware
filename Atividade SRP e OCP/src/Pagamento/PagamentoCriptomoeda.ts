import { ProcessadorPagamento } from "./ProcessadorPagamento";

export class PagamentoCriptomoeda implements ProcessadorPagamento{
    processarPagamento(valor: number): void {
        return console.log(`Gerando QR Code para pagamento em criptomoeda do valor : R$ ${valor}`);
    } ;
}