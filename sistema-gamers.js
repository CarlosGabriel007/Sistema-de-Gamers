const prompt = require("prompt-sync")();

let time = [];
let continuar = true;

function mostrarMenu() {
    console.log("\n===============================");
    console.log("------ SISTEMA DE GAMERS ------")
    console.log("1 - Cadastrar");
    console.log("2 - Deletar");
    console.log("3 - Mostrar Equipe");
    console.log("4 - Cálculo da Média da Equipe");
    console.log("5 - Buscar Jogador");
    console.log("6 - Atualizar Pontos");
    console.log("7 - Sair");

}

function buscarJogador(nomeDesejado) {
    if (time.length === 0) {
        console.log("Nenhum jogador cadastrado.");
        return;
    }

    console.log("Buscando por: " + nomeDesejado + "...");

    let encontrou = false;

    for (let i = 0; i < time.length; i++) {
        let jogadorAtual = time[i];

        if (jogadorAtual.nome === nomeDesejado) {
            console.log("JOGADOR ENCONTRADO!");
            console.log(
                "Nome: " + jogadorAtual.nome +
                " | Função: " + jogadorAtual.funcao +
                " | Pontuação: " + jogadorAtual.pontuacao
            );

            encontrou = true;
            break;
        }
    }

    if (encontrou === false) {
        console.log(
            "O jogador " + nomeDesejado +
            " não faz parte da nossa equipe."
        );
    }
}

function atualizarPontuacao() {
    console.log("\n--- ATUALIZAÇÃO DE RANKING ---");

    if (time.length === 0) {
        console.log("Nenhum jogador cadastrado.");
        return;
    }

    let nomeDesejado = prompt("Qual jogador deseja atualizar? ");
    let encontrou = false;

    for (let i = 0; i < time.length; i++) {
        let jogadorAtual = time[i];

        if (jogadorAtual.nome === nomeDesejado) {
            encontrou = true;

            let entrada = prompt("Quantos pontos ele ganhou hoje? ");
            let pontosNovos = Number(entrada);

            if (
                entrada.trim() === "" ||
                !Number.isFinite(pontosNovos) ||
                pontosNovos < 0
            ) {
                console.log("Pontuação inválida! Digite um número maior ou igual a zero.");
                return;
            }

            jogadorAtual.pontuacao += pontosNovos;

            console.log(
                "SUCESSO! A pontuação de " + jogadorAtual.nome +
                " subiu para " + jogadorAtual.pontuacao + " pontos!"
            );

            break;
        }
    }

    if (encontrou === false) {
        console.log(
            "O jogador " + nomeDesejado +
            " não faz parte da nossa equipe."
        );
    }
}


function mostrarEquipe() {
    if (time.length === 0) {
        console.log("Nenhum jogador cadastrado");
        return;
    }

    for (let i = 0; i < time.length; i++) {
        let jogador = time[i];
        console.log((i + 1) + ". " + jogador.nome + " | Função: " + jogador.funcao + " | Pontuação: " + jogador.pontuacao);

    }
}

function cadastrarJogador() {
    let nomeJogador = prompt("Digite o nome do jogador: ").trim();
    let funcaoJogador = prompt("Digite a função no time: ").trim();
    let entrada = prompt("Digite a pontuação: ");
    let pontuacaoJogador = Number(entrada);

    if (nomeJogador === "" || funcaoJogador === "") {
        console.log("Nome e função não podem ficar vazios.");
        return;
    }

    if (
        entrada.trim() === "" ||
        !Number.isFinite(pontuacaoJogador) ||
        pontuacaoJogador < 0
    ) {
        console.log("Pontuação inválida! Digite um número maior ou igual a zero.");
        return;
    }

    let recruta = {
        nome: nomeJogador,
        funcao: funcaoJogador,
        pontuacao: pontuacaoJogador
    };

    time.push(recruta);

    console.log("Jogador " + nomeJogador + " foi cadastrado com sucesso!");
    console.log("---------------------------");
}

   

function deletarJogador() {
    if (time.length === 0) {
        console.log("Nenhum jogador cadastrado.");
        return;
    }

    let nomeDeletado = prompt("Digite o nome a ser deletado: ");
    let indexDeletado = -1;
    
    for (let i = 0; i < time.length; i++ ) {
        if (time[i].nome === nomeDeletado) {
            indexDeletado = i;
            break;
        }
    }


    if (indexDeletado === -1) {
        console.log("Jogador não encontrado.");
        return;
    }

    time.splice(indexDeletado, 1);
    console.log("Jogador deletado com sucesso.");

}

function calculoDaMedia() {
    if (time.length === 0) {
        console.log("Nenhum jogador cadastrado.");
        return;
    }

    let totalPontos = 0;

    for (let i = 0; i < time.length; i++) {
        totalPontos = totalPontos + time[i].pontuacao;
    }

    let mediaPontos = totalPontos / time.length;

    console.log("O time possui uma pontuação média de: ", mediaPontos);
}

while (continuar === true) {
    mostrarMenu();

    let opcao = prompt(
        "Digite sua opção: "
    );

    if (opcao === "1") {
        cadastrarJogador();
    } else if (opcao === "2") {
        deletarJogador();
    } else if (opcao === "3") {
        mostrarEquipe();
    } else if (opcao === "4") {
        calculoDaMedia();
    } else if (opcao === "5") {
        let nomeDesejado = prompt("Digite o nome do jogador para buscar: ");
        buscarJogador(nomeDesejado);
    } else if (opcao === "6") {
        atualizarPontuacao();
    } else if (opcao === "7") {
        continuar = false;
        console.log("Sistema encerrado.");
    } else {
        console.log("Opção inválida, digite outra opção...");
    }
}

       