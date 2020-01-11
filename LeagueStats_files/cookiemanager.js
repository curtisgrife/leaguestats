     function listCookies() {
          var theCookies = document.cookie.split(';');
          var aString = '';
          for (var i = 1 ; i <= theCookies.length; i++) {
              aString += i + ' ' + theCookies[i-1] + "\n";
          }
          console.log("Cookies are: "+aString);
          return aString;
      }

      function setCookie(name, value, days) {
          var d = new Date;
          d.setTime(d.getTime() + 24*60*60*1000*days);
          document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
      }

      function getCookie(name) {
          var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
          return v ? v[2] : null;
      }

        function checkCookie(cname) {
          var ccheck=getCookie(cname);
          if (ccheck != "") {
               alert("Cookie is at hand!! Cookiename: "+cname +" value: "+ccheck);
          }
          else{
               alert("Cookie not found! Cookiename: "+cname );
          }
          
        }

        function deleteCookie(name) { setCookie(name, '', -1); }
         
