/*
 * Desofuscação normal
 *
 * Mestrando  : Geandro Matos
 * Colaboradores : Murilo Matos
 * Data    : 06 de janeiro de 2021
 * Curso de mestrado: Ciência da computação
 * Nome do arquivo: Desofuscacao_normal.js
 *
 * Este script tem como objetivo receber códigos javascripts enviados pelas códigos do Crawler_oficial.py 
 * e do Scraper_oficial.py e desofusca-los e organiza-los, por meio da biblioteca: js-beautify
 * 
 * Recebe como entrada um arquivo ofuscado
 * 
 * Produz como saída um código organizado e desofuscado
 * 
 * Requerimentos: js-beautify, fs, walk 
 */

//Bibliotecas necessárias para a execução do código
const beautify = require('js-beautify').js
const fs = require('fs')
const walk = require('walk')
const path = require('path');

//Caminho pelo qual a biblioteca "walk" irá caminhar
dir = `/WBF_analyzer/pre-processamento/extracao/ofuscados`
walker = walk.walk(dir);
//Por meio do "walker.on", caminha-se no diretório de entrada a procura de códigos javascripts
walker.on('file', function (raiz, arquivo, recursão) {

  nome_raiz = raiz.split('\\')
  nome_raiz = nome_raiz.pop()
  //A variável "nome_arquivo" recebe o nome do arquivo
  nome_arquivo = arquivo.name


  //Se a extensão do arquivo for um ".js", então ele desofusca
  if (nome_arquivo.substr(nome_arquivo.length - 3) == '.js') {
    pasta_site_nome = nome_arquivo
    pasta_site_nome = pasta_site_nome.replace('.js', '')
    
    fs.mkdir(path.join('/wbf_analyzer/pre-processamento/blocojs/', nome_raiz), {recursive:true}, (err) => {});
    fs.mkdir(path.join('/wbf_analyzer/identificacao/identificador/regra_1_extracao/escopos_reduzidos/', nome_raiz), {recursive:true}, (err) => {});
    fs.mkdir(path.join('/wbf_analyzer/identificacao/identificador/regra_2_normalizacao/escopos_normalizados/', nome_raiz), {recursive:true}, (err) => {});
    fs.mkdir(path.join('/wbf_analyzer/identificacao/identificador/regra_3_classificacao/escopos_classificados/', nome_raiz), {recursive:true},(err) => {});
    fs.mkdir(path.join('/wbf_analyzer/pre-processamento/extracao/bases_defeituosas/bases_erros/', nome_raiz), {recursive:true},(err) => {});
    fs.mkdir(path.join('/wbf_analyzer/pre-processamento/extracao/bases_defeituosas/bases_grandes/', nome_raiz), {recursive:true},(err) => {});
    fs.mkdir(path.join('/wbf_analyzer/pre-processamento/extracao/bases_defeituosas/bases_sem_nada_encontrado/', nome_raiz), {recursive:true},(err) => {});
    fs.mkdir(path.join('/wbf_analyzer/resultados/dicionario_ID/', nome_raiz), {recursive:true},(err) => {});
    fs.mkdir(path.join('/wbf_analyzer/resultados/lixao/', nome_raiz), {recursive:true},(err) => {});
    fs.mkdir(path.join('/wbf_analyzer/resultados/risco_temp/', nome_raiz), {recursive:true},(err) => {});
    fs.mkdir(path.join('/wbf_analyzer/resultados/sites_independentes_resultados/' + nome_raiz + '/objetos_do_site'), {recursive:true}, (err) => {});
    fs.mkdir(path.join('/wbf_analyzer/resultados/sites_independentes_resultados/' + nome_raiz + '/risco_do_site'), {recursive:true}, (err) => {});
    //Invoca a função da desofuscação
    desofuscacao(raiz + '/' + nome_arquivo, nome_raiz)
  }
  //Segue para o próximo arquivo
  recursão()
})

//Função da desofuscação
function desofuscacao(caminho,nome_raiz) {
  //Por meio da biblioteca "fs", o código lê o arquivo corrente
  fs.readFile(caminho, 'utf8', function (err, dados) {
    //A variável "array_path" armazena o caminho do arquivo corrente
    array_path = []
    array_path.push(caminho)
    //Por fim, a variável "array_path" armazena o nome do arquivo em questão
    array_path = array_path[0].split("/")

    //Diretório no qual o arquivo desofuscado será salvo
    dir2 = `/WBF_analyzer/Pre-processamento/BlocoJS/${nome_raiz}/${array_path.pop()}`
    //Por meio da biblioteca "beautify", o arquivo corrente é desofuscado
    desofuscado = beautify(dados, { indent_size: 1, space_in_empty_paren: true })
    //"regra_1" armazena o arquivo regra 1 - extração
    regra_1 = require('../../Identificacao/Identificador/Regra_1_Extracao/extracao')
    //Por meio da biblioteca "fs", o arquivo é salvo no caminho armazenado na variável "dir2"
    fs.writeFile(dir2, desofuscado, function (err) {
      if (err) {
        return console.log(err)
      }
    })
    //regra 1 - extração é chamada
    regra_1(desofuscado, nome_arquivo, nome_raiz)
  });
}
