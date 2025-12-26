#!/bin/bash

# Script de inicialização para Coolify
# Este script NÃO deve travar a inicialização do servidor
# Pode ser executado DEPOIS do servidor estar rodando

echo "🚀 Iniciando PassBem API..."

# Aguardar o servidor Node estar pronto
echo "⏳ Aguardando servidor Node.js..."
for i in {1..30}; do
  if curl -f http://localhost:3333/health 2>/dev/null; then
    echo "✅ Servidor está respondendo!"
    break
  fi
  echo "   Tentativa $i/30..."
  sleep 2
done

# Verificar se o Super Admin já existe (em background)
echo "👤 Verificando Super Admin em background..."
(
  sleep 5
  node -e "
  const mongoose = require('mongoose');
  const { acess } = require('./src/database/Mongo');
  
  mongoose.connect(acess, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(async () => {
    const Admin = require('./src/models/Admin');
    const adminExists = await Admin.findOne({ email: 'superadmin@passbem.com' });
    if (!adminExists) {
      console.log('🎉 Criando Super Admin...');
      require('./src/scripts/createSuperAdmin');
    } else {
      console.log('✅ Super Admin já existe');
    }
    process.exit(0);
  }).catch(err => {
    console.error('⚠️  Erro ao verificar/criar Super Admin:', err.message);
    process.exit(0);
  });
  "
) &

echo "✅ PassBem API configuração completa!"
echo "🌐 API disponível em: http://localhost:3333"
echo "📊 Health check: http://localhost:3333/health"