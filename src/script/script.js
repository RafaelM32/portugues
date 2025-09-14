const div_base = document.querySelector(".textos_apoio")
const letra_a = document.querySelector(".a")
const letra_b = document.querySelector(".b")
const letra_c = document.querySelector(".c")
const letra_d = document.querySelector(".d")
const letra_e = document.querySelector(".e")
const botao_gabarito = document.querySelector(".gabarito")
const titulo = document.querySelector("#title")
const botao_proxima = document.querySelector(".proxima")
const botao_anterior = document.querySelector(".anterior")


const letras =  [letra_a,letra_b,letra_c,letra_d,letra_e]

let gabarito_atual = "d"

let numeroQuestao = 0

letras.forEach(letra => {
    letra.addEventListener("click", function(){
        escolher(letra)
    })
})



class Imagem_apoio{
    constructor(nome, fonte){
        this.nome = nome
        this.fonte = fonte
    }
}


class Texto_apoio{
    constructor(titulo, texto, fonte){
        this.titulo = titulo
        this.texto = texto
        this.fonte = fonte
    }
}

class Questao{
    constructor(enunciado, alternativas, textos_apoio, imagens_apoio, gabarito){
        this.enunciado = enunciado
        this.alternativas = alternativas
        this.textos_apoio = textos_apoio
        this.imagens_apoio = imagens_apoio
        this.gabarito = gabarito
    }
}

function escolher(letra){
    zerarEscolhas(letras)
    letra.classList.add("escolha")

}

function removerEscolha(letra){
    letra.classList.remove("escolha")
}


function removerGabarito(letra){
    letra.classList.remove("correta")
}

function eGabarito(letra){
    let lista_de_classes =  letra.classList
    for(let i = 0 ; i< lista_de_classes.length; i++){
        if(lista_de_classes[i]== "correta"){
            return true
        }
    }
    return false
}

function escolhida(letra){
    let lista_de_classes =  letra.classList
    for(let i = 0 ; i< lista_de_classes.length; i++){
        if(lista_de_classes[i]== "escolha"){
            return true
        }
    }
    return false
}

function zerarGabarito(letras){
    letras.forEach(letra =>{
            if(eGabarito(letra)){
                removerGabarito(letra)
            }
        })
}

function zerarEscolhas(letras){
    letras.forEach(letra =>{
            if(escolhida(letra)){
                removerEscolha(letra)
            }
        })
}


function adicionarFonte(fonte){
    let paragrafo = document.createElement("p")
    paragrafo.innerText = fonte
    paragrafo.classList.add("fonte")
    div_base.appendChild(paragrafo)
}

function adicionarImagem(imagem){
    let img = document.createElement("img")
    img.src = "src/imagens/"+imagem.nome + ".png"
    div_base.appendChild(img)
    adicionarFonte(imagem.fonte)
}

function adicionarEnunciado(enunciado){
    let paragrafo = document.createElement("p")
    paragrafo.innerText = enunciado
    div_base.appendChild(paragrafo)
}

function adicionarTextoApoio(texto_apoio){
    const h2 = document.createElement("h2")
    h2.innerText = texto_apoio.titulo
    h2.classList.add("titulo_texto_apoio")

    const p = document.createElement("p")
    p.innerText = texto_apoio.texto
    p.classList.add("texto_apoio")

    const fonte = document.createElement("p")
    fonte.innerText = texto_apoio.fonte
    fonte.classList.add("fonte")

    div_base.appendChild(h2)
    div_base.appendChild(p)
    div_base.appendChild(fonte)

}

function carregarAlternativas(alternativas){
    letra_a.innerText = alternativas[0]
    letra_b.innerText = alternativas[1]
    letra_c.innerText = alternativas[2]
    letra_d.innerText = alternativas[3]
    letra_e.innerText = alternativas[4]
}

