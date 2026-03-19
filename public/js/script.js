document.addEventListener("DOMContentLoaded", function () {
    const preco = parseFloat(document.getElementById("preco").textContent);
    const quantidade = document.getElementById("quantidade");
    const total = document.getElementById("total");

    quantidade.addEventListener("input", function () {
        const valorTotal = preco * quantidade.value;
        total.textContent = valorTotal.toFixed(2);
    });
});