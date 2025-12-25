# PassBem API

API REST para sistema educacional PassBem desenvolvida em Node.js com Express e MongoDB.

## 🚀 Configuração e Instalação

### Pré-requisitos
- Node.js (v14 ou superior)
- NPM ou Yarn
- MongoDB Atlas ou local

### Instalação
```bash
# Clone o repositório
git clone https://github.com/Euler-JS/PassBemAPI.git

# Entre no diretório
cd PassBemAPI

# Instale as dependências
npm install

# Inicie o servidor em modo desenvolvimento
npm run dev

# Ou inicie em modo produção
npm start
```

## 🔐 Super Administrador

### Criando Super Admin
Para criar um usuário Super Administrador com acesso completo ao sistema:

```bash
npm run create-admin
```

### Credenciais do Super Admin
Após executar o comando acima, será criado um usuário com as seguintes credenciais:

- **Email**: `superadmin@passbem.com`
- **Senha**: `SuperAdmin@2025!`
- **Permissões**: Acesso completo a todos os módulos

### Login via API
```bash
curl -H "email: superadmin@passbem.com" -H "senha: SuperAdmin@2025!" http://localhost:3333/usersdata
```

Retorna:
```json
{
  "_id": "ID_DO_USUARIO",
  "email": "superadmin@passbem.com",
  "admin": true
}
```

Use o `_id` retornado como token de autorização para outras requisições.

## 📊 Dashboard

### Acesso ao Dashboard
```bash
# Dashboard principal
curl -H "Authorization: ID_DO_USUARIO" http://localhost:3333/dasboard

# Lista de compras
curl -H "user: ID_DO_USUARIO" http://localhost:3333/compras

# Lista de estudantes
curl http://localhost:3333/estudantes
```

### Interface Web
Para uma interface gráfica, utilize o arquivo `dashboard-completo.html` criado no projeto.

## 🔧 Permissões do Super Admin

O Super Administrador tem acesso completo a:

### ✅ Gestão de Usuários
- Criar, listar e gerenciar administradores
- Gerenciar usuários do aplicativo
- Visualizar informações de estudantes

### ✅ Gestão Educacional
- **Escolas**: Cadastrar e gerenciar escolas
- **Professores**: Registrar professores com imagens
- **Temas**: Criar e gerenciar temas educacionais
- **Módulos**: Organizar conteúdo em módulos
- **Material Didático**: Upload e gestão de materiais
- **Questões**: CRUD completo de questões com imagens
- **Vídeos Aula**: Gerenciar vídeos educacionais
- **Provas**: Sistema de avaliações e provas modulares

### ✅ Comunicação
- **Chat**: Gerenciar chat do aplicativo (texto, imagem, vídeo)
- **Anúncios**: Criar e gerenciar anúncios com imagens
- **Notificações Push**: Envio de notificações para usuários

### ✅ Financeiro
- **Pagamentos MPesa**: Gestão de pagamentos
- **Créditos**: Sistema de recarga de créditos
- **Histórico**: Relatórios de vendas e ganhos
- **Cobrança Manual**: Gestão manual de créditos

### ✅ Relatórios e Analytics
- **Dashboard**: Estatísticas gerais do sistema
- **Relatórios de Compras**: Histórico detalhado
- **Dados de Estudantes**: Análise por categoria e escola
- **Formulários**: Gestão de formulários e dados agregados

## 🛠 API Endpoints

### Autenticação
- `POST /usersdata` - Criar usuário admin
- `GET /usersdata` - Login (headers: email, senha)

### Dashboard
- `GET /dasboard` - Dashboard principal (Authorization header)
- `GET /compras` - Lista de compras (user header)
- `GET /estudantes` - Lista de estudantes

### Gestão de Conteúdo
- `POST /temas` - Criar tema
- `GET /temas` - Listar temas
- `POST /questoes` - Criar questão (com imagem)
- `GET /questoes` - Listar questões
- `PUT /questoes` - Atualizar questão
- `DELETE /questoes/:id` - Excluir questão
- `POST /modulos` - Criar módulo
- `GET /modulos` - Listar módulos
- `POST /material` - Adicionar material (com imagem)
- `GET /material` - Listar materiais
- `GET /appmaterial/:categoria` - Material por categoria

### Gestão Institucional
- `POST /escolas` - Criar escola
- `GET /escolas` - Listar escolas
- `POST /professor` - Criar professor (com imagem)
- `GET /professor` - Listar professores

### Vídeos e Mídia
- `POST /videosaula` - Adicionar vídeo (com imagem)
- `GET /videosaula` - Listar vídeos
- `DELETE /videosaula/:_id` - Remover vídeo

