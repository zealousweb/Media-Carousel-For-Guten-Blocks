const fs = require('fs');
const path = require('path');

// Copy block.json to build directory
function copyBlockJson() {
    const srcPath = path.join(__dirname, 'src', 'block.json');
    const buildPath = path.join(__dirname, 'build', 'block.json');
    
    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, buildPath);
    }
}

// Copy view.js to build directory
function copyViewJs() {
    const srcPath = path.join(__dirname, 'src', 'view.js');
    const buildPath = path.join(__dirname, 'build', 'view.js');
    
    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, buildPath);
    }
}

// Run the copy functions
copyBlockJson();
copyViewJs(); 