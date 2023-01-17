sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "../model/formatter",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, formatter, Fragment, MessageToast) {
        "use strict";

        return Controller.extend("assignment2.controller.View1", {
            onInit: function () {

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

            onPressEdit: function (oEvent) {

                var oView = this.getView();
                var clickedProductId = oEvent.getSource().getBindingContext().getPath();

                //create the dialog lazily

                if (!this.byId("editDialog1")) {
                    //load asynchronously  xml fragment
                    Fragment.load({
                        id: oView.getId(),
                        name: "assignment2.view.Edit",
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

            // onPressSave: function(){         

            // },

            onPressCancel: function (oEvent) {
                // MessageToast.show("cancel button is clicked");
                //console.log("check1: cancel button is clicked");

                this.byId("editDialog1").close();


            }

        });
    });
