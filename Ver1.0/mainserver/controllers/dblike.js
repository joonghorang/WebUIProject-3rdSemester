(function() {
    var dblike = {
        addMoment : function(){
            fs.readFile("./db.json", function(err, data){
                fs.writeFile("./db.json", function(err){
                                    
                });
            });   
        }
    }
    if (typeof module !== "undefined" && module.exports) {
        module.exports = dblike;
    }
})();