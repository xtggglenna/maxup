function retrieve() {
  changeNavBar();
  retrieveTbankacc();
  retrieveTbankid();
  retrieveTbankpin();
  retrieveLoanamount();
  retrieveNumberofmonths();
}

function retrieveUsername() {
  var request = new XMLHttpRequest();

  var username = document.getElementById("Username");
  var url = "backendProcess/retrieveUsername.php";

  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var result = this.responseText; //string
      username.value = result;
    }
  };

  request.open("GET", url, true);
  request.send();
}

function retrieveEmail() {
  var request = new XMLHttpRequest();

  var username = document.getElementById("Username");
  var email = document.getElementById("email");
  var details = "username=" + username;
  var url = "backendProcess/retrieveProfileInfo.php?retrieve=email&" + details;

  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var result = this.responseText; //string
      email.value = result;
    }
  };

  request.open("GET", url, true);
  request.send();
}

function retrieveCreditscore() {
  var request = new XMLHttpRequest();

  var username = document.getElementById("Username");
  var creditScore = document.getElementById("creditScore");
  var details = "username=" + username;
  var url =
    "backendProcess/retrieveProfileInfo.php?retrieve=creditScore&" + details;

  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var result = this.responseText; //string
      creditScore.value = result;
    }
  };

  request.open("GET", url, true);
  request.send();
}

function retrieveInterestrate() {
  var request = new XMLHttpRequest();

  var username = document.getElementById("Username");
  var interestRate = document.getElementById("interestRate");
  var details = "username=" + username;
  var url =
    "backendProcess/retrieveProfileInfo.php?retrieve=interestRate&" + details;

  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var result = this.responseText; //string
      interestRate.value = result;
    }
  };

  request.open("GET", url, true);
  request.send();
}

function retrieveTbankacc() {
  var request = new XMLHttpRequest();

  var username = document.getElementById("Username");
  var tBankAcc = document.getElementById("tBankAcc");
  var details = "username=" + username;
  var url =
    "backendProcess/retrieveProfileInfo.php?retrieve=tBankAcc&" + details;

  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var result = this.responseText; //string
      tBankAcc.value = result;
    }
  };

  request.open("GET", url, true);
  request.send();
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

function retrieveAnnualincome() {
  var request = new XMLHttpRequest();

  var username = document.getElementById("Username");
  var annualIncome = document.getElementById("annualIncome");
  var details = "username=" + username;
  var url =
    "backendProcess/retrieveProfileInfo.php?retrieve=annualIncome&" + details;

  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var result = this.responseText; //string
      annualIncome.value = result;
    }
  };

  request.open("GET", url, true);
  request.send();
}

function retrieveHomeownership() {
  var request = new XMLHttpRequest();

  var username = document.getElementById("Username");
  var homeOwnership = document.getElementById("homeOwnership");
  var details = "username=" + username;
  var url =
    "backendProcess/retrieveProfileInfo.php?retrieve=homeOwnership&" + details;

  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var result = this.responseText; //string
      homeOwnership.value = result;
    }
  };

  request.open("GET", url, true);
  request.send();
}

function retrieveMonthlydebt() {
  var request = new XMLHttpRequest();

  var username = document.getElementById("Username");
  var monthlyDebt = document.getElementById("monthlyDebt");
  var details = "username=" + username;
  var url =
    "backendProcess/retrieveProfileInfo.php?retrieve=monthlyDebt&" + details;

  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var result = this.responseText; //string
      monthlyDebt.value = result;
    }
  };

  request.open("GET", url, true);
  request.send();
}

function retrieveMonthlycreditlimit() {
  var request = new XMLHttpRequest();

  var username = document.getElementById("Username");
  var monthlyCreditLimit = document.getElementById("monthlyCreditLimit");
  var details = "username=" + username;
  var url =
    "backendProcess/retrieveProfileInfo.php?retrieve=monthlyCreditLimit&" +
    details;

  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var result = this.responseText; //string
      monthlyCreditLimit.value = result;
    }
  };

  request.open("GET", url, true);
  request.send();
}

function retrieveMortacc() {
  var request = new XMLHttpRequest();

  var username = document.getElementById("Username");
  var mortAcc = document.getElementById("mortAcc");
  var details = "username=" + username;
  var url =
    "backendProcess/retrieveProfileInfo.php?retrieve=mortAcc&" + details;

  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var result = this.responseText; //string
      mortAcc.value = result;
    }
  };

  request.open("GET", url, true);
  request.send();
}

function retrieveLoanamount() {
  var request = new XMLHttpRequest();

  var username = document.getElementById("Username");
  var loanAmount = document.getElementById("loanAmount");
  var details = "username=" + username;
  var url =
    "backendProcess/retrieveProfileInfo.php?retrieve=loanAmount&" + details;

  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var result = this.responseText; //string
      loanAmount.value = result;
    }
  };

  request.open("GET", url, true);
  request.send();
}

function retrieveNumberofmonths() {
  var request = new XMLHttpRequest();

  var username = document.getElementById("Username");
  var numberOfMonths = document.getElementById("numberOfMonths");
  var details = "username=" + username;
  var url =
    "backendProcess/retrieveProfileInfo.php?retrieve=numberOfMonths&" + details;

  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var result = this.responseText; //string
      numberOfMonths.value = result;
    }
  };

  request.open("GET", url, true);
  request.send();
}

function setUpProfile() {
  var request = new XMLHttpRequest();

  var username = document.getElementById("Username").value;
  var email = document.getElementById("email").value;
  var tBankAcc = document.getElementById("tBankAcc").value;
  var tBankID = document.getElementById("tBankID").value;
  var tBankPIN = document.getElementById("tBankPIN").value;
  var creditScore = document.getElementById("creditScore").value;
  var interestRate = document.getElementById("interestRate").value;
  var annualIncome = document.getElementById("annualIncome").value;
  var homeOwnership = document.getElementById("homeOwnership").value;
  var monthlyDebt = document.getElementById("monthlyDebt").value;
  var monthlyCreditLimit = document.getElementById("monthlyCreditLimit").value;
  var mortAcc = document.getElementById("mortAcc").value;
  var loanAmount = document.getElementById("loanAmount").value;
  var numberOfMonths = document.getElementById("numberOfMonths").value;

  var details =
    "username=" +
    username +
    "&email=" +
    email +
    "&tBankAcc=" +
    tBankAcc +
    "&tBankID=" +
    tBankID +
    "&tBankPIN=" +
    tBankPIN +
    "&creditScore=" +
    creditScore +
    "&interestRate=" +
    interestRate +
    "&annualIncome=" +
    annualIncome +
    "&homeOwnership=" +
    homeOwnership +
    "&monthlyDebt=" +
    monthlyDebt +
    "&monthlyCreditLimit=" +
    monthlyCreditLimit +
    "&mortAcc=" +
    mortAcc +
    "&loanAmount=" +
    loanAmount +
    "&numberOfMonths=" +
    numberOfMonths;
  var url = "backendProcess/setUpProfile.php?" + details;

  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var result = this.responseText; //string

      if (result == "true") {
        document.getElementById("profileMsg").innerHTML = "Profile Saved!";
        $("#profileModal").modal("show");
        //location.href = "profile.html"; //tentative
      } else {
        document.getElementById("profileMsg").innerHTML =
          "Profile failed to save. Please try again later.";
        $("#profileModal").modal("show");
      }
    }
  };

  request.open("GET", url, true);
  request.send();
}
