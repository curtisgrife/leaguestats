
$(function(){
     var path = window.location.pathname;
//      $(document).ready(function () {
//             $('#playerstable').DataTable();
//             $('.dataTables_length').addClass('bs-select');
//         });  
  
   
     if (window.location.pathname.endsWith ('/scoresheet')) {
         console.log("popscoresheet, path: "+path); 
         console.log("Fetch scores...");
         
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
        
        let mid = urlParams.get('mid');
        let did = urlParams.get('did');
      
        console.log("Here's the mid: "+mid);
        console.log("Here's the did: "+did);
         
        listCookies(); 
         
        matchscores=null;
        gamescores=null;
        divinfo=null;
        rounds=null;
        games=null;
        
        fetchurl = serverurl+"fetchmatchscores?mid="+mid;
        $.ajax({
            url: fetchurl, 
            async: false,
            dataType: "jsonp",
             success: function( response ) {
                //console.log("Got reponse for fetchmatchscores" );
                matchscores = response;
            }
                      
        });//end ajax call.
        console.log("matchscore data: "+matchscores);
        //Need to get divinfo for this division, to know number of rounds and games
        console.log("DIV is: " + matchscores[0].did);

        fetchurl = serverurl+"fetchdivinfo?did="+matchscores[0].did;
        $.ajax({
            url: fetchurl, 
            async: false,
            dataType: "jsonp",
             success: function( response ) {
                //console.log("Got reponse for fetchmatchscores" );
                divinfo = response;
            }
                      
        });//end ajax call.
        
        rounds = parseInt(divinfo[0].numrounds);
        games =  parseInt(divinfo[0].gamesperround);
        console.log("ROUND COUNT: " + rounds);
        console.log("GAME COUNT: " + games);

        fetchurl = serverurl+"fetchgamescores?mid="+mid;
        $.ajax({
            url: fetchurl, 
            async: false,
            dataType: "jsonp",
             success: function( response ) {
                //console.log("Got reponse for fetchmatchscores" );
                gamescores = response;
            }
                      
        });//end ajax call.
        console.log("gamescore data: "+gamescores);
        var gamekey =0;
        hmrndscores = matchscores[0].hmrndscores.split("~|~");
        awrndscores = matchscores[0].awrndscores.split("~|~");
        hmrndhcps = matchscores[0].hmrndhcps.split("~|~");
        awrndhcps = matchscores[0].awrndhcps.split("~|~");

        //Let's set the sheet Title 
        document.getElementById("sheetheading").innerHTML = 
            matchscores[0].hmteam +" vs. "+ matchscores[0].awteam +"<br>Match Date: "+matchscores[0].matchdate.split("T")[0]; // (drop time part) : 2019-12-05T05:00:00.000Z 


        //before doing scores, let's get rid of the unneeded rounds. (default page is ready for up to 10 rounds)
        for(round=rounds+1 ;round <= 10; round++){
            console.log("Delete round table:  " +round);
            var rndstr = "scorerow"+round;
            var element = document.getElementById(rndstr);
            element.parentNode.removeChild(element);
        }

        for(round=1 ;round <= rounds; round++){
            console.log("Tabulating scores for Round "+round+"...");
            var tableid = "scoretable"+round;
            var tableRef = document.getElementById(tableid).getElementsByTagName('tbody')[0];
            for(game=1 ;game <= games; game++){
                console.log("Game "+game+"...");
                var newRow   = tableRef.insertRow();
                //home game#
                var newCell  = newRow.insertCell(0);
                newCell.innerHTML=gamescores[gamekey].hmgmnum;
                //hm player
                var newCell  = newRow.insertCell(1);
                newCell.innerHTML=gamescores[gamekey].hmname;
                //hm avg
                var newCell  = newRow.insertCell(2);
                newCell.innerHTML=gamescores[gamekey].hmhcp;
                //hm ero
                var newCell  = newRow.insertCell(3);
                //newCell.innerHTML=gamescores[gamekey].hmero;
                if(gamescores[gamekey].hmero == 1){
                    newCell.innerHTML = "<i class=\"icon ion-checkmark-round\"></i>";
                }
                //hm points
                var newCell  = newRow.insertCell(4);
                newCell.innerHTML=gamescores[gamekey].hmscore;
                //blank cell
                var newCell  = newRow.insertCell(5);
                //away game #
                var newCell  = newRow.insertCell(6);
                newCell.innerHTML=gamescores[gamekey].awgmnum;
                //aw player
                var newCell  = newRow.insertCell(7);
                newCell.innerHTML=gamescores[gamekey].awname;
                //aw avg
                var newCell  = newRow.insertCell(8);
                newCell.innerHTML=gamescores[gamekey].awhcp;
                //aw ero
                var newCell  = newRow.insertCell(9);
                //newCell.innerHTML=gamescores[gamekey].awero;
                if(gamescores[gamekey].awero == 1){
                    newCell.innerHTML = "<i class=\"icon ion-checkmark-round\"></i>";
                }
                //aw points
                var newCell  = newRow.insertCell(10);
                newCell.innerHTML=gamescores[gamekey].awscore;
                gamekey ++;
            }
            //Round totals
            //text avg
            var newRow   = tableRef.insertRow();
            var newCell  = newRow.insertCell(0);
            newCell.innerHTML="Avg Total";
            newCell.setAttribute("colspan",2);
            //team handicap/average
            var newCell  = newRow.insertCell(1);
            newCell.innerHTML=hmrndhcps[round -1];
            //blabk col (it was ereos)
            var newCell  = newRow.insertCell(2);
            var newCell  = newRow.insertCell(3);
            //only put handicap in if calc > 0 (positive)..otherwise lave blank
            var teamdiff = awrndhcps[round -1] - hmrndhcps[round -1];
            if (teamdiff >0){
                newCell.innerHTML=teamdiff;
            }
            else {
                newCell.innerHTML="0";
            }
            //away team
            var newCell  = newRow.insertCell(4);
            //blank (between home and away)
            var newCell  = newRow.insertCell(5);
            newCell.innerHTML="Avg Total";
            newCell.setAttribute("colspan",2);
            var newCell  = newRow.insertCell(6);
            newCell.innerHTML=awrndhcps[round -1];
            //leave it blank
            var newCell  = newRow.insertCell(7);
            var newCell  = newRow.insertCell(8);
            var teamdiff = hmrndhcps[round -1] - awrndhcps[round -1];
            if (teamdiff >0){
                newCell.innerHTML=teamdiff;
            }
            else {
                newCell.innerHTML="0";
            }
            var newRow   = tableRef.insertRow();
            var newCell  = newRow.insertCell(0);
            newCell.innerHTML="Round Total";
            newCell.setAttribute("colspan",4);
            var newCell  = newRow.insertCell(1);
            newCell.innerHTML=hmrndscores[round-1];
            var newCell  = newRow.insertCell(2);//blank
            var newCell  = newRow.insertCell(3);
            newCell.innerHTML="Round Total";
            newCell.setAttribute("colspan",4);
            var newCell  = newRow.insertCell(4);
            newCell.innerHTML=awrndscores[round-1];

            //If this is the last round, show Overall totals
            if(round == rounds){
                //Scores
                var newRow   = tableRef.insertRow();
                var newCell  = newRow.insertCell(0);
                newCell.innerHTML="<h6>Grand Total</h6>";
                newCell.setAttribute("colspan",4);
                var newCell  = newRow.insertCell(1);
                newCell.innerHTML="<h6>"+matchscores[0].hmttlscore+"</h6>";
                var newCell  = newRow.insertCell(2);//blank
                var newCell  = newRow.insertCell(3);
                newCell.innerHTML="<h6>Grand Total</h6>";
                newCell.setAttribute("colspan",4);
                var newCell  = newRow.insertCell(4);
                newCell.innerHTML="<h6>"+matchscores[0].awttlscore+"</h6>";
                //Round points
                var newRow   = tableRef.insertRow();
                var newCell  = newRow.insertCell(0);
                newCell.innerHTML="<h5>Round points</h5>";
                newCell.setAttribute("colspan",4);
                var newCell  = newRow.insertCell(1);
                newCell.innerHTML="<h5>"+matchscores[0].hmrndpoints+"</h5>";
                var newCell  = newRow.insertCell(2);//blank
                var newCell  = newRow.insertCell(3);
                newCell.innerHTML="<h5>Round points<h5>";
                newCell.setAttribute("colspan",4);
                var newCell  = newRow.insertCell(4);
                newCell.innerHTML="<h5>"+matchscores[0].awrndpoints+"</h5>";
                
            }
        }

     }        
        
   
     
});
