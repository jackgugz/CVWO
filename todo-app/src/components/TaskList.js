import React, { Component } from 'react'
import axios from 'axios'
import update from 'immutability-helper'
import AddATask from './AddATask'

class TaskList extends React.Component {
    

    render() {

        return (
            <div>
                <div className="header">
                    <h1>Todo Tasks</h1>
                </div>

                <div className='listWrapper'>
                    <ul className='taskList'>
                        {
                        }
                    </ul>
                </div>

                <AddATask catID={this.props.catID}/>
                
            </div>
                
        );
    }
}

export default TaskList;