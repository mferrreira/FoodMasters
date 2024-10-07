const { jwtSecret, tokenExpiration } = require("../../config");
const prisma = require("../services/prismaClient");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class LoginController {

    static async login(req, res) {
        try {

            const { email, senha } = req.body;

            console.log(email, senha)

            if (!email || !senha) 
                return res.status(400).json({ error: "Email e senha são obrigatórios" });

            const usuario = await prisma.usuario.findUnique({ where: { email: email } });
            if (!usuario) 
                return res.status(401).json({error: "Credenciais inválidas"});

            const isPasswordValid = await bcrypt.compare(senha, usuario.senha)
            if (!isPasswordValid) 
                return res.status(401).json({ error: "Credenciais inválidas"});

            const token = jwt.sign({   
                user: usuario
            }, 
                jwtSecret, 
                { expiresIn: tokenExpiration }
            );
            
            return res.status(200).json({
                token,
                user: usuario
            });

    } catch (error) {
        console.error("Erro ao fazer login:", error);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
  }

  static authenticateToken(req, res, next) {

      
    const token = req.header('Authorization')?.split(' ')[1];
    
    if (!token) return res.status(403).json({error: 'Acesso Negado!'});

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) return res.status(403).json({error: "Token inválido ou expirado"});

        req.user = decoded;
        next();
    });
  }
}

module.exports = LoginController;