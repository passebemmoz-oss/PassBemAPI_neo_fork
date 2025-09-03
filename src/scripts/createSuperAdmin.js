const mongoose = require('mongoose');
const { acess } = require('../database/Mongo');

// Importar todos os modelos
const Admin = require('../models/Admin');
const Escolas = require('../models/Escolas');
const Professor = require('../models/Professor');
const Temas = require('../models/Temas');
const Modulo = require('../models/Modulo');
const Material = require('../models/Material');

async function createSuperAdmin() {
    try {
        console.log('🔌 Conectando ao MongoDB...');
        await mongoose.connect(acess, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            retryWrites: true
        });

        console.log('✅ Conectado ao MongoDB com sucesso!');

        // Dados do Super Admin
        const superAdminData = {
            email: 'superadmin@passbem.com',
            senha: 'SuperAdmin@2025!',
            admin: true
        };

        // Verificar se já existe
        const existingAdmin = await Admin.findOne({ email: superAdminData.email });

        if (existingAdmin) {
            console.log('⚠️  Super Admin já existe!');
            console.log('📧 Email:', existingAdmin.email);
            console.log('🆔 ID:', existingAdmin._id);
            return existingAdmin;
        }

        // Criar Super Admin
        console.log('👤 Criando Super Admin...');
        const superAdmin = await Admin.create(superAdminData);

        console.log('🎉 Super Admin criado com sucesso!');
        console.log('📧 Email:', superAdmin.email);
        console.log('🔑 Senha:', superAdminData.senha);
        console.log('🆔 ID:', superAdmin._id);
        console.log('👑 Admin:', superAdmin.admin);

        // Criar dados de exemplo se necessário
        await createSampleData(superAdmin._id);

        return superAdmin;

    } catch (error) {
        console.error('❌ Erro ao criar Super Admin:', error);
        throw error;
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Desconectado do MongoDB');
    }
}

async function createSampleData(adminId) {
    try {
        console.log('\n📚 Verificando dados de exemplo...');

        // Verificar e criar escola exemplo
        let escola = await Escolas.findOne({ nome: 'Escola PassBem Admin' });
        if (!escola) {
            escola = await Escolas.create({
                nome: 'Escola PassBem Admin',
                endereco: 'Maputo, Moçambique',
                telefone: '+258 84 000 0000',
                email: 'admin@passbem.com',
                user: adminId
            });
            console.log('🏫 Escola exemplo criada');
        }

        // Verificar e criar professor exemplo
        let professor = await Professor.findOne({ nome: 'Professor Admin' });
        if (!professor) {
            professor = await Professor.create({
                nome: 'Professor Admin',
                email: 'professor@passbem.com',
                telefone: '+258 84 000 0001',
                disciplina: 'Administração do Sistema',
                escola: escola._id,
                user: adminId
            });
            console.log('👨‍🏫 Professor exemplo criado');
        }

        // Verificar e criar temas exemplo
        const temasExemplo = [
            { nome: 'Matemática Básica', descricao: 'Conceitos fundamentais de matemática' },
            { nome: 'Português', descricao: 'Língua portuguesa e literatura' },
            { nome: 'História de Moçambique', descricao: 'História e cultura moçambicana' },
            { nome: 'Ciências Naturais', descricao: 'Biologia, física e química básica' }
        ];

        for (const temaData of temasExemplo) {
            const temaExistente = await Temas.findOne({ nome: temaData.nome });
            if (!temaExistente) {
                await Temas.create({
                    ...temaData,
                    user: adminId,
                    numero: 0
                });
                console.log(`📖 Tema "${temaData.nome}" criado`);
            }
        }

        // Verificar e criar módulos exemplo
        const modulosExemplo = [
            { nome: 'Módulo 1 - Introdução', descricao: 'Módulo introdutório do sistema' },
            { nome: 'Módulo 2 - Básico', descricao: 'Conceitos básicos' },
            { nome: 'Módulo 3 - Intermediário', descricao: 'Nível intermediário' },
            { nome: 'Módulo 4 - Avançado', descricao: 'Nível avançado' }
        ];

        for (const moduloData of modulosExemplo) {
            const moduloExistente = await Modulo.findOne({ nome: moduloData.nome });
            if (!moduloExistente) {
                await Modulo.create({
                    ...moduloData,
                    user: adminId
                });
                console.log(`📚 Módulo "${moduloData.nome}" criado`);
            }
        }

        console.log('✅ Dados de exemplo verificados/criados!');

    } catch (error) {
        console.error('❌ Erro ao criar dados de exemplo:', error);
    }
}

// Função para mostrar permissões do admin
async function showAdminPermissions() {
    console.log('\n🔐 PERMISSÕES DO SUPER ADMIN:');
    console.log('═══════════════════════════════════════');
    console.log('✅ Acesso completo ao Dashboard');
    console.log('✅ Gerenciar Usuários e Administradores');
    console.log('✅ Gerenciar Escolas');
    console.log('✅ Gerenciar Professores');
    console.log('✅ Gerenciar Temas e Conteúdo');
    console.log('✅ Gerenciar Módulos');
    console.log('✅ Gerenciar Material Didático');
    console.log('✅ Gerenciar Questões e Provas');
    console.log('✅ Gerenciar Vídeos Aula');
    console.log('✅ Gerenciar Anúncios');
    console.log('✅ Visualizar Relatórios e Estatísticas');
    console.log('✅ Gerenciar Pagamentos e Créditos');
    console.log('✅ Gerenciar Chat e Comunicação');
    console.log('✅ Enviar Notificações Push');
    console.log('✅ Gerenciar Formulários');
    console.log('✅ Acesso a todas as APIs');
    console.log('═══════════════════════════════════════');
}

// Executar o script
async function main() {
    console.log('🚀 CRIANDO SUPER ADMINISTRADOR PASSBEM');
    console.log('════════════════════════════════════════');
    
    try {
        const superAdmin = await createSuperAdmin();
        await showAdminPermissions();
        
        console.log('\n🎯 INFORMAÇÕES DE LOGIN:');
        console.log('════════════════════════════');
        console.log('📧 Email: superadmin@passbem.com');
        console.log('🔑 Senha: SuperAdmin@2025!');
        console.log('🆔 ID:', superAdmin._id);
        console.log('════════════════════════════');
        
        console.log('\n📝 COMO USAR:');
        console.log('1. Faça login via API: GET /usersdata');
        console.log('2. Use o ID retornado como Authorization header');
        console.log('3. Acesse o dashboard: GET /dasboard');
        console.log('4. Use o dashboard HTML que foi criado anteriormente');
        
        console.log('\n✨ Super Admin criado com sucesso!');
        
    } catch (error) {
        console.error('💥 Falha ao criar Super Admin:', error.message);
        process.exit(1);
    }
}

// Executar apenas se chamado diretamente
if (require.main === module) {
    main();
}

module.exports = { createSuperAdmin, showAdminPermissions };
