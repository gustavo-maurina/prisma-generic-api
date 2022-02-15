# Prisma API

### Iniciar o projeto

---

1. Baixar dependências com:

```bash
yarn install
```

2. Adicionar Prisma como _devDependency_ para utilizar a CLI

```bash
yarn add prisma --dev
```


### Utilizar _Prisma Client_

---

Uma instância do _Prisma Client_ é exportada do arquivo `config/prisma.ts` e deve ser utilizada ao longo da aplicação para executar queries no banco principal.


### Comandos _Prisma Migrate_

---

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


### Fluxo para criação de novas rotas

---

1.  Criar arquivo com o nome da rota desejada na pasta `src/routes` no seguinte formato: `minha-rota.routes.ts`.

2.  Declarar rotas válidas e iniciar lógica direcionando para métodos do arquivo responsável na pasta `src/controllers`.

3.  Sempre utilizar blocos de _try-catch_ nos arquivos `controllers`, de preferência usando uma função _handler_ para retornar os erros na request. Por exemplo: `src/helpers/handleQueryError.ts`, que trata erros gerados por queries do _Prisma Client_.


### Estrutura de pastas

---

- `routes`: apenas declarar e direcionar rotas para `controllers`, nenhuma lógica deve ser feita aqui. Também podem ser feita a declaração de alguns middlewares por aqui, `verifyJwt()` por exemplo.

- `controllers`: primeiro lugar com lógica após as rotas, status e conteúdo de _requests_ sempre devem ser retornados aqui. Em caso de operações pequenas, realizar e retornar _request_ aqui, porém, se a request for mais complexa, fazer tratativas básicas e direcionar para blocos de lógica maiores nos arquivos `services`.

- `services`: apenas lógica que servem diretamente para operação da request e retorno de erros, nunca retornar requests nestes arquivos.

- `middlewares`: middlewares.

- `helpers`: blocos de lógica para uso geral, que podem ser usados em vários lugares da aplicação, como _handlers_, conversões de valores, etc.
