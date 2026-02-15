show databases;
use granapi;
show tables;

describe categoria;
describe pessoa;

select * from flyway_schema_history;
select * from categoria;
select * from pessoa;
select * from lancamento;
select * from usuario;
select * from permissao;
select * from usuario_permissao;

delete from flyway_schema_history where version = 04;

