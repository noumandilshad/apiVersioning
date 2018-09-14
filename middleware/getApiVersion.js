const versionFile=require('../versions');

module.exports=function(req,res,next){
    let methodCall;
    // getting function name from the url.
    const checkFunction = (req._parsedUrl.path).toString().substr(1,req._parsedUrl.path.toString().length);
    // getting version number from Request headers.
    const checkVersion = req.headers['version'];
       
    // Setting the values of added,modified and depricated as in the versionFile
    const added=versionFile[checkFunction].add;
    const modified=versionFile[checkFunction].mod;
    const depricated=versionFile[checkFunction].dep;    
    const totalMethods=added.length+modified.length+depricated.length;
    //console.log(totalMethods,added,modified,depricated);
    
    // Throwning values of added, modified, depricated in api call back.
    res.methods=`Added: ${added} \nModified: ${modified} \nDepricated: ${depricated} \n`;

    //Algorithm to give back the version needs to be executed.
    if(checkVersion==undefined){
        res.methods=`No Version. \n`
        res.execute=`Please provide the version Of the api.`;
        methodCall=null;
        res.methodToCall = methodCall;
        next();
    }
    else if(checkVersion<added[0]){
        res.execute = `Functions is not present.`;
        methodCall=null;
        res.methodToCall = methodCall;
        next();
    }
    else if(checkVersion==added[0]){
        let call = added[0];
        res.execute = `Functions is executed: ${call}`;
        methodCall=call;
        res.methodToCall = methodCall;
        next();
    }
    if(checkVersion>added[0]){
        if(depricated.length>0){
            depricated.forEach((dep)=>{
                if(checkVersion>dep){
                    res.execute = `Functions is been depricated in: ${dep}`;
                    methodCall=dep;
                }
                else if(checkVersion<dep){
                    modified.forEach((modi)=>{
                        if(checkVersion==modi){
                            res.execute = `Functions modifed, executed: ${modi}`;
                            methodCall=modi;
                        }
                        else if(checkVersion>modi){
                            let call = Math.max.apply(Math, modified.filter(function(x){return x <= checkVersion}));
                            res.execute = `Functions modified, executed: ${call}`;
                            methodCall=call;
                        }
                        else if(checkVersion<modi){
                            let call = Math.max.apply(Math, modified.filter(function(x){return x <= checkVersion}));
                            res.execute = `Functions modified, executed: ${call}`;
                            methodCall=call;
                        }
                    })
                    
                }            
                else if(checkVersion==dep){
                    if(modified.length!=0){
                        let call = Math.max.apply(Math, modified.filter(function(x){return x <= checkVersion}));
                        let call_02 = added[0];
                        //call.push(call_01,call_02);
                        res.execute = `Functions depricated, executed: ${call}`;
                        methodCall = call;
                    }
                    else{
                        let call = added[0];
                        res.execute = `Functions depricated, executed: ${call}`;
                        methodCall = call;
                    }
                    
                }
            });

            // Throwing back the function number that needs to be executed.
            res.methodToCall = methodCall;
            next();
        }    
        else if(depricated.length<=0){
            if(modified.length<=0){
                let call = added[0];
                res.execute = `Functions is been not been yet modified or depricated in: executed: ${call}`;
                methodCall = call;
            }
            else if(modified.length>0){  
                let call = Math.max.apply(Math, modified.filter(function(x){return x <= checkVersion}));
                res.execute = `Functions modified, executed: ${call}`;
                
                methodCall = call;   
            }

            // Throwing back the function number that needs to be executed.
            res.methodToCall = methodCall;
            next();
        }
    }   
}