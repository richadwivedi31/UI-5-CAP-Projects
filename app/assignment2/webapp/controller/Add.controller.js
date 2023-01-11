sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,MessageToast ) {
        "use strict";

        return Controller.extend("assignment2.controller.Add",{
            onInit: function () {
               // var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

              
            },

            onSave: function(){

            },

            onNavPress: function () {
                history.go(-1);
            }

        });
    });
