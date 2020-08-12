const { exec } = require('child_process');

const THEMES = [
  'Eagle Dark',
  'Falcon Dark'
];

exec('mkdir out/');

THEMES.forEach(theme => {
  const themeName = theme.split(' ').join('\\ ');
  const outPath = `./out/${themeName}`;
  exec(`mkdir ${outPath}`);

  const xmlPath = `./Themes/${themeName}/index.xml`;
  const iclsPath = `./out/${themeName}/${themeName}.icls`;

  // Build .icls
  exec(`cp ./${xmlPath} ./${iclsPath}`);

  // Build .jar
  exec(`cp ./${xmlPath} ./${outPath}`);
  exec(`touch ./${outPath}/theme`);
  exec(`jar cfM ./${outPath}/${themeName}.jar ./${outPath}/theme`);

  // Clean
  setTimeout(() => exec(`rm ./${outPath}/index.xml`), 500); // wating for building... 
  setTimeout(() => exec(`rm ./${outPath}/theme`), 500);
});