var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xmlhttp=new XMLHttpRequest();
xmlhttp.open('GET', "https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt", false);
xmlhttp.send();
console.log(xmlhttp.responseText)