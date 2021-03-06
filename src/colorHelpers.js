import chroma from 'chroma-js';
const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

function generatePalette(starterPalette) {
    let newPalette = {
        paletteName: starterPalette.paletteName,
        id: starterPalette.id,
        emoji: starterPalette.emoji,
        colors: {}
    };

    for (let level of levels) {
        newPalette.colors[level] = [];
    }

    // Get 10 colors & reverse the array so it's ordered from light to dark
    // Then, iterate through the colors array and add in the updated-color 
    // at each level (i.e. 50, 100, etc.)
    for (let color of starterPalette.colors) {
        let scale = getScale(color.color, 10).reverse();
        for (let i in scale) {
            newPalette.colors[levels[i]].push({
                name: `${color.name} ${levels[i]}`,
                id: color.name.toLowerCase().replace(/ /g, '-'),
                hex: scale[i],
                rgb: chroma(scale[i]).css(),
                rgba: chroma(scale[i]).css().replace("rgb", "rgba").replace(")", ",1.0)")
            })
        }
    }
    return newPalette;
}

// Generate array with three color values: [darken(1.4), regular color, white)]
function getRange(hexColor) {
    const end = '#fff';
    return [
        chroma(hexColor).darken(1.4).hex(),
        hexColor,
        end
    ]
}

// .colors takes the scale we generated along with the argument
// numberOfColors (i.e. 10), and it returns that quantity of colors
function getScale(hexColor, numberOfColors) {
    return chroma
        .scale(getRange(hexColor))
        .mode("lab")
        .colors(numberOfColors);
}

export {generatePalette};