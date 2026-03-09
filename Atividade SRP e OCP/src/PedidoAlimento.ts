import {EstrategiaPedido} from './ProcessadorPedido'

export class PedidoAlimento implements EstrategiaPedido{
    calcularTotal( preco: number, quantidade: number): number {
        let total = preco*quantidade
        return total += total * 0.05;
    }
}