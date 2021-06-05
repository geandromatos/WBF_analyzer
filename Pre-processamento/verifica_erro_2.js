const fs = require('fs')
const esprima = require('esprima')
const walk = require('walk')
const beautify = require('js-beautify').js


dir = '/mestrado/base_extra/www.bbc.com'  
walker = walk.walk(dir);
walker.on('file', function (raiz, arquivo, recursão){
    nome_arquivo = arquivo.name

    if (nome_arquivo.substr(nome_arquivo.length - 3) == '.js') {
        const dados = fs.readFileSync(raiz + '/' + nome_arquivo,{encoding:'utf8', flag:'r'})
        dados_2 = dados.split('\n')
        cont_regex = 0
        for(ponto in dados_2){
            for(a in dados_2[ponto]){
                valor = dados_2[ponto]
                if(valor[a] == '\\'){
                    cont_regex++
                }

            }
            if(cont_regex == 0){
                c = dados_2[ponto]
                c = c.replace('  : 0,','')
                c = c.replace('.)', ')')
                c = c.replace('. ', '')
                c = c.replace('zn.', 'zn')
                dados_2[ponto] = c
            }
        }
        dados_3 = ''
        reconstroi = 0
        while (reconstroi < dados_2.length){
            dados_3 += dados_2[reconstroi] + '\n'
            reconstroi++
        }
        nome_arquivo = nome_arquivo.replace('.js','')
        fs.writeFileSync(`/mestrado/Top_50_sites_alexa.com_2021_dependencias/depedencias_verifica_erros/dependecias_erro/resultado_da_verifica_erro_2/${nome_arquivo}.js`, dados_3);
        
    }
    //O laço segue para o próximo arquivo
    recursão()
})

