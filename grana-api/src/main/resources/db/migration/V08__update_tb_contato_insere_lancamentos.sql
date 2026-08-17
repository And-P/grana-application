ALTER TABLE contato DROP COLUMN telefone;
ALTER TABLE contato ADD telefone varchar(20);

insert into contato (codigo, codigo_pessoa, nome, email, telefone) values (2, 2, 'Marcus Rodriguez', 'marcus@umbrella.com', '98 99880-7878');
insert into contato (codigo, codigo_pessoa, nome, email, telefone) values (3, 6, 'Ana Martinez', 'ana@umbrella.com', '42 97832-2927');
insert into contato (codigo, codigo_pessoa, nome, email, telefone) values (8, 3, 'Adolfo Pinheiro', 'adolfo@umbrella.com', '16 97564-8758');
insert into contato (codigo, codigo_pessoa, nome, email, telefone) values (4, 7, 'Maria Xuxa', 'maria-xuxa@umbrella.com', '16 99864-8755');
insert into contato (codigo, codigo_pessoa, nome, email, telefone) values (5, 10, 'Adolfo Pinheiro', 'adolfo@umbrella.com', '16 97564-8758');
insert into contato (codigo, codigo_pessoa, nome, email, telefone) values (9, 8, 'Marlene Osawa', 'marlene-osawa@umbrella.com', '21 96581-2438');
insert into contato (codigo, codigo_pessoa, nome, email, telefone) values (12, 4, 'Janisse Freitas', 'janisse-freitas@umbrella.com', '32 94581-6545');
insert into contato (codigo, codigo_pessoa, nome, email, telefone) values (10, 5, 'Carlos Lacerda', 'carlos-lacerda@umbrella.com', '21 92663-3255');
insert into contato (codigo, codigo_pessoa, nome, email, telefone) values (11, 9, 'Paris Hilton', 'paris@hilton.com', '01 99581-8762');


INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Monitor', '2026-08-02', '2026-08-02', 1900.81, null, 'RECEITA', 5, 11);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Violão', '2026-08-03', '2026-08-03', 2004.32, null, 'RECEITA', 5, 6);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Cafeteira', '2026-08-10', '2026-08-10', 468.32, null, 'RECEITA', 3, 10);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Lancheira', '2026-08-11', '2026-08-11', 10.20, null, 'RECEITA', 4, 5);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Viagem Campinas', '2026-08-11', '2026-08-11', 6250.00, 'Visitar Cliente', 'RECEITA', 5, 8);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Remedio da Unha', '2026-08-10', '2026-08-14', 280.32, null, 'DESPESA', 4, 7);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Rock Club', '2026-08-12', '2026-08-12', 184.58, null, 'DESPESA', 1, 9);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('ENEL', '2026-08-15', '2026-08-15', 5410.14, 'Geração de Energia', 'DESPESA', 5, 7);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Restorante', '2026-08-16', '2026-08-16', 2000.30, null, 'RECEITA', 2, 10);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Viagem Ribeirão', '2026-08-17', '2026-08-17', 6150.00, 'Visitar Cliente', 'RECEITA', 5, 10);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Remedio do Cabelo', '2026-08-17', '2026-08-14', 380.32, null, 'DESPESA', 4, 7);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Samba Club', '2026-08-12', '2026-08-12', 184.58, null, 'DESPESA', 1, 9);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('SABESP', '2026-08-18', '2026-08-18', 4460.25, 'Serviço de Água', 'DESPESA', 5, 6);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Boi na Brasa', '2026-08-19', '2026-08-19', 1000.30, 'Almoço com cliente', 'DESPESA', 2, 11);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Viagem Belem', '2026-08-20', '2026-08-20', 7500.00, 'Visitar Cliente', 'RECEITA', 5, 7);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Remedio da Pele', '2026-08-21', '2026-08-21', 380.32, null, 'DESPESA', 4, 4);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Jazz Club', '2026-08-22', '2026-08-22', 1184.58, null, 'DESPESA', 1, 3);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Eletropaulo', '2026-08-23', '2026-08-23', 4310.74, 'Geração de Energia', 'DESPESA', 5, 8);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('A Quitanda', '2026-08-24', '2026-08-24', 1800.30, null, 'RECEITA', 2, 2);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Viagem Aparecida', '2026-08-25', '2026-08-25', 2250.00, 'Visitar Aparecida', 'RECEITA', 5, 11);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Sonrrisal', '2026-08-26', '2026-08-26', 80.32, null, 'DESPESA', 4, 4);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Reagge Club', '2026-08-27', '2026-08-27', 784.58, null, 'DESPESA', 1, 2);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('ECAD', '2026-08-28', '2026-08-28', 8460.25, 'Direitos autorais', 'DESPESA', 5, 3);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('PizzaHut', '2026-08-29', '2026-08-29', 1000.30, 'Almoço com cliente', 'DESPESA', 2, 3);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Ebook', '2026-08-18', '2026-08-18', 22150.00, 'Venda e direitos', 'RECEITA', 5, 1);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Show', '2026-08-26', '2026-08-26', 800.32, 'Show no Bar do Zé', 'RECEITA', 1, 8);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Composição', '2026-08-27', '2026-08-27', 3784.58, 'Reagge Music', 'RECEITA', 1, 2);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Warner', '2026-08-28', '2026-08-28', 18460.25, 'Direitos acumulados', 'RECEITA', 5, 6);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('SEASA', '2026-08-29', '2026-08-29', 1220.98, 'Entrega de verduras', 'RECEITA', 2, 4);

