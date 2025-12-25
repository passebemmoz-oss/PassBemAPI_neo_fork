# Documentação da API Mobile - PassBem

## Visão Geral

Esta documentação detalha todas as rotas da API específicas para o aplicativo mobile PassBem. Todas as rotas estão organizadas por categoria funcional e incluem exemplos completos de payloads de requisição e respostas.

**Base URL**: `https://api.passbem.com` ou `http://localhost:3333` (desenvolvimento)

**Autenticação**: A maioria das rotas requer autenticação via header `authorization` contendo o ID do usuário.

---

## 1. Autenticação e Usuários

### POST /appuser
**Descrição**: Cria um novo usuário no aplicativo mobile.

**Payload da Requisição**:
```json
{
  "numero": "258841234567",
  "senha": "minha_senha_segura"
}
```

**Resposta de Sucesso (201)**:
```json
"Sua conta foi criada com sucesso!"
```

**Resposta de Erro (409)**:
```json
"Este contacto encontra-se associado a uma conta."
```

---

### GET /appuser
**Descrição**: Faz login do usuário no aplicativo.

**Cabeçalhos da Requisição**:
```
numero: 258841234567
senha: minha_senha_segura
```

**Resposta de Sucesso (200)**:
```json
{
  "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
  "numero": "258841234567",
  "senha": "hashed_password",
  "user_inf": {
    "nome": "João Silva",
    "provincia": "Maputo",
    "distrito": "KaMpfumu",
    "telefone": "258841234567",
    "email": "joao@email.com",
    "idade": "25",
    "genero": "Masculino",
    "categoria": "Estudante",
    "escola": "Escola Secundária 1",
    "viatura": "Sim",
    "datacomprar": "2025-01-15",
    "classecaro": "Classe B",
    "notificacao": "Ativado",
    "nivelacademico": "Ensino Médio",
    "imagem": "perfil_12345.jpg"
  }
}
```

**Respostas de Erro**:
- `404`: `{ "error": "Nenhuma conta associada a este número!" }`
- `401`: `{ "error": "Senha Invalida" }`

---

### POST /appuserinf
**Descrição**: Cria ou atualiza informações adicionais do usuário (com upload opcional de imagem de perfil).

**Cabeçalhos da Requisição**:
```
authorization: 64f1a2b3c4d5e6f7g8h9i0j1
```

**Payload da Requisição (form-data)**:
```
nome: João Silva
provincia: Maputo
distrito: KaMpfumu
telefone: 258841234567
email: joao@email.com
idade: 25
genero: Masculino
categoria: Estudante
escola: Escola Secundária 1
viatura: Sim
datacomprar: 2025-01-15
classecaro: Classe B
notificacao: Ativado
nivelacademico: Ensino Médio
imagem: [arquivo de imagem]
```

**Resposta de Sucesso (200)**:
```json
{
  "messagem": "Perfil atualizado com sucesso!",
  "appUser": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
    "numero": "258841234567",
    "user_inf": "64f1a2b3c4d5e6f7g8h9i0j2"
  }
}
```

---

### PUT /appuserinf
**Descrição**: Obtém informações específicas do usuário.

**Payload da Requisição**:
```json
{
  "user": "258841234567"
}
```

**Resposta de Sucesso (200)**:
```json
{
  "_id": "64f1a2b3c4d5e6f7g8h9i0j2",
  "nome": "João Silva",
  "provincia": "Maputo",
  "distrito": "KaMpfumu",
  "telefone": "258841234567",
  "email": "joao@email.com",
  "idade": "25",
  "genero": "Masculino",
  "categoria": "Estudante",
  "escola": "Escola Secundária 1",
  "viatura": "Sim",
  "datacomprar": "2025-01-15",
  "classecaro": "Classe B",
  "notificacao": "Ativado",
  "user": "64f1a2b3c4d5e6f7g8h9i0j1",
  "nivelacademico": "Ensino Médio",
  "imagem": "perfil_12345.jpg"
}
```

---

## 2. Temas e Perguntas

### GET /apptemas
**Descrição**: Lista todos os temas disponíveis para provas no aplicativo.

