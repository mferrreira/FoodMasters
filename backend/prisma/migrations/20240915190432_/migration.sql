-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Venda" (
    "numero_pedido" TEXT NOT NULL PRIMARY KEY,
    "data_venda" DATETIME,
    "nome_cliente" TEXT,
    "cpf_cnpj_cliente" TEXT,
    "valor_total" REAL,
    "desconto" REAL,
    "valor_final" REAL,
    "forma_pagamento" TEXT,
    "status_venda" TEXT,
    "data_entrega" DATETIME,
    "endereco_entrega" TEXT,
    "vendedorId" TEXT NOT NULL,
    CONSTRAINT "Venda_vendedorId_fkey" FOREIGN KEY ("vendedorId") REFERENCES "Usuario" ("cpf_cnpj") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Venda" ("cpf_cnpj_cliente", "data_entrega", "data_venda", "desconto", "endereco_entrega", "forma_pagamento", "nome_cliente", "numero_pedido", "status_venda", "valor_final", "valor_total", "vendedorId") SELECT "cpf_cnpj_cliente", "data_entrega", "data_venda", "desconto", "endereco_entrega", "forma_pagamento", "nome_cliente", "numero_pedido", "status_venda", "valor_final", "valor_total", "vendedorId" FROM "Venda";
DROP TABLE "Venda";
ALTER TABLE "new_Venda" RENAME TO "Venda";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
