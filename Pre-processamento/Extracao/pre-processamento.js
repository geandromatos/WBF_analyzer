/*
 * pre-processamento 
 *
 * Mestrando  : Geandro Matos
 * Colaboradores : Murilo Matos
 * Data    : 08 de janeiro de 2021
 * Curso de mestrado: Ciência da computação
 * Nome do arquivo: pre-processamento.js
 *
 * Este script tem como objetivo determinar qual o tipo de desofuscação escolhida pelo usuário:
 * Desofuscação 1 ==> Invoca a desofuscação normal, que trata os códigos baixados pelo Crawler_oficial.py ou pelo Scraper_oficial.py
 * Desofuscação 2 ==> Invoca a desofuscação para bases, que trata os códigos de bases passadas por usuários
 * 
 * Recebe como entrada dados inseridos pelo usuário 
 * 
 * Requerimentos: readline, fs, walk, js-beautify 
 */

//Bibliotecas necessárias para a execução do código "pre-processamento.js"
const readline = require('readline')
const fs = require('fs')
const walk = require('walk')
const beautify = require('js-beautify').js
const path = require('path');

//Por meio da biblioteca "readline", é possível ler a informação inserida pelo usuário
var leitor = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
//A função ler_base é criada, com o objetivo de interagir com o usuário, recebendo o caminho para a base que será analisada
function ler_base() {
    //A variável "dir" é declarada e possui o objetivo de receber a entrada inserida pelo usuário
    dir = ""
    //A mensagem "Digite o caminho da base:" é imprimida na tela
    leitor.question("\n*Digite o caminho da base:", function (answer) {
        //"dir" recebe o caminho da base inserida pelo usuário
        dir = answer;
        pasta_base_nome = dir.split('/')
        pasta_base_nome = pasta_base_nome.pop()
        fs.mkdir(path.join('/wbf_analyzer/pre-processamento/blocojs/', pasta_base_nome), {recursive:true}, (err) => {});
        fs.mkdir(path.join('/wbf_analyzer/identificacao/identificador/regra_1_extracao/escopos_reduzidos/', pasta_base_nome), {recursive:true}, (err) => {});
        fs.mkdir(path.join('/wbf_analyzer/identificacao/identificador/regra_2_normalizacao/escopos_normalizados/', pasta_base_nome), {recursive:true}, (err) => {});
        fs.mkdir(path.join('/wbf_analyzer/identificacao/identificador/regra_3_classificacao/escopos_classificados/', pasta_base_nome), {recursive:true},(err) => {});
        fs.mkdir(path.join('/wbf_analyzer/pre-processamento/extracao/bases_defeituosas/bases_erros/', pasta_base_nome), {recursive:true},(err) => {});
        fs.mkdir(path.join('/wbf_analyzer/pre-processamento/extracao/bases_defeituosas/bases_grandes/', pasta_base_nome), {recursive:true},(err) => {});
        fs.mkdir(path.join('/wbf_analyzer/pre-processamento/extracao/bases_defeituosas/bases_sem_nada_encontrado/', pasta_base_nome), {recursive:true},(err) => {});
        fs.mkdir(path.join('/wbf_analyzer/resultados/dicionario_ID/', pasta_base_nome), {recursive:true},(err) => {});
        fs.mkdir(path.join('/wbf_analyzer/resultados/lixao/', pasta_base_nome), {recursive:true},(err) => {});
        fs.mkdir(path.join('/wbf_analyzer/resultados/risco_temp/', pasta_base_nome), {recursive:true},(err) => {});
        fs.mkdir(path.join('/wbf_analyzer/resultados/bases_resultados/' + pasta_base_nome + '/objetos_da_base'), {recursive:true}, (err) => {});
        fs.mkdir(path.join('/wbf_analyzer/resultados/bases_resultados/' + pasta_base_nome + '/risco_da_base'), {recursive:true}, (err) => {});
        //O caminho da base é passado para "walker"
        walker = walk.walk(dir);
        //O código de desofuscação para bases de usuários é chamado
        tratamento_bases_1 = require('./tratamento_bases_1')
        //Se o caminho passado não possuir "/", então ele é considerado inváido, e a função ler é chamada novamente
        if (walker._wcurpath.split('/').length == 1) {
            console.log('\nbase inválida...  *   *\n\t\t    ^\n')
            ler_base()
        }
        //Se o caminho passado existir, os códigos encontrados na base serão desofuscados e tratados 
        else {
            //A mensagem "Caso o caminho exista, a base será tratada..." é mostrada na tela
            console.log('\nCaso o caminho exista, a base será tratada...\n')     
            //Laço que percorre o dirétorio passado pelo usuário
            walker.on('file', function (raiz, arquivo, recursão){
                console.log(arquivo.name + '\n------------------')
                //A variável "nome_arquivo" recebe o nome do arquivo
                nome_arquivo = arquivo.name
                nome_raiz = raiz
                nome_raiz = nome_raiz.split('/')
                nome_raiz = nome_raiz.pop()
                //É chamado o código de desofuscação para bases caso o código possua uma extensão js 
                if (nome_arquivo.substr(nome_arquivo.length - 3) == '.js') {
                    tratamento_bases_1(raiz + '/' + nome_arquivo, fs, beautify,pasta_base_nome)
                }
                //O laço segue para o próximo arquivo
                recursão()
            })
            console.log('O processo de identificação foi finalizado')
            //Por fim, a propriedade "close" da biblioteca "readline" é chamada, não permitindo mais que o usuário insira dados
            leitor.close()
        }
    })
}


ler_base()
