import React, { Component } from 'react'
import axios from 'axios'
import update from 'immutability-helper'
import CatList from './CatList'
import AddACat from './AddACat'
import TaskList from './TaskList'
import AddATask from './AddATask'

class TodoContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          cats: [],
          tasks: [],
          catID: 1,
        }

    }

    

    render() {
        return (
            <div className="mainContainer">
      
              <div className="catContainer">
                <CatList cats={this.state.cats}/>
              </div>
              
              <div className='taskContainer'>
                <TaskList catID={this.state.catID} tasks={this.state.tasks}/>
              </div>
      
            </div>
          );
    }
}

export default TodoContainer;