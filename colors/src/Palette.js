import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import './Palette.css';
import './Navbar.css';

class Palette extends Component {

    constructor(props) {
        super(props);
        this.state = {
            level: 500,
            format: 'hex'
        }
        this.changeLevel = this.changeLevel.bind(this);
        this.changeFormat = this.changeFormat.bind(this);
    }

    changeLevel(level) {
        this.setState({
            level
        })
    }

    changeFormat(format) {
        this.setState({
            format
        })
    }

    render() {
        const {colors, paletteName, emoji, id} = this.props.palette;
        const {level, format} = this.state;

        const colorBoxes = colors[level].map(color => {
            return <ColorBox 
                key={color.id}
                id={color.id}
                background={color[format]} 
                name={color.name}
                paletteId={id}
                showLink={true}
            />
        })

        return (
            <div className="Palette">
                <Navbar level={level} changeLevel={this.changeLevel} handleChange={this.changeFormat} />

                <div className="Palette-colors">
                    {colorBoxes}
                </div>

                <footer className="Palette-footer">
                    {paletteName}
                    <span className="emoji">{emoji}</span>
                </footer>

            </div>
        )
    }
}

export default Palette;