const fs = require('fs')
const esprima = require('esprima')
const walk = require('walk')
const beautify = require('js-beautify').js
regra_1 = require('../Identificacao/Identificador/Regra_1_Extracao/extracao')


//dir = '/mestrado/Top_50_sites_alexa.com_2021_dependencias/guarda_blocos/t'
dir = `/mestrado/Top_50_sites_alexa.com_2021_dependencias/Dependencias_originais/www.360.cn`
walker = walk.walk(dir);
walker.on('file', function (raiz, arquivo, recursão){
    nome_arquivo = arquivo.name
    nome_raiz = raiz.split('/')
    nome_raiz = nome_raiz.pop()

    if (nome_arquivo.substr(nome_arquivo.length - 3) == '.js') {
        const dados = fs.readFileSync(raiz + '/' + nome_arquivo,{encoding:'utf8', flag:'r'})
        desofuscado = beautify(dados, { indent_size: 1, space_in_empty_paren: true })
        try{
            const sourceCode = dados
            console.log(nome_arquivo)
            const ast = esprima.parseScript(String(sourceCode), { tolerant: true }, { jsx: true })
            console.log(ast)
            console.log('ok')
        }
        catch{
            fs.writeFileSync(`/mestrado/Top_50_sites_alexa.com_2021_dependencias/depedencias_verifica_erros/dependecias_erro/resultado_verifica_erro/${nome_arquivo}`, desofuscado);
        }
    }
    //O laço segue para o próximo arquivo
    recursão()
})



