# 🔧 Troubleshooting - Bad Gateway no Coolify

## Problema Resolvido: Bad Gateway (502)

### Causa Raiz Identificada

O erro **Bad Gateway** ocorria porque:

1. **init.sh estava travando a inicialização** - O script executava antes do servidor Node.js iniciar e fazia checagens que dependiam do servidor estar rodando
2. **CMD executava init.sh de forma bloqueante** - O servidor nunca chegava a iniciar
3. **Healthcheck falhava** - O Coolify marcava o container como unhealthy antes do servidor estar pronto
4. **Timeout muito curto** - `start_period` de 40s era insuficiente

### Correções Implementadas

#### 1. Dockerfile.coolify
- ✅ CMD agora executa `node server.js` diretamente
- ✅ Healthcheck com `start_period: 60s` e `retries: 5`
- ✅ Removida execução bloqueante do init.sh

#### 2. server.js
- ✅ Servidor escuta em `0.0.0.0` (não apenas localhost)
- ✅ Tratamento de erros de porta (EACCES, EADDRINUSE)
- ✅ Graceful shutdown com SIGTERM
- ✅ Logging melhorado

#### 3. init.sh
- ✅ Agora pode ser executado APÓS o servidor iniciar
- ✅ Operações em background (não-bloqueante)
- ✅ Aguarda servidor estar pronto antes de fazer checks
- ✅ Não falha se não conseguir criar admin

#### 4. docker-compose.coolify.yml
- ✅ `start_period: 60s` (antes era 40s)
- ✅ `retries: 5` (antes era 3)

## Como Fazer Deploy das Correções

### Opção 1: Deploy Automático (Git)

```bash
# Commit as mudanças
git add Dockerfile.coolify docker-compose.coolify.yml server.js init.sh
git commit -m "fix: resolve bad gateway issue in Coolify"
git push origin main

# No Coolify, clique em "Redeploy" na sua aplicação
```

### Opção 2: Deploy Manual via Coolify CLI

```bash
# Se tiver acesso SSH ao servidor
ssh seu-servidor

# Navegue até o diretório da aplicação
cd /path/to/passbem-api

# Rebuild e restart
docker-compose -f docker-compose.coolify.yml down
docker-compose -f docker-compose.coolify.yml up -d --build
```

### Opção 3: Rebuild no Painel Coolify

1. Acesse seu painel Coolify
2. Vá para a aplicação `passbem-api`
3. Clique em **"Force Rebuild"**
4. Aguarde o build completar
5. Verifique os logs em tempo real

## Verificando se Funcionou

### 1. Check dos Logs

No Coolify, veja os logs e procure por:

```
✅ Servidor rodando na porta 3333
🌐 Ambiente: production
📊 Health check disponível em: http://localhost:3333/health
```

### 2. Teste do Endpoint

```bash
# Teste direto do health check
curl https://seu-dominio.com/health

# Resposta esperada:
{
  "status": "OK",
  "timestamp": "2025-12-26T...",
  "uptime": 123.456,
  "version": "1.0.0",
  "environment": "production",
  "mongodb": "connected"
}
```

### 3. Teste da Rota Raiz

```bash
curl https://seu-dominio.com/

# Resposta esperada:
{
  "message": "PasseBem API funcionando!",
  "environment": "production",
  "timestamp": "2025-12-26T..."
}
```

### 4. Check do Container

Se tiver acesso SSH:

```bash
# Ver status do container
docker ps | grep passbem-api

# Ver logs em tempo real
docker logs -f passbem-api

# Executar health check manualmente
docker exec passbem-api curl -f http://localhost:3333/health
```

## Problemas Comuns e Soluções

### Container reiniciando constantemente

**Causa**: MongoDB não está acessível ou variáveis de ambiente incorretas

**Solução**:
```bash
# Verifique as variáveis de ambiente no Coolify
# Certifique-se que MONGODB_URL está correto
# Verifique se o IP do servidor está na whitelist do MongoDB Atlas
```

### Healthcheck falhando

**Causa**: Servidor demora mais de 60s para iniciar

**Solução**:
- Aumentar `start_period` no docker-compose.coolify.yml
- Verificar se há problemas de rede ou recursos

### WebSocket não funciona

**Causa**: Proxy do Coolify pode não estar configurado para WebSocket

**Solução**:
- Verificar configuração de proxy no Coolify
- Adicionar suporte a WebSocket upgrade headers

### Uploads não funcionam

**Causa**: Volumes não estão montados corretamente

**Solução**:
```bash
# Verificar volumes
docker volume ls | grep passbem

# Verificar permissões dentro do container
docker exec passbem-api ls -la /app/uploads
docker exec passbem-api ls -la /app/public/uploads
```

## Monitoramento Contínuo

### Alertas Recomendados

Configure alertas no Coolify para:
- Health check falhando por mais de 2 minutos
- Container reiniciando mais de 3x em 10 minutos
- Uso de CPU > 80% por mais de 5 minutos
- Uso de memória > 90%

### Logs Importantes

Fique atento a estas mensagens nos logs:

- ❌ `Erro ao conectar ao MongoDB` - Problema de conexão DB
- ❌ `Porta 3333 já está em uso` - Conflito de porta
- ❌ `EACCES` - Problema de permissões
- ⚠️ `SIGTERM recebido` - Container sendo encerrado
- ✅ `Servidor rodando` - Tudo OK

## Próximos Passos Recomendados

1. ✅ Monitorar logs por 24h após deploy
2. 📊 Configurar alertas no Coolify
3. 🔐 Configurar backups automáticos dos volumes
4. 🚀 Considerar usar Redis para cache (opcional)
5. 📈 Configurar monitoramento com Sentry ou similar

## Suporte

Se o problema persistir:
1. Exporte logs completos do container
2. Verifique variáveis de ambiente
3. Teste conexão MongoDB fora do container
4. Verifique recursos disponíveis no servidor (CPU, RAM, Disco)
