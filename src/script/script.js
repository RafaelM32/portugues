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
imagem_apoio_1 = new Imagem_apoio("1","VISCONTI, E. Três meninas no jardim. Óleo sobre tela,  \
81 × 65 cm. Museu Nacional de Belas Artes,  \
Rio de Janeiro, 1935. \
 Disponível em: www.eliseuvisconti.com.br. Acesso em: 18 set. 2012.")

imagem_apoio_2 = new Imagem_apoio("2","Disponível em: https://defesacivil.rs.gov.br.  \
Acesso em: 11 mar. 2024 (adaptado).")

imagem_apoio_3 = new Imagem_apoio("3","Anônimo. Cabeça de uma figura feminina.  \
Circa 2700-2500 a.C. Escultura em mármore, 8 × 3,2 cm. \
Metropolitan Museum of Art, Nova Iorque")

imagem_apoio_4 = new Imagem_apoio("4"," MODIGLIANI, A. Cabeça de mulher. Circa 1910-1911.  \
Escultura em calcário, 68,3 × 15,9 × 24,1 cm. \
National Gallery of Art, Washington. \
WOLKOFF, J. These 5,000-Year-Old Sculptures Look Shockingly Similar to Modern Art.  \
Disponível em: www.artsy.net. Acesso em: 19 jun. 2019.")

imagem_apoio_5 = new Imagem_apoio("5","TEXTO II\
 Representação de 2 953 arcos de luz cruzando o céu, \
registrando o nascer e o pôr do sol ao longo de oito anos\
 VALKENBORGH, R. Fotografia. Reino Unido: \
Universidade Hertfordshire (2012-2020).\
 Disponível em: www.thisiscolossal.com. Acesso em: 1 nov. 2022.")


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

texto_apoio_16 = new Texto_apoio(" Capítulo 4, versículo 3","Minha palavra vale um tiro, eu tenho muita munição \
 Na queda ou na ascensão, minha atitude vai além \
 E tem disposição pro mal e pro bem \
 Talvez eu seja um sádico ou um anjo, um mágico \
 Ou juiz, ou réu, o bandido do céu \
 Malandro ou otário, quase sanguinário \
 Franco atirador se for necessário \
 Revolucionário, insano, ou marginal \
 Antigo e moderno, imortal \
 Fronteira do céu com o inferno \
 Astral imprevisível, como um ataque cardíaco do verso.","RACIONAIS MCs. Sobrevivendo ao inferno.  \
São Paulo: Cosa Nostra, 1997 (fragmento).")

texto_apoio_17 = new Texto_apoio("","Pode-se dizer que as várias experiências narradas \
nos discos do Racionais tratam no fundo de um só tema: \
a violência que estrutura a nossa sociedade. O grupo \
canta a violência que estrutura as relações entre os \
familiares, os amigos, o homem e a mulher, o traficante e \
o viciado. Canta a violência do crime. A violência causada \
por inveja ou por vaidade. Também canta que a relação \
entre as classes sociais é sempre violenta: o racismo, \
a miséria, os baixos salários, a concentração de renda,  \
a esmola, a publicidade, o alcoolismo, o jornalismo, o poder \
policial, a justiça, o sistema penitenciário, o governo existem \
por meio da violência.","GARCIA, W. Ouvindo Racionais MCs. Teresa: revista de  \
literatura brasileira, n. 5, 2004 (adaptado).")

texto_apoio_18 = new Texto_apoio("","As reações à sétima temporada foram o ápice do último \
estágio em Game of Thrones. De forma alguma, este que \
vos fala seria capaz de argumentar que a série é perfeita, \
mas os defeitos que existem aqui sempre existiram, de uma \
forma ou de outra, durante os sete anos em que ela esteve \
no ar. Os dois roteiristas foram brilhantes em traduzir os \
personagens intrincados e conflituosos da obra de George \
R. R. Martin, mas nunca souberam exatamente como fazer \
jus a eles (e especialmente a elas, as mulheres da trama).\
 A verdade é que, com tudo isso e mais Ramin Djawadi \
evocando sentimentos e ambientes improváveis com sua \
trilha sonora magistral, a série não conseguiria ser ruim nem \
se tentasse, mas continua sendo uma pena que, ao buscar \
o seu final com tanta sede e tanta celeridade, Benioff e \
Weiss tenham tirado sua qualidade mais preciosa: o fôlego, \
a paciência e o detalhismo que faziam suas palavras se \
levantarem do papel e ganharem vida."," Disponível em: https://observatoriodocinema.uol.com.br.  \
Acesso em: 29 nov. 2017 (adaptado)")

texto_apoio_19 = new Texto_apoio("","— Vá para o inferno, Gondim. Você acanalhou o troço. \
Está pernóstico, está safado, está idiota. Há lá ninguém \
que fale dessa forma!\
 Azevedo Gondim apagou o sorriso, engoliu em seco, \
apanhou os cacos da sua pequenina vaidade e replicou \
amuado que um artista não pode escrever como fala. \
 — Não pode? — perguntei com assombro. E por quê? \
 Azevedo Gondim respondeu que não pode porque \
não pode.\
 — Foi assim que sempre se fez. A literatura é a \
literatura, seu Paulo. A gente discute, briga, trata de \
negócios naturalmente, mas arranjar palavras com tinta é \
outra coisa. Se eu fosse escrever como falo, ninguém me lia."," RAMOS, G. São Bernardo. Rio de Janeiro: Record, 2009.")

