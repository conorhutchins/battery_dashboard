const fs = require('fs');
const { spawn } = require('child_process');
const path = require('path');

const babelConfigPath = path.join(process.cwd(), 'babel.config.js');
const babelConfigBackupPath = path.join(process.cwd(), 'babel.config.js.bak');

// Check if babel config exists
const hasBabelConfig = fs.existsSync(babelConfigPath);

// Function to handle process exit
function cleanup() {
  if (hasBabelConfig && fs.existsSync(babelConfigBackupPath)) {
    console.log('\nRestoring babel.config.js...');
    fs.renameSync(babelConfigBackupPath, babelConfigPath);
    console.log('Babel config restored.');
  }
}

// Set up cleanup on process exit
process.on('SIGINT', () => {
  cleanup();
  process.exit();
});

process.on('exit', cleanup);

// If babel config exists, temporarily rename it
if (hasBabelConfig) {
  console.log('Temporarily moving babel.config.js to enable Turbopack...');
  fs.renameSync(babelConfigPath, babelConfigBackupPath);
}

// Start Next.js with Turbopack
console.log('Starting Next.js with Turbopack...');
const nextProcess = spawn('npx', ['next', 'dev', '--turbopack'], {
  stdio: 'inherit',
  shell: true
});

nextProcess.on('close', (code) => {
  console.log(`Next.js process exited with code ${code}`);
  cleanup();
}); 