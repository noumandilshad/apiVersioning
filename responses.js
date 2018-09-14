// Setting the positive response if version of the function exists.
exports.setPositiveResponse=async function (req,res){  
    res.write(`Request: ${req.headers['version']}\n`);
    res.write(res.methods);
    res.end(res.execute);   
}
// Setting the negative response if version of the function does not exists.
exports.setNegativeResponse=async function (req,res){
    res.write(`Request: ${req.headers['version']}\n`);
    res.write(res.methods);
    res.end(res.execute); 
}

