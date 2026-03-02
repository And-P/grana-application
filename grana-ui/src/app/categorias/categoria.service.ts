import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";


@Injectable({
    providedIn: 'root'
})
export class CategoriaService {

    categoriasUrl = 'http://localhost:8080/categorias';

    private authToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NzI1MDA2MjcsInVzZXJfbmFtZSI6ImFkbWluQHVtYnJlbGxhLmNvbSIsImF1dGhvcml0aWVzIjpbIlJPTEVfQ0FEQVNUUkFSX0NBVEVHT1JJQSIsIlJPTEVfUEVTUVVJU0FSX1BFU1NPQSIsIlJPTEVfUkVNT1ZFUl9QRVNTT0EiLCJST0xFX0NBREFTVFJBUl9MQU5DQU1FTlRPIiwiUk9MRV9QRVNRVUlTQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUkVNT1ZFUl9MQU5DQU1FTlRPIiwiUk9MRV9DQURBU1RSQVJfUEVTU09BIiwiUk9MRV9QRVNRVUlTQVJfQ0FURUdPUklBIl0sImp0aSI6ImRqcklfV29sai1WZzBzbjE0dUlHY0R1SjNfSSIsImNsaWVudF9pZCI6ImFuZ3VsYXIiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXX0.YjzxVNMA2QS3oN0UsQ64SgHrT5ycYF3C88Ie5ZkElSo';  

    constructor( private http: HttpClient ) {  }

    listarTodas(): Promise<any> {
        const headers = new HttpHeaders().append('Authorization', this.authToken);

        return this.http.get(`${this.categoriasUrl}`, { headers })
                        .toPromise();
    }

}