var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        

        this.localizacao = {};
        this.mapagoogle = {};
        this.batterystatus = {};
       
        this.deviceinfo = {};
        
        this.eventostxt = {};

        this.connectioninfo = {};
        
        this.notificationinfo = {};
        
        // --- ACELEROMETRO
        this.acelerometrodiv = {};
        this.acelerometrotxt = {};
        this.acelerometrodados = {};
        this.acelerometrobt = {};

        // --- COMPASS ------------------
        this.compasstxt = {};
        this.needle = {};
        this.watchID = null;

        // --- CONTACTS -----------------
        this.contactstxt = {};
        this.contatoslista = {};

        // --- CAMERA -------------------
        this.pictureSource = {};
        this.destinationType = {};
        this.bttirarfoto = {};

        this.mapaapi = {};
        this.bolinha = {};
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("pause", this.onPause, false);
        document.addEventListener("resume", this.onResume, false);
        document.addEventListener("online", this.onOnline, false);
        document.addEventListener("offline", this.onOffline, false);

        document.addEventListener("offline", this.onOffline, false);
        
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

        // -- Eventos
        document.addEventListener("menubutton", app.onMenuButton, false);
        document.addEventListener("searchbutton", app.onSearchButton, false);
        document.addEventListener("backbutton", app.onBackButton, false);
        app.eventostxt = document.getElementById("eventostxt");
        app.eventostxt.innerHTML = '--GETELEMENT--';

        // --- Localizacao
        app.localizacao = document.getElementById("localizacao");
        app.localizacao.innerHTML = '--GETELEMENT--';
        app.mapagoogle = document.getElementById("mapagoogle");
        app.mapagoogle.innerHTML = '--GETELEMENT GOOGLE--';
        
        navigator.geolocation.getCurrentPosition(app.onGeoSuccess, app.onGeoError);

        // --- Battery Status
        app.batterystatus = document.getElementById("batterystatus");
        window.addEventListener("batterystatus", app.onBatteryStatus, false);

        // --- Device Info
        app.deviceinfo = document.getElementById("deviceinfo");
        app.getDeviceInfo();

        // --- Network
        app.connectioninfo = document.getElementById("connectioninfo");
        app.getConnectionInfo();

        // --- Notification
        app.notificationinfo = document.getElementById("notificationinfo");
        app.notificationinfo.innerHTML = '--getElement--';
        app.runNotificationChain();

        // --- Acelerometro
        app.bolinha = document.getElementById("block");
        app.acelerometrodiv = document.getElementById("acelerometrodiv");
        app.acelerometrotxt = document.getElementById("acelerometrotxt");
        app.acelerometrotxt.innerHTML = '--getElement--';
        
        app.acelerometrodados = document.getElementById("acelerometrodados");
        app.acelerometrodados.innerHTML = '--getElement--';
        //app.acelerometrobt  = document.getElementById("acelerometrobt");

        app.startAccelWatch();
        
        //app.acelerometrobt.addEventListener("click", app.testOrientation, false);

        // --- Compass
        app.compasstxt = document.getElementById("compasstxt");
        app.compasstxt.innerHTML = '--getElement--';

        app.compassdiv = document.getElementById("compassdiv");
        app.needle = document.getElementById("needle");
        app.needle.setAttribute("style", "-webkit-transform: rotate(30deg);");
        
        var options = { frequency: 10 };
        app.watchID = navigator.compass.watchHeading(app.onCompassSuccess, app.onCompassError, options);
        //app.watchID = navigator.compass.getCurrentHeading(compassSuccess, compassError);

        // --- CONTACTS
        app.contactstxt = document.getElementById("contactstxt");
        app.contactstxt.innerHTML = '--getElement--';

        app.contatoslista = document.getElementById("contatoslista");
        app.contatoslista.innerHTML = '--getElement--';

        //app.addContact();
        //app.findContacts("si");
        //app.findContacts("tuts");

        //app.findAll();

        // --- Camera
        app.pictureSource   = navigator.camera.PictureSourceType;
        app.destinationType = navigator.camera.DestinationType;
        app.bttirarfoto = document.getElementById("bttirarfoto");

        app.bttirarfoto.innerHTML = 'Tirar Foto --getElement--';
        app.bttirarfoto.addEventListener("click", app.useImageCapture, false);

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    // --- EVENTS 
    onPause: function() {
        app.eventostxt.innerHTML = "PAUSED";
    },
    onResume: function() {
        app.eventostxt.innerHTML = "RESUMED";
    },
    onOnline: function() {
        app.eventostxt.innerHTML = "ONLINE";
    },
    onOffline: function() {
        app.eventostxt.innerHTML = "OFFLINE";
    },
    onBackButton: function() {
        app.eventostxt.innerHTML = "BACK BUTTON";
    },
    onMenuButton: function() {
        app.eventostxt.innerHTML = "MENU BUTTON";
    },
    onSearchButton: function() {
        app.eventostxt.innerHTML = "SEARCH BUTTON";
    },
    onGeoSuccess: function(position){
        // app.localizacao.innerHTML = 'Latitude: '+position.coords.latitude+'<br/>'+
        //                             'Longitude: '+position.coords.longitude+'<br/>';
        
        app.localizacao.innerHTML = '--FunctionCall--';                          
        app.localizacao.innerHTML = 
            'Latitude: '   + position.coords.latitude              + '' +
            'Longitude: '          + position.coords.longitude             + '<br />' +
            'Altitude: '           + position.coords.altitude              + '<br />' +
            'Accuracy: '           + position.coords.accuracy              + '<br />' +
            'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
            'Heading: '            + position.coords.heading               + '<br />' +
            'Speed: '              + position.coords.speed                 + '<br />' +
            'Timestamp: '          + position.timestamp                    + '<br />';
        
        app.mapagoogle.innerHTML = '--FunctionCall--';
        
        // var map;

        // var mapOptions = {
        //   zoom: 7ß,
        //   center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
        // };

        // map = new google.maps.Map(document.getElementById('mapagoogle'), mapOptions);
    },
    onGeoError: function(erro){
        app.localizacao.innerHTML = 'Error Code: ' +erro.code +'<br />'+' Message: '+error.message;
    },
    onBatteryStatus: function(info) {
        app.batterystatus.innerHTML = "Carga da bateria: " + info.level + "% USB Conectado? " + info.isPlugged;
    },
    getDeviceInfo: function() {
        app.deviceinfo.innerHTML = 
            'Device Name: '  + device.name     + '<br />' + 
            'Device Cordova: '  + device.cordova  + '<br />' + 
            'Device Platform: ' + device.platform + '<br />' + 
            'Device UUID: '     + device.uuid     + '<br />' + 
            'Device Version: '  + device.version  + '<br />';
    },
    getConnectionInfo: function() {
        var networkState = navigator.connection.type;
        var states = {};
        states[Connection.UNKNOWN]  = 'Desconhecido';
        states[Connection.ETHERNET] = 'Ethernet';
        states[Connection.WIFI]     = 'WiFi';
        states[Connection.CELL_2G]  = 'Cell 2G';
        states[Connection.CELL_3G]  = 'Cell 3G';
        states[Connection.CELL_4G]  = 'Cell 4G';
        states[Connection.NONE]     = 'Sem conexao';
        
        app.connectioninfo.innerHTML = "Connection type: " + states[networkState];
    },

    //--- NOTIFICATION ------------------------------------------
    runNotificationChain: function() {
        app.notificationinfo.innerHTML = '--FunctionCall--';
        
        navigator.notification.alert(
            'Essa é uma mensagem de alerta!',  // message
            app.alertDismissed,         // callback
            'Alert Box',            // title
            'Próxima mensagem'                  // buttonName
        );
    },
    alertDismissed: function() {
        navigator.notification.confirm(
            'Deseja fazer o teste de Bipe e Vibração?',  // message
            app.onConfirm,              // callback to invoke with index of button pressed
            'Confirmar',            // title
            'Sim, Não'          // buttonLabels
        );
    },
    onConfirm: function(index) {
        if(index==2){
            alert('Você selecionou não');
        }else{
            navigator.notification.beep(2);
            navigator.notification.vibrate(2500);
        }
    },

    //--- ACELEROMETRO ------------------------------------------
    testOrientation: function(evt) {
        app.acelerometrotxt.removeEventListener("click", app.testOrientation, false);
        app.stopAccelWatch();
        window.addEventListener("orientationchange", app.onOrientationChange, false);
    },
    onOrientationChange: function() {
        app.acelerometrotxt.innerHTML += "<br />"+window.orientation;
    },
    startAccelWatch: function() {
        var options = { frequency: 200 };
        app.watchID = navigator.accelerometer.watchAcceleration(app.onSuccess, app.onError, options);
    },
    stopAccelWatch: function() {
        if (app.watchID) {
            navigator.accelerometer.clearWatch(app.watchID);
            app.watchID = null;
            app.acelerometrotxt.innerHTML = '--FunctionCall--';
        }
    },
    onSuccess: function(acceleration) {
        app.acelerometrotxt.innerHTML = '--FunctionCall--';
        app.acelerometrotxt.innerHTML = 
            'Acceleration X: ' + acceleration.x + '<br />' +
            'Acceleration Y: ' + acceleration.y + '<br />' +
            'Acceleration Z: ' + acceleration.z + '<br />' +
            'Timestamp: '      + acceleration.timestamp + '<br />';
        
        var accelerationx =  Math.round(acceleration.x);
        var accelerationy =  Math.round(acceleration.y);

        var marginLeft = -(accelerationx*30 - 130);
        var marginTop = (accelerationy*30 + 80);

        if(marginLeft<0){
            marginLeft = 0;
        }else if(marginLeft>260){
            marginLeft = 260;
        }

        if(marginTop<0){
            marginTop = 0;
        }else if(marginTop>170){
            marginTop = 170;
        }

        app.acelerometrodiv.innerHTML = '<div class="block" style="background: yellow; border: 1px solid yellow; color:black; margin-left: '+marginLeft+'px; margin-top:'+marginTop+'px">:)</div>';
        app.acelerometrodados.innerHTML = ' margin-left: '+marginLeft+'px; margin-top:'+marginTop+'px" ';
        // app.bolinha.setAttribute('style', 'margin-left: '+marginLeft+'px; margin-top:'+marginTop+'px');
    },
    onError: function() {
        app.acelerometrotxt.innerHTML = "--ERROR--";
    },

    // --- COMPASS
    onCompassSuccess: function(heading) {
        app.compasstxt.innerHTML = '&deg;' + heading.magneticHeading;
        app.needle.setAttribute("style", "-webkit-transform: rotate("+(-heading.magneticHeading)+"deg);");
    },
    onCompassError: function(compassError) {
        app.compasstxt.innerHTML = 'Compass error: ' + compassError.code;
    },

    // --- CONTACTS
    addContact: function() {
        app.contactstxt.innerHTML += "--FunctionCall ADD-- <br />";
        
        // create
        var contact = navigator.contacts.create();
        contact.displayName = "Tuts";
        contact.nickname = "Tuts";       //specify both to support all devices
        
        var name = new ContactName();
        name.givenName = "Tuts";
        name.familyName = "Plus";
        contact.name = name;

        app.contactstxt.innerHTML += 'Nome: '+name.givenName;
        // save
        contact.save(app.onSaveSuccess,app.onSaveError);
    },  
    findContacts: function(string) {
        app.contactstxt.innerHTML += "--FunctionCall FIND-- <br />";

        var options = new ContactFindOptions();
        options.filter=string;          // empty search string returns all contacts
        options.multiple=true;      // return multiple results
        filter = ["displayName"];   // return contact.displayName field

        navigator.contacts.find(filter, app.onFindSuccess, app.onFindError, options);
    },
    onFindSuccess: function(contacts) {
        app.contactstxt.innerHTML += "--FunctionCall FIND SUCCESS -- <br />";
        contacts[0].remove(app.onRemoveSuccess,app.onRemoveError);
        for (var i=0; i<contacts.length; i++) {
            app.contactstxt.innerHTML += contacts[i].name.givenName + "<br />";
        }
    },
    onListAll: function(){
        app.contactslista.innerHTML += "Lista <br />";

        navigator.contacts.find(filter, app.onListSuccess, app.onListError, options);
    },
    onListSuccess: function(contacts){
        // for (var i=0; i<contacts.length; i++) {
        //     app.contactstxt.innerHTML += contacts[i].name.givenName + "<br />";
        // }
    },
    onListError: function(){

    },
    onFindError:function(contactError) {
        app.contactstxt.innerHTML += "--ERROR FIND-- <br />";
    },
    onSaveSuccess: function(contact) {
        app.contactstxt.innerHTML += "Contato adicionado com sucesso <br />";
    },
    onSaveError: function(contactError) {
        app.contactstxt.innerHTML += "Error Save = " + contactError.code+'<br />';
    },
    onRemoveSuccess: function(contacts) {
        app.contactstxt.innerHTML = "Contato removido com sucesso <br />";
    },
    onRemoveError: function(contactError) {
        app.contactstxt.innerHTML += "Error Remove = " + contactError.code+'<br />';
    },

    // --- CAMERA
    useVideoCapture: function() {
        navigator.device.capture.captureVideo(app.onVidCaptureSuccess, app.onFail, {limit:1});
    },
    onVidCaptureSuccess: function(mediaFiles) {
        console.log("Captured");
        var i, path, len;
        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
            path = mediaFiles[i].fullPath;
            console.log("Video FilePath: " + path);
        }
    },
    useImageCapture: function() {
        navigator.device.capture.captureImage(app.onCaptureSuccess, app.onFail, {limit:2});
    },
    onCaptureSuccess: function(mediaFiles) {
        console.log("Captured");
        var i, path, len;
        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
            path = mediaFiles[i].fullPath;
            console.log("FilePath: " + path);
        }
    },
    useGetPicture: function() {
        navigator.camera.getPicture(
            app.onPhotoSuccess, 
            app.onFail, 
            { 
                quality : 75, 
                destinationType : Camera.DestinationType.DATA_URL, 
                sourceType : Camera.PictureSourceType.PHOTOLIBRARY, 
                //sourceType : Camera.PictureSourceType.CAMERA, 
                //allowEdit : true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 200,
                targetHeight: 200,
                correctOrientation: true,
                saveToPhotoAlbum: true 
            }
        );
    },
    onPhotoSuccess: function(imageData) {
        var image = document.getElementById('image');
        image.src = "data:image/jpeg;base64," + imageData;
    },
    onFail: function(message) {
      alert('Failed: ' + message);
    }
};

app.initialize();