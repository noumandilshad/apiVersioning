const versionFile=require('./versions');

module.exports=function(req,res,next){
    let methodCall;

    const checkFunction = (req._parsedUrl.path).toString().substr(1,req._parsedUrl.path.toString().length);
    const checkVersion = req.headers['version'];
    const method=versionFile.find((m)=>{
        if(Object.keys(m)==checkFunction){            
            return m;
        }
    });

    
    const added=Object.values(method)[0].add;
    const modified=Object.values(method)[0].mod;
    const depricated=Object.values(method)[0].dep;    
    const totalMethods=added.length+modified.length+depricated.length;
    console.log(totalMethods,added,modified,depricated);
    
    const SearchIndex=()=>{        
        let val=Math.max.apply(Math,
            modified.filter(function(x){return x <= checkVersion}));

        function searchIndex(element) {
            return element == val;
        }
        let indexSearched=modified.findIndex(searchIndex);
        return indexSearched+1;
        }

    res.methods=`Added: ${added} \nModified: ${modified} \nDepricated: ${depricated} \n`;
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
                    let deprecatedAt = modified.length+1;
                    methodCall=deprecatedAt;
                }
                else if(checkVersion<dep){
                    modified.forEach((modi)=>{
                        if(checkVersion==modi){
                            res.execute = `Functions modifed, executed: ${modi}`;
                            methodCall=modi;
                        }
                        else if(checkVersion>modi){
                            let method = Math.max.apply(Math, modified.filter(function(x){return x <= checkVersion}));
                            let call = SearchIndex();                            
                            res.execute = `Functions modified, executed: ${method}`;
                            methodCall=call;
                        }
                        else if(checkVersion<modi){
                            let call = SearchIndex();
                            let method = Math.max.apply(Math, modified.filter(function(x){return x <= checkVersion}));
                            res.execute = `Functions modified, executed: ${method}`;
                            methodCall=call;
                        }
                    })
                    
                }            
                else if(checkVersion==dep){
                    if(modified.length!=0){
                        let call_01 = SearchIndex();
                        let method = Math.max.apply(Math, modified.filter(function(x){return x <= checkVersion}));
                        let call_02 = added[0];
                        let call=[];
                        call.push(call_01,call_02);
                        res.execute = `Functions depricated, executed: ${method}`;
                        methodCall = call_01;
                    }
                    else{
                        let call = added[0];
                        res.execute = `Functions depricated, executed: ${call}`;
                        methodCall = call;
                    }
                    
                }
            });
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
                let call = SearchIndex();
                let method = Math.max.apply(Math, modified.filter(function(x){return x <= checkVersion}));
                res.execute = `Functions modified, executed: ${method}`;
                
                methodCall = call;   
                console.log(modified.length);
                console.log(methodCall); 
            }
            res.methodToCall = methodCall;
            next();
        }
    }   
}