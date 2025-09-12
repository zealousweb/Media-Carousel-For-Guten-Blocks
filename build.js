const fs = require('fs');
const path = require('path');

// Copy block.json to build directory
function copyBlockJson() {
    const srcPath = path.join(__dirname, 'src', 'block.json');
    const buildPath = path.join(__dirname, 'build', 'block.json');
    
    if (fs.existsSync(srcPath)) {
        try {
            fs.copyFileSync(srcPath, buildPath);
            console.log('✓ block.json copied successfully');
        } catch (error) {
            console.error('✗ Error copying block.json:', error.message);
        }
    } else {
        console.error('✗ block.json not found in src directory');
    }
}

// Copy view.js to build directory
function copyViewJs() {
    const srcPath = path.join(__dirname, 'src', 'view.js');
    const buildPath = path.join(__dirname, 'build', 'view.js');
    
    if (fs.existsSync(srcPath)) {
        try {
            fs.copyFileSync(srcPath, buildPath);
            console.log('✓ view.js copied successfully');
        } catch (error) {
            console.error('✗ Error copying view.js:', error.message);
        }
    } else {
        console.error('✗ view.js not found in src directory');
    }
}

// Check if required files exist in build directory
function checkBuildFiles() {
    const requiredFiles = [
        'block.json',
        'index.js',
        'index.css',
        'style-index.css',
        'view.js'
    ];
    
    console.log('\nChecking build files:');
    requiredFiles.forEach(file => {
        const filePath = path.join(__dirname, 'build', file);
        if (fs.existsSync(filePath)) {
            console.log(`✓ ${file} exists`);
        } else {
            console.log(`✗ ${file} missing`);
        }
    });
}

// Run the copy functions
console.log('Starting build process...');
copyBlockJson();
copyViewJs();
checkBuildFiles();
console.log('Build process completed!'); 