import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pathToFileURL } from 'url';
import sequelize from '../config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = {};

const files = fs.readdirSync(__dirname).filter(file => file.endsWith('.js') && file !== 'index.js');

console.log(`Loading ${files.length} model files...`);

for (const file of files) {
  try {
    const modelModule = await import(pathToFileURL(path.join(__dirname, file)).href);
    const modelDef = modelModule.default(sequelize, sequelize.Sequelize.DataTypes);
    db[modelDef.name] = modelDef;
    console.log(`✅ Loaded model: ${modelDef.name}`);
  } catch (error) {
    console.error(`❌ Error loading model ${file}:`, error.message);
  }
}

console.log(`\nTotal models loaded: ${Object.keys(db).length}`);
console.log('\nSetting up model associations...');

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    try {
      db[modelName].associate(db);
      console.log(`✅ Associated: ${modelName}`);
    } catch (error) {
      console.error(`❌ Error associating ${modelName}:`, error.message);
    }
  }
});

db.sequelize = sequelize;
db.Sequelize = sequelize.Sequelize;

export default db;
