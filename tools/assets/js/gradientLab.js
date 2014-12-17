requirejs.config({
    baseUrl:'js/lib',
    paths: {
        app: '../gradientLab'   
    }
});

requirejs(['app/main'], function(main){
    
});