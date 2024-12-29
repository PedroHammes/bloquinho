import { routes } from "../routes/index.js"
import { Database } from "../database/database.js"

// Cria uma instância do banco de dados
// Esta instância será passada para o controller que for chamado.
// A criação da instância fica fora do midlleware para que todas as rotas
//  tenham acesso à mesma instância do DB.
const database = new Database()

export function routeHandler({ request, response }) {
    
    // Verifica se alguma rota da aplicação tem uma combinação method + path
    //  igual à combinação method + url da request
    const route = routes.find( (route) => {
        return route.method === request.method && route.path === request.url
    })
    
    // Se a rota solicitada na request existe na aplicação,
    //  execute a função desta rota
    if (route) {
        return route.controller({ request, response, database })
    }

    // Se a rota solicitada na request não existe na aplicação,
    //  retorne uma mensagem de rota não encontrada (404)
    return response.writeHead(404).end()

}