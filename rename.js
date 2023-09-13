const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Assume projectName comes from an environment variable for now
const projectName = process.env.PROJECT_NAME;

// Backup original file before replacing content
const backupOriginalFile = (filePath) => {
  const originalContent = fs.readFileSync(filePath, 'utf-8');
  fs.writeFileSync(`${filePath}.backup`, originalContent, 'utf-8');
};

const replaceProjectName = (filePath) => {
  backupOriginalFile(filePath);  // Backup the file before making changes

  const content = fs.readFileSync(filePath, 'utf-8');
  const newContent = content.replace(/template/g, projectName);
  fs.writeFileSync(filePath, newContent, 'utf-8');
};

const filesToReplace = glob.sync('**/*', {
  nodir: true,
  ignore: ['node_modules/**/*', '.git/**/*'],
});

filesToReplace.forEach((filePath) => {
  replaceProjectName(filePath);
});
