function analyze() {

    var phrase = document.getElementById("phrase").value;

    var xmlhttp = new XMLHttpRequest(),
        method = 'POST',
        url = '/language';

    xmlhttp.open(method, url, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.onload = function () {

    };
    xmlhttp.send(JSON.stringify({phrase: phrase}));

}