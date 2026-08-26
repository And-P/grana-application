import { Estado } from "./estado.model";

export class Cidade {   
    codigo?: number;
    nome?: string;
    estado: Estado = new Estado();
}