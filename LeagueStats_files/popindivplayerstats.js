
$(function(){
     var path = window.location.pathname;
   
     if (window.location.pathname.endsWith ('/playerdivscores') || window.location.pathname.endsWith ('/playerdivscores.html')) {
         //for development, we'll detect pathname as local or remote
         console.log("Fetch Individual player stats for divison...");
         
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
        let memid = urlParams.get('memid');
        
        listCookies();
        if(did =="" || did == null){
            console.log("no DID found...need to try cookie");
            did = getCookie("mydid");
        }
        else{
            setCookie("mydid",did,1000);

        }       
        console.log("Here's the did: "+did);
        if(memid =="" || memid == null){
            console.log("no memID found...need to try cookie");
            memid = getCookie("mymemid");
        }
        else{
            setCookie("mymemid",memid,1000);

        }       
        console.log("Here's the memid: "+memid);
        
        //need to get the div name - dip to db...
        //fetchurl = "http://192.168.99.126:3000/fetchdivname?did="+did;
        fetchurl = serverurl+"fetchdivname?did="+did;
        $.ajax({
            url: fetchurl, 
            dataType: "jsonp",
             success: function( response ) {
                //console.log("Got reponse for fetchdivname" );
                var divname = response[0].name;
                console.log("divname: " + divname);
                document.getElementById("divname").innerHTML = divname;
            }
        });//end ajax call.
        

        //get game scores
        lastmatchdate="";
        gamecount =1;
        matchcount =0;
        //fetchurl = "http://192.168.99.126:3000/fetchindplayerdivscores?did="+did+"&memid="+memid;
        fetchurl = serverurl+"fetchindplayerdivscores?did="+did+"&memid="+memid;
        console.log("URL to send: " +fetchurl);
        $.ajax({
            url: fetchurl, 
            dataType: "jsonp",
            success: function( response ) {
                //populate the all the game scores.
                //set the paragraph header
                lastmatchdate=response[0].matchdate.split("T")[0]; //only date plz
                hometeam = response[0].hmteam;
                awayteam = response[0].awteam;
                document.getElementById("matchpara").innerHTML = hometeam +" vs. "+awayteam +" --" +lastmatchdate;

                //for (var key in response) {
                    for(i = 0; i < response.length;i++){
                    key = i;
                    //console.log("GAMECOUNT + MATCHCOUNT: "+gamecount+" + "+matchcount);   
                     if (response.hasOwnProperty(key)) {
                        //set the title paragraph
                        
                        if(lastmatchdate != response[key].matchdate.split("T")[0]){
                            //console.log("CREATE NEW ROW...");
                            matchcount++;
                            gamecount =1;
                            lastmatchdate=response[key].matchdate.split("T")[0]; 
                            hometeam = response[key].hmteam;
                            awayteam = response[key].awteam;
                            
                            newparaid = "matchpara"+matchcount;
                            //THIS doesnt work.
                            //possible soluition at https://bytes.com/topic/javascript/answers/546447-copy-nodes-increment-ids
                            var thisrow = document.getElementById('matchrow');
                            var newrow = thisrow.cloneNode(true);
                            thisrow.getElementsByTagName('table')[0].id = 'OLDgamescoretable';
                            thisrow.id = 'OLDmatchrow';
                            thisrow.parentNode.appendChild(newrow);
                            newrow.getElementsByTagName('p')[0].id = newparaid;
                            document.getElementById(newparaid).innerHTML = hometeam +" vs. "+awayteam +" --" +lastmatchdate;
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
                        var tablerow = document.getElementById('matchrow');
                        tableRef = tablerow.getElementsByTagName('table')[0].getElementsByTagName('tbody')[0];

                        //var tableRef = document.getElementById('gamescorestable').getElementsByTagName('tbody')[0];
                        
                        // // Insert a row in the table at the last row
                        var newRow   = tableRef.insertRow();
                        var newCell  = newRow.insertCell(0);
                        newCell.innerHTML=gamecount;
                        var newCell  = newRow.insertCell(1);
                        newCell.innerHTML=response[key].hmname;
                        var newCell  = newRow.insertCell(2);
                        //newCell.innerHTML=response[key].hmero;
                        if(response[key].hmero == 1){
                            newCell.innerHTML = "<i class=\"icon ion-checkmark-round\"></i>";
                        }
                        var newCell  = newRow.insertCell(3);
                        newCell.innerHTML=response[key].hmhcp;
                        var newCell  = newRow.insertCell(4);
                        newCell.innerHTML=response[key].hmscore;
                        var newCell  = newRow.insertCell(5);//blank -- vs column
                        var newCell  = newRow.insertCell(6);
                        newCell.innerHTML=response[key].awname;
                        var newCell  = newRow.insertCell(7);
                        //newCell.innerHTML=response[key].awero;
                        if(response[key].awero == 1){
                            newCell.innerHTML = "<i class=\"icon ion-checkmark-round\"></i>";
                        }
                        var newCell  = newRow.insertCell(8);
                        newCell.innerHTML=response[key].awhcp;
                        var newCell  = newRow.insertCell(9);
                        newCell.innerHTML=response[key].awscore;

                        gamecount++;
                        }
                    }

                }
        });//end ajax call.


    //get Season stats
    fetchurl = serverurl+"fetchsingleplayerstats?did="+did+"&memid="+memid;
    console.log("URL to send: " +fetchurl);
    //we'll use this to populate the player stats    
      $.ajax({
           url: fetchurl, 
           dataType: "jsonp",
            success: function( response2 ) {
               
                 //var respArr = JSON.parse(response);
                 console.log("Response received");
 
                     //let's add some data rows to the table...
                      for (var key in response2) {
                       //console.log("KEY: "+key);   
                        if (response2.hasOwnProperty(key)) {
                            var player = response2.name;
                            var hcp = response2.hcp;
                            var gp = response2.gp;
                            var gw = response2.gw;
                            var gwp = response2.gwp;
                            var eros = response2.eros;
                            var ptsp = response2.ptsp;
                            var ptsm = response2.ptsm;
                            var ptspm = response2.ptspm;
                            var avp = response2.avp;
                            var avm = response2.avm;
                            var avpm = response2.avpm;
                            var avhcppm = response2.avhcppm;
                            var rpa = response2.rpa;
                            var erosm = response2.erosm;
                            var tenz = response2.tenz;
                            var pm = response2.pm;
                            var hcw = response2.hcw;
                            var ccw = response2.ccw;
                        }
                      }

                        //let's get the olkayer name pop'd
                        document.getElementById("playername").innerHTML = player;

                        var tableRef = document.getElementById('playerstable').getElementsByTagName('tbody')[0];

                        // Insert a row in the table at the last row
                        var newRow   = tableRef.insertRow();
                        // Insert a cell in the row at index 0
    
                        //player name as link
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
                        a.href = "/playerstats?memid="+response2[key].memid+"&did="+did;  
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
                      
        });//end ajax call.

        //let's get the player image now.
        fetchurl = serverurl+"fetchmemimage?did="+did+"&memid="+memid;
        $.ajax({
            url: fetchurl, 
            dataType: "jsonp",
             success: function( response ) {
                console.log("DEBUG...iterate over results");
                // for (var key in response) {
                //     if (response.hasOwnProperty(key)) { 
                //         console.log("DEBUG: KEY: "+key);
                      
                //     }
                // }                  
                // console.log("imagedata1: "+response.imagedata1[0].imgfile);
                // console.log("imagedata2: "+response.imagedata2[0].FBid);
                if(response.imagedata2[0]){ //if there's anyting in this repsonse data then it means we have valid FB data.
                    console.log("VALID FB ID RXD...we'll use that image instead")
                }  
                else {
                    console.log(" NO VALID FB ID RXD...we'll use legacy image");
                }
                
                if(response.imagedata2[0]){
                    filename = response.imagedata2[0].FBid+".jpg";
                    console.log("Response (Player image) received: "+ filename);
                    fullname = "assets/img/fbimages/"+filename; //facebook image directory/file
                }
                else{
                    filename = response.imagedata1[0].imgfile.split('\\').pop().split('/').pop();
                    console.log("Response (Player image) received: "+ filename);
                    if (filename == "noimage") {filename = "no_pic.jpg"}; //no image found in db ended up with default, so let's pick up the actual default image
                    fullname = "assets/img/plimages/"+filename
                }
                document.getElementById('plimg').src = fullname ;

                  
             }
        }); //end ajax call


  
    }

    
        
});
