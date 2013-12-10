var Basset = require('basset');
var lineReader = require('line-reader');
var fs = require('fs');
var Bagpipe = require('bagpipe');
var async = require('async');
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
var test2 = function(data,callback){
    callback(data);
}
var bagpipe = new Bagpipe(3);
var q = async.queue(function(data,callback){
   test2(data,callback); 
},3);
q.drain = function(){
    console.log("all done");
};
lineReader.eachLine('urls.txt', function(line, last) {
    var data = line.split("	");
    /*
    bagpipe.push(test2,data,function(err){
        console.log(err);
    }); 
    q.push(data,function(err){
        console.log(err);
    });*/
});

for(var i=0;i<10;i++){
    bagpipe.push(test2,i,function(data){
        console.log(data);
    });
}


