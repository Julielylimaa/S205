// Funções para formatação de campos
function formatarNumeroCartao(input) {
  let valor = input.value.replace(/\s/g, "").replace(/\D/g, "");
  let valorFormatado = valor.replace(/(\d{4})(?=\d)/g, "$1 ");
  input.value = valorFormatado;
}

function formatarValidadeCartao(input) {
  let valor = input.value.replace(/\D/g, "");
  if (valor.length >= 2) {
    valor = valor.substring(0, 2) + "/" + valor.substring(2, 4);
  }
  input.value = valor;
}

function apenasNumeros(input) {
  input.value = input.value.replace(/\D/g, "");
}

// Função para obter parâmetros da URL
function obterParametroURL(nome) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(nome);
}

// Função para formatar preço
function formatarPreco(preco) {
  return `R$ ${preco.toFixed(2).replace(".", ",")}`;
}

// Função para formatar data
function formatarData(data) {
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

// Função para carregar produto
function carregarProduto() {
  const produtoId = obterParametroURL("produto");

  if (!produtoId) {
    alert("Produto não encontrado!");
    window.location.href = "store.html";
    return;
  }

  // Carregar produtos da store
  const produtos = [
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

  const produto = produtos.find((p) => p.id == produtoId);

  if (!produto) {
    alert("Produto não encontrado!");
    window.location.href = "store.html";
    return;
  }

  // Salvar produto no sessionStorage para usar na finalização
  sessionStorage.setItem("produtoCompra", JSON.stringify(produto));

  // Renderizar resumo do produto
  const container = document.getElementById("product-summary");
  container.innerHTML = `
    <div class="product-card-payment">
      <img src="${produto.imagem}" alt="${produto.nome}" class="product-image">
      <div class="product-info">
        <h3>${produto.nome}</h3>
        <p>${produto.descricao}</p>
        <div class="product-price">${formatarPreco(produto.preco)}</div>
      </div>
    </div>
  `;
}

// Função para mostrar detalhes do pagamento
function mostrarDetalhesPagamento() {
  const metodoSelecionado = document.querySelector(
    'input[name="payment"]:checked'
  );
  const container = document.getElementById("payment-details");
  const produto = JSON.parse(sessionStorage.getItem("produtoCompra"));

  if (!metodoSelecionado || !container || !produto) {
    return;
  }

  const metodoPagamento = metodoSelecionado.value;
  let conteudo = "";

  switch (metodoPagamento) {
    case "cartao":
      conteudo = `
        <div class="card-details">
          <h3>Dados do Cartão</h3>
          <div class="form-group">
            <label>Número do Cartão:</label>
            <input type="text" placeholder="0000 0000 0000 0000" maxlength="19" oninput="formatarNumeroCartao(this)">
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Validade:</label>
              <input type="text" placeholder="MM/AA" maxlength="5" oninput="formatarValidadeCartao(this)">
            </div>
            <div class="form-group">
              <label>CVV:</label>
              <input type="text" placeholder="000" maxlength="3" oninput="apenasNumeros(this)">
            </div>
          </div>
          <div class="form-group">
            <label>Nome no Cartão:</label>
            <input type="text" placeholder="Como impresso no cartão">
          </div>
          <div class="installments">
            <label>Parcelas:</label>
            <select>
              <option value="1">1x de ${formatarPreco(
                produto.preco
              )} sem juros</option>
              <option value="2">2x de ${formatarPreco(
                produto.preco / 2
              )} sem juros</option>
              <option value="3">3x de ${formatarPreco(
                produto.preco / 3
              )} sem juros</option>
              <option value="6">6x de ${formatarPreco(
                produto.preco / 6
              )} sem juros</option>
              <option value="12">12x de ${formatarPreco(
                produto.preco / 12
              )} sem juros</option>
            </select>
          </div>
        </div>
      `;
      break;

    case "pix":
      conteudo = `
        <div class="pix-details">
          <h3>Pagamento via PIX</h3>
          <p>Após finalizar a compra, você receberá um QR Code para pagamento.</p>
          <div class="pix-info">
            <span class="material-icons">qr_code</span>
            <p>O código PIX expira em 30 minutos</p>
          </div>
        </div>
      `;
      break;

    case "boleto":
      conteudo = `
        <div class="boleto-details">
          <h3>Boleto Bancário</h3>
          <p>O boleto será gerado após a confirmação da compra.</p>
          <div class="boleto-info">
            <span class="material-icons">description</span>
            <p>Vencimento: ${formatarData(
              new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
            )}</p>
          </div>
        </div>
      `;
      break;
  }

  container.innerHTML = conteudo;
  container.style.display = "block";
}

// Função para obter parcelas selecionadas
function obterParcelasSelecionadas() {
  const selectParcelas = document.querySelector(".installments select");
  if (selectParcelas) {
    return parseInt(selectParcelas.value) || 1;
  }
  return 1;
}

// Função para salvar compra
function salvarCompra(produto, metodoPagamento) {
  const agora = new Date();
  const compra = {
    id: Date.now(), // ID único baseado no timestamp
    produtoId: produto.id,
    produto: produto,
    metodoPagamento: metodoPagamento,
    dataCompra: agora.toISOString(),
    status: "Processando",
    parcelas: metodoPagamento === "cartao" ? obterParcelasSelecionadas() : 1,
  };

  let compras = JSON.parse(localStorage.getItem("comprasRealizadas")) || [];
  compras.push(compra);
  localStorage.setItem("comprasRealizadas", JSON.stringify(compras));
}

// Função para validar formulário de pagamento
function validarFormularioPagamento() {
  const metodoPagamento = document.querySelector(
    'input[name="payment"]:checked'
  ).value;

  if (metodoPagamento === "cartao") {
    const numeroCartao = document.querySelector(
      '.card-details input[placeholder="0000 0000 0000 0000"]'
    );
    const validade = document.querySelector(
      '.card-details input[placeholder="MM/AA"]'
    );
    const cvv = document.querySelector(
      '.card-details input[placeholder="000"]'
    );
    const nomeCartao = document.querySelector(
      '.card-details input[placeholder="Como impresso no cartão"]'
    );

    if (!numeroCartao || !numeroCartao.value.trim()) {
      alert("Por favor, preencha o número do cartão.");
      return false;
    }

    if (!validade || !validade.value.trim()) {
      alert("Por favor, preencha a validade do cartão.");
      return false;
    }

    if (!cvv || !cvv.value.trim()) {
      alert("Por favor, preencha o CVV.");
      return false;
    }

    if (!nomeCartao || !nomeCartao.value.trim()) {
      alert("Por favor, preencha o nome no cartão.");
      return false;
    }
  }

  return true;
}

// Função para finalizar compra
function finalizarCompra() {
  const produto = JSON.parse(sessionStorage.getItem("produtoCompra"));
  const metodoPagamento = document.querySelector(
    'input[name="payment"]:checked'
  ).value;

  if (!produto) {
    alert("Erro: produto não encontrado!");
    return;
  }

  // Validar formulário se for cartão
  if (!validarFormularioPagamento()) {
    return;
  }

  // Mostrar loading
  const botaoFinalizar = document.querySelector(".finalize-button");
  const textoOriginal = botaoFinalizar.textContent;
  botaoFinalizar.textContent = "Processando...";
  botaoFinalizar.disabled = true;

  // Simular processamento
  setTimeout(() => {
    // Salvar a compra
    salvarCompra(produto, metodoPagamento);

    // Remover produto do sessionStorage
    sessionStorage.removeItem("produtoCompra");

    // Mostrar mensagem de sucesso
    alert(
      "Compra realizada com sucesso! Você será redirecionado para suas compras."
    );

    // Redirecionar para a página de compras
    window.location.href = "minhas_compras.html";
  }, 1500);
}

// Event listeners
document.addEventListener("DOMContentLoaded", function () {
  carregarProduto();

  // Aguardar um pequeno delay para garantir que os elementos estejam prontos
  setTimeout(() => {
    mostrarDetalhesPagamento();

    // Adicionar listener para mudança de método de pagamento
    const paymentInputs = document.querySelectorAll('input[name="payment"]');
    paymentInputs.forEach((input) => {
      input.addEventListener("change", mostrarDetalhesPagamento);
    });
  }, 100);
});
