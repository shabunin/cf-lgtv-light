/*
 * Copyright (C) 2014 Vladimir Shabunin
 * E-Mail: va.shabunin@physics.msu.ru
 * License: http://www.gnu.org/licenses/gpl.html GPL version 2 or higher
 * 
 * This is light version of module for LG Smart TV. 
 * You can contact me if you are interested in full version of this module.
 */

var LGTV = function(parameters) {
    /*
     * 
     * parameters = {
            host: 'http://ip',
            port: 'port', // by default it is 8080
            pairKey: 'pairing key that shown on your tv screen after sending sendShowKeyRequest
        }
     * 
     */
    var module = {
        host: '',
        port: '',
        pairKey: '',
        keys: {},
        udapHeaders: {}
    };
    
    module.host = parameters.host;
    module.port = parameters.port || '8080';
    module.pairKey = parameters.pairKey;
    
    module.pairUrl = module.host + ':' + module.port + '/udap/api/pairing'; //url for pairing requests
    module.commandUrl = module.host + ':' + module.port + '/udap/api/command'; //url for send commands like remote control keys, touch move/click/wheel, channel change

    module.udapHeaders = {
        'Content-Type': 'text/xml;',
        'User-Agent': 'UDAP/2.0'
    };
 
    module.keys = { //remote control keys 
        'Power': '1',
        'Number0': '2',
        'Number1': '3',
        'Number2': '4',
        'Number3': '5',
        'Number4': '6',
        'Number5': '7',
        'Number6': '8',
        'Number7': '9',
        'Number8': '10',
        'Number9': '11',
        'Up': '12',
        'Down': '13',
        'Left': '14',
        'Right': '15',
        'OK': '20',
        'HomeMenu': '21',
        'Menu': '22',
        'Back': '23',
        'VolumeUp': '24',
        'VolumeDown': '25',
        'Mute': '26',
        'ChannelUp': '27',
        'ChannelDown': '28',
        'Blue': '29',
        'Green': '30',
        'Red': '31',
        'Yellow': '32',
        'Play': '33',
        'Pause': '34',
        'Stop': '35',
        'FastForward': '36',
        'Rewind': '37',
        'SkipForward': '38',
        'SkipBackward': '39',
        'Record': '40',
        'RecordingList': '41',
        'Repeat': '42',
        'LiveTV': '43',
        'EPG': '44',
        'CurrentInfo': '45',
        'AspectRation': '46',
        'ExtInput': '47',
        'PIPSecondVideo': '48',
        'Subtitle': '49',
        'ProgramList': '50',
        'TeleText': '51',
        'Mark': '52',
        '3DVideo': '400',
        '3DL/R': '402',
        'Dash': '403',
        'PreviousChannel': '403',
        'FavoriteChannel': '404',
        'QuickMenu': '405',
        'TextOption': '406',
        'AudioDescription': '407',
        'NetCast': '408',
        'EnergySaving': '409',
        'A/V_Mode': '410',
        'SIMPLINK': '411',
        'Exit': '412',
        'ReservationProgramList': '412',
        'PIPChannelUp': '414',
        'PIPChannelDown': '415',
        'Primary/Secondary': '416',
        'MyApps': '417'
    };
    module.startUp = function() {
        CF.log('LG ' + module.host + 'starting up');
        module.sendHelloRequest();
    };
    module.sendShowKeyRequest = function () { //show your tv pairing key on screen
        CF.log('Show key request');
        var showKeyXML = '<envelope><api type="pairing"><name>showKey</name></api></envelope>';
        CF.request(module.pairUrl, 'POST', module.udapHeaders, showKeyXML,
            function (status, headers, body) {
                CF.log('Pairing callback');
                if (status == 200) {
                    //CF.log("showKeyXML sent");
                } else {
                    CF.log("Error: request showKey returned status " + status);
                }
                CF.log(status + '\t' + headers + '\t' + body);
            });
    };
    module.sendHelloRequest = function () { //send Hello request - need for init connection
        CF.log('Hello request');
        var helloXML = '<envelope><api type=\"pairing\"><name>Hello</name><value>' + module.pairKey + '</value><port>8080</port></api></envelope>';
        CF.request(module.pairUrl, 'POST', module.udapHeaders, helloXML,
            function (status, headers, body) {
                if (status == 200) {
                   // CF.log("Hello request data sent");
                } else {
                    CF.log("Error: request hello returned status " + status);
                }
            });
    };
    module.sendKey = function (key) { //send remote control keys
        CF.log('Send remote control command: ' + key + ' ' + module.keys[key]);
        var keyXML = '<envelope><api type="command"><name>HandleKeyInput</name><value>' + module.keys[key] + '</value></api></envelope>';
        CF.request(module.commandUrl, 'POST', module.udapHeaders, keyXML,
            function (status, headers, body) {
                if (status == 200) {
                    //CF.log("Key input data sent");
                } else {
                    CF.log("Error: request key input returned status " + status);
                }
            });
    };
    return module;
}