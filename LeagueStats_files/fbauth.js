
//Want serverurl to always be known...
var serverurl  = ""
  if(window.location.hostname.includes("192.168.99")){
    console.log("Running locally...devmode...");
    serverurl = "http://192.168.99.126:3000/";
  }
  else{
    console.log("Running remote server (presumaly production mode)...");
    serverurl = "https://billiardleaguestats.com/";
  }

  //globals
   var name ="";
   var id ="";
   var picurl ="";


// function fbauth(){
 
//     window.fbAsyncInit = function() {
//               FB.init({
//                 appId      : '504131113787857',
//                 cookie     : true,
//                 xfbml      : true,
//                 version    : 'v5.0',
//                 oauth    : true
//               });
                
//               FB.AppEvents.logPageView(); 
              
//         };

          
//         (function(d, s, id){
//           var js, fjs = d.getElementsByTagName(s)[0];
//           if (d.getElementById(id)) {return;}
//           js = d.createElement(s); js.id = id;
//           js.src = "https://connect.facebook.net/en_US/sdk.js";
//           fjs.parentNode.insertBefore(js, fjs);
//         }(document, 'script', 'facebook-jssdk'));


//         FB.Event.subscribe('auth.authResponseChange', auth_response_change_callback);
      
//         // FB.Event.subscribe('auth.statusChange', auth_status_change_callback);
//         // FB.Event.subscribe('auth.login', login_event);
//         // FB.Event.subscribe('auth.logout', logout_event);
    
  
// } //end main fbauth() function

  function debugResponseIterator(response){
    console.log('Full response (for debug):');
    for (var key in response) {
        // check if the property/key is defined in the object itself, not in parent
        if (response.hasOwnProperty(key)) {           
            console.log(key, response[key]); 
            console.log("for debug...KEY: "+key, " VALUE: "+response[key]); 
        }
    }
  }

  function checkLoginState() { 
    console.log('CHECK LOGIN STATE');
    //auth_response_change_callback();
  } 


 
  function facebookAPI() {                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
    console.log('Welcome!  Fetching your information.... ');
    
    // var name ="";
    // var id ="";
    // var picurl ="";
    
    //FB.api('/me', function(response) {
    FB.api('/me?fields=id,name,email', function(response) {
      console.log('Successful login for: ' + response.name +" ID: "+ response.id);
      console.log('Email addy: ' + response.email);
      name = response.name;
      id = response.id;
      email = response.email;
      //document.getElementById("fbname").innerHTML = "Welcome, "+name;
      //debugResponseIterator(response);
            FB.api('/me/picture', 'GET',{"redirect":"false","type":"normal"},function(response) {
            console.log('Picture URL in here: ' + response);
            console.log('Actual picture URL: ' + response.data.url);
            picurl = response.data.url;
            //debugResponseIterator(response);
            fetchurl = serverurl+'fbauthrequest?name='+name+'&id='+id+'&email='+email+'&picurl="'+picurl+'"';
            $.ajax({
              url: fetchurl,
              dataType: "jsonp",
              success: function(response) {
                  console.log("Got reponse for fbauthrequest" );
              }

           }); //end ajax call.
         });
    });

  }



var auth_response_change_callback = function(response) {
  console.log("Fired Event - auth_response_change_callback");
  if (response.status === 'connected') {   // Logged into  webpage and Facebook.
    console.log("Logged in!!! Calling the fbAPI function...");
   
    facebookAPI();  
  } else {                                 // Not logged in or we are unable to tell.
    console.log("Please log into this webpage.");
    document.getElementById("#bname").innerHTML = " ";
  }
}


var auth_status_change_callback = function(response) {
  console.log("Fired Event - auth_status_change_callback: " + response.status);
  if (response.status === 'connected') {   // Logged into  webpage and Facebook.
    facebookAPI();  
  } else {                                 // Not logged in or we are unable to tell.
    console.log("Please log into this webpage.");
  }
}

// var login_event = function(response) {
//   console.log("login_event");
//   console.log(response.status);
//   console.log(response);
// }

// var logout_event = function(response) {
//   console.log("logout_event");
//   console.log(response.status);
//   console.log(response);
// }

  