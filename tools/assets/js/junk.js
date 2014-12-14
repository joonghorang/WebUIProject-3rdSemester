requirejs.config({
    baseUrl:'js/lib',
    paths: {
        app: '../junk'   
    }
});

requirejs(['app/main'], function(main){
    
});