import { PedidoService } from "./Servicos/PedidoService";
import { CalculadoraPedido } from "./Imposto/CalculadoraPedido";
import { GeradorPagamento } from "./Pagamento/GeradorPagamento";
import { ConfirmacaoEmail } from "./Servicos/ConfirmacaoEmail";

import { ImpostoVestuario } from "./Imposto/ImpostoVestuario";
import { PagamentoPix } from "./Pagamento/PagamentoPix";

const calculadora = new CalculadoraPedido(new ImpostoVestuario());
const pagamento = new GeradorPagamento(new PagamentoPix());
const email = new ConfirmacaoEmail();

const pedido = new PedidoService(
  calculadora,
  pagamento,
  email
);

pedido.processarPedido(
  100, 
  2,   
  "angela@gmail.com"
);