texto_apoio_20 = new Texto_apoio("","Por trás do universo “masculino” das lutas, é cada \
vez mais notório o aumento da participação de mulheres \
nessa prática corporal. Algumas situações reforçam esse \
fenômeno de ocupação em ambientes de lutas: a inclusão \
de mulheres em combates de artes marciais mistas, ou MMA,  \
a transmissão televisiva de lutas de mulheres e a criação de \
horários específicos para elas em academias que ensinam \
lutas. Uma pesquisa científica mostrou menor participação e \
mobilização das meninas em comparação com os meninos \
nas aulas de Educação Física. Entre as justificativas discentes \
para essa situação está o fato de que eles relacionam a luta \
como uma expressão corporal masculina e, por consequência, \
não adequada aos interesses femininos. Dessa forma, o ensino \
de lutas nas aulas de Educação Física é atravessado por \
tensões relacionadas às questões de gênero e sexualidade,  \
o que, por sua vez, pode favorecer a sua exclusão do conteúdo \
próprio da disciplina.","SO, M. R.; MARTINS, M. Z.; BETTI, M. As relações das meninas \
com os saberes das lutas nas aulas de Educação Física. \
Motrivivência, n. 56, dez. 2018 (adaptado).")

texto_apoio_21 = new Texto_apoio("","Volta e meia recebo cartinhas de fãs, e alguns são bem \
jovens, contando como meu trabalho com a música mudou \
a vida deles. Fico no céu lendo essas coisas e me emociono \
quando escrevem que não são aceitos pelos pais por serem \
diferentes, e como minhas músicas são uma companhia e \
os libertam nessas horas de solidão.\
 Sinto que é mais complicado ser jovem hoje, já que nunca \
tivemos essa superpopulação no planeta: haja competitividade, \
culto à beleza, ter filho ou não, estudar, ralar para arranjar \
trabalho, ser mal remunerado, ser bombardeado com trocentas \
informações, lavagens cerebrais...\
 Queria dar beijinhos e carinhos sem ter fim nessa moçada e \
dizer a ela que a barra é pesada mesmo, mas que a juventude \
está a seu favor e, de repente, a maré de tempestade muda. \
Diria também um monte de clichê: que vale a pena estudar \
mais, pesquisar mais, ler mais. Diria que não é sinal de saúde \
estar bem-adaptado a uma sociedade doente, que o que é \
normal para uma aranha é o caos para uma mosca. \
Meninada, sintam-se beijados pela vovó Rita."," RITA LEE. Outra autobiografia. São Paulo: Globo Livros, 2023.")

texto_apoio_22 = new Texto_apoio("","Conheci Bentinho e Capitu nos meus curiosos e antigos \
quinze anos. E os olhos de água da jovem de Matacavalos \
atraíram-me, seduziram-me ao primeiro contato. Aliados ao \
seu jeito de ser, flor e mistério. Mas tomou-me também a \
indignação diante do narrador e seu texto, feito de acusação \
e vilipêndio. Sem qualquer direito de defesa. Sem acesso ao \
discurso, usurpado, sutilmente, pela palavra autoritária do \
marido, algoz, em pele de cordeiro vitimado. Crudelíssimo \
e desumano: não bastasse o que faz com a mulher, chega \
a desejar a morte do próprio filho e a festejá-la com \
um jantar, sem qualquer remorso. No fundo, uma pobre \
consciência dilacerada, um homem dividido, que busca \
encontrar-se na memória, e acaba faltando-se a si mesmo. \
Retomei inúmeras vezes a triste história daquele amor em \
desencanto. Familiarizei-me, ao longo do tempo, com a \
crítica do texto; poucos, muito poucos, escapam das bem \
traçadas linhas do libelo condenatório; no mínimo concedem \
à ré o beneplácito da dúvida: convertem-na num enigma \
indecifrável, seu atributo consagrador.\
 Eis que, diante de mais um retorno ao romance, veio \
a iluminação: por que não dar voz plena àquela mulher, \
brasileira do século XIX, que, apesar de todas as artimanhas \
e do maquiavelismo do companheiro, se converte numa das \
mais fascinantes criaturas do gênio que foi Machado de Assis?\
 A empresa era temerária, mas escrever é sempre um \
risco. Apoiado no espaço de liberdade em que habita a \
Literatura, arrisquei-me.\
 O resultado: este livro em que, além-túmulo, como \
Brás Cubas, a dona dos olhos de ressaca assume, à \
luz do mistério da arte literária e do próprio texto do  \
Dr. Bento Santiago, seu discurso e sua verdade.","PROENÇA FILHO, D. Capitu: memórias póstumas.  \
Rio de Janeiro: Atrium, 1998.")

texto_apoio_23 = new Texto_apoio("","Meu irmão é filho adotivo. Há uma tecnicidade no termo, \
filho adotivo, que contribui para sua aceitação social. Há uma \
novidade que por um átimo o absolve das mazelas do passado, \
que parece limpá-lo de seus sentidos indesejáveis. Digo que \
meu irmão é filho adotivo e as pessoas tendem a assentir com \
solenidade, disfarçando qualquer pesar, baixando os olhos \
como se não sentissem nenhuma ânsia de perguntar mais \
nada. Talvez compartilhem da minha inquietude, talvez de \
fato se esqueçam do assunto no próximo gole ou na próxima \
garfada. Se a inquietude continua a reverberar em mim,  \
é porque ouço a frase também de maneira parcial — meu irmão \
é filho — e é difícil aceitar que ela não termine com a verdade \
tautológica habitual: meu irmão é filho dos meus pais. Estou \
entoando que meu irmão é filho e uma interrogação sempre \
me salta aos lábios: filho de quem?"," FUCKS, J. A resistência. São Paulo: Cia. das Letras, 2015.")

