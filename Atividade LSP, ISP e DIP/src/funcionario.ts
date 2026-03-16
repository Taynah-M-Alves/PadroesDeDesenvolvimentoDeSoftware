interface Funcionario {
 trabalhar(): void;
}

interface JornadaFixa{registrarPonto(): void;}
interface Assalariado{receberSalario(): void;}
interface Gerenciavel{gerenciarEquipe(): void;}
interface Programavel{escreverCodigo(): void;}


class IGerente implements Funcionario, Assalariado, Gerenciavel, JornadaFixa {
 trabalhar(): void { console.log("Gerente trabalhando"); }
 registrarPonto(): void { console.log("Ponto registrado"); }
 receberSalario(): void { console.log("Salário recebido"); }
 gerenciarEquipe(): void { console.log("Gerenciando equipe"); }
}

class IDesenvolvedor implements Funcionario, Assalariado, Programavel, JornadaFixa {
 trabalhar(): void { console.log("Desenvolvedor trabalhando"); }
 registrarPonto(): void { console.log("Ponto registrado"); }
 receberSalario(): void { console.log("Salário recebido"); }
 escreverCodigo(): void { console.log("Escrevendo código"); }
}

class IEstagiario implements Funcionario, Programavel, JornadaFixa{
 trabalhar(): void { console.log("Estagiário trabalhando"); }
 registrarPonto(): void { console.log("Ponto registrado"); }
 receberBolsa():void {console.log("Bolsa Estágio recebida")}
 escreverCodigo(): void { console.log("Estagiário escrevendo código"); }
}

class IFreelancer implements Funcionario, Programavel{
 trabalhar(): void { console.log("Estagiário trabalhando"); }
 escreverCodigo(): void { console.log("Estagiário escrevendo código"); }
 receberPagamento(): void{ console.log("Pagamento recebido")}
}


class SistemaRH{
    private funcionario: Funcionario;

    constructor(funcionario:Funcionario){
        this.funcionario = funcionario;
    }

    contratarFuncionario():void{
        this.funcionario.trabalhar()

    }
}

const dev = new IDesenvolvedor()

new SistemaRH(dev)