-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Produto" (
    "codigo_barras" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "categoriaId" INTEGER,
    "preco" REAL,
    "estoque" INTEGER,
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
INSERT INTO "new_Produto" ("categoriaId", "codigo_barras", "data_fabricacao", "data_validade", "descricao", "estoque", "fornecedor", "gerenteId", "imagem_url", "marca", "nome", "preco", "status") SELECT "categoriaId", "codigo_barras", "data_fabricacao", "data_validade", "descricao", "estoque", "fornecedor", "gerenteId", "imagem_url", "marca", "nome", "preco", "status" FROM "Produto";
DROP TABLE "Produto";
ALTER TABLE "new_Produto" RENAME TO "Produto";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