### Avaliações
- `POST /fazerprova` - Realizar prova
- `POST /fazerprovamodular` - Prova modular
- `GET /provasuser` - Provas do usuário
- `GET /respstaprova/:id` - Respostas da prova

### Comunicação
- `GET /chatall` - Listar chats
- `POST /chattext` - Enviar mensagem texto
- `POST /chatimagem` - Enviar imagem no chat
- `POST /chatvideo` - Enviar vídeo no chat

### Anúncios
- `POST /anucios` - Criar anúncio (com imagem)
- `GET /anucios` - Listar anúncios
- `GET /anucios/indexByTime` - Anúncios por tempo

### Pagamentos
- `POST /recaregarmais` - Recarregar créditos
- `GET /histypyments` - Histórico de pagamentos
- `GET /getcredity` - Consultar créditos
- `POST /manualcharge` - Recarga manual

### Notificações
- `POST /updatePushToken` - Atualizar token push
- `POST /Sendnotifications` - Enviar notificação
- `GET /GetUsersPushs` - Listar usuários com push

### Formulários
- `POST /newForm` - Criar formulário
- `POST /newTecForm` - Formulário técnico
- `GET /getTec` - Listar técnicos
- `GET /forms` - Listar formulários
- `GET /sumarry` - Dados agregados

## 📱 Aplicativo Mobile

A API suporta endpoints específicos para o aplicativo mobile. Abaixo a documentação completa com payloads e respostas.

### Autenticação e Usuários

#### POST /appuser
- **Descrição**: Cria um novo usuário no aplicativo.
- **Payload da Requisição**:
  ```json
  {
    "numero": "string",
    "senha": "string"
  }
  ```
- **Resposta de Sucesso**:
  ```json
  "Sua conta foi criada com sucesso!"
  ```
- **Resposta de Erro** (usuário já existe):
  ```json
  "Este contacto encontra-se associado a uma conta."
  ```

#### GET /appuser
- **Descrição**: Faz login do usuário.
- **Cabeçalhos da Requisição**:
  ```
  numero: string
  senha: string
  ```
- **Resposta de Sucesso**:
  ```json
  {
    "_id": "user_id",
    "numero": "string",
    "senha": "string",
    "user_inf": {
      // dados populados do usuário
    }
  }
  ```
- **Respostas de Erro**:
  - 404: `{ "error": "Nenhuma conta associada a este número!" }`
  - 401: `{ "error": "Senha Invalida" }`

#### POST /appuserinf
- **Descrição**: Cria ou atualiza informações adicionais do usuário (com upload de imagem).
- **Payload da Requisição** (form-data):
  ```
  nome: string
  provincia: string
  distrito: string
  telefone: string
  email: string
  idade: string
  genero: string
  categoria: string
  escola: string
  viatura: string
  datacomprar: string
  classecaro: string
  notificacao: string
  nivelacademico: string
  imagem: file (opcional)
  ```
- **Cabeçalhos da Requisição**:
  ```
  authorization: user_id
  ```
- **Resposta de Sucesso**:
  ```json
  {
    "messagem": "Perfil atualizado com sucesso!",
    "appUser": {
      // objeto do usuário atualizado
    }
  }
  ```

#### PUT /appuserinf
- **Descrição**: Obtém informações do usuário.
- **Payload da Requisição**:
  ```json
  {
    "user": "telefone"
  }
  ```
- **Resposta de Sucesso**:
  ```json
  {
    // objeto UserInf
  }
  ```

### Temas e Perguntas

#### GET /apptemas
- **Descrição**: Lista todos os temas disponíveis no aplicativo.
- **Cabeçalhos da Requisição**:
  ```
  authorization: user_id
  ```
- **Resposta de Sucesso**:
  ```json
  {
    "temas": [
      // array de temas
    ],
    "creditos": {
      // objeto de créditos do usuário
    }
  }
  ```

#### POST /apptemas
- **Descrição**: Inicia uma prova baseada em um tema.
- **Payload da Requisição**:
  ```json
  {
    "item": {
      "_id": "tema_id",
      "nome": "nome_do_tema"
    },
    "tipo": "Tematica"
  }
  ```
- **Cabeçalhos da Requisição**:
  ```
  authorization: user_id
  ```
- **Resposta de Sucesso**:
  ```json
  {
    "results": [
      // array de perguntas
    ],
    "prova": {
      // objeto da prova criada
    }
  }
  ```

### Módulos e Cursos

