const testingMethods=require('./controller methods/testing');
const function1Methods=require('./controller methods/function_1');
const function2Methods=require('./controller methods/function_2');
const function3Methods=require('./controller methods/function_3');
const bechmark_apiMethods=require('./controller methods/benchmark_api');
const errorHandler=require('./errorHandler');
const responses=require('./responses');

exports.testing=async (req,res)=>{    
    let exeFunction=functionToExecute(req,res);
    if(res.methodToCall!=null){ 
        testingMethods[exeFunction]();
        responses.setPositiveResponse(req,res);
    }
    else{       
        errorHandler.defaultMethod;    
        responses.setNegativeResponse(req,res);        
    }
}

exports.function1=async(req,res)=>{
    let exeFunction=functionToExecute(req,res);
    if(res.methodToCall!=null){ 
        function1Methods[exeFunction]();
        responses.setPositiveResponse(req,res);
    }
    else{         
        errorHandler.defaultMethod;  
        responses.setNegativeResponse(req,res);        
    }
}

exports.function2=async(req,res)=>{ 
    let exeFunction=functionToExecute(req,res);
    if(res.methodToCall!=null){ 
        function2Methods[exeFunction]();
        responses.setPositiveResponse(req,res);
    }
    else{         
        errorHandler.defaultMethod;  
        responses.setNegativeResponse(req,res);        
    }
}

exports.function3=async(req,res)=>{ 
    let exeFunction=functionToExecute(req,res);
    if(res.methodToCall!=null){ 
        function3Methods[exeFunction]();
        responses.setPositiveResponse(req,res);
    }
    else{         
        errorHandler.defaultMethod;  
        responses.setNegativeResponse(req,res);
    }
}

exports.benchmark_api=async(req,res)=>{ 
    let exeFunction=functionToExecute(req,res);
    if(res.methodToCall!=null){ 
        bechmark_apiMethods[exeFunction]();
        responses.setPositiveResponse(req,res);
    }
    else{         
        errorHandler.defaultMethod;  
        responses.setNegativeResponse(req,res);
    }
}


// making function name from function name (from the header) and version number (from the middleware) 
// giving back the name of the function that needs to be executed. 
function functionToExecute(req,res){
    return exeFunction = (req._parsedUrl.path).toString().substr(1,req._parsedUrl.path.toString().length)+'_'+res.methodToCall;
}