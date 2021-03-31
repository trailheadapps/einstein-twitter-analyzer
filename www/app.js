function analyze() {

    var phrase = document.getElementById("phrase").value;

    var xmlhttpp = new XMLHttpRequest(),
        method = 'POST',
        url = '/language';

    xmlhttpp.open(method, url, true);
    xmlhttpp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttpp.onload = function () {

    };
    xmlhttpp.send(JSON.stringify({phrase: phrase}));

}