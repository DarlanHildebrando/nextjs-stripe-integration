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

<img src="./imagesFromReadme/estrutura_desejada.png" alt="Imagem de uma estrutura de arquivos na raiz do projeto">

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

<img src="./imagesFromReadme/Painel_teste_stripe.png" alt='Imagem de um painel teste da Stripe'/>

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