#### GET /appmodulos
- **Descrição**: Lista todos os módulos disponíveis.
- **Resposta de Sucesso**:
  ```json
  {
    "messagem": "Voce carregou os cursos com sucesso!",
    "data": {
      "modulos": [
        // array de módulos
      ],
      "videosaulas": [
        // array de vídeos
      ]
    }
  }
  ```

#### GET /appmodulos/:_id
- **Descrição**: Obtém detalhes de um módulo específico, incluindo vídeos e perguntas.
- **Parâmetros da URL**: `_id` (ID do módulo)
- **Resposta de Sucesso**:
  ```json
  {
    "videos": [
      // array de vídeos do módulo
    ],
    "perguntas": [
      // array de perguntas do módulo
    ]
  }
  ```

### Provas

#### POST /fazerprova
- **Descrição**: Submete uma prova realizada pelo usuário.
- **Payload da Requisição**:
  ```json
  {
    "ProvaFeita": [
      {
        "userOption": "resposta",
        "prova": "prova_id",
        "questao": "questao_id"
      }
    ],
    "pts": 85
  }
  ```
- **Cabeçalhos da Requisição**:
  ```
  authorization: user_id
  ```
- **Resposta de Sucesso**:
  ```json
  {
    "message": "Teste salvo com sucesso",
    "data": {
      // objeto da prova atualizada
    }
  }
  ```

#### POST /fazerprovamodular
- **Descrição**: Submete uma prova modular realizada pelo usuário.
- **Payload da Requisição**:
  ```json
  {
    "ProvaFeita": [
      {
        "userOption": "resposta",
        "questao": "questao_id"
      }
    ],
    "pts": 90,
    "modulo": {
      "nome": "nome_modulo",
      "_id": "modulo_id"
    }
  }
  ```
- **Cabeçalhos da Requisição**:
  ```
  authorization: user_id
  ```
- **Resposta de Sucesso**: Status 200 (sem corpo)

#### GET /provasuser
- **Descrição**: Lista as provas do usuário.
- **Cabeçalhos da Requisição**:
  ```
  authorization: user_id
  ```
- **Resposta de Sucesso**:
  ```json
  {
    "message": "Sucesso!",
    "response": [
      // array de provas normais
    ],
    "modulares": [
      // array de provas modulares
    ]
  }
  ```

#### GET /respstaprova/:id
- **Descrição**: Obtém respostas de uma prova específica.
- **Parâmetros da URL**: `id` (ID da prova)
- **Resposta de Sucesso**:
  ```json
  {
    "message": "Sucesso!",
    "resposta": [
      // array de respostas populadas
    ]
  }
  ```

#### GET /respstaprovamodular/:id
- **Descrição**: Obtém respostas de uma prova modular específica.
- **Parâmetros da URL**: `id` (ID da prova modular)
- **Resposta de Sucesso**:
  ```json
  {
    "message": "Sucesso!",
    "resposta": [
      // array de respostas populadas
    ]
  }
  ```

### Chat

#### GET /chatall
- **Descrição**: Lista todas as mensagens de chat.
- **Cabeçalhos da Requisição**:
  ```
  authorization: user_id
  ```
- **Resposta de Sucesso**:
  ```json
  [
    // array de mensagens de chat
  ]
  ```

#### POST /chattext
- **Descrição**: Envia uma mensagem de texto no chat.
- **Payload da Requisição**:
  ```json
  {
    "text": "mensagem",
    "name": "nome_usuario",
    "avatar": "url_avatar"
  }
  ```
- **Cabeçalhos da Requisição**:
  ```
  authorization: user_id
  ```
- **Resposta de Sucesso**: Status 200 com "created"

#### POST /chatimagem
- **Descrição**: Envia uma imagem no chat.
- **Payload da Requisição** (form-data):
  ```
  name: string
  avatar: string
  imagem: file
  ```
- **Cabeçalhos da Requisição**:
  ```
  authorization: user_id
  ```
- **Resposta de Sucesso**: Status 200 com "created"

#### POST /chatvideo
- **Descrição**: Envia um vídeo no chat.
- **Payload da Requisição** (form-data):
  ```
  name: string
  avatar: string
  video: file
  ```
- **Cabeçalhos da Requisição**:
  ```
  authorization: user_id
  ```
- **Resposta de Sucesso**: Status 200 com "created"

### Pagamentos e Créditos

#### POST /recaregarmais
- **Descrição**: Recarrega créditos via M-Pesa.
- **Payload da Requisição**:
  ```json
  {
    "pacote": "Diario",
    "numero": "numero_telefone"
  }
  ```
- **Cabeçalhos da Requisição**:
  ```
  authorization: user_id
  ```
