// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=8ee92e0ac70d387736b978f9a98efb1a';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e){
    const zip =  document.getElementById('zip').value;
    const feelings =  document.getElementById('feelings').value;
    let d = new Date();
    let newDate = d.getMonth()+'/'+ d.getDate()+'/'+ d.getFullYear()+' ' +d.getHours() +':'+d.getMinutes() +':'+d.getMilliseconds();

    getWeather(baseURL,zip, apiKey) 
    .then(function(data){
        console.log(data)
        tempFahrenheit = (data.main.temp * 9/5) - 459.67
        postData('/add', {"temperature": tempFahrenheit.toFixed(1), "date" : newDate, "userResponse" :feelings})
        updateUI()
    })
}

/* Function to GET Web API Data*/
const getWeather = async (baseURL, zip, key)=>{
    
    const res = await fetch(baseURL+zip+key)
    try {
  
      const data = await res.json();
      console.log(data);
      return data;
    }  catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  }
/* Function to POST data */
const postData = async ( url = '', data = {})=>{
    console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });

      try {
        const newData = await response.json();
        //console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }



/* Function to update UI Data */

const updateUI = async () => {
    const request = await fetch('/all');
    try{
      const allData = await request.json();
      console.log("inside updateUI");
      console.log(allData);
      document.getElementById('date').innerHTML = allData[0].date;
      document.getElementById('temp').innerHTML = allData[0].temperature;
      document.getElementById('content').innerHTML = allData[0].userResponse;
  
    }catch(error){
      console.log("error", error);
    }
  }
