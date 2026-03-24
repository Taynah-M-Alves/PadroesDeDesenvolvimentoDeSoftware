
class Livro {
  constructor(
    public titulo: string,
    public autor: string,
    public isbn: string,
    public status: string ,
    public multa: number 
  ) {}
}

class Usuario {
  constructor(
    public nome: string,
    public email: string,
    public tipo: string,
    public livrosEmprestados: number,

  ) {}
}

class Emprestimo {
  constructor(
    public livro: Livro,
    public usuario: Usuario,
    public dataEmprestimo: Date,
    public dataDevolucao: Date,
    public status: string 
  ) {}
}

class EmailService {
    enviarEmail(dest: string, assunto: string, corpo: string): void {
    console.log("[EMAIL] Para: " + dest + " | Assunto: " + assunto);
    }
}


class LivroService {
    private livros: Livro[] = [];

    constructor(private emailService: EmailService) {}

    adicionarLivro(titulo: string, autor: string, isbn: string): void {
        const livro = new Livro(titulo, autor, isbn, "DISPONIVEL", 0);

        this.livros.push(livro);

        const msg = "Novo livro: " + titulo + " de " + autor;
        this.emailService.enviarEmail("admin@biblioteca.com", "Novo Livro", msg);

    }
    buscarPorIsbn(isbn: string): Livro | undefined {
        return this.livros.find(l => l.isbn === isbn);
    }
}

class UsuarioService {
    private usuarios: Usuario[] = [];

    constructor(private emailService: EmailService) {}

    cadastrarUsuario(nome: string, email: string, tipo: string): void {
        const usuario = new Usuario(nome, email, tipo, 0);
        this.usuarios.push(usuario);
        this.emailService.enviarEmail(email, "Bem-vindo", "Cadastro realizado com sucesso!");
    }
    buscarPorEmail(email: string): Usuario | undefined {
        return this.usuarios.find(u => u.email === email);
    }
}

class EmprestimoService {
    private emprestimos: Emprestimo[] = [];

    constructor(
    private usuarioService: UsuarioService,
    private livroService: LivroService,
    private emailService: EmailService
    ) {}


    realizarEmprestimo(isbn: string, emailUsuario: string): void {
    const livro = this.livroService.buscarPorIsbn(isbn);
    

    if (!livro || livro.status !== "DISPONIVEL") {
        console.log("Livro indisponível ou não encontrado");
        return;
    }

    const usuario = this.usuarioService.buscarPorEmail(emailUsuario);

    if (!usuario) {
        console.log("Usuário não encontrado");
        return;
    }

    let limite = 3;

    if (usuario.tipo === "PROFESSOR") {
        limite = 10;
    } else if (usuario.tipo === "FUNCIONARIO") {
        limite = 5;
    }   

    const emprestados = usuario.livrosEmprestados;
        
    if (emprestados >= limite) { 
        console.log("Limite atingido"); 
        return; 
    }
       
    livro.status = "EMPRESTADO";
    usuario.livrosEmprestados = emprestados + 1;
    
    const hoje = new Date(); const devolucao = new Date(hoje);
    devolucao.setDate(devolucao.getDate() + 14);

    const emprestimo = new Emprestimo(livro, usuario, hoje, devolucao, "ATIVO");
    this.emprestimos.push(emprestimo);
    this.emailService.enviarEmail(emailUsuario, "Empréstimo", "Você emprestou: " + livro.titulo);
    }
    }

class RelatorioService {

    constructor(
        private livros: Livro[] = [],
        private usuarios: Usuario[] = [],
        private emprestimos: Emprestimo[] = [],
    ){}
    

    gerarRelatorio(tipo: string): string {
    let sb = "";

    if (tipo === "LIVROS") { 

        sb += "=== RELATÓRIO DE LIVROS ===\n";
        for (const l of this.livros) { 
            sb += l.titulo + " | " + l.autor + " | " + l.status + "\n"; 
        }

    } else if (tipo === "USUARIOS") { 
        sb += "=== RELATÓRIO DE USUÁRIOS ===\n";
        for (const u of this.usuarios) { 
            sb += u.nome + " | " + u.email + " | Tipo: " + u.tipo + "\n"; 
    }
    
    } else if (tipo === "EMPRESTIMOS") { 
        sb += "=== RELATÓRIO DE EMPRÉSTIMOS ===\n";
        for (const e of this.emprestimos) {     
            sb += "ISBN: " + e.livro.isbn + " | Usuário: " + e.usuario.nome + "\n"; }
    }

    return sb;
    }
}

class MultaService {
    constructor(private emprestimos: Emprestimo[]) {}

    calcularMulta(isbn: string, emailUsuario: string): number {

        for (const e of this.emprestimos) {
            if (e.livro.isbn === isbn && e.usuario.email === emailUsuario && e.status === "ATIVO") {
                const diasAtraso = Math.floor((new Date().getTime() - e.dataDevolucao.getTime()) / (1000 * 60 * 60 * 24));
            
                if (diasAtraso > 0) {
                    return diasAtraso * 2.5;
                }
            }
        }
    return 0;
        }

 }
