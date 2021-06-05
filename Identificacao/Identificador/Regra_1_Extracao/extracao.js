/*
 * Extração
 *
 * Mestrando  : Geandro Matos
 * Colaboradores : Murilo Matos
 * Data    : 08 de janeiro de 2021
 * Curso de mestrado: Ciência da computação
 * Nome do arquivo: extracao.js
 *
 * Este script tem como objetivo visitar os nós da AST que serão examinados e seus conteúdos extraídos. O
 * resultado dessa extração direcionada é um escopo reduzido que serve como entrada para
 * a regra 2 (normalização)
 * 
 * Recebe como entrada um código javascript e os os nós candidatos da AST,
 * que é a representação abstrata do código a ser investigado como entrada
 * 
 * Requerimentos: fs, esprima, ast-types, walk
*/

regra_1 = function (arquivo_2, nome_arquivo, nome_raiz) {
    /* ****************************************************************************
    *BIBLIOTECAS
    ******************************************************************************/
    const fs = require('fs')
    const esprima = require('esprima')
    const { visit } = require('ast-types')
    //A variável "normalizacao" recebe a 2º regra da identificação, chamada de "normalização"
    const regra_2 = require('../Regra_2_Normalizacao/normalizacao')
    /* ****************************************************************************
        *VARIÁVEIS GLOBAIS
    ******************************************************************************/
    //A variável "escopoReduzido" é inicializada como um escopo vazio no qual será inserido os resultados da extração
    escopoReduzido = []
    /*Para evitar problemas com arquivos que possuem nomes que comecem com números,
    os elementos iniciais de seus nomes são trocados*/
    switch (nome_arquivo[0]) {
        //Caso o arquivo possua um nome que comece com o número 0 o número 0 é trocado pela letra O 
        case '0':
            /*A variável "nome_ER" recebe o nome do arquivo e possui a função de nomear o escopo reduzido
            que será formado no final da execução*/
            nome_ER = nome_arquivo.replace(nome_arquivo[0], 'O')
            break
        //Caso o arquivo possua um nome que comece com qualquer número diferente de 0 o número em questão é trocado pelo símbolo "_"
        case '1':
            nome_ER = nome_arquivo.replace(nome_arquivo[0], '_')
            break
        case '2':
            nome_ER = nome_arquivo.replace(nome_arquivo[0], '_')
            break
        case '3':
            nome_ER = nome_arquivo.replace(nome_arquivo[0], '_')
            break
        case '4':
            nome_ER = nome_arquivo.replace(nome_arquivo[0], '_')
            break
        case '5':
            nome_ER = nome_arquivo.replace(nome_arquivo[0], '_')
            break
        case '6':
            nome_ER = nome_arquivo.replace(nome_arquivo[0], '_')
            break
        case '7':
            nome_ER = nome_arquivo.replace(nome_arquivo[0], '_')
            break
        case '8':
            nome_ER = nome_arquivo.replace(nome_arquivo[0], '_')
            break
        case '9':
            nome_ER = nome_arquivo.replace(nome_arquivo[0], '_')
            break
        default:
            nome_ER = nome_arquivo
            break
    }
    //A variável "sourceCode" recebe o código corrente
    const sourceCode = arquivo_2
    //Caso o código não possua nenhum problema, então a execução continua normalmente 
    try {
        //A função da extração é chamada possuindo como argumento o caminho do arquivo
        extracao(arquivo_2)
        /*É retirado a extensão ".js" do nome do arquivo para que os escopos do arquivo possam
        ser salvos com extensões ".csv" posteriormente, com exceção do escopo reduzido, que já é salvo no fim da extração */
        nome_arquivo = nome_arquivo.replace('.js', '')
        /*A 2º etapa da análise, a normalização, é chamada e desta forma verifica-se 
        se existem Fingerprintings no código corrente*/
        if (regra_2(nome_raiz,nome_arquivo) == '\n:(') {
            //Se não forem encontrados Fingerprintings, então o código é salvo na pasta "bases_sem_nada_encontrado"
            fs.writeFile(`/WBF_analyzer/pre-processamento/extracao/bases_defeituosas/bases_sem_nada_encontrado/${nome_raiz}/${nome_arquivo}.js`, sourceCode, function (err) {
                if (err) return console.log(err);
            });
        }
        else {
            /*Caso sejam encontrados Fingerprintings no código, retira-se a extensão ".js" da variável "nome_ER" para 
            que o escopo reduzido possa ser salvo na extensão ".csv"*/
            nome_ER = nome_ER.replace('.js', '')
            fs.writeFile(`/WBF_analyzer/identificacao/identificador/Regra_1_Extracao/Escopos_reduzidos/${nome_raiz}/${nome_ER}.csv`, `${escopoReduzidoCSV()}`, function (err) {
                if (err) return console.log(err);
            });
            escopoReduzido = []
        }
    }
    /*Caso o código possua algum problema, então o código é salvo na pasta
    "bases_erros"*/
    catch {
        fs.writeFile(`/WBF_analyzer/pre-processamento/extracao/bases_defeituosas/bases_erros/${nome_raiz}/${nome_arquivo}`, sourceCode, function (err) {
            if (err) { return console.log(err) }
        });
    }
    
    /*****************************************************************************
        * REGRA 1 - EXTRACÃO
    ______________________________________________________________________________
        * Abreviações usadas:
        * IDE = Identificador esquerdo
        * IDD = Identificador direito
        * obj0 = objeto 0
        * obj1 = objeto 1
        * obj2 = objeto 2
        * propri1 = propriedade 1
        * propri2 = propriedade 2
    ******************************************************************************/
    function extracao(arquivo_2) {
        //A variável "sourceCode" recebe o código corrente
        const sourceCode = arquivo_2
        //Com a utilização da biblioteca "esprima" é possível que variável "ast" receba a árvore abstrata do arquivo corrente
        const ast = esprima.parseScript(sourceCode, { tolerant: true }, { jsx: true })
        //A variável "objeto" é criada para construir o escopo reduzido
        objeto = { IDE: '', IDD: '', obj0: '', obj1: '', obj2: '', propri1: '', propri2: '' }
        /*A variável "array_identifier" é usada para armazenar as propriedades das chamadas de objetos
        que são encontradas na AST*/
        array_identifier = []
        //A variável "node_AssignmentExpression" recebe o nó candidato "AssignmentExpression"
        node_AssignmentExpression = ''
        //A variável "node_VariableDeclarator" recebe o nó candidato "VariableDeclarator"
        node_VariableDeclarator = ''
        //A variável "node_Call_expression" recebe o nó candidato "Call_expression"
        node_Call_expression = ''

        //Função "visit" visita os nós candidatos
        visit(ast, {
            //___________________________________________________________________________________________________________________________________________    
            /*****************************************************************************
             * 1º NÓ CANDIDATO: VARIABLE DECLARATOR
             ***************************************************************************** 
             * A função "visitVariableDeclarator()" extrai casos relacionados ao nó "VariableDeclarator"
             * Exemplo:
             * 
             * var h = navigator
             * ***************************************************************************/
            visitVariableDeclarator(path) {
                //A variável "node_VariableDeclarator" recebe o nó candidato "VariableDeclarator"
                node_VariableDeclarator = path.node
                //Primeiramente a operação lógica analisa se as propriedades "id" e "init" existem no nó candidato
                if (node_VariableDeclarator.id && node_VariableDeclarator.init) {
                    /*Se a propriedade "id" possuir a propriedade "name", então o nome da propriedade "id" do nó cadidato é atribuído 
                    para o IDE da linha corrente do escopo reduzido*/
                    if (node_VariableDeclarator.id.name) {
                        objeto.IDE = node_VariableDeclarator.id.name
                    }
                    /*"variableDeclarator_method" recebe o caminho da propriedade "init" do nó VariableDeclarator, 
                    para tornar mais prático a busca por "métodos" ao analisar a propriedade "callee"*/
                    variableDeclarator_method = node_VariableDeclarator.init
                    /*Caso o tipo da propriedade "init" do nó "VariableDeclarator" seja "ThisExpression",
                    o IDD da linha corrente do escopo reduzido recebe o token "this"*/
                    if (node_VariableDeclarator.init.type === 'ThisExpression') {
                        objeto.IDD = 'this'
                        //Uma nova linha é inserida no escopo reduzido 
                        escopoReduzido.push(objeto)
                        //Uma nova linha para o escopo reduzido é criada, para serem inseridos outros objetos e propriedades
                        objeto = { IDE: '', IDD: '', obj0: '', obj1: '', obj2: '', propri1: '', propri2: '' }
                    }
                    /*Se o tipo da propriedade "init" do nó "VariableDeclarator" for "NewExpression",
                    o IDD da linha corrente do escopo reduzido recebe o token "new"*/
                    else if (node_VariableDeclarator.init.type === 'NewExpression') {
                        objeto.IDD = 'new'
                        /*Caso a propriedade callee do nó  "VariableDeclarator" exista e esta propriedade
                        for do tipo 'Identifier', o IDD da linha corrente do escopo reduzido recebe: nome desta propriedade + "()",
                        sendo "()" para indicar que é um método*/
                        if (variableDeclarator_method.callee &&
                            variableDeclarator_method.callee.type === 'Identifier') { objeto.IDD += " " + variableDeclarator_method.callee.name + "()" }
                        //Uma nova linha é inserida no escopo reduzido 
                        escopoReduzido.push(objeto)
                        //Uma nova linha para o escopo reduzido é criada, para serem inseridos outros objetos e propriedades
                        objeto = { IDE: '', IDD: '', obj0: '', obj1: '', obj2: '', propri1: '', propri2: '' }
                    }
                    /*Caso o tipo da propriedade "init" do nó "VariableDeclarator" não seja "ThisExpression" ou "NewExpression",
                     é verificado se a propriedade possui um nome*/
                    else if (node_VariableDeclarator.init.name) {
                        /*Se a propriedade possuir um nome igual a "canvas", então o IDE da linha corrente do escopo reduzido recebe
                        um termo especial para identificar mais facilmente o objeto canvas, e o IDD recebe o nome da propriedade*/
                        if (node_VariableDeclarator.init.name == 'canvas') {
                            objeto.IDE += '_canvas'
                            objeto.IDD = node_VariableDeclarator.init.name
                        }
                        /*Caso o nome não seja igual a canvas, o nome é atribuido normalmente para o IDD, sem a necessidade de 
                        mudar o IDE*/
                        else {
                            objeto.IDD = node_VariableDeclarator.init.name
                        }
                        //Uma nova linha é inserida no escopo reduzido 
                        escopoReduzido.push(objeto)
                        //Uma nova linha para o escopo reduzido é criada, para serem inseridos outros objetos e propriedades
                        objeto = { IDE: '', IDD: '', obj0: '', obj1: '', obj2: '', propri1: '', propri2: '' }
                    }
                    /*Se a propriedade "init" possuir uma propriedade "value" e esta propriedade for do tipo "string",
                    então a função "tira_numero()" é invocada, com a intenção de analisar se este é um caso válido*/
                    else if (node_VariableDeclarator.init.value &&
                        typeof node_VariableDeclarator.init.value == 'string') {
                        tira_numero(node_VariableDeclarator.init.value.split('.'))
                    }
                }
                //Função "this.traverse(path)" para permitir que a travessia seja concluída
                this.traverse(path)
            },
            //___________________________________________________________________________________________________________________________________________
            /*****************************************************************************
             * 2º NÓ CANDIDATO: ASSIGMENT EXPRESSION
             ***************************************************************************** 
             * A função "visitAssignmentExpression()" extrai casos relacionados ao nó "AssignmentExpression"
             * Exemplo:
             * 
             * a = navigator
             * ***************************************************************************/
            visitAssignmentExpression(path) {
                //A variável "node_AssignmentExpression" recebe o nó candidato "AssignmentExpression"
                node_AssignmentExpression = path.node
                //Primeiramente a operação lógica analisa se as propriedades "left" e "right" existem no nó candidato
                if (node_AssignmentExpression.left && node_AssignmentExpression.right) {
                    /*Se a propriedade "left" possuir a propriedade "name", então o nome da propriedade "left" do nó cadidato é atribuído 
                    para o IDE da linha corrente do escopo reduzido*/
                    if (node_AssignmentExpression.left.name) {
                        objeto.IDE = node_AssignmentExpression.left.name
                    }
                    /*"variable_method" recebe o caminho da propriedade "right" do nó AssignmentExpression, 
                    para tornar mais prático a busca por "métodos" ao analisar a propriedade "callee"*/
                    variable_method = node_AssignmentExpression.right
                    /*Caso o tipo da propriedade "right" do nó "AssignmentExpression" seja "ThisExpression",
                    o IDD da linha corrente do escopo reduzido recebe o token "this"*/
                    if (node_AssignmentExpression.right.type === 'ThisExpression') {
                        objeto.IDD = 'this'
                        //Uma nova linha é inserida no escopo reduzido 
                        escopoReduzido.push(objeto)
                        //Uma nova linha para o escopo reduzido é criada, para serem inseridos outros objetos e propriedades
                        objeto = { IDE: '', IDD: '', obj0: '', obj1: '', obj2: '', propri1: '', propri2: '' }
                    }
                    /*Se o tipo da propriedade "right" do nó "AssignmentExpression" for "NewExpression",
                    o IDD da linha corrente do escopo reduzido recebe o token "new"*/
                    else if (node_AssignmentExpression.right.type === 'NewExpression') {
                        objeto.IDD = 'new'
                        /*Caso a propriedade callee do nó  "AssignmentExpression" exista e esta propriedade
                        for do tipo 'Identifier', o IDD da linha corrente do escopo reduzido recebe: nome desta propriedade + "()",
                        sendo "()" para indicar que é um método*/
                        if (variable_method.callee.type === 'Identifier') { objeto.IDD += " " + variable_method.callee.name + "()" }
                        //Uma nova linha é inserida no escopo reduzido 
                        escopoReduzido.push(objeto)
                        //Uma nova linha para o escopo reduzido é criada, para serem inseridos outros objetos e propriedades
                        objeto = { IDE: '', IDD: '', obj0: '', obj1: '', obj2: '', propri1: '', propri2: '' }
                    }
                    /*Caso o tipo da propriedade "right" do nó "AssignmentExpression" não seja "ThisExpression" ou "NewExpression",
                    é verificado se a propriedade possui um nome*/
                    else {
                        if (node_AssignmentExpression.right.name) {
                            /*Se a propriedade possuir um nome igual a "canvas", então o IDE da linha corrente do escopo reduzido recebe
                            um termo especial para identificar mais facilmente o objeto canvas, e o IDD recebe o nome da propriedade*/
                            if (node_AssignmentExpression.right.name == 'canvas') {
                                objeto.IDE += '_canvas'
                                objeto.IDD = node_AssignmentExpression.right.name
                            }
                            /*Caso o nome não seja igual a canvas, o nome é atribuido normalmente para o IDD, sem a necessidade de 
                            mudar o IDE*/
                            else {
                                objeto.IDD = node_AssignmentExpression.right.name
                            }
                            //Uma nova linha é inserida no escopo reduzido 
                            escopoReduzido.push(objeto)
                            //Uma nova linha para o escopo reduzido é criada, para serem inseridos outros objetos e propriedades
                            objeto = { IDE: '', IDD: '', obj0: '', obj1: '', obj2: '', propri1: '', propri2: '' }
                        }
                        /*Se a propriedade "right" possuir uma propriedade "value" e esta propriedade for do tipo "string",
                        então a função "tira_numero()" é invocada, com a intenção de analisar se este é um caso válido*/
                        else if (node_AssignmentExpression.right.value &&
                            typeof node_AssignmentExpression.right.value == 'string') {
                            tira_numero(node_AssignmentExpression.right.value.split('.'))
                        }
                    }
                }
                //Função "this.traverse(path)" para permitir que a travessia seja concluída
                this.traverse(path)
            },
            //___________________________________________________________________________________________________________________________________________ 
            /*****************************************************************************
             * 3º NÓ CANDIDATO: MEMBER EXPRESSION
             ***************************************************************************** 
             * A função "visitMemberExpression()" extrai casos relacionados ao nó "MemberExpression"
             * Exemplo:
             * 
             * oi = navigator.appName
             * ***************************************************************************/
            visitMemberExpression(path) {
                //A variável "node_MemberExpression" recebe o nó candidato "MemberExpression"
                node_MemberExpression = path.node
                //Se a propriedade "object" existir, então analísa-se as condições para preencher o obj0 da linha corrente do escopo reduzido
                if (node_MemberExpression.object) {
                    /*Se a propriedade "object" for do tipo "ThisExpression", então o obj0 da linha corrente do escopo reduzido
                    recebe "this"*/
                    if (node_MemberExpression.object.type === 'ThisExpression') { objeto.obj0 = 'this' }
                    /*Se a propriedade "object" for do tipo "NewExpression", então o obj0 da linha corrente do escopo reduzido
                    recebe "new Date()"*/
                    else if (node_MemberExpression.object.type === 'NewExpression') { objeto.obj0 = 'new Date()' }
                    /*Se a propriedade "object" não atender as condições acima, então verifica-se a existencia do nome da propriedade,
                    se o nome existir ele é atribuído para o obj0 da linha corrente do escopo reduzido*/
                    else if (node_MemberExpression.object.name) { objeto.obj0 = node_MemberExpression.object.name }

                }
                //A execução segue então para a análise da propriedade "property", a qual é verificado a existência
                if (node_MemberExpression.property &&
                    node_MemberExpression.object.object || node_MemberExpression.object.name ||
                    node_MemberExpression.object.type === 'NewExpression' || node_MemberExpression.object.type === 'ThisExpression') {
                    /*Caso a propriedade possua um nome o array "array_identifier" irá armazena-lo, pois sua função é armazenar
                    as propriedades das chamadas de objeto*/
                    if (node_MemberExpression.property.name) {
                        Name = node_MemberExpression.property.name
                        array_identifier.push(Name)
                        /*Se o nó "MemberExpression" for igual ao nó "Call_expression" e este possuir o valor "canvas",
                        então é acrescentado o termo "canvas" no IDE*/
                        if (node_MemberExpression === node_Call_expression &&
                            node_Call_expression_origem.arguments[0] &&
                            node_Call_expression_origem.arguments[0].value == 'canvas') {
                            //O IDE da linha corrente do escopo reduzido recebe o próprio IDE + o termo "_canvas" 
                            objeto.IDE += '_canvas'
                            //O IDD da linha corrente do escopo reduzido recebe o nome canvas 
                            objeto.IDD = 'canvas'
                            //O obj0 é limpo para sobrar apenas os identificadores
                            objeto.obj0 = ''
                            //O "array_identifier" é limpo para ser usado novamente posteriormente
                            array_identifier = []
                            //Uma nova linha é inserida no escopo reduzido 
                            escopoReduzido.push(objeto)
                            //Uma nova linha para o escopo reduzido é criada, para serem inseridos outros objetos e propriedades
                            objeto = { IDE: '', IDD: '', obj0: '', obj1: '', obj2: '', propri1: '', propri2: '' }
                        }
                        /*Se a propriedade do objeto for igual a "toDataURL", "getTime", "getContext" ou "getImageData" ou
                        o nó MemberExpression for igual ao nó "Call_expression",então a variável "Name" recebe a propriedade + "()", 
                        pra indicar que este caso trata-se de um método*/
                        else if (node_MemberExpression === node_Call_expression ||
                            Name == 'toDataURL' || Name == 'getTime' || Name == 'getContext' || Name == 'getImageData') {
                            array_identifier = []
                            array_identifier.push(Name)
                            array_identifier[0] += '()'
                            node_Call_expression = ''
                        }
                    }
                    /*Se o caso encontrado for algo semalhante a "a[0].appName", onde a[0] contém a palavra chave "navigator",
                    o obj0 da linha corrente do escopo reduzido recebe "a_0", para uma melhor identificação do caso*/
                    else if (node_MemberExpression.property.type === 'Literal' && !!objeto.obj0 != false &&
                        typeof node_MemberExpression.property.value == 'number') {
                        objeto.obj0 += '_' + node_MemberExpression.property.value
                    }
                    /*Se o caso encontrado for algo como 'navigator["vendor"]', obj1 da linha corrente do escopo reduzido recebe o 
                    valor da propriedade do nó "MemberExpression"*/
                    else if (node_MemberExpression.property.type === 'Literal' && !!objeto.obj0 != false) {
                        objeto.obj1 = node_MemberExpression.property.value
                    }
                    /*Se o obj0 existir então torna-se possível inserir todos os objetos e propriedades armazenados no "array_identifier"
                    na linha corrente do escopo reduzido*/
                    if (!!objeto.obj0 != false) {
                        //"propri2" recebe o primeiro elemento do array
                        objeto.propri2 = array_identifier[0]
                        /*Se "propri2" for igual a alguma propriedade especial do objeto canvas,
                        então este caso recebe um tratamento especial, que procura superar casos onde a extração é incomum, como:
                        *
                        *   var d = b.createElement("canvas"),
                        *   e = d.getContext && d.getContext("2d")
                        */
                        if (objeto.propri2 == 'toDataURL()' ||
                            objeto.propri2 == 'getContext()' ||
                            objeto.propri2 == 'getImageData()') {
                            if (!!objeto.IDE != false) {
                                //O IDE da linha corrente do escopo reduzido recebe a marcação canvas
                                objeto.IDE = objeto.obj0 + '_canvas'
                                //O IDD recebe o token "canvas"
                                objeto.IDD = 'canvas'
                                //propri2 é limpa
                                objeto.propri2 = ''
                                //Uma nova linha é inserida no escopo reduzido 
                                escopoReduzido.push(objeto)
                                //Uma nova linha para o escopo reduzido é criada, para serem inseridos outros objetos e propriedades
                                objeto = { IDE: '', IDD: '', obj0: '', obj1: '', obj2: '', propri1: '', propri2: '' }
                            }
                            /*Agora na nova linha, são inseridos os mesmos dados da linha anterior, porém agora 
                            a identificação torna-se mais fácil, pois:
                            //***************************************************************************************************
                                Antes do tratamento:
                                IDE: 'e', IDD: '', obj0: 'b', obj1: '', obj2: '', propri1: '', propri2:  'getContext()'
                            //***************************************************************************************************
                                Depois do tratamento:
                                IDE: 'b_canvas', IDD: 'canvas', obj0: '', obj1: '', obj2: '', propri1: '', propri2: ''
                                IDE: '', IDD: '', obj0: 'b_canvas', obj1: '', obj2: '', propri1: '', propri2: 'getContext()'
                            //****************************************************************************************************/
                            objeto.obj0 = node_MemberExpression.object.name + '_canvas'
                            objeto.propri2 = array_identifier[0]
                        }
                        //Se o 2º elemento do array existir, "propri1" o irá receber 
                        if (array_identifier[1]) { objeto.propri1 = array_identifier[1] }
                        //Se o 3º elemento do array existir, "obj2" o irá receber 
                        if (array_identifier[2]) { objeto.obj2 = array_identifier[2] }
                        //Se o 4º elemento do array existir, "obj1" o irá receber e uma nova linha é inserida no escopo reduzido 
                        if (array_identifier[3]) {
                            objeto.obj1 = array_identifier[3]
                            escopoReduzido.push(objeto)
                        }
                        //Se o 4º elemento do array não existir, "obj1" não irá receber nada e uma nova linha é inserida no escopo reduzido 
                        else { escopoReduzido.push(objeto) }
                        //Verica-se se a chamada encontradao não é um falso positivo como "navigator.appName = oi"
                        if (node_MemberExpression === node_AssignmentExpression.left) {
                            node_AssignmentExpression = ''
                            escopoReduzido.pop()
                        }
                        //Uma nova linha para o escopo reduzido é criada, para serem inseridos outros objetos e propriedades
                        objeto = { IDE: '', IDD: '', obj0: '', obj1: '', obj2: '', propri1: '', propri2: '' }
                        //o "array_identifier" é limpado
                        array_identifier = []
                    }
                }
                //Função "this.traverse(path)" para permitir que a travessia seja concluída
                this.traverse(path)
            },
            //___________________________________________________________________________________________________________________________________________ 
            /*****************************************************************************
             * 4º NÓ CANDIDATO: CALL EXPRESSION
             ***************************************************************************** 
             * A função "visitCallExpression()" visita o nó "CallExpression" e auxilia 
             * na extração de casos relacionados a este nó
             * Exemplo:
             * 
             * a = canvas.toDataURL()
             * ***************************************************************************/
            visitCallExpression(path) {
                //"node_Call_expression" recebe o caminho para propriedade "callee" do nó "CallExpression"
                node_Call_expression = path.node.callee
                //"node_Call_expression_origem" recebe o caminho para o nó "CallExpression"
                node_Call_expression_origem = path.node
                //Função "this.traverse(path)" para permitir que a travessia seja concluída
                this.traverse(path)
            },
            //___________________________________________________________________________________________________________________________________________ 
            /*****************************************************************************
             * 5º NÓ CANDIDATO: ARRAY EXPRESSION
             ***************************************************************************** 
             * A função "visitArrayExpression()" extrai casos relacionados ao nó "ArrayExpression"
             * Exemplo:
             * 
             * a = [navigator.appName, navigator]
             * a[1].appName
             * ***************************************************************************/
            visitArrayExpression(path) {
                //A variável "node_ArrayExpression" recebe o nó candidato "ArrayExpression"
                node_ArrayExpression = path.node
                //Se o nós "AssignmentExpression" ou "VariableDeclarator" existirem, então a execução continua normalmente
                if (node_AssignmentExpression || node_VariableDeclarator) {
                    //Se o array encontrado possuir elementos, a execução continua normalmente
                    if (!!node_ArrayExpression.elements != false) {
                        //Um laço percorre os elementos do array
                        for (i in node_ArrayExpression.elements) {
                            //Se o elemento corrente existir, a execução continua normalmente
                            if (node_ArrayExpression.elements[i]) {
                                /*Inicialmente verifica-se se o array se encaixa no caso onde: a = [navigator], ou seja,
                                possui o nó "ArrayExpression" igual a propriedade "right" do nó "AssignmentExpression"*/
                                if (node_AssignmentExpression.right == node_ArrayExpression) {
                                    //Se os nós forem iguais, então é verificado se o elemento corrente do array é um tipo "Identifier"
                                    if (node_ArrayExpression.elements[i].type === 'Identifier') {
                                        /*Se for um tipo "Identifier" então o nome do array + a posição do elemento é atribuída ao IDE
                                        da linha corrente do escopo reduzido*/
                                        objeto.IDE = node_AssignmentExpression.left.name + '_' + i
                                        //O IDD da linha corrente do escopo reduzido recebe o elemento
                                        objeto.IDD = node_ArrayExpression.elements[i].name
                                        //Uma nova linha é inserida no escopo reduzido 
                                        escopoReduzido.push(objeto)
                                        //Uma nova linha para o escopo reduzido é criada, para serem inseridos outros objetos e propriedades
                                        objeto = { IDE: '', IDD: '', obj0: '', obj1: '', obj2: '', propri1: '', propri2: '' }
                                    }
                                    /*Caso o elemento corrente do array for um tipo "ThisExpression", então o token "this" é atribuído
                                    ao IDD da linha corrente do escopo reduzido*/
                                    else if (node_ArrayExpression.elements[i].type === 'ThisExpression') {
                                        //O nome do array + a posição do elemento é atribuída ao IDE da linha corrente do escopo reduzido
                                        objeto.IDE = node_AssignmentExpression.left.name + '_' + i
                                        //O token "this" é atribuído ao IDD
                                        objeto.IDD = 'this'
                                        //Uma nova linha é inserida no escopo reduzido 
                                        escopoReduzido.push(objeto)
                                        //Uma nova linha para o escopo reduzido é criada, para serem inseridos outros objetos e propriedades
                                        objeto = { IDE: '', IDD: '', obj0: '', obj1: '', obj2: '', propri1: '', propri2: '' }
                                    }
                                    //Se o elemento for definido como um caso onde: a = ['navigator.appName']
                                    else if (node_ArrayExpression.elements[i].type == 'Literal' &&
                                        typeof node_ArrayExpression.elements[i].value == 'string') {
                                        /*O elemento é separado apartir do símbolo "." e desta forma constroi um array que possui
                                        seus compenentes, se existir mais de 1 componente, então os componetes do elemento divido
                                        serão atribuídos para os objetos e propriedades*/
                                        if (node_ArrayExpression.elements[i].value.split('.').length > 1) {
                                            //A variável "value_s" recebe os componentes do elemento dividido
                                            value_s = node_ArrayExpression.elements[i].value.split('.')
                                            //os componentes são atribúidos para objetos e propriedades
                                            objeto.obj0 = value_s[0]
                                            objeto.obj1 = value_s[1]
                                            if (!!value_s[2] != false) { objeto.obj2 = value_s[2] }
                                            if (!!value_s[3] != false) { objeto.propri1 = value_s[3] }
                                            if (!!value_s[4] != false) { objeto.propri2 = value_s[4] }
                                            //Uma nova linha é inserida no escopo reduzido 
                                            escopoReduzido.push(objeto)
                                            //Uma nova linha para o escopo reduzido é criada, para serem inseridos outros objetos e propriedades
                                            objeto = { IDE: '', IDD: '', obj0: '', obj1: '', obj2: '', propri1: '', propri2: '' }
                                        }
                                        /*Caso o elemento dividido não possuir mais de 1 componente, então este forma um par chave e valor
                                        para o dicionário de identificadores, utilizado na regra 2*/
                                        else {
                                            //O nome do array + a posição do componente são atribuídos ao IDE da linha corrente do escopo reduzido
                                            objeto.IDE = node_AssignmentExpression.left.name + '_' + i
                                            //O IDD da linha corrente do escopo reduzido recebe o componente  
                                            objeto.IDD = node_ArrayExpression.elements[i].value
                                            //Uma nova linha é inserida no escopo reduzido
                                            escopoReduzido.push(objeto)
                                            //Uma nova linha para o escopo reduzido é criada, para serem inseridos outros objetos e propriedades
                                            objeto = { IDE: '', IDD: '', obj0: '', obj1: '', obj2: '', propri1: '', propri2: '' }
                                        }
                                    }
                                }
                                /*Caso o array se encaixar no caso onde: var a = [navigator], ou seja,
                                possui o nó "ArrayExpression" igual a propriedade "init" do nó "node_VariableDeclarator"*/
                                else if (node_VariableDeclarator.init == node_ArrayExpression) {
                                    /*Se o elemento corrente do array em análise for do tipo "Identifier",
                                    então é formado um par chave e valor para o dicionário de identificadores, utilizado na regra 2*/
                                    if (node_ArrayExpression.elements[i].type === 'Identifier') {
                                        //O nome do array + a posição do elemento é atribuída ao IDE da linha corrente do escopo reduzido
                                        objeto.IDE = node_VariableDeclarator.id.name + '_' + i
                                        //O IDD da linha corrente do escopo reduzido recebe o elemento corrente 
                                        objeto.IDD = node_ArrayExpression.elements[i].name
                                        //Uma nova linha é inserida no escopo reduzido
                                        escopoReduzido.push(objeto)
                                        //Uma nova linha para o escopo reduzido é criada, para serem inseridos outros objetos e propriedades
                                        objeto = { IDE: '', IDD: '', obj0: '', obj1: '', obj2: '', propri1: '', propri2: '' }
                                    }
                                    //Se o elemento corrente do array em análise for do tipo "ThisExpression", um par chave e valor também é formado
                                    else if (node_ArrayExpression.elements[i].type === 'ThisExpression') {
                                        //O nome do array + a posição do elemento é atribuída ao IDE da linha corrente do escopo reduzido
                                        objeto.IDE = node_VariableDeclarator.id.name + '_' + i
                                        //IDD da linha corrente do escopo reduzido recebe o token "this"
                                        objeto.IDD = 'this'
                                        //Uma nova linha é inserida no escopo reduzido
                                        escopoReduzido.push(objeto)
                                        //Uma nova linha para o escopo reduzido é criada, para serem inseridos outros objetos e propriedades
                                        objeto = { IDE: '', IDD: '', obj0: '', obj1: '', obj2: '', propri1: '', propri2: '' }
                                    }
                                    //Se o elemento for definido como um caso onde: var a = ['navigator.appName']
                                    else if (node_ArrayExpression.elements[i].type == 'Literal' &&
                                        typeof node_ArrayExpression.elements[i].value == 'string') {
                                        /*O elemento é separado apartir do símbolo "." e desta forma constroi um array que possui
                                        seus compenentes, se existir mais de 1 componente, então os componetes do elemento divido
                                        serão atribuídos para os objetos e propriedades*/
                                        if (node_ArrayExpression.elements[i].value.split('.').length > 1) {
                                            //A variável "value_s" recebe os componentes do elemento dividido
                                            value_s = node_ArrayExpression.elements[i].value.split('.')
                                            //os componentes são atribúidos para objetos e propriedades
                                            objeto.obj0 = value_s[0]
                                            objeto.obj1 = value_s[1]
                                            if (!!value_s[2] != false) { objeto.obj2 = value_s[2] }
                                            if (!!value_s[3] != false) { objeto.propri1 = value_s[3] }
                                            if (!!value_s[4] != false) { objeto.propri2 = value_s[4] }
                                            //Uma nova linha é inserida no escopo reduzido 
                                            escopoReduzido.push(objeto)
                                            //Uma nova linha para o escopo reduzido é criada, para serem inseridos outros objetos e propriedades
                                            objeto = { IDE: '', IDD: '', obj0: '', obj1: '', obj2: '', propri1: '', propri2: '' }
                                        }
                                        /*Caso o elemento dividido não possuir mais de 1 componente, então este forma um par chave e valor
                                        para o dicionário de identificadores, utilizado na regra 2*/
                                        else {
                                            //O nome do array + a posição do componente são atribuídos ao IDE da linha corrente do escopo reduzido
                                            objeto.IDE = node_VariableDeclarator.id.name + '_' + i
                                            //O IDD da linha corrente do escopo reduzido recebe o componente  
                                            objeto.IDD = node_ArrayExpression.elements[i].value
                                            //Uma nova linha é inserida no escopo reduzido 
                                            escopoReduzido.push(objeto)
                                            //Uma nova linha para o escopo reduzido é criada, para serem inseridos outros objetos e propriedades
                                            objeto = { IDE: '', IDD: '', obj0: '', obj1: '', obj2: '', propri1: '', propri2: '' }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                //Se os nós "AssignmentExpression" ou "VariableDeclarator" não existirem
                else {
                    //Um laço percorre o array
                    for (i in node_ArrayExpression.elements) {
                        //Verifica-se a existência do elemento corrente do array
                        if (!!node_ArrayExpression.elements[i] != false) {
                            //Verifica-se se o tipo do elemento corrente é um "Literal"
                            if (node_ArrayExpression.elements[i].type == 'Literal') {
                                /*Caso seja um tipo Literal e possuir o símbolo ".", é invocado a função "tira_numero()"
                                para verificar se trata-se de um caso válido*/
                                if (typeof node_ArrayExpression.elements[i].value == 'string' &&
                                    node_ArrayExpression.elements[i].value.split('.').length > 1) {
                                    tira_numero(node_ArrayExpression.elements[i].value.split('.'))
                                }
                            }
                        }
                    }
                }
                this.traverse(path)
            }
        })
    }

    /* ****************************************************************************
        *FUNÇÕES EXTRAS
    ******************************************************************************/
    //Função para salvar o escopo reduzido no formato da extenção ".csv"
    function escopoReduzidoCSV() {
        //Colunas com os nomes:  'obj0', 'obj1', 'obj2', 'propri1' e 'propri2' são criadas
        resultadoescopoReduzido = 'obj0' + ',' + 'obj1' + ',' + 'obj2' + ',' + 'propri1' + ',' + 'propri2' + '\n\n'
        //Um laço percorre o escopo reduzido, salvando os valores de acordo com as colunas
        for (i in escopoReduzido) {
            resultadoescopoReduzido += escopoReduzido[i].obj0 + "," + escopoReduzido[i].obj1 + ','
                + escopoReduzido[i].obj2 + ',' + escopoReduzido[i].propri1 + ',' + escopoReduzido[i].propri2 + '\n\n'
        }
        //O escopo reduzido no formato ".csv" é retornado
        return resultadoescopoReduzido
    }
    //___________________________________________________________________________________________________________________________________________ 
    /*Função "tira_numero() recebe como valor uma string a ser avaliada"
    Exemplo:
    
    Casos inválidos: '8.9','navigator.0'  
    Casos válidos: 'navigator.appName'
    */
    function tira_numero(valor) {
        /*A variável "finger_print_string" recebe o valor já divido a partir do símbolo ".", onde
        "navigator.appName" torna-se ["navigator", "appName"]*/
        finger_print_string = valor
        //A variável "finger_print_0" recebe o primeiro elemento do array "finger_print_string"
        finger_print_0 = finger_print_string[0]
        //"contador_number" indicará se o caso é válido incrementando mais 1 ao contador quando o caso for inválido
        contador_number = 0
        //Se o array "finger_print_string" possuir um 5º elemento
        if (!!finger_print_string[4] != false) {
            //A variável "finger_print_4" recebe o 5º elemento
            finger_print_4 = finger_print_string[4]
            //A função "tira_numero_2()" verifica se o elemento é válido
            contador_number = tira_numero_2(finger_print_4, contador_number)
            //Se for válido o elemento é atribuído para "propri2" na linha corrente do escopo reduzido
            if (contador_number == 0) {
                objeto.propri2 = finger_print_string[4]
            }
            //Se não, "contador_number" volta a possuir o valor 0 novamente
            else {
                contador_number = 0
            }
        }
        //Se o array "finger_print_string" possuir um 4º elemento
        if (!!finger_print_string[3] != false) {
            //A variável "finger_print_3" recebe o 4º elemento
            finger_print_3 = finger_print_string[3]
            //A função "tira_numero_2()" verifica se o elemento é válido
            contador_number = tira_numero_2(finger_print_3, contador_number)
            //Se for válido o elemento é atribuído para "propri1" na linha corrente do escopo reduzido
            if (contador_number == 0) {
                objeto.propri1 = finger_print_string[3]
            }
            //Se não, "contador_number" volta a possuir o valor 0 novamente
            else {
                contador_number = 0
            }
        }
        //Se o array "finger_print_string" possuir um 3º elemento
        if (!!finger_print_string[2] != false) {
            //A variável "finger_print_2" recebe o 3º elemento
            finger_print_2 = finger_print_string[2]
            //A função "tira_numero_2()" verifica se o elemento é válido
            contador_number = tira_numero_2(finger_print_2, contador_number)
            //Se for válido o elemento é atribuído para "obj2" na linha corrente do escopo reduzido
            if (contador_number == 0) {
                objeto.obj2 = finger_print_string[2]
            }
            //Se não, "contador_number" volta a possuir o valor 0 novamente
            else {
                contador_number = 0
            }
        }
        //Se o array "finger_print_string" possuir um 2º elemento
        if (!!finger_print_string[1] != false) {
            //A variável "finger_print_1" recebe o 2º elemento
            finger_print_1 = finger_print_string[1]
            //A função "tira_numero_2()" verifica se o elemento é válido
            contador_number = tira_numero_2(finger_print_1, contador_number)
            //Se for válido o elemento é atribuído para "obj1" na linha corrente do escopo reduzido
            if (contador_number == 0) {
                objeto.obj1 = finger_print_string[1]
            }
            //Se não, "contador_number" volta a possuir o valor 0 novamente
            else {
                contador_number = 0
            }
            //É verificado se o elemento que ocupa a 1º posição do array é válido
            contador_number = tira_numero_2(finger_print_0, contador_number)
            //Se for válido o elemento é atribuído para "obj0" na linha corrente do escopo reduzido
            if (contador_number == 0) {
                objeto.obj0 = finger_print_string[0]
            }
            //Se não, "contador_number" volta a possuir o valor 0 novamente
            else {
                contador_number = 0
            }
            //Uma nova linha é inserida no escopo reduzido 
            escopoReduzido.push(objeto)
            //Uma nova linha para o escopo reduzido é criada, para serem inseridos outros objetos e propriedades
            objeto = { IDE: '', IDD: '', obj0: '', obj1: '', obj2: '', propri1: '', propri2: '' }
        }
        //Se o array "finger_print_string" possuir apenas 1 elemento:
        //Caso o array só possua 1 elemento, então é criado um par chave e valor para o dicionário de identificadores
        else {
            //É verificado se o elemento que ocupa a 1º posição do array é válido
            contador_number = tira_numero_2(finger_print_0, contador_number)
            //Se for válido o elemento é atribuído para "IDD" na linha corrente do escopo reduzido
            if (contador_number == 0) {
                objeto.IDD = finger_print_0
                //Uma nova linha é inserida no escopo reduzido 
                escopoReduzido.push(objeto)
                //Uma nova linha para o escopo reduzido é criada, para serem inseridos outros objetos e propriedades
                objeto = { IDE: '', IDD: '', obj0: '', obj1: '', obj2: '', propri1: '', propri2: '' }
            }
            else {
                contador_number = 0
            }
        }
    }
    //___________________________________________________________________________________________________________________________________________ 
    /*Função "tira_numero_2() recebe como valor um componente de um array de strings a ser avaliado" 
    e váriavel "contador_number", que verifica se o caso é válido ou não*/
    function tira_numero_2(finger_print, contador_number) {
        //Um laço percorre o elemento e verifica se existe algum número nele
        for (number in finger_print) {
            if (finger_print[number] == 1 || finger_print[number] == 2 || finger_print[number] == 3 ||
                finger_print[number] == 4 || finger_print[number] == 5 || finger_print[number] == 5 ||
                finger_print[number] == 6 || finger_print[number] == 7 || finger_print[number] == 8 ||
                finger_print[number] == 9 || finger_print[number] == 0) {
                //Se existir, "contador_number" é incrementado e o elemento é considerado inválido
                contador_number++
            }
        }
        //Um laço percorre o elemento e verifica se existe algum "<" ou ">" nele
        for (simbol in finger_print) {
            if (finger_print[simbol] == '<' || finger_print[simbol] == '>') {
                //Se existir, "contador_number" é incrementado e o elemento é considerado inválido
                contador_number++
            }
        }
        //Um laço percorre o elemento e verifica se existe algum "var", "let" ou "const" nele
        finger_print = finger_print.split(' ')
        for (variavel in finger_print) {
            if (finger_print[variavel] == 'var' || finger_print[variavel] == 'let' || finger_print[variavel] == 'const') {
                //Se existir, "contador_number" é incrementado e o elemento é considerado inválido
                contador_number++
            }
        }
        //A váriavel "contador_number" é retornada indicando se o caso é válido ou inválido
        return contador_number
    }
}

module.exports = regra_1
