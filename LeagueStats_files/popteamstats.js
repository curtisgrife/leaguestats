
$(function(){
     var path = window.location.pathname;
     //console.log("popteamstats, path: "+path);
     
     if (window.location.pathname.endsWith ('/teamstats')) {
          document.cookie = "mydid=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
          console.log("Fetch team stats...");
         
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
        let tid = urlParams.get('tid');
        let teamname = urlParams.get('name');
        
        listCookies(); 
         
        if(did =="" || did == null){
            console.log("no DID found...need to try cookie");
            did = getCookie("mydid");
            tid = getCookie("mytid");
            teamname = getCookie("myname");
        }
        else{
            setCookie("mydid",did,1000);
            setCookie("mytid",tid,1000);
            setCookie("myname",name,1000);
        }       
        console.log("Here's the did: "+did);
        console.log("Here's the tid: "+tid);
        console.log("Here's the teamname: "+teamname);


        var a = document.getElementById('divschedurl'); //or grab it by tagname etc
        a.href = "divschedule?did="+did;
        
        document.getElementById("teamname").innerHTML = teamname;

        //get playerdetails
        //first, figure out how many plyer cards to display
        fetchurl = serverurl+"fetchdivinfo?did="+did;
        console.log("Get div info for did: " +did);
        
        var gamesperround =0;
        $.ajax({
            url: fetchurl, 
            dataType: "jsonp",
             success: function( response ) {
                
                  //var respArr = JSON.parse(response);
                  console.log("Response received:");
                  console.log("Now to parse the response: " +  JSON.stringify(response)); 
                  gamesperround = response[0].gamesperround;
                  console.log("Games per round: "+gamesperround); //this is potentially the number of player cards to display
                                                                            // potentially fewer cards to display, if there are fewer players in the team than games per round
                  
             }
                       
         });//end ajax call.

        


        //get the team stats
          fetchurl = serverurl+"fetchteamstats?did="+did+"&tid="+tid;
          console.log("URL to send: " +fetchurl);
          $.ajax({
               url: fetchurl, 
               dataType: "jsonp",
                success: function( response ) {
                   
                     //var respArr = JSON.parse(response);
                     console.log("Response received");
                     //console.log("Now to parse the response" +  JSON.stringify(response)); // server response

                         //let's add some data rows to the table...
                         for (var key in response) {
                          //console.log("KEY: "+key);   
                           if (response.hasOwnProperty(key)) {
                   

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
                              var tableRef = document.getElementById('matchtable').getElementsByTagName('tbody')[0];

                              // Insert a row in the table at the last row
                              var newRow   = tableRef.insertRow();

                              // Insert a cell in the row at index 0
                              var newCell  = newRow.insertCell(0);
                              // Create anchor element. 
                              var a = document.createElement('a');  
                              // Create the text node for anchor element. 
                              var link = document.createTextNode(matchdate); 
                              // Append the text node to anchor element. 
                              a.appendChild(link);  
                              // Set the title. 
                              a.title = matchdate;  
                              //Set the href property. 
                              a.href = "/scoresheet?mid="+response[key].mid;  
                              // Append the anchor element to the body. 
                              newCell.appendChild(a); 
                              var newCell  = newRow.insertCell(1);
                              newCell.innerHTML=hometeam;
                              var newCell  = newRow.insertCell(2);
                              newCell.innerHTML=rwh;
                              var newCell  = newRow.insertCell(3);
                              newCell.innerHTML=ptsh;
                              var newCell  = newRow.insertCell(4);
                              newCell.innerHTML="vs";
                              var newCell  = newRow.insertCell(5);
                              newCell.innerHTML=awayteam;
                              var newCell  = newRow.insertCell(6);
                              newCell.innerHTML=rwa;
                              var newCell  = newRow.insertCell(7);
                              newCell.innerHTML=ptsa; 
                      
                         }
                    }
                   
                }
                          
            });//end ajax call.

      fetchurl = serverurl+"fetchallplayerstats?did="+did+"&tid="+tid;
      console.log("URL to send: " +fetchurl);

      $.ajax({
           url: fetchurl, 
           dataType: "jsonp",
            success: function( response2 ) {
                  playercount=0;               
                 //var respArr = JSON.parse(response2);
                 console.log("Response received");
                 //console.log("Now to parse the response" +  JSON.stringify(response2)); // server response

                     //let's add some data rows to the table...
                      for (var key in response2) {
                       //console.log("KEY: "+key);   
                        if (response2.hasOwnProperty(key)) {
                            playercount++;
                            var player = response2[key].name;
                            var gp = response2[key].gp;
                            var hcp = response2[key].hcp;
                            var gw = response2[key].gw;
                            var gwp = response2[key].gwp;
                            var eros = response2[key].eros;
                            var ptsp = response2[key].ptsp;
                            var ptsm = response2[key].ptsm;
                            var ptspm = response2[key].ptspm;
                            var avp = response2[key].avp;
                            var avm = response2[key].avm;
                            var avpm = response2[key].avpm;
                            var avhcppm = response2[key].avhcppm;
                            var rpa = response2[key].rpa;
                            var erosm = response2[key].erosm;
                            var tenz = response2[key].tenz;
                            var pm = response2[key].pm;
                            var hcw = response2[key].hcw;
                            var ccw = response2[key].ccw;


                        var tableRef = document.getElementById('playerstable').getElementsByTagName('tbody')[0];

                        // Insert a row in the table at the last row
                        var newRow   = tableRef.insertRow();
                        // Insert a cell in the row at index 0
                        var newCell  = newRow.insertCell(0);
                        // Create anchor element. 
                        var a = document.createElement('a');  
                        // Create the text node for anchor element. 
                        var link = document.createTextNode(player); 
                        // Append the text node to anchor element. 
                        a.appendChild(link);  
                        // Set the title. 
                        a.title = response2[key].memid; //memid to link from here.
                        //Set the href property. 
                        a.href = "/playerdivscores?memid="+response2[key].memid+"&did="+did;  
                        // Append the anchor element to the body. 
                        newCell.appendChild(a); 
                        var newCell  = newRow.insertCell(1);
                        newCell.innerHTML=hcp;
                        var newCell  = newRow.insertCell(2);
                        newCell.innerHTML=ptsp;
                        var newCell  = newRow.insertCell(3);
                        newCell.innerHTML=ptsm;
                        var newCell  = newRow.insertCell(4);
                        newCell.innerHTML=ptspm;
                        var newCell  = newRow.insertCell(5);
                        newCell.innerHTML=avp;
                        var newCell  = newRow.insertCell(6);
                        newCell.innerHTML=avm;
                        var newCell  = newRow.insertCell(7);
                        newCell.innerHTML=avpm;
                        var newCell  = newRow.insertCell(8);
                        newCell.innerHTML=avhcppm; 
                        var newCell  = newRow.insertCell(9);
                        newCell.innerHTML=rpa; 
                        var newCell  = newRow.insertCell(10);
                        newCell.innerHTML=gp; 
                        var newCell  = newRow.insertCell(11);
                        newCell.innerHTML=gw; 
                        var newCell  = newRow.insertCell(12);
                        newCell.innerHTML=gwp; 
                        var newCell  = newRow.insertCell(13);
                        newCell.innerHTML=eros; 
                        var newCell  = newRow.insertCell(14);
                        newCell.innerHTML=erosm; 
                        var newCell  = newRow.insertCell(15);
                        newCell.innerHTML=tenz; 
                        var newCell  = newRow.insertCell(16);
                        newCell.innerHTML=pm; 
                        var newCell  = newRow.insertCell(17);
                        newCell.innerHTML=hcw; 
                        var newCell  = newRow.insertCell(18);
                        newCell.innerHTML=ccw; 

                        
                      }
                   
                 }
                 console.log("Players on this team: " +playercount);
                 //if there are more players than games per round, then we'll show only the number of cards for this division (4 player team will have 4 cards, eg.)
                 //if there are fewer players than games per round, then we'll only show the number of cards matching number of players.
                 
                 var cardcount ; //always render 6 to start.
                 var colstr;
                 if(gamesperround < playercount){
                    console.log("Show x cards:  " +gamesperround);
                    cardcount = gamesperround
                 }
                 else{
                    console.log("Show x cards:  " +playercount);
                    cardcount = playercount;
                 }
                 for (i = 6; i > cardcount; i--) {
                    console.log("Delete card:  " +i);
                    var colstr = "card"+i;
                    var element = document.getElementById(colstr);
                    element.parentNode.removeChild(element);
                 }
                
                 //now we'll put the info in the card
                 for (var key in response2) {
                    var cardnum = 1 +parseInt(key);
                    console.log("KEY: "+key);   
                     if (response2.hasOwnProperty(key)) {
                         if (key < cardcount){
                            console.log("populate card: " +cardnum);
                            var playerid = "player"+cardnum;
                            var seasonid = "plseason"+cardnum;
                            var lifetimeid = "pllifetime"+cardnum;

                            var a = document.getElementById(seasonid); 
                            a.href = "/playerdivscores?memid="+response2[key].memid+"&did="+did;
                            var a = document.getElementById(lifetimeid); 
                            a.href = "/playerlifetime?memid="+response2[key].memid+"&did="+did;;      
                            document.getElementById(playerid).innerHTML = response2[key].name; 
                            


                            //get the imageinfo...
                            //request to get the image...
                            fetchurl = serverurl+"fetchmemimage?did="+did+"&tid="+response2[key].tid+"&memid="+response2[key].memid;
                            console.log("Get image path info for : " + response2[key].name);
                            imgid = "plimg"+cardnum;  
                           
                             function myCallback(imgresp) { //Will called async'd so we can be sure to correlate card (num) to actual image being fetched.
                                // result = imgresp;
                                // filename = imgresp[0].imgfile.split('\\').pop().split('/').pop();
                                // if (filename == "noimage") {filename = "no_pic.jpg"}; //no image found in db ended up with default, so let's pick up the actual default image
                                // fullname = "assets/img/plimages/"+filename
                                // //console.log("Inside ajax file: "+fullname);    
                                // //console.log("Inside ajax key: "+key);  
                                // document.getElementById(imgid).src = fullname ;
                                if(imgresp.imagedata2[0]){
                                    filename = imgresp.imagedata2[0].FBid+".jpg";
                                    console.log("Response (Player image) received: "+ filename);
                                    fullname = "assets/img/fbimages/"+filename; //facebook image directory/file
                                }
                                else{
                                    filename = imgresp.imagedata1[0].imgfile.split('\\').pop().split('/').pop();
                                    console.log("Response (Player image) received: "+ filename);
                                    if (filename == "noimage") {filename = "no_pic.jpg"}; //no image found in db ended up with default, so let's pick up the actual default image
                                    fullname = "assets/img/plimages/"+filename
                                }
                                document.getElementById(imgid).src = fullname ;



                              }
                              
                              $.ajax({
                                url: fetchurl,
                                async: false,
                                datatype: "jsonp",
                                success: myCallback,
                              });



                         }
                     }
               }


               
             }
                      
        });//end ajax call.

  
    }



     
});
