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

A API suporta endpoints específicos para o aplicativo mobile:

### Usuários App
- `POST /appuser` - Criar usuário app
- `GET /appuser` - Login app
- `POST /appuserinf` - Informações do usuário (com imagem)

### Conteúdo App
- `GET /apptemas` - Temas para app
- `GET /appmodulos` - Módulos para app
- `GET /appmodulos/:_id` - Módulo específico

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
