import repo from "../repository/CursoRepository.js"; 

export const listar = async (req, res) => { 
    const cursos = await repo.listar();
    res.json(cursos);
};

export const buscarPorId = async (req, res) => {
    const curso = await repo.buscarPorId(req.params.id); 
    res.json(curso); 
};

export const criar = async (req, res) => {
    const novo = await repo.criar(req.body); 
    res.status(201).json(novo); 
};

export const atualizar = async (req, res) => {
    const atualizado = await repo.atualizar(req.params.id, req.body);
    res.json(atualizado);
};

export const deletar = async (req, res) => {
    await repo.deletar(req.params.id); 
    res.json({ mensagem: "Deletado com sucesso" });
};