var TV = {};

CF.userMain = function() {
    TV.LG1 = LGTV({
        host: 'http://192.168.1.100',
        port: '8080',
        pairKey: '985245'
    });
    TV.LG1.startUp();
}