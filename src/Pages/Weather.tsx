import axios from "axios";
import React, { useEffect, useState } from "react";
import { Header, Heading } from "../Constants/heading";
import { Headings } from "../Types/type";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export const Weather = () => {
  const [city, setCity] = useState<string>("");
  const [temp, setTemp] = useState<number>(0);
  const [minTemperature, setMinTemperature] = useState<number>(0);
  const [maxTemperature, setMaxTemperature] = useState<number>(0);
  const [humidity, setHumidity] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [icon, setIcon] = useState<string>("");
  const [display, setDisplay] = useState<boolean>(false);
  const [pressure, setPressure] = useState<string>("");
  const [option, setOption] = useState<Headings[]>([]);

  const handleClick = () => {
    getWeatherData(city);
  };
 
  const getWeatherData = async (city: string) => {
    await axios({
      method: "GET",
      url: `http://api.openweathermap.org/data/2.5/weather?q=${city},&appid=b3cd323b89ab55b940e9ec2862a1568b`,
    })
      .then((res: string | any) => {
        setTemp(res.data.main.temp - 273.15);
        setIcon(res.data.weather[0].icon);
        setDescription(res.data.weather[0].description);
        setMaxTemperature(res.data.main.temp_max - 273.15);
        setMinTemperature(res.data.main.temp_min - 273.15);
        setHumidity(res.data.main.humidity);
        setPressure(res.data.main.pressure);
        setDisplay(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setOption(Heading);
  }, []);

  return (
    <div className="main">
      <div className="weatherSpaceBox">
        <h1>{Header.name}</h1>
        <div className="form">
          <Input
            type={Header.text}
            value={city}
            placeholder="ENTER THE CITY NAME"
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => {
              setCity(e.target.value);
            }}
          />
          <Button onClick={handleClick} className="btn" label={"Search"} />
        </div>
        {display ? (
          <div>
            <h1>{city}</h1>
            <div>
              <img
                src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                alt="weather-icon"
                width="200"
                height="200"
              />
            </div>
            <h1>{Math.floor(temp)}℃</h1>
            <h1>{description}</h1>
            <div className="table">
              <table>
                <tr>
                  {option.map((name) => {
                    return <th>{name.value}</th>;
                  })}
                </tr>
                <tr>
                  <td>{Math.floor(minTemperature)}℃</td>
                  <td>{Math.floor(maxTemperature)}℃</td>
                  <td>{humidity}</td>
                  <td>{pressure}</td>
                </tr>
              </table>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
