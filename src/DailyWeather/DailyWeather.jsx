import React, { Component } from 'react'

import "./DailyWeather.css"

export default class DailyWeather extends Component {

    
    getDateWeekName = (date) => {
        let d = new Date(date)
        return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d.getDay()];
    }



    render() {

        if(!this.props.weather)
            return;   

        return (
            <div className={"dailyWeather "+this.props.active} onClick={(e) => {
                    this.props.daySelect(this.props.weather);
                }}>
                <h2 className="date">{this.getDateWeekName(this.props.weather.date)}</h2>
                <div className="condition">
                    <div className="weatherType">{this.props.weather.day.condition.text}</div>
                    <img width="64px" height="64px" src={"https:" + this.props.weather.day.condition.icon}/>
                </div>
                <div className="weatherInfo">
                    <div className="maxTemp">{this.props.weather.day.maxtemp_c}</div>
                    <div className="mintemp">{this.props.weather.day.mintemp_c}</div>
                </div>
            </div>
        )
    }
}
