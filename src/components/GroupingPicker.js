import React, { PropTypes } from 'react'
import './GroupingPicker.css'
import axios from 'axios'
import { createNodes } from '../utils'


export default class GroupingPicker extends React.Component {
  constructor(props){
    super(props)
    this.state = props.state

  }



  onChicagoClick = (event) => {
    event.preventDefault(event);
    axios({
      method: 'get',
      url: 'http://localhost:3001/chicago'
    })
    .then(result => {
      console.log('chicago data back on main app', result)
        this.props.onChanged(createNodes(result))
    })
  }

  onNyClick = (event) => {
    event.preventDefault(event);
    axios({
      method: 'get',
      url: 'http://localhost:3001/nyc'
    })
    .then(result => {
        this.props.onChanged(createNodes(result))
    })
  }

  onLaClick = (event) => {
    event.preventDefault(event);
    axios({
      method: 'get',
      url: 'http://localhost:3001/la'
    })
    .then(result => {
        this.props.onChanged(createNodes(result))
    })
  }

  onSeattleClick = (event) => {
    event.preventDefault(event);
    axios({
      method: 'get',
      url: 'http://localhost:3001/seattle'
    })
    .then(result => {
        this.props.onChanged(createNodes(result))
    })
  }

  onParisClick = (event) => {
    event.preventDefault(event);
    axios({
      method: 'get',
      url: 'http://localhost:3001/paris'
    })
    .then(result => {
        this.props.onChanged(createNodes(result))
    })
  }

   onLondonClick = (event) => {
    event.preventDefault(event);
    axios({
      method: 'get',
      url: 'http://localhost:3001/london'
    })
    .then(result => {
        this.props.onChanged(createNodes(result))
    })
  }

  onGlobalClick = (event) => {
    event.preventDefault(event);
    axios({
      method: 'get',
      url: 'http://localhost:3001/global'
    })
    .then(result => {
        this.props.onChanged(createNodes(result))
    })
  }

  onTokyoclick = (event) => {
    event.preventDefault(event);
    axios({
      method: 'get',
      url: 'http://localhost:3001/tokyo'
    })
    .then(result => {
        this.props.onChanged(createNodes(result))
    })
  }

  render() {
    const { active } = this.props
    return (
      <div className="GroupingPicker">
        <button  onClick={this.onGlobalClick}>Global</button>
        <button  onClick={this.onChicagoClick}>Chicago</button>
        <button  onClick={this.onNyClick}>New York City</button>
        <button  onClick={this.onLaClick}>Los Angeles</button>
        <button  onClick={this.onSeattleClick}>Seattle</button>
        <button  onClick={this.onParisClick}>Paris</button>
        <button  onClick={this.onLondonClick}>London</button>
        <button  onClick={this.onTokyoclick}>Tokyo</button>
      </div>
    )
  }
}

GroupingPicker.propTypes = {
  onChanged: PropTypes.func.isRequired,
  active: PropTypes.oneOf(['all', 'year']).isRequired,
}
