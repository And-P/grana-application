import { Endereco } from './endereco.model';
import { Contato } from './contato.model';

export class Pessoa {
  codigo?: number;
  nome?: string;
  endereco = new Endereco();
  ativo: boolean = false;
  contatos = new Array<Contato>();
}  