texto_apoio_24 = new Texto_apoio("TEXTO I"," A 13 de fevereiro de 1946, Graciliano Ramos escreve \
uma carta a Cândido Portinari relembrando uma visita que \
lhe fizera quando tivera a ocasião de apreciar algumas \
telas da série Retirantes. Diz o escritor alagoano:\
 Caríssimo Portinari:\
 A sua carta chegou muito atrasada, e receio que esta \
resposta já não o ache fixando na tela a nossa pobre \
gente da roça. Não há trabalho mais digno, penso eu. \
Dizem que somos pessimistas e exibimos deformações; \
contudo, as deformações e essa miséria existem fora da \
arte e são cultivadas pelos que nos censuram. [...]\
 Dos quadros que você me mostrou quando almocei no \
Cosme Velho pela última vez, o que mais me comoveu foi \
aquela mãe com a criança morta. Saí de sua casa com um \
pensamento horrível: numa sociedade sem classes e sem \
miséria, seria possível fazer-se aquilo? Numa vida tranquila \
e feliz, que espécie de arte surgiria? Chego a pensar que \
teríamos cromos, anjinhos cor-de-rosa, e isto me horroriza.\
 Graciliano","Disponível em: https://graciliano.com.br.  \
Acesso em: 6 fev. 2024 (adaptado).")

texto_apoio_25 = new Texto_apoio("TEXTO II \
 Histórias de ninar (adultos)"," Houve um tempo — tão perto, e, ó, tão longe — em que  \
a arte era um holofote na unha encravada, não um \
campeonato de melhores esmaltes.\
 Raskolnikov matava velhinhas, a família de Gregor \
Samsa o assassinava a “maçãzadas”, Memórias póstumas \
de Brás Cubas (Machado de Assis) é o retrato mais \
perfeito de tudo o que tem de pior na sociedade brasileira, \
uma sequência tristemente hilária de ações moralmente \
condenáveis, atitudes pusilânimes, cálculos mesquinhos e \
maus passos cretinos.\
 A literatura, o cinema e o teatro vêm se transformando \
num exercício de lacração: o mal está sempre no outro, os \
protagonistas são ironmen / women da virtude. A pessoa \
sai da leitura ou da sessão não com a guarda abaixada, \
as certezas abaladas, mais próxima da verdade (ou, à falta  \
de uma palavra melhor, da sinceridade): sai com suas \
certezas reforçadas.\
 A realidade é confusa. Contraditória. Muitas vezes \
incompreensível. A arte é onde tentamos nos mostrar nus, \
com todos os nossos defeitos."," PRATA, A. Disponível em: www1.folha.uol.com.br.  \
Acesso em: 12 jan. 2024 (adaptado).")

texto_apoio_26 = new Texto_apoio("Cap. XLVIII / Terpsícore", " Ao contrário do que ficou dito atrás, Flora não se aborreceu \
na ilha. Conjeturei mal, emendo-me a tempo. Podia aborrecer-se \
pelas razões que lá ficam, e ainda outras que poupei ao leitor \
apressado; mas, em verdade, passou bem a noite. A novidade \
da festa, a vizinhança do mar, os navios perdidos na sombra, \
a cidade defronte com os seus lampiões de gás, embaixo e \
em cima, na praia e nos outeiros, eis aí aspectos novos que \
a encantaram durante aquelas horas rápidas.\
 Não lhe faltavam pares, nem conversação, nem alegria \
alheia e própria. Toda ela compartia da felicidade dos outros. \
Via, ouvia, sorria, esquecia-se do resto para se meter \
consigo. Também invejava a princesa imperial, que viria a \
ser imperatriz um dia, com o absoluto poder de despedir \
ministros e damas, visitas e requerentes, e ficar só, no mais \
recôndito do paço, fartando-se de contemplação ou de \
música. Era assim que Flora definia o ofício de governar. \
Tais ideias passavam e tornavam. De uma vez alguém lhe \
disse, como para lhe dar força: “Toda alma livre é imperatriz!”"," ASSIS, M. Esaú e Jacó. Rio de Janeiro: Nova Aguilar, 1974")

texto_apoio_27 = new Texto_apoio("Marília acorda","Tomo café em golinhos para não queimar meus lábios \
ressequidos. Como pão em pedacinhos para não engasgar \
com um farelo mais duro. Marília come também, mas olha \
o tempo todo para baixo. Parece que tem um acanhamento \
novo entre a gente. Termino. Olho mais uma vez pela janela. \
O dia está bom. Quero caminhar pelo pátio. Marília levanta, \
pega o andador e põe ao lado da cama. Ela sabe que eu \
quero levantar sozinha, e levanto. O lance de escadas, \
apesar de pequeno, ainda me causa problemas, mas não \
quero um elevador na casa e não vou tolerar descer uma \
rampa de cadeira de rodas. Marília abre a porta e saímos \
para a manhã. O dia está mais fresco do que eu imaginava. \
Ela pega uma manta de tricô que temos desde não sei \
quando e põe sobre as minhas costas. Ela aperta meus \
ombros com muita força, porque mesmo depois de todos \
esses anos, não descobriu a medida certa do carinho. \
Eu gosto. Porque entendo que naquele ato, naquela força \
está o nosso carinho","POLESSO, N. B. Amora. Porto Alegre: Não Editora, 2015.")

