'''
 * Scraper_oficial.py
 *
 * Mestrando  : Geandro Matos
 * Colaboradores : Murilo Matos
 * Data    : 04 de setembro de 2020
 * Curso de mestrado: Ciência da computação
 * Nome do arquivo:  Scraper_oficial.py
 *
 * Este script tem como objetivo rastrear URLs em páginas Web
 * e extrair seus conteúdos javascript in-line e javascript externo 
 * 
 * Recebe como entrada uma URL, exemplo:
 *  https://ufam.edu.br/
 *
 * Produz como saída um bloco.js constituído de arquivos javascript in-line e javascript externo
 *
 * Nomeação do bloco.js:
 * O bloco.js será nomeado com o nome da página extraída, exemplo:
 *  ufam.edu.br.js
 * 
 * Requerimentos: urllib3, urlopen importado de urllib.request, bs4 importado de BeautifulSoup,
 * urljoin importado de urllib.parse, re
 * 
'''

#bibliotecas necessárias para rodar o crawler
import urllib3
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import re
import time
#from selenium import webdriver
import os

#função para remover tags
def tag(codigoJS):
    #"counter_simb" é inicializado em 0 e possui a função de verificar 
    #qual é o indíce do 1º elemento que aparece na linha de código corrente, caso ela seja um caso onde : "           a = b"
    counter_simb = 0 
    #"counter_tag" é inicializado em 0 e possui a função de verificar 
    #em que momento o símbolo ">" aparece na linha de código corrente
    counter_tag = 0
    #Se o código corrente for diferente de "\n", então a execução continua normalmente
    if codigoJS != '\n':
        #Se o primeiro elemento do código corrente for igual a "\n", " " e "\t",
        #então procura-se o primeiro elemento válido do código
        if codigoJS[0] == '\n' or codigoJS[0] == ' ' or codigoJS[0] == '\t':
            #Um laço percorre o código a procura do primeiro elemento válido
            for simbolo in codigoJS:
                if simbolo != '\n' or simbolo != ' ' or codigoJS[0] != '\t':
                    #Caso um elemento válido seja encontrado então a variável "counter_simb" é incrementada
                    #e o laço é interrompido
                    counter_simb += 1
                    break
                #"counter_simb" é incrementada e representa o índice do elemento corrente 
                counter_simb += 1
        #Se o elemento corrente for igual a "<", então procura-se pelo símbolo ">"    
        if codigoJS[counter_simb] == '<':
            #Um laço percorre o código em busca do símbolo ">"    
            for i in codigoJS:
                #Se o elemento corrente for igual a ">" retira-se todos os elementos que existem entre "<" e ">", 
                #Incluindo os próprios símbolos
                if i == '>':
                    counter_tag += 1
                    codigoJS = codigoJS.replace(codigoJS[0:counter_tag], '')
                    #Agora a execução busca tirar a tag localizada no final do código
                    if len(codigoJS) != 0:
                        #"c" recebe o comprimento do código -1, devido ao fato da contagem de elementos iniciar sempre em 0
                        c = len(codigoJS) - 1
                    else:
                        #Caso o comprimento do código seja igual a 0, c recebe apenas o comprimento, sem a 
                        #operação: comprimento -1
                        c = len(codigoJS) 
                    if codigoJS[c] == '>':
                        #"a" recebe "c" e possui como função controlar o laço que anda do final ao início do código
                        a = c
                        #Um laço percorre o código do fim ao início
                        while a > 0:
                            #Se o elemento corrente for igual a "<" então retira-se todos os elementos que existem
                            #entre "<" e ">", incluindo os próprios símbolos
                            if codigoJS[a] == '<': 
                                c +=1
                                codigoJS = codigoJS.replace(codigoJS[a:c], '') + '\n'
                                #Retiram-se também os símbolos "<!--" e "-->" do código
                                codigoJS = re.sub('<!--', '', str(codigoJS))
                                codigoJS = re.sub('-->', '', str(codigoJS))
                                #O código sem tags é retornado
                                return codigoJS
                            #O contador "a" é decrementado até que se encontre o símbolo "<"
                            a -= 1 
                #"counter_tag" é incrementada até o símbolo ">" ser encontrado
                counter_tag += 1
        else:
            #Se o 1º elemento encontrado no código não for igual a "<", então o código é retornado
            return codigoJS
    else:
        #Se o código não for diferente de "\n", então o código é retornado
        return codigoJS


