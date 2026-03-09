import {CalculoImposto} from './CalculoImposto'

export class ImpostoEletronico implements CalculoImposto{
    calcularTotal( preco: number, quantidade: number): number {
        let total = preco*quantidade
        return total += total * 0.15;
    }
}