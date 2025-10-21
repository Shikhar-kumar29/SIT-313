const http=require('http');
const data=JSON.stringify({email:'test@example.com'});
const opts={hostname:'localhost',port:3001,path:'/api/subscribe',method:'POST',headers:{'Content-Type':'application/json','Content-Length':Buffer.byteLength(data)}};
const req=http.request(opts,res=>{let d='';res.on('data',c=>d+=c);res.on('end',()=>{console.log('STATUS',res.statusCode);console.log('BODY',d)})});
req.on('error',e=>{console.error('ERR',e)});
req.write(data);
req.end();
