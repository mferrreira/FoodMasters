/*
  Warnings:

  - You are about to drop the `Gerente` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Vendedor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `gerenteUsuarioId` on the `Produto` table. All the data in the column will be lost.
  - Added the required column `is_vendedor` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Gerente_usuarioId_key";

-- DropIndex
DROP INDEX "Vendedor_usuarioId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Gerente";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Vendedor";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Produto" (
    "codigo_barras" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "categoriaId" INTEGER,
    "preco" REAL NOT NULL,
    "estoque" INTEGER NOT NULL,
    "marca" TEXT,
    "data_fabricacao" DATETIME,
    "data_validade" DATETIME,
    "imagem_url" TEXT,
    "status" TEXT NOT NULL,
    "fornecedor" TEXT,
    "gerenteId" TEXT,
    CONSTRAINT "Produto_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Produto_gerenteId_fkey" FOREIGN KEY ("gerenteId") REFERENCES "Usuario" ("cpf_cnpj") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Produto" ("categoriaId", "codigo_barras", "data_fabricacao", "data_validade", "descricao", "estoque", "fornecedor", "imagem_url", "marca", "nome", "preco", "status") SELECT "categoriaId", "codigo_barras", "data_fabricacao", "data_validade", "descricao", "estoque", "fornecedor", "imagem_url", "marca", "nome", "preco", "status" FROM "Produto";
DROP TABLE "Produto";
ALTER TABLE "new_Produto" RENAME TO "Produto";
CREATE TABLE "new_Usuario" (
    "cpf_cnpj" TEXT NOT NULL PRIMARY KEY,
    "rg" TEXT,
    "nome_completo" TEXT NOT NULL,
    "data_nascimento" DATETIME,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "endereco" TEXT,
    "telefone" TEXT,
    "data_admissao" DATETIME NOT NULL,
    "salario" REAL NOT NULL,
    "status" TEXT NOT NULL,
    "setor" TEXT,
    "is_vendedor" BOOLEAN NOT NULL
);
INSERT INTO "new_Usuario" ("cpf_cnpj", "data_admissao", "data_nascimento", "email", "endereco", "nome_completo", "rg", "salario", "senha", "setor", "status", "telefone") SELECT "cpf_cnpj", "data_admissao", "data_nascimento", "email", "endereco", "nome_completo", "rg", "salario", "senha", "setor", "status", "telefone" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
CREATE TABLE "new_Venda" (
    "numero_pedido" TEXT NOT NULL PRIMARY KEY,
    "data_venda" DATETIME NOT NULL,
    "nome_cliente" TEXT NOT NULL,
    "cpf_cnpj_cliente" TEXT NOT NULL,
    "valor_total" REAL NOT NULL,
    "desconto" REAL,
    "valor_final" REAL NOT NULL,
    "forma_pagamento" TEXT NOT NULL,
    "status_venda" TEXT NOT NULL,
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
