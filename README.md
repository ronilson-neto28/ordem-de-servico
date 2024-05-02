
# Sistema de Gerenciamento Ordem de Serviços

Este projeto é um sistema de gerenciamento de Ordem de serviço que permite adicionar, visualizar, editar e excluir registros de OS. Desenvolvido com uma interface de usuário simples, o sistema facilita a gestão de informações de forma eficiente e intuitiva.

## Tecnologias Utilizadas

- **Front-end:** HTML, CSS (Bootstrap para estilos), JavaScript (Axios para requisições HTTP)
- **Back-end:** LoopBack 4
- **Banco de dados:** PostgreSQL

## Pré-requisitos

Antes de iniciar, certifique-se de que você tem instalado em sua máquina:
- Node.js
- npm (Node Package Manager)
- LoopBack
- PostgreSQL

## Instruções de Instalação e Execução

1. **Clone o repositório**

    ```bash
    git clone [URL_DO_REPOSITORIO]
    ```

2. **Instale as dependências do projeto**

    Entre na pasta do projeto e execute:

    ```bash
    npm install
    ```

3. **Configure o banco de dados PostgreSQL**

    Certifique-se de que o PostgreSQL está rodando em sua máquina. Use as seguintes configurações padrão:
   ```bash
    - Porta: 5432
    - Host: localhost
    - Nome: ordem-de-servico
      ```

    Crie um banco de dados para o projeto e ajuste as configurações de conexão conforme necessário no arquivo de configuração do LoopBack.

5. **Inicie o projeto LoopBack**

    Ainda na pasta do projeto, execute:

    ```bash
    npm start
    ```

    Isso iniciará o servidor LoopBack na porta 3000 (por padrão).

6. **Acessar a Aplicação**

    Com o servidor rodando, você pode acessar a aplicação web abrindo `http://localhost:3000` em seu navegador.

## Obs: Algumas funcionalidades ainda não estao funcionando

---

