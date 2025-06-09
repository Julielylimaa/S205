// Produtos padrão da loja
const produtosPadrao = [
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

function carregarCompras() {
  const compras = JSON.parse(localStorage.getItem("comprasRealizadas")) || [];
  const anuncios = JSON.parse(localStorage.getItem("anuncios")) || [];

  const listaCompras = document.getElementById("compras-lista");
  const comprasVazio = document.getElementById("compras-vazio");

  if (compras.length === 0) {
    comprasVazio.style.display = "block";
    listaCompras.style.display = "none";
    return;
  }

  comprasVazio.style.display = "none";
  listaCompras.style.display = "block";
  listaCompras.innerHTML = "";

  compras.sort((a, b) => new Date(b.dataCompra) - new Date(a.dataCompra));

  compras.forEach((compra) => {
    let produto = null;

    // Procurar o produto nos anúncios criados
    produto = anuncios.find((p) => p.id == compra.produtoId);

    // Se não encontrou, procurar nos produtos padrão
    if (!produto) {
      produto = produtosPadrao.find((p) => p.id == compra.produtoId);
    }

    if (produto) {
      const compraDiv = criarCardCompra(compra, produto);
      listaCompras.appendChild(compraDiv);
    }
  });
}

function criarCardCompra(compra, produto) {
  const div = document.createElement("div");
  div.className = "compra-card";

  const dataFormatada = formatarData(compra.dataCompra);
  const statusClass = getStatusClass(compra.status);

  div.innerHTML = `
        <div class="compra-info">
            <img src="${produto.imagem}" alt="${
    produto.nome
  }" class="compra-imagem">
            <div class="compra-detalhes">
                <h3 class="compra-nome">${produto.nome}</h3>
                <p class="compra-descricao">${produto.descricao}</p>
                <div class="compra-meta">
                    <span class="compra-preco">R$ ${produto.preco}</span>
                    <span class="compra-data">Comprado em: ${dataFormatada}</span>
                </div>
                <div class="compra-detalhes-pagamento">
                    <span class="compra-metodo">Método: ${formatarMetodoPagamento(
                      compra.metodoPagamento
                    )}</span>
                    ${
                      compra.metodoPagamento === "cartao" && compra.parcelas
                        ? `<span class="compra-parcelas">${
                            compra.parcelas
                          }x de R$ ${produto.preco / compra.parcelas}</span>`
                        : ""
                    }
                </div>
            </div>
        </div>
        <div class="compra-status">
            <span class="status ${statusClass}">${compra.status}</span>
        </div>
    `;

  return div;
}

function formatarMetodoPagamento(metodo) {
  switch (metodo) {
    case "cartao":
      return "Cartão de Crédito";
    case "pix":
      return "PIX";
    case "boleto":
      return "Boleto Bancário";
    default:
      return metodo;
  }
}

function formatarData(dataString) {
  const data = new Date(dataString);
  const opcoes = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Sao_Paulo",
  };
  return data.toLocaleDateString("pt-BR", opcoes);
}

function getStatusClass(status) {
  switch (status.toLowerCase()) {
    case "processando":
      return "status-processando";
    case "confirmado":
      return "status-confirmado";
    case "enviado":
      return "status-enviado";
    case "entregue":
      return "status-entregue";
    case "cancelado":
      return "status-cancelado";
    default:
      return "status-processando";
  }
}

// Carregar compras quando a página carregar
document.addEventListener("DOMContentLoaded", carregarCompras);