function revelarGabarito(questao){
    gabarito_atual = questao.gabarito
    letras.forEach(letra =>{
        let classes = letra.classList
        for(let i = 0; i<classes.length;i++){
            if(classes[i] == gabarito_atual){
                letra.classList.add("correta")
                console.log(gabarito_atual)
            }
        }
    })
}

function addNumberTittle(numero){
    console.log(numero)
    titulo.innerText = "Gerador de ENEM PORTUGUÊS " + numero
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


let questaoAtual = null; // Adicione esta variável global

function gerarQuestao(questao){
    zerarGabarito(letras)
    questaoAtual = questao; // Atualize a questão atual
    if(questao.textos_apoio != false){
        questao.textos_apoio.forEach(element =>{
            adicionarTextoApoio(element)
        })
    }

    if(questao.imagens_apoio != false){
        questao.imagens_apoio.forEach(element => {
            adicionarImagem(element)
        });
    }
    adicionarEnunciado(questao.enunciado)
    carregarAlternativas(questao.alternativas)
}

botao_gabarito.addEventListener("click", function(){
    if (questaoAtual) {
        revelarGabarito(questaoAtual);
    }
});


function sortearQuestao(lista){
    numeroQuestao = getRandomIntInclusive(0,lista.length - 1)
    gerarQuestao(lista_de_questoes[numeroQuestao])
    addNumberTittle(numeroQuestao)
}

function zerarQuestao(){
    div_base.innerHTML = ""
}


function proximaQuestao(lista){
    if(numeroQuestao <= lista.length -2){
        numeroQuestao +=1
        zerarQuestao()
        gerarQuestao(lista[numeroQuestao])
        gabarito_atual = lista[numeroQuestao].gabarito
        addNumberTittle(numeroQuestao)
    }
}

function questaoAnterior(lista){
    if(numeroQuestao >= 1){
        numeroQuestao -=1
        zerarQuestao()
        gerarQuestao(lista[numeroQuestao])
        gabarito_atual = lista[numeroQuestao].gabarito
        addNumberTittle(numeroQuestao)
    }
}


///IMAGENS DE APOIO
imagem_apoio_0 = new Imagem_apoio()
imagem_apoio_1 = new Imagem_apoio()

///TEXTOS DE APOIO
texto_apoio_0 = new Texto_apoio("Expressões e termos utilizados no Amazonas \
são retratados em livro e em camisetas"," “Na linguagem, podemos nos ver da forma mais \
verdadeira: nossas crenças, nossos valores, nosso lugar \
no mundo”, afirmou o doutor em linguística e professor da \
Ufam em seu livro Amazonês: expressões e termos usados \
no Amazonas. Portanto, o amazonense, com todas as suas \
“cunhantãs” e “curumins”, acaba por encontrar um lugar no \
mundo e formar uma unidade linguística, informalmente \
denominada de português “caboco”, que muito se diferencia \
do português “mineiro”, “gaúcho”, “carioca” e de tantos \
outros espalhados pelo Brasil. O livro, que conta com cerca \
de 1 100 expressões e termos típicos do falar amazonense, \
levou dez anos para ser construído. Para o autor, o principal \
objetivo da obra é registrar a linguagem. \
 Um designer amazonense também acha o amazonês \
“xibata”, tanto é que criou uma série de camisetas estampadas \
com o nome de Caboquês Ilustrado, que mistura o bom \
humor com as expressões típicas da região. A coleção conta \
com sete modelos já lançados, entre eles: Leseira Baré, \
Xibata no Balde e Até o Tucupi, e 43 ainda na fila de espera.  \
Para o criador, as camisas têm como objetivo “resgatar o \
orgulho do povo manauara, do povo do Norte”","Disponível em: https://g1.globo.com. Acesso em: 15 jan. 2024 (adaptado).")

texto_apoio_1 = new Texto_apoio("Conheça histórias de atletas paralímpicas que \
trocaram de modalidade durante a carreira esportiva", "Jane Karla: a goiana de 45 anos teve poliomielite aos três \
anos, o que prejudicou seus movimentos das pernas. Em \
2003, iniciou no tênis de mesa e conseguiu conquistar títulos \
nacionais e internacionais. Mas conheceu o tiro com arco e, \
em 2015, optou por se dedicar somente à nova modalidade. \
Em seu ano de estreia no tiro, já faturou a medalha de ouro \
nos Jogos Parapan-Americanos de Toronto 2015.\
 Elizabeth Gomes: a santista de 55 anos era jogadora de \
vôlei quando foi diagnosticada com esclerose múltipla em \
1993. Ingressou no Movimento Paralímpico pelo basquete \
em cadeira de rodas até experimentar o atletismo.  \
Chegou a praticar as duas modalidades simultaneamente \
até optar pelas provas de campo em 2010. No \
Campeonato Mundial de Atletismo, realizado em Dubai, em \
2019, Beth se sagrou campeã do lançamento de disco e \
estabeleceu um novo recorde mundial da classe F52.\
 Silvana Fernandes: a paraibana de 21 anos é natural de \
São Bento e nasceu com malformação no braço direito. \
Aos 15 anos, começou a praticar atletismo no lançamento \
de dardo. Em 2018, enquanto competia na regional  \
Norte-Nordeste, foi convidada para conhecer o paratae \
kwon do. No ano seguinte, migrou para a modalidade \
e já faturou o ouro na categoria até 58 kg nos Jogos \
Parapan-Americanos de Lima 2019.","Disponível em: https://cpb.org.br. Acesso em: 15 jan. 2024 (adaptado).")

texto_apoio_2 = new Texto_apoio("","É fundamentalmente no Minho, norte de Portugal, que o \
cavaquinho aparece como instrumento tipicamente popular, \
ligado às formas essenciais da música característica dessa \
província. O cavaquinho minhoto tem escala rasa com o \
tampo, o que facilita a prática do “rasqueado”. O cavaquinho \
chega ao Brasil diretamente de Portugal, e o modelo \
brasileiro é maior do que a sua versão portuguesa, com \
uma caixa de ressonância mais funda. Semelhante ao \
cavaquinho minhoto, o machete, ou machetinho madeirense, \
é um pequeno cordófono de corda dedilhada, que faz \
parte da grande e diversificada família das violas de mão \
portuguesas. O ukulele tem a sua origem no século XIX, \
tendo como ancestrais o braguinha (ou machete) e o rajão, \
instrumentos levados pelos madeirenses quando eles \
emigraram para o Havaí.","OLIVEIRA, E. V. Cavaquinhos e família. Disponível em:  \
https://casadaguitarra.pt. Acesso em: 18 nov. 2021 (adaptado).")

texto_apoio_3 = new Texto_apoio("","Pressão, depressão, estresse e crise de ansiedade. \
Os males da sociedade contemporânea também estão \
no esporte. A tenista Naomi Osaka, do Japão, jogadora \
mais bem paga do mundo e que já ocupou o número 2 do \
ranking, retirou-se do torneio de Roland Garros de 2021 \
porque não estava conseguindo administrar as crises \
de ansiedade provocadas pelos grandes eventos, por \
ser uma estrela aos 23 anos, e pelo peso de parte da \
imprensa. O tenista australiano Nick Kyrgios, de 25 anos, \
revelou sua “situação triste e solitária” enquanto lutava \
contra a depressão causada pelo ritmo avassalador do \
Circuito Mundial de Tênis. O jogador de basquete americano \
Kevin Love também tornou público seu quadro de ansiedade \
e depressão. O mundo do atleta é solitário e distante da \
família. O que vemos numa partida não reflete a rotina \
desgastante. A imprensa denomina atletas como heróis, \
como se aquele corpo fosse indestrutível, mas a mente é \
o ponto fraco da história.","Disponível em: www.uol.com.br. Acesso em: 31 out. 2021 (adaptado).")

texto_apoio_4 = new Texto_apoio("","Já ouvi gente falando que o podcast é o renascimento \
do rádio. O rádio é genial, uma mídia imorredoura,  \
mas podcast não tem nada a ver com ele. O formato está \
mais próximo do ensaio literário do que de um programa \
de ondas curtas, médias ou longas.\
 Podcasts são antípodas das redes sociais. Enquanto \
elas são dispersivas, levam à evasão e à desinformação, \
os podcasts são uma possibilidade de imersão, \
concentração, aprendizado. Depois que eles surgiram, \
lavar a louça e me locomover pela cidade viraram um \
programaço. Um pós-almoço de domingo e aprendo tudo \
sobre bonobos e gorilas. Um táxi pro aeroporto e chego \
ao embarque PhD em reforma tributária.","PRATA, A. Disponível em: www1.folha.uol.com.br.  \
Acesso em: 7 jan. 2024 (adaptado).")

///QUESTOES
const questao_0 = new Questao("A reportagem apresenta duas iniciativas: o livro Amazonês \
e as camisetas do Caboquês Ilustrado. Com temática em \
comum, essas iniciativas",["A recomendam produtos feitos por empreendedores da \
região Norte.", "B ressaltam diferenças entre o falar manauara e outros \
falares.","C reverenciam o trabalho feito por pesquisadores brasileiros.", "D destacam a descontração no jeito de ser do amazonense.",
"E valorizam o repertório linguístico do povo do Amazonas."],[texto_apoio_0],false,"e")

const questao_1 = new Questao("Esse conjunto de minibiografias tem como propósito",["A descrever as rotinas de treinamento das atletas.",
    "B comparar os desempenhos de atletas de alto rendimento.",
    "C destacar a trajetória profissional de atletas paralímpicas \
brasileiras.",
"D indicar as categorias mais adequadas a adaptações \
paralímpicas.",
"E estimular a participação de mulheres em campeonatos \
internacionais."
],[texto_apoio_1],false,"c")

const questao_2 = new Questao("O conjunto dessas práticas musicais demonstra que os \
instrumentos mencionados no texto",["A refletem a dependência da utilização de matéria-prima \
europeia",
"B  adaptam suas características a cada cultura, assumindo \
nova identidade.", "C comprovam a hegemonia portuguesa na invenção de \
cordófonos dedilhados.",
"D ilustram processos de dominação cultural, evidenciando \
situações de choque cultural.", "E mantêm nomenclatura própria para garantir a fidelidade \
às formas originais de confecção."],[texto_apoio_2],false,"b")

const questao_3 = new Questao("As causas do desequilíbrio na saúde mental apontadas \
no texto estão relacionadas às", ["A nacionalidades diversificadas dos praticantes.", "B modalidades esportivas distintas.",
    "C faixas etárias aproximadas.",
    "D representações heroicas dos atletas.",
    "E pressões constantes dos eventos e da mídia."
],[texto_apoio_3],false,"e")

const questao_4 = new Questao("Segundo a argumentação construída nesse texto, o podcast",["A provoca dispersão da atenção em seu público.",
    "B funciona por meio de uma frequência de ondas curtas",
    "C propicia divulgação de conhecimento para seus usuários.",
    "D tem um formato de interação semelhante ao das redes \
sociais.",
"E constitui uma evolução na transmissão de informações \
via rádio."
],[texto_apoio_4],false,"c")



///LISTA PRINCIPAL

const lista_de_questoes = [questao_0, questao_1,questao_2,questao_3,questao_4]

botao_proxima.addEventListener("click", function(){
    proximaQuestao(lista_de_questoes)
})

botao_anterior.addEventListener("click", function(){
    questaoAnterior(lista_de_questoes)
})




sortearQuestao(lista_de_questoes)
