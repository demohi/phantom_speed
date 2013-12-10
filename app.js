var Basset = require('basset');
var lineReader = require('line-reader');
var fs = require('fs');
var Bagpipe = require('bagpipe');
var async = require('async');
var getUrlSpeed = function(url,callback){
        var basset = new Basset(url[1],{ repeatNum: 1 });
        basset.on('end', function (result) {
            if(result.results[0]){
                callback(false,result);
                console.log('append to result.txt')
                fs.appendFile('result.txt', url[0]+" , "+result.results[0].values.onLoad+"\n", function (err) {
                    if (err) throw err;
                });
            }
            else{
                callback(true);
            }
        });
        basset.on('testStart', function (result) {
            console.log("start")
        });
        basset.on('testStop', function (result) {
            console.log("stop")
        });
        basset.sniff();
};

var bagpipe = new Bagpipe(3);
lineReader.eachLine('urls.txt', function(line, last) {
    var data = line.split("	");
    bagpipe.push(test2,data,function(err,data){
        if(!err){
            console.log(data);
        }
    });
});


