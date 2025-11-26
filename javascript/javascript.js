function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

const imagens = [
    {
        src: "imagem/img1.jpg",
        titulo: "Mitologia Versus",
        descricao: "A narrativa do jogo consiste no Diabo ter corrompido Deus e o convencido de matar todos os outros deuses de todas as outras mitologias para se tornar único e absoluto.",
        data: "2023",
        plataforma: "Produzido no site Piskel"
    },
    {
        src: "imagem/img2.jpg",
        titulo: "Darwin Adventure",
        descricao: "A narrativa acompanha a vida aventuresca e dramática do cientista Charles Darwin desde sua infância até o final de sua viagem pela América do Sul.",
        data: "2025",
        plataforma: "Produzido pelo ChatGPT"
    },
    {
        src: "imagem/img3.jpg",
        titulo: "Morgue Horror",
        descricao: "Um homem se matou para fugir do diabo, mas foi possuído por Satan no necrotério. O protagonista encontra o local ensanguentado e cheio de referências infernais.",
        data: "2024",
        plataforma: "Produzido pelo ChatGPT"
    },
    {
        src: "imagem/img4.jpg",
        titulo: "Mero’s Adventure",
        descricao: "O peixe Mero se aventura pelo Brasil, protegendo os animais aquáticos e enfrentando uma companhia misteriosa que destrói rios e mares.",
        data: "2023",
        plataforma: "Produzido no Piskel"
    }
,
    {
        src: "imagem/bg.png",
        titulo: "Jogo da Abelha",
        descricao: "Um jogo divertido em que a abelha coleta flores e evita aranhas. Desenvolvido com HTML5, CSS e JavaScript.",
        data: "2025",
        plataforma: "HTML5, CSS3 e JavaScript",
        tipo: "jogo"
    }
];

let indiceAtual = 0;
const imagensPorTela = 3;

function exibirImagens() {
    const container = document.getElementById("carrossel-imagens");
    container.innerHTML = "";

    for (let i = 0; i < imagensPorTela; i++) {
        const index = (indiceAtual + i) % imagens.length;
        const img = document.createElement("img");
        img.src = imagens[index].src;
        img.alt = imagens[index].titulo;
        img.onclick = () => abrirPopup(imagens[index]);
        container.appendChild(img);
    }
}

function mudarImagens(direcao) {
    indiceAtual = (indiceAtual + direcao * imagensPorTela + imagens.length) % imagens.length;
    exibirImagens();
}

function abrirPopup(imagem) {
    if (imagem.tipo === "jogo") {
        abrirJogoAbelha();
        return;
    }
    const popup = window.open("", "popup", "width=850,height=700,resizable=yes,scrollbars=yes");

    if (popup) {
        popup.document.write(`
            <html>
                <head>
                    <title>${imagem.titulo}</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            padding: 20px;
                        }
                        img {
                            width: 100%;
                            max-width: 600px;
                            height: auto;
                            border-radius: 8px;
                            display: block;
                            margin-bottom: 15px;
                        }
                        h1 {
                            margin-top: 0;
                        }
                        .info {
                            margin-bottom: 10px;
                        }
                    </style>
                </head>
                <body>
                    <h1>${imagem.titulo}</h1>
                    <div class="info"><strong>Data de criação:</strong> ${imagem.data}</div>
                    <div class="info"><strong>Plataforma:</strong> ${imagem.plataforma}</div>
                    <img src="${imagem.src}" alt="${imagem.titulo}">
                    <p><strong>Descrição:</strong> ${imagem.descricao}</p>
                </body>
            </html>
        `);
        popup.document.close();
        popup.focus();
    } else {
        alert("Por favor, permita pop-ups para visualizar as informações.");
    }
}

function fecharPopup() {
    document.getElementById("popup").style.display = "none";
}

document.addEventListener("DOMContentLoaded", exibirImagens);
