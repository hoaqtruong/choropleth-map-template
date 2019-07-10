import React, { Component } from 'react';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from 'react-simple-maps';
import ReactTooltip from 'react-tooltip';

import Context from './Context';
import FirmBanner from './FirmBanner';
import firms from './firmsData';

const wrapperStyles = {
  width: '100%',
  maxWidth: 1600,
  margin: '0 auto',
};

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeFirm: firms[0],
      isBannerDisplayed: false,
      setDisplayBanner: val => this.setState({ isBannerDisplayed: val }),
      resetMap: () => this.resetToAll()
    };
     this.setActiveFirm = this.setActiveFirm.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      ReactTooltip.rebuild();
    }, 100);
  }

  setActiveFirm(firm) {
    if (firm !== this.state.activeFirm)
      this.setState({ activeFirm: firm }, () => {
        firm.name !== 'all'
          ? this.state.setDisplayBanner(true)
          : this.state.setDisplayBanner(false);
      });
  }

  resetToAll = () => {
    if (this.state.activeFirm.name !== 'all') {
      this.setState({
        activeFirm: firms[0],
        isBannerDisplayed: true,
      });
    }
  };

  render() {
    return (
      <div
        role="presentation"
        style={wrapperStyles}
      >
        <ComposableMap
          projectionConfig={{
            scale: 205,
          }}
          width={980}
          height={551}
          style={{
            width: '100%',
            height: 'auto',
          }}
        >
          <ZoomableGroup center={[0,20]} disablePanning={true}>
            <Geographies
              geography={`${DRUPAL_PUBLIC_PATH}/geoData/world-50m.json`}
            >
              {(geographies, projection) =>
                geographies.map(geography => {
                  const country = firms[0].countries.find(
                    d => d === geography.id,
                  );
                  return (
                    <Geography
                      key={geography.id}
                      data-tip={geography.properties.name}
                      geography={geography}
                      projection={projection}
                      style={{
                        default: {
                          fill: country ? '#004C66' : '#ECEFF1',
                          stroke: '#607D8B',
                          strokeWidth: 0.75,
                          outline: 'none',
                          transition: 'fill 0.5s',
                        },
                        hover: {
                          fill: country ? '#004C66' : '#ECEFF1',
                          stroke: '#607D8B',
                          strokeWidth: 0.75,
                          outline: 'none',
                        },
                        pressed: {
                          fill: country ? '#004C66' : '#ECEFF1',
                          stroke: '#607D8B',
                          strokeWidth: 0.75,
                          outline: 'none',
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>
            <Markers>
              {firms.map(
                firm =>
                  firm.coordinates && (
                    <Marker
                      key={firm.name}
                      marker={firm}
                      onClick={() => this.setActiveFirm(firm)}
                      style={{
                        default: { stroke: '#455A64' },
                        hover: { stroke: '#FF5722', cursor: "pointer" },
                        pressed: { fill: "blue" },
                      }}
                    >
                        <circle
                          cx={0}
                          cy={0}
                          r={3}
                          style={{
                            stroke: "#FF5722",
                            fill: "#FF5722",
                            strokeWidth: 1,
                            opacity: 0.9,
                          }}
                        />
                        <text
                          textAnchor="middle"
                          x={firm.markerOffset[0]}
                          y={firm.markerOffset[1]}
                          stroke={firm.name == this.state.activeFirm.name ? '#5DBCD2': 'white'}
                          style={{
                            fontFamily: 'Roboto, sans-serif',
                            strokeWidth: '0.3rem',
                          }}
                        >
                            {firm.name}
                        </text>
                        <text
                          textAnchor="middle"
                          x={firm.markerOffset[0]}
                          y={firm.markerOffset[1]}
                          fill={firm.name == this.state.activeFirm.name ? 'blue' : 'white'}
                          fontSize={firm.name == this.state.activeFirm.name ? '1.2rem' : '1rem'}
                        >
                          {firm.name}
                        </text>
                    </Marker>
                  ),
              )}
            </Markers>
          </ZoomableGroup>
        </ComposableMap>
        <Context.Provider value={this.state}>
          <FirmBanner />
        </Context.Provider>
      </div>
    );
  }
}

export default Map;
