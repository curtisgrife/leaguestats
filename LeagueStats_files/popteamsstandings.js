
$(function(){
     var path = window.location.pathname;
          
     if (window.location.pathname.endsWith ('/teams') || window.location.pathname.endsWith ('/teamstandings')) {
          
          console.log("Fetch teams data...")
          console.log("URL hostname: "+window.location.hostname);
          var serverurl  = ""
          if(window.location.hostname.includes("192.168.99")){
            console.log("Running locally...devmode...");
            serverurl = "http://192.168.99.126:3000/";
          }
          else{
            console.log("Running remote server (presumaly production mode)...");
          
            serverurl = "https://billiardleaguestats.com/";
          }  
        
         
         
          var urlParams = new URLSearchParams(window.location.search);

          //Below are examples of how to use urlParams...
          // console.log(urlParams.has('post')); // true
          // console.log(urlParams.get('action')); // "edit"
          // console.log(urlParams.getAll('action')); // ["edit"]
          // console.log(urlParams.toString()); // "?post=1234&action=edit"
          // console.log(urlParams.append('active', '1')); // "?post=1234&action=edit&active=1"

          let did = urlParams.get('did');
          let name = urlParams.get('name');

          //cookiemanager.listCookies();
          listCookies();

          if(did =="" || did == null){
               console.log("no DID found...need to try cookie");
               did = getCookie("mydid");
               name = getCookie("myname");
          }
          else{
               console.log("Setting cookies now that we have URLParams")
               setCookie("mydid",did,1000);
               setCookie("myname",name,1000);
          }
          console.log("Here's the did: "+did);
          console.log("Here's the name: "+name);
          //if no did at this point, the page will render blank...this happens if they try team standings before EVER picking a div

          if(did){
               document.getElementById("divname").innerHTML = name;
          }
          else{
               document.getElementById("divname").innerHTML = "Nothing here - ";
               // Create anchor element. 
               var a = document.createElement('a');  
               var link = document.createTextNode("Pick a division to start."); 
               a.appendChild(link);  
               a.title = "Go To Divisions";  
               a.href = serverurl+"divisions";  
               document.getElementById("divname").appendChild(a);  
          }

          //set the players stats link URL...
          var a = document.getElementById('playerstatsurl'); //or grab it by tagname etc
          a.href = "playerstats?did="+did;


          fetchurl = serverurl+"fetchteamstandings?did="+did+"&name="+name;
          console.log("URL to send: " +fetchurl);

          $.ajax({
               //url: "http://192.168.99.126:3000/fetchteamstandings",
               //just for testing...
               //url: "http://192.168.99.126:3000/fetchteamstandings?did=111&name=TestDiv",
               url: fetchurl,
               dataType: "jsonp",
               success: function( response ) {
                   
                    //var respArr = JSON.parse(response);
                    //console.log("Now to parse the response" +  JSON.stringify(response)); // server response

                    //let's add some data rows to the table...
                    poscount =1;//to put position in... 
                    for (var key in response) {
                         //console.log("KEY: "+key);   
                          if (response.hasOwnProperty(key)) {
                   
                               var name = response[key].teamname;
                               var tid =  response[key].tid;
                               var rw = response[key].RW;
                               var rp = response[key].RP;
                               var rwp = response[key].RWP;
                               var gw = response[key].GW;
                               var gp = response[key].GP;
                               var gwp = response[key].GWP;
                               var ptsp = response[key].ptsp;
                               var ptsm = response[key].ptsm;
                               var ptspm = response[key].ptspm;
                               var ttlptspls = response[key].ttlptspls;
                               var ttlptsmns = response[key].ttlptsmns;
                               var hcppts = response[key].hcppts;
  
                               console.log(key + " name -> " + name); 
                               var tableRef = document.getElementById('teamstable').getElementsByTagName('tbody')[0];

                               // Insert a row in the table at the last row
                               var newRow   = tableRef.insertRow();

                               // Insert a cell in the row at index 0
                               var newCell  = newRow.insertCell(0);
                              newCell.innerHTML=poscount;
                              // Create anchor element. 
                              //var a = document.createElement('a');  
                              // Create the text node for anchor element. 
                              //var link = document.createTextNode(divname); 
                              // Append the text node to anchor element. 
                              //a.appendChild(link);  
                              // Set the title. 
                              //a.title = divname;  
                              // Set the href property. 
                              //a.href = "/teams?did="+did+"&name="+divname;  
                              // Append the anchor element to the body. 
                              //newCell.appendChild(a);  
                              newCell  = newRow.insertCell(1);
                              // Create anchor element. 
                              var a = document.createElement('a');  
                              // Create the text node for anchor element. 
                              var link = document.createTextNode(name); 
                              // Append the text node to anchor element. 
                              a.appendChild(link);  
                              // Set the title. 
                              a.title = name;  
                              //Set the href property. 
                              a.href = "/teamstats?did="+did+"&tid="+tid+"&name="+name;  
                              // Append the anchor element to the body. 
                              newCell.appendChild(a); 
                              var newCell  = newRow.insertCell(2);
                              newCell.innerHTML=rw;
                              var newCell  = newRow.insertCell(3);
                              newCell.innerHTML=rp;
                              var newCell  = newRow.insertCell(4);
                              newCell.innerHTML=rwp;
                              var newCell  = newRow.insertCell(5);
                              newCell.innerHTML=gw;
                              var newCell  = newRow.insertCell(6);
                              newCell.innerHTML=gp;
                              var newCell  = newRow.insertCell(7);
                              newCell.innerHTML=gwp;
                              var newCell  = newRow.insertCell(8);
                              newCell.innerHTML=ttlptspls; 
                              var newCell  = newRow.insertCell(9);
                              newCell.innerHTML=ttlptsmns; 
                              var newCell  = newRow.insertCell(10);
                              newCell.innerHTML=ptspm; 

                         }
                         poscount++;
                    }
                   
               }
                          
           });

      }



     
});
