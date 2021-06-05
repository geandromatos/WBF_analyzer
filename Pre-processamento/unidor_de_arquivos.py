import os
valor = 0
#escopo_classificado_OB = []
#escopo_classificado_F = []
               
for root,dirs,files in os.walk('/mestrado/Top_50_sites_alexa.com_2021_dependencias/dependencias_consertadas/Dependencias/www.tianya.cn/', topdown=False):
    for name in files:
        if name[len(name)-3:len(name)] == '.js':
            arquivo = ''
            arquivo = open(root + '/' + name,encoding='utf-8', errors='ignore')
            arquivo = arquivo.read()
            valor+=1
            print(name)
            with open('/mestrado/Top_50_sites_alexa.com_2021_dependencias/guarda_blocos/www.tianya.cn.js', 'a',encoding='utf-8', errors='ignore') as file_object:
                file_object.write('//' + str(valor) + '\n'+ str(arquivo) + '\n//------------------------------------' )


        