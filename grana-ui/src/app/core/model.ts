// LANCAMENTO Cadastro

export class Lancamento {
  codigo!: number;
  tipo = "RECEITA";
  descricao: string = '';
  dataVencimento?: Date;
  dataPagamento?: Date;
  valor!: number;
  pessoa = new Pessoa();
  categoria = new Categoria();
  observacao: string = '';
}

export class Categoria {
  codigo?: number;
  nome?: string;
}

export class Pessoa {
  codigo?: number;
  nome?: string;
}   

// PESSOA Cadastro

export class PessoaCadastro {
    nome: string = '';
    endereco = new Endereco();
    ativo: boolean = false;
}

export class Endereco {
  logradouro: string = '';
  numero: number = 0;
  complemento: string = '';
  bairro: string = '';
  cep: string = '';
  cidade: string = '';
  estado: string = '';
}