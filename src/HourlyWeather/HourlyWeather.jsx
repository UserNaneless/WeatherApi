import React, { Component } from 'react'

import "./HourlyWeather.css"

export default class HourlyWeather extends Component {
    render() {
        if(!this.props.weather)
            return;

        return (
            <div className={"hourlyWeather " + this.props.active} onClick={() => {
                this.props.hourSelect(this.props.weather);
            }}>
                <div className="weatherHour">
                    { String(new Date(this.props.weather.time).getHours()).padStart(2, "0") + ":" + String(new Date(this.props.weather.time).getMinutes()).padStart(2, "0")}
                </div>
                <img src={this.props.weather.condition.icon} alt="" className="conditionIcon" width="40" height="40"/>
                <div className="hourTempC">{this.props.weather.temp_c}</div>
            </div>
        )
    }
}
