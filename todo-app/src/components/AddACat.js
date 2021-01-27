import React, { Component } from 'react'
import axios from 'axios'
import update from 'immutability-helper'

class AddACat extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            inputValue: '',
            
        }
    }

    

    createCat = (e) => {
        
        if (e.key === 'Enter' && !(e.target.value === '')) {
            axios.post('/api/v1/categories', {category: {name: e.target.value}})
            .then(response => {
              
                this.props.handleCreate();
                this.setState({
                    inputValue: ''
                })
            })
            .catch(error => console.log(error))      
          } 
    }

    handleChange = (e) => {
        this.setState({
            inputValue: e.target.value
        })
    }

    render() {
        return (
            <div className='inputContainer'>
                <input className='catInput' type='text'
                    placeholder='Add a category' maxLength='50'
                    onKeyPress={this.createCat} 
                    value = {this.state.inputValue}
                    onChange = {this.handleChange}/>
            </div>
        );
    }
}

export default AddACat;