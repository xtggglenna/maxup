function usernameAvail() {
    var request = new XMLHttpRequest()

    var username = document.getElementById("Username").value
    var ret = document.getElementById("usernameAvail")
    var details = "username=" + username
    var url = "backendProcess/usernameAvailCheck.php?" + details

    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = this.responseText //string
            if (result == 'false') {
                ret.innerHTML = '*Username is taken!'
            } else(
                ret.innerHTML = ''
            )
        }
    }

    request.open("GET", url, true)
    request.send()

}

function pwdCheck() {
    var currentPwd = document.getElementById("Password1").value
    result = document.getElementById("pwdCheckResult")
    ret = ''
    numCheck = 1
    for (ch of currentPwd) {
        if (!isNaN(ch)) {
            numCheck *= 0
        }
    }
    if (currentPwd.length==0){
        ret = ''
    } else if (currentPwd.length <= 8 && numCheck != 0) {
        ret = ret + '<span style="color:red;">There must be more than 8 char & at least 1 number</span>'
    } else if (currentPwd.length <= 8) {
        ret = ret + '<span style="color:red;">There must be more than 8 characters</span>'
    } else if (numCheck != 0) {
        ret = ret + '<span style="color:red;">There must be at least 1 number</span>'
    }

    if (ret != '') {
        return result.innerHTML = ret
    } else if(ret == '' & currentPwd.length>0) {
        return result.innerHTML = '<span style="color:green;">Password is eligible</span>'
    } else{
        result.innerHTML = ''
    }
}

function pwdMatch(currentPwd, cfmPwd) {
    var currentPwd = document.getElementById("Password1").value
    var cfmPwd = document.getElementById("Password2").value
    var result = document.getElementById("pwdMatchResult")
    if (currentPwd !== cfmPwd && cfmPwd.length>0) {
        return result.innerHTML = "<span style='color:red;'>Passwords do not match</span>"
    } else if(currentPwd == cfmPwd && cfmPwd.length>0){
        return result.innerHTML = "<span style='color:green;'>Passwords matched</span>"
    } else{
        return result.innerHTML = ''
    }
}

function overallCheck() {
    var username = document.getElementById("Username").value
    var usernameRet = document.getElementById("usernameAvail")
    var pwd = document.getElementById("Password2").value
    var pwdCheckResult = document.getElementById("pwdCheckResult").innerText
    var pwdMatchResult = document.getElementById("pwdMatchResult").innerText
    var agreeToTerms = document.getElementById("agreeToTerms")
    var title = document.getElementById("title")

    if(agreeToTerms.checked == false){
        // alert('You have to agree with the Terms of Service to complete the sign up.');
        title.innerText = "You have to agree with the Terms of Service to complete the sign up.";
    }

    if (usernameRet.innerHTML == '' && username.length > 0 && pwdCheckResult == 'Password is eligible' &&
        pwdMatchResult == 'Passwords matched' && agreeToTerms.checked == true) {
        var request = new XMLHttpRequest()

      
        var details = "username=" + username + "&pwd=" + pwd
        var url = "backendProcess/addAcc.php?" + details

        request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var result = this.responseText //string
                if (result=='true') {
                    location.href = "profile.html" //tentative
                } else {
                    title.innerText = "Please try again later!";
                }
            }
        }

        request.open("GET", url, true)
        request.send()
    }
    else{
        title.innerText = "Please correct inputs and try again!";
    }
}