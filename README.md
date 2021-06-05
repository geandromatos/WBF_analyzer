# WBF_analyser
Identificando Indicadores de Browser Fingerprinting em Páginas Web

GUIA DE REQUISITOS PARA APLICAÇÃO #WBF_Analyser# FUNCIONAR:
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
EDITOR DE CÓDIGO FONTE
----------------------
Editor de código fonte usado para construir os scripts: Visual Studio Code,
pode ser utilizado outros editores de código para vizualizar os scripts
da aplicação.

EXECUTANDO CÓDIGOS JAVASCRIPT
-----------------------------
Software indicado para executar códigos javascript: Node.js 

Bibliotecas necessárias:
*ast-types   -> para navegar na AST
*esprima     -> cria a AST 
*fs          -> para salvar arquivos
*js-beautify -> para desofuscar
*walk        -> para andar em diretórios


EXECUTANDO CÓDIGOS PYTHON
-------------------------
Versão utilizada da linguagem python para escrever os scripts em python: 3.9,
pode ser utilizada outras versões para executar os scripts.

Ferramenta para a visualização de gráficos e tabelas dos resultados: Notebook Jupyter

Bibliotecas necessárias:
*urllib3       -> para acessar o conteúdo das páginas crawladas
*requests      -> para obter o conteúdo das páginas crawladas
*BeautifulSoup -> para extrair códigos com tag script
*lxml parser   -> suporte para o beautifulsoup
*urljoin       -> para tratar URLs incompletas
*re            -> para utilizar regex
*pandas        -> acessa os valores dos resultados
*matplotlib    -> plota os gráficos
*numpy         -> configura as informações dos gráficos

OPCIONAL:
    selenium       -> para abrir o navigador de forma automática ao se executar o scraper ou o crawler
    geckodriver    -> para se executar o selenium
