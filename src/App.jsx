import './App.css'

import { Component } from 'react'
import DailyWeather from './DailyWeather/DailyWeather';
import HourlyWeather from './HourlyWeather/HourlyWeather';
import Slider from './Slider/Slider';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.apiKey = "548c8a3416c6464a99b74230230107";

    this.state = {
      city: "",
      weather: {},
      day: {},
      hour: {}
    }

    this.mouseDown = false;
    this.mouseLastMove = 0;


    this.onDaySelect = this.onDaySelect.bind(this);
    this.onHourSelect = this.onHourSelect.bind(this);
  }

  getWeather = (event) => {
    event.preventDefault();

    let url = "https://api.weatherapi.com/v1/forecast.json?key=" + this.apiKey + "&q=" + this.state.city +"&aqi=no&days=15&alerts=no";

    console.log(url)

    fetch(url).then(result => {
        if(result.ok){
            return result.json();
        }else{
            throw Error(result.statusText);
        }

    }).then(data => {
        this.setState({
            weather: data,
            day: data.forecast?.forecastday[0],
            hour: data.forecast?.forecastday[0].hour[new Date().getHours()]
        })
    }).catch(error => console.log(error));
  }

  onCityInput = (event) => {
    this.setState({
      city: event.target.value
    });
  }

  createDays = () => {
    let weather = this.state?.weather?.forecast?.forecastday;

    let dailyWeather = [];

    if (weather) {
      for (let i = 0; i < weather.length; i++) {
        dailyWeather.push(
          <DailyWeather weather={weather[i]} key={weather[i].date} daySelect={this.onDaySelect} active={this.state.day.date === weather[i].date ? "dailyActive" : ""}/>
        )
      }
    }

    return dailyWeather;
  }

  createHours = () => {
    let hours = this.state?.day.hour;
    return hours.map((hour) => {
      return <HourlyWeather weather={hour} key={hour.time} hourSelect={this.onHourSelect} active={this.state.hour.time === hour.time ? "hourlyActive" : ""}/>
    });
  }

  onDaySelect = (dayInfo) => {
    this.setState({ day: dayInfo, hour: dayInfo.hour[new Date().getHours()] })

  }

  onHourSelect = (hourInfo) => {
    this.setState({hour: hourInfo});
  }

  render() {
    return (
      <div className="app">
        <form action="">

          <input type="text" placeholder="City name:" onInput={this.onCityInput} className="cityInput" />
          <input type="submit" value="Get Weather" onClick={this.getWeather} className="button" />
        </form>


        <Slider className="forecast" scrollItems={this.createDays()}/>

        {Object.getOwnPropertyNames(this.state?.day).length != 0 &&
        Object.getOwnPropertyNames(this.state?.hour).length != 0 &&
          <div className="forecastDetails">
            <div className="mainConditionDetails">
              <div className="condition">
                <img src={this.state.hour.condition.icon} alt="" />
                <div className="currentCondition">{this.state.hour.condition.text}</div>
              </div>
              <div className="currentHumidity">Humidity: {this.state.hour.humidity}</div>
              <div className="currentTemp">Temperature / Feels Like: {this.state.hour.temp_c} / {this.state.hour.feelslike_c}</div>
              <div className="wind">Wind: {this.state.hour.wind_kph} kph</div>
            </div>


            <Slider className="hourForecast" scrollItems={this.createHours()}/>
          </div>
        }
      </div>
    )
  }
}

