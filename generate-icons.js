import fs from 'fs';
import path from 'path';

const ICONS_DIR = path.resolve('./src/assets/icons');
const IMAGES_DIR = path.resolve('./src/assets/images');
const OUTPUT_FILE = path.resolve('./src/assets/index.ts');

function toPascalCase(str) {
  return str
    .replace(/[-_](.)/g, (_, c) => c.toUpperCase())
    .replace(/^(.)/, (_, c) => c.toUpperCase());
}

function toCamelCase(str) {
  let name = str
    .replace(/[-_](.)/g, (_, c) => c.toUpperCase())
    .replace(/^(.)/, (c) => c.toLowerCase());

  if (/^\d/.test(name)) {
    name = 'img' + name.charAt(0).toUpperCase() + name.slice(1);
  }

  return name;
}

function generateIcons() {
  if (!fs.existsSync(ICONS_DIR)) return [];

  const files = fs.readdirSync(ICONS_DIR).filter((f) => f.endsWith('.svg'));

  return files.map((file) => {
    const base = path.basename(file, '.svg');
    const name = toPascalCase(base) + 'Icon';
    return `export { default as ${name} } from './icons/${file}?react';`;
  });
}

function generateImages() {
  if (!fs.existsSync(IMAGES_DIR)) return [];

  const files = fs
    .readdirSync(IMAGES_DIR)
    .filter((f) => ['.png', '.jpg', '.jpeg'].includes(path.extname(f).toLowerCase()));

  const imports = files.map((file) => {
    const base = path.basename(file, path.extname(file));
    const varName = toCamelCase(base);
    return `import ${varName} from './images/${file}';`;
  });

  const exports =
    files.length > 0
      ? [
          `\nexport { ${files
            .map((f) => toCamelCase(path.basename(f, path.extname(f))))
            .join(', ')} };`,
        ]
      : [];

  return [...imports, ...exports];
}

function main() {
  const iconExports = generateIcons();
  const imageImports = generateImages();

  const content = [...iconExports, '', ...imageImports].join('\n') + '\n';
  fs.writeFileSync(OUTPUT_FILE, content);
}

main();
