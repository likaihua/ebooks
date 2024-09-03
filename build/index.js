const fs = require('fs');
const path = require('path');

function generateMarkdown(directory) {
  let markdownContent = '# 优质书籍推荐（持续更新中。。。）\n';

  function traverse(currentDirectory) {
    const files = fs.readdirSync(currentDirectory);

    files.forEach((file) => {
      const filePath = path.join(currentDirectory, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        markdownContent += `## ${file}\n`;
        traverse(filePath);
      } else {
        markdownContent += `- [${file}](${filePath.replace(path.resolve(__dirname, '..'), '.')})\n`;
      }
    });
  }

  traverse(directory);

  fs.writeFileSync(path.resolve(__dirname, '..', 'readme.md'), markdownContent);
}

generateMarkdown(path.resolve(__dirname, '..', 'books'));
console.log('dirname', __dirname)
