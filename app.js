const svg2img = require('./svg2img'); // Replace with the actual path to your module

// SVG content (replace with your SVG content)
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
    <rect x="10" y="10" width="80" height="80" fill="blue" />
</svg>`;

// Options (you can customize these)
const options = {
    width: 200, // Image width
    height: 200, // Image height
    format: 'png', // Output format: 'png' or 'jpeg'
    quality: 90, // JPEG quality (0-100) if format is 'jpeg'
};

// Callback function to handle the result
function callback(error, result) {
    if (error) {
        console.error('Error:', error);
    } else {
        // Save the result (image) to a file
        fs.writeFileSync('output.png', result);
        console.log('Image saved as output.png');
    }
}

// Call the svg2img function to generate the image
svg2img(svgContent, options, callback);
