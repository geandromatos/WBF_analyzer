# WBF_analyser
Identificando Indicadores de Browser Fingerprinting em Páginas Web

GUIA DE REQUISITOS PARA APLICAÇÃO #WBF_Analyser# FUNCIONAR:
----------------------------------------------------------
EDITOR DE CÓDIGO FONTE

Editor de código fonte usado para construir os scripts: Visual Studio Code,
pode ser utilizado outros editores de código para vizualizar os scripts
da aplicação.

EXECUTANDO CÓDIGOS JAVASCRIPT

Software indicado para executar códigos javascript: Node.js 

Bibliotecas necessárias:
*ast-types   -> para navegar na AST
*esprima     -> cria a AST 
*fs          -> para salvar arquivos
*js-beautify -> para desofuscar
*walk        -> para andar em diretórios


EXECUTANDO CÓDIGOS PYTHON

Versão utilizada da linguagem python para escrever os scripts em python: 3.9,
pode ser utilizada outras versões para executar os scripts.

Ferramenta para a visualização de gráficos e tabelas dos resultados: Notebook Jupyter

Bibliotecas necessárias:
*urllib3       -> para acessar o conteúdo das páginas crawladas
*requests      -> para obter o conteúdo das páginas crawladas
*BeautifulSoup -> para extrair códigos com tag script
*lxml parser   -> suporte para o beautifulsoup

LINHAS DE COMANDO PARA EXECUTAR A APLICAÇÃO #WBF_Analyser#:
-----------------------------------------------------------

Inicialmente é necessário que a pasta "WBF_Analyser" seja salva em uma pasta raiz, 
onde se possa passar o seguinte caminho relativo: 

"/WBF_Analyser/../"

Obs: se ao baixar do github o nome da pasta principal for alterado para WBF_analyser-master, o nome da pasta principal deve ser renomeado
para o seu nome normal, ou seja, WBF_analyser.

A aplicação WBF_Analyser foi feita para ser executada via prompt usando comandos 
do terminal do windows

Após isso, existem 3 situações que podem ser executadas:

Situação 1 => Plantar uma semente
Situação 2 => Passar uma lista de sites
Situação 3 => Passar um caminho para uma base

Situação 1 ==> Caso o usuário deseje plantar uma semente, ou seja, passar a URL
de apenas 1 site e apartir disso obter vários códigos extraídos é necessário usar o 
comando:

"/WBF_Analyser/Pre-processamento/Extracao>py Crawler.py"

Depois de passar este comando para o prompt, o terminal exibirá uma mensagem pedindo
para o usuário inserir a URL do site que deseja-se crawlar, como:

Insira uma URL: https://www.ufam.edu.br 

Após isso, os blocos js ofuscados extraídos do site crawlado é salvo na pasta ofuscados,
e então passa-se o comando para o prompt:

"/WBF_Analyser/Pre-processamento/Extracao>node desofuscacao.py"

Para realizar e os tratamentos restantes

Situação 2 ==>  Caso o usuário deseje passar uma lista de sites, ou seja, 
passar várias URLs e apartir disso obter vários códigos extraídos das páginas principais dos sites é necessário usar o 
comando:

"/WBF_Analyser/Pre-processamento/Extracao>py Scraper.py"

Depois de passar este comando para o prompt, o terminal exibirá uma mensagem pedindo
para o usuário inserir as URLs dos sites que deseja-se crawlar, como:

Para não inserir mais URLs digite ok

Insira uma URL: https://www.ufam.edu.br 

Após isso, os blocos js ofuscados extraídos do site crawlado é salvo na pasta ofuscados,
e então passa-se o comando para o prompt:

"/WBF_Analyser/Pre-processamento/Extracao/node desofuscacao.py"

Para realizar e os tratamentos restantes

Situação 3 Caso o usuário deseje passar um caminho para uma base, ou seja, passar
o caminho para uma pasta onde existem vários códigos a serem analisados, é necessário
usar o comando:

"/WBF_Analyser/Pre-processamento/Extracao>node pre-processamento.js"

Depois de passar este comando para o prompt, o terminal exibirá uma mensagem pedindo
para o usuário inserir o caminho para a base, como:

/users/administrador/desktop/bt_5000

Após isso os tratamentos restantes são realizados
*urljoin       -> para tratar URLs incompletas
*re            -> para utilizar regex
*pandas        -> acessa os valores dos resultados
*matplotlib    -> plota os gráficos
*numpy         -> configura as informações dos gráficos

OPCIONAL:
    selenium       -> para abrir o navigador de forma automática ao se executar o scraper ou o crawler
    geckodriver    -> para se executar o selenium
