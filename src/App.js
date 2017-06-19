import React, {Component} from 'react'
import './App.css'
import * as d3 from 'd3'
import './App.css'
import BubbleChart from './components/BubbleChart'
import Bubbles from './components/Bubbles'
import YearsTitles from './components/YearsTitles'
import GroupingPicker from './components/GroupingPicker'
import { createNodes } from './utils'
import { width, height, center, yearCenters } from './constants'
import axios from 'axios'

export default class App extends Component {
  state = {
    data: [],
    grouping: 'all',
  }

  componentDidMount() {

    /*

    Instead of setting up another server running on a separate port to be used as a proxy,
    using axios request from within this componentDidMount() to my other server running on
    localhost:3001. This will serve up api routes for twitter calls / auth.

    On app.js (server code for handling twitter stuff) I make calls for bearer token and
    twitter stream json. Could tear that part out of the project and put it in its own file.
    Definitely don't want token info on any public facing code.

    app.js server code for twitter calls needs header middleware to enable cross origin requests
    from main app running on 3000.

    */

    axios({
      method: 'get',
      url: 'http://localhost:3001/global'
    })
    .then(result => {
      this.setState({
          data: createNodes(result),
        })
    })
  }

  onGroupingChanged = (newGrouping) => {
    this.setState({
      data: newGrouping,
    })
    this.forceUpdate()
  }

  render() {
    const { data, grouping } = this.state
    return (
      <div className="App">
        <GroupingPicker onChanged={this.onGroupingChanged} active={grouping} />
        <BubbleChart width={width} height={height}>
          <Bubbles data={data} forceStrength={0.03} center={center} yearCenters={yearCenters} groupByYear={grouping === 'year'} />
          {
            grouping === 'year' &&
            <YearsTitles width={width} yearCenters={yearCenters} />
          }
        </BubbleChart>
      </div>
    )
  }

}
