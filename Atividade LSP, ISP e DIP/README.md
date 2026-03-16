# Atividade Prática: Refatorando com LSP,ISP e DIP

Analise o sistema abaixo que gerencia funcionários de uma empresa. O código possui violações de LSP, ISP e DIP. Sua tarefa é identificar as
violações e refatorar o código.

```bash
interface Funcionario {
trabalhar(): void;
registrarPonto(): void;
receberSalario(): void;
gerenciarEquipe(): void;
escreverCodigo(): void;
}
class Gerente implements Funcionario {
trabalhar(): void { console.log("Gerente trabalhando"); }
registrarPonto(): void { console.log("Ponto registrado"); }
receberSalario(): void { console.log("Salário recebido"); }
gerenciarEquipe(): void { console.log("Gerenciando equipe"); }
escreverCodigo(): void {
throw new Error("Gerente não escreve código");
}
}
class Desenvolvedor implements Funcionario {
trabalhar(): void { console.log("Desenvolvedor trabalhando"); }
registrarPonto(): void { console.log("Ponto registrado"); }
receberSalario(): void { console.log("Salário recebido"); }
gerenciarEquipe(): void {
throw new Error("Dev não gerencia equipe");
}
escreverCodigo(): void { console.log("Escrevendo código"); }
}
class Estagiario implements Funcionario {
trabalhar(): void { console.log("Estagiário trabalhando"); }
registrarPonto(): void { console.log("Ponto registrado"); }
receberSalario(): void {
throw new Error("Estagiário recebe bolsa, não salário");
}
gerenciarEquipe(): void {
throw new Error("Estagiário não gerencia");
}
escreverCodigo(): void { console.log("Estagiário escrevendo código"); }
}
```

## Parte 1 —  Identificar Violações

### 1.  Para cada princípio (LSP, ISP, DIP), liste:    
### - Qual trecho do código viola o princípio
### - Por que é uma violação
### - Qual o impacto no sistema

1. Liskov Substituition Principle:
- Trecho que viola o principio:     
```bash
escreverCodigo(): void {
throw new Error("Gerente não escreve código");
}
```
- Por que é uma violação    

porque algumas classes precisam usar 'Trow new Error' por não conseguir implementar todos os métodos da interface funcionario(interface pai), o que fere a ideia a ideia de que uma classe filha possa ficar no lugar da classe pai de forma que o código continue funcionando 

- Qual o impacto no sistema    

Aumenta o Acoplamento e dificulta a manutenção e extensibilidade do sistema

2. Interface Segregation Principle    
- Trecho que viola o principio:   

```bash
interface Funcionario {
trabalhar(): void;
registrarPonto(): void;
receberSalario(): void;
gerenciarEquipe(): void;
escreverCodigo(): void;
}
```    
- Porque é uma violação:   

É uma violação pois fere o conceito de que uma classe não deve ser obrigada a implementar métodos que não utiliza. Uma vez que a classe funcionario é muito grande e obriga alguns funcionarios a implementarem metodos que não condizem com seus contratos.

-Impacto no sistema:       

Interfaces muito grande, Implementações desnecessárias

3. Dependency Inversion Principle
- Trecho que viola o principio e Por que é uma violação:   

O sistema não possui uma camada de abstração para gerenciar os funcionários. Se fosse criar um sistema de RH, provavelmente dependeria diretamente das classes: Gerente, Desenvolvedor ou Estagiario.

-Impacto no sistema:       

Dificuldade para adicionar novos tipos de funcionários

### 2.  Refatorar o Código:

1. ISP: Crie interfaces segregadas (ex: Gerenciavel, Programavel, Assalariado, etc.)
2. LSP: Garanta que nenhuma classe precise lançar Error
3. DIP: Crie uma classe SistemaRH que dependa de abstrações e receba dependências via construtor



### 3. Adicionar novo tipo:

Após a refatoração, adicione a classe Freelancer:
- Trabalha e escreve código
- Não registra ponto
- Não recebe salário fixo (recebe por projeto)
- Não gerencia equipe


