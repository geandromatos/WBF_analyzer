/*
 * Tratamento para bases parte 1
 *
 * Mestrando  : Geandro Matos
 * Colaboradores : Murilo Matos
 * Data    : 08 de janeiro de 2021
 * Curso de mestrado: Ciência da computação
 * Nome do arquivo: tratamento_bases_1.js
 *
 * Este script tem como objetivo receber códigos javascripts enviados pelos usuários 
 * e retirar a sintaxe desconhecida, desofuscá-los e organizá-los
 * 
 * Recebe como entrada um código javascript ofuscado e com alguns elementos de sintaxe 
 * desconhecida pela linguagem javascript
 * 
 * Produz como saída um código organizado e desofuscado
 * 
 * Requerimentos: js-beautify e fs
 */
//Função da desofuscação é declarada
tratamento_bases_1 = function (caminho, fs, beautify,pasta_base_nome) {
  //Com a biblioteca "fs", é possível acessar o arquivo que foi passado pelo usuário
  fs.readFile(caminho, 'utf8', function (err, dados) {
    //A variável "array_path" é declarada e sua função é armazenar o caminho do arquivo
    array_path = []
    //O caminho do arquivo é passado para a variável "array_path"
    array_path.push(caminho)
    //O código de tratamento para bases de usuários é chamado
    tratamento_bases_2 = require('./tratamento_bases_2')
    //A variável "nome_codigo" é declarada e recebe o nome do arquivo a partir da variável "array_path"
    array_path = array_path[0].split("/")
    nome_codigo = array_path.pop()
    //A variável "dados_2" recebe o arquivo para poder modificá-lo
    dados_2 = dados
    dados_2 = dados_2.split('\n')
    //A variável "dados_3" é declarada e posteriormente armazenará o resultado final
    dados_3 = ''
    /*A variável "contador_not_script" é inicializada em 0 e representará os indices das posições dos elementos do vetor "dados_2",
    que armazena o arquivo que está sendo tratado*/
    contador_not_script = 0
    /* ****************************************************************************
    * 
    * Código abaixo para a remoção de códigos que possuem a tag script porém não tratam-se de código javascript
    * Exemplos:
    * <script type='application/ld+json'>
    * {
    *   "@context":"http:\/\/schema.org","@type":"WebSite","url":"https:\/\/www.100tb.com\/","name":"100TB.com","potentialAction":
    *   {
    *     "@type":"SearchAction","target":"https:\/\/www.100tb.com\/?s={search_term_string}","query-input":"required name=search_term_string"
    *   }
    * }
    * </script>
    * -------       --------       --------       --------       --------       ---
    * <script id="yummly-generic-dialog" type="html/template">
    *  <div class="dialog-wrapper">
    *    <div>
    *      <h1>Uh oh!</h1>
    *      <a class="ninja-dismiss ninja-close-dialog dark"><span class="y-icon">&#x59;</span></a>
    *      <div class="dialog-content">
    *        <p class="confirm"></p>
    *        <button class="ninja-dismiss btn-secondary">OK</button>
    *      </div>
    *    </div>
    *  </div>
    *</script>
    * ***************************************************************************/
    //Laço que percorre o arquivo passado pelo usuário
    while (contador_not_script <= dados_2.length - 1) {
      //A variável "remove_not_script" recebe uma linha de código do arquivo corrente
      remove_not_script = dados_2[contador_not_script].trim()
      /*Se a linha de código analisada possuir os primeiros 7 elementos iguais a "<script" 
      porém em seguida vier algo que indique que não trata-se de um código javascript, esta linha de código é retirada*/
      if (remove_not_script.substring(0, 7) == '<script' && remove_not_script.substring(0, 32) != '<script type = "text/javascript"' &&
        remove_not_script.substring(0, 30) != '<script type="text/javascript"' && remove_not_script.substring(0, 30) != "<script type='text/javascript'" &&
        remove_not_script.substring(0, 31) != '<script type ="text/javascript"' && remove_not_script.substring(0, 31) != "<script type ='text/javascript'" &&
        remove_not_script.substring(0, 30) != '<script type="text/JavaScript"' && remove_not_script.substring(0, 30) != "<script type='text/JavaScript'" &&
        remove_not_script.substring(0, 29) != '<script language="javascript"' && remove_not_script.substring(0, 29) != "<script language='javascript'" &&
        remove_not_script.substring(0, 13) != '<script style' && 
        remove_not_script.substring(0, 31) != '<script type= "text/javascript"' && remove_not_script.substring(0, 31) != "<script type= 'text/javascript'" &&
        remove_not_script.substring(0, 17) != '<script async="">' && remove_not_script.substring(0, 17) != "<script async=''>" &&
        remove_not_script.substring(0, 8) != '<script>' && remove_not_script[remove_not_script.length - 1] != '/' && remove_not_script[remove_not_script.length - 1] != '\\') {

        if (remove_not_script.substring(remove_not_script.length - 9, remove_not_script.length) == '/script >' ||
          remove_not_script.substring(remove_not_script.length - 8, remove_not_script.length) == '/script>') {
          dados_2[contador_not_script] = ''
        }
        /*Se os últimos elementos da linha de código analisada forem diferentes de "/script>" ou "/script >", 
        o programa segue para a próxima linha em busca da tag que indica o final do código*/
        else {
          contador_not_script_2 = contador_not_script
          dados_2[contador_not_script] = ''
          while (contador_not_script_2 <= dados_2.length - 1) {
            remove_not_script_2 = dados_2[contador_not_script_2].trim()
            //Quando a tag que fecha o código é encontrada, o bloco de código é retirado
            if (remove_not_script_2.substring(remove_not_script_2.length - 9, remove_not_script_2.length) == '/script >' ||
              remove_not_script_2.substring(remove_not_script_2.length - 8, remove_not_script_2.length) == '/script>') {
              dados_2[contador_not_script_2] = ''
              break
            }
            else {
              dados_2[contador_not_script_2] = ''
            }
            contador_not_script_2++
          }
        }
      }
      contador_not_script++
    }
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    /* ****************************************************************************
    * Código abaixo para a remoção de códigos que possuem a tag style 
    * Exemplos:
    * <style>
    * .slider-wrapper {
    * 	padding-left:11px;
    * 	}
    * .theme-default .nivoSlider {
    * 	position:relative;
    * 	background:#fff url(portals/0/1EDIImages/front-page-slider/loading.gif) no-repeat 50% 50%;
    * }
    * .theme-default .nivoSlider img {
    * 	position:absolute;
    * 	top:0px;
    * 	left:0px;
    * 	display:none;
    * }
    * .theme-default .nivoSlider a {
    * 	border:0;
    * 	display:block;
    * }
    * </style>
    ****************************************************************************/
    /*A variável "contador_style" é inicializada em 0 e representará os indices das posições dos elementos do vetor "dados_2",
    que armazena o arquivo que está sendo tratado*/
    contador_style = 0
    //Laço que percorre o arquivo passado pelo usuário
    while (contador_style <= dados_2.length - 1) {
      //A variável "remove_style" recebe uma linha de código do arquivo corrente
      remove_style = dados_2[contador_style].trim()
      /*Se a linha de código analisada possuir os primeiros 6 elementos iguais a "<style" e  
        os últimos 7 elementos iguais "/style>" esta linha de código é retirada*/
      if (remove_style.substring(0, 6) == '<style') {
        if (remove_style.substring(remove_style.length - 7, remove_style.length) == '/style>') {
          dados_2[contador_style] = ''
        }
        /*Se os últimos elementos da linha de código analisada forem diferentes de "/style>", 
        o programa segue para a próxima linha em busca da tag que indica o final do código*/
        else {
          contador_style_2 = contador_style
          dados_2[contador_style] = ''
          while (contador_style_2 <= dados_2.length - 1) {
            remove_style_2 = dados_2[contador_style_2].trim()
            //Quando a tag que fecha o código é encontrada, o bloco de código é retirado
            if (remove_style_2.substring(remove_style_2.length - 7, remove_style_2.length) == '/style>') {
              dados_2[contador_style_2] = ''
              break
            }
            else {
              dados_2[contador_style_2] = ''
            }
            contador_style_2++
          }
        }
      }
      contador_style++
    }
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    /* ****************************************************************************
    * Código abaixo para a remoção de códigos que possuem a tag !DOCTYPE, !doctype, BODY, body, HEAD, head, html e HTML
    * Exemplos:
    *		<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
    *<HTML><HEAD>
    *<TITLE>400 Bad Request</TITLE>
    *</HEAD><BODY>
    *<H1>Bad Request</H1>
    *Your browser sent a request that this server could not understand.<P>
    *The request line contained invalid characters following the protocol string.<P>
    *<P>
    *</BODY></HTML>
    *
    ****************************************************************************/
    /*A variável "contador_HTML_DOCTYPE" é inicializada em 0 e representará os indices das posições dos elementos do vetor "dados_2",
    que armazena o arquivo que está sendo tratado*/
    contador_HTML_DOCTYPE = 0
    //Laço que percorre o arquivo passado pelo usuário
    while (contador_HTML_DOCTYPE <= dados_2.length - 1) {
      //A variável "remove_DOCTYPE" recebe uma linha de código do arquivo corrente
      remove_DOCTYPE = dados_2[contador_HTML_DOCTYPE].trim()
      /*Se a linha de código analisada possuir os primeiros elementos iguais a uma das tags abaixo e  
        os últimos elementos iguais aos fechamentos correspondentes destas tags, esta linha de código é retirada*/
      if (remove_DOCTYPE.substring(0, 9) == '<!DOCTYPE' || remove_DOCTYPE.substring(0, 10) == '< !DOCTYPE' ||
        remove_DOCTYPE.substring(0, 9) == '<!doctype' || remove_DOCTYPE.substring(0, 10) == '< !doctype' ||
        remove_DOCTYPE.substring(0, 5) == '<BODY' || remove_DOCTYPE.substring(0, 6) == '< BODY' ||
        remove_DOCTYPE.substring(0, 5) == '<body' || remove_DOCTYPE.substring(0, 6) == '< body' ||
        remove_DOCTYPE.substring(0, 5) == '<HEAD' || remove_DOCTYPE.substring(0, 6) == '< HEAD' ||
        remove_DOCTYPE.substring(0, 5) == '<head' || remove_DOCTYPE.substring(0, 6) == '< head' ||
        remove_DOCTYPE.substring(0, 5) == '<html' || remove_DOCTYPE.substring(0, 6) == '< html' ||
        remove_DOCTYPE.substring(0, 5) == '<HTML' || remove_DOCTYPE.substring(0, 6) == '< HTML') {
        if (remove_DOCTYPE.substring(remove_DOCTYPE.length - 7, remove_DOCTYPE.length) == '/HTML >' ||
          remove_DOCTYPE.substring(remove_DOCTYPE.length - 6, remove_DOCTYPE.length) == '/HTML>' ||
          remove_DOCTYPE.substring(remove_DOCTYPE.length - 7, remove_DOCTYPE.length) == '/BODY >' ||
          remove_DOCTYPE.substring(remove_DOCTYPE.length - 6, remove_DOCTYPE.length) == '/BODY>' ||
          remove_DOCTYPE.substring(remove_DOCTYPE.length - 7, remove_DOCTYPE.length) == '/body >' ||
          remove_DOCTYPE.substring(remove_DOCTYPE.length - 6, remove_DOCTYPE.length) == '/body>' ||
          remove_DOCTYPE.substring(remove_DOCTYPE.length - 7, remove_DOCTYPE.length) == '/HEAD >' ||
          remove_DOCTYPE.substring(remove_DOCTYPE.length - 6, remove_DOCTYPE.length) == '/HEAD>' ||
          remove_DOCTYPE.substring(remove_DOCTYPE.length - 7, remove_DOCTYPE.length) == '/head >' ||
          remove_DOCTYPE.substring(remove_DOCTYPE.length - 6, remove_DOCTYPE.length) == '/head>' ||
          remove_DOCTYPE.substring(remove_DOCTYPE.length - 7, remove_DOCTYPE.length) == '/html >' ||
          remove_DOCTYPE.substring(remove_DOCTYPE.length - 6, remove_DOCTYPE.length) == '/html>' ||
          remove_DOCTYPE.substring(remove_DOCTYPE.length - 7, remove_DOCTYPE.length) == '/HTML >' ||
          remove_DOCTYPE.substring(remove_DOCTYPE.length - 6, remove_DOCTYPE.length) == '/HTML>') {
          dados_2[contador_HTML_DOCTYPE] = ''
        }
        /*Se os últimos elementos da linha de código analisada forem diferentes dos fechamentos correspondentes das tags apresentadas, 
        o programa segue para a próxima linha em busca da tag que indica o final do código*/
        else {
          contador_HTML_DOCTYPE_2 = contador_HTML_DOCTYPE
          dados_2[contador_HTML_DOCTYPE] = ''
          while (contador_HTML_DOCTYPE_2 <= dados_2.length - 1) {
            remove_DOCTYPE_2 = dados_2[contador_HTML_DOCTYPE_2].trim()
            //Quando a tag que fecha o código é encontrada, o bloco de código é retirado
            if (remove_DOCTYPE_2.substring(remove_DOCTYPE_2.length - 7, remove_DOCTYPE_2.length) == '/HTML >' ||
              remove_DOCTYPE_2.substring(remove_DOCTYPE_2.length - 6, remove_DOCTYPE_2.length) == '/HTML>' ||
              remove_DOCTYPE_2.substring(remove_DOCTYPE_2.length - 7, remove_DOCTYPE_2.length) == '/BODY >' ||
              remove_DOCTYPE_2.substring(remove_DOCTYPE_2.length - 6, remove_DOCTYPE_2.length) == '/BODY>' ||
              remove_DOCTYPE_2.substring(remove_DOCTYPE_2.length - 7, remove_DOCTYPE_2.length) == '/body >' ||
              remove_DOCTYPE_2.substring(remove_DOCTYPE_2.length - 6, remove_DOCTYPE_2.length) == '/body>' ||
              remove_DOCTYPE_2.substring(remove_DOCTYPE_2.length - 7, remove_DOCTYPE_2.length) == '/HEAD >' ||
              remove_DOCTYPE_2.substring(remove_DOCTYPE_2.length - 6, remove_DOCTYPE_2.length) == '/HEAD>' ||
              remove_DOCTYPE_2.substring(remove_DOCTYPE_2.length - 7, remove_DOCTYPE_2.length) == '/head >' ||
              remove_DOCTYPE_2.substring(remove_DOCTYPE_2.length - 6, remove_DOCTYPE_2.length) == '/head>' ||
              remove_DOCTYPE_2.substring(remove_DOCTYPE_2.length - 7, remove_DOCTYPE_2.length) == '/html >' ||
              remove_DOCTYPE_2.substring(remove_DOCTYPE_2.length - 6, remove_DOCTYPE_2.length) == '/html>' ||
              remove_DOCTYPE_2.substring(remove_DOCTYPE_2.length - 7, remove_DOCTYPE_2.length) == '/HTML >' ||
              remove_DOCTYPE_2.substring(remove_DOCTYPE_2.length - 6, remove_DOCTYPE_2.length) == '/HTML>' ||
              remove_DOCTYPE_2.substring(remove_DOCTYPE_2.length - 6, remove_DOCTYPE_2.length) == '/ins >' ||
              remove_DOCTYPE_2.substring(remove_DOCTYPE_2.length - 5, remove_DOCTYPE_2.length) == '/ins>') {
              dados_2[contador_HTML_DOCTYPE_2] = ''
              break
            }
            else {
              dados_2[contador_HTML_DOCTYPE_2] = ''
            }
            contador_HTML_DOCTYPE_2++
          }
        }
      }
      contador_HTML_DOCTYPE++
    }
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    /* ****************************************************************************
    * Código abaixo para a remoção de códigos que possuem a tag script com o elemento "defer>" no final
    * Exemplos:
    * 
    *<script type="text/javascript" defer>
    *   clearMenus() !isActive 
    *</script>
    *
    ****************************************************************************/
    /*A variável "contador_defer" é inicializada em 0 e representará os indices das posições dos elementos do vetor "dados_2",
    que armazena o arquivo que está sendo tratado*/
    contador_defer = 0
    //Laço que percorre o arquivo passado pelo usuário
    while (contador_defer <= dados_2.length - 1) {
      //A variável "remove_defer" recebe uma linha de código do arquivo corrente
      remove_defer = dados_2[contador_defer].trim()
      /*Se a linha de código analisada possuir os primeiros 13 elementos iguais a "<script type=" e  
        os últimos 6 elementos iguais "defer>" esta linha de código é retirada*/
      if (remove_defer.substring(0, 13) == '<script type=' && remove_defer.substring(remove_defer.length - 6, remove_defer.length) == 'defer>') {
        contador_defer_2 = contador_defer
        dados_2[contador_defer] = ''
        while (contador_defer_2 <= dados_2.length - 1) {
          remove_defer_2 = dados_2[contador_defer_2].trim()
          //Quando a tag que fecha o código é encontrada, o bloco de código é retirado
          if (remove_defer_2.substring(remove_defer_2.length - 9, remove_defer_2.length) == '/script >' ||
            remove_defer_2.substring(remove_defer_2.length - 8, remove_defer_2.length) == '/script>') {
            dados_2[contador_defer_2] = ''
            break
          }
          else {
            dados_2[contador_defer_2] = ''
          }
          contador_defer_2++
        }
      }
      contador_defer++
    }
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    /* ****************************************************************************
    * Código abaixo para a remoção de elementos que estão entre "<!--" e "-->"
    * Exemplos:
    * 
    * <!--
    * MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM 
    * MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM 
    * MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM 
    * MMMMMMMMoY`````/mMh:`````./m=`````+My`````/MMMMMMM 
    * MMMMMMMo        `d         -m     `M/     :MMMMMMM 
    * MMMMMMM:   .d    o    m:   `m      m.     :MMMMMMM 
    * MMMMMMM:   .mooooy    m:   `m      +      :MMMMMMM 
    * MMMMMMM:   .MMMMMh    m:   `m             :MMMMMMM 
    * MMMMMMM:   .MMMMMh    m:   `m    `    `   :MMMMMMM 
    * MMMMMMM:   .MMMMMh    m:   `m    +   .:   :MMMMMMM 
    * MMMMMMM:   `oooooy    m.   `m    s   i:   :MMMMMMM 
    * MMMMMMMm.        h.        +m    m   m:   :MMMMMMM 
    * MMMMMMMMmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmMMMMMMM 
    * MMMMMMM/       +N-   oMMm       m`   yy   sMMMMMMM 
    * MMMMMMM/   :.   +-   oMMm    ...ho   :-  .MMMMMMMM 
    * MMMMMMM/   Mm   /-   oMMm    MMMMN`      yMMMMMMMM 
    * MMMMMMM/   M/   /-   oMMm    /++mMo     -MMMMMMMMM 
    * MMMMMMM/        h-   oMMm       dMN     +MMMMMMMMM 
    * MMMMMMM/   :yyhNM-   oMMm    yddNMo     `NMMMMMMMM 
    * MMMMMMM/   +MMMMM-   oNMm    mNNMN`  `   +MMMMMMMM 
    * MMMMMMM/   +MMMMM-      m       m+   h    NMMMMMMM 
    * M MMMMMMo---sMMMMM+------m-------m:--+M/---sMMMMMMM 
    * MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM 
    * MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM 
    * MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    * -->
    *
    ****************************************************************************/
    /*A variável "contador_seta" é inicializada em 0 e representará os indices das posições dos elementos do vetor "dados_2",
    que armazena o arquivo que está sendo tratado*/
    contador_seta = 0
    //Laço que percorre o arquivo passado pelo usuário
    while (contador_seta <= dados_2.length - 1) {
      //A variável "remove_seta" recebe uma linha de código do arquivo corrente
      remove_seta = dados_2[contador_seta].trim()
      /*Se a linha de código analisada possuir os primeiros 4 elementos iguais a "<!--" e  
        os últimos 3 elementos iguais "-->" esta linha de código é retirada*/
      if (remove_seta.substring(0, 4) == '<!--') {
        
        dados_2[contador_seta] = ''
        /*if (remove_seta.substring(remove_seta.length - 3, remove_seta.length) == '-->') {
          dados_2[contador_seta] = ''
        }
        /*Se os últimos elementos da linha de código analisada forem diferentes de "-->", 
        o programa segue para a próxima linha em busca da tag que indica o final do código*/
        //else {
          contador_seta_2 = contador_seta
          dados_2[contador_seta] = ''
          while (contador_seta_2 <= dados_2.length - 1) {
            remove_seta_2 = dados_2[contador_seta_2].trim()
            //Quando a tag que fecha o código é encontrada, o bloco de código é retirado
            detecta_seta = 0
            while (detecta_seta <= remove_seta_2.length - 1) {
              if (remove_seta_2.substring(detecta_seta, detecta_seta + 3) == '-->') {
                dados_2[contador_seta_2] = ''
                detecta_seta = -1
                break
              }
              detecta_seta++
            }
            if (detecta_seta == -1) {
              break
            }
            /*else {
              dados_2[contador_seta_2] = ''
            }*/
            contador_seta_2++
          }
        //}
      }
      contador_seta++
    }
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------  
    /* ****************************************************************************
    * Código abaixo para a remoção de elementos que possuem características de JSON
    * Exemplos:
    *
    *l = {
    * "home":"home", "problem_adding_comment":"There was a problem adding the comment, please try again later", "admin_users":"admin users", "banned_ips":"banned ips",
    * "site_settings":"Font Preview", "languages":"languages", "logout":"logout", "language_details":"Language Details", 
    * "are_you_sure_you_want_to_remove_this_ip_ban":"Are you sure you want to remove this IP ban?", 
    * "are_you_sure_update_user_status":"Are you sure you want to update the status of this user?", 
    * "view":"view", "disable":"disable", "enable":"enable",
    * "error_meta_keywords":"error", "please_enter_your_comment":"Please enter a comment", "ip_address_invalid_try_again":"IP address appears to be invalid, please try again.", 
    * "ip_address_already_blocked":"IP address is already in the blocked list.", "error_problem_record":"There was a problem inserting/updating the record, please try again later.", 
    * "error_meta_description":"Error", "language_already_in_system":"Language already in the system.", "username_length_invalid":"Username must be between 6-16 characters long.", 
    * "password_length_invalid":"Password must be between 6-16 characters long.", "enter_first_name":"Please enter the firstname.", "enter_last_name":"Please enter the lastname.", 
    * "enter_email_address":"Please enter the email address.", "entered_email_address_invalid":"The email address you entered appears to be invalid.", "copyright":"Copyright", 
    * "support":"Support", "admin_panel":"Admin Panel"}
    * 
    ****************************************************************************/
    /*A variável "json_remove_contador" é inicializada em 0 e representará os indices das posições dos elementos do vetor "dados_2",
    que armazena o arquivo que está sendo tratado*/
    json_remove_contador = 0
    //Laço que percorre o arquivo passado pelo usuário
    for (json in dados_2) {
      //A variável "json_elemento" recebe uma linha de código do arquivo corrente
      json_elemento = dados_2[json].trim()
      /*Se a linha de código analisada possuir o primeiro elemento igual a "{" e  
        a linha posterior a esta possuir '"' como primeiro elemento e ":" ao seu percorrer, ele irá inicar a retirar o bloco de código*/
      if (json_elemento[json_elemento.length - 1] == '{') {
        avalia_json = json_remove_contador + 1
        json_elemento_2 = dados_2[avalia_json].trim()
        if (json_elemento_2[0] == '"') {
          contador_dois_pontos = 0
          contador_elementos_json_remove = 0
          for (dois_pontos in json_elemento_2) {
            if (json_elemento_2.substring(contador_dois_pontos, contador_dois_pontos + 3) == '":"') {
              contador_elementos_json_remove++
              if (contador_elementos_json_remove == 5) {
                json_remove_contador_2 = avalia_json + 1
                while (json_remove_contador_2 <= dados_2.length - 1) {
                  elemento_json = dados_2[json_remove_contador_2].trim()
                  /*Caso ele encotre o elemento '"' nas linhas posteriores, estas linhas são eliminadas, se não, o laço é finalizado*/
                  if (elemento_json[elemento_json.length - 1] == '"') {
                    dados_2[json_remove_contador_2] = ''
                    dados_2[avalia_json] = ''
                    break
                  }
                  else {
                    dados_2[json_remove_contador_2] = ''
                  }
                  json_remove_contador_2++
                }
                break
              }
            }
            contador_dois_pontos++
          }
        }
      }
      json_remove_contador++
    }
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //Laço que atribui os elementos do vetor modificado do arquivo tratado para a variável "dados_3"
    for (i in dados_2) {
      dados_3 += dados_2[i] + '\n'
    }
    //É analisado o tamanho do código
    comprimento_arquivo = dados_3
    comprimento_arquivo = comprimento_arquivo.split('\n')
    //Se o código corrente possuir uma quantidade de linhas maior que 1000000, então o código é salvo na pasta "bases_grandes"
    /*if (comprimento_arquivo.length > 100000) {
      /*A variável "verificador" verifica se existe o termo "_versao_2.js" no nome 
      do código, pois caso exista, 
      é possível seguir com o tratamento*/
    /*  verificador = nome_codigo.substring(nome_codigo.length - 12, nome_codigo.length)
      if(verificador == '_versao_2.js'){
        //O arquivo é desofuscado
        desofuscado = beautify(dados_3, { indent_size: 1, space_in_empty_paren: true })
        //O código de tratamento para bases é chamado
        tratamento_bases_2(desofuscado, caminho, fs)
      }
      else{
        //O código agora é salvo com o termo "_versao_2.js" para que na próxima vez ele possa ser tratado corretamente com mais uso de memória
        nome_codigo = nome_codigo.replace('.js', '')
        fs.writeFile(`/wbf_analyser/pre-processamento/extracao/bases_defeituosas/bases_grandes/${nome_raiz}/${nome_codigo}_versao_2.js`, dados, function (err) {
          if (err) return console.log(err);
        });
      }
    }
    else {*/
      //O arquivo é desofuscado
      try{
          desofuscado = beautify(dados_3, { indent_size: 1, space_in_empty_paren: true })
          //O código de tratamento para bases é chamado
          tratamento_bases_2(desofuscado, caminho, fs)
        }
      
      catch{
        fs.writeFile(`/wbf_analyzer/pre-processamento/extracao/bases_defeituosas/bases_erros/${nome_raiz}/${nome_codigo}_versao_2.js`, dados, function (err) {
          if (err) return console.log(err);
        });
      //}
    }
  });
}
module.exports = tratamento_bases_1
