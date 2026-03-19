import mysql from "mysql2/promise";

const conexao = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "cursosdb",
    port: 3306
});

export default conexao;