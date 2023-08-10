import React, { Component } from 'react'

import "./Slider.css"

export default class Slider extends Component {

    constructor(props) {
        super(props);

        this.sliderRef = React.createRef();
        this.mouseLastMove = 0;
    }

    onMouseScroll = (e) => {
        if (e.deltaY > 0)
            e.currentTarget.scrollLeft += 50;
        else
            e.currentTarget.scrollLeft -= 50;
    }

    onMouseMove = (e) => {
        if (this.mouseDown) {
            e.currentTarget.scrollLeft -= e.movementX;
            this.mouseLastMove = e.movementX;
        }

    }

    onMouseClick = (e) => {
        this.mouseDown = true;
        e.currentTarget.style.userSelect = "none";
    }

    onMouseUp = (e) => {
        if(this.mouseDown){
            this.mouseDown = false;

            let slowDown = setInterval(() => {
                let forecast = e.target;


                forecast.scrollLeft -= this.mouseLastMove;
                if (this.mouseLastMove != 0) {
                    this.mouseLastMove = this.mouseLastMove - Math.sign(this.mouseLastMove) * .2;
                }
                else if (this.mouseLastMove == 0 || forecast.scrollLeft + 1 > forecast.scrollWidth - forecast.offsetWidth) {
                    clearInterval(slowDown);
                }
            }, 20)
        }
    }


    render() {
        return (
            <div onWheel={this.onMouseScroll} onMouseMove={this.onMouseMove} onMouseDown={this.onMouseClick} 
                 onMouseUp={this.onMouseUp}
            className={this.props.className + " slider"}>
                {this.props.scrollItems}
            </div>
        )
    }
}
