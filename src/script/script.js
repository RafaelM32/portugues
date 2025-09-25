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
imagem_apoio_0 = new Imagem_apoio("0","Diadema (etnia Kayapó). Estados do Mato Grosso e Pará. \
Museu de Arte Indígena, s.d. \
Disponível em: www.maimuseu.com.br. Acesso em: 11 jul. 2024.")
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

texto_apoio_5 = new Texto_apoio(""," Evanildo Bechara prepara a sua aposentadoria de pouco \
em pouco, como se a adiasse ao máximo. Aos 95 anos,  \
o imortal da Academia Brasileira de Letras (ABL) alcançou \
um status de astro pop no mundo da filologia e da gramática. \
Quando ainda tinha saúde para viagens mais longas, o filólogo \
lotava plateias em suas palestras na Europa e no Brasil,  \
que não raro terminavam com filas para selfies.\
 A idade acentuou o lado “cientista” e professoral de \
Bechara, que adota um tom técnico na conversa até mesmo \
diante das perguntas mais pessoais. — “Qual o seu tipo \
preferido de leitura?”. — “A minha leitura está dividida em \
duas partes, a científica e a literária, estabelecendo uma \
relação de causa e efeito entre elas.” — responde.\
 Ainda adolescente, Bechara descobriu a lexicologia. \
Um “novo mundo” se abriu para o pernambucano, que \
se mantém atento às metamorfoses do nosso idioma.  \
Seu colega de ABL, o filólogo Ricardo Cavaliere, se lembra \
de quando deu carona para o mestre e este encucou com \
os estrangeirismos do aplicativo de navegação instalado \
no veículo. — “A vozinha do aplicativo avisou que havia \
um radar de velocidade ‘reportado’ à frente”, lembra \
Cavaliere. — “Esse ‘reportado’ é uma importação, né?”, \
notou Bechara.", " Disponível em: https://oglobo.globo.com.  \
Acesso em: 3 jan. 2024 (adaptado).")

texto_apoio_6 = new Texto_apoio("","A Língua da Tabatinga, falada na cidade de \
Bom Despacho, Minas Gerais, foi por muito tempo \
estigmatizada devido à sua origem e à própria classe social de \
seus falantes, pois, segundo uma pesquisadora, era falada por \
“meninos pobres vindos da Tabatinga ou de Cruz de Monte —  \
ruas da periferia da cidade cujos habitantes sempre \
foram tidos por marginais”. Conhecida por antigos como a  \
“língua dos engraxates”, pois muitos trabalhadores desse \
ofício conversavam nessa língua enquanto lustravam \
sapatos na praça da matriz, a Língua da Tabatinga era \
utilizada por negros escravizados como uma espécie de \
“língua secreta”, um código para trocarem informações de \
como conseguir alimentos, ou para planejar fugas de seus \
senhores sem risco de serem descobertos por eles.\
 De acordo com um documento do Iphan (2011),  \
os falantes da língua apresentam uma forte consciência de \
sua relação com a descendência africana e da importância \
de preservar a “fala que os identifica na região”. Essa \
mudança de compreensão tangencia aspectos de \
pertencimento, pois, à medida que o falante da Língua \
da Tabatinga se identifica com a origem afro-brasileira, \
ele passa a ver essa língua como um legado recebido \
e tem o cuidado de transmiti-la para outras gerações. \
A concentração de falantes dessa língua está na faixa \
entre 21 e 60 anos de idade.","Disponível em: www.historiaeparcerias2019.rj.anpuh.org.  \
Acesso em: 3 fev. 2024 (adaptado).")

