/*****************************************************************************
    *DICIONÁRIOS DE BROWSER FINGERPRINTING
******************************************************************************/

/*Dicionario de BF 01 / Oferece suporte para normalização
_______________________________________________________________________________________________________________________________________
O dicionário de BF 01 será utilizado durante a execução da regra 2 - normalização, servindo como ferramenta de suporte externa, 
para que as comparações sejam realizadas durante a normalização das chamadas. O dicionário de BF 01 está organizado de forma a ter 
objetos e propriedades fatiados, para serem mais facilmente alocados em seu devido nível de profundidade*/
this.dicionario_De_BF_01 = ['this', 'window', 'navigator', 'userAgent', 'hardwareConcurrency', 'bluetooth', 'appCodeName',
  'product', 'productSub', 'vendor', 'appMinorVersion', 'maxTouchPoints', 'getInstalledRelatedApps()',
  'language', 'browserLanguage', 'userLanguage', 'languages', 'cpuClass', 'oscpu', 'geolocation',
  'vendorSub', 'online', 'appVersion', 'appName', 'doNotTrack', 'screen', 'availHeight',
  'availWidth', 'colorDepth', 'height', 'pixelDepth', 'width', 'matchMedia()', 'devicePixelRatio',
  'innerWidth', 'innerHeight', 'outerWidth', 'outerHeight', 'Date', 'getTimezoneOffset()', 'new Date()', 'document', 'referrer', 'cookie',
  'domain', 'createElement("canvas")',"createElement('canvas')", 'Modernizr', 'video', 'cookieEnabled', 'javaEnabled()',
  'mimeTypes', 'plugins', 'filename', 'name', 'description', 'localStorage', 'sessionStorage',
  'getUserMedia()', 'canvas', 'getContext()', 'toDataURL()', 'getImageData()', 'history', 'back()', 'forward()',
  'go()', 'MediaStream', 'getVideoTracks()', 'mediaDevices', 'getUserMedia', 'getTime()', 'toLocaleString()', 'setTime()',
  'msMaxTouchPoints', 'systemLanguage', 'setItem()', 'removeItem()', 'msDoNotTrack', 'platform', /*exceção*/ 'hasOwnProperty()', 'win', 'length', 'nav', 'innerWidth()', 'innerHeight()'
]
/*Dicionario de BF 02: Completo / Oferece suporte para classificação
_______________________________________________________________________________________________________________________________________
O dicionário de BF 02 tem um formato mais simples e diferente do 01, não possuindo os objetos fatiados. Ao contrário,
esse dicionário contém os termos em sua forma final, onde tem-se o objeto e suas propriedades sendo chamadas pela notação ".", que permite 
invocar a propriedade de um objeto ou seu método. A finalidade desse dicionário é ser utilizado durante a regra de classificação, onde ele 
será aplicado, permitindo que sejam apenas classificadas chamadas que estejam em conformidade com seus termos. */
this.dicionario_De_BF_02_Completo = ['this.window.navigator.userAgent', 'window.navigator.userAgent', 'this.navigator.userAgent', 'navigator.userAgent', 'this.window.navigator.hardwareConcurrency',
  'window.navigator.hardwareConcurrency', 'this.navigator.hardwareConcurrency', 'navigator.hardwareConcurrency', 'this.window.navigator.bluetooth',
  'window.navigator.bluetooth', 'this.navigator.bluetooth', 'navigator.bluetooth', 'this.window.navigator.appCodeName', 'window.navigator.appCodeName', 'this.navigator.appCodeName',
  'navigator.appCodeName', 'this.window.product',
  'this.product', 'window.product', 'this.window.productSub', 'window.productSub', 'this.productSub',
  'this.window.navigator.vendor', 'window.navigator.vendor',
  'this.navigator.vendor', 'navigator.vendor', 'this.window.navigator.appMinorVersion', 'window.navigator.appMinorVersion', 'this.navigator.appMinorVersion',
  'navigator.appMinorVersion', 'this.window.navigator.maxTouchPoints', 'window.navigator.maxTouchPoints', 'this.navigator.maxTouchPoints', 'navigator.maxTouchPoints',
  'this.window.navigator.getInstalledRelatedApps()', 'window.navigator.getInstalledRelatedApps()', 'this.navigator.getInstalledRelatedApps()',
  'navigator.getInstalledRelatedApps()', 'this.window.navigator.language', 'window.navigator.language', 'this.navigator.language', 'navigator.language',
  'this.window.navigator.browserLanguage', 'window.navigator.browserLanguage',
  'this.navigator.browserLanguage', 'navigator.browserLanguage', 'this.window.navigator.userLanguage', 'window.navigator.userLanguage', 'this.navigator.userLanguage',
  'navigator.userLanguage', 'this.window.navigator.languages', 'window.navigator.languages', 'this.navigator.languages', 'navigator.languages', 'this.window.navigator.cpuClass',
  'window.navigator.cpuClass', 'this.navigator.cpuClass', 'navigator.cpuClass', 'this.window.navigator.systemLanguage', 'window.navigator.systemLanguage', 'this.navigator.systemLanguage', 'navigator.systemLanguage',
  'this.window.navigator.oscpu', 'window.navigator.oscpu', 'this.navigator.oscpu', 'navigator.oscpu', 'this.window.navigator.platform',
  'window.navigator.platform', 'this.navigator.platform', 'navigator.platform', 'this.window.navigator.geolocation','window.navigator.geolocation',
  'this.navigator.geolocation', 'navigator.geolocation', 'this.window.navigator.vendorSub', 'window.navigator.vendorSub',
  'this.navigator.vendorSub', 'navigator.vendorSub', 'this.window.navigator.online', 'window.navigator.online', 'this.navigator.online', 'navigator.online',
  'this.window.navigator.appVersion', 'window.navigator.appVersion', 'this.navigator.appVersion', 'navigator.appVersion', 'this.window.navigator.appName',
  'window.navigator.appName', 'this.navigator.appName', 'navigator.appName', 'this.window.navigator.doNotTrack', 'window.navigator.doNotTrack',
  'this.navigator.doNotTrack', 'navigator.doNotTrack', 'this.window.screen.availHeight',
  'window.screen.availHeight', 'this.screen.availHeight', 'screen.availHeight', 'this.window.screen.availWidth', 'window.screen.availWidth',
  'this.screen.availWidth', 'screen.availWidth', 'this.window.screen.colorDepth', 'this.screen.colorDepth', 'window.screen.colorDepth', 'screen.colorDepth', 'this.window.screen.height',
  'window.screen.height', 'this.screen.height','screen.height', 'this.window.screen.pixelDepth', 'window.screen.pixelDepth', 'this.screen.pixelDepth',
  'screen.pixelDepth', 'this.window.screen.width', 'window.screen.width', 'this.screen.width','screen.width',
  'this.window.matchMedia()', 'window.matchMedia()', 'this.matchMedia()', 'this.window.devicePixelRatio', 'window.devicePixelRatio', ' this.devicePixelRatio',
  'this.window.innerHeight', 'window.innerHeight', 'this.innerHeight','this.window.innerWidth', 'window.innerWidth', 'this.innerWidth',
  'this.window.outerWidth', 'window.outerWidth', 'this.outerWidth', 'this.window.outerHeight', 'window.outerHeight', 'this.outerHeight', 'Date.getTimezoneOffset()', 'new Date()',
  'this.window.document.referrer', 'window.document.referrer', 'this.document.referrer', 'document.referrer', 'this.window.document.cookie', 'window.document.cookie',
  'this.document.cookie', 'document.cookie', 'this.window.document.domain', 'window.document.domain', 'this.document.domain', 'document.domain',
  'this.window.document.createElement("canvas")', "this.window.document.createElement('canvas')", 'window.document.createElement("canvas")', "window.document.createElement('canvas')",
  'this.document.createElement("canvas")', "this.document.createElement('canvas')", 'document.createElement("canvas")', "document.createElement('canvas')",
  'Modernizr.geolocation', 'Modernizr.video', 'this.window.navigator.cookieEnabled', 'window.navigator.cookieEnabled', 'this.navigator.cookieEnabled',
  'navigator.cookieEnabled', 'this.window.navigator.javaEnabled()', 'window.navigator.javaEnabled()', 'this.navigator.javaEnabled()',
  'navigator.javaEnabled()', 'this.window.navigator.mimeTypes', 'window.navigator.mimeTypes', 'this.navigator.mimeTypes', 'navigator.mimeTypes',
  'this.window.navigator.plugins.filename', 'window.navigator.plugins.filename', 'this.navigator.plugins.filename', 'navigator.plugins.filename',
  'this.window.navigator.plugins.name', 'window.navigator.plugins.name', 'this.navigator.plugins.name', 'navigator.plugins.name', 'this.window.navigator.plugins',
  'window.navigator.plugins', 'this.navigator.plugins', 'navigator.plugins', 'this.window.navigator.plugins.description', 'window.navigator.plugins.description',
  'this.navigator.plugins.description', 'navigator.plugins.description',
  'this.window.navigator.plugins.length', 'window.navigator.plugins.length', 'this.navigator.plugins.length', 'navigator.plugins.length',
  'this.window.localStorage', 'window.localStorage', 'this.localStorage', 'this.window.sessionStorage', 'window.sessionStorage', 'this.sessionStorage',
  'this.window.navigator.getUserMedia()', 'window.navigator.getUserMedia()', 'this.navigator.getUserMedia()', 'navigator.getUserMedia()', 'canvas.getContext()',
  'canvas.toDataURL()', 'canvas.getImageData()', 'this.window.history', 'window.history', 'this.history', 'this.window.history.length', 'window.history.length',
  'this.history.length', 'this.window.history.back()', 'window.history.back()', 'this.history.back()', 'history.back()', 'this.window.history.forward()', 'window.history.forward()',
  'this.history.forward()', 'history.forward()', 'this.window.history.go()', 'window.history.go()', 'this.history.go()', 'history.go()', 'MediaStream.getVideoTracks()',
  'MediaStream.getAudioTracks()', 'this.window.navigator.mediaDevices.getUserMedia()', 'window.navigator.mediaDevices.getUserMedia()',
  'this.navigator.mediaDevices.getUserMedia()', 'navigator.mediaDevices.getUserMedia()',

//--------------------

/*as chamadas que aparacem apartir deste momento foram adicionadas ao 
  dicionário principal*/

  'new Date().getTimezoneOffset()', 'new Date().getTime()', 'new Date().toLocaleString()', 'new Date().setTime()',
  'localStorage.setItem()', 'localStorage.removeItem()', 'sessionStorage.setItem()', 'sessionStorage.removeItem()',
  'this.window.navigator.msMaxTouchPoints', 'window.navigator.msMaxTouchPoints', 'this.navigator.msMaxTouchPoints', 'navigator.msMaxTouchPoints', 'this.window.navigator.msDoNotTrack', 'window.navigator.msDoNotTrack',
  'this.navigator.msDoNotTrack', 'navigator.msDoNotTrack', 'window.doNotTrack', 'this.window.document.cookie.match', 'window.document.cookie.match', 'this.document.cookie.match', 'document.cookie.match',


//--------------------

/*exceção*/

'this.nav.mimeTypes','nav.mimeTypes','this.nav.plugins','nav.plugins','plugins.hasOwnProperty()','win.innerWidth' ,'win.innerHeight', 'this.nav.mimeTypes','window.innerWidth()', 'window.innerHeight()','navigator.plugins()', 'this.plugins()', 'navigator.mimeTypes.length',

//Sessão do This

//--------------------

  'this.userAgent', 'this.hardwareConcurrency', 'this.bluetooth', 'this.appCodeName', 'this.vendor', 'this.appMinorVersion', 'this.maxTouchPoints',
  'this.getInstalledRelatedApps()', 'this.language', 'this.browserLanguage', 'this.userLanguage', 'this.languages', 'this.cpuClass', 'this.systemLanguage',
  'this.oscpu', 'this.platform', 'this.vendorSub', 'this.online',
  'this.appVersion', 'this.appName', 'this.doNotTrack', 'this.availWidth', 'this.colorDepth', 'this.height', 'this.pixelDepth', 'this.width', 'this.getTimezoneOffset()', 
  'this.referrer', 'this.cookie', 'this.domain',
  'this.createElement("canvas")', "this.createElement('canvas')",
  'this.geolocation', 'this.video', 'this.cookieEnabled', 'this.javaEnabled()', 'this.mimeTypes',
  'this.plugins.filename',
  'this.plugins.name', 'this.plugins', 'this.plugins.description',
  'this.plugins.length',
  'this.getUserMedia()', 'this.getContext()', 'this.toDataURL()', 'this.getImageData()', 'this.history', 'this.back()', 'this.forward()', 'this.go()', 
  'this.getVideoTracks()',
  'this.getAudioTracks()', 'this.mediaDevices.getUserMedia()',

/*as chamadas que aparacem apartir deste momento foram adicionadas ao 
  dicionário principal*/ 

  'this.getTimezoneOffset()', 'this.getTime()', 'this.toLocaleString()', 'this.setTime()',
  'this.setItem()', 'this.removeItem()', 'this.setItem()', 'this.removeItem()',
  'this.msMaxTouchPoints', 'this.msDoNotTrack','this.cookie.match'




//--------------------
]

