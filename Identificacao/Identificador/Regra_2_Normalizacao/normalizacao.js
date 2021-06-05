/*
 * Normalização
 *
 * Mestrando  : Geandro Matos
 * Colaboradores : Murilo Matos
 * Data    : 08 de janeiro de 2021
 * Curso de mestrado: Ciência da computação
 * Nome do arquivo: normalizacao.js
 *
 * Este script tem como objetivo normalizar a relação entre objetos e propriedades
 * para produzir as chamadas que dão origem ao escopo normalizado.
 * 
 * Essa regra recebe como entrada um escopo reduzido, que é uma estrutura de dados resultante da fase de
 * extração, recebe também os dicionários: dicionario_De_BF_01, dicionario_De_BF_02_Alto, dicionario_De_BF_02_Medio, 
 * dicionario_De_BF_02_Baixo e dicionario_De_BF_02_Completo
 * 
 * Requerimentos: fs 
/*****************************************************************************
    *BIBLIOTECAS
******************************************************************************/
const fs = require('fs')
/*****************************************************************************
    *FUNÇÃO MAIN()
******************************************************************************/
//Função main() é a responsável pela a exportação da "regra 2 - normalização" para a "regra 1 - extração"
module.exports = function main(nome_raiz,nome_arquivo) {
  //Variável "final_result" recebe o resultado da função verificação
  final_result = verificacao(nome_raiz,nome_arquivo)
  //O resultado da função verificação é retornado
  return final_result
}
/*****************************************************************************
    *ESCOPOS
******************************************************************************/
/*O processo de correspondência utiliza o ECT para salvar os valores de objetos e propriedades que serão utilizados pela ferramenta de produção.
Esse escopo temporário é limpo pelo processo de verificação. Foi declarado fora da função verificação para tornar seu acesso mais prático */
ECT = []
/*O escopo normalizado é o resultado da normalização da relação entre objetos e propriedades
para produzir as chamadas. Foi declarado fora da função verificação para tornar seu acesso mais prático*/
escopoNormalizado = []
//Variável "listaSites" recebe um escopo que irá armazenar os nomes dos sites analisados
listaSites = []
//Variável "riscoSites" recebe um escopo que irá armazenar os riscos dos sites analisados
riscoSites = []
/*****************************************************************************
    *FERRAMENTAS DE SUPORTE EXTERNAS
******************************************************************************/
/*O dicionário de BF 01 será utilizado durante a execução da regra 2 - normalização servindo como ferramenta de suporte externa, 
para que as comparações sejam realizadas durante a normalização das chamadas*/
const dicionario_De_BF_01 = require('./dicionarios').dicionario_De_BF_01
/*A finalidade do dicionário de BF 02 completo é ser utilizado durante a regra de classificação, onde ele 
será aplicado, permitindo que sejam apenas classificadas chamadas que estejam em conformidade com seus termos*/
const dicionario_De_BF_02_Completo = require('./dicionarios').dicionario_De_BF_02_Completo
//Resultado da conversão para ajustar o dicionário de BF 02 completo aos níveis classificatórios, utilizado na classificação
const dicionario_De_BF_02_Alto = require('./dicionarios').dicionario_De_BF_02_Alto
const dicionario_De_BF_02_Medio = require('./dicionarios').dicionario_De_BF_02_Medio
const dicionario_De_BF_02_Baixo = require('./dicionarios').dicionario_De_BF_02_Baixo
/*****************************************************************************
    *REGRA 2 - NORMALIZAÇÃO - PROCESSO DE VERIFICAÇÃO
******************************************************************************/
//processos da normalização - verificação
function verificacao(nome_raiz,nome_arquivo) {
  /*O dicionário de identificadores é uma estrutura de dados baseada em objetos. É usado pelo processo de verificação para armazenar
  referências a casos especiais como b.appName e pelo processo de comparação para avaliar o valor das chaves geradas pela verificação*/
  this.dicionarioID = []
  //O "dicionarioID_2" funciona como uma sombra do dicionário de identificadores, apenas sendo criado para facilitar os acesso aos objetos
  this.dicionarioID_2 = []
  //O escopo "lixao" é criado para armazenar caso descartados
  let lixao = []
  //"lixo" recebe o resultado da função " funcao_lixeira()" que verifica se um caso deve ser descartado ou não
  let lixo = ''
  //"DIT" é um escopo que impede que chaves repetidas sejam inseridas no dicionário de identificadores
  let DIT = []
  //"chaveValor" é um objeto que armazena o par chave e valor corrente que posteriormente será inserido no dicionário de identificadores
  let chaveValor = {}
  //"informacao_chamada" armazena dados da chamada para a contrução do escopo normalizado
  let informacao_chamada = {}
  //Laço que percorre o escopo reduzido
  for (indice in escopoReduzido) {
    //"this.dados" recebe o elemento corrente do escopo reduzido
    [this.dados] = [escopoReduzido[indice]]
    //É verificado se o elemento é discartável
    lixo = funcao_lixeira(lixao)
    //Se a variável "lixo" for igual a 1, então o elemento é discartável e a execução segue para a próxima linha do escopo reduzido
    if (lixo == 1) {
      lixo = 0
    }
    //Caso o elemento seja válido a execução continua na mesma linha 
    else {
      /*Caso identificador direito não exista, isso significa que uma expressão que consiste de um identificador que recebe como
      atribuição a expressão b = navigator.appName foi detectada.*/
      if (this.dados.IDD == '') {
        //A função da compração é chamada
        comparacao(informacao_chamada, lixao)
        //Se o ECT estiver vazio ou só possuir 1 elemento a execução segue para a próxima linha do escopo reduzido
        if (ECT == '' || ECT.length < 2) {
          ECT = []
        }
        //Caso o ECT não esteja vazio, a função "producaoObj" é chamada e seu resultado é inserido no escopo normalizado
        else {
          //"produto" recebe o resultado da função "producaoObj()"
          produto = producaoObj(informacao_chamada, indice)
          //Se a produção tiver sucesso em formar uma chamada os dados desta chamada são enviados para o escopo normalizado
          if(!!produto != false){
          escopoNormalizado.push(produto)
          }
          //O objeto "informacao_chamada" é limpo
          informacao_chamada = {}
          //A função limpeza é invocada para limpar o ECT
          limpeza()
        }
      }
      //Caso o Identificador Direito exista, ela ignora a verificação de objetos e propriedades
      else {
        //Verifica-se novamente a existência do identificador direito
        if (!!this.dados.IDD != false) {
          //Se ele existir o seu valor é atribuído para a variável "valor"
          let valor = this.dados.IDD
          //Verifica-se a existência do identificador esquerdo
          if (!!this.dados.IDE != false) {
            //Se ele existir o seu valor é atribuído para a variável "chave"
            let chave = this.dados.IDE
            /*A variável "valor_igual" é inicializada em 0 e possui a função de verificar se a chave encontrada é igual ao valor encontrado,
            como em: j = j*/
            valor_igual = 0
            //Se o valor for igual a chave então o objeto "chaveValor" é limpo e a variável "valor_igual" recebe +1
            if(valor == chave){
              chaveValor = {}
              valor_igual++
            }
            //Se o valor não for igual a chave é criado o par chave e valor
            else{
             /*2 pares de chave e valor são criados:
              *No 1º o objetivo é inserir o nome da chave que corresponde ao valor encontrado
              *No 2º o objetivo é acessar o valor da chave*/
              //1º par chave e valor
              chaveValor = {
                [chave]: valor
              }
              //2º par chave e valor
              chave = {
                chave: valor
              }
            }
            //"valor_repetido" existe para verificar se existe algum par chave e valor repetido
            valor_repetido = 0
            //Um laço percorre o dicionário de identificadores
            for(repeticao in this.dicionarioID){
              //A varíavel "repetido" recebe a chave do par chave e valor corrente
              repetido = Object.keys(this.dicionarioID[repeticao])
              //Se a variável "repetido" for igual a chave do par chave e valor criado, então o par chave e valor mais recente prevalece
              if(repetido[0] == Object.keys(chaveValor)){
                //O par chave e valor criado recentemente substitui o antigo
                DIT[repeticao] = chaveValor
                //O dicionário de identificadores recebe "DIT"
                this.dicionarioID = DIT
                //O dicionário de identificadores 2 recebe o 2º par chave e valor criado
                this.dicionarioID_2[repeticao] = chave
                //A variável "valor_repetido" recebe +1
                valor_repetido++
              }
            }
            /*Se a variável "valor_repetido" for igual a 0 e "valor_igual" for igual 0, então singnifica que nenhuma chave e valor iguais 
            foram encontrados e nenhum par chave e valor iguais foram encontrados*/
            if(valor_repetido == 0 && valor_igual == 0){
              //"DIT" recebe o novo par chave e valor
              DIT.push(chaveValor)
              /*O dicionário de identificadores recebe DIT, e desta forma é criado dinamicamente, sendo uma ferramenta 
              de suporte interna da verificação oferecendo suporte para a comparação */
              this.dicionarioID = DIT 
              /*o dicionário de identificadores 2 recebe o segundo par chave e valor criado, o qual possui o objetivo de
              acessar o valor da chave*/
              this.dicionarioID_2.push(chave)
            }
          }
        }
      }
    }
  }
  //A regra 3 - classificação é invocada e o seu resultado gera o escopo classificado
  escopoClassificado = regra_3(lixao, escopoNormalizado, dicionario_De_BF_02_Completo, dicionario_De_BF_02_Alto,
                                     dicionario_De_BF_02_Medio, dicionario_De_BF_02_Baixo)
  //Se o escopo classificado não estiver vazio, então seus dados são copiados para outros escopos                                  
  if(!!escopoClassificado != false){
    //O escopo listaSites recebe o nome do arquivo corrente 
    listaSites.push(nome_arquivo)
    //"risco_site" armazena o risco do site
    risco_site = ''
    risco_site = niveis(escopoClassificado.pop().risco_da_pagina)
    //"riscoSites" recebe o risco do site corrente, e cria uma lista possuindo os riscos analisados
    riscoSites.push(risco_site)
  }

  //Se o escopo classificado não estiver vazio então é retornado "\n:]" para indicar que o processo teve sucesso
  if (!!escopoClassificado != false) {

    //O dicionário de identificadores é salvo em um arquivo com extensão ".csv"
    fs.writeFile(`/WBF_analyzer/resultados/dicionario_ID/${nome_raiz}/${arquivo(nome_arquivo)}.csv`, `${f_DicionarioID_CSV()}`, function (err) {
      if (err) return console.log(err);
    });
    //O escopo normalizado é salvo em um arquivo com extensão ".csv"
    fs.writeFile(`/WBF_analyzer/identificacao/identificador/Regra_2_Normalizacao/Escopos_normalizados/${nome_raiz}/${arquivo(nome_arquivo)}.csv`, `${escopoNormalizadoCSV()}`, function (err) {
      if (err) return console.log(err);
    });
    //O escopo classificado é salvo em um arquivo com extensão ".csv"
    fs.writeFile(`/WBF_analyzer/identificacao/identificador/Regra_3_Classificacao/Escopos_classificados/${nome_raiz}/${arquivo(nome_arquivo)}.csv`, `${escopoClassificadoCSV()}`, function (err) {
      if (err) return console.log(err);
    });
    //O lixão é salvo em um arquivo com extensão ".csv"
    fs.writeFile(`/WBF_analyzer/resultados/lixao/${nome_raiz}/${arquivo(nome_arquivo)}.csv`, `${lixaoCSV(lixao)}`, function (err) {
      if (err) return console.log(err);
    });
    //Os riscos dos sites são salvos em um arquivo com extensão ".csv"
    fs.writeFile(`/WBF_analyzer/resultados/risco_temp/${nome_raiz}/dados.csv`, `${dadosCSV()}`, function (err) {
      if (err) return console.log(err);
    });
    //O escopo normalizado é limpo
    escopoNormalizado = []
    return `\n:]`
  }
  //Se o escopo classificado estiver vazio então é retornado "\n:(" para indicar que o processo não teve sucesso
  else{
    return  '\n:('
  }
}
/*****************************************************************************
    *PRODUÇÃO - FERRAMENTA DE SUPORTE DA VERIFICAÇÃO
******************************************************************************/
function producaoObj(informacao_chamada, indice) { 
  //"produto1" irá armazenar o 1º elemento do ECT e também evitar que elementos repetidos sejam inseridos
  let produto1 = ''
  //"produto2" irá armazenar e concatenar os elementos restantes do ECT, e no final concatenará com "produto1"
  let produto2 = ''
  //"resutado" recebe o resultado final
  let resultado = ''
  //"palavra" evita que elementos repetidos sejam inseridos
  let palavra = ''
  //"contador_chamada" irá indicar a quantidade de chamadas normalizadas
  let contador_chamada = 0
  //Um lçao percorre o ECT
  for (i in ECT) {
    //Se "produto1" estiver vazio então o 1º elemento do ECT é atribuído para "produto1"
    if (produto1 == '') {
      produto1 += ECT[i]
    }
    //Caso "produto1" não estiver vazio, então a execução segue normalmente 
    else {
      /*Se o elemento corrente for igual a "produto1", significa que foi encontrado um caso onde:
       *'navigator.navigator.appName', logo, a execução examina o próximo elemento
       */
      if (produto1 == ECT[i]) {
        i++
      }
      //Caso "produto1" não seja igual ao elemento corrente, a execução segue normalmente 
      else {
       /*Se o elemento corrente for igual a "palavra", significa que foi encontrado um caso onde:
       *'window.navigator.navigator.bluetooth', logo, a execução examina o próximo elemento
       */
        if (palavra == ECT[i]) {
          i++
        }
        //Caso "palavra" não seja igual ao elemento corrente, a execução segue normalmente 
        else {
          //produto2 recebe concatena os elementos com a iserção do símbolo "."
          produto2 += "." + ECT[i]
          //palavra recebe o elemento corrente para verificar a repetição de elementos
          palavra = ECT[i]
        }
      }
    }
  }
  //"resutado" recebe a chamada concatenada
  resultado = produto1 + produto2
  //Se uma chamada não tiver sido produzida é retornado um booleano negativo
  if(resultado.split('.').length == 1){
    return ''
  }
  //Se uma chamada tiver sido produzida é retornado os dados da chamada
  else{
    //"contador_chamada" é incremetado pois uma chamada foi normalizada
    contador_chamada++
    //A linha do escopo reduzido onde a chamada foi encontrada é adicionada ao objeto "informacao_chamada"
    informacao_chamada.linha = indice
    //A quantidade de chamadas normalizadas é adicionada ao objeto "informacao_chamada"
    informacao_chamada.quantidade = contador_chamada
    //A chamada concatenada é adicionada ao objeto "informacao_chamada"
    informacao_chamada.chamada = resultado
    //O resultado da produção é retornado

    return informacao_chamada 
  }
}
/*****************************************************************************
    *LIMPEZA DO ECT - FUNÇÃO DA VERIFICAÇÃO
******************************************************************************/
function limpeza() {
  //O ECT é limpado
  ECT = []
}

