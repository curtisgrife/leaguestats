
$(function(){
     var path = window.location.pathname;
     //console.log("popteamstats, path: "+path);
     
     if (window.location.pathname.endsWith ('/matchscores')) {
          //document.cookie = "mydid=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
          console.log("Fetch matchscores...");
         
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
        //figure out if they have cookies set, in case they arrived to this page without going through the dvisions selction flow. 
        console.log("URLparams: " + urlParams);
        
        let did = urlParams.get('did');
        
        listCookies();//just look at what's there....
        
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


        matchcount =0;
        //get the team stats
          fetchurl = serverurl+"fetchteamstats?did="+did+"&tid=ALLTEAMS";
          console.log("URL to send: " +fetchurl);
          $.ajax({
               url: fetchurl, 
               dataType: "jsonp",
                success: function( response ) {
                   
                     console.log("Response received");
                     //console.log("Now to parse the response" +  JSON.stringify(response)); // server response
                          
                         lastmatchdate=response[0].matchdate.split("T")[0]; //only date plz
                         document.getElementById("matchpara").innerHTML = "Match Date: "+lastmatchdate;
                         //let's add some data rows to the table...
                         for (var key in response) {
                           //console.log("KEY: "+key);   
                           if (response.hasOwnProperty(key)) {
                           
                            //Clone the table...
                            if(lastmatchdate != response[key].matchdate.split("T")[0]){
                              //console.log("CREATE NEW ROW...");
                              matchcount++;
                              lastmatchdate=response[key].matchdate.split("T")[0]; 
                              //hometeam = response[key].hmteam;
                              //awayteam = response[key].awteam;
                              
                              newparaid = "matchpara"+matchcount;
                         
                              //possible soluition at https://bytes.com/topic/javascript/answers/546447-copy-nodes-increment-ids
                              var thisrow = document.getElementById('matchrow');
                              var newrow = thisrow.cloneNode(true);
                              thisrow.getElementsByTagName('table')[0].id = 'OLDmatchtable';
                              thisrow.id = 'OLDmatchrow';
                              thisrow.parentNode.appendChild(newrow);
                              newrow.getElementsByTagName('p')[0].id = newparaid;
                              document.getElementById(newparaid).innerHTML = "Match Date: "+lastmatchdate;
                              // console.log("MATCH..."+ hometeam +" vs. "+awayteam +" --" +lastmatchdate);
                              //we'll need to remove the data from the clone...
                              rowcount = document.getElementById('matchrow').getElementsByTagName('table')[0].getElementsByTagName('tr').length;
                              // console.log("TABLE COUNT: " + document.getElementById('matchrow').getElementsByTagName('table').length);
                              // console.log("ROWS TO DELETE: "+rowcount);
                              //document.getElementById('matchrow').getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].deleteRow(0);
                              //iterate over the table....
                              for(x =  1;x < rowcount; x++){
                                  //console.log("ROW TO DELETE: "+x);
                                  //this messed with me! every time I delete a row, the top one becomes index 0!
                                  document.getElementById('matchrow').getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].deleteRow(0);
                              }
                             
                          }
                    
                            var matchdate = response[key].matchdate.split("T")[0]; //Only show date. Time isn't important.
                            var hometeam =  response[key].hmteam;
                            var tid = response[key].hmtid;
                            var rwh = response[key].hmrndpoints;
                            var ptsh = response[key].hmttlscore;
                            var awayteam = response[key].awteam;
                            var awaytid = response[key].awtid;
                            var rwa = response[key].awrndpoints;
                            var ptsa = response[key].awttlscore;
  
                            //console.log(response[key].mid + " match -> " + matchdate); 
                              //var tableRef = document.getElementById('matchtable').getElementsByTagName('tbody')[0];
                              var tablerow = document.getElementById('matchrow');
                              tableRef = tablerow.getElementsByTagName('table')[0].getElementsByTagName('tbody')[0];

                              // Insert a row in the table at the last row
                              var newRow   = tableRef.insertRow();

                              // Insert a cell in the row at index 0
                              var newCell  = newRow.insertCell(0);
                              // Create anchor element. 
                              var a = document.createElement('a');  
                              // Create the text node for anchor element. 
                              var link = document.createTextNode(hometeam); 
                              // Append the text node to anchor element. 
                              a.appendChild(link);  
                              // Set the title. 
                              a.title = "Go to scoresheet!";  
                              //Set the href property. 
                              a.href = "/scoresheet?mid="+response[key].mid;  
                              // Append the anchor element to the body. 
                              newCell.appendChild(a); 
                              var newCell  = newRow.insertCell(1);
                              newCell.innerHTML=rwh;
                              var newCell  = newRow.insertCell(2);
                              newCell.innerHTML=ptsh;
                              var newCell  = newRow.insertCell(3);
                              newCell.innerHTML="vs";
                              var newCell  = newRow.insertCell(4);
                               // Create anchor element. 
                               var a = document.createElement('a');  
                               // Create the text node for anchor element. 
                               var link = document.createTextNode(awayteam); 
                               // Append the text node to anchor element. 
                               a.appendChild(link);  
                               // Set the title. 
                               a.title = "Go to scoresheet!";  
                               //Set the href property. 
                               a.href = "/scoresheet?mid="+response[key].mid;  
                               // Append the anchor element to the body. 
                               newCell.appendChild(a); 
                              //newCell.innerHTML=awayteam;
                              var newCell  = newRow.insertCell(5);
                              newCell.innerHTML=rwa;
                              var newCell  = newRow.insertCell(6);
                              newCell.innerHTML=ptsa; 
                      
                         }
                    }
                   
                }
                          
            });//end ajax call.

      

      

  
    }

     
});
