import React, { Component } from 'react';
import classNames from 'classnames';

import { TasksContext } from "./Dashboard"

import Tooltip from "./Tooltip"

const DEFAULT_COLOR = '#000000';

class RadialChart extends Component {
    static contextType = TasksContext;
    state = {
        tooltip: false,
    }

    componentDidMount() {
        // For initial animation
        setTimeout(() => {
            this.setState({ setStrokeLength: true });
        });
    }
    handleMouseEnter = () => {
        
        this.setState({
            tooltip: true
        })
    }

    handleMouseLeave = () => {
        this.setState({
            tooltip:false
        })
    }

    render() {
        const { setStrokeLength } = this.state;
        const {
            className,
            radius,
            progress,
            strokeWidth,
            dimension,
            color
        } = this.props;
        
        const circleRadius = Math.min(radius, 85);
        const circumference = 2 * 3.14 * circleRadius;
        const strokeLength = setStrokeLength ? circumference / 100 * progress : 0;
return (
        // <TasksContext.Consumer>
           <div
                className={classNames('radial-chart', className, {
                    'no-progress': strokeLength === 0
                })}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
           >   
               <svg viewBox="0 0 180 180" width={dimension} height={dimension}>
                   <circle
                       className="radial-chart-total"
                       stroke={color}
                       strokeWidth={strokeWidth}
                       fill="none"
                       cx="90"
                       cy="90"
                       r={circleRadius}
                   />
                   <circle
                       className="radial-chart-progress"
                       stroke={color}
                       strokeWidth={strokeWidth}
                       strokeDasharray={`${strokeLength},${circumference}`}
                       strokeLinecap="round"
                       fill="none"
                       cx="90"
                       cy="90"
                       r={circleRadius}
                   />
               </svg>
               <Tooltip active={this.state.tooltip}/>
           </div>
        //    </TasksContext.Consumer>
        );
    }
}
RadialChart.defaultProps = {
    radius: 80,
    progress: 100,
    strokeWidth: 16,
    dimension: 30,
    color: DEFAULT_COLOR
};

export default RadialChart;