import React, { Component } from 'react'
import axios from 'axios'
import update from 'immutability-helper'

class Tasks extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            done: false,
            editMode: false,
            inputValue: this.props.todo.title 
        }
        
        

    }

    deleteTask = () =>  {
        
        axios.delete('api/v1/todos/'+ String(this.props.todo.id))
        .then(response => this.props.handleDelete(this.props.todo))
        .catch(error => console.log(error))
    }

    editTask = () => {
        console.log(this.state.editMode)
        if (this.state.editMode === true) {
            
            this.props.todo.title = this.state.inputValue
            axios.put('api/v1/todos/'+ String(this.props.todo.id), {todo: this.props.todo})
            .then(response => {
                this.setState({editMode: false})
                this.props.handleEdit(this.props.todo)})
            .catch(error => console.log(error))
        } else {
            this.setState(
                {editMode: true}
            )
        }

        
    }


    handleChange = (e) => {
        this.setState({
            inputValue: e.target.value
        })
    }

    render() {
        const title = this.props.title;
        const done = this.done;
        const key = this.id;

        
            
        return (
            <li className="task" task={title} key={key}>
                <input className="taskCheckbox" type="checkbox" 
                    checked={done}
                    onChange={(e) => this.updateTask(e, key)} />
                    
                <input className="tasksLabel" disabled={!this.state.editMode}
                    value = {this.state.inputValue}
                    onChange = {this.handleChange}/>

                
                <button className="editTaskBtn"
                    onClick={(e) => this.editTask(e, key)}>
                    edit
                </button>
                <button className="deleteTaskBtn"
                    onClick={(e) => this.deleteTask(key)}>
                    delete
                </button>
            </li>
        );
    }
}

export default Tasks;