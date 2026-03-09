# Atividade Prática: Refatorando com SRP e OCP

Responda as questões abaixo sobre um sistema de gerenciamento de pedidos de uma loja que apesar de estar funcionando possui violações claras dos princípios SRP e OCP. Utilize o código a seguir
como base para essa atividade:

```bash
class ProcessadorPedido {
calcularTotal(tipoProduto: string, preco: number, quantidade: number): number {
let total = preco * quantidade;
switch (tipoProduto) {
case "ELETRONICO":
total += total * 0.15; // 15% imposto
break;
case "ALIMENTO":
total += total * 0.05; // 5% imposto
break;
case "VESTUARIO":
total += total * 0.10; // 10% imposto
break;
}
return total;
}
processarPagamento(formaPagamento: string, valor: number): void {
switch (formaPagamento) {
case "CARTAO_CREDITO":
console.log(`Processando cartão: R$ ${valor}`);
break;
case "BOLETO":
console.log(`Gerando boleto: R$ ${valor}`);
break;
case "PIX":
console.log(`Gerando QR Code PIX: R$ ${valor}`);
break;
}
}
enviarConfirmacao(email: string, valor: number): void {
console.log(`Enviando email para ${email}: Seu pedido de R$ ${valor} foi confirmado!`);
}
}
```

## Parte 1 — Análise (individual)

### 1. Identifique quantas responsabilidades a classe ProcessadorPedido possui
A classe ProcessadorPedido possui três responsabilidades principais:    
- A primeira é calcular o valor total do pedido, aplicando impostos diferentes conforme o tipo de produto no método calcularTotal.     
- A segunda é processar o pagamento, definindo a forma de pagamento (cartão de crédito, boleto ou PIX) no métodoprocessar Pagamento.    
- A terceira é enviar a confirmação do pedido ao cliente, realizada pelo método enviarConfirmacao, que realiza o envio de um e-mail.      

### 2. Liste quais atores/departamentos diferentes poderiam solicitar mudanças em cada parte:

- CalcularTotal: o departamento fiscal ou financeiro podem solicitar alteração,uma vez que podem mudar % de imposto e mudar a fórmula do cálculo do valor final.
- ProcessarPagamento: pode ser alterado pela equipe de pagamento ou financeiro, adicionando outros métodos de pagamento ou mudando a integração com o operador do cartão.
- enviarConfirmacao: pode ser alterado pelo suporte ao cliente, mudanças como mudar os textos, ou enviar informações via SMS ou Whatsapp.


### 3. Aponte onde o OCP é violado (quais métodos precisam ser modificados para adicionar novos tipos):
O OCP é violado nos métodos calcularTotal e processarPagamento. Isso acontece porque os dois utilizam estruturas switch para decidir o comportamento com base no tipo de produto ou
na forma de pagamento. Se for necessário adicionar um novo tipo de produto ou uma nova forma de pagamento, será obrigatório abrir a classe, alterar o código desses métodos e testar novamente,
adicionando novos case no switch.
Dessa forma, a classe precisa ser modificada sempre que o sistema crescer, o que fere o Open/Closed Principle, já que o ideal seria poder estender o comportamento sem precisar modificar o
código existente.


## Parte 2 — Refatoração (em dupla) e Parte 3 — Extensão

A parte 2 e 3 foi feita e salva nesse repositório. 