/*Dicionario de BF 02: Níveis classificatórios / Oferece suporte para classificação
_______________________________________________________________________________________________________________________________________
A conversão foi necessária para ajustar o dicionário aos níveis classificatórios, dessa forma as
comparações são realizadas buscando as chamadas referentes ao seu nível de risco.*/
this.dicionario_De_BF_02_Alto = ['this.window.navigator.getUserMedia()', 'window.navigator.getUserMedia()', 'this.navigator.getUserMedia()', 'navigator.getUserMedia()', 'this.getUserMedia()', 'canvas.getContext()',
  'this.getContext()', 'canvas.toDataURL()','this.toDataURL()', 'canvas.getImageData()', 'this.getImageData()', 'this.window.history', 'window.history', 'this.history', 'this.window.history.length', 'window.history.length',
  'this.history.length', 'this.window.history.back()', 'window.history.back()', 'this.history.back()', 'history.back()', 'this.back()','this.window.history.forward()', 'window.history.forward()',
  'this.history.forward()', 'history.forward()', 'this.forward()', 'this.window.history.go()', 'window.history.go()', 'this.history.go()', 'history.go()','this.go()','MediaStream.getVideoTracks()',
  'MediaStream.getAudioTracks()', 'this.getAudioTracks()', 'navigator.mediaDevices.getUserMedia', 'this.window.navigator.mediaDevices.getUserMedia', 'window.navigator.mediaDevices.getUserMedia',
  'this.navigator.mediaDevices.getUserMedia', 'navigator.mediaDevices.getUserMedia', 'this.mediaDevices.getUserMedia()'
]

