const api = "http://localhost:3005/api/cursos";

const form = document.getElementById("formCurso");
const tabela = document.getElementById("tabela");
const msg = document.getElementById("mensagem");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const curso = {
        titulo: document.getElementById("titulo").value,
        descricao: document.getElementById("descricao").value,
        carga_horaria: document.getElementById("carga").value,
        preco: document.getElementById("preco").value
    };

    const id = document.getElementById("id").value;

    if (!curso.titulo || !curso.preco) {
        mostrarMsg("Título e preço são obrigatórios!", "danger");
        return;
    }

    try {
        if (id) {
            await fetch(`${api}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(curso)
            });
            mostrarMsg("Curso atualizado!", "success");
        } else {
            await fetch(api, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(curso)
            });
            mostrarMsg("Curso cadastrado!", "success");
        }

        form.reset();
        document.getElementById("id").value = "";
        listar();

    } catch {
        mostrarMsg("Erro ao salvar!", "danger");
    }
});

async function listar() {
    const res = await fetch(api);
    const dados = await res.json();

    tabela.innerHTML = "";

    dados.forEach(curso => {
        tabela.innerHTML += `
            <tr>
                <td>${curso.titulo}</td>
                <td>${curso.descricao || "-"}</td>
                <td>${curso.carga_horaria || "-"}</td>
                <td>R$ ${curso.preco}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick='editar(${JSON.stringify(curso)})'>Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="deletar(${curso.id})">Excluir</button>
                </td>
            </tr>
        `;
    });
}

function editar(curso) {
    document.getElementById("id").value = curso.id;
    document.getElementById("titulo").value = curso.titulo || "";
    document.getElementById("descricao").value = curso.descricao || "";
    document.getElementById("carga").value = curso.carga_horaria || "";
    document.getElementById("preco").value = curso.preco || "";
}

async function deletar(id) {
    await fetch(`${api}/${id}`, { method: "DELETE" });
    mostrarMsg("Curso excluído!", "warning");
    listar();
}

function mostrarMsg(texto, tipo) {
    msg.innerHTML = `<div class="alert alert-${tipo}">${texto}</div>`;
    setTimeout(() => msg.innerHTML = "", 3000);
}

listar();