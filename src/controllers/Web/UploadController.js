module.exports = {
    // Upload de um único arquivo
    single: async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({
                    message: "Nenhum arquivo foi enviado",
                    type: "Error"
                });
            }

            const fileUrl = `${req.protocol}://${req.get('host')}/files/${req.file.filename}`;
            
            console.log('✅ Upload single concluído:');
            console.log('   Arquivo:', req.file.filename);
            console.log('   Path:', req.file.path);
            console.log('   URL:', fileUrl);

            return res.status(200).json({
                message: "Arquivo enviado com sucesso",
                type: "Success",
                file: {
                    filename: req.file.filename,
                    originalname: req.file.originalname,
                    size: req.file.size,
                    mimetype: req.file.mimetype,
                    url: fileUrl
                }
            });
        } catch (error) {
            console.error("❌ Erro no upload single:", error);
            return res.status(500).json({
                message: "Erro ao fazer upload do arquivo",
                type: "Error",
                error: error.message
            });
        }
    },

    // Upload de múltiplos arquivos
    multiple: async (req, res) => {
        try {
            console.log('=== DEBUG UPLOAD MULTIPLE ===');
            
            if (req.files && req.files.length > 0) {
                console.log('✅ Arquivos recebidos:', req.files.length);
                console.log('   Primeiro arquivo:');
                console.log('     - Path:', req.files[0].path);
                console.log('     - Filename:', req.files[0].filename);
                console.log('     - Destination:', req.files[0].destination);
                
                // Verificar se o arquivo existe
                const fs = require('fs');
                const exists = fs.existsSync(req.files[0].path);
                console.log('     - Arquivo existe no disco?', exists);
            }
            
            if (!req.files || req.files.length === 0) {
                return res.status(400).json({
                    message: "Nenhum arquivo foi enviado",
                    type: "Error"
                });
            }

            const filesInfo = req.files.map((file) => {
                const url = `${req.protocol}://${req.get('host')}/files/${file.filename}`;
                console.log('   📷 URL gerada:', url);
                return {
                    filename: file.filename,
                    originalname: file.originalname,
                    size: file.size,
                    mimetype: file.mimetype,
                    url: url
                };
            });

            console.log('✅ Upload múltiplo concluído:', filesInfo.length, 'arquivos');

            return res.status(200).json({
                message: "Arquivos enviados com sucesso",
                type: "Success",
                count: req.files.length,
                files: filesInfo
            });
        } catch (error) {
            console.error("❌ Erro no upload multiple:", error);
            return res.status(500).json({
                message: "Erro ao fazer upload dos arquivos",
                type: "Error",
                error: error.message
            });
        }
    }
};
