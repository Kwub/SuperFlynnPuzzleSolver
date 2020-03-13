var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var cmu = new XMLHttpRequest();
cmu.open('GET', "http://svn.code.sf.net/p/cmusphinx/code/trunk/cmudict/cmudict-0.7b", false);
cmu.send();
var cmuList = cmu.responseText.split('\n');

for (var i = 0; i < cmuList.length; i++) {
    cmuList[i] = cmuList[i].split(" ")
}

counter = 0
for (var i = 0; i < cmuList.length; i++) {
    if (cmuList[i][0].includes("-")) {
        console.log(cmuList[i][0])
        counter++
    }
}
console.log(counter)