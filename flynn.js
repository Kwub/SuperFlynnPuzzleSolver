var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xmlhttp=new XMLHttpRequest();
xmlhttp.open('GET', "https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt", false);
xmlhttp.send();
var words = xmlhttp.responseText.split('\n');
for (var i = 0; i < words.length; i++) {
    console.log(words[i]);
}
// console.log(xmlhttp.responseText)
