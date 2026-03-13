import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-nao-autorizado",
    template: 
        `<div class="container alert alert-danger">
            <h4>Acesso Negado</h4>
            <p>Você não tem permissão para acessar esta página.</p>
        </div>`
})
export class NaoAutorizadoComponent implements OnInit {
 
    constructor() { }

    ngOnInit(): void { }
}