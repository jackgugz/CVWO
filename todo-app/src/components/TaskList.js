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
          cats: [],
          newCat: 1,
          filter: 0

        }
        
    }
    getTodos() {
        axios.get('/api/v1/todos')
        .then(response => {
            
          this.setState({todos : response.data})
          this.props.setTask(response.data)
        })
        .catch(error => console.log(error))
      }

    componentDidMount() {
        this.getTodos()
        this.setState({cats: this.props.cats, filter: this.props.filterCat})

      }

    componentWillReceiveProps(nextProps) {
        this.setState({cats: nextProps.cats, filter: nextProps.filterCat});
        console.log(this.state.filter)
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

    handleCatChange = (e) => {
        this.setState({newCat:e.target.value})
    }

    getNewCat = () => {
        return this.state.newCat
    }

    render() {
        console.log(this.state.cats)
        return (
            <div>
                <div className="todoHeader">
                    <h1>Todo Tasks</h1>
                </div>

                <div className='listWrapper'>
                    <div className='taskList'>
                        {this.state.todos.filter((x) => {console.log(x.category_id) 
                        console.log(this.state.filter)
                            return this.state.filter == 0 || x.category_id == this.state.filter}).map((todo) => 
                            <Tasks todo={todo} 
                            title = {todo.title}
                            key = {todo.id}
                            handleDelete = {this.onDelete}
                            handleEdit = {this.onEdit}
                            done = {todo.done}/>
                        )}
                    </div>
                </div>
                
                
                <div>
                    <div className="inputContainer">
                        <select className='dropdown' value={this.state.newCat} 
                        onChange={this.handleCatChange}>
                        {this.state.cats.map((cat) => {
                            return <option key={cat.id} value={cat.id}>{cat.name}</option>
                        })}
                        </select>

                        <AddATask catID={this.state.newCat}
                        addTask={this.onAdd}
                        fetchCat={this.getNewCat}/>
                    </div>
                    
                        
                </div>
                    

                
                
            </div>
                
        );
    }
}

export default TaskList;