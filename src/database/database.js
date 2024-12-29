import fs from "node:fs/promises"

// Utiliza a classe URL para criar um objeto de URL que aponta para um arquivo chamado db.json,
// para ter maior facilidade ao encontrar o arquivo onde deverá ler/escrever dados.
const DATABASE_PATH = new URL("db.json", import.meta.url)

export class Database {
    #database = {}

    constructor() {
        // Tenta encontrar um arquivo no endereço (param 1) e no formato (param 2)
        fs.readFile(DATABASE_PATH, "utf8")

        // Se conseguir, signifca que o db já existe.
        // Neste caso os dados do DB serão convertidos de texto para JSON
        // e adicionados a memória, de forma a atualizar os dados em memória
        // usando os dados do DB como referência
        .then( (data) => {
            this.#database = JSON.parse(data)
        })
        // Se não conseguir, cria o DB passando para o arquivo os dados em memória (nada)
        .catch(
            this.#persist()
        )

    }


    // Método responsável por escrever no arquivo do DB os dados em memória
    #persist() {
        // Endereço do DB (param 1),
        // como conteúdo inicial recebe os dados em memória convertidos em string (param 2)
        fs.writeFile(DATABASE_PATH, JSON.stringify(this.#database))

    }

    // Função para inserir dados nas tabelas
    insert(table, data) {
        // Verifica se a tabela existe na coleção
        if (Array.isArray(this.#database[table])) {
            // Se existe adiciona os dados
            this.#database[table].push(data)

        } else {
            // Se não existe:
            //  significa que este é o primeiro registro de uma nova tabela,
            //  então use o operador de atribuição e passe os dados (objeto)
            //  como parte de um array
            this.#database[table] = [data]

        }

        this.#persist()

    }

}