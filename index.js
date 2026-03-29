import express from "express";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";
import cursoRoutes from "./routes/cursoRoutes.js";

const app = express();
const porta = 3005;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
    secret: "curso-online",
    resave: false,
    saveUninitialized: false
}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const USER = {
    username: "admin",
    password: "1234"
};

const cursos = [
    {
        id: 1,
        nome: "Desenvolvimento Web",
        inicio: "10/03/2026",
        duracao: "3 meses",
        preco: 600,
        descricao: "Curso completo de HTML, CSS, JavaScript e NodeJS.",
        carga: "60h",
        instrutor: "Carlos Silva",
        nivel: "Intermediário",
        vagas: 20
    },
    {
        id: 2,
        nome: "Banco de Dados",
        inicio: "15/04/2026",
        duracao: "2 meses",
        preco: 500,
        descricao: "Modelagem de dados e SQL do básico ao avançado.",
        carga: "40h",
        instrutor: "Ana Souza",
        nivel: "Iniciante",
        vagas: 15
    }
];

function auth(req, res, next) {
    if (req.session.logged) {
        next();
    } else {
        res.redirect("/login");
    }
}

app.get("/", (req, res) => {
    res.render("home", {
        cursos,
        session: req.session
    });
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username === USER.username && password === USER.password) {
        req.session.logged = true;
        res.redirect("/");
    } else {
        res.send("Usuário ou senha inválidos.");
    }
});

app.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
});

app.get("/detalhes/:id", auth, (req, res) => {
    const curso = cursos.find(c => c.id == req.params.id);

    if (!curso) {
        return res.send("Curso não encontrado.");
    }

    res.render("detalhes", { curso });
});

app.use("/api/cursos", cursoRoutes);

app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
});