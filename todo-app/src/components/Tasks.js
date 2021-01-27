import React, { Component } from 'react'
import axios from 'axios'
import update from 'immutability-helper'

class Tasks extends React.Component {

    updateTask(e, key) {

    }

    render() {
        const title = this.props.title;
        const done = this.done;
        const key = this.id;

        handle
            
        return (
            <li className="task" task={title} key={key}>
                <input className="taskCheckbox" type="checkbox" 
                    checked={done}
                    onChange={(e) => this.updateTask(e, key)} />
                <label className="taskLabel">
                    {title}
                </label>
                <span className="editTaskBtn"
                    onClick={(e) => this.editTask(e, key)}>
                    edit
                </span>
                <span className="deleteTaskBtn"
                    onClick={(e) => this.deleteTask(key)}>
                    delete
                </span>
            </li>
        );
    }
}

export default Tasks;