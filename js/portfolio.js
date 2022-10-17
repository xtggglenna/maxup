// const encodedParams = new URLSearchParams();
// encodedParams.append("symbol", "AAPL");

// const options = {
// 	method: 'POST',
// 	headers: {
// 		'content-type': 'application/x-www-form-urlencoded',
// 		'X-RapidAPI-Key': '871e10bea8mshbb3b23b0b48461cp13e8b0jsn9cd4937829ba',
// 		'X-RapidAPI-Host': 'yahoo-finance97.p.rapidapi.com'
// 	},
// 	body: encodedParams
// };

// fetch('https://yahoo-finance97.p.rapidapi.com/stock-info', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));
  sectorbasedstocks = {
    "Health Care": ['a','b'],
    "Utilities": ['c','d'],
    "Financials": ['e','f'], 
    "Consumer Staples": ['g','h'], 
    "Communication Services": ['i','j'], 
    "Industrials": ['k', 'l'], 
    "Real Estate": ['m','n'], 
    "Information Technology": ['o','p'], 
    "Materials": ['q','r'], 
    "Energy": ['s','t'], 
    "Consumer Discretionary":['v','w'] 
  }

  sectors = ['Health Care', 'Utilities', 'Financials', 'Consumer Staples', 'Communication Services', 'Industrials', 'Real Estate', 'Information Technology', 'Materials', 'Energy', 'Consumer Discretionary']
  industrydropdown = ''
  for (sector of sectors){
    console.log(sector)
    industrydropdown += `<option value ="${sector}">${sector}</option>`
  }

  document.getElementById('stocksectors').innerHTML += industrydropdown


  function filterbyindustry(i){
    stocksdropdown = document.getElementById('stocksbyindustry')
    stocksdropdown.innerHTML = `<option selected value="">Choose 5 Stocks</option>`
    console.log(i)
    if (i != ''){
      stocksdropdown.disabled = false
      // stocksdropdown.innerHTML = `<option selected value="">Choose 5 Stocks</option>`
      for (stocks of sectorbasedstocks[i]){
        stocksdropdown.innerHTML += `<option value ="${stocks}">${stocks}</option>`
      }
    }
    else{
      stocksdropdown.disabled = true
    }
  }
  // var e = document.getElementById("stocksectors");
  // var value = e.value;
  // $('#stocksectors').val(); // en

  // console.log(value)
  // var text = e.options[e.selectedIndex].text;