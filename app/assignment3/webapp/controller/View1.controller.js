sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "../model/formatter",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
    'sap/ui/model/Sorter',
    'sap/m/Menu',
    'sap/m/MenuItem'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, formatter, Fragment, MessageToast, Sorter, Menu, MenuItem) {
        "use strict";

        return Controller.extend("assignment3.controller.View1", {
            onInit: function () {
                // this.getOwnerComponent().getModel().setUseBatch(false);
               // this.getOwnerComponent().getModel().setDefaultBindingMode("TwoWay")
            },
            formatter: formatter,
            onFilterProducts: function (oEvent) {

                //building filter array
                var aFilter = [];
                var sQuery = oEvent.getParameter("query");

                if (sQuery) {
                    aFilter.push(new Filter("Manufacturer", FilterOperator.Contains, sQuery));

                }

                //filter binding
                var oTable = this.byId("table1");
                var oBinding = oTable.getBinding("items");
                oBinding.filter(aFilter);
            },

            onAdd: function (oEvent) {

                //by default odata service follows one way binding, 
                //that's why two add a product changed the binding to TwoWay in manifest.json(under models section)

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("add");
            },


            onPressSave: function(oEvent){
                var id= this.byId("IdInput").getValue()
                var data={
                    "ProductID": this.byId("IdInput").getValue(),
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

                var oModel=this.getView().getModel();

                oModel.update("/Products("+id+")",data);
                
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

               this.byId("saveChangesButton").setVisible(false);

            },

            onPressEdit: function (oEvent) {

                var oView = this.getView();
                var clickedProductId = oEvent.getSource().getBindingContext().getPath();

                //create the dialog lazily

                if (!this.byId("editDialog1")) {
                    //load asynchronously  xml fragment
                    Fragment.load({
                        id: oView.getId(),
                        name: "assignment3.view.Edit",
                        controller: this
                    }).then(function (oDialog) {
                        this.oDialog = oDialog;
                        //connect dialog to the view of this component
                        oView.addDependent(oDialog);
                        this.oDialog.open();
                        this.oDialog.bindElement({
                            path: clickedProductId
                        });
                    }.bind(this));
                }
                else {
                    this.byId("editDialog1").open();
                }
            },

            onPressDelete: function(oEvent){
                // var id= this.byId("IdInput").getValue()
                // var oModel=this.getView().getModel();
                var clickedProductId = oEvent.getSource().getBindingContext().getPath();
                this.getView().getModel().remove(clickedProductId);
            },

            onPressCancel: function () {
                // MessageToast.show("cancel button is clicked");
                //console.log("check1: cancel button is clicked");

                this.byId("editDialog1").destroy();


            },

            onSort: function(oEvent){
                var oView=this.getView();
                if (!this.byId("viewSettingsDialog1")) {
                    Fragment.load({
                        id: oView.getId(),
                        name: "assignment3.view.sortDialog",
                        controller: this
                    }).then(function (oDialog) {
                        this.oDialog = oDialog;
                        oView.addDependent(oDialog);
                        this.oDialog.open();
                    }.bind(this));
                }
                else {
                    this.byId("viewSettingsDialog1").open();
                } 
            },

            onConfirm: function(oEvent){
                var oView=this.getView();
                var oTable = this.byId("table1");
                var mParams=oEvent.getParameters();
                var oBinding=oTable.getBinding("items");

                var aSorters=[];

                var sPath = mParams.sortItem.getKey();
                var bDescending = mParams.sortDescending;
                aSorters.push(new sap.ui.model.Sorter(sPath, bDescending));
                oBinding.sort(aSorters);

                // if (mParams.groupItem) {
                //     var sPath = mParams.groupItem.getKey();
                //     var bDescending = mParams.groupDescending;
                //     var vGroup = function(oContext) {
                //       var name = oContext.getProperty("Manufacturer");
                //       return {
                //         key: name,
                //         text: name
                //       };
                //     };
                //     aSorters.push(new sap.ui.model.Sorter(sPath, bDescending, vGroup));
                //   }
            }

        });
    });
