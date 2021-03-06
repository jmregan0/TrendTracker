import * as d3 from 'd3'
/*
   * This data manipulation function takes the raw data from
   * the CSV file and converts it into an array of node objects.
   * Each node will store data and visualization values to visualize
   * a bubble.
   *
   * rawData is expected to be an array of data objects, read in from
   * one of d3's loading functions like d3.csv.
   *
   * This function returns the new node array, with a node in that
   * array for each element in the rawData input.
   */
export function createNodes(rawData) {
  const trendData = rawData.data.trends.filter(item => { return item.tweet_volume > 0})
    // Use the max total_amount in the data as the max in the scale's domain
    // note we have to ensure the total_amount is a number.
  const maxAmount = d3.max(trendData, d => +d.tweet_volume)

    // Sizes bubbles based on area.
    // @v4: new flattened scale names.
  const radiusScale = d3.scalePow()
      .exponent(0.5)
      .range([2, 85])
      .domain([0, maxAmount])

    // Use map() to convert raw data into node data.
    // Checkout http://learnjsdata.com/ for more on
    // working with data.
  const myNodes = trendData.map((d, index) => {
      return {
        id: '' + index,
        radius: radiusScale(d.tweet_volume),
        value: d.tweet_volume,
        name: d.name,
        x: Math.random() * 900,
        y: Math.random() * 800
      }
  })

    // sort them descending to prevent occlusion of smaller nodes.
  myNodes.sort((a, b) => b.value - a.value)

  return myNodes
}

export const fillColor = d3.scaleOrdinal().domain(['low', 'medium', 'high']).range(['#d84b2a', '#beccae', '#7aa25c'])
