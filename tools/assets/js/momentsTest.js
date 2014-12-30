requirejs.config({
    baseUrl:'/js/lib',
    paths: {
        app: '../momentsTest'   
    }
});

requirejs(['app/main'], function(main){
    
});