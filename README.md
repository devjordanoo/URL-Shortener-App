# URL Shortener App

Um projeto de estudo para construir um **encurtador de URLs** usando **Serverless**, **AWS** e **TypeScript**.

## Sobre o Projeto

Este projeto é um encurtador de links simples e escalável, utilizando:
- **Serverless Framework** para infraestrutura como código
- **AWS Lambda**, **API Gateway**, **DynamoDB** para backend serverless
- **TypeScript** para desenvolvimento seguro e tipado

O objetivo principal é aprender na prática sobre desenvolvimento de aplicações serverless na nuvem.

## Tecnologias e Ferramentas

- [TypeScript](https://www.typescriptlang.org/)
- [Serverless Framework](https://www.serverless.com/)
- [AWS Lambda](https://aws.amazon.com/lambda/)
- [AWS API Gateway](https://aws.amazon.com/api-gateway/)
- [AWS DynamoDB](https://aws.amazon.com/dynamodb/)
- [Node.js](https://nodejs.org/)

## Como Rodar Localmente

1. **Clone o repositório**

```bash
git clone https://github.com/seu-usuario/url-shortener-app.git
cd url-shortener-app
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure a AWS CLI**

Certifique-se de ter a AWS CLI configurada:

```bash
aws configure
```

4. **Deploy localmente (offline)**

Instale o plugin serverless-offline (opcional, para simular API Gateway/Lambda localmente):

```bash
npm install serverless-offline --save-dev
```

Depois, execute:

```bash
npx serverless offline
```

5. **Deploy para a AWS**

```bash
npx serverless deploy
```

## Aprendizados Esperados

- Criar funções serverless com Lambda
- Gerenciar rotas HTTP com API Gateway
- Persistir dados com DynamoDB
- Deploy automático com Serverless Framework
- Práticas de boas arquiteturas para projetos serverless

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**Bora encurtar links de forma serverless! 🚀**