texto_apoio_7 = new Texto_apoio("","Diante do pouco dinheiro para produtos básicos de \
sobrevivência, são as adolescentes o alvo mais vulnerável \
à precariedade menstrual. Sofrem com dois fatores:  \
o desconhecimento da importância da higiene menstrual \
para sua saúde e a dependência dos pais ou familiares para \
a compra do absorvente, que acaba entrando na lista de \
artigos supérfluos da casa.\
 A falta do absorvente afeta diretamente o desempenho \
escolar dessas estudantes e, como consequência, restringe \
o desenvolvimento de seu potencial na vida adulta. \
Dados da Pesquisa Nacional de Saúde (PNS), do IBGE, \
revelaram que, das meninas entre 10 e 19 anos que \
deixaram de fazer alguma atividade (estudar, realizar \
afazeres domésticos, trabalhar ou, até mesmo, brincar) \
por problemas de saúde nos 14 dias anteriores à data \
da pesquisa, 2,88% deixaram de fazê-la por problemas \
menstruais. Para efeitos de comparação, o índice de \
meninas que relataram não ter conseguido realizar alguma \
de suas atividades por gravidez e parto foi menor: 2,55%.\
 Dados da ONU apontam que, no mundo, uma em cada \
dez meninas falta às aulas durante o período menstrual. \
No Brasil, esse número é ainda maior: uma entre quatro \
estudantes já deixou de ir à escola por não ter absorventes. \
Com isso, perdem, em média, até 45 dias de aula, por \
ano letivo, como revela o levantamento Impacto da Pobreza \
Menstrual no Brasil. O ato biológico de menstruar acaba \
por virar mais um fator de desigualdade de oportunidades \
entre os gêneros."," Disponível em: www12.senado.leg.br.  \
Acesso em: 21 jan. 2024 (adaptado).")

texto_apoio_8 = new Texto_apoio("","Maranhenses que moram longe matam a saudade da \
terra natal usando expressões próprias do estado. Se o \
maranhês impressiona e desperta a curiosidade de quem \
mora no próprio Maranhão, imagine de quem vem de \
outros estados e países? A variedade linguística local é \
enorme e o modo de falar tão próprio e característico dos \
maranhenses vem conquistando muita gente e inspirando \
títulos e muito conteúdo digital com a criação de podcasts, \
blogs, perfis na internet, além de estampar diversos tipos \
de produtos e serviços de empresas locais.\
 Com saudades do Maranhão, morando há 16 anos no \
Rio de Janeiro, um fotógrafo maranhense criou um perfil \
na internet no qual compartilha a culinária, brincadeiras e o \
‘dicionário’ maranhês. “A primeira vez que fui a uma padaria \
no Rio, na inocência, pedi 3 reais de ‘pães misturados’. \
Quando falei isso, as pessoas pararam e me olharam de \
uma forma bem engraçada, aí já fiquei ‘encabulado, ó’ \
e o atendente sorriu e explicou que lá não existia pão \
misturado e, sim, pão francês e suíço. Depois foi a minha \
vez de explicar sobre os pães ‘massa grossa e massa \
f\
 ina’”, contou o fotógrafo, com humor.","Disponível em: https://oimparcial.com.br.  \
Acesso em: 1 nov. 2021 (adaptado).")

texto_apoio_9 = new Texto_apoio("Telemedicina é para todos,  \
mas nem todos estão preparados", " A telemedicina, nos últimos anos, tem se destacado \
como uma ferramenta valiosa, proporcionando uma gama \
de benefícios que vão desde a ampliação do acesso à \
assistência médica até a otimização dos recursos de todo \
o ecossistema de saúde.\
 O governo federal propõe a Estratégia de Saúde Digital, \
um programa destinado à transformação digital da saúde no \
Brasil. Seu principal objetivo é facilitar a troca de informações \
entre os diversos pontos da Rede de Atenção à Saúde, \
promovendo a interoperabilidade e, assim, possibilitando a \
transição e a continuidade do cuidado nos setores público e \
privado. Também está em discussão um projeto de lei que \
dispõe sobre o prontuário eletrônico unificado do cidadão, \
o que indica o quanto o tema está em evidência tanto para \
os gestores públicos quanto para os privados.\
 Contudo, é importante reconhecer que nem todas as \
pessoas estão igualmente preparadas para aproveitar \
plenamente os cuidados ofertados pela telemedicina. \
Um dos principais benefícios do atendimento de saúde a \
distância é a capacidade de superar barreiras geográficas, \
proporcionando acesso a serviços médicos, especialmente \
para pacientes que residem em áreas remotas e/ou carentes \
de certas especialidades médicas, os chamados “vazios \
assistenciais”. A equidade no acesso é uma questão crítica, \
uma vez que nem todos têm ao seu alcance dispositivos \
tecnológicos ou uma conexão à internet que seja confiável, \
entre outros problemas de infraestrutura. É um desafio \
tanto para os pacientes quanto para os profissionais de \
saúde, que, em muitos casos, não contam com estrutura \
para o trabalho remoto nem com letramento digital para \
desenvolver as funções.","OLIVEIRA, D. Disponível em: www.correiobraziliense.com.br.  \
Acesso em: 21 jan. 2024 (adaptado).")

