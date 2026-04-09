const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const rootDir = path.resolve(__dirname, '..');

const filesToSetup = [
  {
    name: 'Root Environment',
    file: path.join(rootDir, '.env'),
    example: path.join(rootDir, '.env.example')
  },
  {
    name: 'Frontend Environment',
    file: path.join(rootDir, 'web', '.env'),
    example: path.join(rootDir, 'web', '.env.example')
  }
];

async function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function setup() {
  console.log('🛠️  Initializing interactive cross-platform setup...');

  for (const item of filesToSetup) {
    if (fs.existsSync(item.file)) {
      console.log(`✅ ${item.name} already exists.`);
      continue;
    }

    if (!fs.existsSync(item.example)) {
      console.log(`⚠️  ${item.name} example (${item.example}) not found. Skipping.`);
      continue;
    }

    const response = await ask(`❓ ${item.name} is missing. Would you like to create it from example? (y/n): `);
    if (response.toLowerCase() === 'y' || response.toLowerCase() === 'yes' || response === '') {
      fs.copyFileSync(item.example, item.file);
      console.log(`✅ Created ${item.name} from example.`);
    } else {
      console.log(`❌ Skipped ${item.name} creation. Ensure you create it manually.`);
    }
  }

  rl.close();
  console.log('🚀 Setup sequence complete.');
}

setup();
