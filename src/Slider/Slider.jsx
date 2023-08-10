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
                let forecast = this.sliderRef.current;
                forecast.scrollLeft -= this.mouseLastMove;
                if (this.mouseLastMove != 0) {
                    this.mouseLastMove = this.mouseLastMove - Math.sign(this.mouseLastMove) * .25;
                }
                else if (this.mouseLastMove == 0 || forecast.scrollLeft + 1 > forecast.scrollWidth - forecast.offsetWidth) {
                    clearInterval(slowDown);
                }
            }, 20)
        }
    }

    componentDidMount() {
        this.sliderRef.current.addEventListener("wheel", this.onMouseScroll);
        this.sliderRef.current.addEventListener("mousemove", this.onMouseMove);
        this.sliderRef.current.addEventListener("mousedown", this.onMouseClick);
        this.sliderRef.current.addEventListener("mouseup", this.onMouseUp);
    }

    componentWillUnmount() {
        this.sliderRef.current.removeEventListener("wheel", this.onMouseScroll);
        this.sliderRef.current.removeEventListener("mousemove", this.onMouseMove);
        this.sliderRef.current.removeEventListener("mousedown", this.onMouseClick);
        this.sliderRef.current.removeEventListener("mouseup", this.onMouseUp);

    }

    render() {
        return (
            <div ref={this.sliderRef} className={this.props.className + " slider"}>
                {this.props.scrollItems}
            </div>
        )
    }
}
