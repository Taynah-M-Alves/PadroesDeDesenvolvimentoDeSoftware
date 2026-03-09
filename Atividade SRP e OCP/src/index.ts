import { ImpostoEletronico } from './ImpostoEletronico'
import { ImpostoAlimento } from './ImpostoAlimento'
import { ImpostoVestuario } from './ImpostoVestuario'
import { CalculoImposto } from './CalculoImposto'

// const PedidosStrategy: {[key: string]: EstrategiaPedido}= {
//     eletronico : new PedidoEletronico(),
//     alimento : new PedidoAlimento(),
//     vestuario : new PedidoVestuario(),
// }

// const request = {
//     user:{
//         tipo:"vestuario"
//     }
// }
// const TipoPedido = PedidosStrategy[request.user.tipo]


class CalculadoraPedido {
private estrategia: CalculoImposto;
constructor(estrategia: CalculoImposto) {
this.estrategia = estrategia;
}
calcular(preco: number, quantidade: number): number {
return this.estrategia.calcularTotal( preco, quantidade);
}
}

const calc1 = new CalculadoraPedido(new ImpostoVestuario());
console.log(`Valor do pedido: R$ ${calc1.calcular(100, 2)}`);

const calc2 = new CalculadoraPedido(new ImpostoEletronico());
console.log(`Valor do pedido: R$ ${calc2.calcular(100, 2)}`);

const calc3 = new CalculadoraPedido(new ImpostoAlimento());
console.log(`Valor do pedido: R$ ${calc3.calcular(100, 2)}`);
