const http=require('http');
const fs=require('fs')
let final=" ";
async function getdata(){
 let value = await fetch('https://randomuser.me/api/?results=10');
 let data= await value.json();
  final=data.results;
}
getdata();

const server=http.createServer(async(req,res)=>{
 if(req.url=="/"){
    res.writeHead(200,{"Content-Type":"text/html"});
    res.end(`
        <html>
        <head>
        </head>
        <body>

        <button onclick="ascending()" id="container1">Ascending</button>
        <button onclick="descending()" id="contain">Descending</button>
        
        <form onsubmit="return search()">
        <label for="fname">Full Name:</label><br>
        <input type="text" id="fname" name="fname" placeholder="Name"><br>
        <label for="fname">Email:</label><br>
        <input type="text" id="email" name="email" placeholder="email" ><br>
        <label for="fname">Username:</label><br>
        <input type="text" id="uname" name="uname" placeholder="Username"><br>
        
        <input type="submit" value="Submit">

        <div id="container">
        <div id="container2">
        
        <script>
        function search(){
            document.getElementById("container").innerHTML=' ';
            let value=document.getElementById("fname").value;
            let email=document.getElementById("email").value;
            let username=document.getElementById("uname").value;
           
            const para = document.createElement('p');
            const img = document.createElement('img');
            para.innerHTML="Not Available";

            for(let x of ${JSON.stringify(final)}){
                let nm=x.name.first+" "+x.name.last;
                if((x.name.first.includes(value) || x.name.last.includes(value)||nm==value||value=="")&&(email==""||email==x.email)&&(username==""||username==x.login.username)){
                    para.innerHTML = x.name.first + " " +  x.name.last;
                    img.src=x.picture.large;
                    break;
                }
            }

            document.getElementById("container").appendChild(para);
            document.getElementById("container").appendChild(img);
            return false;
        }


        let arr=[];
                            for(let x of ${JSON.stringify(final)}){
                                let p = document.createElement('p');
                                let value = x.name.first+" "+x.name.last;
                                arr.push(value);
                                p.innerHTML=value;
                                document.getElementById("container2").appendChild(p)
                            }
                            function print()
                            {
                                document.getElementById("container2").innerHTML=' ';
                                for(let x of arr){
                                    let p = document.createElement('p');
                                    p.innerHTML=x;
                                    document.getElementById("container2").appendChild(p)
                                }
                            }
                            function ascending(){
                                arr.sort();
                                print();
                            }
                            function descending(){
                                arr.reverse();
                                print();
                            }
         </script>
        </body>
        </html>
        `
    );
}
 
 else{
    res.writeHead(404,{"Content-Type":"text/html"});
    res.end("there is error")

 }
});
server.listen(7000,()=>{
    console.log("server 8000 pe chlra hai")
})