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


// ==================== barrade pesquisa ====================

const formulario = document.getElementById("formPesquisa");
const campoPesquisa = document.getElementById("campoPesquisa");

if (formulario && campoPesquisa) {

    formulario.addEventListener("submit", function(event) {

        event.preventDefault();

        const pesquisa = campoPesquisa.value.toLowerCase().trim();

        const produtos = document.querySelectorAll(".produto");

        produtos.forEach(function(produto) {

            const textoProduto = produto.textContent.toLowerCase();

            if (textoProduto.includes(pesquisa)) {
                produto.style.display = "";
            } else {
                produto.style.display = "none";
            }

        });

    });

}

// Pega os parâmetros da URL
const parametros = new URLSearchParams(window.location.search);

// Pega a categoria
const categoria = parametros.get("categoria");

// Seleciona todos os produtos
const produtos = document.querySelectorAll(".produto");


// Só executa o filtro se existir uma categoria na URL
if (categoria) {

    produtos.forEach(function(produto) {

        if (produto.classList.contains(categoria)) {

            produto.style.display = "";

        } else {

            produto.style.display = "none";

        }

    });

}

const formContato = document.getElementById("formContato");
const mensagem = document.getElementById("mensagemEnviado");

if (formContato && mensagem) {

    formContato.addEventListener("submit", function(event) {

        event.preventDefault();

        mensagem.classList.remove("d-none");

        formContato.reset();

    });

}