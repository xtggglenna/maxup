// APIs that we are going to use
var googleAPIKey = "AIzaSyCSOvo1eMzpLnM77POPDkJiClqhgp4hV2A";
var url1 = "supermarketnearby/supermarket.php?action=getNearBySupermarkets&postCode=";

// Global variables
var changed = false;
var postCode = "";
var spList = {};
var postCodeElem = document.getElementById("postCode");
var contentElem = document.getElementById("content");
var orderedElem = document.getElementById("orderedList");
var title = document.getElementById("title")

function runFunction() {
    getNearBySupermarkets();
    getLoc();
}

function inputChange() {
    changed = true;
}

function getNearBySupermarkets() {
    if (changed) {
        changed = false;
        postCode = postCodeElem.value;
        if (postCode.replace(" ", "") == "" || isNaN(postCode)) {
            orderedElem.innerText = "";
            title.innerText = "Please type in a valid postcode!";
        } else {
            // encodeURIComponent is used for encoding each URI component such as query values
            // usually encoding is applied on the components that may contain special characters
            // and those values obtained from untrusted user inputs (security concern)
            var url = url1 + encodeURIComponent(postCode);
            var request = new XMLHttpRequest();
            request.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    //console.log(this.responseText);
                    spList = JSON.parse(this.responseText);
                    spList = spList;
                    showSupermarketList();

                }
            };
            request.open("GET", url, true);
            request.send();
        }

    } else {
        if (postCode.replace(" ", "") == "") {
            orderedElem.innerText = "";
            title.innerText = "Please type in a postcode!";

        }
    }
};


function showSupermarketList() {
    // spList = { supermarket ID : {name ,Supermarket Address }}
    orderedElem.innerText = "";
    if (spList.length < 1) {
        contentElem.style.display = "none";
        orderedElem.innerText = "";
        title.innerText = "No Supermarket Nearby! Try Other Postal Code";


    } else {
        title.innerText = "Supermarket Nearby";
        for (let spID in spList) {
            if (spID % 2 == 0) {
                var list = document.createElement("li");
                list.setAttribute("class", "font-weight-bold");
                var textNode = document.createTextNode(spList[spID]);
                list.appendChild(textNode);
                orderedElem.appendChild(list);
            } else {
                var list = document.createElement("li");
                var textNode = document.createTextNode(spList[spID]);
                list.appendChild(textNode);
                orderedElem.appendChild(list);
            }
            contentElem.style.display = "block";
        }
    }
}


/* this is the code for getting user's current location: lat, lng
 */
// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
var map, infoWindow;
var lat = 1.296568;
var lng = 103.852119;

function initMap() {
    var loc = {
        lat: lat,
        lng: lng
    };
    map = new google.maps.Map(document.getElementById('map'), {
        center: loc,
        zoom: 16
    });

    // info window is the one showing "Location found" message
    infoWindow = new google.maps.InfoWindow;

    // this attempts to get user permission to access location
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }; // -> this pos value is used to extract user's postal code 
            //console.log(pos);
            // get postal code (& address) given lat, lng
            getLocation(pos);

            // display Lat Lng info in the div
            // document.getElementById("locationInfo").innerHTML = "Lat: " + pos.lat + " Lng: " + pos.lng;
            // set user position to infoWindow
            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);

        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else { // error handling
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());

    }
}


// this is a default LocationErr handling method given by Google
/* function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}  */

// this is a custom LocationErr handling method
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    console.log("Error: Geolocation service failed!");
    document.getElementById("locationInfo").style.display = "block";
    document.getElementById("locationInfo").innerHTML = "Sorry, we couldn't get Postal Code. Please enter manually!";
    infoWindow.open(map);
}


/*
    Ajax call to get the geolocation information, including postal code given Lat & Lng
*/
function getLocation(pos) {
    var addr = pos.lat + ", " + pos.lng;
    //console.log(addr);
    var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + addr + "&key=" + googleAPIKey;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // following code may throw error if user input is invalid address
            // so we use try-catch block to handle errors
            try {
                // expected response is JSON data
                var data = JSON.parse(this.responseText);
                console.log(data);
                postCode = getPostCode(data);
                changed = true;
                //console.log("Postal Code: " + postCode);

                if (postCode == "") {
                    console.log("can't get location")
                    handleLocationError(false, infoWindow, map.getCenter());
                } else {
                    document.getElementById("locationInfo").style.display = "block";
                    document.getElementById("locationInfo").innerHTML = "Hello, we got your current location!";
                    document.getElementById("postCode").value = postCode;
                }

            } catch (err) { // show error message
                // not a good idea to directly show err.message 
                // as it may contain sensitive info
                // document.getElementById("display").innerHTML = err.message;
                console.log("can't get location")
                handleLocationError(false, infoWindow, map.getCenter());
                //handleLocationError();
            }
        }
    };

    xhttp.open("GET", url, true);
    xhttp.send();
}

function getPostCode(data) {
    var postCode = "";
    var arr = data.results[0].address_components; // -> array
    //console.log(arr);
    for (let item of arr) {
        //console.log(item);
        if ("types" in item) {
            var type = item.types;
            if (type == "postal_code") {
                postCode = item.long_name;
                break;
            }
        }
    }
    //console.log(postCode)
    return postCode;
}

function getLoc() {
    var addr = encodeURI(postCodeElem.value);
    //console.log(addr);
    var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + addr + "&key=" + googleAPIKey;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // following code may throw error if user input is invalid address
            // so we use try-catch block to handle errors
            try {
                // expected response is JSON data
                var data = JSON.parse(this.responseText);
                var coordinate = getLatLng(data);
                //console.log(coordinate);
                lat = coordinate["lat"];
                lng = coordinate["lng"];

                function initMap() {
                    var loc = {
                        lat: lat,
                        lng: lng
                    };
                    map = new google.maps.Map(document.getElementById('map'), {
                        center: loc,
                        zoom: 16
                    });
                    var marker = new google.maps.Marker({
                        position: loc,
                        map: map
                    });
                }
                initMap();
            } catch (err) {
                console.log("Sorry,no postal code. Please try again!")
            }
        }
    }
    xhttp.open("GET", url, true);
    xhttp.send();
}



function getLatLng(data) {
    var location = data["results"][0]["geometry"]["location"];
    return location;
}