**Cabeçalhos da Requisição**:
```
authorization: 64f1a2b3c4d5e6f7g8h9i0j1
```

**Resposta de Sucesso (200)**:
```json
{
  "temas": [
    {
      "_id": "64f1a2b3c4d5e6f7g8h9i0j3",
      "nome": "Matemática Básica",
      "numero": 25
    },
    {
      "_id": "64f1a2b3c4d5e6f7g8h9i0j4",
      "nome": "Português",
      "numero": 30
    }
  ],
  "creditos": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j5",
    "user": "64f1a2b3c4d5e6f7g8h9i0j1",
    "atividade": 7,
    "pacote": "Semanal",
    "inscricao": "2025-11-28T10:00:00.000Z"
  }
}
```

---

### POST /apptemas
**Descrição**: Inicia uma prova baseada em um tema selecionado.

**Cabeçalhos da Requisição**:
```
authorization: 64f1a2b3c4d5e6f7g8h9i0j1
```

**Payload da Requisição**:
```json
{
  "item": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j3",
    "nome": "Matemática Básica"
  },
  "tipo": "Tematica"
}
```

**Resposta de Sucesso (200)**:
```json
{
  "results": [
    {
      "_id": "64f1a2b3c4d5e6f7g8h9i0j6",
      "pergunta": "Quanto é 2 + 2?",
      "opcoes": ["3", "4", "5", "6"],
      "resposta_correta": "4",
      "tema_id": "64f1a2b3c4d5e6f7g8h9i0j3",
      "imagem": "pergunta_123.jpg"
    }
  ],
  "prova": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j7",
    "tipo": "Tematica",
    "user": "64f1a2b3c4d5e6f7g8h9i0j1",
    "tema": "64f1a2b3c4d5e6f7g8h9i0j3",
    "tem_nome": "Matemática Básica",
    "numero": 20
  }
}
```

---

## 3. Módulos e Cursos

### GET /appmodulos
**Descrição**: Lista todos os módulos de cursos disponíveis.

**Resposta de Sucesso (200)**:
```json
{
  "messagem": "Voce carregou os cursos com sucesso!",
  "data": {
    "modulos": [
      {
        "_id": "64f1a2b3c4d5e6f7g8h9i0j8",
        "nome": "Módulo 1 - Introdução",
        "numero": 1
      },
      {
        "_id": "64f1a2b3c4d5e6f7g8h9i0j9",
        "nome": "Módulo 2 - Avançado",
        "numero": 2
      }
    ],
    "videosaulas": [
      {
        "_id": "64f1a2b3c4d5e6f7g8h9i0k0",
        "titulo": "Vídeo Aula 1",
        "modulo_id": "64f1a2b3c4d5e6f7g8h9i0j8",
        "url": "video_123.mp4",
        "imagem": "thumbnail_123.jpg"
      }
    ]
  }
}
```

---

### GET /appmodulos/:_id
**Descrição**: Obtém detalhes de um módulo específico, incluindo vídeos e perguntas.

**Parâmetros da URL**:
- `_id`: ID do módulo (ex: `64f1a2b3c4d5e6f7g8h9i0j8`)

**Resposta de Sucesso (200)**:
```json
{
  "videos": [
    {
      "_id": "64f1a2b3c4d5e6f7g8h9i0k0",
      "titulo": "Vídeo Aula 1",
      "modulo_id": "64f1a2b3c4d5e6f7g8h9i0j8",
      "url": "video_123.mp4",
      "imagem": "thumbnail_123.jpg"
    }
  ],
  "perguntas": [
    {
      "_id": "64f1a2b3c4d5e6f7g8h9i0k1",
      "pergunta": "Qual é a capital de Moçambique?",
      "opcoes": ["Maputo", "Beira", "Nampula", "Tete"],
      "resposta_correta": "Maputo",
      "partilhadas": "64f1a2b3c4d5e6f7g8h9i0j8"
    }
  ]
}
```

---

## 4. Provas e Avaliações