texto_apoio_28 = new Texto_apoio("Teclado amazônico", " Em novembro de 2023, uma professora indígena \
recebeu uma missão: verter as regras de um jogo de \
tabuleiro infantil do português para o tukano, sua língua \
nativa. Com vinte anos de experiência como professora \
de línguas em Taracuá, no Amazonas, ela já se dedicava à \
tradução havia tempos. O trabalho ficou mais fácil graças \
a um aplicativo lançado no ano anterior: com o Linklado \
em seu computador, ela traduziu as sete páginas das \
instruções do jogo em dois dias. Sem esse recurso, a tarefa \
seria bem mais trabalhosa. Antes dele, diz a professora,  \
as transcrições de línguas indígenas exigiam o esforço \
quase manual de produzir diacríticos (acentos gráficos) \
e letras que não constam no teclado de aplicativos de \
mensagens ou programas de texto.\
 Para a pesquisadora do Instituto Nacional de Pesquisas \
da Amazônia (Inpa), idealizadora do aplicativo, o Linklado \
representa uma revolução. O programa não restringe \
combinações de acentos, e isso poderá facilitar a criação \
de representações gráficas para fonemas que ainda não \
têm forma escrita. “Eu mirei em uma dor e atingimos várias \
outras”, diz.\
 “O Linklado possibilita que o Brasil reconheça a sua \
diversidade linguística”, afirma uma antropóloga que é \
colega da pesquisadora no Inpa e faz parte da equipe do \
aplicativo. Ela defende que escrever na língua materna é \
uma das principais formas de preservá-la."," Disponível em: https://piaui.folha.uol.com.br.  \
Acesso em: 3 fev. 2024 (adaptado)")


texto_apoio_29 = new Texto_apoio("","— Eu lhe juro, Aurélia. Estes lábios nunca tocaram a face de outra mulher, que não fosse minha mãe. Meu primeiro \
beijo de amor, guardei-o para minha esposa, para ti...\
 [...]\
 — Ou de outra mais rica! — disse ela, retraindo-se para fugir ao beijo do marido, e afastando-o com a ponta dos dedos.\
 A voz da moça tomara o timbre cristalino, eco da rispidez e aspereza do sentimento que lhe sublevava o seio, \
e que parecia ringir-lhe nos lábios como aço.\
 — Aurélia! Que significa isto?\
 — Representamos uma comédia, na qual ambos desempenhamos o nosso papel com perícia consumada. Podemos \
ter este orgulho, que os melhores atores não nos excederiam. Mas é tempo de pôr termo a esta cruel mistificação, \
com que nos estamos escarnecendo mutuamente, senhor. Entremos na realidade por mais triste que ela seja; \
e resigne-se cada um ao que é, eu, uma mulher traída; o senhor, um homem vendido.\
 — Vendido! — exclamou Seixas ferido dentro d’alma.\
 — Vendido, sim: não tem outro nome. Sou rica, muito rica; sou milionária; precisava de um marido, traste indispensável \
às mulheres honestas. O senhor estava no mercado; comprei-o. Custou-me cem contos de réis, foi barato; não se \
fez valer. Eu daria o dobro, o triplo, toda a minha riqueza por este momento.","ALENCAR, J. Senhora. Rio de Janeiro: Tecnoprint, 2003.")



texto_apoio_30 = new Texto_apoio("Se você é feito de música, este texto é pra você",
    " Às vezes, no silêncio da noite, eu fico imaginando: \
que graça teria a vida sem música? Sem ela não há paz, \
não há beleza. Nos dias de festa e nas madrugadas de \
pranto, nas trilhas dos filmes e nas corridas no parque,  \
o que seria de nós sem as canções que enfeitam o cotidiano \
com ritmo e verso? Quem nunca curou uma dor de cotovelo \
dançando lambada ou terminou de se afundar ouvindo \
sertanejo sofrência? Quantos já criticaram funk e fecharam \
a noite descendo até o chão? Tudo bem... Raul nos ensinou \
que é preferível ser essa metamorfose ambulante do que \
ter aquela velha opinião formada sobre tudo.\
 Já somos castigados com o peso das tragédias,  \
o barulho das buzinas, os ruídos dos conflitos. É pau, \
é pedra, é o fim do caminho. Há uma nuvem de lágrimas \
sobre os olhos, você está na lanterna dos afogados,  \
o coração despedaçado. Mas, como um sopro, da janela \
do vizinho, entra o samba que reanima a mente. Floresce \
do fundo do nosso quintal a batida que ressuscita o ânimo, \
sintoniza a alegria e equaliza o fôlego. Levanta, sacode \
a poeira, dá a volta por cima."," BITTAR, L. Disponível em: www.revistabula.com. \
Acesso em: 21 nov. 2021 (adaptado).")

texto_apoio_31 = new Texto_apoio("","pessoas com suas malas\
 mochilas e valises\
 chegam e se vão\
 se encontram\
 se despedem\
 e se despem\
 de seus pertences\
 como se pudessem chegar\
 a algum lugar\
 onde elas mesmas\
 não estivessem"," RUIZ, A. In: SANT’ANNA, A. Rua Aribau: coletânea de poemas. \
Porto Alegre: TAG, 2018.")

