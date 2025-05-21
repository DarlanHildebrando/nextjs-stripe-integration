# NEXTJS-STRIPE-INTEGRATION
Integração de pagamentos com Stripe usando Next.js, Prisma e TailwindCSS

Este projeto é uma aplicação desenvolvida com o framework [Next.js](https://nextjs.org/), utilizando [Tailwind CSS v4](https://tailwindcss.com/) para a estilização e o [Prisma ORM](https://www.prisma.io/) para a integração e manipulação do banco de dados PostgreSQL.

O foco principal é demonstrar a integração com a API da [Stripe](https://stripe.com/br) — uma plataforma de pagamentos online que permite receber, gerenciar e processar transações financeiras como cartões, Pix, boletos e carteiras digitais, de forma segura e automatizada.


Acesse a [documentação oficial](https://docs.stripe.com/?locale=pt-BR) da Stripe para mais detalhes.

---

> ⚠️ **Atenção:** A interface (front-end) do projeto ainda está em desenvolvimento.

---

### Pré-requisitos para rodar o projeto:

1. Ter [Node.js](https://nodejs.org/en/download) e [PostgreSQL](https://www.postgresql.org/download/) instalados na sua máquina.

2. Ter acesso a uma ferramenta para testar e interagir com API (como Postman, Insomnia, Hoppscotch, Thunder Client, etc.) será necessário para validar os endpoints durante o desenvolvimento.

3. Ter uma conta **Stripe Connect**. [Clique aqui para criar uma](https://dashboard.stripe.com/register).


## 🚀 Como rodar o projeto

###  Etapa 1: instalando o projeto na máquina.

No seu prompt de comando (CMD), siga estes passos:

1.1 **Clone o repositório:**

```bash 
git clone https://github.com/DarlanHildebrando/nextjs-stripe-integration.git 
```
1.2 **Acesse o diretório do projeto:**

```bash
cd nextjs-stripe-integration
```

1.3 **Instale as dependências do projeto:**
```bash
npm install
```
1.4 **Inicialize o projeto:**
```bash
npm run dev
```

Se tudo ocorreu como o esperado, você verá algo como:

```bash
> stripe-integration@0.1.0 dev
> echo O Jubileu está esquisito hoje, eu tenho medo! 😨 && next dev

O Jubileu está esquisito hoje, eu tenho medo! 😨 
   ▲ Next.js 15.2.4
   - Local:        http://localhost:3000
   - Network:      http://192.168.1.102:3000

 ✓ Starting...
 ✓ Ready in 1619ms
 ```

### Etapa 2: configurando seu arquivo `.env`.

Se tudo ocorreu bem até aqui, podemos seguir para a próxima etapa: configurar o arquivo `.env`.  

**Siga os passos abaixo com atenção:**

---

2.1 **Criando o arquivo .env:**

Na raiz do projeto (onde estão localizados arquivos como `.gitignore`, `package.json` etc.), crie um arquivo chamado **.env**. A estrutura esperada é semelhante a:

![Imagem de uma estrutura de arquivos na raíz do projeto](./imagesFromReadme/estrutura_desejada.png)


---

2.2 **Povoando o `.env`:**

Adicione ao seu arquivo `.env` as seguintes variáveis de ambiente:


1. **Chaves versão TESTE da Stripe API (`Publishable key` e `Secret key`):**

<br>

> ⚠️ **Importante:** Para acessar suas chaves de teste da Stripe, é necessário ter uma conta **Connect** registrada e estar com a sessão ativa (logado).  
> Caso contrário, ao tentar acessar o dashboard, você será redirecionado para a página de login.
>
> Acesse o dashboard de testes da Stripe [clicando aqui](https://dashboard.stripe.com/test/dashboard) para visualizar suas chaves de API.

<br>

![Imagem de um painel teste da Stripe](./imagesFromReadme/painel_stripe_key.png)

A imagem acima mostra um exemplo do dashboard da Stripe, com a área das chaves **destacada em vermelho**.

Agora que você já tem suas chaves em mãos, insira-as no seu arquivo `.env`:

```bash
# Publishable key
STRIPE_PUBLIC_KEY=pk_test_sua_chave_publica_stripe

# Secret key
STRIPE_SECRET_KEY=sk_test_sua_chave_secreta_stripe
```

2. **URL do seu banco de dados PostgreSQL**

No seu arquivo `.env`, coloque a seguinte URL substituindo os campos conforme suas configurações:

```bash
# Substitua os campos "seu_usuario", "sua_senha", "nome_do_seu_banco_de_dados" e, se necessário, a porta (padrão: 5432)
                                                  
DATABASE_URL="postgresql://seu_usuario:sua_senha@localhost:5432/nome_do_seu_banco_de_dados?schema=public"
```

3. **Chave secreta JWT (JSON Web Token)**

Este projeto utiliza autenticação baseada em JWT (JSON Web Token).  
Por isso, é necessário definir uma `secret key` — uma chave secreta usada para **assinar e validar** os tokens gerados durante o login e outras ações autenticadas.

Você pode conseguir essa chave de muitas maneiras, mas vou sugerir uma forma simples e prática de gerar a sua `secret key` a seguir:

No seu **prompt de comando (CMD)**, insira o seguinte comando:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Caso tenha dado certo, você verá algo como:
```bash
n3yGTO7UPYyKp4Mg7f0pw/pwBV+4wfwitaROoOtMLw8=
```

Esta é sua `secret key`, **não a divulgue e nem compartilhe com ninguém!**

> ⚠️ **Observação:** A chave exibida acima é apenas um exemplo fictício, gerado unicamente para fins de demonstração.  
> Não a utilize em projetos reais — **gere a sua própria chave** com o comando informado anteriormente.


Agora com sua `secret key` em mãos, insira no arquivo `.env`:

```bash
JWT_SECRET=sua_secret_key
```
Caso tenha seguido o passo a passo **corretamente** a estrutura do seu arquivo `.env` deve ser parecida com isso:

```bash
STRIPE_PUBLIC_KEY=pk_test_sua_chave_publica_stripe

STRIPE_SECRET_KEY=sk_test_sua_chave_secreta_stripe

DATABASE_URL="postgresql://seu_usuario:sua_senha@localhost:5432/nome_do_seu_banco_de_dados?schema=public"

JWT_SECRET=sua_secret_key
```

### Etapa 3: Configurando o Prisma ORM.

Se você seguiu todos os passos anteriores corretamente, o Prisma já está praticamente pronto para uso!
Agora vamos finalizar a configuração com dois comandos importantes no terminal:

No seu **prompt de comando (CMD)**, insira os seguintes comandos:

3.1 **Gerar o Prisma Client**

Este comando cria o cliente do Prisma, responsável por permitir que você interaja com o banco de dados usando JavaScript

```bash
npx prisma generate
```

3.2 **Aplicando as migrações no banco de dados (Deploy de Migrações)**

Este comando aplica ao banco de dados todas as migrações pendentes que já foram criadas, garantindo que ele fique sincronizado com o seu schema.

```bash
npx prisma migrate deploy
```

✅ Após executar esses dois comandos, o Prisma estará totalmente funcional e pronto para ser utilizado no projeto!

> **Observação**: para visualizar suas tabelas do Prisma, junto com os dados e outras informações, execute o seguinte comando:

```bash
npx prisma studio
```

---

## 🎯 Fazendo requisições com API Client

Após seguir o tutorial de como rodar o projeto na sua máquina, você já pode realizar suas primeiras requisições utilizando ferramentas como o Postman ou qualquer outro API Client de sua preferência. Para isso, basta iniciar o servidor com o comando:

```bash
npm run dev
```

```bash
> stripe-integration@0.1.0 dev
> echo O Jubileu está esquisito hoje, eu tenho medo! 😨 && next dev

O Jubileu está esquisito hoje, eu tenho medo! 😨
   ▲ Next.js 15.2.4
   - Local:        http://localhost:3000
   - Network:      http://192.168.1.102:3000
   - Environments: .env #Seu arquivo .env que agora está configurado🫡.

 ✓ Starting...
 ✓ Ready in 4.8s
```
Se o Jubileu está esquisito hoje, e alguém está com medo... então está tudo certo! Agora é só partir para as requisições!

## Registro de cliente (cadastro)

**Siga as instruções para a requisição:**

1. Abra sua ferramenta API Client.

2. Selecione o método POST e insira a URL da rota: http://localhost:3000/api/registerClient

3. Vá até a aba **Body**.

4. Marque a opção **raw**.

5. Logo ao lado, clique no menu suspenso (onde geralmente está escrito Text) e selecione JSON.

6. No campo de texto abaixo, insira o seguinte conteúdo:

```json
{

"name": "seu nome",
"client_email": "seuemail@gmail.com",
"password": "suaSenha"

}
```

> Altere os campos conforme desejado. <br>
> Email é tratado como único no banco de dados, não vai funcionar se já tiver sido registrado!

**A resposta esperada é algo como:**

```json
 {
    "message": "Cadastro realizado com sucesso!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJhQGdtYWlsLmNvbSIsImlhdCI6MTc0Njk3NDgxOH0.fwku3KMTAQh2cWQPjxRbICoflW3Xhhase3QBclDBNgM"
}

```

**Observação:** O campo `token` representa um JWT (JSON Web Token) que identifica a sua sessão no sistema. Ele deve ser enviado nas próximas requisições autenticadas (por exemplo, para acessar dados protegidos).

Para utilizar esse token no Postman (ou outra ferramenta de API), siga os passos:

1. Acesse a aba Headers.

2. Adicione um novo header com:

```bash
# Key          Value
Authorization: Bearer seu_token_aqui
```
Substitua seu_token_aqui pelo token real recebido na resposta da rota de login ou cadastro.

**Resumo:**

**Método:** POST.

**URL:** http://localhost:3000/api/registerClient

**Body:** raw + JSON.

**Headers**: Content-Type: application/json. (Esse header geralmente é adicionado automaticamente ao selecionar "raw" e "JSON" no corpo da requisição.)

**Resposta desejada:** Mensagem "Cadastro realizado com sucesso!"  + Token.

---

## Login

Após você ter registrado suas credenciais no sistema, aprenda a acessar sua conta:

**Siga as instruções para a requisição:**

1. Abra sua ferramenta API Client.

2. Selecione o método POST e insira a URL da rota: http://localhost:3000/api/loginClient

3. Vá até a aba **Body**.

4. Marque a opção **raw**.

5. Logo ao lado, clique no menu suspenso (onde geralmente está escrito Text) e selecione JSON.

6. No campo de texto abaixo, insira o seguinte conteúdo:

```json
{

"client_email": "seuemail@gmail.com",
"password": "suaSenha"

}
```

> Altere os campos conforme os dados da sua conta (email e senha).

**A resposta esperada é algo como:**

```json
{
    "message": "Login realizado com sucesso",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJzZXVlbWxAZ21haWwuY29tIiwiaWF0IjoxNzQ3MDUyNTIwfQ.Hp1kIOWNRHx44THu6eORPn2BFJROGK3SIPxCC8MD3sg"
}

```

**Observação:** O campo `token` representa um JWT (JSON Web Token) que identifica a sua sessão no sistema. Ele deve ser enviado nas próximas requisições autenticadas (por exemplo, para acessar dados protegidos).

Para utilizar esse token no Postman (ou outra ferramenta de API), siga os passos:

1. Acesse a aba Headers.

2. Adicione um novo header com:

```bash
# Key          Value
Authorization: Bearer seu_token_aqui
```
Substitua seu_token_aqui pelo token real recebido na resposta da rota de login ou cadastro.

**Resumo:**

**Método:** POST.

**URL:** http://localhost:3000/api/loginClient

**Body:** raw + JSON.

**Headers**: Content-Type: application/json. (Esse header geralmente é adicionado automaticamente ao selecionar "raw" e "JSON" no corpo da requisição.)

**Resposta desejada:** Mensagem "Login realizado com sucesso!"  + Token.

---

## Puxar informações de um usuário

Para essa requisição é **obrigatório** que você tenha um token válido(obtido nas requisições anteriores, cadastro ou login).

**Siga as instruções para a requisição:**

1. Abra sua ferramenta API Client.

2. Selecione o método GET e insira a URL da rota: http://localhost:3000/api/getClientById

3. Acesse a aba Headers.

4. Adicione um novo header com:

```bash
# Key          Value
Authorization: Bearer seu_token_aqui
```
Substitua seu_token_aqui pelo token real recebido na resposta da rota de login ou cadastro.

5. Dispare a requisição.

**A resposta esperada é algo como:**

```json
{
    "id": 9,
    "client_name": "seu nome",
    "email": "seuemail@gmail.com",
    "client_password": "$2b$10$CzjTLqMoVjpc7Sh.UgtBEuWuOQXrIkQdnXVe3Tg1HJXDzPqBfyNAu"
}
```

Observação: O campo client_password (sua senha) está armazenado de forma hasheada, utilizando o algoritmo BCRYPT. Isso é feito para proteger dados sensíveis, como senhas, seguindo boas práticas de segurança.

**Resumo:**

**Método:** GET.

**URL:** http://localhost:3000/api/getClientById

**Body:** raw + JSON.

**Headers**: Authorization: Bearer seu_token

**Resposta desejada:** Dados do usuário como: Id, nome, email e senha com hash.

---

## Deletar cliente

Para essa requisição é **obrigatório** que você tenha um token válido(obtido nas requisições anteriores, cadastro ou login).

**Siga as instruções para a requisição:**

1. Abra sua ferramenta API Client.

2. Selecione o método DELETE e insira a URL da rota: http://localhost:3000/api/deleteClient

3. Acesse a aba Headers.

4. Adicione um novo header com:

```bash
# Key          Value
Authorization: Bearer seu_token_aqui
```
Substitua seu_token_aqui pelo token real recebido na resposta da rota de login ou cadastro.

5. Dispare a requisição.

**A resposta esperada é algo como:**

```raw
Usuário deletado!
```

**Resumo:**

**Método:** DELETE.

**URL:** http://localhost:3000/api/deleteClient

**Body:** raw + JSON.

**Headers**: Authorization: Bearer seu_token

**Resposta desejada:** Mensagem: "Usuário deletado!".

---

## Criar evento

Esta requisição realiza a integração com a Stripe API, permitindo a criação de produtos — que representam os ingressos dos eventos — diretamente na plataforma Stripe a partir deste projeto.

Para essa requisição é **obrigatório** que você tenha um token válido(obtido nas requisições anteriores, cadastro ou login).

**Siga as instruções para a requisição:**

1. Abra sua ferramenta API Client.

2. Selecione o método POST e insira a URL da rota: http://localhost:3000/api/createEvent

3. Acesse a aba Headers.

4. Adicione um novo header com:

```bash
# Key          Value
Authorization: Bearer seu_token_aqui
```
Substitua seu_token_aqui pelo token real recebido na resposta da rota de login ou cadastro.

5. Vá até a aba **Body**.

6. Marque a opção **raw**.

7. Logo ao lado, clique no menu suspenso (onde geralmente está escrito Text) e selecione JSON.

8. No campo de texto abaixo, insira o seguinte conteúdo:

```json
{

"eventName": "nome do seu evento",
"descriptionEvent": "descrição do seu evento",
"ticketsEvent": [{
    "title": "título do seu ingresso",
    "quantity": 100,
    "organizer_net_amount": 5000,
    "price_for_client": "100",
    "paid_or_free": true,
    "half_title": "",
    "quantity_half_ticket": 50,
    "half_net_amount_to_organizer": 2500,
    "half_price_to_client": 3000,
    "start_date": "2025-06-01T18:00:00.000Z",
    "end_date": "2025-06-01T22:00:00.000Z",
    "description": "descrição do ingresso"
  }]

}

```

Caso deseje criar 2 produtos (ingresso) ou mais relacionados ao seu evento, isso é possível, basta adicionar mais objetos ao vetor dentro de **ticketsEvent**, desta forma:

```json
{

"eventName": "nome do seu evento",
"descriptionEvent": "descrição do seu evento",
"ticketsEvent": [{
    "title": "ingresso 1",
    "quantity": 100,
    "organizer_net_amount": 5000,
    "price_for_client": "100",
    "paid_or_free": true,
    "half_title": "",
    "quantity_half_ticket": 50,
    "half_net_amount_to_organizer": 2500,
    "half_price_to_client": 3000,
    "start_date": "2025-06-01T18:00:00.000Z",
    "end_date": "2025-06-01T22:00:00.000Z",
    "description": "descrição do ingresso"
  },{
    "title": "ingresso 2",
    "quantity": 100,
    "organizer_net_amount": 5000,
    "price_for_client": "100",
    "paid_or_free": true,
    "half_title": "",
    "quantity_half_ticket": 50,
    "half_net_amount_to_organizer": 2500,
    "half_price_to_client": 3000,
    "start_date": "2025-06-01T18:00:00.000Z",
    "end_date": "2025-06-01T22:00:00.000Z",
    "description": "descrição do ingresso"
  },{
    "title": "ingresso 3",
    "quantity": 100,
    "organizer_net_amount": 5000,
    "price_for_client": "100",
    "paid_or_free": true,
    "half_title": "",
    "quantity_half_ticket": 50,
    "half_net_amount_to_organizer": 2500,
    "half_price_to_client": 3000,
    "start_date": "2025-06-01T18:00:00.000Z",
    "end_date": "2025-06-01T22:00:00.000Z",
    "description": "descrição do ingresso"
  }   ]

}
```
> **Observação:** Os objetos de ingressos possuem informações ainda não utilizadas pois o projeto ainda está em desenvolvimento, porém é necessário que se mantenham no lugar para o funcionamento da requisição, price_for_client deve se manter no formato String, logo esses detalhes serão arrumados! 🫡.

**A resposta esperada é algo como:**

```raw
Evento criado!
```

Acesse seu catálogo de produtos para vizualizar seus produtos (ingressos) criados através desta API [clicando aqui](https://dashboard.stripe.com/test/products)

![imagem de um painel stripe com produtos](./imagesFromReadme/painel_product_stripe.png)
Acima um exemplo de um painel de produtos da stripe, com produtos criados através desse projeto **destacados em vermelho**

---

>⚠️Documentação incompleta, ainda em desenvolvimento!