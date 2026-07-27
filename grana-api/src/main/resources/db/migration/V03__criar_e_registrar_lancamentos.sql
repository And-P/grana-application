CREATE TABLE lancamento (
	codigo BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
	descricao VARCHAR(50) NOT NULL,
	data_vencimento DATE NOT NULL,
	data_pagamento DATE,
	valor DECIMAL(10,2) NOT NULL,
	observacao VARCHAR(100),
	tipo VARCHAR(20) NOT NULL,
	codigo_categoria BIGINT(20) NOT NULL,
	codigo_pessoa BIGINT(20) NOT NULL,
	FOREIGN KEY (codigo_categoria) REFERENCES categoria(codigo),
	FOREIGN KEY (codigo_pessoa) REFERENCES pessoa(codigo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Salário mensal', '2026-05-10', null, 6500.00, 'Distribuição de lucros', 'RECEITA', 6, 1);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Bahamas', '2026-07-10', '2026-07-14', 100.32, null, 'DESPESA', 7, 2);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Top Club', '2026-06-10', null, 120, null, 'RECEITA', 8, 3);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('CEMIG', '2026-01-10', '2026-02-10', 110.44, 'Geração', 'RECEITA', 9, 4);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('DMAE', '2026-02-10', null, 200.30, null, 'DESPESA', 10, 5);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Extra', '2026-03-10', '2026-03-10', 1010.32, null, 'RECEITA', 11, 6);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Bahamas', '2026-06-10', null, 500, null, 'RECEITA', 12, 7);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Top Club', '2026-01-11', '2026-01-10', 400.32, null, 'DESPESA', 13, 8);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Despachante', '2026-02-10', null, 123.64, 'Multas', 'DESPESA', 14, 10);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Pneus', '2026-04-10', '2026-04-10', 665.33, null, 'RECEITA', 14, 10);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Café', '2026-05-10', null, 8.32, null, 'DESPESA', 16, 5);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Eletrônicos', '2026-04-10', '2026-04-10', 2100.32, null, 'DESPESA', 10, 4);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Instrumentos', '2026-03-10', null, 1040.32, null, 'DESPESA', 14, 3);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Café', '2026-05-10', '2026-05-10', 4.32, null, 'DESPESA', 14, 2);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Lanche', '2026-01-10', null, 10.20, null, 'DESPESA', 6, 1);
