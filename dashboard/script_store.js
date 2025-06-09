let produtos = [
  {
    id: 1,
    nome: "Livro Código limpo - seminovo",
    descricao: "Descrição breve do Produto 1.",
    imagem: "images/livro-codigo-limpo.jpg",
    preco: 45.0,
    estado: "seminovo",
    status: "aprovado",
  },
  {
    id: 2,
    nome: "Notebook usado",
    descricao: "Notebook Lenovo, 2 anos de uso",
    imagem: "images/notebook.png",
    preco: 1500.0,
    estado: "usado",
    status: "aprovado",
  },
  {
    id: 3,
    nome: "Produto 3",
    descricao: "Descrição breve do Produto 3.",
    imagem: "images/mesa-digitalizadora.webp",
    preco: 200.0,
    estado: "novo",
    status: "aprovado",
  },
  {
    id: 4,
    nome: "Mouse gamer",
    descricao: "Mouse Logitech gamer, 2 semanas de uso.",
    imagem: "images/mouse.jpg",
    preco: 80.0,
    estado: "seminovo",
    status: "aprovado",
  },
  {
    id: 5,
    nome: "Produto 5",
    descricao: "Descrição breve do Produto 5.",
    imagem: "images/product5.jpg",
    preco: 60.0,
    estado: "novo",
    status: "aprovado",
  },
];

function renderizarProdutos(produtos) {
  const container = document.getElementById("grid-produtos");
  container.innerHTML = "";

  const aprovados = produtos.filter((p) => p.status === "aprovado");

  aprovados.forEach((produto) => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <img class="item-image" src="${produto.imagem}" alt="Imagem de ${
      produto.nome
    }" />
      <h3 class="item-title">${produto.nome}</h3>
      <p class="item-description">${produto.descricao}</p>
      <p class="item-price">R$ ${produto.preco.toFixed(2)}</p>
      <button class="item-button" onclick="comprarProduto(${
        produto.id
      })">Comprar</button>
    `;

    container.appendChild(card);
  });
}
renderizarProdutos(produtos);

function comprarProduto(id) {
  window.location.href = `pagamento.html?produto=${id}`;
}
