#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const licenseType = process.argv[2];
const authorName = process.argv[3] || 'Anonymous';
const year = new Date().getFullYear();

if (!licenseType) {
  console.error('Usage: license-gen <license> [author]');
  console.error('Supported licenses: MIT, Apache-2.0, GPL-3.0');
  process.exit(1);
}

const licenses = {
  'MIT': `
MIT License

Copyright (c) ${year} ${authorName}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
  `.trim(),

  'Apache-2.0': `
Apache License 2.0

Copyright (c) ${year} ${authorName}

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License...
  `.trim(),

  'GPL-3.0': `
GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007

Copyright (c) ${year} ${authorName}

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License...
  `.trim()
};

if (!licenses[licenseType]) {
  console.error(`❌ License '${licenseType}' not supported.`);
  process.exit(1);
}

fs.writeFileSync('LICENSE', licenses[licenseType]);
console.log(`✅ LICENSE file created using ${licenseType} license.`);
