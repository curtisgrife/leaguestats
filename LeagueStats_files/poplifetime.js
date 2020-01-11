
$(function(){
     var path = window.location.pathname;
   
     if (window.location.pathname.endsWith ('/playerlifetime') || window.location.pathname.endsWith ('/playerlifetime.html')) {
         //for development, we'll detect pathname as local or remote
         console.log("Fetch Lifetime player stats ...");
         
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
        
    
    fetchurl = serverurl+"fetchsingleplayerstats?memid="+memid+"&lifetime=true";
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
    
                        
                        var newCell  = newRow.insertCell(0);
                        newCell.innerHTML=hcp;
                        var newCell  = newRow.insertCell(1);
                        newCell.innerHTML=ptsp;
                        var newCell  = newRow.insertCell(2);
                        newCell.innerHTML=ptsm;
                        var newCell  = newRow.insertCell(3);
                        newCell.innerHTML=ptspm;
                        var newCell  = newRow.insertCell(4);
                        newCell.innerHTML=avp;
                        var newCell  = newRow.insertCell(5);
                        newCell.innerHTML=avm;
                        var newCell  = newRow.insertCell(6);
                        newCell.innerHTML=avpm;
                        var newCell  = newRow.insertCell(7);
                        newCell.innerHTML=avhcppm; 
                        var newCell  = newRow.insertCell(8);
                        newCell.innerHTML=rpa; 
                        var newCell  = newRow.insertCell(9);
                        newCell.innerHTML=gp; 
                        var newCell  = newRow.insertCell(10);
                        newCell.innerHTML=gw; 
                        var newCell  = newRow.insertCell(11);
                        newCell.innerHTML=gwp; 
                        var newCell  = newRow.insertCell(12);
                        newCell.innerHTML=eros; 
                        var newCell  = newRow.insertCell(13);
                        newCell.innerHTML=erosm; 
                        var newCell  = newRow.insertCell(14);
                        newCell.innerHTML=tenz; 
                        var newCell  = newRow.insertCell(15);
                        newCell.innerHTML=pm; 
                        var newCell  = newRow.insertCell(16);
                        newCell.innerHTML=hcw; 
                        var newCell  = newRow.insertCell(17);
                        newCell.innerHTML=ccw; 

               
             }
                      
        });//end ajax call.


    fetchurl = serverurl+"fetchsingleplayerstats?memid="+memid+"&lifetime=true&bydiv=true"; //get all stats, break down by division
    console.log("URL to send: " +fetchurl);
    //we'll use this to populate the player stats    
      $.ajax({
           url: fetchurl, 
           dataType: "jsonp",
            success: function( response3 ) {
               
                 //var respArr = JSON.parse(response);
                 console.log("Second Response received");
                 console.log("RESPONSE: "+ response3);
                     //let's add some data rows to the table...
                      for (var key in response3) {
                       console.log("KEY: "+key);   
                        if (response3.hasOwnProperty(key)) {
                            var thisdid = key;
                            var divname = response3[key].divname;
                            var hcp = response3[key].hcp;
                            var gp = response3[key].gp;
                            var gw = response3[key].gw;
                            var gwp = response3[key].gwp;
                            var eros = response3[key].eros;
                            var ptsp = response3[key].ptsp;
                            var ptsm = response3[key].ptsm;
                            var ptspm = response3[key].ptspm;
                            var avp = response3[key].avp;
                            var avm = response3[key].avm;
                            var avpm = response3[key].avpm;
                            var avhcppm = response3[key].avhcppm;
                            var rpa = response3[key].rpa;
                            var erosm = response3[key].erosm;
                            var tenz = response3[key].tenz;
                            var pm = response3[key].pm;
                            var hcw = response3[key].hcw;
                            var ccw = response3[key].ccw;
                        
                      

                  
                        var tableRef = document.getElementById('playerstablebydiv').getElementsByTagName('tbody')[0];
                        // Insert a row in the table at the last row
                        var newRow   = tableRef.insertRow();
                        //player name as link
                        var newCell  = newRow.insertCell(0);
                        // Create anchor element. 
                        var a = document.createElement('a');  
                        // Create the text node for anchor element. 
                        var link = document.createTextNode(divname); 
                        // Append the text node to anchor element. 
                        a.appendChild(link);  
                        // Set the title. 
                        // a.title = response2[key].memid; //memid to link from here.
                        a.title = "Go to division stats";
                        // //Set the href property. 
                        // a.href = "/playerstats?memid="+response2[key].memid+"&did="+did;  
                        a.href = "/teams?did="+thisdid+"&name="+divname;
                        //eg:http://192.168.99.126:3000/teams?did=220&name=2019-20%20WINTER%20THURSDAY%20SILVER
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
