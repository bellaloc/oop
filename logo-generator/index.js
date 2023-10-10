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
            choices: ['circle', 'triangle', 'square'],
        },
        {
            type: 'input',
            name: 'shapeColor',
            message: 'Enter the shape color (color keyword or hex):',
        },
    ]);

    const template = fs.readFileSync('template.svg', 'utf8');
    const svgWithReplacements = template
        .replace('LOGO_TEXT', userInput.text)
        .replace('<shape />', `<${userInput.shape} fill="${userInput.shapeColor}" />`);

    fs.writeFileSync('logo.svg', svgWithReplacements);

    console.log('Generated logo.svg');

    svg2img(fs.createReadStream('logo.svg'), (error, buffer) => {
        if (error) {
            console.error('Failed to convert SVG to an image:', error);
        } else {
            fs.writeFileSync('logo.png', buffer);
            console.log('Generated logo.png');
        }
    });
}

generateLogo();