texto_apoio_10 = new Texto_apoio("","Uma definição possível para o conceito de arte \
afro-brasileira pode ser: produção plástica que é feita por \
negros, mestiços ou brancos a partir de suas experiências \
sociais com a cultura negra nacional. Exemplos clássicos \
dessa abordagem são Carybé (1911-1997), Mestre Didi \
(1917-2013) e Djanira da Motta e Silva (1914-1979), cujas \
obras emergem e ganham forma em razão do ambiente \
social no qual habitaram e viveram. Se Didi era um \
célebre representante da cultura religiosa nagô baiana e \
brasileira, iniciado desde o ventre no candomblé, Carybé \
era argentino e, naturalizado brasileiro, envolveu-se de \
tal modo com essa religião que alguns dos orixás dos \
quais conhecemos a imagem visual são produções suas","Disponível em: www.premiopipa.com. \
Acesso em: 13 nov. 2021 (adaptado).")

texto_apoio_11 = new Texto_apoio("","Influenciadores negros têm recorrentemente chamado \
a atenção para o fato de terem muito menos repercussão \
em suas postagens e nas entregas do seu conteúdo \
quando comparados com os influenciadores brancos, \
mesmo se fotos, contextos e anúncios forem extremamente \
semelhantes. Segundo o site Negrê, a digital influencer \
e youtuber criadora do projeto digital Preta Pariu iniciou \
um experimento em uma plataforma. Após perceber a \
crescente queda nos índices de alcance digital, a paulista \
publicou fotografias de modelos brancas em seu perfil e \
analisou as métricas de engajamento. Surpreendentemente, \
a ferramenta de estatísticas aferiu um aumento de 6 000% \
em seu alcance.","Disponível em: https://diplomatique.org.br. \
Acesso em: 21 jan. 2024 (adaptado).")

texto_apoio_12 = new Texto_apoio("","Um estudo norte-americano analisou os efeitos \
da pandemia da covid-19 sobre a saúde mental e a \
manutenção da atividade física, revelando que um fator \
está diretamente ligado ao outro. De acordo com os dados, \
famílias de baixa renda foram mais impactadas pelo \
ciclo vicioso de falta de motivação e pelo sedentarismo. \
Diante da necessidade de distanciamento social e do \
início da quarentena, as opções de espaços seguros \
para exercícios físicos diminuíram, o que dificultou que as \
pessoas mantivessem seus níveis de atividade. Os dados \
evidenciaram que as pessoas mais ativas tinham melhor \
estado de saúde mental. As pessoas com menor renda \
tiveram mais dificuldade para manter os níveis de atividade \
física durante a pandemia, sendo aproximadamente \
duas vezes menos propensas a continuarem no mesmo \
ritmo de exercícios de antes da pandemia. Habitantes \
de áreas urbanas mostraram maior probabilidade de \
não conseguirem manter os níveis de atividade física \
semelhantes aos de pessoas que vivem em zonas rurais, \
onde há mais oportunidades de sair para espaços abertos.","Disponível em: https://revistagalileu.globo.com. \
Acesso em: 6 dez. 2021 (adaptado).")

texto_apoio_13 = new Texto_apoio("","Até ali que sabia das misérias do mundo? Nada.\
Aquela noite do Castelo, tão simples, tão monótona, \
fora uma revelação! Era bem certo que a lágrima existia, \
que irrompiam soluços de peitos oprimidos, que para \
alguém os dias não tinham cor nem a noite tinha estrelas! \
Ela, criada entre beijos, no aroma dos seus jardins, com as \
vontades satisfeitas, o leito fofo, a mesa delicada, sentira \
sempre no coração um desejo sem nome, um desejo ou \
uma saudade absurda, a saudade do céu, como dizia o \
dr. Gervásio, e que não era mais que a doida aspiração \
da artista incipiente, que germinava no seu peito fraco. \
E aquela mesma mágoa parecia-lhe agora doce e \
embaladora, comparando-se à outra, a Sancha, da sua \
idade, negra, feia, suja, levada a pontapés, dormindo \
sem lençóis em uma esteira, comendo em pé, apressada, \
os restos parcos e frios de duas velhas, vestida de algodões \
rotos, curvada para um trabalho sem descanso nem paga! \
Por quê? Que direito teriam uns a todas as primícias e \
regalos da vida, se havia outros que nem por uma nesga \
viam a felicidade?","ALMEIDA, J. L. A falência. Disponível em: www.dominiopublico.gov.br. \
Acesso em: 28 dez. 2023.")

