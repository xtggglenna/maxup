<%@include file="config.jsp"%>
<%@page import="java.util.*"%>
<%@page import="com.api_demo.model.*"%>
<%@page import="java.util.*"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>SMU tBank API Demo</title>
    <link rel="shortcut icon" href="assets/img/tBank.ico" type="image/x-icon">
    <link rel="icon" href="assets/img/tBank.ico" type="image/x-icon">

    <!-- Bootstrap core CSS -->
    <link href="assets/css/bootstrap.min.css" rel="stylesheet">
    <link href="assets/css/datepicker.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="assets/css/dashboard.css" rel="stylesheet">
    <link href="assets/css/style.css" rel="stylesheet">
    <script src="assets/js/jquery.js"></script>
    <script type="text/javascript" src="assets/js/script.js"></script>    
    <script>
        $(function() {
            $("#loadingGIF").show();
            loadReferenceData(function() {   // ensure reference data loaded before UI
                $("#loadingGIF").hide();
                $("#header").load("header.jsp");
                $("#sidebar").load("sidebar.jsp");
                $("#pageContent").load("welcome.html");
            });
        });
    </script>
</head>
  
<body>
    <div id="header"></div>
        <div class="container-fluid">
            <div class="row">
            <div class="col-sm-3 col-md-2 sidebar" id="sidebar">
                <!--Sidebar here-->
            </div>
            <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                <div id="pageContent">
                    <!-- this is where our AJAX-ed content goes -->
                </div>
            </div>
        </div>
    </div>
    <div class="row" id="loadingGIF">
        <div class="col">
            <img src="assets/img/loading.gif" alt="" class="img-responsive center-block"/>
        </div>
    </div>
	
    <!-- success modal ======================================== -->
    <div class="modal fade" id="successModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-success">
                    <h2>Success</h2> 
                </div>
                <div class="modal-body">
                    <p id = "successMsg">
                    </p>
                </div>
                <div class="modal-footer">
                    <button id = "CloseSuccess" type="button" class="btn btn-success" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <!-- error modal ======================================== -->
    <div class="modal fade" id="errorModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-danger">
                    <h2>Error</h2>
                </div>
                <div class="modal-body">
                    <p id = "errorMsg">
                    </p>
                </div>
                <div class="modal-footer">
                    <button id="CloseError" type="button" class="btn btn-danger"  data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
	
    <!-- OTP modal ======================================== -->
    <div class="modal fade" id="otpModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-danger">
                    <h2>OTP Expired</h2>
                </div>
                <div class="modal-body">
                    <div class="container">
                        <div class="col-md-6">
                            <form class="form-horizontal well" style="padding-bottom: 0px;">
                                <div class="form-group">
                                    <label for="OTP" class="col-sm-4 control-label">Enter OTP</label>
                                    <div class="col-sm-4">
                                        <input id="OTP" type="password" class="form-control" value =""/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="UpdateOTP" type="button" class="btn btn-danger"  data-dismiss="modal">Update</button>
                </div>
            </div>
        </div>
    </div>
	
    <!-- javascript libraries ======================================== -->
    <script src="assets/js/jquery.min.js"></script>
    <script src="assets/js/jquery.js"></script>
    <link rel="stylesheet" href="assets/css/jquery-ui.css">
    <script src="assets/js/jquery-ui.min.js"></script>
    <script src="assets/js/bootstrap.min.js"></script>
	
    <!-- javascript ======================================== -->
    <script type="text/javascript">

        /* ----------------------------------------
         * load reference data
         */
        function loadReferenceData(callback){	// ensure functions are executed sequentially
            loadProductTypes(function(){
            loadCustomerTypes(function(){
            loadBillingOrganizations(function(){
            loadTransactionTypes(function(){
            loadAffinityList(function(){
            loadAffinityList2(function(){
            loadCurrencyList(function(){
            loadStockSymbols(function(){
                callback();
            });});});});});});});});
        }

        /* ----------------------------------
         * shared variables
         */
        // userID
        var userID = "";
        function getUserID() {
            return userID;
        }
        function setUserID(x) {
            userID = x;
        }

        // PIN
        var PIN = "";
        function getPIN() {
            return PIN;
        }
        function setPIN(x) {
            PIN = x;
        }

        // OTP
        var OTP = "";
        function setOTP(x, callback) {
            OTP = x;
            setTimeout (callback(), 1000); // avoid race condition
        }

        /* ----------------------------------
         * show success modal
         */
        function showSuccessModal(successMessage) {
            document.getElementById("successMsg").innerHTML = successMessage;
            $('#successModal').modal('show');
        }

        /* ----------------------------------
         * show error modal
         */
        function showErrorModal(errorMessage) {
            document.getElementById("errorMsg").innerHTML = errorMessage;
            $('#errorModal').modal('show');
        }
	
        /* ----------------------------------
         * show otp modal
         */
        function showOTPModal(errorMessage) {
            $('#otpModal').modal('show');
        }

        /* ----------------------------------
         * add commas
         */
        function addCommas(nStr){
            nStr += '';
            var x = nStr.split('.');
            var x1 = x[0];
            var x2 = x.length > 1 ? '.' + x[1] : '';
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + ',' + '$2');
            }
            return x1 + x2;
        }		
        
        /* ----------------------------------------
         * get product name
         */
        function getProductName(productType) {
            for (var i=0; i < productTypes.length; i++){
                var product = productTypes[i];
                if (product.ProductID === productType)
                    return product.ProductName;
            }
            return "undefined";
        }

        /* ----------------------------------------
         * get customer type name
         */
        function getCustomerTypeName(customerType) {
            for (var i=0; i < customerTypes.length; i++){
                var custType = customerTypes[i];
                if (custType.CustomerTypeID === customerType)
                    return custType.CustomerTypeName;
            }
            return "undefined";
        }
	
        /* ----------------------------------------
         * get Transaction type name
         */
	
	function getTransactionTypeName(TransactionType) {
            for (var i=0; i < TransactionTypes.length; i++){
                var TransacType = TransactionTypes[i];
                if (TransacType.TransactionTypeID === TransactionType)
                    return TransacType.TransactionTypeName;
            }
            return "undefined";
        }
	
	/* ----------------------------------------
         * get BillingOrganizations type name
         */
	
	function getBillingOrgName(BillingOrgID) {
            for (var i=0; i < BillingOrgs.length; i++){
                var BillingOrg = BillingOrgs[i];
                if (BillingOrg.BeneficiaryID === BillingOrgID)
                    return BillingOrg.BillingOrgName;
            }
            return "undefined";
        }
	
        /* ----------------------------------------
         * retrieve BillingOrganizationName
         */
	function retrieveBillingOrgName(i) {
            return BillingOrgs[i].BillingOrgName;
        }
        
        /* ----------------------------------------
         * retrieve BillingOrganizationAccountID
         */
	function retrieveBillingOrgAccountID(i) {
            return BillingOrgs[i].AccountID;
        }
	/* ----------------------------------------
         * Count Billing Organization
         */
        function countBillingOrg(){
            return BillingOrgs.length;
        }
        /* ----------------------------------------
         * get Affinity List Level 1
         */
        
        function getAffinityListName(AffinityListID) {
            for (var i=0; i < AffinityLists1.length; i++){
                var AffinityList = AffinityLists1[i];
                if (AffinityList.AffinityID === AffinityListID)
                    return AffinityList.Level1;
            }
            return "undefined";
        }
        
        /* ----------------------------------------
         * get Affinity List Level 2
         */
        
        function getAffinityListName2 (AffinityListID2) {
            for (var i=0; i < AffinityLists2.length; i++){
                var AffinityList2 = AffinityLists2[i];
                if (AffinityList2.AffinityID === AffinityListID2)
                    return AffinityList2.Level2;
            }
            return "undefined";
        }
 
        
        /* ----------------------------------------
         * get Currency List Country Name
         */
        
        function getCurrencyListName(CurrencyListCode) {
            for (var i=0; i < CurrencyLists.length; i++){
                var CurrencyList = CurrencyLists[i];
                if (CurrencyList.CurrencyCode === CurrencyListCode)
                    return CurrencyList.CountryName;
            }
            return "undefined";
        }
        
        /* ----------------------------------------
         * get Stock Symbol Comapny Name
         */
        
        function getStockSymbolName(StockListSymbol) {
            for (var i=0; i < StockSymbols.length; i++){
                var StockSymbol = StockSymbols[i];
                if (StockSymbol.symbol === StockListSymbol)
                    return StockSymbol.company;
            }
            return "undefined";
        }
        
        /* ----------------------------------------
         * load product types
         */
        var productTypes = "";
        function loadProductTypes(callback) {
            // set request parameters
            var headerObj = {
                Header: {
                    serviceName: "getProductTypes",
                    userID: "",
                    PIN: "",
                    OTP: ""
                }
            };
            var header = JSON.stringify(headerObj);

            // setup http request
            var xmlHttp = new XMLHttpRequest();
            if (xmlHttp === null){
                alert("Browser does not support HTTP request.");
                return;
            }
            xmlHttp.open("POST", getApiURL()+"?Header="+header, true);
            xmlHttp.timeout = 5000;

            // setup http event handlers
            xmlHttp.onreadystatechange = function() {
                if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                    responseObj = JSON.parse(xmlHttp.responseText);
                    serviceRespHeader = responseObj.Content.ServiceResponse.ServiceRespHeader;
                    globalErrorID = serviceRespHeader.GlobalErrorID;
                    if (globalErrorID === "010000"){
                        productTypes = responseObj.Content.ServiceResponse.ProductList.Product;
                    }
                    else {
                        alert ("Error retrieving document type list.");
                    }
                    callback();
                }
            };
            xmlHttp.ontimeout = function (e) {
                alert ("Timeout retrieving document type list.");
                callback();
            };					

            // send the http request
            xmlHttp.send();
        }
		
        /* ----------------------------------------
         * load customer types
         */
        var customerTypes = "";
        function loadCustomerTypes(callback) {
            // set request parameters
            var headerObj = {
                Header: {
                    serviceName: "getCustomerTypes",
                    userID: "",
                    PIN: "",
                    OTP: ""
                }
            };
            var header = JSON.stringify(headerObj);

            // setup http request
            var xmlHttp = new XMLHttpRequest();
            if (xmlHttp === null){
                alert("Browser does not support HTTP request.");
                return;
            }
            xmlHttp.open("POST", getApiURL()+"?Header="+header, true);
            xmlHttp.timeout = 5000;

            // setup http event handlers
            xmlHttp.onreadystatechange = function() {
                if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                    responseObj = JSON.parse(xmlHttp.responseText);
                    serviceRespHeader = responseObj.Content.ServiceResponse.ServiceRespHeader;
                    globalErrorID = serviceRespHeader.GlobalErrorID;
                    if (globalErrorID === "010000"){
                        customerTypes = responseObj.Content.ServiceResponse.CustomerTypeList.CustomerType;
                    }
                    else {
                        alert ("Error retrieving document type list.");
                    }
                    callback();
                }
            };
            xmlHttp.ontimeout = function (e) {
                alert ("Timeout retrieving document type list.");
                callback();
            };					

            // send the http request
            xmlHttp.send();
        }
	
        /* ----------------------------------------
         * get Transaction Type 
         */
        var TransactionTypes = "";
        function loadTransactionTypes(callback) {
            // set request parameters
            var headerObj = {
                Header: {
                    serviceName: "getTransactionTypes",
                    userID: "",
                    PIN: "",
                    OTP: ""
                }
            };
            var header = JSON.stringify(headerObj);

            // setup http request
            var xmlHttp = new XMLHttpRequest();
            if (xmlHttp === null){
                alert("Browser does not support HTTP request.");
                return;
            }
            xmlHttp.open("POST", getApiURL()+"?Header="+header, true);
            xmlHttp.timeout = 5000;

            // setup http event handlers
            xmlHttp.onreadystatechange = function() {
                if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                    responseObj = JSON.parse(xmlHttp.responseText);
                    serviceRespHeader = responseObj.Content.ServiceResponse.ServiceRespHeader;
                    globalErrorID = serviceRespHeader.GlobalErrorID;
                    if (globalErrorID === "010000"){
                        TransactionTypes = responseObj.Content.ServiceResponse.TransactionTypeList.TransactionType;
                    }
                    else {
                        alert ("Error retrieving document type list.");
                    }
                    callback();
                }
            };
            xmlHttp.ontimeout = function (e) {
                alert ("Timeout retrieving document type list.");
                callback();
            };					

            // send the http request
            xmlHttp.send();
        }
        
	/* ----------------------------------------
         * get BillingOrganizations List
         */
        
        var BillingOrgs = "";
        function loadBillingOrganizations(callback) {
            // set request parameters
            var headerObj = {
                Header: {
                    serviceName: "getBillingOrganizations",
                    userID: "",
                    PIN: "",
                    OTP: ""
                }
            };
            var header = JSON.stringify(headerObj);

            // setup http request
            var xmlHttp = new XMLHttpRequest();
            if (xmlHttp === null){
                alert("Browser does not support HTTP request.");
                return;
            }
            xmlHttp.open("POST", getApiURL()+"?Header="+header, true);
            xmlHttp.timeout = 5000;

            // setup http event handlers
            xmlHttp.onreadystatechange = function() {
                if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                    responseObj = JSON.parse(xmlHttp.responseText);
                    serviceRespHeader = responseObj.Content.ServiceResponse.ServiceRespHeader;
                    globalErrorID = serviceRespHeader.GlobalErrorID;
                    if (globalErrorID === "010000"){
                        BillingOrgs = responseObj.Content.ServiceResponse.BillingOrgList.BillingOrg;
                    }
                    else {
                        alert ("Error retrieving document type list.");
                    }
                    callback();
                }
            };
            xmlHttp.ontimeout = function (e) {
                alert ("Timeout retrieving document type list.");
                callback();
            };					

            // send the http request
            xmlHttp.send();
        }
        
        /* ----------------------------------------
         * load affinity list
         */
        var AffinityLists1 = "";
        function loadAffinityList(callback) {
            // set request parameters
            var headerObj = {
                Header: {
                    serviceName: "getAffinityList",
                    userID: "",
                    PIN: "",
                    OTP: ""
                }
            };
            var header = JSON.stringify(headerObj);

            // setup http request
            var xmlHttp = new XMLHttpRequest();
            if (xmlHttp === null){
                alert("Browser does not support HTTP request.");
                return;
            }
            xmlHttp.open("POST", getApiURL()+"?Header="+header, true);
            xmlHttp.timeout = 5000;

            // setup http event handlers
            xmlHttp.onreadystatechange = function() {
                if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                    responseObj = JSON.parse(xmlHttp.responseText);
                    serviceRespHeader = responseObj.Content.ServiceResponse.ServiceRespHeader;
                    globalErrorID = serviceRespHeader.GlobalErrorID;
                    if (globalErrorID === "010000"){
                        AffinityLists1 = responseObj.Content.ServiceResponse.AffinityList.Affinity;
                    }
                    else {
                        alert ("Error retrieving document type list.");
                    }
                    callback();
                }
            };
            xmlHttp.ontimeout = function (e) {
                alert ("Timeout retrieving document type list.");
                callback();
            };					

            // send the http request
            xmlHttp.send();
        }
        
        /* ----------------------------------------
         * load affinity list2
         */
        var AffinityLists2 = "";
        function loadAffinityList2(callback) {
            // set request parameters
            var headerObj = {
                Header: {
                    serviceName: "getAffinityList",
                    userID: "",
                    PIN: "",
                    OTP: ""
                }
            };
            var header = JSON.stringify(headerObj);

            // setup http request
            var xmlHttp = new XMLHttpRequest();
            if (xmlHttp === null){
                alert("Browser does not support HTTP request.");
                return;
            }
            xmlHttp.open("POST", getApiURL()+"?Header="+header, true);
            xmlHttp.timeout = 5000;

            // setup http event handlers
            xmlHttp.onreadystatechange = function() {
                if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                    responseObj = JSON.parse(xmlHttp.responseText);
                    serviceRespHeader = responseObj.Content.ServiceResponse.ServiceRespHeader;
                    globalErrorID = serviceRespHeader.GlobalErrorID;
                    if (globalErrorID === "010000"){
                        AffinityLists2 = responseObj.Content.ServiceResponse.AffinityList.Affinity;
                    }
                    else {
                        alert ("Error retrieving document type list.");
                    }
                    callback();
                }
            };
            xmlHttp.ontimeout = function (e) {
                alert ("Timeout retrieving document type list.");
                callback();
            };					

            // send the http request
            xmlHttp.send();
        }
        
        /* ----------------------------------------
         * load currency list
         */
        var CurrencyLists = "";
        function loadCurrencyList(callback) {
            // set request parameters
            var headerObj = {
                Header: {
                    serviceName: "getCurrencyList",
                    userID: "",
                    PIN: "",
                    OTP: ""
                }
            };
            var header = JSON.stringify(headerObj);

            // setup http request
            var xmlHttp = new XMLHttpRequest();
            if (xmlHttp === null){
                alert("Browser does not support HTTP request.");
                return;
            }
            xmlHttp.open("POST", getApiURL()+"?Header="+header, true);
            xmlHttp.timeout = 5000;

            // setup http event handlers
            xmlHttp.onreadystatechange = function() {
                if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                    responseObj = JSON.parse(xmlHttp.responseText);
                    serviceRespHeader = responseObj.Content.ServiceResponse.ServiceRespHeader;
                    globalErrorID = serviceRespHeader.GlobalErrorID;
                    if (globalErrorID === "010000"){
                        CurrencyLists = responseObj.Content.ServiceResponse.CurrencyList.Currency;
                    }
                    else {
                        alert ("Error retrieving document type list.");
                    }
                    callback();
                }
            };
            xmlHttp.ontimeout = function (e) {
                alert ("Timeout retrieving document type list.");
                callback();
            };					

            // send the http request
            xmlHttp.send();
        }
        
        /* ----------------------------------------
         * load stock symbol
         */
        var StockSymbols = "";
        function loadStockSymbols(callback) {
            // set request parameters
            var headerObj = {
                Header: {
                    serviceName: "getStockSymbols",
                    userID: "",
                    PIN: "",
                    OTP: ""
                }
            };
            var header = JSON.stringify(headerObj);

            // setup http request
            var xmlHttp = new XMLHttpRequest();
            if (xmlHttp === null){
                alert("Browser does not support HTTP request.");
                return;
            }
            xmlHttp.open("POST", getApiURL()+"?Header="+header, true);
            xmlHttp.timeout = 5000;

            // setup http event handlers
            xmlHttp.onreadystatechange = function() {
                if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                    responseObj = JSON.parse(xmlHttp.responseText);
                    serviceRespHeader = responseObj.Content.ServiceResponse.ServiceRespHeader;
                    globalErrorID = serviceRespHeader.GlobalErrorID;
                    if (globalErrorID === "010000"){
                        StockSymbols = responseObj.Content.ServiceResponse.StockSymbolList.StockSymbol;
                    }
                    else {
                        alert ("Error retrieving document type list.");
                    }
                    callback();
                }
            };
            xmlHttp.ontimeout = function (e) {
                alert ("Timeout retrieving document type list.");
                callback();
            };					

            // send the http request
            xmlHttp.send();
        }
		
    </script>
	
  </body>
</html>