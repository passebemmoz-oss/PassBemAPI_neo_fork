# 🚀 Configuração do Coolify - GUIA RÁPIDO

## ⚠️ PROBLEMA IDENTIFICADO

O Coolify está usando **Nixpacks** em vez do **Dockerfile.coolify** otimizado. 

## ✅ SOLUÇÃO

### Opção 1: Forçar Uso do Docker (RECOMENDADO)

No painel do Coolify, faça estas alterações:

#### 1. General Settings
- **Build Pack**: Mude de `Nixpacks` para `dockerfile` ou `docker`

#### 2. Build Configuration  
- **Base Directory**: `/` (deixe vazio ou raiz)
- **Dockerfile Path**: `Dockerfile.coolify`
- **Docker Compose Path**: `docker-compose.yaml` (se usar compose)

#### 3. Custom Docker Options
Substitua todo o conteúdo por:
```
--add-host host.docker.internal:host-gateway --health-cmd='curl -f http://localhost:3333/health || exit 1' --health-interval=30s --health-timeout=10s --health-retries=5 --health-start-period=60s
```

#### 4. Environment Variables
Certifique-se que estas variáveis estão configuradas:
```
NODE_ENV=production
PORT=3333
MONGODB_URL=<sua-connection-string>
FRONTEND_URL=<url-do-frontend>
```

### Opção 2: Usar Docker Compose (ALTERNATIVA)

No painel do Coolify:

1. **General Settings**
   - Build Pack: `docker-compose`
   
2. **Docker Compose Path**: 
   ```
   docker-compose.yaml
   ```

3. Clique em **Save** e depois **Redeploy**

## 📝 Arquivos Criados/Atualizados

1. ✅ `.nixpacks.toml` - Desabilita Nixpacks
2. ✅ `docker-compose.yaml` - Compose otimizado para Coolify
3. ✅ `package.json` - Scripts atualizados
4. ✅ `Dockerfile.coolify` - Já estava otimizado
5. ✅ `server.js` - Já estava otimizado

## 🔧 Passos no Coolify

### MÉTODO RÁPIDO (Via Interface):

1. **Acesse seu projeto no Coolify**
   ```
   https://server.manna.software/project/x48o8so40w4gcsgcc00osck0/
   ```

2. **Vá para a aplicação**
   ```
   euler--j-s/-/pass-bem-a-p-i_neo:main
   ```

3. **Clique em "Configuration"**

4. **Na seção "General":**
   - Mude **"Build Pack"** de `Nixpacks` para `dockerfile`

5. **Salve e clique em "Redeploy"**

## ✅ Como Verificar se Funcionou

### 1. Logs do Deploy
Procure por estas linhas nos logs:
```
✅ Servidor rodando na porta 3333
🌐 Ambiente: production
📊 Health check disponível em: http://localhost:3333/health
```

### 2. Status do Container
O status deve mudar de "unknown" para "healthy" após ~60 segundos

### 3. Teste a API
```bash
# Health check
curl https://mowosocw4sgwsk84kw4ks40c.62.171.183.132.sslip.io/health

# Resposta esperada:
{
  "status": "OK",
  "mongodb": "connected",
  "uptime": 123.456,
  "environment": "production"
}
```

## 🐛 Se Ainda Não Funcionar

### Verifique os Logs do Container

No Coolify:
1. Vá para **"Logs"**
2. Procure por erros como:
   - `ECONNREFUSED` - MongoDB não acessível
   - `EADDRINUSE` - Porta já em uso
   - `MongoNetworkError` - Firewall bloqueando MongoDB

### Comandos de Debug

Se tiver acesso SSH ao servidor:

```bash
# Ver containers rodando
docker ps | grep mowosocw

# Ver logs em tempo real
docker logs -f mowosocw4sgwsk84kw4ks40c-095427412093

# Testar health check dentro do container
docker exec mowosocw4sgwsk84kw4ks40c-095427412093 curl -f http://localhost:3333/health

# Verificar variáveis de ambiente
docker exec mowosocw4sgwsk84kw4ks40c-095427412093 env | grep -E "MONGODB|PORT|NODE_ENV"
```

## 📊 Checklist Final

- [ ] Build Pack mudado de Nixpacks para Dockerfile
- [ ] Dockerfile.coolify especificado
- [ ] Custom Docker Options com healthcheck configurado
- [ ] Variáveis de ambiente (MONGODB_URL, etc) configuradas
- [ ] Deploy realizado com sucesso
- [ ] Container status "healthy" (após 60s)
- [ ] API responde em `/health`
- [ ] Sem erros nos logs

## 🎯 Resultado Esperado

Após seguir estes passos:

✅ Container inicia em ~10-15 segundos  
✅ Health check passa após 60 segundos  
✅ Status muda de "unknown" para "healthy"  
✅ API responde normalmente  
✅ WebSocket funcionando  
✅ MongoDB conectado  

## 💡 Dica Extra

Se quiser usar o init.sh para criar o super admin automaticamente:

1. Após o primeiro deploy bem-sucedido
2. Execute manualmente:
```bash
docker exec mowosocw4sgwsk84kw4ks40c-095427412093 bash /app/init.sh
```

Ou adicione em **"Post-deployment"** no Coolify:
```
/app/init.sh &
```
