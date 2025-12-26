const app = require('./index');

// Iniciar servidor (Coolify, produção e desenvolvimento)
const port = process.env.PORT || 3333;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

// Exportar para uso em outros contextos
module.exports = app;