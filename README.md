# WBF_analyser
Identificando Indicadores de Browser Fingerprinting em Páginas Web

GUIA DE REQUISITOS PARA APLICAÇÃO #WBF_Analyser# FUNCIONAR:
----------------------------------------------------------

Se você desejar mais detalhes sobre requisitos você pode conferir no leiame para requisitos

Bibliotecas do javascript necessárias:
*ast-types   -> para navegar na AST
*esprima     -> cria a AST 
*fs          -> para salvar arquivos
*js-beautify -> para desofuscar
*walk        -> para andar em diretórios

Ferramenta para a visualização de gráficos e tabelas dos resultados: Notebook Jupyter

Bibliotecas em python necessárias:
*urllib3       -> para acessar o conteúdo das páginas crawladas
*requests      -> para obter o conteúdo das páginas crawladas
*BeautifulSoup -> para extrair códigos com tag script
*lxml parser   -> suporte para o beautifulsoup

LINHAS DE COMANDO PARA EXECUTAR A APLICAÇÃO #WBF_Analyser#:
-----------------------------------------------------------

Se você desejar mais detalhes sobre como executar você pode conferir no leiame para executar

Salvar o WBF_analyzer em uma pasta raiz para que seja possível executar o comando a seguir pelo prompt
"/WBF_Analyser/../"


CRAWLER
------- 
Usar o comando:

"/WBF_Analyser/Pre-processamento/Extracao>py Crawler.py"

Depois de passar este comando para o prompt, o terminal exibirá uma mensagem pedindo
para o usuário inserir a URL do site que deseja-se extrair dados, como:

Insira uma URL: https://www.ufam.edu.br 

Após isso chame a análise  por meio da desofuscação

"/WBF_Analyser/Pre-processamento/Extracao>node desofuscacao"

SCRAPER
--------
Usar o comando:

"/WBF_Analyser/Pre-processamento/Extracao>py Scraper.py"

Depois de passar este comando para o prompt, o terminal exibirá uma mensagem pedindo
para o usuário inserir as URLs dos sites que deseja-se crawlar, como:

Para não inserir mais URLs digite ok

Insira uma URL: https://www.ufam.edu.br 

Após isso chame a análise  por meio da desofuscação

"/WBF_Analyser/Pre-processamento/Extracao/node desofuscacao.py"

LEITURA DE BASES
----------------
usar o comando:

"/WBF_Analyser/Pre-processamento/Extracao>node pre-processamento.js"

Depois de passar este comando para o prompt, o terminal exibirá uma mensagem pedindo
para o usuário inserir o caminho para a base, como:

/users/administrador/desktop/bt_5000
