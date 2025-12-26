const app = require('./index');

// Iniciar servidor (Coolify, produção e desenvolvimento)
const port = process.env.PORT || 3334;

const server = app.listen(port, '0.0.0.0', () => {
    console.log(`✅ Servidor rodando na porta ${port}`);
    console.log(`🌐 Ambiente: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📊 Health check disponível em: http://localhost:${port}/health`);
});

// Tratamento de erros do servidor
server.on('error', (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    switch (error.code) {
        case 'EACCES':
            console.error(`❌ Porta ${port} requer privilégios elevados`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`❌ Porta ${port} já está em uso`);
            process.exit(1);
            break;
        default:
            throw error;
    }
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('⚠️  SIGTERM recebido, encerrando graciosamente...');
    server.close(() => {
        console.log('✅ Servidor encerrado');
        process.exit(0);
    });
});

// Exportar para uso em outros contextos
module.exports = app;