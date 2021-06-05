/*
 * Classificação 
 *
 * Mestrando  : Geandro Matos
 * Colaboradores : Murilo Matos
 * Data    : 06 de janeiro de 2021
 * Curso de mestrado: Ciência da computação
 * Nome do arquivo: classificacao.js
 *
 * Este script tem como objetivo receber o escopo normalizado, resultado do processo de normalização, e
 * a partir destes dados produzir o escopo classificado, que contém as informações das chamadas encontradas no site analisado
 * 
 * Recebe como entrada: 
 * escopo normalizado ==> contém as chamadas encontradas nos códigos analisados
 * lixão ==> local para onde os dados descartados são enviados
 * dicionario_De_BF_02_Completo ==> contém as chamadas que desejam-se encontrar
 * dicionario_De_BF_02_Alto ==> contém as chamada de nível alto
 * dicionario_De_BF_02_Medio ==> contém as chamada de nível médio
 * dicionario_De_BF_02_Baixo ==> contém as chamada de nível baixo
 * 
/*****************************************************************************
    * REGRA 3 - CLASSIFICAÇÃO
******************************************************************************/
var classificacao = function (lixao, escopoNormalizado, dicionario_De_BF_02_Completo, dicionario_De_BF_02_Alto,
  dicionario_De_BF_02_Medio, dicionario_De_BF_02_Baixo) {

  //A variável "counterChamada" é inicializada em 0 e possui como objetivo determinar a quantidade de vezes que uma chamada se repete
  let counterChamada = 0
  //O objeto "informacoesEC" é declarado, possui a função de armazenar informações da chamada
  let informacoesEC = {}
  //A variável "freqAlto" é inicializada em 0 e possui como objetivo determinar a quantidade de chamadas de nível alto 
  let freqAlto = 0
  //A variável "freqMedio" é inicializada em 0 e possui como objetivo determinar a quantidade de chamadas de nível médio 
  let freqMedio = 0
  //A variável "freqBaixo" é inicializada em 0 e possui como objetivo determinar a quantidade de chamadas de nível baixo 
  let freqBaixo = 0
  //O escopo "ENRepetido" tem como função armazenar as chamadas repetidas do escopo normalizado, para posteriormente serem utilizadas na análise de dados
  this.ENRepetido = []
  //O escopo classificado é declarado e tem como função armazenar as informações das chamadas encontradas no site analisado
  let escopoClassificado = []
  //Percorre-se o escopo normalizado para comparar seus elementos com os do dicionario_De_BF_02_Completo
  for (c in escopoNormalizado) {
    //Variável "dadosChamadas" recebe o elemento corrente do escopo normalizado
    let [dadosChamadas] = [escopoNormalizado[c]]
    //Variável "chamada" recebe a propriedade "chamada" da variável "dadosChamadas"
    let [chamada] = [dadosChamadas.chamada]
    //Laço que percorre o dicionario_De_BF_02_Completo, para descobrir se a chamada encontrada no escopo normalizado é conhecida
    for (i in dicionario_De_BF_02_Completo) {
      /*Se "chamada" for igual ao elemento corrente do dicionario_De_BF_02_Completo, então 
      o objeto informacoesEC recebe a variável "chamada"*/
      if (chamada == dicionario_De_BF_02_Completo[i]) {
        informacoesEC.chamada = chamada
      }
    }
    /*Se "informacoesEC" for diferente de um objeto vazio, então o código percorrerá o escopo normalizado novamente,
    para extrair mais informações da chamada encontrada*/
    if (informacoesEC != {}) {
      for (i in escopoNormalizado) {
        //Variável "dadosChamadas_2" recebe o elemento corrente do escopo normalizado
        let [dadosChamadas_2] = [escopoNormalizado[i]]
        //Variável "chamada_2" recebe a propriedade "chamada" da variável "dadosChamadas_2"
        let [chamada_2] = [dadosChamadas_2.chamada]
        //De acordo com quantidade de chamadas iguais, a variável "counterChamada" é incrementada
        if (chamada == chamada_2) {
          counterChamada++
        }
      }
      //A frequência da chamada é determinada, de acordo com a quantidade de vezes com que se repete
      informacoesEC.frequencia = counterChamada
      //A propriedade "risco_da_chamada" é criada, com a função de indicar o risco da chamada analisada
      informacoesEC.risco_da_chamada = ''
      //Compara-se a chamada com os elementos do dicionario_De_BF_02_Alto, com o objetivo de concluir o nível da chamada
      for (i in dicionario_De_BF_02_Alto) {
        /*Se os elementos comparados forem iguais, logo, define-se que o nível de risco da chamada é alto,
        pois foi encontrada no dicionario_De_BF_02_Alto*/
        if (informacoesEC.chamada == dicionario_De_BF_02_Alto[i]) {
          informacoesEC.risco_da_chamada = 'Alto'
        }
      }
      /*Caso a chamada não seja encontrada no dicionario_De_BF_02_Alto, o processo é repetido no dicionario_De_BF_02_Medio
      e dicionario_De_BF_02_Baixo*/
      if (informacoesEC.risco_da_chamada == '') {
        for (i in dicionario_De_BF_02_Medio) {
          /*Se os elementos comparados forem iguais, logo, define-se que o nível de risco da chamada é Médio,
          pois foi encontrada no dicionario_De_BF_02_Medio*/
          if (informacoesEC.chamada == dicionario_De_BF_02_Medio[i]) {
            informacoesEC.risco_da_chamada = 'Medio'
          }
        }
      }
      if (informacoesEC.risco_da_chamada == '') {
        for (i in dicionario_De_BF_02_Baixo) {
          /*Se os elementos comparados forem iguais, logo, define-se que o nível de risco da chamada é Baixo,
          pois foi encontrada no dicionario_De_BF_02_Baixo*/
          if (informacoesEC.chamada == dicionario_De_BF_02_Baixo[i]) {
            informacoesEC.risco_da_chamada = 'Baixo'
          }
        }
      }
      /*Se mesmo após a chamada ser comparada com os elementos dos três dicionários e a propriedade "risco_da_chamada" ainda for vazia,
      então a chamada vai para o lixão, se não, vai para o escopo classificado e a váriavel "informacoesEC" é reiniciada*/
      if (informacoesEC.risco_da_chamada == '') {
        lixao.push(chamada)
        informacoesEC = {}
      } else {
        escopoClassificado.push(informacoesEC)
        informacoesEC = {}
      }
    }
    /*Se a variável "counterChamada" for maior que 1, significa que há N chamadas iguais no código analisado,
    caso esta situação aconteça, as repetições da chamada são retiradas do escopo normalizado e inseridas no escopo normalizado repetido,
    identificado como "ENRepetido"*/
    if (counterChamada > 1) {
      let inspetor = 0
      let elemento = escopoNormalizado[c].chamada
      for (i in escopoNormalizado) {
        if (elemento == escopoNormalizado[i].chamada) {
          inspetor++

          if (inspetor > 1) {
            this.ENRepetido.push(escopoNormalizado[i])
            delete escopoNormalizado[i]
          }
        }
      }
    }
    //A variável "counterChamada" volta a possuir o valor 0, para o processo ser reiniciado
    counterChamada = 0
  }
  /*Laço que percorre o escopo classificado, com o objetivo de verificar a quantidade de chamadas de risco
  alto, médio e baixo*/
  for (i in escopoClassificado) {
    //Variável "variavelTEmpEC" recebe o elemento corrente do escopo classificado
    let variavelTEmpEC = escopoClassificado[i]
    //Verifica se o risco da chamada é Alto, caso seja, incrementa a variável freqAlto
    if (variavelTEmpEC.risco_da_chamada == 'Alto') {
      if (variavelTEmpEC.frequencia > 1) {
        freqAlto += variavelTEmpEC.frequencia
      } else {
        freqAlto++
      }
    }
    //Verifica se o risco da chamada é Médio, caso seja, incrementa a variável freqMedio 
    else if (variavelTEmpEC.risco_da_chamada == 'Medio') {
      if (variavelTEmpEC.frequencia > 1) {
        freqMedio += variavelTEmpEC.frequencia
      } else {
        freqMedio++
      }
    }
    //Verifica se o risco da chamada é Baixo, caso seja, incrementa a variável freqBaixo 
    else if (variavelTEmpEC.risco_da_chamada == 'Baixo') {
      if (variavelTEmpEC.frequencia > 1) {
        freqBaixo += variavelTEmpEC.frequencia
      } else {
        freqBaixo++
      }
    }
  }
  //Se o escopo classificado for diferente de vazio, o risco da página será determinado
  if (escopoClassificado == '') {
    return undefined
  } else {
    //A variável "risco_da_pagina" é inicializada em 0
    let risco_da_pagina = 0
    /*Cálculo para concluir o valor do risco da página. Utiliza-se a média ponderada, usando as frequências das chamadas
    de risco alto, médio e baixo como pesos*/
    risco_da_pagina = ((1 / 100 * freqBaixo) + (1 / 10 * freqMedio) + (1 / 1 * freqAlto)) / (1 / 100 + 1 / 10 + 1 / 1)
    //Se o risco da página for maior ou igual a 1, a página tem risco alto
    if (risco_da_pagina >= 1) {
      risco_da_pagina = 'Alto'
    }
    //Se o risco da página for menor que 1 e maior ou igual a 0.1, a página tem risco médio 
    else if (risco_da_pagina >= 1 / 10) {
      risco_da_pagina = 'Médio'
    }
    //Se o risco da página for menor que 0.1, a página tem risco baixo  
    else {
      risco_da_pagina = 'Baixo'
    }
    //O objeto "informacoesEC" recebe a váriavel "risco_da_pagina" como propriedade, e em seguida é inserido no escopo classificado
    informacoesEC.risco_da_pagina = risco_da_pagina
    escopoClassificado.push(informacoesEC)
    //A função então retorna o escopo classificado como resultado
    return escopoClassificado
  }
}
//A função classificação é exportada em módulo
module.exports = classificacao