texto_apoio_32 = new Texto_apoio(" Falar errado é uma arte, Arnesto!"," No dia 6 de agosto de 1910, Emma Riccini Rubinato \
pariu um garoto sapeca em Valinhos e deu a ele o nome \
de João Rubinato. Na escola, João não passou do terceiro \
ano. Não era a área dele, tinha de escolher outra. Fez o que \
apareceu. Foi ser garçom, metalúrgico, até virar radialista, \
comediante, ator de cinema e TV, cantor e compositor. \
De samba.\
 Como tinha sobrenome italiano, João resolveu mudar \
para emplacar seu samba. E como ia mudar o sobrenome, \
mudou o nome. Virou Adoniran Barbosa. O cara falava \
errado, voz rouca, pinta de malandro da roça. Virou ícone da \
música brasileira, o mais paulista de todos, falando errado \
e irritando Vinicius de Moraes, que ficou de bico fechado \
depois de ouvir a música que Adoniran fez para a letra \
Bom dia, tristeza, de autoria do Poetinha. Coisa de arrepiar.\
 Para toda essa gente que implicava, Adoniran tinha \
uma resposta neoerudita: “Gosto de samba e não foi fácil, \
pra mim, ser aceito como compositor, porque ninguém \
queria nada com as minhas letras que falavam ‘nóis vai’, \
‘nóis fumo’, ‘nóis fizemo’, ‘nóis peguemo’. Acontece que é \
preciso saber falar errado. Falar errado é uma arte, senão \
vira deboche”.\
 Ele sabia o que fazia. Por isso dizia que falar errado \
era uma arte. A sua arte. Escolhida a dedo porque casava \
com seu tipo. O Samba do Arnesto é um monumento à \
fala errada, assim como Tiro ao Álvaro. O erudito podia \
resmungar, mas o povo se identificava."," PEREIRA, E. Disponível em: www.tribunapr.com.br.  \
Acesso em: 8 jul. 2024 (adaptado).")

texto_apoio_33 = new Texto_apoio("","O festival folclórico de Parintins, no Amazonas, \
anunciou que o Boi Caprichoso levou, em 2018, seu \
23º título — contra 31 do adversário Boi Garantido. \
Desde o fim do evento que não paro de cantar duas \
músicas que aprendi no Bumbódromo (arena onde ocorre \
o espetáculo). Revezo entre “meu amor, eu sou feliz, ééé \
azul o meu país”, obviamente do boi azul, o Caprichoso; \
e “vermelhou o curral, a ideologia avermelhou”, do boi \
vermelho, o Garantido. Esse revezamento seria proibido \
em Parintins, cidade tão dividida entre as torcidas dos bois. \
Em Parintins, você tem de ter um lado. Há aqueles que \
tentam fugir e dizem que são “garanchoso”, com os quais \
me identifiquei, mas esses são vistos com certo desdém.","DYNIEWICZ, L. Disponível em: https://viagem.estadao.com.br. \
Acesso em: 22 nov. 2018 (adaptado).")

texto_apoio_34 = new Texto_apoio("","O Brasil somou cerca de 60 mil novos casos de câncer \
de mama até o final de 2019, número que corresponde a \
25% de todos os diagnósticos da condição registrados no \
país, segundo dados do Instituto Nacional do Câncer (Inca). \
Apesar de o Outubro Rosa ser o mês de conscientização \
sobre a questão voltada para as mulheres, é muito importante \
lembrar que um dos grandes mitos da medicina é o de que \
o câncer de mama não afeta o sexo masculino.\
 Fatores importantes para detectar o câncer de mama \
masculino:\
 1.     Genética: se houver casos na família, as chances são \
um pouco mais elevadas.\
 2.     Hormônios: homens podem desenvolver tecido real das \
glândulas mamárias por tomarem certos medicamentos \
ou apresentarem níveis hormonais anormais.\
 3.     Caroços: é necessário que os médicos se atentem a \
alguns sintomas suspeitos, como um caroço na área \
do tórax.\
 4.     Retração na pele: em situações mais graves do câncer \
de mama masculino, é possível também ocorrer uma \
retração do mamilo.","Disponível em: https://pebmed.com.br.  \
Acesso em: 24 nov. 2021 (adaptado).")

texto_apoio_35 = new Texto_apoio("Feijoada à minha moda","Amiga Helena Sangirardi\
 Conforme um dia prometi\
 Onde, confesso que esqueci\
 E embora — perdoe — tão tarde\
 (Melhor do que nunca!) este poeta\
 Segundo manda a boa ética\
 Envia-lhe a receita (poética)\
 De sua feijoada completa.\
 Em atenção ao adiantado\
 Da hora em que abrimos o olho\
 O feijão deve, já catado\
 Nos esperar, feliz, de molho.\
 Uma vez cozido o feijão\
 (Umas quatro horas, fogo médio)\
 Nós, bocejando o nosso tédio\
 Nos chegaremos ao fogão\
 [...]\
 De carne-seca suculenta\
 Gordos paios, nédio toucinho\
 (Nunca orelhas de bacorinho\
 Que a tornam em excesso opulenta!)\
 [...]\
 Enquanto ao lado, em fogo brando\
 Desmilinguindo-se de gozo\
 Deve também se estar fritando\
 O torresminho delicioso\
 Em cuja gordura, de resto\
 (Melhor gordura nunca houve!)\
 Deve depois frigir a couve\
 Picada, em fogo alegre e presto.\
 [...]\
 Dever cumprido. Nunca é vã\
 A palavra de um poeta... — jamais!\
 Abraça-a, em Brillat-Savarin,\
 O seu Vinicius de Moraes.","MORAES, V. In: CÍCERO, A.; QUEIROZ, E. (Org.). Vinicius de Moraes: \
 nova antologia poética. São Paulo: Cia. das Letras, 2005 (fragmento).")

 texto_apoio_36 = new Texto_apoio("TEXTO I","A fotografia de Regina Valkenborgh apresenta  \
2 953 arcos de luz cruzando o céu e registra o nascer e o pôr \
do sol ao longo de oito anos. Em 2012, essa estudante da \
Universidade de Hertfordshire colocou uma folha de papel \
fotográfico em uma lata com um pequeno orifício, criando \
assim uma câmera pinhole de baixa tecnologia. Porém, \
a lata foi esquecida em um telescópio no observatório da \
universidade. Esse projeto esquecido acabou revelando a \
foto do pôr do sol de maior exposição já tirada.", "SANTOS, A. Disponível em: https://socientifica.com.br. \
Acesso em: 13 nov. 2021 (adaptado).")

