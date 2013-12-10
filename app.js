var Basset = require('basset');
var lineReader = require('line-reader');
var fs = require('fs');
var Bagpipe = require('bagpipe');

var test = function(data){
    (function(url){
        var basset = new Basset(url[1],{ repeatNum: 1 });
        basset.on('end', function (result) {
            if(result.results[0]){
                console.log('append to result.txt')
                fs.appendFile('result.txt', url[0]+" , "+result.results[0].values.onLoad+"\n", function (err) {
                    if (err) throw err;
                });
            }
            else{
                console.log(url[1]);
                console.log("fail");
            }
        });
        basset.on('testStart', function (result) {
            console.log("start")
        });
        basset.on('testStop', function (result) {
            console.log("stop")
        });
        basset.sniff();
    })(data);
}
var bagpipe = new Bagpipe(3);
lineReader.eachLine('urls.txt', function(line, last) {
    var data = line.split("	");
    bagpipe.push(test,data,function(err){
        console.log(err);
    })
});
