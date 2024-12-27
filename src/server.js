import http from "node:http"

import { jsonHandler } from "./middlewares/jsonHandler.js"
import { routeHandler } from "./middlewares/routeHandler.js"

// A função espera receber uma requisição
async function listener(request, response) {
    // A requisição será interceptada pelos middlewares
    //  depois de passar por eles algum controller será (ou não) executado

    // Este middleware trata o body da request, para podermos identificar
    //  com quais informações o usuário deseja trabalhar
    await jsonHandler({ request, response })

    // Este middleware identifica a rota que o usuário deseja acessar
    //  (informação obtida do body)
    routeHandler({ request, response })
}

// O servidor fica aguardando requisições na porta 3335.
// Quando uma requisição chega a função <listener> é chamada,
//  recebendo a requisição como parâmetro. 
http.createServer(listener).listen(3335)