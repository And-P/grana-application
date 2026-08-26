import { Cidade } from "./cidade.model";

export class Endereco {
  logradouro?: string = '';
  numero?: number = 0;
  complemento?: string = '';
  bairro?: string = '';
  cep?: string = '';
  cidade?: Cidade = new Cidade();
}