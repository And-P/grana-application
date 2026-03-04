import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";


@Injectable({
    providedIn: 'root'
})
export class CategoriaService {

    categoriasUrl = 'http://localhost:8080/categorias';

    // private authToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NzI1Nzc0MjUsInVzZXJfbmFtZSI6ImFkbWluQHVtYnJlbGxhLmNvbSIsImF1dGhvcml0aWVzIjpbIlJPTEVfQ0FEQVNUUkFSX0NBVEVHT1JJQSIsIlJPTEVfUEVTUVVJU0FSX1BFU1NPQSIsIlJPTEVfUkVNT1ZFUl9QRVNTT0EiLCJST0xFX0NBREFTVFJBUl9MQU5DQU1FTlRPIiwiUk9MRV9QRVNRVUlTQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUkVNT1ZFUl9MQU5DQU1FTlRPIiwiUk9MRV9DQURBU1RSQVJfUEVTU09BIiwiUk9MRV9QRVNRVUlTQVJfQ0FURUdPUklBIl0sImp0aSI6InZfZVJBaHh5cEh2eVp5UHlrX0RIckM1VXZkNCIsImNsaWVudF9pZCI6ImFuZ3VsYXIiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXX0.lg-YwntStwgXp4ZthLR9IYiQhWOImuwmkj1GbsmuqO0';  

    constructor( private http: HttpClient ) {  }

    listarTodas(): Promise<any> {
        // const headers = new HttpHeaders().append('Authorization', this.authToken);
                    
                    // .get(`${this.categoriasUrl}`, { headers })
        return this.http.get(`${this.categoriasUrl}`)
                        .toPromise();
    }

}