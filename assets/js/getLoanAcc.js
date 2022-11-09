function retrieve() {
  changeNavBar();
  retrieveTbankid();
  retrieveTbankpin();
}

function retrieveTbankid() {
  var request = new XMLHttpRequest();

  var username = document.getElementById("Username");
  var tBankID = document.getElementById("tBankID");
  var details = "username=" + username;
  var url =
    "backendProcess/retrieveProfileInfo.php?retrieve=tBankID&" + details;

  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var result = this.responseText; //string
      tBankID.value = result;
    }
  };

  request.open("GET", url, true);
  request.send();
}

function retrieveTbankpin() {
  var request = new XMLHttpRequest();

  var username = document.getElementById("Username");
  var tBankPIN = document.getElementById("tBankPIN");
  var details = "username=" + username;
  var url =
    "backendProcess/retrieveProfileInfo.php?retrieve=tBankPIN&" + details;

  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var result = this.responseText; //string
      tBankPIN.value = result;
    }
  };

  request.open("GET", url, true);
  request.send();
}
