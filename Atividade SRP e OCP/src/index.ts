import { PedidoEletronico } from './PedidoEletronico'
import { PedidoAlimento } from './PedidoAlimento'
import { PedidoVestuario } from './PedidoVestuario'
import { ProcessadorPedido } from './ProcessadorPedido'

const PedidosStrategy: {[key: string]: ProcessadorPedido}= {
    eletronico : new PedidoEletronico(),
    alimento : new PedidoAlimento(),
    vestuario : new PedidoEletronico(),
}

const request = {
    user:{
        tipo:"eletronico"
    }
}
const TipoPedido = PedidosStrategy[request.user.tipo]

// const CalcularaDePedido{
//     const
// }

const calc1 = new PedidoAlimento();
console.log(calc1.calcularTotal('Alimento', 100, 4))