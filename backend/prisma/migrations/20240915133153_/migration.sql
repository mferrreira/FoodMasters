-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Usuario" (
    "cpf_cnpj" TEXT NOT NULL PRIMARY KEY,
    "rg" TEXT,
    "nome_completo" TEXT NOT NULL,
    "data_nascimento" DATETIME,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "endereco" TEXT,
    "telefone" TEXT,
    "data_admissao" DATETIME,
    "salario" REAL,
    "status" TEXT,
    "setor" TEXT,
    "is_vendedor" BOOLEAN NOT NULL
);
INSERT INTO "new_Usuario" ("cpf_cnpj", "data_admissao", "data_nascimento", "email", "endereco", "is_vendedor", "nome_completo", "rg", "salario", "senha", "setor", "status", "telefone") SELECT "cpf_cnpj", "data_admissao", "data_nascimento", "email", "endereco", "is_vendedor", "nome_completo", "rg", "salario", "senha", "setor", "status", "telefone" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
