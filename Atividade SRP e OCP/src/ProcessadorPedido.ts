export interface ProcessadorPedido {
  calcularTotal(tipoProduto: string, preco: number, quantidade: number): number ;
}