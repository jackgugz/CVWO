import React, { Component } from 'react'
import axios from 'axios'
import update from 'immutability-helper'
import AddATask from './AddATask'
import Tasks from './Tasks'

class TaskList extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
          todos: [],

        }
        console.log(this.props.todos)
    }
    getTodos() {
        axios.get('/api/v1/todos')
        .then(response => {
            
          this.setState({todos : response.data})
        })
        .catch(error => console.log(error))
      }

      componentDidMount() {
        this.getTodos()
      }


    onDelete = (todo) => {
        console.log(this.state.todos.filter(x => {return x.id !== todo.id}))
        const newtodo = this.state.todos.filter(x => {return x.id !== todo.id})
        this.setState({todos: newtodo})
    }

    onEdit = (todo) => {
        this.setState({todos: this.state.todos.map(
            (x) => {
                if (x.id ===todo.id) {
                    x.title = todo.title
                }
                return x}
        )})
    }

    onAdd = (todo) => {
        let temp = this.state.todos
        temp.unshift(todo);
        this.setState({
            todos: temp
        })
    }

    render() {

        return (
            <div>
                <div className="header">
                    <h1>Todo Tasks</h1>
                </div>

                <div className='listWrapper'>
                    <div className='taskList'>
                        {this.state.todos.map((todo) => 
                            <Tasks todo={todo} 
                            title = {todo.title}
                            key = {todo.id}
                            handleDelete = {this.onDelete}
                            handleEdit = {this.onEdit}
                            done = {todo.done}/>
                        )}
                    </div>
                </div>
                
                //need to edit
                <AddATask catID={this.props.catID}
                addTask={this.onAdd}/>
                
            </div>
                
        );
    }
}

export default TaskList;