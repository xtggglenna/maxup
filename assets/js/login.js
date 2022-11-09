function login(){
    var title = document.getElementById("title")
    var request = new XMLHttpRequest()

    var username = document.getElementById("Username").value
    var pwd = document.getElementById("pwd").value
    var loginDetails = "username="+username+"&pwd="+pwd
    var url = "backendProcess/loginCheck.php?" + loginDetails

    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var result = this.responseText //string
           
            if(result=='true'){
                location.href = "index.html"//tentative
            } else{
                title.innerText = "Username/Password is incorrect.";
            }
        }
    }
    
    request.open("GET", url, true)
    request.send()
    
}