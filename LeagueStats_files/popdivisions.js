$(function(){
     if (window.location.pathname.endsWith ('/divisions')) {
          console.log("Fetch divisions data...")
          
       
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
          
       
          $.ajax({
               url: serverurl+"fetchdivs",
               dataType: "jsonp",
               success: function( response ) {
                    //JSON.stringify(tmpData, null, '\t'); //example
                    //teststr = JSON.stringify(response,null, '\t');
                    
                    //var respArr = JSON.parse(response);
                    console.log("Now to parse the response" +  response); // server response

                    //let's add some data rows to the table...
                    for (var key in response) {
                         if (response.hasOwnProperty(key)) {
                              var divname = response[key].name;
                              var did = response[key].did;
                              //console.log(key + " name -> " + response[key].name); //FINALLY...I can see data from the database! time for beer!
                              console.log(key + " name -> " + divname); //FINALLY...I can see data from the database! time for beer!
                              //console.log(key + " lastUpdated -> " + response[key].lastupdate);
                               
                              var tableRef = document.getElementById('divtable').getElementsByTagName('tbody')[0];
                               //var tableRef = document.getElementById('divtable');

                         //      // Insert a row in the table at the last row
                               var newRow   = tableRef.insertRow();

                         //      // Insert a cell in the row at index 0
                               var newCell  = newRow.insertCell(0);

                              // Append a text node to the cell
                              // Create anchor element. 
                              var a = document.createElement('a');  
                              // Create the text node for anchor element. 
                              var link = document.createTextNode(divname); 
                              // Append the text node to anchor element. 
                              a.appendChild(link);  
                              // Set the title. 
                              a.title = divname;  
                              // Set the href property. 
                              a.href = "/teams?did="+did+"&name="+divname;  
                              // Append the anchor element to the body. 
                              newCell.appendChild(a);  

                         }
                     }

               }
                          
           }); //end 1st ajax

           $.ajax({
               url: serverurl+"fetchpastdivs",
               dataType: "jsonp",
               success: function( response ) {
                    //JSON.stringify(tmpData, null, '\t'); //example
                    //teststr = JSON.stringify(response,null, '\t');
                    
                    //var respArr = JSON.parse(response);
                    console.log("Now to parse the response" +  response); // server response

                    //let's add some data rows to the table...
                    for (var key in response) {
                         if (response.hasOwnProperty(key)) {
                              var divname = response[key].name;
                              var did = response[key].did;
                              //console.log(key + " name -> " + response[key].name); //FINALLY...I can see data from the database! time for beer!
                              console.log(key + " name -> " + divname); //FINALLY...I can see data from the database! time for beer!
                              //console.log(key + " lastUpdated -> " + response[key].lastupdate);
                               
                              var tableRef = document.getElementById('olddivtable').getElementsByTagName('tbody')[0];
                               //var tableRef = document.getElementById('divtable');

                         //      // Insert a row in the table at the last row
                               var newRow   = tableRef.insertRow();

                         //      // Insert a cell in the row at index 0
                               var newCell  = newRow.insertCell(0);

                              // Append a text node to the cell
                              // Create anchor element. 
                              var a = document.createElement('a');  
                              // Create the text node for anchor element. 
                              var link = document.createTextNode(divname); 
                              // Append the text node to anchor element. 
                              a.appendChild(link);  
                              // Set the title. 
                              a.title = divname;  
                              // Set the href property. 
                              a.href = "/teams?did="+did+"&name="+divname;  
                              // Append the anchor element to the body. 
                              newCell.appendChild(a);  

                         }
                     }

               }
                          
           });


     }
     
});
