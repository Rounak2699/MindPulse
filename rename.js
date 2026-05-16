const fs = require('fs');
const ordered = [];
for (let s = 44; s <= 46; s++) {
  ordered.push(`WhatsApp Image 2026-05-03 at 1.47.${s} PM.jpeg`);
  ordered.push(`WhatsApp Image 2026-05-03 at 1.47.${s} PM (1).jpeg`);
  ordered.push(`WhatsApp Image 2026-05-03 at 1.47.${s} PM (2).jpeg`);
}
ordered.forEach((f, i) => {
  if (fs.existsSync('photos/' + f)) {
    fs.renameSync('photos/' + f, `photos/level${i + 1}.jpeg`);
    console.log(f + ' -> level' + (i + 1) + '.jpeg');
  }
});
