import { useState } from "react";

/* ICONS */
import { FaLocationDot } from "react-icons/fa6";

import { IoMdCompass } from "react-icons/io";
import { FaWind } from "react-icons/fa";

import { IoMdRainy } from "react-icons/io";
import { FaTemperatureArrowUp } from "react-icons/fa6";
import { IoCloud } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { PiTimerFill } from "react-icons/pi";

/*------------------------------------------------------*/
import './App.css';

function App() {
  const APIKEY = '55f984401be747e4a37221628230405';

  const [getWeather, setWeather] = useState(null);
  const [message, setMessage] = useState('');
  const [getIcon, setIcon] = useState('');
  const [getNotifStatus, setNotifStatus] = useState(false);
  const [getFontSize, setFontSize] = useState('27px');

  const handleChange = (e) => {
    setMessage(e.target.value);
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if(message === ''){
        console.log('git')
      } else {
        searchCity(message)
      }
    }
  }

  function searchCity(cityname){
    const apiURL = `http://api.weatherapi.com/v1/forecast.json?key=${APIKEY}&q=${cityname}&days=7&aqi=no&alerts=no`

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
          let icon = data.current.condition.icon;
          let nameofcity = data.location.name;

          setWeather(data);
          setIcon(icon.replace('64x64', '128x128'));

          if (nameofcity.length > 10){
            setFontSize('20px');
          } else {
            setFontSize('27px');
          }
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            if(!getNotifStatus){
              setNotifStatus(true);
              setTimeout(function () {
                setNotifStatus(false);
              }, 5000);
            }
        });
  }

  return (
    <>
    {getWeather ? 
      <div className='background'>
        <div className='notification' style={{display: getNotifStatus ? 'block' : 'none'}}>
          <span className='notification-text'>Błąd podczas pobierania aktualnych danych o pogodzie. Spróbuj ponownie</span>
        </div>
        <div className='main-box'>
          <div className='search-content'>
            <input className='search-input' type='text' placeholder='Wprowadź miasto' onChange={handleChange} onKeyDown={handleKeyDown}></input>
          </div>
          <div className='main-content'>
            {/* ICON */}
            <div className='left-content'>
              <img className="imgicon" src={getIcon} alt='test'></img>
            </div>
            {/* LOCATION INFO */}
            <div className='center-content'>
              <div className='city-name' style={{fontSize: getFontSize}}><FaLocationDot/> {getWeather.location.name}</div>
              <div className='date-time'> {getWeather.location.localtime}</div>
              
              <div className='degrees'>{getWeather.current.temp_c} °C</div>
            </div>
            {/* OTHER INFO */}
            <div className='right-content'>
              <div className='weather-info'><IoMdCompass size='20px' color="white"/> <span className="weather-info-header">Kierunek wiatru</span><br/>{getWeather.current.wind_dir}</div>
              <div className='weather-info'><FaWind size='20px' color="white"/> <span className="weather-info-header">Prędkość wiatru</span><br/>{getWeather.current.wind_kph} km/h</div>
            </div>
          </div>
          <div className="other-content">
            <div className='other-item'>
              <IoMdRainy size='40px' color="white"/>
              <div className="other-info-header">Wilgotność</div>
              <div className="other-info-description">{getWeather.current.humidity} %</div>
            </div>
            <div className='other-item'>
              <FaTemperatureArrowUp size='40px' color="white"/>
              <div className="other-info-header">Temp. odcz</div>
              <div className="other-info-description">{getWeather.current.feelslike_c} °C</div>
            </div>
            <div className='other-item'>
              <IoCloud size='40px' color="white"/>
              <div className="other-info-header">Zachmurzenie</div>
              <div className="other-info-description">{getWeather.current.cloud} %</div>
            </div>
            <div className='other-item'>
              <FaEye size='40px' color="white"/>
              <div className="other-info-header">Widoczność</div>
              <div className="other-info-description">{getWeather.current.vis_km} km</div>
            </div>
            <div className='other-item'>
              <PiTimerFill size='40px' color="white"/>
              <div className="other-info-header">Ciśnienie</div>
              <div className="other-info-description">{getWeather.current.pressure_mb} hPa</div>
            </div>
          </div>
        </div>
      </div>
    : searchCity('Warszawa')} 
    </>
  );
}

export default App;