texto_apoio_37 = new Texto_apoio("","Os Jogos Olímpicos já não são mais os mesmos. \
E isso não é nem uma crítica, nem um elogio. É uma \
constatação. Esse movimento começou com o vôlei de \
praia tornando-se esporte olímpico em 1996, passou pela \
chegada do BMX Racing como primeiro “radical” a entrar \
no programa em 2008, e agora atinge seu momento mais \
insólito com a inclusão do break dance como modalidade \
dos Jogos de Paris, em 2024. Para os mais tradicionalistas, \
o cruzamento da linha que delimitava o que é esporte e o \
que é cultura e arte é uma afronta ao espírito dos Jogos \
Olímpicos. Skate e surfe, que há anos têm competições na \
televisão, pareciam estar na divisa entre esses dois mundos, \
o limite do aceitável pelos puristas. O break dance estaria \
do lado de “lá” dessa fronteira. Para o Comitê Olímpico \
Internacional, a decisão faz parte de uma estratégia de \
se comunicar com jovens urbanos que se exercitam e se \
entretêm de uma maneira muito diferente da dos seus avós."," Disponível em: www.uol.com.br. Acesso em: 19 nov. 2021 (adaptado).")

texto_apoio_38 = new Texto_apoio("Memes e fake news: o impacto na \
educação das crianças","Há quem diga que o Brasil nunca mais foi o mesmo \
depois dos memes. Na economia da velocidade, alguns \
apostam no humor, outros no engajamento político, e tem \
gente investindo alto na mentira também. Diante desse \
cenário, uma pergunta se torna essencial: será que todo \
mundo está conseguindo traduzir as mensagens postadas, \
curtidas e compartilhadas?\
 Essa dúvida incentivou uma professora de língua \
portuguesa a desenvolver uma proposta de leitura e análise \
crítica de memes com estudantes do ensino fundamental, na \
rede pública do Distrito Federal, na cidade de Samambaia. \
“Percebi que muitos alunos e pais estavam divulgando \
conteúdos sem saber o que havia por trás das palavras”, \
relata a professora.\
 “O que antes era engraçado para os alunos passou \
a ser visto com outros olhos”, afirma a professora. Para \
ela, que utilizou a representação da criança em memes \
de WhatsApp como material gerador das discussões em \
sala de aula, aguçar o olhar sobre essas mensagens \
impacta diretamente a atitude de postar, curtir e compartilhar \
conteúdos ao estimular o uso consciente da informação \
que circula nas plataformas de mídia social.\
 Letramento político e midiático é um desafio \
intergeracional. Em tempos de notícias falsas, de imagens \
manipuladas e de memes sendo usados como triunfo \
da verdade de cada um, checagem de informação e \
interpretação de texto acabam se tornando moedas valiosas."," Disponível em: https://lunetas.com.br. Acesso em: 15 jan. 2024 (adaptado).")

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

const questao_16 = new Questao(" Na letra da canção, a tematização da violência mencionada \
no Texto II manifesta-se",["A como metáfora da desigualdade, que associa a ideia de \
justiça a valores históricos negativos.",
"B na referência a termos bélicos, que sinaliza uma crítica \
social à opressão da população das periferias.",
"C como procedimento metalinguístico, que concebe a \
palavra como uma forma de combate e insubordinação.",
"D nas definições ambíguas do enunciador, que inverte e \
relativiza as representações da maldade e da bondade.",
"E na menção à imortalidade, que sugere a possibilidade de \
resistência para além da dicotomia entre vida e morte."
],[texto_apoio_16,texto_apoio_17],false,"c")

const questao_17 = new Questao(" Ainda que faça uma avaliação positiva da série, nessa \
resenha, o autor aponta aspectos negativos da obra ao utilizar",["A marcas de impessoalidade que disfarçam a opinião do \
especialista.", "B  expressões adversativas para fazer ressalvas às \
afirmações elogiosas.", "C interlocução com o leitor para corroborar opiniões \
contrárias à adaptação.", "D  eufemismos que minimizam as críticas feitas à \
construção das personagens.", "E antíteses que opõem a fragilidade do roteiro à beleza \
da trilha sonora da série."],[texto_apoio_18],false,"b")

const questao_18 = new Questao("Nesse fragmento, a discussão dos personagens traz à \
cena um debate acerca da escrita que",["A diferencia a produção artística do registro padrão da língua.",
    "B aproxima a literatura de dialetos sociais de pouco prestígio.",
    "C defende a relação entre a fala e o estilo literário de um autor.",
    "D contrapõe o preciosismo linguístico a situações de \
coloquialidade.",
"E associa o uso da norma culta à ocorrência de \
desentendimentos pessoais."
],[texto_apoio_19],false,"d")

