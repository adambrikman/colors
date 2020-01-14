import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Palette from './Palette';
import PaletteList from './PaletteList';
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
          <Route exact path='/' render={() => <PaletteList palettes={seedColors} /> } />
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