texto_apoio_14 = new Texto_apoio("","Sempre passo nervoso quando leio minha crônica \
neste jornal e percebo que escapuliu a palavra “coisa” em \
alguma frase. Acontece que “coisa” está entre as coisas \
mais deliciosas do mundo. \
O primeiro banho da minha filha foi embalado pela \
minha voz dizendo, ao fundo, “cuidado, ela ainda é uma \
coisinha tão pequena”. “Viu só que amor? Nunca vi coisa \
assim”. O amor que não dá conta de explicação é “a coisa” \
em seu esplendor e excelência. “Alguma coisa acontece \
no meu coração” é a frase mais bonita que alguém já disse \
sobre São Paulo. E quando Caetano, citado aqui pela \
terceira vez pra defender a dimensão poética da coisa, \
diz “coisa linda”, nós sabemos que nenhuma palavra \
definiria de forma mais profunda e literária o quão bela e \
amada uma coisa pode ser. \
“Coisar” é verbo de quem está com pressa ou tem \
lapsos de memória. É pra quando “mexe qualquer coisa \
dentro doida”. E que coisa magnífica poder se expressar \
tal qual Caetano Veloso. Agora chega, porque “esse papo \
já tá qualquer coisa” e eu já tô “pra lá de Marrakech”.","TATI BERNARDI. Disponível em: www1.folha.uol.com.br. \
Acesso em: 3 jan. 2024 (adaptado).")

texto_apoio_15 = new Texto_apoio("","A linguagem visual dos adornos transmite informações \
sobre prestígio e transgressão, direito e dever, pois só é \
permitido ao indivíduo o uso de adornos de sua linhagem. \
Quando diretamente vinculadas aos conceitos cosmológicos, \
as artes indígenas convertem-se antes em prismas que \
refletem as concepções acerca da composição do universo \
e dos componentes que o povoam.","AGUILAR, N. (Org.); DIAS, J. A. B. F.; VELTHEN, L. H. V. Mostra do \
redescobrimento: artes indígenas. São Paulo: Fundação Bienal de \
São Paulo-Associação Brasil 500 anos, 2000 (adaptado)")


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

const questao_5 = new Questao("Nesse texto, as falas atribuídas a Evanildo Bechara são \
representativas da variedade linguística",["A situacional, pois o contexto exige o uso da linguagem \
formal.", "B regional, pois ele traz marcas do falar de seu local de \
nascimento.", "C sociocultural, pois sua formação pressupõe o uso de \
linguagem rebuscada.", "D geracional, pois ele emprega termos característicos de \
sua faixa etária.", "E ocupacional, pois ele faz uso de termos específicos de \
sua área de atuação."],[texto_apoio_5],false,"e")

const questao_6 = new Questao("A Língua da Tabatinga tem sido preservada porque o(a)",["A seu registro passou da forma oral para a escrita.",
    "B classe social de seus usuários ganhou prestígio.",
    "C sua função inicial se manteve ao longo dos anos.",
    "D sentimento de identidade linguística tem se consolidado.",
    "E perfil etário de seus falantes tem se tornado homogêneo."
],[texto_apoio_6],false,"d")

const questao_7 = new Questao("Esse texto é marcado pela função referencial da linguagem, \
uma vez que cumpre o propósito de",["A sugerir soluções para um problema de ordem social.",
    "B estabelecer uma relação entre menstruação e gravidez.",
    "C comparar o desempenho acadêmico de mulheres e \
homens.",
"D informar o leitor sobre o impacto da pobreza menstrual \
na vida das mulheres.",
"E orientar o público sobre a necessidade de rotinas de \
autocuidado na adolescência."
],[texto_apoio_7],false,"d")

const questao_8 = new Questao("A vivência relatada no texto evidencia que as variedades \
linguísticas", ["A impedem o entendimento mútuo.",
    "B enaltecem o português do Maranhão.",
    "C são constitutivas do português brasileiro.",
    "D exigem a dicionarização dos termos usados.",
    "E são restritas a situações coloquiais de comunicação."
],[texto_apoio_8],false,"c")


