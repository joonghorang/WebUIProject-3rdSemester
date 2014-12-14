requirejs.config({
    baseUrl:'js/lib',
    paths: {
        app: '../colorLab'   
    }
});

requirejs(['app/main'], function(main){
    
});