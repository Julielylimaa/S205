const anuncios = [
  {
    id: 1,
    nome: "Notebook Gamer Dell",
    status: "Aprovado",
    preco: "R$ 2.500,00",
    dataPublicacao: "05/06/2025",
  },
  {
    id: 2,
    nome: "Mouse Gamer RGB",
    status: "Aguardando",
    preco: "R$ 150,00",
    dataPublicacao: "06/06/2025",
  },
  {
    id: 3,
    nome: "Livro Código Limpo",
    status: "Vendido",
    preco: "R$ 45,00",
    dataPublicacao: "03/06/2025",
  },
  {
    id: 4,
    nome: "Mesa Digitalizadora Wacom",
    status: "Recusado",
    preco: "R$ 800,00",
    dataPublicacao: "04/06/2025",
  },
  {
    id: 5,
    nome: "Teclado Mecânico",
    status: "Aprovado",
    preco: "R$ 350,00",
    dataPublicacao: "02/06/2025",
  },
  {
    id: 6,
    nome: "Monitor 24 polegadas",
    status: "Aguardando",
    preco: "R$ 650,00",
    dataPublicacao: "07/06/2025",
  },
  {
    id: 7,
    nome: "Headset Gamer",
    status: "Vendido",
    preco: "R$ 200,00",
    dataPublicacao: "01/06/2025",
  },
  {
    id: 8,
    nome: "Webcam HD",
    status: "Recusado",
    preco: "R$ 120,00",
    dataPublicacao: "08/06/2025",
  },
];

function getStatusColor(status) {
  switch (status) {
    case "Aguardando":
      return "#ff9500";
    case "Aprovado":
      return "#28a745";
    case "Recusado":
      return "#dc3545";
    case "Vendido":
      return "#6c757d";
    default:
      return "#007bff";
  }
}

function criarAnuncioHTML(anuncio) {
  const statusColor = getStatusColor(anuncio.status);

  return `
    <div class="anuncio-status" data-status="${anuncio.status.toLowerCase()}">
      <div class="anuncio-header">
        <h3>${anuncio.nome}</h3>
        <span class="anuncio-preco">${anuncio.preco}</span>
      </div>
      <div class="anuncio-info">
        <p class="anuncio-status-text" style="color: ${statusColor}; font-weight: 600;">
          Status: ${anuncio.status}
        </p>
        <p class="anuncio-data">Publicado em: ${anuncio.dataPublicacao}</p>
      </div>
    </div>
  `;
}

// Função para carregar anúncios do localStorage
function carregarAnunciosDoLocalStorage() {
  const anunciosSalvos = JSON.parse(localStorage.getItem("anuncios")) || [];
  return anunciosSalvos;
}

// Função para combinar anúncios padrão com os salvos
function obterTodosAnuncios() {
  const anunciosSalvos = carregarAnunciosDoLocalStorage();
  return [...anuncios, ...anunciosSalvos];
}

// Função para renderizar todos os anúncios
function renderizarAnuncios() {
  const container = document.querySelector(".meus-anuncios");

  if (!container) {
    console.error("Container .meus-anuncios não encontrado");
    return;
  }

  container.innerHTML = "";

  const todosAnuncios = obterTodosAnuncios();

  // Ordena por data de publicação (mais recentes primeiro)
  todosAnuncios.sort((a, b) => {
    const dataA = new Date(a.dataPublicacao.split("/").reverse().join("-"));
    const dataB = new Date(b.dataPublicacao.split("/").reverse().join("-"));
    return dataB - dataA;
  });

  todosAnuncios.forEach((anuncio) => {
    container.innerHTML += criarAnuncioHTML(anuncio);
  });
}

function adicionarEstilosStatus() {
  const style = document.createElement("style");
  style.textContent = `
    .anuncio-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 12px;
    }
    
    .anuncio-preco {
      font-size: 16px;
      font-weight: 700;
      color: var(--color-primary);
    }
    
    .anuncio-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    
    .anuncio-status-text {
      font-size: 14px;
      margin: 0;
    }
    
    .anuncio-data {
      font-size: 12px;
      color: var(--color-text-secondary, #666);
      margin: 0;
    }
    
    .anuncio-status[data-status="aguardando"] {
      border-left: 4px solid #ff9500;
    }
    
    .anuncio-status[data-status="aprovado"] {
      border-left: 4px solid #28a745;
    }
    
    .anuncio-status[data-status="recusado"] {
      border-left: 4px solid #dc3545;
    }
    
    .anuncio-status[data-status="vendido"] {
      border-left: 4px solid #6c757d;
      opacity: 0.8;
    }
  `;

  document.head.appendChild(style);
}

document.addEventListener("DOMContentLoaded", function () {
  adicionarEstilosStatus();
  renderizarAnuncios();
});