/*FIM DA VERIFICAÇÃO
______________________________________________________________________________________________________________________________________________________________*/

/*****************************************************************************
    *REGRA 2 - NORMALIZAÇÃO - PROCESSO DE COMPARAÇÃO SIMPLES
******************************************************************************
      Exemplos que a comparação simples resolve:
      A = navigator.appName
______________________________________________________________________________________________________________________________________________________________
COMPARAÇÃO DO OBJETO 0*/
function comparacao(informacao_chamada, lixao) {
  //"objetoOuPropri" incializa em 0 e indicará se chamada existe ou não nos dicionários
  let objetoOuPropri = 0
  //Um laço percorre o dicionário de BF 01 a procura do token que corresponde ao elemento existente no objeto 0
  for (i in dicionario_De_BF_01) {
    /*Se o objeto 0 for igual a algum token do dicionário de BF 01, então seu valor é atribuído
    para a variável "objetoOuPropri" e o processo de correspodência é chamado*/
    if (this.dados.obj0 == dicionario_De_BF_01[i]) {
      objetoOuPropri = this.dados.obj0
      correspondencia(objetoOuPropri)
    }
  }
  /*Se a variável "objetoOuPropri" for igual a 0, significa que o elemento existente no objeto 0
  não foi encontrado no dicionário de BF 01, então invoca-se o processo da comparação especial*/
  if (objetoOuPropri == 0) {
    buscaTopDown_obj0(objetoOuPropri, informacao_chamada)
    objetoOuPropri = 1
  }
  //Se após o processo da comparação especial o valor do objeto 0 ainda não tiver sido encontrado, o valor vai para o lixão
  if (objetoOuPropri == 0) {
    if (!!this.dados.obj0 == false) {} else {
      lixao.push(this.dados.obj0)
    }
  }
  //Caso o valor tenha sido encontrado, a variável "objetoOuPropri" é reiniciada em 0 para armazenar outros valores  
  else {
    objetoOuPropri = 0
  }/*
______________________________________________________________________________________________________________________________________________________________
COMPARAÇÃO DO OBJETO 1*/
  //Um laço percorre o dicionário de BF 01 a procura do token que corresponde ao elemento existente no objeto 1
  for (i in dicionario_De_BF_01) {
    /*Se o objeto 1 for igual a algum token do dicionário de BF 01, então seu valor é atribuído
    para a variável "objetoOuPropri" e o processo de correspodência é chamado*/
    if (this.dados.obj1 == dicionario_De_BF_01[i]) {
      objetoOuPropri = this.dados.obj1
      correspondencia(objetoOuPropri)
    }
  }
  /*Se a variável "objetoOuPropri" for igual a 0, significa que o elemento existente no objeto 1
  não foi encontrado no dicionário de BF 01, então invoca-se o processo da comparação especial*/
  if (objetoOuPropri == 0) {
    buscaTopDown_obj1(objetoOuPropri, informacao_chamada)
    objetoOuPropri = 1
  }
  //Se após o processo da comparação especial o valor do objeto 1 ainda não tiver sido encontrado, o valor vai para o lixão
  if (objetoOuPropri == 0) {
    if (!!this.dados.obj1 == false) {} else {
      lixao.push(this.dados.obj1)
    }
  }
  //Caso o valor tenha sido encontrado, a variável "objetoOuPropri" é reiniciada em 0 para armazenar outros valores  
  else {
    objetoOuPropri = 0
  }/*
______________________________________________________________________________________________________________________________________________________________
COMPARAÇÃO DO OBJETO 2*/
  //Um laço percorre o dicionário de BF 01 a procura do token que corresponde ao elemento existente no objeto 2
  for (i in dicionario_De_BF_01) {
    if (this.dados.obj2 == dicionario_De_BF_01[i]) {
      objetoOuPropri = this.dados.obj2
      correspondencia(objetoOuPropri)
    }
  }
  /*Se a variável "objetoOuPropri" for igual a 0, significa que o elemento existente no objeto 2
  não foi encontrado no dicionário de BF 01, então invoca-se o processo da comparação especial*/
  if (objetoOuPropri == 0) {
    buscaTopDown_obj2(objetoOuPropri, informacao_chamada)
    objetoOuPropri = 1
  }
  //Se após o processo da comparação especial o valor do objeto 2 ainda não tiver sido encontrado, o valor vai para o lixão
  if (objetoOuPropri == 0) {
    if (!!this.dados.obj2 == false) {} else {
      lixao.push(this.dados.obj2)
    }
  }
  //Caso o valor tenha sido encontrado, a variável "objetoOuPropri" é reiniciada em 0 para armazenar outros valores  
  else {
    objetoOuPropri = 0
  }/*
______________________________________________________________________________________________________________________________________________________________
COMPARAÇÃO DA PROPRIEDADE 1*/
  //Um laço percorre o dicionário de BF 01 a procura do token que corresponde ao elemento existente na propriedade 1
  for (i in dicionario_De_BF_01) {
    if (this.dados.propri1 == dicionario_De_BF_01[i]) {
      objetoOuPropri = this.dados.propri1
      correspondencia(objetoOuPropri)
    }
  }
  /*Se a variável "objetoOuPropri" for igual a 0, significa que o elemento existente na propriedade 1
  não foi encontrado no dicionário de BF 01, então invoca-se o processo da comparação especial*/
  if (objetoOuPropri == 0) {
    buscaTopDown_propri1(objetoOuPropri, informacao_chamada)
    objetoOuPropri = 1
  }
  //Se após o processo da comparação especial o valor da propriedade 1 ainda não tiver sido encontrado, o valor vai para o lixão
  if (objetoOuPropri == 0) {
    if (!!this.dados.propri1 == false) {} else {
      lixao.push(this.dados.propri1)
    }
  }
  //Caso o valor tenha sido encontrado, a variável "objetoOuPropri" é reiniciada em 0 para armazenar outros valores  
  else {
    objetoOuPropri = 0
  }/*
______________________________________________________________________________________________________________________________________________________________
COMPARAÇÃO DA PROPRIEDADE 2*/
  //Um laço percorre o dicionário de BF 01 a procura do token que corresponde ao elemento existente na propriedade 2
  for (i in dicionario_De_BF_01) {
    if (this.dados.propri2 == dicionario_De_BF_01[i]) {
      objetoOuPropri = this.dados.propri2
      correspondencia(objetoOuPropri)
    }
  }
  /*Se a variável "objetoOuPropri" for igual a 0, significa que o elemento existente na propriedade 2
  não foi encontrado no dicionário de BF 01, então invoca-se o processo da comparação especial*/
  if (objetoOuPropri == 0) {
    buscaTopDown_propri2(objetoOuPropri, informacao_chamada)
    objetoOuPropri = 1
  }
  //Se após o processo da comparação especial o valor da propriedade 2 ainda não tiver sido encontrado, o valor vai para o lixão
  if (objetoOuPropri == 0) {
    if (!!this.dados.propri2 == false) {} else {
      lixao.push(this.dados.propri2)
    }
  }
  //Caso o valor tenha sido encontrado, a variável "objetoOuPropri" é reiniciada em 0 para armazenar outros valores    
  else {
    objetoOuPropri = 0
  }
}
/*****************************************************************************
    *REGRA 2 - NORMALIZAÇÃO - PROCESSO DE COMPARAÇÃO ESPECIAL
    *OFUSCAÇÃO DE STRING DE SUBSTITUIÇÃO DE PALAVRA CHAVE
******************************************************************************
      Exemplos que a comparação epecial resolve:
      A = navigator
      A.appName
      -------------------------------------------------------------------------
      a = navigator
      b = a
      c = b
      d = c
      h = d.plugins
______________________________________________________________________________________________________________________________________________________________
*AVALIAÇÃO TOP DOWN
--------------------------------------------------------------------------------------------------------------------------------------------------------------
COMPARAÇÃO ESPECIAL DO OBJETO 0*/
function buscaTopDown_obj0(objetoOuPropri) {
  /*Avalia-se o dicionário de identificadores procurando por uma chave que seja
  igual ao valor do objeto que a comparação está avaliando*/
  for (c in this.dicionarioID) {
    //"objetoTemp" recebe o par chave e valor corrente no dicionário de identificadores
    let [objetoTemp] = [this.dicionarioID[c]]
    //"chaveTemp" recebe a chave corrente no dicionário de identificadores
    let chaveTemp = Object.getOwnPropertyNames(objetoTemp)
    //Ao encontrar um valor de chave que seja igual ao valor do objeto avaliado ela acessa e avalia o valor da chave 
    if (chaveTemp == this.dados.obj0) {
      //"valorID" recebe o valor da chave
      let valorID = this.dicionarioID_2[c]
      //Se o valor da chave existir no dicionário de BF 01, a comparação chama a correspondência
      for (i in dicionario_De_BF_01) {
        //Verifica-se se valor da chave existe no dicionário de BF 01
        if (valorID.chave == dicionario_De_BF_01[i]) {
          //Se o valor existir a variável "objetoOuPropri" recebe o valor da chave
          objetoOuPropri = valorID.chave
          /*O processo de correspondência é chamado pois ele é responsável por salvar no ECT os objetos e propriedades
          que foram aprovados pela comparação.*/
          return correspondencia(objetoOuPropri)
        }
      }
      /*Compara-se o valor da chave corrente com ele mesmo apenas para confirmar que a busca top down não obteve sucesso,
       pois se o valor ainda for o mesmo, significa que a correspondência não foi chamada e o processo não foi reinciado*/
      if (valorID == this.dicionarioID_2[c]) {
        /*Se o valor da chave não existir no dicionário de BF 01 uma a comparação Botton up é iniciada,
        comparando o valor da chave corrente com a chave anterior do dicionário de identificadores*/
        return buscaButtomUp(valorID, c, objetoOuPropri)
      }
    }
  }
}/*
______________________________________________________________________________________________________________________________________________________________
COMPARAÇÃO ESPECIAL DO OBJETO 1*/
function buscaTopDown_obj1(objetoOuPropri) {
  /*Avalia-se o dicionário de identificadores procurando por uma chave que seja
  igual ao valor do objeto que a comparação está avaliando*/
  for (c in this.dicionarioID) {
    //"objetoTemp" recebe o par chave e valor corrente no dicionário de identificadores
    let [objetoTemp] = [this.dicionarioID[c]]
    //"chaveTemp" recebe a chave corrente no dicionário de identificadores
    let chaveTemp = Object.getOwnPropertyNames(objetoTemp)
    //Ao encontrar uma chave que seja igual ao valor do objeto avaliado ela acessa e avalia o valor da chave 
    if (chaveTemp == this.dados.obj1) {
      //"valorID" recebe o valor da chave
      let valorID = this.dicionarioID_2[c]
      //Se o valor da chave existir no dicionário de BF 01, a comparação chama a correspondência
      for (i in dicionario_De_BF_01) {
        //Verifica-se se valor da chave existe no dicionário de BF 01
        if (valorID.chave == dicionario_De_BF_01[i]) {
          //Se o valor existir a variável "objetoOuPropri" recebe o valor da chave
          objetoOuPropri = valorID.chave
          /*O processo de correspondência é chamado pois ele é responsável por salvar no ECT os objetos e propriedades
          que foram aprovados pela comparação.*/
          return correspondencia(objetoOuPropri)
        }
      }
      /*Compara-se o valor da chave corrente com ele mesmo apenas para confirmar que a busca top down não obteve sucesso,
       pois se o valor ainda for o mesmo, significa que a correspondência não foi chamada e o processo não foi reinciado*/
      if (valorID == this.dicionarioID_2[c]) {
        /*Se o valor da chave não existir no dicionário de BF 01 uma a comparação Botton up é iniciada,
        comparando o valor da chave corrente com a chave anterior do dicionário de identificadores*/
        return buscaButtomUp(valorID, c, objetoOuPropri)
      }
    }
  }
}/*
______________________________________________________________________________________________________________________________________________________________
COMPARAÇÃO ESPECIAL DO OBJETO 2*/
function buscaTopDown_obj2(objetoOuPropri) {
  /*Avalia-se o dicionário de identificadores procurando por uma chave que seja
  igual ao valor do objeto que a comparação está avaliando*/
  for (c in this.dicionarioID) {
    //"objetoTemp" recebe o par chave e valor corrente no dicionário de identificadores
    let [objetoTemp] = [this.dicionarioID[c]]
    //"chaveTemp" recebe a chave corrente no dicionário de identificadores
    let chaveTemp = Object.getOwnPropertyNames(objetoTemp)
    //Ao encontrar uma chave que seja igual ao valor do objeto avaliado ela acessa e avalia o valor da chave 
    if (chaveTemp == this.dados.obj2) {
      //"valorID" recebe o valor da chave
      let valorID = this.dicionarioID_2[c]
      //Se o valor da chave existir no dicionário de BF 01, a comparação chama a correspondência
      for (i in dicionario_De_BF_01) {
        //Verifica-se se valor da chave existe no dicionário de BF 01
        if (valorID.chave == dicionario_De_BF_01[i]) {
          //Se o valor existir a variável "objetoOuPropri" recebe o valor da chave
          objetoOuPropri = valorID.chave
          /*O processo de correspondência é chamado pois ele é responsável por salvar no ECT os objetos e propriedades
          que foram aprovados pela comparação.*/
          return correspondencia(objetoOuPropri)
        }
      }
      /*Compara-se o valor da chave corrente com ele mesmo apenas para confirmar que a busca top down não obteve sucesso,
       pois se o valor ainda for o mesmo, significa que a correspondência não foi chamada e o processo não foi reinciado*/
      if (valorID == this.dicionarioID_2[c]) {
        /*Se o valor da chave não existir no dicionário de BF 01 uma a comparação Botton up é iniciada,
        comparando o valor da chave corrente com a chave anterior do dicionário de identificadores*/
        return buscaButtomUp(valorID, c, objetoOuPropri)
      }
    }
  }
}/*
______________________________________________________________________________________________________________________________________________________________
COMPARAÇÃO ESPECIAL DA PROPRIEDADE 1*/
function buscaTopDown_propri1(objetoOuPropri) {
  /*Avalia-se o dicionário de identificadores procurando por uma chave que seja
  igual ao valor do objeto que a comparação está avaliando*/
  for (c in this.dicionarioID) {
    //"objetoTemp" recebe o par chave e valor corrente no dicionário de identificadores
    let [objetoTemp] = [this.dicionarioID[c]]
    //"chaveTemp" recebe a chave corrente no dicionário de identificadores
    let chaveTemp = Object.getOwnPropertyNames(objetoTemp)
    //Ao encontrar uma chave que seja igual ao valor do objeto avaliado ela acessa e avalia o valor da chave 
    if (chaveTemp == this.dados.propri1) {
      //"valorID" recebe o valor da chave
      let valorID = this.dicionarioID_2[c]
      //Se o valor da chave existir no dicionário de BF 01, a comparação chama a correspondência
      for (i in dicionario_De_BF_01) {
        //Verifica-se se valor da chave existe no dicionário de BF 01
        if (valorID.chave == dicionario_De_BF_01[i]) {
          //Se o valor existir a variável "objetoOuPropri" recebe o valor da chave
          objetoOuPropri = valorID.chave
          /*O processo de correspondência é chamado pois ele é responsável por salvar no ECT os objetos e propriedades
          que foram aprovados pela comparação.*/
          return correspondencia(objetoOuPropri)
        }
      }
      /*Compara-se o valor da chave corrente com ele mesmo apenas para confirmar que a busca top down não obteve sucesso,
       pois se o valor ainda for o mesmo, significa que a correspondência não foi chamada e o processo não foi reinciado*/
      if (valorID == this.dicionarioID_2[c]) {
        /*Se o valor da chave não existir no dicionário de BF 01 uma a comparação Botton up é iniciada,
        comparando o valor da chave corrente com a chave anterior do dicionário de identificadores*/
        return buscaButtomUp(valorID, c, objetoOuPropri)
      }
    }
  }
}/*
______________________________________________________________________________________________________________________________________________________________
COMPARAÇÃO ESPECIAL DA PROPRIEDADE 2*/
function buscaTopDown_propri2(objetoOuPropri) {
  /*Avalia-se o dicionário de identificadores procurando por uma chave que seja
  igual ao valor do objeto que a comparação está avaliando*/
  for (c in this.dicionarioID) {
    //"objetoTemp" recebe o par chave e valor corrente no dicionário de identificadores
    let [objetoTemp] = [this.dicionarioID[c]]
    //"chaveTemp" recebe a chave corrente no dicionário de identificadores
    let chaveTemp = Object.getOwnPropertyNames(objetoTemp)
    //Ao encontrar uma chave que seja igual ao valor do objeto avaliado ela acessa e avalia o valor da chave 
    if (chaveTemp == this.dados.propri2) {
      //"valorID" recebe o valor da chave
      let valorID = this.dicionarioID_2[c]
      //Se o valor da chave existir no dicionário de BF 01, a comparação chama a correspondência
      for (i in dicionario_De_BF_01) {
        //Verifica-se se valor da chave existe no dicionário de BF 01
        if (valorID.chave == dicionario_De_BF_01[i]) {
          //Se o valor existir a variável "objetoOuPropri" recebe o valor da chave
          objetoOuPropri = valorID.chave
          /*O processo de correspondência é chamado pois ele é responsável por salvar no ECT os objetos e propriedades
          que foram aprovados pela comparação.*/
          return correspondencia(objetoOuPropri)
        }
      }
      /*Compara-se o valor da chave corrente com ele mesmo apenas para confirmar que a busca top down não obteve sucesso,
       pois se o valor ainda for o mesmo, significa que a correspondência não foi chamada e o processo não foi reinciado*/
      if (valorID == this.dicionarioID_2[c]) {
        /*Se o valor da chave não existir no dicionário de BF 01 uma a comparação Botton up é iniciada,
        comparando o valor da chave corrente com a chave anterior do dicionário de identificadores*/
        return buscaButtomUp(valorID, c, objetoOuPropri)
      }
    }
  }
}/*
______________________________________________________________________________________________________________________________________________________________
AVALIAÇÃO BOTTON UP
--------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function buscaButtomUp(valorID, c, objetoOuPropri) {
  //Inicia-se a busca botton up
  while (c >= 0) {
    //"objetoTemp_2" recebe o par chave valor corrente no dicionário de identificadores
    let [objetoTemp_2] = [this.dicionarioID[c]]
    //"chaveTemp_2" recebe a chave corrente no dicionário de identificadores
    let chaveTemp_2 = Object.getOwnPropertyNames(objetoTemp_2)
    /*Compara-se o valor da chave encontrada na busca top down com a chave anterior a ela, onde:

      Exemplo: h = d.plugins    | "d" foi a chave encontrada na busca top down, logo, o seu valor "c" 
      ______________________    | foi acessado e na busca botton up foi comparado a chave anterior,
                                | no caso "c" também
                  a = navigator |
                  b = a         |
                ^ c = b         |
      Botton up | d = c         |
    */
    if (chaveTemp_2 == valorID.chave) {
      /*Caso o valor da chave encontrada na busca top down for igual a chave anterior, "valorID"
      recebe o par chave e valor corrente*/
      valorID = this.dicionarioID_2[c]
      /*Se o valor da chave existir no dicionário de BF 01, a comparação especial chama a correspondência,
      se não existir, a busca botton up continua*/
      for (i in dicionario_De_BF_01) {
        if (valorID.chave == dicionario_De_BF_01[i]) {
          objetoOuPropri = valorID.chave
          return correspondencia(objetoOuPropri)
        }
      }
    }
    //"c" decrementa -1 em seu valor e permite a execução da busca botton up
    c--
  }
}

