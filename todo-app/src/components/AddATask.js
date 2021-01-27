import React, { Component } from 'react'
import axios from 'axios'
import update from 'immutability-helper'

class AddATask extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputValue : '',
            catId : 1
        }
    }

    createTask = (e) => {
        
        if (e.key === 'Enter' && !(e.target.value === '')) {
            
            axios.post('/api/v1/todos', {todo: {title: e.target.value, done: false, category_id: this.props.fetchCat()}})
            .then(response => {
              this.props.addTask(response.data)
                this.setState({
                  inputValue: ''
                })
              })
            .catch(error => console.log(error))      
          }    
    }
    
    componentDidMount() {
        this.state.catId = this.props.catID
    }
    
    render() {
        return (
            <div className='inputContainer'>
                <input className='taskInput' type='text'
                    placeholder='Add a task' maxLength='50'
                    onKeyPress={this.createTask}
                     />
            </div>
        );
    }
}

export default AddATask;