# Gerenciador de Contatos

 O back-end é uma API REST em ASP.NET Core com banco SQLite, e o front-end é uma SPA em React com Tailwind.

## O que fiz além do pedido

- Adicionei validações no model (nome obrigatório, e-mail com formato válido, telefone com 10 ou 11 dígitos)
- O formulário já formata o telefone enquanto você digita (frontend)
- Os erros de validação da API aparecem dentro do modal, sem sumir o que o usuário digitou (frontend)
- O front-end lista, cria, edita e exclui contatos sem recarregar a página (frontend)

---

## Como rodar

### Back-end

Usei o .NET 9 SDK. Dentro da pasta `ContactsApi`:

```bash
dotnet restore
dotnet ef database update
dotnet run
```

A API sobe em `http://localhost:5000`. Para testar os endpoints pelo Swagger: `http://localhost:5000/swagger`

### Front-end

```bash
npm install
npm run dev
```

A interface abre em `http://localhost:5173`. Deixei a URL da API hardcoded no código (`http://localhost:5000`) para facilitar a execução mas o ideal seria uma variável de ambiente

