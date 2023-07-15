const form1 = document.getElementById('form-atividade');
const form2 = document.getElementById('form-alterar-media');
const imgAprovado = '<img src="./images/aprovado.png" alt="Emoji Celebrando" />';
const imgReprovado = '<img src="./images/reprovado.png" alt="Emoji Triste" />';
const atividades = []; //Criado este array [] para armazenar o nome das atividades
const notas = []; //Criado este array [] para armazenar as notas das atividades
let mediaPadrao = 7; //Definição padrão da média

let linhas = ''; //Colocar a variavel "linhas" fora do addEventListener para não ser resetado quando clicar em Submit

form1.addEventListener('submit', function(e) {
    e.preventDefault();

    adicionarLinha(); //Chamar a função de adicionar linha
    atualizaTabela(); //Chama função de escrever no corpo da tabela as linhas
    atualizaMediaFinal() //Chama função para calcular media final

});

form1.addEventListener('reset', function(e) {
    window.location.reload(); //Realiza reload na pagina e limpa todas as atividades
});

form2.addEventListener('submit', function(e) { 
    e.preventDefault();
    mediaPadrao = mediaEscolhida(); //Chamar função para alterar a mé dia padrão
});

function mediaEscolhida() { //função para alterar a média padrão
    const escolha = parseFloat(prompt('Digite a média minima da sua escolha ?'));
    return escolha;
}

function adicionarLinha () { //Criada uma função para adicionar linha, está função é chamada no addEventListener cada vez que o botão Submit for apertado.

    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');

    if (atividades.includes(inputNomeAtividade.value)) { //Adicionando este if para verificar se a atividade já existe no array "atividades"
        //console.log(atividades.includes(inputNomeAtividade.value));
        alert(`A atividade ${inputNomeAtividade.value} já foi inserida !!`)
    } else {
        atividades.push(inputNomeAtividade.value); //.push para adicionar os valores no array criado
        notas.push(parseFloat(inputNotaAtividade.value)); //.push para adicionar os valores no array criado E Adicionando o parseFloat para o valor ser armazenhado como numero e nao string
    
        let linha = '<tr>';
        linha += `<td>${inputNomeAtividade.value}</td>`; //Utiliza += para concatenar (juntar) 
        linha += `<td>${inputNotaAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value >= mediaPadrao ? imgAprovado : imgReprovado}</td>`; //Utiliza o ? para adicionar um if e o : para o else
        linha += '</tr>';
    
        linhas += linha;
    }

    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';
}

function atualizaTabela() { //Função para chamar a variavel linha e adicionar no corpo da tabela.
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}

function atualizaMediaFinal() {
    const mediaFinal = calculaMediaFinal();

    document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2); //Adicionando o valor na tabela E adicionado o ".toFixed" para limitar as casas decimais para no maximo 2
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= mediaPadrao ? `<span class="aprovado resultado">Aprovado</span>` : `<span class="reprovado resultado">Reprovado</span>`; //Adicionando a Aprovado ou reprovado na tabela
}

function calculaMediaFinal () {
    let somaDasNotas = 0;

    for (let i = 0; i < notas.length; i++) { //Adicionado este laço para somar os numeros armazenados em "notas" e adicionar o valor total em "somaDasNotas"
        somaDasNotas += notas[i];
    }

    return somaDasNotas / notas.length; //Realizando a divisão da soma das notas com a quantidades de notas para gerar a média das notas
}
