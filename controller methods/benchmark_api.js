const db = require('../config/pg');
const fs = require('fs');
var benchmark = {};

benchmark.benchmark_api_1=(req,res)=>{
    console.log("api: benchmark_1 executed.") 

}

benchmark.benchmark_api_2=(req,res)=>{ 
    console.log("benchmark_api_2 executed.")
}

benchmark.benchmark_api_3=(req,res)=>{
    console.log("benchmark_api_3 executed.")
}

benchmark.benchmark_api_4=(req,res)=>{
    console.log("benchmark_api_4 executed.")
}
benchmark.benchmark_api_5=(req,res)=>{
    console.log("benchmark_api_5 executed.")
}

module.exports = benchmark;

