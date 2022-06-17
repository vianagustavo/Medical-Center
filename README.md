# Medical Center

API feita para gerenciar redes de médicos.
A API também conta com uma integração externa com a API dos correios, onde para criarmos um médico, precisamos encontrar os dados de endereço através do cep informado.


# Sumário
1. <a href="#Hosted-APP">Hosted APP</a>
2. <a href="#Documentação-Medical-Center">Documentação Medical Center</a>
3. <a href="#Tecnologias-utilizadas">Tecnologias Utilizadas</a>
4. <a href="#Configurando-o-Projeto">Configurando o Projeto</a>
5. <a href="#Inicializando">Inicializando</a>
6. <a href="#Gerando-e-Rodando-Migrations-(TypeORM)">Gerando e Rodando Migrations (TypeORM)</a>
7. <a href="#Rodando-Testes">Rodando Testes</a>
8. <a href="#Deploy">Deploy</a>
9. <a href="#CI/CD">CI/CD</a>
10. <a href="#API-Endpoints">API Endpoints</a>
11. <a href="#Autor">Autor</a>

## Hosted APP

https://medical-center-api.herokuapp.com/

## Documentação Medical Center

https://medical-center-api.herokuapp.com/api-docs/

## Tecnologias Utilizadas

- [NodeJS](https://nodejs.org/)
- [NestJS](https://nestjs.com/)
- [Typescript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/)
- [MySQL](https://www.mysql.com/)
- [Jest](https://jestjs.io/)
- [Axios](https://axios-http.com/ptbr/)

## Configurando o Projeto

Setar variáveis de ambiente de acordo
 
|        Variável         |           Default            |                   Notes                    |
| ----------------------- | ---------------------------- | ------------------------------------------ |
|        `DB_HOST`        |         `localhost`          |               Host do Banco                |
|        `DB_PORT`        |           `3306`             |         Porta de inicialização do Banco    |
|      `MYSQL_USER`       |           `root`             |              Username do Banco             |
|     `MYSQL_PASSWORD`    |           `admin`            |               Senha do Banco               |
|         `PORT`          |           `3000`             |            Porta de inicialização          |
|    `MYSQL_DATABASE`     |      `medical-center`        |           Nome do Banco de dados           |
|      `VIACEP_URL`       | `https://viacep.com.br/ws/`  |          URL base de para integração       |


## Inicializando

- Clonar o repositório: `git clone https://github.com/vianagustavo/Medical-Center.git`
- Baixar dependências `npm install`

OBS: Há a alternativa de incializar a aplicação via Docker:
- Buildar imagem da aplicação: `docker build -t medical-center .`
- Subir a aplicação via docker-compose: `docker-compose up -d`

## Gerando e Rodando Migrations (TypeORM)

Para adicionar/alterar migrations no model execute:

```
# Gerando Migrations
$ npm run typeorm -- migration:generate ./src/migrations/create-user
# Rodando Migrations
$ npm run typeorm -- migration:run

```

## Rodando Testes

Os testes unitários e de integração estão disponíveis para todos os endpoints da aplicação, e o script utilizado para o rodar o Jest pode ser encontrado no `package.json`.

# Testes Unitários

```
$ npm run test

```

# Testes e2e

```
npm run test:e2e

```


## CI/CD

Aproveitando a iniciativa de utilizar o deploy na plataforma do Heroku, também foram utilizados os conceitos de CI/CD, através do GitHub Actions, sempre que for feito um push ou pull-request para a branch master, adotando boas práticas de desenvolvimento e automação da implantação da nossa aplicação.

O workflow completo se encontra em: ``` .github/workflows/full-workflow.yml ```

## API Endpoints

|  Verbo   |                    Endpoint                     |                 Descrição                  | 
| :------- | :---------------------------------------------: | :----------------------------------------: |
| `POST`   |                  `/doctors`                     |          Criação de novo médico            |    
| `GET`    |                  `/doctors`                     |            Listagem de médicos             |         
| `PUT`    |                `/doctors/:id`                   |     Atualização informações de médicos     |     
| `DELETE` |                `/doctors/:id`                   |         Deletar um cadastro de médico      |   


## Autor

- **Gustavo Ferreira Viana**