- **Resposta de Sucesso**:
  ```json
  {
    "status": "200 ok",
    "message": "Parabéns você tem mais X dias para estudar sem limites",
    "atividade": 30
  }
  ```

#### GET /histypyments
- **Descrição**: Obtém histórico de pagamentos.
- **Cabeçalhos da Requisição**:
  ```
  authorization: user_id
  ```
- **Resposta de Sucesso**:
  ```json
  {
    "status": "200 ok",
    "message": "",
    "value": [
      // array de histórico de pagamentos
    ]
  }
  ```

#### GET /getcredity
- **Descrição**: Obtém créditos do usuário.
- **Cabeçalhos da Requisição**:
  ```
  authorization: user_id
  ```
- **Resposta de Sucesso**:
  ```json
  {
    "status": "200 ok",
    "message": "",
    "value": {
      // objeto de créditos
    }
  }
  ```

#### POST /manualcharge
- **Descrição**: Carrega créditos manualmente (admin).
- **Payload da Requisição**:
  ```json
  {
    "pacote": "Diario",
    "numero": "numero_telefone",
    "id": "admin_id",
    "name": "admin_name"
  }
  ```
- **Resposta de Sucesso**:
  ```json
  {
    "status": "200 ok",
    "message": "Parabéns você tem mais X dias para estudar sem limites"
  }
  ```

### Materiais Didáticos

#### GET /appmaterial/:categoria
- **Descrição**: Lista materiais por categoria.
- **Parâmetros da URL**: `categoria` (categoria do material)
- **Resposta de Sucesso**:
  ```json
  {
    "message": "Busca de Material realizada com sucesso!",
    "value": [
      // array de materiais
    ]
  }
  ```

### Notificações Push

#### POST /updatePushToken
- **Descrição**: Atualiza o token de push do usuário.
- **Payload da Requisição**:
  ```json
  {
    "pushToken": "expo_push_token",
    "phoneNumber": "numero_telefone"
  }
  ```
- **Cabeçalhos da Requisição**:
  ```
  authorization: user_id
  ```
- **Resposta de Sucesso**:
  ```json
  {
    "error": false,
    "message": "Token de notificação criado/atualizado com sucesso"
  }
  ```

#### GET /GetUsersPushs
- **Descrição**: Obtém lista de usuários com tokens de push.
- **Resposta de Sucesso**:
  ```json
  [
    // array de usuários com push tokens
  ]
  ```

### Notas Gerais para Mobile
- Todas as rotas utilizam JSON para requisições e respostas, exceto onde especificado upload de arquivos (form-data).
- Autenticação é baseada em `numero` e `senha` via cabeçalhos ou corpo, e `authorization` header para user_id em rotas protegidas.
- Uploads de imagem/vídeo usam `multer` com campo "imagem" ou "video".
- Erros retornam status apropriados (400, 401, 404, 500) com mensagens em português.
- Campos obrigatórios são indicados; outros são opcionais.

## 🗄 Banco de Dados

### MongoDB Collections
- `admins` - Usuários administradores
- `escolas` - Escolas cadastradas
- `professores` - Professores
- `temas` - Temas educacionais
- `modulos` - Módulos de ensino
- `materiais` - Material didático
- `questoes` - Questões/perguntas
- `videoaulas` - Vídeos educacionais
- `usuarios` - Usuários do app
- `provas` - Avaliações
- `historicocreditos` - Transações financeiras
- `chat` - Mensagens do chat
- `anucios` - Anúncios
- `notificacoes` - Notificações push

## 🌐 Servidor

A API roda por padrão na porta **3333**:
- Local: `http://localhost:3333`
- Deploy: Configurar variável `PORT`

## 📋 Scripts Disponíveis

```bash
# Desenvolvimento com auto-reload
npm run dev

# Produção
npm start

# Criar Super Admin
npm run create-admin
```

## 🔒 Segurança

### Autenticação
- Login via headers (email/senha)
- Tokens de autorização (ID do usuário)
- Verificação de permissões admin

### Upload de Arquivos
- Configuração Multer para imagens
- Armazenamento em `/uploads`
- Servidos via `/files`

## 🚀 Deploy

### Variáveis de Ambiente
Configure as seguintes variáveis:
- `PORT` - Porta do servidor
- `MONGODB_URI` - String de conexão MongoDB

### MongoDB Atlas
O projeto está configurado para MongoDB Atlas. Atualize a string de conexão em `src/database/Mongo.js`.

## 📞 Suporte

Para questões técnicas ou suporte, entre em contato com a equipe de desenvolvimento.

---

**PassBem API** - Sistema Educacional Moçambicano
Desenvolvido por Euler-JS
