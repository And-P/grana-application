import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { environment } from "../../../environments/environment";    


@Injectable()
export class ComplementService {

    categoriasUrl: string;
    pessoasUrl: string;

    
    constructor( private http: HttpClient ) { 
        this.categoriasUrl = `${environment.apiUrl}/categorias`;
        this.pessoasUrl = `${environment.apiUrl}/pessoas`;
    }
    
    
    listarCategorias(): Promise<any> {
                    
        return this.http.get(`${this.categoriasUrl}`)
                        .toPromise();
    }

  
    listarPessoas(): Promise<any> {

        return this.http.get(`${this.pessoasUrl}`)
                        .toPromise()
                        .then((response: any) => response.content);
    }


}