// <Buffer> é uma classe global do Node.js que permite manipulação de dados binários
// import { Buffer } from "node:buffer"

export async function jsonHandler({ request, response }) {
    const buffers = []

    // Adiciona cada pedacinho da request dentro de buffers
    for await (const chunk of request) {
        buffers.push(chunk)

    }

    // JSON.parse transforma os dados JSON em objeto
    //  de forma que os dados da request são armazenados na propriedade body
    //  como um objeto, o que permite acessar as propriedades da request com
    //  a notação de ponto (request.body.username).
    // A propriedade body é criada neste middleware porque cada nova request
    //  será submetida a este middleware antes de ser tratada para
    //  que os controllers possam trabalhar com as informações fornecidas no body
    //  quando necessário
    try {
        // <Buffer.concat> concatena os pedaços da request
        // Os pedaços concatenados são convertidos em string
        // E esta string em um objeto
        request.body = JSON.parse(Buffer.concat(buffers).toString())

    } catch (error) {
        // Se não existirem dados na requisição body fica vazio
        request.body = null

    }

    response.setHeader("Content-Type", "application/json")
}