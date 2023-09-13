const fs = require('fs');
const glob = require('glob');

const undoRename = (filePath) => {
  const backupPath = `${filePath}.backup`;
  if (fs.existsSync(backupPath)) {
    const originalContent = fs.readFileSync(backupPath, 'utf-8');
    fs.writeFileSync(filePath, originalContent, 'utf-8');
    fs.unlinkSync(backupPath);  // Delete the backup file
  }
};

const filesToUndo = glob.sync('**/*.backup', {
  nodir: true,
  ignore: ['node_modules/**/*', '.git/**/*'],
});

// Restore original content from backup files
filesToUndo.forEach((backupPath) => {
  const originalFilePath = backupPath.replace('.backup', '');
  undoRename(originalFilePath);
});

console.log("Successfully undone the renaming.");
