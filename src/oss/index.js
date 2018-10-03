const oss = require('ali-oss');
const client = oss({
  accessKeyId: process.env.ACCESSKEY_ID,
  accessKeySecret: process.env.ACCESSKEY_SECRET,
  bucket: process.env.BUCKET,
  region: process.env.OSS_REGION
});
async function list () {
    try {
      let result = await client.get('blog/skill/frontEnd/angular-dynamic-form.md', 'localfile.md')
      console.log(result)
    } catch (err) {
      console.log (err)
    }
  }
  list();
 