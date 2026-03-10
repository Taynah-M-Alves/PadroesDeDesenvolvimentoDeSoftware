import {CalculoImposto} from './CalculoImposto'

export class ImpostoLivro implements CalculoImposto{
    calcularTotal( preco: number, quantidade: number): number {
        let total = preco*quantidade
        return total;
    }
}