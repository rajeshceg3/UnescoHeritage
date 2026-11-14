const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const curated=vm.runInNewContext(fs.readFileSync('curated.js','utf8')+'; curatedSites');
assert.equal(curated.length,6);
for(const site of curated){for(const line of [...Object.values(site.lenses),...site.moments])assert.doesNotMatch(line,/\?|\bask\b|\bquestion\b/i)}
assert.doesNotMatch(fs.readFileSync('index.html','utf8'),/>\s*A question\s*</);
assert.doesNotMatch(fs.readFileSync('script.js','utf8'),/Name one question|What connects this place|Which events or traditions|Which detail would you/);
console.log('PASS six quiet curated places and generic catalog narration, no editorial answer prompts');
