
const express= require('express');
const hbs = require('hbs')
const app = express()
const path = require('path')
const publicDirectory= path.join(__dirname,'../public')
const viewDirectory=path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
hbs.registerPartials(partialsPath)


const port = 3000 ; 
app.use(express.static(publicDirectory))
 
const request = require('request')


const url = "https://newsapi.org/v2/top-headlines?country=ca&apiKey=e3f56529342f43f4ae214b59b8e91042"
app.set('view engine','hbs')
app.set('views',viewDirectory)

app.get('/news',(req,res)=>{

request({url,json:true},(error,response)=>{
    if(error){
        console.log('Unable to connect to News service')
       }
   
       else if (response.body.message)
       {
       console.log(response.body.message);
      }
       else if(response.body.totalResults==0){
        console.log('wrong country name')
        }
       else{
        
            res.render('news',{
                
                              artical:response.body.articles



             })
            
       }
   
    
})

            
    

})
app.get('*',(req,res)=>{
    res.render('error')
})

app.listen(port,()=>{
    console.log('server is running')
})

