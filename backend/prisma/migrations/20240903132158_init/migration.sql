-- CreateTable
CREATE TABLE "Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpf_cnpj" TEXT NOT NULL,
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

-- CreateTable
CREATE TABLE "Gerente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuarioId" INTEGER NOT NULL,
    CONSTRAINT "Gerente_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Vendedor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuarioId" INTEGER NOT NULL,
    "gerenteId" INTEGER,
    CONSTRAINT "Vendedor_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Vendedor_gerenteId_fkey" FOREIGN KEY ("gerenteId") REFERENCES "Gerente" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Produto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigo_barras" TEXT NOT NULL,
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
    "gerenteId" INTEGER,
    CONSTRAINT "Produto_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Produto_gerenteId_fkey" FOREIGN KEY ("gerenteId") REFERENCES "Gerente" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT
);

-- CreateTable
CREATE TABLE "Venda" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data_venda" DATETIME NOT NULL,
    "numero_pedido" TEXT NOT NULL,
    "nome_cliente" TEXT NOT NULL,
    "cpf_cnpj_cliente" TEXT NOT NULL,
    "valor_total" REAL NOT NULL,
    "desconto" REAL,
    "valor_final" REAL NOT NULL,
    "forma_pagamento" TEXT NOT NULL,
    "status_venda" TEXT NOT NULL,
    "data_entrega" DATETIME,
    "endereco_entrega" TEXT,
    "vendedorId" INTEGER NOT NULL,
    CONSTRAINT "Venda_vendedorId_fkey" FOREIGN KEY ("vendedorId") REFERENCES "Vendedor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Venda_Produto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "vendaId" INTEGER NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "preco_unitario" REAL NOT NULL,
    CONSTRAINT "Venda_Produto_vendaId_fkey" FOREIGN KEY ("vendaId") REFERENCES "Venda" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Venda_Produto_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_cpf_cnpj_key" ON "Usuario"("cpf_cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Gerente_usuarioId_key" ON "Gerente"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Vendedor_usuarioId_key" ON "Vendedor"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Produto_codigo_barras_key" ON "Produto"("codigo_barras");

-- CreateIndex
CREATE UNIQUE INDEX "Venda_Produto_vendaId_produtoId_key" ON "Venda_Produto"("vendaId", "produtoId");
