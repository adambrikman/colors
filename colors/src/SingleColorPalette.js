import React, { Component } from 'react';
import ColorBox from './ColorBox';

export class SingleColorPalette extends Component {

    constructor(props) {
        super(props);
        this._shades = this.gatherShades(this.props.palette, this.props.colorId)
    }

    gatherShades(palette, colorToFilterBy) {
        // return all shades of given color
        let shades = [];
        let allColors = palette.colors;

        for (let key in allColors) {
            shades = shades.concat(
                allColors[key].filter(color => color.id === colorToFilterBy)
            )
        }

        // Return all shades of a given color after
        // the [50] level (which is always white)
        return shades.slice(1);
    }

    render() {

        const colorBoxes = this._shades.map(color => {
            return <ColorBox 
                key={color.id}
                name={color.name}
                background={color.hex}
                showLink={false}
            />
        });

        return (
            <div className='Palette'>
                <h1>Single Color Palette</h1>
                <div className="Palette-colors">
                    {colorBoxes}
                </div>
            </div>
        )
    }
}

export default SingleColorPalette;