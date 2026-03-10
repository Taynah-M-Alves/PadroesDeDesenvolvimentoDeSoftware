
export class  ConfirmacaoEmail{
    enviarConfirmacao(email: string, valor: number): void {
    console.log(`Enviando email para: ${email}: Seu pedido no valor de R$ ${valor} foi confirmado!`);}
}
