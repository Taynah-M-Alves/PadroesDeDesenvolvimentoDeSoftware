import { PedidoService } from "./Servicos/PedidoService";
import { CalculadoraPedido } from "./Imposto/CalculadoraPedido";
import { GeradorPagamento } from "./Pagamento/GeradorPagamento";
import { ConfirmacaoEmail } from "./Servicos/ConfirmacaoEmail";

import { ImpostoVestuario } from "./Imposto/ImpostoVestuario";
import { PagamentoPix } from "./Pagamento/PagamentoPix";
import { ImpostoLivro } from "./Imposto/ImpostoLivro";
import { PagamentoCartao } from "./Pagamento/PagamentoCartao";
import { PagamentoCriptomoeda } from "./Pagamento/PagamentoCriptomoeda";
import { ImpostoEletronico } from "./Imposto/ImpostoEletronico";

const calculadoraVestuario = new CalculadoraPedido(new ImpostoVestuario());
const pagamentoPix = new GeradorPagamento(new PagamentoPix());
const email = new ConfirmacaoEmail();

const pedido = new PedidoService(
  calculadoraVestuario,
  pagamentoPix,
  email
);

pedido.processarPedido(
  100, 
  2,   
  "angela@gmail.com"
);

const calculadoraLivro = new CalculadoraPedido(new ImpostoLivro());
const pagamentoCartao = new GeradorPagamento(new PagamentoCartao());

const pedido2 = new PedidoService(
  calculadoraLivro,
  pagamentoCartao,
  email
);

pedido2.processarPedido(
  10, 
  5,   
  "taynah.micheli@gmail.com"
);

const calculadoraEletronico = new CalculadoraPedido(new ImpostoEletronico());
const pagamentoCripto = new GeradorPagamento(new PagamentoCriptomoeda());

const pedido3 = new PedidoService(
  calculadoraEletronico,
  pagamentoCripto,
  email
);

pedido3.processarPedido(
  60, 
  4,   
  "iago.micheli@gmail.com"
);