#função que recebe a URL da página inicial a ser investigada
#e o nível de profundidade que será alcançado por meio dos links encontrados
def crawl(paginas, profundidade, contadorURLs):
    #código para desativar os avisos warnings 
    urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
    #laço que controla a profundidade alcançada pelo crawler
    #Para usar o selenium -> browser = webdriver.Firefox()
    for _ in range(profundidade):
        #conjunto que armazena as URLs dos códigos javascript externos encontrados
        codigos_javascript = set()
        #conjunto que armazena as URLs dos links das páginas a serem percorridas
        novas_paginas = set()
        #conjunto que armazena as URLs dos links das páginas que não permitem a entrada do crawler
        codigos_bloqueados = set()
        #laço que percorre as páginas encontradas por meio da busca de links href
        for pagina in paginas:
            http = urllib3.PoolManager()
            try:
                #se nenhum erro ocorrer, o conteúdo é requisitado com sucesso
                dados_pagina = http.request('GET', pagina)
                #Para usar o selenium -> browser.get(pagina)
                time.sleep(3)
            except:
                #se não, a seguinte mensagem é imprimida:
                codigos_bloqueados.add(pagina)
                continue

            #o contador para a quantidade de códigos javascript externos é inicializado
            contador = 0
            textJS = ''
            #por meio da biblioteca BeautifulSoup, o conteúdo da página é analisado pelo parser lxml
            #Para usar o selenium -> sopa = BeautifulSoup(browser.page_source, 'lxml')
            sopa = BeautifulSoup(dados_pagina.data, 'lxml')
            #são extraído todos os códigos com a tag "script"
            links_srcript = sopa.find_all("script")
            script_in_line = sopa.find_all(type="text/javascript")
            #Caso o crawler seja bloqueado
            if links_srcript == [] and script_in_line == []:
                print('Nenhum código javascript encontrado no link: ' + str(pagina) + '\n')
                codigos_bloqueados.add(pagina)

            #são removidas as tags "script"
            for i in script_in_line:
                i = str(i.string) + '\n'
                i = re.sub(r"N"r"o"r"n"r"e", '', str(i))
                i = re.sub('<!--', '', str(i))
                i = re.sub('-->', '', str(i))
                textJS += str(i)

            #são extraído todos os códigos com a tag "a"
            links_href = sopa.find_all('a')
            #o nome do arquivo é salvo a partir do nome da página,
            #que é tratada caso comece com http
            if pagina[0:4] == 'http':
                pagina_nome = pagina.split('//')[1]
                pagina_nome = pagina_nome.split('/')
                if '' in pagina_nome:
                    pagina_nome.remove('')
                if len(pagina_nome) > 2:
                    pagina_nome = pagina_nome[0] + "." + pagina_nome[1] + "." + pagina_nome[2]
                elif len(pagina_nome) > 1:
                    pagina_nome = pagina_nome[0] + "." + pagina_nome[1]
                else:
                    pagina_nome = pagina_nome[0]
            
            #o arquivo é salvo com extensão .js   
            dir = '/WBF_analyzer/pre-processamento/extracao/ofuscados/' + str(pagina_nome)
            os.mkdir(dir)
            filename = dir + '/' + str(pagina_nome) + '.js' 

            #o arquivo onde os dados serão salvos é criado, 
            #inicialmente salvando o códigos javascript in-line
            try:
                with open(filename, 'w' ,encoding='utf-8', errors='ignore') as file_object:
                    file_object.write("//" +  str(pagina)  + '\n\n' +  "//Tipo: javascript in-line\n\n" + str(textJS) + "\n\n" + "//Tipo: javascript externo\n\n")
            except:
                codigos_bloqueados.add(pagina)
                print('algo deu errado em:' + str(pagina))
                continue
            #laço que percorre os links srcripts encontrados                       
            for link_src in links_srcript:
                
                #se a tag "src" existir nos atributos do link, 
                #então a URL contida na tag "src" é extraída
                if('src' in link_src.attrs): 
                    #caso alguma URL esteja incompleta, ela passa por um tratamento
                    #para se tornar completa
                    url_src = urljoin(pagina, str(link_src.get('src')))                    
                    url_src2 = urljoin(pagina, link_src.get('src'))
                    #se existir "'" na URL extraída, ela é considerada inválida
                    if url_src.find("'") != -1:
                        continue

                    #tratamento para evitar links internos da própria página
                    url_src = url_src.split('#')[0]
                    url_src2 = url_src2.split('#')[0]

                    #se a URL iniciar com "http"
                    if url_src[0:4] == 'http':
                        #se nenhum erro ocorrer ao carregar a
                        #página endereçada pela URL:
                        try:
                            #se for possível ter o conteúdo da página, então 
                            #a URL é adicionada ao conjunto dos codigos_javascript
                            if requests.get(url_src2):
                                codigos_javascript.add(url_src)
                                #o conteúdo da página é salvo na variável textoJs2,
                                #incrementa-se o contador links de javascripts externos
                                if url_src2 in codigos_javascript:
                                    url_src2 = requests.get(url_src2)
                                    textoJs2 = url_src2.text
                                    textoJs2 = tag(textoJs2)
                                    textoJs2 = re.sub(r"N"r"o"r"n"r"e", '', str(textoJs2))
                                    contador = contador + 1
                                    #faz-se a indexização do conteúdo no arquivo.js, salvando os códigos javascript externos 
                                    with open(filename, 'a') as file_object:
                                        file_object.write(str(textoJs2) + "\n\n")

                        #caso algum erro aconteça, a URL é ignorada
                        except:
                            continue
                    
            #após serem rastrados os links "src", 
            #os links para outras páginas são buscados 
            for link_href in links_href:
                if('href' in link_href.attrs):
                    #intervalo de 3 segundos no carregamentos de páginas
                    #time.sleep(3)
                    
                    #caso alguma URL esteja incompleta, ela passa por um tratamento
                    #para se tornar completa
                    url_href = urljoin(pagina, str(link_href.get('href')))

                    #se existir "'" na URL extraída, ela é considerada inválida
                    if url_href.find("'") != -1:
                        continue 

                    #tratamento para evitar links internos da própria página
                    url_href = url_href.split('#')[0]

                    #se a URL iniciar com "http"
                    if url_href[0:4] == 'http':
                        #o processo pausa quando a quantidade de páginas encontradas for 100.000
                        if len(novas_paginas) >= 100.000:
                            break
                        try:
                            novas_paginas.add(url_href)
                        except:
                            continue
                                
            #as novas páginas encontradas substituem as páginas percorridas anteriormente,
            #dando continuidade ao laço
            paginas = novas_paginas
            contadorURLs += 1
            #As prints abaixo mostram os links de saída encontrados e os links para codigos javascripts externos
            #print('links de saida encontrados:')
            #print(len(novas_paginas))
            #print('links para codigos javascripts externos')
            #print(str(len(codigos_javascript)) + '\n')
    
    print('\nquantidade de páginas que não foi possível obter o conteúdo:' + str(len(codigos_bloqueados)))
    print('você pode vizualizar as páginas que não foram possível obter o conteúdo na pasta: urls_que_deram_erro')
    caminho_url_erro = '/WBF_analyzer/pre-processamento/extracao/urls_que_deram_erro/' + 'urls_erros' + '.txt' 
    with open(caminho_url_erro, 'w') as file_object:
        file_object.write("URLS que deram erro\n\n" + str(codigos_bloqueados) + "\n\n" )
    return contadorURLs


#inserção da primeira URL a ser investigada
#Pode-se inserir uma (semente) ou mais URLs
listapaginas = set()
URL = ''

while URL != 'ok':
    print('\n---------------------------------------')
    print('Para não inserir mais urls, digite: ok\n---------------------------------------\n')
    URL = input('Digite uma URL: ') 

    if URL == 'ok' and len(listapaginas) != 0:
        print('\nObrigado! Agora o scraper está trabalhando...\n')
    elif URL == 'ok' and len(listapaginas) == 0:
        print('\nNenhuma entrada válida foi inserida...\n')
    elif URL[0:4] != 'http':
        print('\nEntrada inválida :(\n')
    else:
        listapaginas.add(URL)



contadorURLs = 0 
verificador = crawl(listapaginas, 1, contadorURLs)
if verificador != 0:
    print('\nCrawlagem finalizada!! Agora pode desofuscar :)')
