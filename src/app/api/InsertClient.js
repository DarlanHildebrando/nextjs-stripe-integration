import pool from "../lib/db";

export async function POST(req) {

    try{

        const client = await req.json();
        const {nome, idade} = client;

        await pool.query(

            'INSERT INTO client (nome, idade) VALUES ($1, $2)',
            [nome, idade]

        );

        return new Response('Usuário criado!', {status: 201});


    }catch{
        
        console.error('erro no insert', error);
        return new Response('deu b.o!!!!!!', {status: 500})


    }
    
}