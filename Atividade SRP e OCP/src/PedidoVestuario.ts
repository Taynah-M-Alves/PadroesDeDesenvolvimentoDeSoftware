import {ProcessadorPedido} from './ProcessadorPedido'

export class PedidoVestuario implements ProcessadorPedido{
    calcularTotal(tipoProduto: string, preco: number, quantidade: number): number {
        let total = preco*quantidade
        return total += total * 0.1;
    }
}