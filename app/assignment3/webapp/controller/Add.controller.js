sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,MessageToast ) {
        "use strict";

        return Controller.extend("assignment3.controller.Add",{
            onInit: function () {
                
            },

            onSave: function(){

                var requiredInputs= ['ManufacturerInput','Model_NameInput','CategoryInput','Screen_SizeInput',
                                      'ScreenInput','CPUInput','RAMInput','StorageInput',
                                      'GPUInput','Operating_SystemInput','Operating_System_VersionInput','WeightInput'];

                var passedValidation = this.validateEventFeedbackForm(requiredInputs);

                if(passedValidation === false)
                {
                    MessageToast.show("Enter all fields");
                    return false;
                }

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
                    "Price_In_Euros": this.byId("Price_In_EurosInput").getValue()
                    
                }

                var oModel=this.getOwnerComponent().getModel();
                // oModel.create("/Products", data);
                // oModel.submitChanges();

                this._oContext=oModel.createEntry("/Products", {
                    properties: data,
                    success: this._onCreateSuccess.bind(this)
                });


                // var oListBinding=this.getOwnerComponent().getModel().bindList("/Products");
                // oListBinding.create(data);
                this.getView().setBindingContext(this._oContext);
                this.getOwnerComponent().getModel().submitChanges();

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
                this.byId("Price_In_EurosInput").setEditable(false);

                this.byId("saveButton").setVisible(false);
               
                
            },

            validateEventFeedbackForm: function(requiredInputs) {
                    var _self = this;
                    var valid = true;
                    requiredInputs.forEach(function (input) {
                        var sInput = _self.getView().byId(input);
                        if (sInput.getValue() == "" || sInput.getValue() == undefined) {
                            valid = false;
                            sInput.setValueState("Error");
                        }
                        else {
                            sInput.setValueState("None");
                        }
                    });
                    return valid;
            },

            _onCreateSuccess: function (oProduct) {
 
                this.getView().unbindObject();
                // show success messge
                MessageToast.show("product added successfully", {
                closeOnBrowserNavigation : false
                });
            },


            onNavPress: function () {

                // this.resetChanges();
                history.go(-1);
            },

            onCancel: function () {
                this.onNavPress();

            }

        });
    });