### POST /fazerprova
**Descrição**: Submete as respostas de uma prova realizada pelo usuário.

**Cabeçalhos da Requisição**:
```
authorization: 64f1a2b3c4d5e6f7g8h9i0j1
```

**Payload da Requisição**:
```json
{
  "ProvaFeita": [
    {
      "userOption": "4",
      "prova": "64f1a2b3c4d5e6f7g8h9i0j7",
      "questao": "64f1a2b3c4d5e6f7g8h9i0j6"
    },
    {
      "userOption": "Maputo",
      "prova": "64f1a2b3c4d5e6f7g8h9i0j7",
      "questao": "64f1a2b3c4d5e6f7g8h9i0k1"
    }
  ],
  "pts": 85
}
```

**Resposta de Sucesso (200)**:
```json
{
  "message": "Teste salvo com sucesso",
  "data": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j7",
    "tipo": "Tematica",
    "user": "64f1a2b3c4d5e6f7g8h9i0j1",
    "tema": "64f1a2b3c4d5e6f7g8h9i0j3",
    "tem_nome": "Matemática Básica",
    "numero": 21,
    "resultado": 85
  }
}
```

---

### POST /fazerprovamodular
**Descrição**: Submete as respostas de uma prova modular realizada pelo usuário.

**Cabeçalhos da Requisição**:
```
authorization: 64f1a2b3c4d5e6f7g8h9i0j1
```

**Payload da Requisição**:
```json
{
  "ProvaFeita": [
    {
      "userOption": "Maputo",
      "questao": "64f1a2b3c4d5e6f7g8h9i0k1"
    }
  ],
  "pts": 90,
  "modulo": {
    "nome": "Módulo 1 - Introdução",
    "_id": "64f1a2b3c4d5e6f7g8h9i0j8"
  }
}
```

**Resposta de Sucesso (200)**: Status 200 (sem corpo de resposta)

---

### GET /provasuser
**Descrição**: Lista todas as provas realizadas pelo usuário.

**Cabeçalhos da Requisição**:
```
authorization: 64f1a2b3c4d5e6f7g8h9i0j1
```

**Resposta de Sucesso (200)**:
```json
{
  "message": "Sucesso!",
  "response": [
    {
      "_id": "64f1a2b3c4d5e6f7g8h9i0j7",
      "tipo": "Tematica",
      "user": "64f1a2b3c4d5e6f7g8h9i0j1",
      "tema": "64f1a2b3c4d5e6f7g8h9i0j3",
      "tem_nome": "Matemática Básica",
      "numero": 21,
      "resultado": 85
    }
  ],
  "modulares": [
    {
      "_id": "64f1a2b3c4d5e6f7g8h9i0k2",
      "modulo_nome": "Módulo 1 - Introdução",
      "user": "64f1a2b3c4d5e6f7g8h9i0j1",
      "modulo_id": "64f1a2b3c4d5e6f7g8h9i0j8",
      "numero": 21,
      "resultado": 90
    }
  ]
}
```

---

### GET /respstaprova/:id
**Descrição**: Obtém as respostas detalhadas de uma prova específica.

**Parâmetros da URL**:
- `id`: ID da prova (ex: `64f1a2b3c4d5e6f7g8h9i0j7`)

**Resposta de Sucesso (200)**:
```json
{
  "message": "Sucesso!",
  "resposta": [
    {
      "_id": "64f1a2b3c4d5e6f7g8h9i0k3",
      "resposta": "4",
      "user": "64f1a2b3c4d5e6f7g8h9i0j1",
      "prova": {
        "_id": "64f1a2b3c4d5e6f7g8h9i0j7",
        "tipo": "Tematica",
        "resultado": 85
      },
      "questao": {
        "_id": "64f1a2b3c4d5e6f7g8h9i0j6",
        "pergunta": "Quanto é 2 + 2?",
        "resposta_correta": "4"
      }
    }
  ]
}
```

---

### GET /respstaprovamodular/:id
**Descrição**: Obtém as respostas detalhadas de uma prova modular específica.

**Parâmetros da URL**:
- `id`: ID da prova modular (ex: `64f1a2b3c4d5e6f7g8h9i0k2`)

