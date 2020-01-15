import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteFrom from './NewPaletteForm';

import seedColors from './seedColors';
import {generatePalette} from './colorHelpers';

class App extends Component {

  // Take the palette name from the client Route and find it in seedColors
  findPalette(id) {
    return seedColors.find(function(palette){
      return palette.id === id;
    })
  }

  render() {
    return (
        <Switch>
          <Route exact path='/palette/new' render={() => <NewPaletteFrom />}/>
          <Route 
            exact 
            path='/palette/:paletteId/:colorId' 
            render={routeProps => (
              <SingleColorPalette
                colorId={routeProps.match.params.colorId}
                palette={generatePalette(
                  this.findPalette(routeProps.match.params.paletteId) 
                )}
              /> 
            )}
          />

          <Route 
            exact 
            path='/' 
            render={routeProps => <PaletteList palettes={seedColors} {...routeProps} /> } 
          />

          <Route 
            exact 
            path='/palette/:id'

            // After finding the correct palette in seedColors,
            // generate the shade of colors for the component
            render={routeProps => (
              <Palette
                palette={generatePalette(
                  this.findPalette(routeProps.match.params.id) 
                )}
              /> 
            )} 
          />
        </Switch>
      //<div className="App">
      //  <Palette palette={generatePalette(seedColors[4])}/>
      //</div>
    );
  }
}

export default App;
