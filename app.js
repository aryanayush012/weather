const express=require("express");
const bodyParser = require("body-parser");
const request=require("request");
const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
var temp="";
var humidity="";
var city="";
var feels_like="";
var state="";
var description="";

app.get("/",function(req,res){
     res.render("index",{temp:temp,humidity:humidity,city:city,state:state,description:description,feels_like:feels_like});
});
app.post("/",function(req,res){
    city = req.body.search;
     state=req.body.state;
    console.log(city);
    console.log(state);
    if(state === "Andhra Pradesh"){state = "AD";}
else if(state === "Assam"){state = "AS";}
else if(state === "Bihar"){state = "BR";}
else if(state === "Chattisgarh"){state = "CG";}
else if(state === "Delhi"){state = "DL";}
else if(state === "Goa"){state = "GA";}
else if(state === "Gujarat"){state = "GJ";}
else if(state === "Haryana"){state = "HR";}
else if(state === "Himachal Pradesh"){state = "HP";}
else if(state === "Jammu and Kashmir"){state = "JK";}
else if(state === "Jharkhand"){state = "JH";}
else if(state === "Karnataka"){state = "KA";}
else if(state === "Kerala"){state = "KL";}
else if(state === "Lakshadweep Islands"){state = "LD";}
else if(state === "Madhya Pradesh"){state = "MP";}
else if(state === "Maharashtra"){state = "MH";}
else if(state === "Manipur"){state = "MN";}
else if(state === "Meghalaya"){state = "ML";}
else if(state === "Mizoram"){state = "MZ";}
else if(state === "Nagaland"){state = "NL";}
else if(state === "Odisha"){state = "OD";}
else if(state === "Pondicherry"){state = "PY";}
else if(state === "Punjab"){state = "PB";}
else if(state === "Rajasthan"){state = "RJ";}
else if(state === "Sikkim"){state = "SK";}
else if(state === "Tamil Nadu"){state = "TN";}
else if(state === "Telangana"){state = "TS";}
else if(state === "Tripura"){state = "TR";}
else if(state === "Uttar Pradesh"){state = "UP";}
else if(state === "Uttarakhand"){state = "UK";}
else if(state === "West Bengal"){state = "WB";}
else if(state === "Andaman and Nicobar Islands"){state = "AN";}
else if(state === "Chandigarh"){state = "CH";}
else if(state === "Dadra & Nagar Haveli and Daman & Diu"){state = "DNHDD";}
else if(state === "Ladakh"){state = "LA";}
else {state = "OT";}
console.log(state);
    const uri="http://api.openweathermap.org/geo/1.0/direct?q="+city+","+state+",IND&limit=&appid=8478b3a67430f326d1e0c3a266da80ca";

    var options = {
         url:uri
}

request(options,function(err,response,body){
      
    if(err){
     console.log(err);
    }
    
     
        else{
            // console.log(response);
           console.log(body);
        const r=JSON.parse(body);
        // console.log(r[0].name);
        // console.log(r[0].lat);
        // console.log(r[0].lon);
         console.log(r);
        
        const uri="https://api.openweathermap.org/data/2.5/weather?lat="+r[0].lat+"&lon="+r[0].lon+"&appid=8478b3a67430f326d1e0c3a266da80ca"
        var option2 = {
            
            url:uri
    }
    request(option2,function(err,response,body){
         if(err){
            console.log(err);

            
         }
         else{
           
            console.log(body);
            var p=JSON.parse(body);
            console.log(p);
            temp=p.main.temp;
            temp = temp-273.15;
            temp = temp.toString();
            temp = temp.substring(0,4);
            humidity=p.main.humidity;
            pressure=p.main.pressure;
            var r = p.weather[0];
            description=r.description;
            feels_like = p.main.feels_like;
            feels_like = feels_like-273.15;
            feels_like = feels_like.toString();
            feels_like = feels_like.substring(0,4);
            speed=p.wind.speed;
            res.redirect("/");
         }
    })
}


});
});
app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running on port 3000");
});