import {EstrategiaPedido} from './ProcessadorPedido'

export class PedidoVestuario implements EstrategiaPedido{
    calcularTotal( preco: number, quantidade: number): number {
        let total = preco*quantidade
        return total += total * 0.1;
    }
}