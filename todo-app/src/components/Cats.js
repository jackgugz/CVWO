import React, { Component } from 'react'
import axios from 'axios'
import update from 'immutability-helper'

class Cats extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            editMode: false,
            inputValue: this.props.cat.name
        }
        
        

    }

    deleteCat = () =>  {
        
        axios.delete('api/v1/categories/'+ String(this.props.cat.id))
        .then(response => this.props.handleDelete(this.props.cat))
        .catch(error => console.log(error))
    }

    editCat = () => {
        console.log(this.state.editMode)
        if (this.state.editMode === true) {
            
            this.props.cat.name = this.state.inputValue
            axios.put('api/v1/categories/'+ String(this.props.cat.id), {category: this.props.cat})
            .then(response => {
                this.setState({editMode: false})
                this.props.handleEdit(this.props.cat)})
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
        const cat = this.props.cat;
        const selected = this.selected;
        const key = this.id;
            
        return (
            <li className="cat" cat={cat} key={key}>
                <div className="category">
                    <input className="CatLabel" disabled={!this.state.editMode}
                    value = {this.state.inputValue}
                    onChange = {this.handleChange}/>
                        
                    
                    <button className="editCatBtn"
                    onClick={this.editCat}>
                        edit</button>
                    <button className="deleteCatBtn"
                    onClick={this.deleteCat}>
                        delete</button>
                </div>
            </li>
        );
    }
}

export default Cats;