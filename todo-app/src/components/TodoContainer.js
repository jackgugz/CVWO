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
          selectedCat: 0
        }
        this.setTask = this.setTask.bind(this)
        this.setCat = this.setCat.bind(this)

    }

    setCat(cats) {
      
      this.setState({cats:cats})
    }

    setTask(todos) {
      this.setState({tasks:todos})
    }

    filterCat = (cat) => {
      this.setState({selectedCat: cat})
      console.log(this.state.selectedCat)
    }

    

    render() {
      console.log(this.state.cats)
        return (
            <div className="mainContainer">
      
              <div className="catContainer">
                <CatList filterCat={this.filterCat} cats={this.state.cats} setCat={this.setCat}/>
              </div>
              
              <div className='taskContainer'>
                <TaskList filterCat={this.state.selectedCat} cats={this.state.cats} catID={this.state.catID} tasks={this.state.tasks} setTask={this.setTask}/>
              </div>
      
            </div>
          );
    }
}

export default TodoContainer;