const questao_9 = new Questao(" Ao tratar da telemedicina, esse texto ressalta que um dos \
benefícios dessa tecnologia para a sociedade é o fato de ela",["A disponibilizar prontuário único do cidadão tanto na rede \
pública quanto na privada.", "B oportunizar o acesso a atendimento médico a pacientes \
de áreas periféricas.", "C fornecer dispositivos tecnológicos para a realização \
de exames.", "D promover a interação entre diferentes especialidades \
médicas.", "E garantir infraestrutura para o trabalho remoto de \
médicos."],[texto_apoio_9],false,"b")

const questao_10 = new Questao("Sob a perspectiva da multiculturalidade e de acordo com \
o texto, a produção artística afro-brasileira caracteriza-se \
pelo(a)",["A estranhamento no modo de apropriação da cultura \
religiosa de matriz africana.", "B distanciamento entre as raízes de matriz africana e \
a estética de outras culturas.", "C visão uniformizadora das religiões de matriz africana \
expressada nas diferentes produções.", "D relação complexa entre as vivências pessoais dos \
artistas e os referenciais estéticos de matriz africana.", "E padronização da forma de produção e da temática da \
matriz africana presente nas obras dos artistas citados."],[texto_apoio_10],false,"d")

const questao_11 = new Questao("A apresentação do dado estatístico ao final desse texto \
revela a intenção de", ["A demonstrar a repercussão de projetos como o Preta Pariu.",
    "B informar o quantitativo de postagens da comunidade negra.",
    "C potencializar o alcance de textos e imagens em sites \
como o Negrê.",
    "D exaltar a qualidade das publicações sobre negritude \
em redes sociais.",
    "E comprovar a relação entre o alcance de conteúdos \
digitais e o viés racial."
],[texto_apoio_11],false,"e")

const questao_12 = new Questao("O texto evidencia a perspectiva ampliada de saúde ao \
abordar criticamente a pandemia da covid-19 a partir do(a)", ["A busca por espaços para a prática de exercícios físicos.",
    "B necessidade de se manter ativo para ter equilíbrio \
emocional.",
    "C distanciamento social e sua vinculação com a prática \
de atividades físicas.",
    "D relação entre os determinantes socioeconômicos e a \
prática de exercícios.",
    "E benefício de morar em áreas rurais para preservar a\
estabilidade psicológica."
],[texto_apoio_12],false,"d")

const questao_13 = new Questao("Nesse fragmento do romance de Júlia Lopes de Almeida, \
escrito no cenário brasileiro pós-abolição, a narradora \
exprime um olhar crítico sobre a", ["A desvalorização da arte produzida por mulheres.",
    "B mudança das condições de moradia do povo negro.",
    "C ruptura do projeto político de emancipação feminina.",
    "D exploração da força de trabalho da população negra.",
    "E disputa de poder entre brancos e negros no século XIX."
],[texto_apoio_13],false,"d")

const questao_14 = new Questao("O recurso utilizado na progressão textual para garantir a \
unidade temática dessa crônica é a", ["A intertextualidade, marcada pela citação de versos de \
letras de canções.", "B metalinguagem, marcada pela referência à escrita de \
crônicas pela autora.", "C reiteração, marcada pela repetição de uma determinada \
palavra e de seus cognatos", "D conexão, marcada pela presença dos conectores lógicos \
“quando” e “porque” entre orações.", "E pronominalização, marcada pela retomada de “minha filha” \
e “um namorado ruim” pelos pronomes “ela” e “lo”"],[texto_apoio_14],false,"c")

const questao_15 = new Questao("Pela leitura desses textos, infere-se que a compreensão \
da arte plumária indígena requer a consideração da",["A indistinção hierárquica entre os membros de um mesmo \
grupo social.","B prevalência dos elementos do mundo natural sobre as \
relações humanas.", "C reconfiguração constante das representações coletivas \
acerca do universo.", "D indeterminação entre as noções de identidade individual \
e de identidade cultural.","E indissociabilidade entre objetos ritualísticos e os papéis \
dos indivíduos na comunidade."],[texto_apoio_15],[imagem_apoio_0],"e")

///LISTA PRINCIPAL

const lista_de_questoes = [questao_0, questao_1,questao_2,questao_3,questao_4,
     questao_5,questao_6,questao_7,questao_8,questao_9,questao_10,questao_11,
    questao_12,questao_13,questao_14,questao_15]

botao_proxima.addEventListener("click", function(){
    proximaQuestao(lista_de_questoes)
})

botao_anterior.addEventListener("click", function(){
    questaoAnterior(lista_de_questoes)
})




sortearQuestao(lista_de_questoes)
