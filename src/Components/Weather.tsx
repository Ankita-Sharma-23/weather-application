import axios from "axios";
import React, { useState } from "react";

export const Weather = () => {
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [temp, setTemp] = useState<string | number | any>("");
  const [min, setMin] = useState<string|number|any>("");
  const [max, setMax] = useState<string|number|any>("");
  const [humidity, setHumidity] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [icon, setIcon] = useState<string>("");
  const [showMyComponent, setShowMyComponent] = useState<boolean>(false);
  

  const handleCity = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setCity(e.target.value);
  };
  const handleCountry = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setCountry(e.target.value);
  };
  const handleClick = () => {
    getWeatherData(city, country);
  };

  const getWeatherData = async (city: any, country: any) => {
    await axios({
      method: "GET",
      url: `http://api.openweathermap.org/data/2.5/weather?q=${city},${country},&appid=b3cd323b89ab55b940e9ec2862a1568b`,
    })
      .then((res: any) => {
        console.log(res.data);
        console.log(res.data.main.temp);
        setTemp(res.data.main.temp - 273.15);
        setIcon(res.data.weather[0].icon);
        setDescription(res.data.weather[0].description);
        setCountry(res.data.sys.country);
        setMax(res.data.main.temp_max- 273.15);
        setMin(res.data.main.temp_min- 273.15);
        setHumidity(res.data.main.humidity);
        setShowMyComponent(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="main">
     <div className="weatherSpaceBox">
     <h1>Weather Condition</h1>
     <div className="form">
      <input
        type="text"
        value={city}
        onChange={handleCity}
        placeholder="select city name"
      />
      <input
        type="text"
        value={country}
        onChange={handleCountry}
        placeholder="select country name"
      />
      <button onClick={handleClick} className="btn">click</button>
      </div>
      {showMyComponent ? (
        <div>
          <h1>
            {city},{country}
          </h1>
          <div>
            <img
              src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
              alt="weather-icon"
              style={{ width: 200, height: 200 }}
            />
          </div>
          <h1>{Math.floor(temp)}℃</h1>
          <h1>{description}</h1>
          <div className="table">
            <table>
              <tr>
                <th>Minimum Temperature</th>
                <th>Maximum Temperature</th>
                <th>Humidity</th>
              </tr>
              <tr>
                <td>{Math.floor(min)}℃</td>
                <td>{Math.floor(max)}℃</td>
                <td>{humidity}</td>
              </tr>
            </table>
          </div>
        </div>
      ) : null}
     </div>
    </div>
  );
};
