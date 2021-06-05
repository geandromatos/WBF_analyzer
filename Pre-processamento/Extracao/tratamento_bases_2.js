/*
 * Tratamento para bases parte 2
 *
 * Mestrando  : Geandro Matos
 * Colaboradores : Murilo Matos
 * Data    : 08 de janeiro de 2021
 * Curso de mestrado: Ciência da computação
 * Nome do arquivo: tratamento_bases_2.js
 *
 * Este script tem como objetivo receber códigos javascripts enviados pelo tratamento_bases_1.js
 * e retirar tags scripts restantes e tags desconhecidas 
 * 
 * Produz como saída um código limpo e de acordo com a sintaxe do javascript
 * 
 * Requerimentos: walk e fs
 ******************************************************************************/

//Função "tratamento_bases()"
tratamento_bases_2 = function (desofuscado, caminho, fs) {
    /* ****************************************************************************
        *FUNÇÃO PARA A RETIRADA DE TAGS DESCONHECIDAS
    ******************************************************************************/
    //Função que retira tags
    function tag() {
        //A variável "dados" armazena o arquivo corrente
        dados = desofuscado
        //A variável "nome_arquivo" armazena o nome do arquivo corrente
        nome_arquivo = caminho.split('/')
        nome_arquivo = nome_arquivo.pop()
        //"regra_1" armazena o arquivo regra 1 - extração
        regra_1 = require('../../Identificacao/Identificador/Regra_1_Extracao/extracao')
        /*A variável "arquivo_1" armazena o arquivo corrente que é separado
        por linhas para a análise ser facilitada*/
        arquivo_1 = dados.split('\n')
        /*A variável "arquivo_2" é declarada e posteriormente
        irá armazenar o resultado final*/
        arquivo_2 = ''
        /*A variável "contador_elemento" é inicializada em 0 e funcionará como
        indice do vetor "arquivo_1"*/
        contador_elemento = 0

        /*A variável "arquivo_1" recebe o resultado da função "remove_seta", que tem como objetivo
        remover todas os símbolos que assemelham-se com "<!--" e "-->"*/
        arquivo_1 = remove_seta(arquivo_1)
        contador_tag_HTML = 0

        //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        /* ****************************************************************************
        * Código abaixo para a remoção de códigos que possuem a tags que não sejam tags script
        * Exemplos:
        *<
        *div >
        * (adsbygoogle = window.adsbygoogle || []).push({}); <
        * /div>
        *
        *_____________________________________________________________________________
        *
        *<HEAD></HEAD>
        *
        ******************************************************************************/
        //Laço que percorre a variável "arquivo_1", com a intenção de tirar tags que não sejam "script"
        for (tags_HTML in arquivo_1) {
            //A váriavel "elemento_tag_HTML" recebe uma linha de código do arquivo que está sendo analisado
            elemento_tag_HTML = arquivo_1[tags_HTML].trim()
            //Se a linha de código iniciar com "<", então o procedimento segue adiante
            if (elemento_tag_HTML[0] == '<') {
                //A variável "comprimento_tag_HTML" recebe a posição do elemento final
                comprimento_tag_HTML = elemento_tag_HTML.length - 1
                //Se a linha de código terminar com "<", então o procedimento segue adiante
                if (elemento_tag_HTML[comprimento_tag_HTML] == '<') {
                    /*Se a linha de código posterior a que está sendo analisada possuir os primeiros elementos diferentes de "script",
                    então inicia-se a retirada do bloco de código demarcado pelas tags desconhecidas*/
                    elemento_tag_HTML_2 = arquivo_1[contador_tag_HTML + 1].trim()
                    if (elemento_tag_HTML_2.substring(0, 6) != 'script' && elemento_tag_HTML_2.substring(0, 7) != ' script' &&
                        elemento_tag_HTML_2.substring(0, 7) != '/script' && elemento_tag_HTML_2.substring(0, 8) != ' /script' &&
                        elemento_tag_HTML_2.substring(0, 6) != 'SCRIPT' && elemento_tag_HTML_2.substring(0, 7) != ' SCRIPT' &&
                        elemento_tag_HTML_2.substring(0, 7) != '/SCRIPT' && elemento_tag_HTML_2.substring(0, 8) != ' /SCRIPT') {
                        contador_tag_HTML_2 = contador_tag_HTML + 1
                        while (contador_tag_HTML_2 <= arquivo_1.length) {
                            if (!!arquivo_1[contador_tag_HTML_2] != false) {
                                final_linha = arquivo_1[contador_tag_HTML_2]
                                /*Se for encontrado uma linha de código que possua algo diferente de ">" no final, então esta linha de código 
                                é retirada e a análise continua na linha seguinte*/
                                if (final_linha[final_linha.length - 1] != '>') {
                                    arquivo_1[contador_tag_HTML_2] = ''
                                }
                                //Caso o ">" seja encontrado, então o laço acaba e o bloco de código é retirado
                                else {
                                    arquivo_1[tags_HTML] = ''
                                    arquivo_1[contador_tag_HTML_2] = ''
                                    break
                                }
                            }
                            contador_tag_HTML_2++
                        }
                    }
                }
                /*Se a linha de código terminar com algo diferente de "<" e possuir os elementos iniciais diferentes de "<script",
                então a linha de código é retirada*/
                else {
                    contador_string = 1
                    contador_string = string(elemento_tag_HTML)
                    if (contador_string != 0 && elemento_tag_HTML[elemento_tag_HTML.length - 1] != "/" && elemento_tag_HTML[elemento_tag_HTML.length - 1] != "\\") {
                        if (elemento_tag_HTML.substring(0, 7) != '<script' && elemento_tag_HTML.substring(0, 8) != '< script' &&
                            elemento_tag_HTML.substring(0, 8) != '</script' && elemento_tag_HTML.substring(0, 9) != '< /script' &&
                            elemento_tag_HTML.substring(0, 7) != '<SCRIPT' && elemento_tag_HTML.substring(0, 8) != '< SCRIPT' &&
                            elemento_tag_HTML.substring(0, 8) != '</SCRIPT' && elemento_tag_HTML.substring(0, 9) != '< /SCRIPT') {
                            arquivo_1[tags_HTML] = ''
                        }
                    }
                }
            }
            contador_tag_HTML++
        }
        //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        /* ****************************************************************************
        *   FUNÇÃO PARA A RETIRADA DE TAGS SCRIPT
        ******************************************************************************/
        /* ****************************************************************************
        * Código abaixo para a remoção de códigos que possuem tags script
        * Exemplos:
        * <
        * script type = "text/javascript" >
        *  var _qevents = _qevents || [];
        * (function() {
        *  var elem = document.createElement('script');
        *  elem.src = (document.location.protocol == "https:" ? "https://secure" : "http://edge") + ".quantserve.com/quant.js";
        *  elem.async = true;
        *  elem.type = "text/javascript";
        *  var scpt = document.getElementsByTagName('script')[0];
        *  scpt.parentNode.insertBefore(elem, scpt);
        * })(); <
        * /script>
        *
        *_____________________________________________________________________________
        *
        * < script type = "text/javascript" >
        * 
        ******************************************************************************/
        //Laço que percorre a variável "arquivo_1", com a intenção de tirar tags "script"
        while (contador_elemento <= arquivo_1.length - 1) {
            //A variável "elemento" recebe uma linha de código do arquivo que está sendo analisado
            elemento = arquivo_1[contador_elemento].trim()
            //Inicialmente é testado se é possível seguir com o tratamento, caso não, a linha de código é retirada
            try {
                //Se a linha de código iniciar com "<", então o procedimento segue adiante
                if (elemento[0] == '<') {
                    //Caso o ">" seja encontrado no final da linha, então a linha de código é retirada
                    if (elemento[elemento.length - 1] == '>') {
                        arquivo_1[contador_elemento] = ''
                    }
                    //Caso o ">" não seja encontrado no final da linha, então é iniciado um processo onde analisá-se nas linhas posteriores
                    else {
                        /*A variável "contador_string" é inicializada em 1 e possui a função de verificar se a tag encontrada é 
                        uma string, pois se for uma string não há necessidade de se retirar a tag*/
                        contador_string = 1
                        //Se a linha de código possuir mais de 1 elemento, então ela passa pela função string() pra verificar se a tag existente é uma string
                        if (elemento.length - 1 != 0) {
                            contador_string = string(elemento)
                        }
                        /*Se a tag não for uma string e a linha de código não possuir "/","\" e "*/ //" em seu final, o processo segue adiante*/
                        if (contador_string != 0 && elemento[elemento.length - 1] != "/" && elemento[elemento.length - 1] != "\\" ||
                            elemento.substring(elemento.length - 2, elemento.length) == "*/") {
                            //É verificado quantos tags a linha de código possui
                            avalia_elemento = elemento.length - 1
                            }
                            //Se a linha de código possuir mais de 1 elemento, retiram-se as tags encontradas
                            if (avalia_elemento != 0) {
                                contador_script = 0
                                    for (script in elemento) {
                                        if (elemento[script] == '>') {
                                            elemento = elemento.replace(elemento.substring(0, contador_script + 1), '')
                                            arquivo_1[contador_elemento] = elemento
                                            avalia_elemento = 0
                                            contador_script = 0
                                            break
                                        }
                                        contador_script++
                                    }
                            }
                            //Se a linha de código possuir menos de 1 elemento, a variável "avalia_elemento" recebe mais 1
                            else {
                                avalia_elemento += 1
                            }
                            /*Se a variável "avalia_elemento" for igual a 0, siginifica que a linha de código possuia mais de 1 elemento
                            e teve suas tags retiradas, então, o programa vai para a próxima linha*/
                            if (avalia_elemento == 0) {
                                contador_elemento++
                                continue
                            }
                            /*Caso a variável "avalia_elemento" seja diferente de 0, siginifica que a linha de código possuia somente 1 elemento
                            e que o restante da tag se encontra na linha seguinte*/
                            else {
                                /*A variável "contador_elemento_2" recebe a variável "contador_elemento" + 1 e desta forma
                                atua como índice das linhas de códigos posteriores da que estava-se analisando*/
                                contador_elemento_2 = contador_elemento + 1
                                //Laço que percorrerá novamente o arquivo corrente, porém a partir do ponto onde foi encontrado a abertura da tag 
                                while (contador_elemento_2 <= arquivo_1.length - 1) {
                                    //A variável "elemento_2" recebe as linhas de códigos posteriores
                                    elemento_2 = arquivo_1[contador_elemento_2].trim()
                                    //Se a linha de  código terminar com ">", a tag é retirada o laço é encerrado
                                    if (elemento_2[elemento_2.length - 1] == '>') {
                                        arquivo_1[contador_elemento] = ''
                                        arquivo_1[contador_elemento_2] = ''
                                        break
                                    }
                                    //Caso a linha de código se encontrar no final da linha, o laço tammbém é encerrado
                                    else if (!!elemento_2 == false || contador_elemento_2 == arquivo_1.length - 1) {
                                        arquivo_1[contador_elemento] = ''
                                        arquivo_1[contador_elemento_2] = ''
                                        break
                                    }
                                    /*Caso as duas condições acima não sejam atendidas, o programa irá procurar por ">" não apenas no final,
                                    mas também em outras regiões da linha, pois o caso pode vir a ser algo como:
                                    * <
                                    * scrip> if(i > a){}
                                    */
                                    else {
                                        contador_script = 0
                                        for (script in elemento_2) {
                                            if (elemento_2[script] == '>' && elemento_2[elemento_2.length - 1] != '"' && elemento_2[elemento_2.length - 1] != "'") {
                                                elemento_2 = elemento_2.replace(elemento_2.substring(0, contador_script + 1), '')
                                                arquivo_1[contador_elemento] = ''
                                                arquivo_1[contador_elemento_2] = elemento_2
                                                contador_script = 0
                                                break
                                            }
                                            contador_script++
                                        }
                                        if (contador_script != 0) {
                                            arquivo_1[contador_elemento_2] = ''
                                        }
                                        else {
                                            break
                                        }
                                    }
                                    contador_elemento_2 += 1
                                }
                            }

                        }
                    }
                
                /*Se for encontrado um ">" no final da linha mas não for encontrado um "<" no inicío,
                o programa invoca a função "tira_tag_final()" para a realização do tratamento*/
                else if (elemento[elemento.length - 1] == '>') {
                    comprimento_elemento = elemento.length - 1
                    arquivo_1[contador_elemento] = tira_tag_final(comprimento_elemento, elemento)
                }
                /*Se for encontrado um "<" no final da linha mas não for encontrado um "<" no inicío,
                o programa invoca a função "tira_tag_final()" para a realização do tratamento*/
                else if (elemento[elemento.length - 1] == '<') {
                    //A variável "teste" recebe a linha de código posterior a que está sendo analisada
                    teste = arquivo_1[contador_elemento + 1].trim()
                    /*Se a linha de código posterior a que está sendo analisada terminar com ">", então registra-se a quantidade de tags
                    que existem na linha e chama-se novamente a função "tira_tag_final()"*/
                    if (teste[teste.length - 1] == '>') {
                        comprimento_elemento = elemento.length - 1
                        arquivo_1[contador_elemento] = tira_tag_final(comprimento_elemento, elemento)
                        arquivo_1[contador_elemento + 1] = ''
                    }
                }
            }
            //Caso não seja possível seguir com o tratamento a linha de código é retirada
            catch {
                arquivo_1[contador_elemento] = ''
            }
            //"contador_elemento" é incrementado para que seja possível a locomoção no arquivo corrente
            contador_elemento += 1
        }
        //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        /* ****************************************************************************
        *   ORGANIZAÇÃO DO CÓDIGO
        ******************************************************************************/
        /*Novamente, a variável "arquivo_1" recebe o resultado da função "remove_seta", que tem como objetivo
        remover todas os símbolos que assemelham-se com "<!--" e "-->", para caso tenha sobrado alguns destes símbolos na primeira remoção*/
        arquivo_1 = remove_seta(arquivo_1)
        //Laço que organiza o código tratado
        for (codigo_organizado in arquivo_1) {
            /*Se o elemento corrente do vetor que armazena o código tratado existir, logo ele será incluído no novo arquivo 
            que armazena o resultado final */
            if (!!arquivo_1[codigo_organizado] != false) {
                //A variável "codigo_JS" armazena a linha de código corrente
                codigo_JS = arquivo_1[codigo_organizado].trim()
                //Se existir algum "else if" escrito de forma incorreta, o processo de formatação correto é realizado 
                if (codigo_JS.substring(0, 7) == 'elseif(' || codigo_JS.substring(0, 8) == 'elseif (') {
                    codigo_JS = codigo_JS.replace(codigo_JS.substring(0, 4), codigo_JS.substring(0, 4) + ' ')
                    arquivo_1[codigo_organizado] = codigo_JS
                }
                //A variável "arquivo_2" armazena o resultado final
                arquivo_2 += arquivo_1[codigo_organizado] + '\n'
            }
        }
        //A variável "filename" recebe o diretório onde o arquivo tratado será salvo
        filename = `/WBF_analyzer/pre-processamento/blocoJs/${nome_raiz}/${nome_arquivo}.js`

        //O arquivo tratado é salvo
        fs.writeFile(filename, arquivo_2, function (err) {
            if (err) {
                return console.log(err)
            }
        })

        //regra 1 - extração é chamada
        regra_1(arquivo_2, nome_arquivo,nome_raiz)
    }
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    /* ****************************************************************************
    *   FUNÇÕES COMPLEMENTARES
    ******************************************************************************/
    //Função "tira_tag_final()"
    function tira_tag_final(comprimento_elemento, elemento) {
        //A variável "contador_comp" realiza a função de índice dos elementos contidos na linha de código que está sendo analisada
        contador_comp = comprimento_elemento
        //laço que percorre a linha de código corrente
        while (contador_comp >= 0) {
            //Se os elementos finais forem iguais a " <", os elementos finais da linha de código corrente são retirados
            //Exemplo:
            //*for(i= 2; i<=5; i++){} <
            if (elemento.substring(elemento.length - 2, elemento.length) == ' <') {
                elemento = elemento.replace(elemento.substring(elemento.length - 2, elemento.length), '')
                return elemento
            }
            //Caso os elementos finais não sejam iguais a " <", inicia-se a busca pelo "<" na linha de código corrente
            else {
                //Caso o elemento seja igual a "<", retira-se o espaço entre  este elemento e o final do código
                //Exemplo:
                //*for(i= 2; i<=5; i++){}</script>
                if (elemento[contador_comp] == '<') {
                    elemento = elemento.replace(elemento.substring(contador_comp, elemento.length), '')
                    return elemento
                }
                //Se for encontradas duas barras no fim do código o laço é interropido, pois indica que a "tag" encontrada é invalida
                //Exemplo:
                //*for(i= 2; i<=5; i++){}//>
                else if (elemento.substring(contador_comp - 2, contador_comp) == '//') {
                    break
                }
            }
            //A variável "contador_comp" é decrementada, permintindo a mobilidade pelos elementos da linha de código que está sendo analisada
            contador_comp -= 1
        }
        //O elemento é retornado
        return elemento
    }
    //Função "remove_seta()"
    function remove_seta(arquivo_JS) {
        //Laço que percorre o arquivo corrente
        for (seta in arquivo_JS) {
            //Se o elemento corrente existir, o tratamento é iniciado
            if (!!arquivo_JS[seta] != false) {
                //A variável "valor_seta" recebe o elemento corrente
                valor_seta = arquivo_JS[seta].trim()
                //A variável "qtd_seta" recebe a quantidade de "<!--" e "-->""
                qtd_seta = 0
                //Laço que registra registra a quantidade de "<!--" e "-->"" e incrementa "valor_seta"
                for (confere_seta in valor_seta) {
                    if (valor_seta[confere_seta] == '<' || valor_seta[confere_seta] == '>') {
                        qtd_seta++
                    }
                }
                //Retiram-se todos os "<!--" e "-->""
                //Exemplo:
                /*
                if(screen.width<=720) <!-- {window.location = "http://m.101greatgoals.com/"+window.location.pathname;}-->
                */
                while (qtd_seta > 0) {
                    valor_seta = valor_seta.replace('< !--', '')
                    valor_seta = valor_seta.replace('<!--', '')
                    valor_seta = valor_seta.replace('-->', '')
                    if (valor_seta.substring(0, 4) == '-- >') {
                        valor_seta = valor_seta.replace('-- >', '')
                    }
                    qtd_seta--
                }
                arquivo_JS[seta] = valor_seta
            }
        }
        //O arquivo é retornado após o tratamento
        return arquivo_JS
    }
    //Função "string()"
    function string(elemento_JS) {
        //A variável "contador_elemento_recursivo" recebe o comprimento da linha de código corrente
        contador_elemento_recursivo = elemento_JS.length
        /*Apartir da variável "contador_elemento_recursivo" faz-se a análise da linha de código corrente, e verifica-se
        se tag encontrada é uma string ou não*/
        while (contador_elemento_recursivo >= 0) {
            if (elemento_JS.substring(contador_elemento_recursivo - 2, contador_elemento_recursivo) == '>"' ||
                elemento_JS.substring(contador_elemento_recursivo - 2, contador_elemento_recursivo) == ">'") {
                return contador_string = 0
            }
            contador_elemento_recursivo--
        }
    }
    tag()
}
module.exports = tratamento_bases_2
