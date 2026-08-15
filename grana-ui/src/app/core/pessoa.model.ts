import { Contato } from './contato.model';
import { Endereco } from './endereco.model';

export class Pessoa {
  codigo?: number;
  nome?: string;
  endereco = new Endereco();
  ativo: boolean = false;
  contatos = new Array<Contato>();
}  
