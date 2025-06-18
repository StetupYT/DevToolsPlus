#!/usr/bin/env node

const fs = require('fs');

const filePath = process.argv[2];
if (!filePath) {
  console.error('Usage: json-to-env <path-to-json-file>');
  process.exit(1);
}

try {
  const jsonContent = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(jsonContent);

  const envLines = Object.entries(data).map(([key, value]) => `${key}=${value}`);
  const envContent = envLines.join('\n');

  const outputFile = process.argv[3] || '.env';
  fs.writeFileSync(outputFile, envContent);

  console.log(`✅ .env file created at ${outputFile}`);
} catch (err) {
  console.error('❌ Error reading or parsing JSON file:', err.message);
  process.exit(1);
}
