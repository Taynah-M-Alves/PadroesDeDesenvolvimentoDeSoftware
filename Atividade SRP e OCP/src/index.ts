import { PedidoEletronico } from './PedidoEletronico'
import { PedidoAlimento } from './PedidoAlimento'
import { PedidoVestuario } from './PedidoVestuario'
import { EstrategiaPedido } from './ProcessadorPedido'

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
private estrategia: EstrategiaPedido;
constructor(estrategia: EstrategiaPedido) {
this.estrategia = estrategia;
}
calcular(preco: number, quantidade: number): number {
return this.estrategia.calcularTotal( preco, quantidade);
}
}

const calc1 = new CalculadoraPedido(new PedidoVestuario());
console.log(`Desconto: R$ ${calc1.calcular(100, 2)}`);
