import { randomUUID } from "node:crypto"

export function create({ request, response }) {
    // Capturamos as informações relevantes da requisição
    const { title, description, user_name } = request.body

    const annotation = {
        id: randomUUID(),
        title,
        description,
        user_name,
        created_at: new Date(),
        updated_at: new Date()
        
    }

    return response.end("Criado com sucesso!")

}