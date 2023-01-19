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
                    "Price_In_Euros": 100
                }
                
                this.getOwnerComponent().getModel().submitBatch("myAppUpdateGroup");
                var oListBinding=this.getOwnerComponent().getModel().bindList("/Products");
                oListBinding.create(data);

                this.byId("ManufacturerInput").setEditable(false);
                this.byId("Model_NameInput").setEditable(false);
                this.byId("CategoryInput").setEditable(false);
                this.byId("Screen_SizeInput").setEditable(false);
                this.byId("ScreenInput").setEditable(false);
                this.byId("CPUInput").setEditable(false);
                this.byId("RAMInput").setEditable(false);
                this.byId("StorageInput").setEditable(false);
                this.byId("GPUInput").setEditable(false);
                this.byId("Operating_SystemInput").setEditable(false);
                this.byId("Operating_System_VersionInput").setEditable(false);
                this.byId("WeightInput").setEditable(false);
                // this.byId("Price_In_EurosInput").setEditable(false);

                this.byId("saveButton").setVisible(false);
                
                
            },


            onNavPress: function () {
                history.go(-1);
            },

            onCancel: function () {
                // this.resetChanges();
                this.onNavPress();
            }

        });
    });
