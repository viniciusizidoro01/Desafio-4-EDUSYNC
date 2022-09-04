// declaração das variáveis 

let inputNome = document.querySelector(".inputNome") as HTMLInputElement;
let inputStatus = document.getElementsByName("status") as any;
let inputData = document.querySelector(".data") as HTMLInputElement;
let inputTextArea = document.querySelector(".descricaoArea") as HTMLInputElement;  
let novosCards: Array<Card> = []
let btnCadastro = document.querySelector('.botaoCadastrar') as HTMLButtonElement

// criação de uma classe Card com atributos e caracterísiticas que serão utilizadas.
class Card {
    private nome: string;
    private descricao: string;
    private data: string;
    private status: string; 
    private id: string;
    
    public get Nome(): string {
        return this.nome;
    }
    public set Nome(value: string) {
        this.nome = value;
    }

    public get Descricao(): string {
        return this.descricao;
    }
    public set Descricao(value: string) {
        this.descricao = value;
    }

    public get Data(): string {
        return this.data;
    }
    public set Data(value: string) {
        this.data = value;
    }

    public get Status(): string {
        return this.status;
    }
    public set Status(value: string) {
        this.status = value;
    }

    public get Id(): string {
        return this.id;
    }
    public set Id(value: string) {
        this.id = value;
    }

    constructor(_nome:string, _descricao:string, _data:string, _status:string, _id:string){
        this.nome = _nome;
        this.descricao = _descricao;
        this.data = _data;
        this.status = _status;
        this.id = _id;
    }
}

// criação da interface com as ações esperadas.
interface apiTipagem {
    nome: string;
    descricao: string;
    data: string;
    status: string; 
    id: string;
}

// função para acessar a API e retornar os dados para utilização nos cartões.
function obterCards():void{
        fetch('https://62361b7feb166c26eb2f488a.mockapi.io/pacotes')
        .then(resposta=>resposta.json())
        .then((dados:apiTipagem [])=>{
            return dados.map(dadosCard=>{
                return new Card(
                    dadosCard.nome,
                    dadosCard.descricao,
                    dadosCard.data,
                    dadosCard.status,
                    dadosCard.id
                )
            })
        })
        .then(dadosNovosCards => {
            injetarDados(dadosNovosCards)
            novosCards = dadosNovosCards;
            console.log(novosCards);
})
}

//função para inserir os dados nos cartões pelo usuário ().
function criarCards() {
   
    inputNome.value;
    // console.log(inputNome.value);
    validacaoStatus (inputStatus);
    inputData.value;
    inputTextArea.value;
    let idFake: string = '0';
    let novoCard = new Card (inputNome.value, inputTextArea.value, inputData.value, validacaoStatus(inputStatus), criarId());
    // console.log('corrigir idFake');
    novosCards.push(novoCard);
    console.log(novosCards);
    injetarDados(novosCards);
}

// função para criar Id do cartão.
function criarId() {
    
    let maiorId: number = 0
    novosCards.map((dadoId, index)=>{
        if (Number(dadoId.Id) > maiorId) {
            maiorId = Number(dadoId.Id)
        }
    })
    maiorId ++
    return maiorId.toString()
}

//botão cadastrar, injetando no HTML.
btnCadastro.addEventListener('click', () =>{criarCards()})

function validacaoStatus(status:any){
    status = inputStatus;
    for (let i = 0; i < status.length; i++) {
      if (status[i].checked) {
        return status = status[i].value
      }
    }
    return status
}

//função para obter a data (dia, mês e ano)
function dataTexto(data:string):string{
    let newDate = new Date(data)
    // console.log(newDate);
    
    let dataString:string;
    dataString=(newDate.getDate().toString()+"/"
            +newDate.getMonth().toString()+"/"
            +newDate.getFullYear().toString()
            )
    return dataString
}


//função criada para injetar os dados dos cartões por array no HTML.
function injetarDados(arrayNovosCards:any){

    let cardNovo = document.querySelector('.cardAPI') as HTMLElement
    cardNovo.innerHTML = " "
    for (let i = 0; i < arrayNovosCards.length; i++) {
        cardNovo.innerHTML += `<div class="container">
        <h2 class="nomeAPI">${arrayNovosCards[i].nome} </h2>
        <p class="txtAPI">${arrayNovosCards[i].descricao}</p>
        <p class="txtData">Data: ${dataTexto (arrayNovosCards[i].data)} </p>
        <button type="submit" class="editar" id="editar${arrayNovosCards[i].id}" value="${arrayNovosCards[i].id}" onClick="editar(${arrayNovosCards[i].id})" >Editar</button>
        <button type="submit" class="excluir" id="excluir${arrayNovosCards[i].id}" value="${arrayNovosCards[i].id}" onClick="excluir(${arrayNovosCards[i].id})">Excluir</button>
    </div>`
    }
    console.log(dataTexto(arrayNovosCards[0].data));
}

// função criada para editar os dados dos cartões.
function editar(id:string){
    let indice:number
    indice = selecionarCardId(id)
    inputNome.value = novosCards[indice].Nome;
    inputData.value = novosCards[indice].Data;
    injetarDados(novosCards);
    inputTextArea.value = novosCards[indice].Status;
    excluir(id)
    injetarDados(novosCards)
}

//função criada para excluir os dados dos cartões.
function excluir(id:string) {
    let indice: number
    indice = selecionarCardId(id)
    novosCards.splice(indice, 1)
    injetarDados (novosCards);
}


//função criada para selecionar o cartão.
function selecionarCardId(id:string):number {
    let indice: number = 0
    for (let i = 0; i < novosCards.length; i++) {
        if (novosCards[i].Id == id ) {
            indice = i
        }
    }
    return indice
}

window.onload = () => {
    obterCards()
};