import { CalculadoraPedido } from "../Imposto/CalculadoraPedido";
import { GeradorPagamento } from "../Pagamento/GeradorPagamento";
import { ConfirmacaoEmail } from "./ConfirmacaoEmail"

export class PedidoService {

  private calculadora: CalculadoraPedido;
  private pagamento: GeradorPagamento;
  private email: ConfirmacaoEmail;

  constructor(
    calculadora: CalculadoraPedido,
    pagamento: GeradorPagamento,
    email: ConfirmacaoEmail
  ) {
    this.calculadora = calculadora;
    this.pagamento = pagamento;
    this.email = email;
  }

  processarPedido(
    preco: number,
    quantidade: number,
    emailCliente: string
  ): void {

 
    const total = this.calculadora.calcular(preco, quantidade);
    console.log(`Total do pedido: R$ ${total}`);
    this.pagamento.gerar(total);
    this.email.enviarConfirmacao(emailCliente, total);
  }
}

