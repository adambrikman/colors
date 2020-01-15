import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import ColorBox from './ColorBox';

export class SingleColorPalette extends Component {

    constructor(props) {
        super(props);
        this._shades = this.gatherShades(this.props.palette, this.props.colorId)
        this.state = {
            format: 'hex'
        }
        this.changeFormat = this.changeFormat.bind(this);
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

    changeFormat(format) {
        this.setState({ format })
    }

    render() {

        const {format} = this.state;
        const {paletteName, emoji, id} = this.props.palette;

        const colorBoxes = this._shades.map(color => {
            return <ColorBox 
                key={color.name}
                name={color.name}
                background={color[format]}
                showingFullPalette={false}
            />
        });

        return (
            <div className='SingleColorPalette Palette'>
                <Navbar handleChange={this.changeFormat} showingAllColors={false} />
                <div className="Palette-colors">
                    {colorBoxes}
                    <div className="go-back ColorBox">
                        <Link to={`/palette/${id}`} className="back-button">GO BACK</Link>
                    </div>
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        )
    }
}

export default SingleColorPalette;