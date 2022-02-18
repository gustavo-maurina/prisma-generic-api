# Prisma API

## Iniciar o projeto

1. Baixar dependências com:

```bash
yarn install
```

2. Rodar o script para iniciar o projeto

```bash
yarn run dev
```

## Utilizar _Prisma Client_

Uma instância do _Prisma Client_ é exportada do arquivo `config/prisma.ts` e deve ser utilizada ao longo da aplicação para executar queries no banco principal.

## Comandos _Prisma Migrate_

- #### Executar migrações :

```bash
npx prisma migrate dev --name NomeDaMigration
```

- #### Resetar migrações:

```bash
npx prisma migrate reset
```

- #### Executar seeds :

```bash
npx prisma db seed
```

## Fluxo para criação de novas rotas

1.  Criar arquivo com o nome da rota desejada na pasta `/routes` no seguinte formato: `minha-rota.routes.ts`.

2.  Declarar rotas válidas e iniciar lógica direcionando para métodos do arquivo responsável na pasta `/controllers`, ou para os métodos genéricos da pasta `/services/genericRequests` caso a rota não tenha um fluxo especial.

3.  Sempre utilizar blocos de _try-catch_ nos arquivos `.controllers`, de preferência usando uma função _handler_ para retornar os erros na request. Por exemplo: `/helpers/handleQueryError.ts`, que trata erros gerados por queries do _Prisma Client_.

### Exemplo de arquivo `.routes` genérico

```typescript
import { Router } from "express";
import { GenericRequestConfig } from "../models/GenericRequestConfig";
import { genericGetAll } from "../services/genericRequests/genericGetAll";
import { genericGetById } from "../services/genericRequests/genericGetById";

const router = Router();
const cfg: GenericRequestConfig = {
  table: "usuario", // nome da tabela
  columnsToSearch: ["nome", "sobrenome", "email"], // colunas para buscar texto quando houver parâmetro
};

router.route("/").get((req, res) => genericGetAll(req, res, cfg));
router.route("/:id").get((req, res) => genericGetById(req, res, cfg));

export default router;
```

## Estrutura de pastas

- `routes`: apenas declarar e direcionar rotas para `controllers`, nenhuma lógica deve ser feita aqui. Também podem ser feita a declaração de alguns middlewares por aqui, `verifyJwt()` por exemplo.

- `controllers`: primeiro lugar com lógica após as rotas, status e conteúdo de _requests_ sempre devem ser retornados aqui. Em caso de operações pequenas, realizar e retornar _request_ aqui, porém, se a request for mais complexa, fazer tratativas básicas e direcionar para blocos de lógica maiores nos arquivos `services`.

- `services`: apenas lógica que servem diretamente para operação da request e retorno de erros, nunca retornar requests nestes arquivos.

- `middlewares`: middlewares.

- `helpers`: blocos de lógica para uso geral, que podem ser usados em vários lugares da aplicação, como _handlers_, conversões de valores, etc.

## Estrutura de queries

Exemplo de query genérica:

```
http://localhost:8080/usuario?search=teste&p=3
```

- **search**: textos para pesquisar nas colunas;
- **p**: número da pagina para ser retornada;