const questao_19 = new Questao("Eliseu D’Angelo Visconti (1866-1944) desenvolveu diversas \
obras no Brasil, com grande influência das escolas \
europeias. Em sua pintura Três meninas no jardim, há",["A culto à fluidez e ao progresso, nos moldes do ideário \
futurista.", "B valorização de formas decompostas, a exemplo do \
estilo cubista.", "C efeitos fugazes de luz e movimento, que remetem à \
estética impressionista.", "D expressão do sonho e do inconsciente, que dialoga \
com a proposta surrealista.", "E tematização de elementos cotidianos, que resgata \
modelos de representação da arte realista."],false,[imagem_apoio_1], "c")

const questao_20 = new Questao("Segundo o texto, apesar do aumento da participação de \
mulheres em lutas, a realidade na escola ainda é diferente \
em razão do(a)",["A esportivização desse conteúdo.",
    "B masculinização dessa modalidade.",
    "C enfoque desses eventos pela mídia.",
    "D trato pedagógico dessa manifestação.",
    "E marginalização desse tema pela Educação Física."
],[texto_apoio_20],false,"b")

const questao_21 = new Questao("Como estratégia para se aproximar de seu leitor, a autora \
usa uma postura de empatia explicitada em",["A  “Volta e meia recebo cartinhas de fãs, e alguns são \
bem jovens”.", "B  “Fico no céu lendo essas coisas”.",
"C “Sinto que é mais complicado ser jovem hoje”.",
"D  “Queria dar beijinhos e carinhos sem ter fim nessa moçada”.",
"E “Diria que não é sinal de saúde estar bem-adaptado a \
uma sociedade doente”."],[texto_apoio_21],false,"c")


const questao_22 = new Questao("Para apresentar a apropriação literária que faz da obra de \
Machado de Assis, o autor desse texto",["A relaciona aspectos centrais da obra original e, então, \
reafirma o ponto de vista adotado.", "B explica os pontos de vista de críticos da literatura e, \
por fim, os redimensiona na discussão.","C introduz elementos relevantes da história e, na sequência, \
apresenta motivos para refutá-los.","D justifica as razões pelas quais adotou certa abordagem \
e, em seguida, reconsidera tal escolha.","E contextualiza o enredo de forma subjetiva e, na conclusão, \
explicita o foco narrativo a ser assumido."],[texto_apoio_22],false,"e")

const questao_23 = new Questao(" Das reflexões do narrador, apreende-se uma perspectiva \
que associa a adoção",["A a representações sociais estigmatizadas da parentalidade.",
    "B à necessidade de aprovação por parte de desconhecidos.",
    "C ao julgamento velado de membros do núcleo familiar.",
    "D ao conflito entre o termo técnico e o vínculo afetivo.",
    "E a inquietações próprias das relações entre irmãos."
],[texto_apoio_23],false,"a")

const questao_24 = new Questao(" No que diz respeito à arte, o posicionamento de Antônio \
Prata, no Texto II, aproxima-se da tese de Graciliano Ramos, \
no Texto I, uma vez que ambos", ["A defendem a dignidade do ofício dos artistas.",
    "B concluem que a arte reforça crenças pessoais.",
    "C apresentam a pobreza como inspiração para a arte.",
    "D afirmam o necessário caráter desestabilizador da arte.",
    "E atestam que há mudanças significativas na produção \
artística."
],[texto_apoio_24, texto_apoio_25],false,"d")

const questao_25 = new Questao("Convidada para o último baile do Império, na Ilha Fiscal, \
localizada no Rio de Janeiro, Flora devaneia sobre \
aspectos daquele contexto, no qual o narrador ironiza a",["A promessa de esperança com o futuro regime.",
    "B alienação da elite em relação ao fim da monarquia.",
    "C perspectiva da contemplação distanciada da capital.",
    "D animosidade entre população e membros da nobreza.",
    "E fantasia de amor e de casamento da mulher burguesa."
],[texto_apoio_26],false,"b")

const questao_26 = new Questao("Nesse trecho, o drama do declínio físico da narradora \
transmite uma sensibilidade lírica centrada na",["A necessidade de fazer adaptações na casa.",
    "B atmosfera de afeto fortalecido pelo convívio.",
    "C condição de dependência de outras pessoas.",
    "D determinação de manter a regularidade da rotina",
    "E aceitação das restrições de mobilidade da personagem."
],[texto_apoio_27],false,"b")

const questao_27 = new Questao("Nesse cartaz, a expressão “Vou deixar que você se vá”, \
em conjunto com os elementos não verbais utilizados, \
tem a finalidade de",["A incentivar o descarte de itens defeituosos.",
    "B promover a reciclagem de produtos usados.",
    "C garantir a conservação de roupas de inverno.",
    "D relacionar o gesto de doação à ideia de desapego.",
    "E comparar a peça de roupa ao sentimento de despedida."
],false,[imagem_apoio_2],"d")

const questao_28 = new Questao(" De acordo com esse texto, o aplicativo Linklado contribuiu \
para a",["A criação de fonemas representativos de línguas indígenas \
no meio digital.",
"B democratização do registro escrito de línguas dos povos \
originários.","C adaptação de regras de jogos de tabuleiro de origem \
indígena.", "D divulgação das técnicas de tradução de línguas indígenas.",
"E aprendizagem da lingua portuguesa pelos indígenas."],[texto_apoio_28],false,"b")


const questao_29 = new Questao("Ao tematizar o casamento, esse fragmento reproduz uma concepção de literatura romântica evidenciada na",["A defesa da igualdade de gêneros.",
    "B importância atribuída à castidade.",
    "C indignação com as injustiças sociais.",
    "D  interferência da riqueza sobre o amor.",
    "E valorização das relações interpessoais."
],[texto_apoio_29],false,"d")

