import React, { Component } from "react";
import PropTypes from "prop-types";
import {format} from `date-fns`;

class CalendarBase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [], // State to store tasks
        };
    }

    // Format Date
    formatDate(date){
        return format(new Date(date), `yyyy-MM-dd`);
    }

    //Fetch tasks when component mounts or updates
    //Change the tasks shows in dailyList
    componentDidMount(){
        this.fetchTasksForDate(currentDate);
    }

    componentDidUpdate(){
        if(prevProps.currentDate !== this.props.currentDate){
            this.fetchTasksForDate(currentDate);
        }
    }

    fetchTasksForDate= async () => {
        const{fetchTasks,currentDate}=this.props;
        const formattedDate = this.formatDate(currentDate);
        try{
            const tasks = await fetchTasks(formattedDate);
            this.setState({tasks:fetchTasks});
        }catch(error){
            console.error("Failed to fetch tasks:",error);
        }
        
    }

    render(){
        const {tasks} = this.state;

        return(
            <div>
                <h1>Tasks for {this.formatDate(this.props.currentDate)}</h1>
                <ul>
                    {tasks.map((task,index)=>(
                        <li key={index}>{ task.title} </li>
                    ))}
                </ul>
            </div>
        )
    }
}

CalendarBase.PropTypes = {
    currentDate:PropTypes.instanceOf(Date).isRequired,
    fetchTasks:PropTypes.func.isRequired,
};

export default CalendarBase;