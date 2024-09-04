/*
  Warnings:

  - The primary key for the `Gerente` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Gerente` table. All the data in the column will be lost.
  - The primary key for the `Produto` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `gerenteId` on the `Produto` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Produto` table. All the data in the column will be lost.
  - The primary key for the `Usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Usuario` table. All the data in the column will be lost.
  - The primary key for the `Venda` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Venda` table. All the data in the column will be lost.
  - The primary key for the `Venda_Produto` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Venda_Produto` table. All the data in the column will be lost.
  - The primary key for the `Vendedor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `gerenteId` on the `Vendedor` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Vendedor` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Gerente" (
    "usuarioId" TEXT NOT NULL PRIMARY KEY,
    CONSTRAINT "Gerente_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("cpf_cnpj") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Gerente" ("usuarioId") SELECT "usuarioId" FROM "Gerente";
DROP TABLE "Gerente";
ALTER TABLE "new_Gerente" RENAME TO "Gerente";
CREATE UNIQUE INDEX "Gerente_usuarioId_key" ON "Gerente"("usuarioId");
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
    "gerenteUsuarioId" TEXT,
    CONSTRAINT "Produto_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Produto_gerenteUsuarioId_fkey" FOREIGN KEY ("gerenteUsuarioId") REFERENCES "Gerente" ("usuarioId") ON DELETE SET NULL ON UPDATE CASCADE
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
    "setor" TEXT
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
    CONSTRAINT "Venda_vendedorId_fkey" FOREIGN KEY ("vendedorId") REFERENCES "Vendedor" ("usuarioId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Venda" ("cpf_cnpj_cliente", "data_entrega", "data_venda", "desconto", "endereco_entrega", "forma_pagamento", "nome_cliente", "numero_pedido", "status_venda", "valor_final", "valor_total", "vendedorId") SELECT "cpf_cnpj_cliente", "data_entrega", "data_venda", "desconto", "endereco_entrega", "forma_pagamento", "nome_cliente", "numero_pedido", "status_venda", "valor_final", "valor_total", "vendedorId" FROM "Venda";
DROP TABLE "Venda";
ALTER TABLE "new_Venda" RENAME TO "Venda";
CREATE TABLE "new_Venda_Produto" (
    "vendaId" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "preco_unitario" REAL NOT NULL,

    PRIMARY KEY ("vendaId", "produtoId"),
    CONSTRAINT "Venda_Produto_vendaId_fkey" FOREIGN KEY ("vendaId") REFERENCES "Venda" ("numero_pedido") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Venda_Produto_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto" ("codigo_barras") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Venda_Produto" ("preco_unitario", "produtoId", "quantidade", "vendaId") SELECT "preco_unitario", "produtoId", "quantidade", "vendaId" FROM "Venda_Produto";
DROP TABLE "Venda_Produto";
ALTER TABLE "new_Venda_Produto" RENAME TO "Venda_Produto";
CREATE TABLE "new_Vendedor" (
    "usuarioId" TEXT NOT NULL PRIMARY KEY,
    "gerenteUsuarioId" TEXT,
    CONSTRAINT "Vendedor_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("cpf_cnpj") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Vendedor_gerenteUsuarioId_fkey" FOREIGN KEY ("gerenteUsuarioId") REFERENCES "Gerente" ("usuarioId") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Vendedor" ("usuarioId") SELECT "usuarioId" FROM "Vendedor";
DROP TABLE "Vendedor";
ALTER TABLE "new_Vendedor" RENAME TO "Vendedor";
CREATE UNIQUE INDEX "Vendedor_usuarioId_key" ON "Vendedor"("usuarioId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
