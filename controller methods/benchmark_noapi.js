const db = require('../config/pg');
const fs = require('fs');

var benchmark = {};

benchmark.benchmark_1=(req,res)=>{
    console.log("noapi: benchmark_1");
    const getCompanyUserQuery = `SELECT user_name FROM "users"`;
    db.query(getCompanyUserQuery,(error,result)=>{
        if(error) {
            throw error;
        }
        res.send(result.rows);
    });  
}

benchmark.benchmark_2=(req,res)=>{   
    console.log("api: benchmark_2");   
    let x = 0;
    for(let i=0;i<=100000000;i++){
        x=x+i;
    }
}

benchmark.benchmark_3=(req,res)=>{
    console.log("noapi: benchmark_3");    
    var wstream = fs.createWriteStream('benchmark_noapi.txt');
    function writeToStream(i) {
    for (let i=0; i < 100000000; i++) {
        if (!wstream.write(i + '\n')) {
        // Wait for it to drain then start writing data from where we left off
        wstream.once('drain', function() {
            writeToStream(i + 1);
        });
        return;
        }
    }
    wstream.end();
    }
    writeToStream(0);       
}

benchmark.benchmark_4=(req,res)=>{
    console.log("noapi: benchmark_4");
    new Promise((resolve,reject)=>{
        for(let i=0;i=100;i++){
            res.write(i+"\n"); 
        }
    }).then(()=>{
        res.end();  
    });
}

module.exports = benchmark;