const questao_30 = new Questao("A leitura comparativa das duas esculturas, separadas por mais de 2 500 anos, indica a",["A valorização da arte antiga por artistas contemporâneos.",
    "B resistência da arte escultórica aos avanços tecnológicos.",
    "C simplificação da forma em razão do tipo de material utilizado.",
    "D persistência de padrões estéticos em diferentes épocas e culturas.",
    "E ausência de detalhes como traço distintivo da arte tradicional popular."
],false,[imagem_apoio_3,imagem_apoio_4],"d")

const questao_31 = new Questao("Defendendo a importância da música para o bem-estar e \
o equilíbrio emocional das pessoas, a autora usa, como \
recurso persuasivo, a",["A contradição, ao associar o coração despedaçado  \
à alegria.", "B metáfora, ao citar a imagem da metamorfose ambulante.",
"C intertextualidade, ao resgatar versos de letras de canções.",
"D enumeração, ao mencionar diferentes ritmos musicais.",
"E hipérbole, ao falar em “sofrência”, “tragédias” e “afogados”."],[texto_apoio_30],false,"c")

const questao_32 = new Questao(" Esse poema, por meio da ideia de deslocamento, metaforiza \
a tentativa de pessoas",["A buscarem novos encontros.",
    "B fugirem da própria identidade.",
    "C procurarem lugares inexplorados.",
    "D partirem em experiências inusitadas.",
    "E desaparecerem da vida em sociedade."
],[texto_apoio_31],false,"b")

const questao_33 = new Questao("O “falar errado” a que o texto se refere constitui um \
preconceito em relação ao uso que Adoniran Barbosa \
fazia da língua em suas composições, pois esse uso", ["A marcava a linguagem dos comediantes no mesmo \
período.", "B prejudicava a compreensão das canções pelo público.",
"C denunciava a ausência de estilo nas letras de canção.",
"D restringia a criação poética nas letras do compositor.",
"E transgredia a norma-padrão vigente à época."],[texto_apoio_32],false,"e")

const questao_34 = new Questao("A apropriação de elementos como rivalidade, competitividade, \
torcida e gritos de guerra pelo festival de Parintins evidencia a",["A escolha de um local específico para a festa.",
    "B importância atribuída pelos turistas aos bois.",
    "C interação social estabelecida após o evento.",
    "D aproximação da manifestação folclórica com o esporte.",
    "E composição de enredos musicais pelos “garanchosos”."
],[texto_apoio_33],false,"d")

const questao_35 = new Questao("As informações dessa reportagem auxiliam no combate \
ao câncer de mama masculino por apresentarem um \
alerta sobre o(s)",["A sinais indicadores da doença.",
    "B índice de crescimento de casos.",
    "C exames para diagnóstico do tumor.",
    "D mitos a respeito da herança genética.",
    "E período de campanhas de conscientização."
],[texto_apoio_34],false,"a")

const questao_36 = new Questao("Apesar de haver marcas formais de carta e receita, \
a característica que define esse texto como poema \
é o(a)",["A nomeação de um interlocutor.",
    "B manifestação de intimidade.",
    "C descrição de procedimentos.",
    "D utilização de uma linguagem expressiva.",
    "E apresentação de ingredientes culinários."
],[texto_apoio_35],false,"d")

const questao_37 = new Questao(" O experimento realizado por Regina Valkenborgh resultou \
no entendimento de que a", ["A técnica fotográfica alternativa limita o registro de imagens.",
    "B apreciação da natureza depende de registro fotográfico.",
    "C criatividade artística decorre do conhecimento científico.",
    "D câmera de criação caseira tem valor tecnológico.",
    "E produção artística pode ser resultado do acaso."
],[texto_apoio_36],[imagem_apoio_5],"e")

const questao_38 = new Questao("A mudança no programa olímpico mencionada no texto \
mostra que o esporte está se",["A aproximando da aventura.",
    "B mantendo em sua forma padrão.",
    "C tornando uma forma de dança.",
    "D afastando de elementos culturais.",
    "E adaptando às demandas do seu tempo."
],[texto_apoio_37],false,"e")

const questao_39 = new Questao("Ao abordar a relação dos memes com a educação,  \
a reportagem sustenta uma crítica à",["A falta de fiscalização no uso de aplicativos de mensagens \
por crianças.", "B divulgação de informação manipulada em postagens \
virtuais.", "C utilização de ferramentas digitais no trabalho \
educacional.", "D exploração de conteúdos humorísticos nas mídias \
sociais.", "E propagação de mensagens com objetivos políticos."],[texto_apoio_38],false,"b")


///LISTA PRINCIPAL

const lista_de_questoes = [questao_0, questao_1,questao_2,questao_3,questao_4,
     questao_5,questao_6,questao_7,questao_8,questao_9,questao_10,questao_11,
    questao_12,questao_13,questao_14,questao_15,questao_16,questao_17,questao_18,
questao_19,questao_20,questao_21,questao_22,questao_23,questao_24,questao_25,questao_26,
questao_27,questao_28,questao_29,questao_30,questao_31,questao_32,questao_33,questao_34,
questao_35,questao_36,questao_37,questao_38,questao_39]

botao_proxima.addEventListener("click", function(){
    proximaQuestao(lista_de_questoes)
})

botao_anterior.addEventListener("click", function(){
    questaoAnterior(lista_de_questoes)
})




sortearQuestao(lista_de_questoes)
