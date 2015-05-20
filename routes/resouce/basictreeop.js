function Tree(tree) {
  this.data = tree.clone();

}
Tree.methods.newfile = function(path, ws, callback) {
  var nowtree = this.data;
  path.split('.', function(foldername) {
    var nexttree;
    nowtree.forEach(function(node) {
      if (node.text == foldername) {
        nexttree = node.children;
      }
    });
    nowtree = nexttree;
  });
  var newfilenode = {
    text: ws.filename,
    size: "**",
    fid: ws.id
  }
  nowtree.children.push(newfilenode);
  callback();
}
Tree.methods.complete= function() {
  
}
module.export = Tree;