// ==================== Contatos ====================

const cepInput = document.getElementById("cep");

if (cepInput) {

    cepInput.addEventListener("blur", function() {

        let cep = this.value.replace(/\D/g, "");

        if (cep.length !== 8) {
            alert("Digite um CEP válido.");
            return;
        }

        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(dados => {

                if (dados.erro) {
                    alert("CEP não encontrado.");
                    return;
                }

                document.getElementById("rua").value = dados.logradouro;
                document.getElementById("bairro").value = dados.bairro;
                document.getElementById("cidade").value = dados.localidade;
                document.getElementById("estado").value = dados.uf;

            })
            .catch(() => {
                alert("Não foi possível consultar o CEP.");
            });

    });

}


// ==================== barra de pesquisa ====================

const formulario = document.getElementById("formPesquisa");
const campoPesquisa = document.getElementById("campoPesquisa");

if (formulario && campoPesquisa) {

    formulario.addEventListener("submit", function(event) {

        event.preventDefault();

        // Pega o que foi digitado
        const pesquisa = campoPesquisa.value.toLowerCase().trim();

        // Envia o usuário para a página de produtos
        window.location.href = "produtos.html?pesquisa=" + encodeURIComponent(pesquisa);

    });

}

// Pega os parâmetros da URL
const parametros = new URLSearchParams(window.location.search);

// Pega a pesquisa da URL
const pesquisa = parametros.get("pesquisa");

// Pega a categoria
const categoria = parametros.get("categoria");

// Seleciona todos os produtos
const produtos = document.querySelectorAll(".produto");


// ==================== FILTRO ====================

if (pesquisa) {

    produtos.forEach(function(produto) {

        const textoProduto = produto.textContent.toLowerCase();

        if (textoProduto.includes(pesquisa.toLowerCase())) {

            produto.style.display = "";

        } else {

            produto.style.display = "none";

        }

    });

}


// ==================== FILTRO POR CATEGORIA ====================

if (categoria) {

    produtos.forEach(function(produto) {

        if (produto.classList.contains(categoria)) {

            produto.style.display = "";

        } else {

            produto.style.display = "none";

        }

    });

}


// ==================== FORMULÁRIO DE CONTATO ====================

const formContato = document.getElementById("formContato");
const mensagem = document.getElementById("mensagemEnviado");

if (formContato && mensagem) {

    formContato.addEventListener("submit", function(event) {

        event.preventDefault();

        mensagem.classList.remove("d-none");

        formContato.reset();

    });

}