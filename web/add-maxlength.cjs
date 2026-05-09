const fs = require('fs');
const path = require('path');

const filesToProcess = [
  'main-banner/page.tsx',
  'main-services/page.tsx',
  'work-steps/page.tsx',
  'about-us/page.tsx',
  'sectors/page.tsx',
  'testimonials/page.tsx'
];

const basePath = path.join('c:', 'www', 'portfolio', 'avantcargo', 'web', 'src', 'app', 'admin', 'home');

filesToProcess.forEach(file => {
  const fullPath = path.join(basePath, file);
  let content = fs.readFileSync(fullPath, 'utf8');

  // Regex to find Input and Textarea tags
  // We need to find defaultValue="..." or value={...} or placeholder="..."
  // and inject maxLength={...}

  // We will just do a simple replacement for now, replacing `<Input ` with `<Input maxLength={X} `
  // But wait, the user wants it to be based on the content length + 20%.
  
  // A safer approach: parse the JSX tag, look for defaultValue="something" or placeholder="something"
  const tagRegex = /<(Input|Textarea)\s+([^>]+)>/g;
  
  content = content.replace(tagRegex, (match, tag, attributes) => {
    // If it already has maxLength, skip
    if (attributes.includes('maxLength=')) {
      return match;
    }

    let lengthLimit = tag === 'Textarea' ? 250 : 80; // default limits

    // Try to find defaultValue="str" or placeholder="str"
    const strMatch = attributes.match(/(?:defaultValue|placeholder)="([^"]+)"/);
    if (strMatch && strMatch[1]) {
      const strLen = strMatch[1].length;
      lengthLimit = Math.max(lengthLimit, Math.ceil(strLen * 1.2)); // +20%
      // Add a bit more buffer for very short strings
      if (strLen < 10) lengthLimit = Math.max(lengthLimit, 20);
    } else {
        // if no string literal, maybe value={...}
        // we keep the default limits
        if (tag === 'Input' && attributes.includes('type="number"')) {
            lengthLimit = 5; // e.g. stars 1-5
        } else if (tag === 'Input') {
            lengthLimit = 80;
        } else {
            lengthLimit = 300;
        }
    }

    // specific field overrides based on class name or type
    if (attributes.includes('text-[10px] text-center')) {
      lengthLimit = 40; // stats label
    }
    if (attributes.includes('w-24 text-center')) {
      lengthLimit = 15; // stats value
    }
    
    // Inject maxLength
    return `<${tag} maxLength={${lengthLimit}} ${attributes}>`;
  });

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`Processed ${file}`);
});
