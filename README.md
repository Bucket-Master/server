# Bucket Control

## Instalação

### Primeiro passo
Abra o projeto em seu vscode e use

```bash
  npm install
```

### Segundo passo
Crie um arquivo ```.env``` na raiz do projeto e cole as variaveis encontradas em ```.env.example```

### Terceiro passo
Rode o projeto usando:

```bash
  npm run dev
```

### Quarto passo
Para testar as rotas, pode usar o arquivo ```client.http``` com a extensão do [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) ou se preferir pode usar um postman ou insomnia

## Requisitos funcionais
- [ ] O administrador pode visualizar usuarios cadastrados
- [ ] O administrador pode ver usuario que pagou mensalidade da plataforma

- [ ] O usuario deve poder se cadastrar no site
- [ ] O usuario deve poder editar dados cadastrados
- [ ] O usuario deve poder cadastrar novos clientes
- [ ] O usuario deve poder editar informacoes de clientes, como endereco, nome, telefone de contato
- [X] O usuario deve poder adicionar nova tarefa
- [X] O usuario deve poder editar tarefa
- [X] O usuario deve poder concluir tarefas
- [ ] O usuario deve poder inserir informacoes financeira
- [ ] O usuario deve poder editar informacoes financeira
- [ ] O usuario deve poder apagar informacoes financeira
- [ ] O usuario deve poder ver um resumo de todas informacoes em um dashboard

## Regra de negocio
- [ ] O usuario so pode se cadastrar se tiver um cnpj valido
- [ ] Clientes devem estar ligado a um usuario
- [ ] Para o administrador acessar a aplicacao como admin, ela precisa estar logada
- [ ] Para fechar uma tarefa ela deve estar obritariamente concluida
- [ ] O acesso a plataforma deve ser mediante a pagamento da mensalidade, somente em real e pelo cartao de credito

## Requisitos nao-funcionais
- [ ] A senha do usuario precisa estar criptografada
- [ ] Os dados da aplicacao precisam estar persistidos em banco PostgresSQL
- [ ] Todas as lista de dados precisam estar paginadas
- [ ] O usuario deve ser identificado por um JWT (Json Web Token)
