// Todas as rotas referentes as operações de notas em um único lugar
//  para uma melhor organização da aplicação.

import { create } from "../controllers/notes/create.js";

export const notes = [
    {
        method: "POST",
        path: "/notes",
        controller: create,
    },
]