const request = require('request');
const forecast=(latitude, longitude, callback)=>{
    const url=`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&%20exclude={part}&appid=672a1acbfbd8f8852bd51abc05329ca8&units=metric`;

    request({url, json:true}, (error,{body})=>{
        if(error){
            callback('Unable to connect to forecast services.', undefined);
        }
        else if(body.cod){
            callback('Unable to find the coordinates.', undefined);

        }
        else {
            callback(undefined, {
                temp: body.current.temp,
                description: body.current.weather[0].description,
                icon: body.current.weather[0].icon

            });
        }
    })
};

module.exports=forecast;