this.dicionario_De_BF_02_Medio = ['this.window.document.referrer', 'window.document.referrer', 'this.document.referrer', 'document.referrer', 'this.referrer','this.window.document.cookie', 'window.document.cookie',
  'this.document.cookie', 'document.cookie', 'this.cookie','document.cookie.match', 
  'this.window.document.createElement("canvas")', "this.window.document.createElement('canvas')", 'window.document.createElement("canvas")', "window.document.createElement('canvas')", 'this.document.createElement("canvas")', 
  "this.document.createElement('canvas')",'document.createElement("canvas")', "document.createElement('canvas')", 'this.createElement("canvas")', "this.createElement('canvas')",
  'Modernizr.geolocation', 'Modernizr.video','this.geolocation','this.video', 'this.window.navigator.cookieEnabled', 'window.navigator.cookieEnabled', 'this.navigator.cookieEnabled',
  'navigator.cookieEnabled','this.cookieEnabled', 'this.window.navigator.javaEnabled()', 'window.navigator.javaEnabled()', 'this.navigator.javaEnabled()',
  'navigator.javaEnabled()', 'this.javaEnabled()','this.window.navigator.mimeTypes', 'window.navigator.mimeTypes', 'this.navigator.mimeTypes', 'navigator.mimeTypes','this.mimeTypes',
  'this.window.navigator.plugins.filename', 'window.navigator.plugins.filename', 'this.navigator.plugins.filename', 'navigator.plugins.filename', 'this.plugins.filename',
  'this.window.navigator.plugins.name', 'window.navigator.plugins.name', 'this.navigator.plugins.name', 'navigator.plugins.name', 'this.plugins.name', 'this.window.navigator.plugins',
  'window.navigator.plugins', 'this.navigator.plugins', 'navigator.plugins', 'this.plugins', 'this.window.navigator.plugins.description', 'window.navigator.plugins.description',
  'this.navigator.plugins.description', 'navigator.plugins.description', 'this.plugins.description',
  'this.window.navigator.plugins.length', 'window.navigator.plugins.length', 'this.navigator.plugins.length', 'navigator.plugins.length', 'this.plugins.length',
  'this.window.localStorage', 'window.localStorage', 'this.localStorage', 'localStorage.setItem()', 'localStorage.removeItem()', 'this.window.sessionStorage', 'window.sessionStorag', 'this.sessionStorage',
  'sessionStorage.setItem()', 'sessionStorage.removeItem()', /*exceção*/ 'plugins.hasOwnProperty()', 'this.nav.mimeTypes',  'navigator.mimeTypes.length', 'this.nav.mimeTypes','nav.mimeTypes','this.nav.plugins','nav.plugins'
]

