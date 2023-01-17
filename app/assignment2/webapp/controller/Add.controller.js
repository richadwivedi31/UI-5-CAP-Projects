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
  
            },

            onSave: function(){

                var data = {
                    "Manufacturer": this.byId("ManufacturerInput").getValue(),
                    "Model_Name": this.byId("Model_NameInput").getValue(),
                    "Category": this.byId("CategoryInput").getValue(),
                    "Screen_Size": this.byId("Screen_SizeInput").getValue(),
                    "Screen": this.byId("ScreenInput").getValue(),
                    "CPU": this.byId("CPUInput").getValue(),
                    "RAM": this.byId("RAMInput").getValue(),
                    "Storage": this.byId("StorageInput").getValue(),
                    "GPU": this.byId("GPUInput").getValue(),
                    "Operating_System": this.byId("Operating_SystemInput").getValue(),
                    "Operating_System_Version": this.byId("Operating_System_VersionInput").getValue(),
                    "Weight": this.byId("WeightInput").getValue(),
                    "Price_In_Euros": 1
                    // "Price_In_Euros": this.byId("Price_In_EurosInput").getValue()
                }

                var oListBinding=this.getOwnerComponent().getModel().bindList("/Products");
                oListBinding.create(data);
                
            },


            onNavPress: function () {
                history.go(-1);
            },

            onCancel: function () {
                this.resetChanges();
            }

        });
    });
