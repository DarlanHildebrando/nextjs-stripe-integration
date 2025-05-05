import { authenticateToken } from "./jwt";

export async function authMiddleware(req) {

    const authHeader = req.headers.get('authorization')

    if(!authHeader || !authHeader.startsWith("Bearer ")){

        return new Response("Token não fornecido", {status: 401})

    };

    const token = authHeader.split(" ")[1];
    const userData = authenticateToken(token);

    if(!userData) return new Response("Token inválido ou expirado", {status: 403})

      req.user = userData;  

      return null;
    
}