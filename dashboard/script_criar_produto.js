function formatarData(data) {
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

function formatarPreco(preco) {
  const valor = parseFloat(preco);
  return `R$ ${valor.toFixed(2).replace(".", ",")}`;
}

function gerarNovoId() {
  // Verifica se já existe anúncios no localStorage
  const anunciosSalvos = JSON.parse(localStorage.getItem("anuncios")) || [];

  if (anunciosSalvos.length === 0) {
    return 1;
  }

  const maiorId = Math.max(...anunciosSalvos.map((anuncio) => anuncio.id));
  return maiorId + 1;
}

function salvarAnuncio(anuncio) {
  let anunciosSalvos = JSON.parse(localStorage.getItem("anuncios")) || [];
  anunciosSalvos.push(anuncio);
  localStorage.setItem("anuncios", JSON.stringify(anunciosSalvos));
}

function mostrarMensagemSucesso() {
  const mensagemAnterior = document.querySelector(".success-message");
  if (mensagemAnterior) {
    mensagemAnterior.remove();
  }

  const mensagem = document.createElement("div");
  mensagem.className = "success-message";
  mensagem.textContent =
    "Anúncio criado com sucesso! Status: Aguardando aprovação.";

  const formulario = document.getElementById("product-form");
  formulario.parentNode.insertBefore(mensagem, formulario.nextSibling);

  setTimeout(() => {
    if (mensagem.parentNode) {
      mensagem.remove();
    }
  }, 5000);
}

function processarFormulario(event) {
  event.preventDefault();

  const nome = document.getElementById("product-name").value.trim();
  const descricao = document.getElementById("product-description").value.trim();
  const preco = document.getElementById("product-price").value;
  const arquivo = document.getElementById("product-image").files[0];

  if (!nome || !descricao || !preco || !arquivo) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return;
  }

  const novoAnuncio = {
    id: gerarNovoId(),
    nome: nome,
    descricao: descricao,
    preco: formatarPreco(preco),
    status: "Aguardando",
    dataPublicacao: formatarData(new Date()),
    imagem: arquivo.name,
  };

  salvarAnuncio(novoAnuncio);

  mostrarMensagemSucesso();

  document.getElementById("product-form").reset();

  console.log("Novo anúncio criado:", novoAnuncio);
}

function redirecionarParaAnuncios() {
  setTimeout(() => {
    if (confirm("Deseja visualizar seus anúncios?")) {
      window.location.href = "anuncios.html";
    }
  }, 2000);
}

document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("product-form");

  if (formulario) {
    formulario.addEventListener("submit", function (event) {
      processarFormulario(event);
      redirecionarParaAnuncios();
    });
  }

  const campoPreco = document.getElementById("product-price");
  if (campoPreco) {
    campoPreco.addEventListener("input", function () {
      const valor = parseFloat(this.value);
      if (valor < 0) {
        this.value = "";
      }
    });
  }
});
