requirejs.config({
    baseUrl:'js/lib',
    paths: {
        idx: '../imageAging'   
    }
});

requirejs(['idx/main'], function(main){
    
});