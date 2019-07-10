
import React, { Component } from "react"
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from "react-simple-maps"
import { scaleLinear } from "d3-scale"

const wrapperStyles = {
  width: "100%",
  maxWidth: 1600,
  margin: "0 auto",
}

const countries = [
  {name: "Azerbaijan", iso3: "AZE", scale: 1},
  {name: "Indonesia", iso3: "IDN", scale: 7},
  {name: "Malawi", iso3: "MWI", scale: 1},
  {name: "Namibia", iso3: "NAM", scale: 1},
  {name: "Tanzania", iso3: "TZA", scale: 2},
  {name: "Peru", iso3: "PER", scale: 4},
  {name: "Romania", iso3: "ROU", scale: 2},
  {name: "Serbia", iso3: "SRB", scale: 1},
  {name: "Uganda", iso3: "UGA", scale: 1},
  {name: "Ukraine", iso3: "UKR", scale: 2},
  {name: "Bulgaria", iso3: "BGR", scale: 1},
  {name: "Switzerland", iso3: "CHE", scale: 1},
]

const popScale = scaleLinear()
  .domain([0,1,2,4,7])
  .range(["#f4e7eb","#be7389","#a84562", "#93173B", "#580d23"])

class BasicMap extends Component {

  fillColor(geography) {
    const countries = countries.find(d => d.iso3 === geography.id)
  }
  render() {
    return (
      <div style={wrapperStyles}>
        <ComposableMap
          projectionConfig={{
            scale: 205,
            rotation: [-11,0,0],
          }}
          width={980}
          height={551}
          style={{
            width: "100%",
            height: "auto",
          }}
        >
          <ZoomableGroup center={[0,20]}>
            <Geographies geography={ "/static/world-50m.json" }>
              {(geographies, projection) => geographies.map((geography, i) => {
                  const country = countries.find(d => d.iso3 === geography.id)
                  console.log(country);
                return (
                  <Geography
                    key={ i }
                    geography={ geography }
                    projection={ projection }
                    onClick={ this.handleClick }
                    style={{
                      default: {
                        fill: country ? popScale(country.scale) : popScale(0),
                        stroke: "#607D8B",
                        strokeWidth: 0.75,
                        outline: "none",
                      },
                      hover: {
                        fill: "#263238",
                        stroke: "#607D8B",
                        strokeWidth: 0.75,
                        outline: "none",
                      },
                      pressed: {
                        fill: "#263238",
                        stroke: "#607D8B",
                        strokeWidth: 0.75,
                        outline: "none",
                      }
                    }}
                  />
                )
              })}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    )
  }
}

export default BasicMap
