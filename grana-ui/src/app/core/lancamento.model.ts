import { Categoria } from './categoria.model';  
import { Pessoa } from './pessoa.model';

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
  anexo?: string;
  urlAnexo?: string;
}