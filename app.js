var Basset = require('basset');
var lineReader = require('line-reader');
var fs = require('fs');
var Bagpipe = require('bagpipe');
var async = require('async');
var getUrlSpeed = function(url,callback){
        var basset = new Basset(url[1],{ repeatNum: 10 });
        basset.on('end', function (result) {
            if(result.results[0]){
	        var data = {};
		data.url = url[1];
		data.result = result.results;
                callback(false,data);
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
var doResult = function(data){
   var sum = 0
   for(var i in data.result){
       console.log(data.result[i]);
       sum += data.result[i]['values']['onLoad'];
   }
   console.log(data.url+" onLoad:" +(sum/data.result.length));
}
var bagpipe = new Bagpipe(3);
lineReader.eachLine('urls.txt', function(line, last) {
    var data = line.split("	");
    bagpipe.push(getUrlSpeed,data,function(err,result){
        if(!err){
           doResult(result); 
        }
    });
});