this.dicionario_De_BF_02_Baixo = ['this.window.navigator.userAgent', 'window.navigator.userAgent', 'this.navigator.userAgent', 'navigator.userAgent', 'this.userAgent', 'this.window.navigator.hardwareConcurrency',
  'window.navigator.hardwareConcurrency', 'this.navigator.hardwareConcurrency', 'navigator.hardwareConcurrency', 'this.hardwareConcurrency', 'this.window.navigator.bluetooth',
  'window.navigator.bluetooth', 'this.navigator.bluetooth', 'navigator.bluetooth', 'this.bluetooth', 'this.window.navigator.appCodeName', 'window.navigator.appCodeName',
  'this.navigator.appCodeName', 'navigator.appCodeName', 'this.appCodeName', 'this.window.product',
  'this.product', 'window.product', 'this.window.productSub', 'window.productSub', 'this.productSub',
  'this.window.navigator.vendor', 'window.navigator.vendor','this.window.document.domain', 'window.document.domain', 'this.document.domain', 'document.domain', 'this.domain',
  'this.navigator.vendor', 'navigator.vendor', 'this.vendor','this.window.navigator.appMinorVersion', 'window.navigator.appMinorVersion', 'this.navigator.appMinorVersion',
  'navigator.appMinorVersion', 'this.appMinorVersion', 'this.window.navigator.maxTouchPoints', 'window.navigator.maxTouchPoints', 'this.navigator.maxTouchPoints', 'navigator.maxTouchPoints', 'this.maxTouchPoints',
  'this.window.navigator.getInstalledRelatedApps()', 'window.navigator.getInstalledRelatedApps()', 'this.navigator.getInstalledRelatedApps()',
  'navigator.getInstalledRelatedApps()', 'this.getInstalledRelatedApps()', 'this.window.navigator.language', 'window.navigator.language', 'this.navigator.language', 'navigator.language', 'this.language',
  'this.window.navigator.browserLanguage', 'window.navigator.browserLanguage',
  'this.navigator.browserLanguage', 'navigator.browserLanguage', 'this.browserLanguage', 'this.window.navigator.userLanguage', 'window.navigator.userLanguage', 'this.navigator.userLanguage',
  'navigator.userLanguage', 'this.userLanguage', 'this.window.navigator.languages', 'window.navigator.languages', 'this.navigator.languages', 'navigator.languages',  'this.languages', 'this.window.navigator.cpuClass',
  'window.navigator.cpuClass', 'this.navigator.cpuClass', 'navigator.cpuClass','this.cpuClass', 'this.window.navigator.systemLanguage', 'window.navigator.systemLanguage', 'this.navigator.systemLanguage', 'this.systemLanguage',
  'this.window.navigator.oscpu', 'window.navigator.oscpu', 'this.navigator.oscpu', 'navigator.oscpu', 'this.oscpu', 'this.window.navigator.platform',
  'window.navigator.platform', 'this.navigator.platform', 'navigator.platform','this.platform','this.window.navigator.geolocation', 'window.navigator.geolocation',
  'this.navigator.geolocation', 'navigator.geolocation', 'this.geolocation', 'this.window.navigator.vendorSub', 'window.navigator.vendorSub',
  'this.navigator.vendorSub', 'navigator.vendorSub', 'this.vendorSub', 'this.window.navigator.online', 'window.navigator.online', 'this.navigator.online', 'naigator.online', 'this.online',
  'this.window.navigator.appVersion', 'window.navigator.appVersion', 'this.navigator.appVersion', 'navigator.appVersion', 'this.appVersion','this.window.navigator.appName',
  'window.navigator.appName', 'this.navigator.appName', 'navigator.appName', 'this.appName', 'this.window.navigator.doNotTrack', 'window.navigator.doNotTrack', 'this.navigator.doNotTrack',
  'navigator.doNotTrack', 'this.doNotTrack', 'this.window.navigator.msDoNotTrack', 'window.navigator.msDoNotTrack', 'this.navigator.msDoNotTrack', 'navigator.msDoNotTrack', 'this.msDoNotTrack','this.window.screen.availHeight',
  'window.screen.availHeight', 'this.screen.availHeight', 'screen.availHeight', 'this.availHeight', 'this.window.screen.availWidth', 'window.screen.availWidth',
  'this.screen.availWidth', 'screen.availWidth', 'this.availWidth', 'this.window.screen.colorDepth', 'window.screen.colorDepth', 'screen.colorDepth', 'this.colorDepth', 'this.window.screen.height',
  'window.screen.height', 'this.screen.height', 'screen.height', 'this.height', 'this.window.screen.pixelDepth', 'window.screen.pixelDepth', 'this.screen.pixelDepth',
  'screen.pixelDepth', 'this.pixelDepth', 'this.window.screen.width', 'window.screen.width', 'this.screen.width', 'screen.width', 'this.width',
  'this.window.matchMedia()', 'window.matchMedia()', 'this.matchMedia()', 'this.window.devicePixelRatio', 'window.devicePixelRatio', ' this.devicePixelRatio',
  'this.window.innerHeight', 'window.innerHeight', 'this.innerHeight', 'this.window.innerWidth', 'window.innerWidth', 'this.innerWidth',
  'this.window.outerWidth', 'window.outerWidth', 'this.outerWidth', 'this.window.outerHeight', 'window.outerHeight', 'this.outerHeight', 'new Date()', 'new Date().getTimezoneOffset()','this.getTimezoneOffset()', 'Date.getTimezoneOffset()', 'new Date().getTime()', 'this.getTime()',
  'new Date().toLocaleString()', 'this.toLocaleString()','new Date().setTime()', 'this.setTime()','window.screen.height', 'this.window.navigator.msMaxTouchPoints','window.navigator.msMaxTouchPoints','this.navigator.msMaxTouchPoints',  'navigator.msMaxTouchPoints', 'this.msMaxTouchPoints',
  /*exceção*/ 'win.innerHeight','win.innerWidth' ,'window.innerWidth()'
]
