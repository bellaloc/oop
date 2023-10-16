const inquirer = require('inquirer');
const fs = require('fs');
const svg2img = require('svg2img');

async function generateLogo() {
    const userInput = await inquirer.prompt([
        {
            type: 'input',
            name: 'text',
            message: 'Enter up to three characters for the logo:',
            validate: (input) => input.length <= 3,
        },
        {
            type: 'input',
            name: 'textColor',
            message: 'Enter the text color (color keyword or hex):',
        },
        {
            type: 'list',
            name: 'shape',
            message: 'Choose a shape:',
            choices: [{name: 'circle', value: "circle"}, {name: 'triangle', value: "polygon"}, {name: 'square', value: "rect"}],
        },
        {
            type: 'input',
            name: 'shapeColor',
            message: 'Enter the shape color (color keyword or hex):',
        },
    ]);
console.log (userInput)

    const template = fs.readFileSync('template.svg', 'utf8');
    let svgWithReplacements;
    if (userInput.shape === "circle") { 
        

    svgWithReplacements = template
        .replace('LOGO_TEXT', userInput.text)
        .replace('TEXT_COLOR', userInput.textColor) 
        .replace('<shape />', `<${userInput.shape} fill="${userInput.shapeColor}" cx="120" cy="120" r="80"/>`);
    
        fs.writeFileSync('logo.svg', svgWithReplacements);
    }
    else if (userInput.shape === "rect") {
        svgWithReplacements = template
        .replace('LOGO_TEXT', userInput.text)
        .replace('TEXT_COLOR', userInput.textColor) 
        .replace('<shape />', `<${userInput.shape} fill="${userInput.shapeColor}" x="90" y="40" width="120" height="120"/>`);

        
    fs.writeFileSync('logo.svg', svgWithReplacements);
    } else {
        svgWithReplacements = template
        .replace('LOGO_TEXT', userInput.text)
        .replace('TEXT_COLOR', userInput.textColor) 
        .replace('<shape />', `<${userInput.shape} fill="${userInput.shapeColor}" x="90" y="40" width="120" height="120"/>`);

    }

    console.log('Generated logo.svg');

//     //svg2img(fs.createReadStream('logo.svg'), (error, buffer) => {
//         if (error) {
//             console.error('Failed to convert SVG to an image:', error);
//         } else {
//             fs.writeFileSync('logo.png', buffer);
//             console.log('Generated logo.png');
//         }
//     });
}

generateLogo();