**Resposta de Sucesso (200)**:
```json
{
  "message": "Sucesso!",
  "resposta": [
    {
      "_id": "64f1a2b3c4d5e6f7g8h9i0k4",
      "resposta": "Maputo",
      "user": "64f1a2b3c4d5e6f7g8h9i0j1",
      "prova": {
        "_id": "64f1a2b3c4d5e6f7g8h9i0k2",
        "modulo_nome": "Módulo 1 - Introdução",
        "resultado": 90
      },
      "questao": {
        "_id": "64f1a2b3c4d5e6f7g8h9i0k1",
        "pergunta": "Qual é a capital de Moçambique?",
        "resposta_correta": "Maputo"
      }
    }
  ]
}
```

---

## 5. Chat

### GET /chatall
**Descrição**: Lista todas as mensagens do chat global.

**Cabeçalhos da Requisição**:
```
authorization: 64f1a2b3c4d5e6f7g8h9i0j1
```

**Resposta de Sucesso (200)**:
```json
[
  {
    "_id": "64f1a2b3c4d5e6f7g8h9i0k5",
    "text": "Olá a todos!",
    "user": {
      "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
      "name": "João Silva",
      "avatar": "avatar_123.jpg"
    },
    "createdAt": "2025-11-28T10:30:00.000Z"
  },
  {
    "_id": "64f1a2b3c4d5e6f7g8h9i0k6",
    "image_name": "chat_image_456.jpg",
    "user": {
      "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
      "name": "João Silva",
      "avatar": "avatar_123.jpg"
    },
    "createdAt": "2025-11-28T10:35:00.000Z"
  }
]
```

---

### POST /chattext
**Descrição**: Envia uma mensagem de texto no chat.

**Cabeçalhos da Requisição**:
```
authorization: 64f1a2b3c4d5e6f7g8h9i0j1
```

**Payload da Requisição**:
```json
{
  "text": "Olá a todos!",
  "name": "João Silva",
  "avatar": "avatar_123.jpg"
}
```

**Resposta de Sucesso (200)**:
```
"created"
```

---

### POST /chatimagem
**Descrição**: Envia uma imagem no chat.

**Cabeçalhos da Requisição**:
```
authorization: 64f1a2b3c4d5e6f7g8h9i0j1
```

**Payload da Requisição (form-data)**:
```
name: João Silva
avatar: avatar_123.jpg
imagem: [arquivo de imagem]
```

**Resposta de Sucesso (200)**:
```
"created"
```

---

### POST /chatvideo
**Descrição**: Envia um vídeo no chat.

**Cabeçalhos da Requisição**:
```
authorization: 64f1a2b3c4d5e6f7g8h9i0j1
```

**Payload da Requisição (form-data)**:
```
name: João Silva
avatar: avatar_123.jpg
video: [arquivo de vídeo]
```

**Resposta de Sucesso (200)**:
```
"created"
```

---

## 6. Pagamentos e Créditos

### POST /recaregarmais
**Descrição**: Recarrega créditos via M-Pesa para acesso aos conteúdos.

**Cabeçalhos da Requisição**:
```
authorization: 64f1a2b3c4d5e6f7g8h9i0j1
```

**Payload da Requisição**:
```json
{
  "pacote": "Diario",
  "numero": "258841234567"
}
```

**Resposta de Sucesso (200)**:
```json
{
  "status": "200 ok",
  "message": "Parabéns você tem mais 1 dias para estudar sem limites",
  "atividade": 30
}
```

**Resposta de Erro (409)**:
```json
"Transaction declined. Status: 409"
```

---

### GET /histypyments
**Descrição**: Obtém o histórico de pagamentos do usuário.

**Cabeçalhos da Requisição**:
```
authorization: 64f1a2b3c4d5e6f7g8h9i0j1
```

