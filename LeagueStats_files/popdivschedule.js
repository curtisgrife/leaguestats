
$(function(){
     var path = window.location.pathname;
     
     if (window.location.pathname.endsWith ('/divschedule')) {
          
          console.log("Fetch schedule for a division ...")
         
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

          let did = urlParams.get('did');
       
          listCookies();
         
          if(did =="" || did == null){
               console.log("no DID found...need to try cookie");
                did = getCookie("mydid");
       
          }
          else{
               setCookie("mydid",did,1000);
          }
          console.log("Here's the did: "+did);
        
          //set the divname
          if(did){
               //need to get the div name - dip to db...
               fetchurl = serverurl + "fetchdivname?did=" + did;
               $.ajax({
                    url: fetchurl,
                    dataType: "jsonp",
                    success: function(response) {
                         //console.log("Got reponse for fetchdivname" );
                         var divname = response[0].name;
                         console.log("divname: " + divname);
                         document.getElementById("divname").innerHTML = divname;
                    }
               }); //end ajax call.
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

         
          fetchurl = serverurl+"fetchdivschedule?did="+did;
          console.log("URL to send: " +fetchurl);

          $.ajax({
               url: fetchurl,
               dataType: "jsonp",
               success: function( response ) {
                   //console.log("Now to parse the response" +  JSON.stringify(response)); // server response

                    //let's add some data rows to the table...
                    poscount =1;//to put position in... 
                    for (var key in response) {
                         //console.log("KEY: "+key);   
                          if (response.hasOwnProperty(key)) {
                              //console.log("VALUE for home team: "+response[key].hometeam); 
                              var matchdate = response[key].matchdate;
                              var location = response[key].location;
                              var matchtime = response[key].matchtime;
                              var matchtable = response[key].matchtable;
                              var hometeam = response[key].hometeam;
                              var awayteam = response[key].awayteam;
                              var tableRef = document.getElementById('schedstable').getElementsByTagName('tbody')[0];

                              //  // Insert a row in the table at the last row
                              var newRow   = tableRef.insertRow();

                              // Insert a cell in the row at index 0
                              var newCell  = newRow.insertCell(0);
                              newCell.innerHTML=location;
                              var newCell  = newRow.insertCell(1);
                              newCell.innerHTML=matchdate;
                              var newCell  = newRow.insertCell(2);
                              newCell.innerHTML=matchtime;
                              var newCell  = newRow.insertCell(3);
                              newCell.innerHTML=matchtable;
                              var newCell  = newRow.insertCell(4);
                              newCell.innerHTML=hometeam;
                              var newCell  = newRow.insertCell(5);
                              newCell.innerHTML=awayteam;

                             

                         }
                         poscount++;
                    }
                   
               }
                          
           });

      }
     
});
