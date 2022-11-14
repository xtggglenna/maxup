
var ApiURL = "http://tbankonline.com/SMUtBank_API/Gateway";
function getApiURL() {
    return ApiURL;
}

//UserID
var userID = "";
function getUserID() {
    return userID;
}
function setUserID(x) {
    userID = x;
}

//PIN
var PIN = "";
function getPIN() {
    return PIN;
}
function setPIN(x) {
    PIN = x;
}
document
// stockslist = ['5PC.SI', 'ABC', 'AMZN']
stockslist =  ['594.SI', '5PC.SI', '5TR.SI', 'A', 'AA', 'AAP', 'AAPL', 'ABC', 'AMC', 'AMN', 'AMZN', 'AZN', 'BABA', 'BS6.SI', 'BTC-USD', 'C07.SI', 'C52.SI', 'CAD', 'CC3.SI', 'D05.SI', 'DIS', 'DWAC', 'FDM', 'GOOG', 'HLAL', 'HRB', 'IBM', 'LOPX', 'META', 'MSBHY', 'MSFT', 'NFLX', 'NIO', 'PANA.SI', 'PSEI.PS', 'S68.SI', 'STI', 'T', 'TIGR', 'TSLA', 'UBER', 'VC2.SI', 'VOD', 'YAHOY', 'Z74.SI', '^DJI', '^FTSE', '^GSPC', '^HSI', '^N225', '^STI'] //get from api

for(stockname of stockslist){
    callstockprice(stockname)
function callstockprice(stockname){

                var userID = "";
                setUserID(userID);
                var PIN = "";
                setPIN(PIN);
                var serviceName = "getStockPrice";
                

                symbol = stockname /////////////

                var headerObj = {
                    Header: {
                        serviceName: serviceName,
                        userID: userID,
                        PIN: PIN,
                        OTP: ""
                    }
                };
                
                var contentObj = {
                    Content: {
                        symbol: symbol,
                    }
                };
                    
                var header = JSON.stringify(headerObj);
                var content = JSON.stringify(contentObj);

                // setup http request
                var xmlHttp = new XMLHttpRequest();
                // if (xmlHttp === null){
                //     alert("Browser does not support HTTP request.");
                //     return;
                // }
                xmlHttp.open("POST", getApiURL()+"?Header="+header+"&Content="+content, true);
                xmlHttp.timeout = 5000;

                // setup http event handlers
                xmlHttp.onreadystatechange = function() {
                    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                        responseObj = JSON.parse(xmlHttp.responseText);
                        serviceRespHeader = responseObj.Content.ServiceResponse.ServiceRespHeader;
                        globalErrorID = serviceRespHeader.GlobalErrorID;

                        stockDetails = responseObj.Content.ServiceResponse.Stock_Details;
                        volume = stockDetails.volume;
                        symbol2 = stockDetails.symbol;
                        price = stockDetails.price;
                        percentageChange = stockDetails.percentageChange;
                        tradingDate = stockDetails.tradingDate;
                        change = stockDetails.change;
                        company = stockDetails.company;
                        prevClose = stockDetails.prevClose;


                        document.getElementById('stocksectors').innerHTML += `<option value="${stockname}, ${price}">${stockname}, $${price}</option>`

                    }
                };

                xmlHttp.send();
            }
        }
function valueCallBack(value){
    console.log(value)
}


$("form").on("submit", function (e) {
    var dataString = $(this).serialize();
    console.log('hi')
});

