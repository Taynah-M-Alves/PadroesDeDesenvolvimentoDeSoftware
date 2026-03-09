import {EstrategiaPedido} from './ProcessadorPedido'

export class PedidoEletronico implements EstrategiaPedido{
    calcularTotal( preco: number, quantidade: number): number {
        let total = preco*quantidade
        return total += total * 0.15;
    }
}