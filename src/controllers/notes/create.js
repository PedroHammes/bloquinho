import { randomUUID } from "node:crypto"

export function create({ request, response, database }) {
    // Capturamos as informações relevantes da requisição
    const { title, content, user_name } = request.body

    const annotation = {
        id: randomUUID(),
        title,
        content,
        user_name,
        created_at: new Date(),
        updated_at: new Date()
        
    }

    database.insert("notes", annotation)

    return response.writeHead(201).end(JSON.stringify(annotation))

}