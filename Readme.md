<br/>
<br/>

<div>
  <img src="grana-api-uml.jpg" alt="class-diagram-uml" width=auto>
</div>

<br/>

#### Descrição
- Aplicação Rest que possui uma API SpringBoot e uma SPA Angular. Traz recursos para cadastro e visualização de operações financeiras referentes a receitas e despesas do usuário.


#### Domínio
- Lançamentos

<table>
    <thead>
      <tr>
        <th>Method</th>
        <th>Endpoint</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>GET</td>
        <td>/categorias</td>
      </tr>
      <tr>
        <td>POST</td>
        <td>/categorias</td>
      </tr>
      <tr>
        <td>GET</td>
        <td>/categorias/{codigo}</td>
      </tr>
      <tr>
        <td>GET</td>
        <td>/pessoas?nome=...</td>
      </tr>
      <tr>
        <td>POST</td>
        <td>/pessoas</td>
      </tr>
      <tr>
        <td>GET</td>
        <td>/pessoas/{codigo}</td>
      </tr>
      <tr>
        <td>DELETE</td>
        <td>/pessoas/{codigo}</td>
      </tr>
      <tr>
        <td>PUT</td>
        <td>/pessoas/{codigo}</td>
      </tr>
      <tr>
        <td>PUT</td>
        <td>/pessoas/{codigo}/ativo</td>
      </tr>
      <tr>
        <td>GET</td>
        <td>/lancamentos?resumo=true</td>
      </tr>
      <tr>
        <td>GET</td>
        <td>/lancamentos</td>
      </tr>
      <tr>
        <td>GET</td>
        <td>/lancamentos/{codigo}</td>
      </tr>
      <tr>
        <td>POST</td>
        <td>/lancamentos</td>
      </tr>
      <tr>
        <td>DELETE</td>
        <td>/lancamentos/{codigo}</td>
      </tr>
      <tr>
        <td>PUT</td>
        <td>/lancamentos/{codigo}</td>
      </tr>
    </tbody>
  </table>


#### Tecnologias
- Java [17]
- Node [16.10.0]
- TypeScript [4.7.2]
- Angular [14.2.3]
- PrimeNG [14.0.0]
- SpringBoot [2.7.3]
- Spring Security
- Oauth2
- Hibernate 
- Mysql [8.0]
- Flyway


#### Author: Me [LinkedIn](https://www.linkedin.com/in/andrp) 


