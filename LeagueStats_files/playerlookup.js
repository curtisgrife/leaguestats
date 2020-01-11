
$(function(){
    
    var path = window.location.pathname;
    console.log("Serverurl: "+serverurl); //get fropm fbauth
    if (window.location.pathname.endsWith ('/playerlookup.html') || window.location.pathname.endsWith ('/playerlookup')) {
        console.log("playerlookup.js, path: "+path);
        console.log("Let's do player lookup...");
        
        $(document).on('submit','.validateDontSubmit',function (e) {
            //prevent the form from doing a submit - doing this to leverage form chekcing (html 5) on browser side
            e.preventDefault();
            return false;
        });

      }
    
     $(function(){
          $("#namesearchbutton").click(function(e){
            console.log("Requested search by name...");
            //e.preventDefault(); //stops the link from doing it's normal thing
            //alert("clicked");
            //get form values..
            
            //clear out the table if it had been used alreayd...
            $("#resptable tbody tr").remove();
            $("#resptable th").remove();
            document.getElementById("namepara").innerHTML = "";

            //get the form values...
            var searchstr = document.getElementById("playerstring").value;
            var activedivs = false;
            if($("#formCheck-1").is(':checked')){
                //alert("checked");
                activedivs = "true";
            }
            
            
            var $theForm = $(this).closest('form');
              //Some browsers don't implement checkValidity
              if (( typeof($theForm[0].checkValidity) == "function" ) && !$theForm[0].checkValidity()) {
                 return;
              }                          
              
              //okay - go the ther server...
              fetchurl = serverurl+"playerlookup?searchby=name&searchstr="+searchstr+"&activedivs="+activedivs;
              $.ajax({
                url: fetchurl, 
                dataType: "jsonp",
                 success: function( response ) {
                    console.log("DEBUG...iterate over results");
                    //let's build up a table
                    //Here is the object received for this fetch
                    // playername: 'Steve Young',
                    // handicap: 8.5,
                    // memid: 191,
                    // tid: 2538,
                    // did: 220,
                    // division: '2019-20 WINTER THURSDAY SILVER',
                    // teamname: 'ANGRY WALRUS',
                    // dbquery: 'select * from gamescores.......'
                    //if('dbquery' in response[0]){ //we know that this response wants us to build a table that shows a list of further querable results....
                                                    //so build the table accordingly.
                                                    //if we get other types of reponses, we can dyncamiclly set i tup rght here.
                        
                        document.getElementById("namepara").innerHTML = "Found matches for '"+searchstr+"'";
                        
                        var orderArrayHeader = ["Player Name","Handicap","Division","Team Name"];
                        var headerref = document.getElementById('resptable').getElementsByTagName('thead')[0];
                        for(var i=0;i<orderArrayHeader.length;i++){
                            headerref.appendChild(document.createElement("th")).
                            appendChild(document.createTextNode(orderArrayHeader[i]));
                        }
                        var rescount =0;
                        for (var key in response) {
                            if (response.hasOwnProperty(key)) {
                                //console.log("KEY: "+key); 
                                rescount++;
                                var player = response[key].playername;
                                var hcp = response[key].handicap;
                                var division = response[key].division;
                                var team = response[key].teamname;
                                
                                var tableRef = document.getElementById('resptable').getElementsByTagName('tbody')[0];

                                // Insert a row in the table at the last row
                                var newRow = tableRef.insertRow();
                                // Insert a cell in the row at index 0
                                //Position
                                //player name as link
                                var newCell = newRow.insertCell(0);
                                // Create anchor element. 
                                var a = document.createElement('a');
                                // Create the text node for anchor element. 
                                var link = document.createTextNode(player);
                                // Append the text node to anchor element. 
                                a.appendChild(link);
                                // Set the title. 
                                a.title = response[key].memid; //memid to link from here.
                                //Set the href property. 
                                a.href = "/playerdivscores?memid=" + response[key].memid + "&did=" + response[key].did;
                                // Append the anchor element to the body. 
                                newCell.appendChild(a);
                                var newCell = newRow.insertCell(1);
                                newCell.innerHTML = hcp;
                                var newCell = newRow.insertCell(2);
                                newCell.innerHTML = division;
                                var newCell = newRow.insertCell(3);
                                newCell.innerHTML = team;
                            }
                        }
                        
                        //little bit of info on the  # of matches
                        if(rescount == 1){
                            document.getElementById("namepara").innerHTML = rescount +" match for '"+searchstr+"'";
                        }
                        else if(rescount > 1){
                            document.getElementById("namepara").innerHTML = rescount +" matches for '"+searchstr+"'";
                        }
                        else{
                            document.getElementById("namepara").innerHTML = "No matches for '"+searchstr+"'";
                        }
                }
            }); //end ajax call 
            
          
          });
        }); //end search by name




        $(function(){
            $("#hcpsearchbutton").click(function(e){
               console.log("Requested search by hcp..."); 
              //e.preventDefault(); //stops the link from doing it's normal thing
              //alert("clicked");
              //get form values..
              
              //clear out the table if it had been used alreayd...
              $("#resptable tbody tr").remove();
              $("#resptable th").remove();
              document.getElementById("namepara").innerHTML = "";
  
              //get the form values...
              var searchstr = document.getElementById("hcpstring").value;
              var activedivs = false;
              if($("#formCheck-2").is(':checked')){
                  //alert("checked");
                  activedivs = "true";
              }
              
              
              var $theForm = $(this).closest('form');
                //Some browsers don't implement checkValidity
                if (( typeof($theForm[0].checkValidity) == "function" ) && !$theForm[0].checkValidity()) {
                   return;
                }                          
                
                //okay - go the ther server...
                fetchurl = serverurl+"playerlookup?searchby=hcp&searchstr="+searchstr+"&activedivs="+activedivs;
                $.ajax({
                  url: fetchurl, 
                  dataType: "jsonp",
                   success: function( response ) {
                      console.log("DEBUG...iterate over results");
                      //let's build up a table
                      //Here is the object received for this fetch
                      // playername: 'Steve Young',
                      // handicap: 8.5,
                      // memid: 191,
                      // tid: 2538,
                      // did: 220,
                      // division: '2019-20 WINTER THURSDAY SILVER',
                      // teamname: 'ANGRY WALRUS',
                      // dbquery: 'select * from gamescores.......'
                      //if('dbquery' in response[0]){ //we know that this response wants us to build a table that shows a list of further querable results....
                                                      //so build the table accordingly.
                                                      //if we get other types of reponses, we can dyncamiclly set i tup rght here.
                          
                          document.getElementById("namepara").innerHTML = "Found matches for '"+searchstr+"'";
                          
                          var orderArrayHeader = ["Player Name","Handicap","Division","Team Name"];
                          var headerref = document.getElementById('resptable').getElementsByTagName('thead')[0];
                          for(var i=0;i<orderArrayHeader.length;i++){
                              headerref.appendChild(document.createElement("th")).
                              appendChild(document.createTextNode(orderArrayHeader[i]));
                          }
                          var rescount =0;
                          for (var key in response) {
                              if (response.hasOwnProperty(key)) {
                                  //console.log("KEY: "+key); 
                                  rescount++;
                                  var player = response[key].playername;
                                  var hcp = response[key].handicap;
                                  var division = response[key].division;
                                  var team = response[key].teamname;
                                  
                                  var tableRef = document.getElementById('resptable').getElementsByTagName('tbody')[0];
  
                                  // Insert a row in the table at the last row
                                  var newRow = tableRef.insertRow();
                                  // Insert a cell in the row at index 0
                                  //Position
                                  //player name as link
                                  var newCell = newRow.insertCell(0);
                                  // Create anchor element. 
                                  var a = document.createElement('a');
                                  // Create the text node for anchor element. 
                                  var link = document.createTextNode(player);
                                  // Append the text node to anchor element. 
                                  a.appendChild(link);
                                  // Set the title. 
                                  a.title = response[key].memid; //memid to link from here.
                                  //Set the href property. 
                                  a.href = "/playerdivscores?memid=" + response[key].memid + "&did=" + response[key].did;
                                  // Append the anchor element to the body. 
                                  newCell.appendChild(a);
                                  var newCell = newRow.insertCell(1);
                                  newCell.innerHTML = hcp;
                                  var newCell = newRow.insertCell(2);
                                  newCell.innerHTML = division;
                                  var newCell = newRow.insertCell(3);
                                  newCell.innerHTML = team;
                              }
                          }
                          
                          //little bit of info on the  # of matches
                          if(rescount == 1){
                              document.getElementById("namepara").innerHTML = rescount +" match for '"+searchstr+"'";
                          }
                          else if(rescount > 1){
                              document.getElementById("namepara").innerHTML = rescount +" matches for '"+searchstr+"'";
                          }
                          else{
                              document.getElementById("namepara").innerHTML = "No matches for '"+searchstr+"'";
                          }
                  }
              }); //end ajax call 
              
            
            });
          }); //end search by handicap

    
     
});
