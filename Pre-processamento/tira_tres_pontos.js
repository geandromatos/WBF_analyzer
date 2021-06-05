const fs = require('fs')
const esprima = require('esprima')
const walk = require('walk')


dir = '/mestrado/Top_50_sites_alexa.com_2021_dependencias/dependencias_consertadas/Dependencias/www.youtube.com' 
walker = walk.walk(dir);
walker.on('file', function (raiz, arquivo, recursão){
    nome_arquivo = arquivo.name

    if (nome_arquivo.substr(nome_arquivo.length - 3) == '.js') {
        const dados = fs.readFileSync(raiz + '/' + nome_arquivo,{encoding:'utf8', flag:'r'})
        dados_2 = dados.split('\n')
        tira_elemento_incompleto = 0
        while (tira_elemento_incompleto < dados_2.length){
            c = dados_2[tira_elemento_incompleto].trim()
            quebra_tres_pontos = c.split('...')
            if(quebra_tres_pontos.length > 1){
                dados_2[tira_elemento_incompleto] = ''
            }

            tira_elemento_incompleto++
        }
        dados_3 = ''
        reconstroi = 0
        while (reconstroi < dados_2.length){
            dados_3 += dados_2[reconstroi] + '\n'
            reconstroi++
        }
        nome_arquivo = nome_arquivo.replace('.js','')
        //fs.writeFileSync(`/mestrado/Top_50_sites_alexa.com_2021_dependencias/depedencias_verifica_erros/dependecias_erro/resultado_tira_tres_pontos/${nome_arquivo}.js`, dados_3);
        fs.writeFileSync(`/mestrado/Top_50_sites_alexa.com_2021_dependencias/depedencias_verifica_erros/dependecias_erro/resultado_tira_tres_pontos/${nome_arquivo}.js`, dados_3);
 
    }
    //O laço segue para o próximo arquivo
    recursão()
})