/*FIM DA COMPARAÇÃO
______________________________________________________________________________________________________________________________________________________________*/
/*****************************************************************************
    *REGRA 2 - NORMALIZAÇÃO - PROCESSO DE CORRESPONDÊNCIA 
******************************************************************************/
function correspondencia(objetoOuPropri) {
  //O processo de correspondência é responsável por salvar no ECT os objetos e propriedades que foram aprovados pela comparação
  //ECT -> Ferramenta de suporte interna da correspondência
  return ECT.push(objetoOuPropri) 
}

/*FIM DA CORRESPONDÊNCIA
______________________________________________________________________________________________________________________________________________________________*/

/*****************************************************************************
    *REGRA 3 - CLASSIFICAÇÃO
******************************************************************************/
//"regra_3" recebe o resultado da regra 3 - classificação
var regra_3 = require('../Regra_3_Classificacao/classificacao')
/*"ENRepetido" recebe as chamadas repetidas do escopo normalizado, sendo um escopo criado
para auxiliar na criação do escopo normalizado, tornando mais otimizado a contagem de chamadas repetidas*/
var ENRepetido = require('../Regra_3_Classificacao/classificacao').ENRepetido

/*FIM DA REGRA 3 - CLASSIFICAÇÃO
______________________________________________________________________________________________________________________________________________________________*/
/*****************************************************************************
    *PROCESSOS EXTRAS - LOG
******************************************************************************/
/*FUNÇÃO DA LIXEIRA
______________________________________________________________________________________________________________________________________________________________*/
function funcao_lixeira(lixao) {
  //"trush" é inicializado em 0 e indicará se o valor encontrado será enviado para o lixo ou não
  let trush = 0
  //"trush_2" receberá o valor descartado
  let trush_2 = ''
  //"array" recebe os valores da linha corrente do escopo reduzido
  let array = []
  //Um laço percorre a linha corrente do escopo reduzido e atribui os seus valores para "array"
  for (i in this.dados) {
    array.push(this.dados[i])
  }
  //Se o identificador esquerdo for vazio e o direito existir, o identificador direito vai para o lixão
  if (this.dados.IDE == '' && this.dados.IDD != '') {
    //"trush_2" recebe o identificador direito e vai para o lixão
    trush_2 = this.dados.IDD
    lixao.push(trush_2)
    //"trush_2" é limpado
    trush_2 = ''
    //"array" é limpado
    array[1] = ''
    //Um laço percorre "array"
    for (i in array) {
      //Se o elemento corrente existir então "trush_2" recebe o elemento e "trush" é incrementado
      if (array[i] != false) {
        trush++
        trush_2 = array[i]
      }
    }
    //Se "trush" for igual a 1, ou seja, só existir 1 elemento na linha, este elemento é enviado para o lixão
    if (trush == 1) {
      lixao.push(trush_2)
    }
  }
  //Se o identificador esquerdo existir e o direito for vazio, o identificador esquerdo vai para o lixão
  else if (this.dados.IDE != '' && this.dados.IDD == '') {
    //"trush_2" recebe o identificador esquerdo e vai para o lixão
    trush_2 = this.dados.IDE
    lixao.push(trush_2)
    //"trush_2" é limpado
    trush_2 = ''
    //"array" é limpado
    array[0] = ''
    //Um laço percorre "array"
    for (i in array) {
      //Se o elemento corrente existir então "trush_2" recebe o elemento e "trush" é incrementado
      if (array[i] != false) {
        trush++
        trush_2 = array[i]
      }
    }
    //Se "trush" for igual a 1, ou seja, só existir 1 elemento na linha, este elemento é enviado para o lixão
    if (trush == 1) {
      lixao.push(trush_2)
    }
  }
  /*Se o identificador esquerdo for vazio e o direito for vazio, então nenhum dos identificadores vai
  para o lixão, pois eles não existem*/
  else if (this.dados.IDE == '' && this.dados.IDD == '') {
    //Um laço percorre a linha corrente do escopo reduzido
    for (i in this.dados) {
      //Se o elemento corrente existir então "trush_2" recebe o elemento e "trush" é incrementado
      if (this.dados[i] != '') {
        trush++
        trush_2 = this.dados[i]
      }
    }
    //Se "trush" for igual a 1, ou seja, só existir 1 elemento na linha, este elemento é enviado para o lixão
    if (trush == 1) {
      lixao.push(trush_2)
    }
  }
  //O resultado da função "funcao_lixeira" é retornado
  return trush
}/*

FUNÇÃO PARA SALVAR O ESCOPO NORMALIZADO NO FORMATO DA EXTENSÃO ".CSV"
______________________________________________________________________________________________________________________________________________________________*/
function escopoNormalizadoCSV(){
  //Colunas com os nomes:  'Linha', 'Quantidade' e 'Chamada' são criadas
  resultadoNormalizado = 'Linha' + ',' + 'Quantidade' + ',' + 'Chamada' + '\n\n'
  /*"resultadoNormalizado2" salvará os valores do escopo normalizado repetido, um escopo criado
  para auxiliar na criação do escopo normalizado, tornando mais otimizado a contagem de chamadas repetidas*/
  resultadoNormalizado2 = ''
  //Um laço percorre o escopo normalizado, salvando os valores de acordo com as colunas
  for(i in escopoNormalizado){
    resultadoNormalizado +=  escopoNormalizado[i].linha + ',' +
    escopoNormalizado[i].quantidade + ',' + escopoNormalizado[i].chamada +  '\n'
  }
  //Um laço percorre o escopo normalizado repetido, salvando os valores de acordo com as colunas
  for(i in this.ENRepetido){
    resultadoNormalizado2 += this.ENRepetido[i].linha + ',' +
    this.ENRepetido[i].quantidade + ',' + this.ENRepetido[i].chamada +  '\n'
  }
  /*O escopo normalizado e o escopo normalizado repetido nos formatos ".csv" são retornados,
  agora formando apenas um escopo normalizado*/
  return resultadoNormalizado + resultadoNormalizado2
}/*

FUNÇÃO PARA SALVAR O ESCOPO CLASSIFICADO NO FORMATO DA EXTENSÃO ".CSV"
______________________________________________________________________________________________________________________________________________________________*/
function escopoClassificadoCSV(){
  /*"contador_risco" converterá o risco dos sites para string, pois anteriormente
  foram convertidos para número para tornar possível a análise de dados, onde:
  Alto  = 3
  Médio = 2
  Baixo = 1*/
  contador_risco = 0
  //Colunas com os nomes:  'Chamada', 'Frequência' , 'Risco da chamada' e 'Risco da pagina'  são criadas
  resultadoClassificado = 'Chamada' +','+ 'Frequência' +','+ 'Risco da chamada' +','+ 
  'Risco da pagina' + '\n\n'
  //Um laço percorre o escopo classificado, salvando os valores de acordo com as colunas
  for(i in escopoClassificado){
    //O risco do site é convertido para string
    if(contador_risco == 0){
      if(risco_site == 1){
        risco_site_string = 'Baixo'
      }
      else if(risco_site == 2){
        risco_site_string = 'Medio'
      }
      else if(risco_site == 3){
        risco_site_string = 'Alto'
      }
      resultadoClassificado += escopoClassificado[i].chamada + ',' + 
      escopoClassificado[i].frequencia + ',' + escopoClassificado[i].risco_da_chamada + ',' + risco_site_string +'\n'
    }
    else{
      resultadoClassificado += escopoClassificado[i].chamada + ',' + 
      escopoClassificado[i].frequencia + ',' + escopoClassificado[i].risco_da_chamada + ',' + ' '+ '\n'
    }
    //"contador_risco" é incrementado para não realizar a conversão mais de uma vez
    contador_risco++
  }
  //O escopo classificado no formato ".csv" é retornado
  return resultadoClassificado 
}/*

FUNÇÃO PARA SALVAR O DICIONÁRIO DE IDENTIFICADORES NO FORMATO DA EXTENSÃO ".CSV"
______________________________________________________________________________________________________________________________________________________________*/
function f_DicionarioID_CSV(){
  //Colunas com os nomes:  'Chave' e 'Valor' são criadas
  resultadoDicionarioID = 'Chave' + ',' + 'Valor' + '\n\n'
  //Um laço percorre o dicionário de identificadores, salvando os valores de acordo com as colunas
  for(i in dicionarioID){
    resultadoDicionarioID += Object.keys(dicionarioID[i]) + ',' + dicionarioID_2[i].chave + '\n'
  }
  //O dicionário de identificadores no formato ".csv" é retornado
  return resultadoDicionarioID 
}/*

FUNÇÃO PARA SALVAR OS RISCOS DOS SITES NO FORMATO DA EXTENSÃO ".CSV"
______________________________________________________________________________________________________________________________________________________________*/
function dadosCSV(){
  //Colunas com os nomes:  'Sites' e 'Risco' são criadas
  resultado_dados = 'Sites' + ',' + 'Risco' + '\n\n'
  //Um laço percorre o escopo que armazena os riscos, salvando os valores de acordo com as colunas
  for(i in listaSites){
    resultado_dados += listaSites[i] + ',' + riscoSites[i] + '\n'
  }
  //Os riscos dos sites no formato ".csv" é retornado
  return resultado_dados
}/*

FUNÇÃO PARA SALVAR A LIXEIRA NO FORMATO DA EXTENSÃO ".CSV"
______________________________________________________________________________________________________________________________________________________________*/
function lixaoCSV(lixo){
  //Uma coluna com o nome:  'lixo' é criada
  resultado_lixo = 'lixo' + ',' + '\n\n'
  //Um laço percorre o escopo da lixeira, salvando os valores de acordo com a coluna
  for(i in lixo){
    resultado_lixo += lixo[i] + ',' + '\n'
  }
  //A lixeira no formato ".csv" é retornada
  return resultado_lixo  
}/*

FUNÇÃO PARA CONVERTER O RISCO DO SITE PARA NÚMERO
______________________________________________________________________________________________________________________________________________________________*/
function niveis(nivel){
  //Se o nivel for baixo então convertes-se para 1
  if(nivel == 'Baixo'){
    return 1
  }
  //Se o nivel for médio então convertes-se para 2
  else if(nivel == 'Médio'){
    return 2
  }
  //Se o nivel for alto então convertes-se para 3
  else if(nivel == 'Alto'){
    return 3
  }
}/*

FUNÇÃO PARA CONVERTER AS INICIAIS DE SITES QUE COMEÇAM COM NÚMEROS PARA STRING
______________________________________________________________________________________________________________________________________________________________*/
function arquivo(nome_arquivo){
  /*Para evitar problemas com arquivos que possuem nomes que comecem com números,
  os elementos iniciais de seus nomes são trocados*/
  switch(nome_arquivo[0]){
    //Caso o arquivo possua um nome que comece com o número 0 o número 0 é trocado pela letra O 
    case '0':
      nome_arquivo = nome_arquivo.replace(nome_arquivo[0], 'O')
      break
    //Caso o arquivo possua um nome que comece com qualquer número diferente de 0 o número em questão é trocado pelo símbolo "_"
    case '1':
      nome_arquivo = nome_arquivo.replace(nome_arquivo[0], '_')
      break
    case '2':
      nome_arquivo = nome_arquivo.replace(nome_arquivo[0], '_')
      break
    case '3':
      nome_arquivo = nome_arquivo.replace(nome_arquivo[0], '_')
      break
    case '4':
      nome_arquivo = nome_arquivo.replace(nome_arquivo[0], '_')
      break
    case '5':
      nome_arquivo = nome_arquivo.replace(nome_arquivo[0], '_')
      break
    case '6':
      nome_arquivo = nome_arquivo.replace(nome_arquivo[0], '_')
      break
    case '7':
      nome_arquivo = nome_arquivo.replace(nome_arquivo[0], '_')
      break
    case '8':
      nome_arquivo = nome_arquivo.replace(nome_arquivo[0], '_')
      break
    case '9':
      nome_arquivo = nome_arquivo.replace(nome_arquivo[0], '_')
      break
    }
  /*É retirado a extensão ".js" do nome do arquivo para que os escopos do arquivo possam
  ser salvos com extensões ".csv" posteriormente, com exceção do escopo reduzido, que já é salvo no fim da extração */
  nome_arquivo = nome_arquivo.replace('.js', '')
  //O nome que inicia com uma string é retornado
  return nome_arquivo
}