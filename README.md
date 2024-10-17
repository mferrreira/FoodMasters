# FoodMasters

Trabalho final para a disciplina DSC - Desenvolvimento de Sistemas Corporativos

## Clonar Repositório

Para clonar o repositório, basta copiar o link e digitar no terminal

`$ git clone {link}`

Em seguida, criar uma nova branch

`$ git checkout -b {nome da branch}`

Para subir as modificações:

`$ git add .`

`$ git commit -m "{modificação feita}"`

`$ git push origin {branch}`


# COMEÇANDO

1. Instale o nodejs e npm

2. Vá até ./backend e execute `npm i` para instalar as dependências

3. Vá até ./frontend e execute `npm i` para instalar as dependências

4. Para fazer as migrações do banco de dados, em ./backend execute `npx prisma migrate dev --name dev`

5. Para inicializar o servidor, vá até ./backend e execute `npm start`

6. Para inicilizar o frontend, vá até ./frontend e execute `npm run dev`

7. Para adicionar um novo Gerente, vá até ./backend/src/utls e execute `node adicionarNovoGerente.js` e preencha com as informações

8. Na URL do frontend (http://localhost:3000), faça login com as informações do Gerente e adicione um novo vendedor


# Rotas da API

## Produtos
GET /api/produtos
Lista todos os produtos.

POST /api/produtos
Adiciona um novo produto.

PUT /api/produtos/
Atualiza um produto existente.

DELETE /api/produtos/
Remove um produto existente.

## Gerente
POST /api/users/gerente/produtos
Adiciona um novo produto (específico para gerente).

DELETE /api/users/gerente/produtos
Remove um produto (específico para gerente).

PUT /api/users/gerente/produtos
Atualiza um produto (específico para gerente).

GET /api/users/gerente/produtos
Lista todos os produtos (específico para gerente).

POST /api/users/gerente/vendedores
Adiciona um novo vendedor.

DELETE /api/users/gerente/vendedores
Remove um vendedor.

PUT /api/users/gerente/vendedores
Atualiza um vendedor.

GET /api/users/gerente/vendedores
Lista todos os vendedores.

GET /api/users/gerente/vendas
Lista todas as vendas.

GET /api/users/gerente/relatorio
Gera um relatório.

## Vendedores
POST /api/users/vendedores/vendas
Realiza uma venda.

GET /api/users/vendedores/vendas/
Visualiza uma venda específica.

GET /api/users/vendedores/produtos
Consulta todos os produtos.

GET /api/users/vendedores/vendas
Lista todas as vendas realizadas pelo vendedor.

## Vendas
GET /api/vendas
Lista todas as vendas.

POST /api/vendas
Adiciona uma nova venda.

PUT /api/vendas/
Atualiza uma venda existente.

DELETE /api/vendas/
Remove uma venda existente.
