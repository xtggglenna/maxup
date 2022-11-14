// document.querySelector() is used to select an element from the document using its ID
let captchaText = document.querySelector('#captcha');
var ctx = captchaText.getContext("2d");
ctx.font = "30px Roboto";
ctx.fillStyle = "#f03c02";


let userText = document.querySelector('#textBox');
let submitButton = document.querySelector('#submitButton');
let output = document.querySelector('#output');
let refreshButton = document.querySelector('#refreshButton');

// alphaNums contains the characters with which you want to create the CAPTCHA
let alphaNums = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
let emptyArr = [];
// This loop generates a random string of 7 characters using alphaNums
// Further this string is displayed as a CAPTCHA
for (let i = 1; i <= 7; i++) {
    emptyArr.push(alphaNums[Math.floor(Math.random() * alphaNums.length)]);
}
var c = emptyArr.join('');
ctx.fillText(emptyArr.join(''),captchaText.width/4, captchaText.height/2);

// This event listener is stimulated whenever the user press the "Enter" button
// "Correct!" or "Incorrect, please try again" message is
// displayed after validating the input text with CAPTCHA
userText.addEventListener('keyup', function(e) {
    // Key Code Value of "Enter" Button is 13
    if (e.keyCode === 13) {
        if (userText.value === c) {
            output.classList.add("correctCaptcha");
            output.innerHTML = "Correct!";
        } else {
            output.classList.add("incorrectCaptcha");
            output.innerHTML = "Incorrect, please try again";
        }
    }
});
// This event listener is stimulated whenever the user clicks the "Submit" button
// "Correct!" or "Incorrect, please try again" message is
// displayed after validating the input text with CAPTCHA
submitButton.addEventListener('click', function() {
    if (userText.value === c) {
        output.classList.add("correctCaptcha");
        addBeneficiary()
        creditTransfer()
        console.log("hi")
         output.innerHTML = "Correct!";
         if(confirm("Congratulations! Your Loan Application is Successful!")) document.location = 'myloandetails.html';
         
//
    } else {
        output.classList.add("incorrectCaptcha");
        output.innerHTML = "Incorrect, please try again";
        // alert("Your Loan Application has been rejected. Please try again.");
    }
});
// This event listener is stimulated whenever the user press the "Refresh" button
// A new random CAPTCHA is generated and displayed after the user clicks the "Refresh" button
refreshButton.addEventListener('click', function() {
    userText.value = "";
    let refreshArr = [];
    for (let j = 1; j <= 7; j++) {
        refreshArr.push(alphaNums[Math.floor(Math.random() * alphaNums.length)]);
    }
    ctx.clearRect(0, 0, captchaText.width, captchaText.height);
    c = refreshArr.join('');
    ctx.fillText(refreshArr.join(''),captchaText.width/4, captchaText.height/2);
    output.innerHTML = "";
});


function addBeneficiary(){

    function getApiURL(){
        var ApiURL  = "http://tbankonline.com/SMUtBank_API/Gateway";
        return ApiURL;
      }

    userID = "MAXUPACC" 
    PIN = "999999"
    OTP = "999999"

    var serviceName = "addBeneficiary";
   
    // get and validate form values

    var AccountID = sessionStorage.getItem("accountToXfer")
    var Description = sessionStorage.getItem("username")


    var headerObj = {
        Header: {
            serviceName: serviceName,
            userID: userID,
            PIN: PIN,
            OTP: OTP
        }

    };

    var contentObj = {

        Content: {
            AccountID: AccountID,
            Description: Description
        }

    };

    var header = JSON.stringify(headerObj);

    var content = JSON.stringify(contentObj);



    // setup http request

    var xmlHttp = new XMLHttpRequest();

    if (xmlHttp === null){

        alert("Browser does not support HTTP request.");

        return;

    }

    xmlHttp.open("POST", getApiURL()+"?Header="+header+"&Content="+content, true);

    xmlHttp.timeout = 5000;



    // setup http event handlers

    xmlHttp.onreadystatechange = function() {

        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {

            responseObj = JSON.parse(xmlHttp.responseText);

            serviceRespHeader = responseObj.Content.ServiceResponse.ServiceRespHeader;

            globalErrorID = serviceRespHeader.GlobalErrorID;

            if (globalErrorID === "010041"){
                return;

            }

            else if (globalErrorID !== "010000"){

                console.log(serviceRespHeader.ErrorDetails);
                
                return;

            }

            else{
                console.log("success add beneficiary")
            }
        }

    };

    xmlHttp.ontimeout = function (e) {

        showErrorModal("Timeout invoking API.");

        return;

    };                                        



    // send the http request

    xmlHttp.send();
}

function creditTransfer(){
    function getApiURL(){
        var ApiURL  = "http://tbankonline.com/SMUtBank_API/Gateway";
        return ApiURL;
      }

    userID = "MAXUPACC" 
    PIN = "999999"
    OTP = "999999"

    var accountTo = sessionStorage.getItem("accountToXfer")
    var transactionAmount = "0.0001"
    var transactionReferenceNumber = "0"
    var narrative = "Investment Loan from MAXUP" 

    console.log(accountTo , transactionAmount, transactionReferenceNumber,narrative)

               var headerObj = {

                   Header: {

                       serviceName: "creditTransfer",

                       userID: userID,

                       PIN: PIN,

                       OTP: OTP

                   }

               };

               var contentObj = {

                   Content: {

                       accountFrom: "9959",

                       accountTo: accountTo,

                       transactionAmount: transactionAmount,

                       transactionReferenceNumber: transactionReferenceNumber,

                       narrative: narrative

                   }

               };

               var header = JSON.stringify(headerObj);

               var content = JSON.stringify(contentObj);



               // setup http request

               var xmlHttp = new XMLHttpRequest();

               if (xmlHttp === null){

                   alert("Browser does not support HTTP request.");

                   return;

               }

               xmlHttp.open("POST", getApiURL()+"?Header="+header+"&Content="+content, true);

               xmlHttp.timeout = 5000;



               // setup http event handlers

               xmlHttp.onreadystatechange = function() {

                   if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {

                       responseObj = JSON.parse(xmlHttp.responseText);

                       globalErrorID = serviceRespHeader.GlobalErrorID;

                       if (globalErrorID === "010041"){
                        console.log("globalError")

                           return;

                       }

                       else if (globalErrorID !== "010000"){

                           console.log(serviceRespHeader.ErrorDetails);

                           return;

                       }

                       else{
                        console.log("success transfer")
                    }

                       transactionID = responseObj.Content.ServiceResponse.TransactionID._content_;

                       balanceBefore = responseObj.Content.ServiceResponse.BalanceBefore._content_;

                       balanceAfter = responseObj.Content.ServiceResponse.BalanceAfter._content_;

                       console.log("transactionID", "balanceBefore", "balanceAfter")

                   }

               };

               xmlHttp.ontimeout = function (e) {

                   showErrorModal("Timeout invoking API.");

                   return;

               };                                        



               // send the http request

               xmlHttp.send();
}