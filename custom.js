window.addEventListener("load",() =>{

    let long;
    let lat;
    let tempDescription = document.querySelector('.temperature-description');
    let tempDegree = document.querySelector('.degree');
    let locationTimeZone = document.querySelector('.location-timezone');
    let tempSection = document.querySelector('.temperature');
    let tempSpanContent = document.querySelector('.temperature span');



    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/d476d0d778daa359dafe09465bac99eb/${lat},${long}`;

            fetch(api)
                .then(response =>{
                    return response.json();
                })
                .then(data =>{
                    console.log(data);
                    const {temperature,summary,icon} = data.currently;

                    tempDegree.textContent = temperature;
                    tempDescription.textContent = summary;
                    locationTimeZone.textContent = data.timezone;

                    let celsius = (temperature - 32) * (5/9);


                    setIcons(icon,document.querySelector('.icon'))

                    tempSection.addEventListener('click',() =>{
                        if (tempSpanContent.textContent === 'F'){
                            tempSpanContent.textContent = 'C';
                            tempDegree.textContent = Math.floor(celsius);
                        }else{
                            tempSpanContent.textContent = 'F';
                            tempDegree.textContent = temperature;
                        }
                    })

                })
        });

    }
    function setIcons(icon,iconID) {
        const skycons = new Skycons({color:"white"});
        const currentIcon = icon.replace(/-/g,'_').toUpperCase();
        skycons.play();
        return skycons.set(iconID,Skycons[currentIcon]);
    }

});