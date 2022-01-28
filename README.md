# Prisma API

## Iniciar o projeto

1. Baixar dependências com:

```bash
npm install
```

2. Adicionar Prisma como _devDependency_ para utilizar a CLI

```bash
npm install prisma --save-dev
```

---

## Comandos _Prisma Migrate_

#### Executar migrações :

```bash
npx prisma migrate dev --name NomeDaMigration
```

#### Resetar migrações:

```bash
npx prisma migrate reset
```

#### Executar seeds :

```bash
npx prisma db seed
```

---

### Fluxo para criação de novas rotas

1.  Criar arquivo com o nome da rota desejada na pasta `/routes` no seguinte formato: `minha-rota.route.ts`.

2.  Declarar métodos da rota escolhida e iniciar lógica da rota importando um arquivo da pasta `/controllers`.

3.  Sempre utilizar blocos de _try-catch_, de preferência usando uma função _handler_ para retornar os erros na request. Por exemplo: `helpers/handleQueryError.ts`, que trata erros gerados por queries do _Prisma Client_.
