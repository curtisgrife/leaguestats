
$(function(){
    
    var path = window.location.pathname;
   
    if (window.location.pathname.endsWith ('/') || window.location.pathname.endsWith ('/index.html')) {
        // $(function(){
        //     $('.topBar').fadeIn(); 
        // });

        $(document).ready(function(){
          $(this).scrollTop(0);
        });
        console.log("mainpage.js, path: "+path);
        console.log("Main page loaded...");

      }
     
});
