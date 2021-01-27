import React, { Component } from 'react'
import axios from 'axios'
import update from 'immutability-helper'
import AddACat from './AddACat'
import Cats from './Cats'

class CatList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          cats: [],
          selectedCat: 0
          
        }
        console.log(this.props.cats)
    }
    getCats() {
        axios.get('/api/v1/categories')
        .then(response => {
          
          this.setState({cats : response.data})
          this.props.setCat(response.data)
        })
        .catch(error => console.log(error))
      }
  
      componentDidMount() {
        this.getCats()
      }


    onDelete = (cat) => {
        console.log(this.state.cats.filter(x => {return x.id !== cat.id}))
        const newcat = this.state.cats.filter(x => {return x.id !== cat.id})
        this.setState({cats: newcat})
    }

    onEdit = (cat) => {
        this.setState({cats: this.state.cats.map(
            (x) => {
                if (x.id === cat.id) {
                    x.name = cat.name
                }  
                return x}
        )})
    }

    onCreate = () => {
        console.log("hello")
        this.getCats()
    }

    handleSelectedCat = (e) => {
        
        this.setState({selectedCat:e.target.value})
        
        this.props.filterCat(e.target.value)
    }


    render() {
        console.log(this.state.cats)
        return (
            <div>
                <div className="Category">
                    <h1>Category</h1>
                </div>

                <div className='CatsWrapper'>
                    <div className='catList'>
                        {this.state.cats.map((cat) => {
                            
                            return (<div key={cat.id}> 
                                <Cats cat={cat} 
                                key = {cat.name}
                                handleDelete = {this.onDelete}
                                handleEdit = {this.onEdit}/>

                                
                            </div>)
                        
                            })
                        }

                    </div>
                    <div>
                        <p>
                            Filter By Category
                        </p>
                        <select className="showCat" value={this.state.selectedCat} 
                        onChange={this.handleSelectedCat}>
                        <option value={0}>
                            All
                        </option>
                        {this.state.cats.map((cat) => {
                            return <option key={cat.id} value={cat.id}>{cat.name}</option>
                        })}
                        </select>

                    </div>
                        

                </div>

                <AddACat 
                handleCreate = {this.onCreate}/>
                
            </div>
                
        );
    }
}

export default CatList;