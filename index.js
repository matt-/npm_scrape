
const ChangesStream = require('changes-stream');
const Package = require('nice-package')

var start = 5199747;

var defaults = {
  db: 'https://replicate.npmjs.com',
  include_docs: true,
  //conflicts: true
  since: start
}


var changes = new ChangesStream(defaults);

changes.on('data', function (change) {
    //console.log(change);
    if(change.doc.name){
        var pkg = new Package(change.doc);
        
        if (!pkg.valid) return
            
        console.log(pkg.name + " " + change.seq)
        Object.keys(change.doc.versions).map((v) => {
            let item = change.doc.versions[v];
            if(item.dist){
                console.log(`\t${item.version} - ${item.dist.shasum}`)
            }
        })
    } 
});