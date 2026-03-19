import conexao from "../database/conexao.js";

export default {
    async listar() {
        const [rows] = await conexao.query("SELECT * FROM cursos");
        return rows;
    },

    async buscarPorId(id) {
        const [rows] = await conexao.query(
            "SELECT * FROM cursos WHERE id = ?",
            [id]
        );
        return rows;
    },

    async criar(dados) {
        const sql = `
            INSERT INTO cursos (titulo, descricao, carga_horaria, preco)
            VALUES (?, ?, ?, ?)
        `;

        const valores = [
            dados.titulo,
            dados.descricao,
            dados.carga_horaria,
            dados.preco
        ];

        const [result] = await conexao.query(sql, valores);
        return result;
    },

    async atualizar(id, dados) {
        const sql = `
            UPDATE cursos
            SET titulo = ?, descricao = ?, carga_horaria = ?, preco = ?
            WHERE id = ?
        `;

        const valores = [
            dados.titulo,
            dados.descricao,
            dados.carga_horaria,
            dados.preco,
            id
        ];

        const [result] = await conexao.query(sql, valores);
        return result;
    },

    async deletar(id) {
        const sql = "DELETE FROM cursos WHERE id = ?";

        const [result] = await conexao.query(sql, [id]);
        return result;
    }
};