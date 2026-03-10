
import { CalculoImposto } from './CalculoImposto'

export class CalculadoraPedido {
private estrategia: CalculoImposto;
constructor(estrategia: CalculoImposto) {
this.estrategia = estrategia;
}
calcular(preco: number, quantidade: number): number {
return this.estrategia.calcularTotal( preco, quantidade);
}
}

