# Atividade Prática: Diagnóstico de Code Smells

#### Contexto: Você recebeu o código abaixo de um sistema de gerenciamento de biblioteca. O sistema funciona, mas apresenta diversos problemas estruturais. Sua missão é identificar os code smells e propor refatorações

```bash
class SistemaBiblioteca {
    private livros: string[][] = []; // [0]=titulo, [1]=autor, [2]=isbn, [3]=status, [4]=multa
    private usuarios: string[][] = []; // [0]=nome, [1]=email, [2]=tipo, [3]=livrosEmprestados
    private emprestimos: string[][] = [];

    adicionarLivro(titulo: string, autor: string, isbn: string): void {
        const livro: string[] = [titulo, autor, isbn, "DISPONIVEL", "0"];
        this.livros.push(livro);
        const msg = "Novo livro: " + titulo + " de " + autor;
        this.enviarEmail("admin@biblioteca.com", "Novo Livro", msg);
    }

    cadastrarUsuario(nome: string, email: string, tipo: string): void {
        this.usuarios.push([nome, email, tipo, "0"]);
        this.enviarEmail(email, "Bem-vindo", "Cadastro realizado com sucesso!");
    }

    realizarEmprestimo(isbn: string, emailUsuario: string): void {
        let livro: string[] | null = null;

        for (const l of this.livros) { 
            if (l[2] === isbn) { 
                livro = l; 
                break; 
                } 
        }

        if (livro === null) { 
            console.log("Livro não encontrado"); 
            return;
        }

        if (livro[3] !== "DISPONIVEL") { 
            console.log("Livro indisponível"); 
            return; 
        
        }
        let usuario: string[] | null = null;

        for (const u of this.usuarios) { 
            if (u[1] === emailUsuario) { 
                usuario = u; 
                break; 
            } 
        }

        if (usuario === null) { 
            console.log("Usuário não encontrado"); 
            return; 
        }

        const emprestados = parseInt(usuario[3]);
        let limite = 3;
        
        if (usuario[2] === "PROFESSOR") { 
            limite = 10; 
        }else if (usuario[2] === "FUNCIONARIO") { 
            limite = 5; 
        }
        if (emprestados >= limite) { 
            console.log("Limite atingido"); 
            return; 
        }

        livro[3] = "EMPRESTADO";
        usuario[3] = String(emprestados + 1);
        const hoje = new Date(); const devolucao = new Date(hoje);
        devolucao.setDate(devolucao.getDate() + 14);
        this.emprestimos.push([isbn, emailUsuario, hoje.toISOString().split('T')[0], devolucao.toISOString().split('T')[0],"ATIVO"]);
        this.enviarEmail(emailUsuario, "Empréstimo", "Você emprestou: " + livro[0]);
    }

    gerarRelatorio(tipo: string): string {
    let sb = "";
    if (tipo === "LIVROS") { 
        sb += "=== RELATÓRIO DE LIVROS ===\n";
        for (const l of this.livros) {  
            sb += l[0] + " | " + l[1] + " | " + l[3] + "\n"; 
        }
    } else if (tipo === "USUARIOS") { 
        sb += "=== RELATÓRIO DE USUÁRIOS ===\n";
        for (const u of this.usuarios) { 
            sb += u[0] + " | " + u[1] + " | Tipo: " + u[2] + "\n"; 
        }
    } else if (tipo === "EMPRESTIMOS") { 
        sb += "=== RELATÓRIO DE EMPRÉSTIMOS ===\n";
        for (const e of this.emprestimos) { 
            sb += "ISBN: " + e[0] + " | Usuário: " + e[1] + "\n"; 
        }
    }
    return sb;
    }

    calcularMulta(isbn: string, emailUsuario: string): number {
        for (const e of this.emprestimos) {
            if (e[0] === isbn && e[1] === emailUsuario && e[4] === "ATIVO") {
            const diasAtraso = Math.floor((new Date().getTime() - new Date(e[3]).getTime()) / (1000 * 60 * 60 * 24));
                if (diasAtraso > 0) {
                return diasAtraso * 2.50;
                }
            }
        }
        return 0;
    }
    private enviarEmail(dest: string, assunto: string, corpo: string): void {
        console.log("[EMAIL] Para: " + dest + " | Assunto: " + assunto);
    }

```

### Parte 1 —  Identificação

#### 1.  Identifique todos os code smells presentes. Para cada um, indique: qual é o code smell, onde está (método/trecho), e por que é um problema.Para cada princípio (LSP, ISP, DIP), liste:    


### 2.  Proposta de Refatoração:

#### Para cada code smell identificado, proponha uma refatoraçãoespecífica, escreva o código refatorado e explique qual técnica foi utilizada (Extract Class, Move Method, Extract Method, etc.).



### 3. Documentação:

| # |Code Smell | Localização | Problema | Refatoração Proposta | Técnica |
|:----------: |:--------:|:--------:|:--------:|:--------:|:--------:|
| 1 | God Class | A classe SistemaBiblioteca  | Uma classe só executa várias funções ao mesmo tempo, o que viola o single responsability principle e dificulta a manutenção |Segmentar a classe em serviços: _LivroService_, _UsuarioService_, _EmprestimoService_, _RelatorioService_, _MultaService_ e _EmailService_ | Extract Class |
| 2 | Primitive Obsession | As estruturas _string[][]_ para livros, usuários e emprestimos | Os dados são armazenados como arrays de strings usando índices (l[0], l[1]). Isso reduz legibilidade e aumenta risco de erros. | Criar classes específicas _Livro_, _Usuario_ e _Emprestimo_ com propriedades nomeadas. | Replace Data Structure with Class |
| 3 | Magic Strings | Strings como _DISPONIVEL_,_EMPRESTADO_,_PROFESSOR_ | Valores fixos espalhados pelo código dificultam manutenção e podem gerar erros de digitação. | Substituir por enum ou constantes (StatusLivro, TipoUsuario) | Replace Magic Number/String with Constant |
| 4 | Long Method | Na função _realizarEmprestimo()_ | O método possui muitas responsabilidades: busca de livro, busca de usuário, validação, cálculo de limite, atualização de status e envio de e-mail. | Dividir o método em métodos menores como _buscarLivro_, _validarUsuario_, _calcularLimite_, _registrarEmprestimo_. | Extract Method |
| 5 | Feature Envy | A função _gerarRelatorio()_ acessando diretamente arrays internos | O método manipula diretamente estruturas de dados em vez de usar objetos com comportamento próprio. | Criar um _RelatorioService_ responsável por gerar relatórios a partir de entidades | Move Method |
| 6 | Duplicate Code | No calculo de datas e manipulação de empréstimos | O método manipula diretamente estruturas de dados em vez de usar objetos com comportamento próprio. | Criar EmprestimoService e MultaService para separar responsabilidades. | Extract Class |
| 7 | High Coupling | A função _enviarEmail()_ dentro da classe _SistemaBancario_ | A classe mistura regra de negócio com comunicação externa (email). | Criar um EmailService independente responsável pelo envio de emails | Extract Class |
