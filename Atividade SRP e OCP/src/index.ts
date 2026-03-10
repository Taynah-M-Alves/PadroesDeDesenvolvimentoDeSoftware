import { PedidoService } from "./Servicos/PedidoService";
import { CalculadoraPedido } from "./Imposto/CalculadoraPedido";
import { GeradorPagamento } from "./Pagamento/GeradorPagamento";
import { ConfirmacaoEmail } from "./Servicos/ConfirmacaoEmail";

import { ImpostoVestuario } from "./Imposto/ImpostoVestuario";
import { PagamentoPix } from "./Pagamento/PagamentoPix";
import { ImpostoLivro } from "./Imposto/ImpostoLivro";
import { PagamentoCartao } from "./Pagamento/PagamentoCartao";

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

const calculadora2 = new CalculadoraPedido(new ImpostoLivro());
const pagamento2 = new GeradorPagamento(new PagamentoCartao());

const pedido2 = new PedidoService(
  calculadora2,
  pagamento2,
  email
);

pedido2.processarPedido(
  10, 
  5,   
  "taynah.micheli@gmail.com"
);