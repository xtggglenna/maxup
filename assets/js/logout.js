function logout(){
    var request = new XMLHttpRequest()

    var url = "backendProcess/logout.php"

    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var result = this.responseText //string
            
            if(result=='true'){
                location.href = "index.html" //tentative
            } else{
                alert("Please try logging out again later")
            }
        }
    }
    
    request.open("GET", url, true)
    request.send()
}