sap.ui.define([], function() {
    'use strict';
    return {
        priceState: function(price){

            if(price>100){
                return "Error";
            }
        
            return "Warning";
           
        }
    }    
});