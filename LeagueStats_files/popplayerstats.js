$(function() {
  var path = window.location.pathname;
  //      $(document).ready(function () {
  //             $('#playerstable').DataTable();
  //             $('.dataTables_length').addClass('bs-select');
  //         });  


  if (window.location.pathname.endsWith('/playerstats')) {
      console.log("popplayerstats, path: " + path);

      console.log("Fetch player stats...");

      console.log("URL hostname: " + window.location.hostname);
      var serverurl = ""
      if (window.location.hostname.includes("192.168.99")) {
          console.log("Running locally...devmode...");
          serverurl = "http://192.168.99.126:3000/";
      } else {
          console.log("Running remote server (presumaly production mode)...");

          serverurl = "https://billiardleaguestats.com/";
      }


      var urlParams = new URLSearchParams(window.location.search);
      //figure out if they have cookies set, in case they arrived to this page without going through the dvisions selction flow. 
      console.log("URLparams: " + urlParams);

      let did = urlParams.get('did');

      listCookies();

      if (did == "" || did == null) {
          console.log("no DID found...need to try cookie");
          did = getCookie("mydid");
      } else {
          setCookie("mydid", did, 1000);

      }
      console.log("Here's the did: " + did);

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

      

      
      tableSort(); //tableManager function
    
     
      fetchurl = serverurl + "fetchallplayerstats?did=" + did;
      console.log("URL to send: " + fetchurl);

      $.ajax({
          url: fetchurl,
          dataType: "jsonp",
          success: function(response2) {

              //var respArr = JSON.parse(response);
              console.log("Response received");
              //console.log("Now to parse the response" +  JSON.stringify(response2)); // server response

              poscount = 1;
              //let's add some data rows to the table...
              for (var key in response2) {
                  //console.log("KEY: "+key);   
                  if (response2.hasOwnProperty(key)) {
                      var player = response2[key].name;
                      var hcp = response2[key].hcp;
                      var gp = response2[key].gp;
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
                      var newRow = tableRef.insertRow();
                      // Insert a cell in the row at index 0
                      //Position
                      var newCell = newRow.insertCell(0);
                      newCell.innerHTML = poscount;
                      //player name as link
                      var newCell = newRow.insertCell(1);
                      // Create anchor element. 
                      var a = document.createElement('a');
                      // Create the text node for anchor element. 
                      var link = document.createTextNode(player);
                      // Append the text node to anchor element. 
                      a.appendChild(link);
                      // Set the title. 
                      a.title = response2[key].memid; //memid to link from here.
                      //Set the href property. 
                      a.href = "/playerdivscores?memid=" + response2[key].memid + "&did=" + did;
                      // Append the anchor element to the body. 
                      newCell.appendChild(a);
                      var newCell = newRow.insertCell(2);
                      newCell.innerHTML = hcp;
                      var newCell = newRow.insertCell(3);
                      newCell.innerHTML = ptsp;
                      var newCell = newRow.insertCell(4);
                      newCell.innerHTML = ptsm;
                      var newCell = newRow.insertCell(5);
                      newCell.innerHTML = ptspm;
                      var newCell = newRow.insertCell(6);
                      newCell.innerHTML = avp;
                      var newCell = newRow.insertCell(7);
                      newCell.innerHTML = avm;
                      var newCell = newRow.insertCell(8);
                      newCell.innerHTML = avpm;
                      var newCell = newRow.insertCell(9);
                      newCell.innerHTML = avhcppm;
                      var newCell = newRow.insertCell(10);
                      newCell.innerHTML = rpa;
                      var newCell = newRow.insertCell(11);
                      newCell.innerHTML = gp;
                      var newCell = newRow.insertCell(12);
                      newCell.innerHTML = gw;
                      var newCell = newRow.insertCell(13);
                      newCell.innerHTML = gwp;
                      var newCell = newRow.insertCell(14);
                      newCell.innerHTML = eros;
                      var newCell = newRow.insertCell(15);
                      newCell.innerHTML = erosm;
                      var newCell = newRow.insertCell(16);
                      newCell.innerHTML = tenz;
                      var newCell = newRow.insertCell(17);
                      newCell.innerHTML = pm;
                      var newCell = newRow.insertCell(18);
                      newCell.innerHTML = hcw;
                      var newCell = newRow.insertCell(19);
                      newCell.innerHTML = ccw;


                  }
                  poscount++;
              }

          }

      }); //end ajax call.


  }


});