**Resposta de Sucesso (200)**:
```json
{
  "status": "200 ok",
  "message": "",
  "value": [
    {
      "_id": "64f1a2b3c4d5e6f7g8h9i0k7",
      "pacote": "Diario",
      "status": true,
      "valor": 28,
      "credito_card": "64f1a2b3c4d5e6f7g8h9i0k8",
      "user": "64f1a2b3c4d5e6f7g8h9i0j1",
      "transactionreference": "ABC123DEF456",
      "inscricao": "2025-11-28T10:00:00.000Z"
    }
  ]
}
```

---

### GET /getcredity
**Descrição**: Consulta os créditos atuais do usuário.

**Cabeçalhos da Requisição**:
```
authorization: 64f1a2b3c4d5e6f7g8h9i0j1
```

**Resposta de Sucesso (200)**:
```json
{
  "status": "200 ok",
  "message": "",
  "value": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0k8",
    "user": "64f1a2b3c4d5e6f7g8h9i0j1",
    "atividade": 7,
    "pacote": "Semanal",
    "inscricao": "2025-11-28T10:00:00.000Z"
  }
}
```

---

### POST /manualcharge
**Descrição**: Carrega créditos manualmente (usado por administradores).

**Payload da Requisição**:
```json
{
  "pacote": "Diario",
  "numero": "258841234567",
  "id": "64f1a2b3c4d5e6f7g8h9i0j9",
  "name": "Admin User"
}
```

**Resposta de Sucesso (200)**:
```json
{
  "status": "200 ok",
  "message": "Parabéns você tem mais 1 dias para estudar sem limites"
}
```

---

## 7. Materiais Didáticos

### GET /appmaterial/:categoria
**Descrição**: Lista materiais didáticos por categoria.

**Parâmetros da URL**:
- `categoria`: Categoria do material (ex: `matematica`, `portugues`)

**Resposta de Sucesso (200)**:
```json
{
  "message": "Busca de Material realizada com sucesso!",
  "value": [
    {
      "_id": "64f1a2b3c4d5e6f7g8h9i0k9",
      "name": "Apostila de Matemática",
      "pages": 50,
      "imagem": "material_123.jpg",
      "categoria": ["matematica", "ensino-medio"],
      "modulos": ["algebra", "geometria"]
    }
  ]
}
```

---

## 8. Notificações Push

### POST /updatePushToken
**Descrição**: Atualiza o token de push do usuário para notificações.

**Cabeçalhos da Requisição**:
```
authorization: 64f1a2b3c4d5e6f7g8h9i0j1
```

**Payload da Requisição**:
```json
{
  "pushToken": "ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]",
  "phoneNumber": "258841234567"
}
```

**Resposta de Sucesso (200)**:
```json
{
  "error": false,
  "message": "Token de notificação criado com sucesso"
}
```

**Resposta de Atualização (200)**:
```json
{
  "error": false,
  "message": "Token de notificação atualizado com sucesso"
}
```

---

### GET /GetUsersPushs
**Descrição**: Lista todos os usuários com tokens de push (usado para notificações em massa).

**Resposta de Sucesso (200)**:
```json
[
  {
    "_id": "64f1a2b3c4d5e6f7g8h9i0l0",
    "pushToken": "ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]",
    "phoneNumber": "258841234567"
  }
]
```

---

## Códigos de Status HTTP

- **200**: Sucesso
- **201**: Criado com sucesso
- **400**: Requisição inválida
- **401**: Não autorizado
- **404**: Não encontrado
- **409**: Conflito (pagamento rejeitado)
- **500**: Erro interno do servidor

## Autenticação

A maioria das rotas requer autenticação através do header `authorization` contendo o ID do usuário. Este ID é obtido após o login bem-sucedido na rota `GET /appuser`.

## Upload de Arquivos

Rotas que envolvem upload de arquivos (`/appuserinf`, `/chatimagem`, `/chatvideo`) utilizam `multipart/form-data` como Content-Type.

## Tratamento de Erros

Todos os erros seguem o padrão:
```json
{
  "error": true,
  "message": "Descrição do erro"
}
```

Ou mensagens simples em português para casos específicos.

---

**Última atualização**: 28 de novembro de 2025
**Versão da API**: 1.0
**Contato**: equipe@passbem.com