
var Tree = {};
Tree.newnode = function(path, ws, treeD, treeP, callback) {
      console.log(path);
      console.log("new node");
      var nowtree = treeD;
      var nowtreeP = treeP;
      path.split('.', function(foldername) {
        var nexttree;
        var nexttreeP;
        nowtree.forEach(function(node) {
          if (node.text == foldername) {
            nexttree = node.children;
          }
        });
        nowtreeP.forEach(function(node) {
          if (node.text == foldername) {
            nexttreeP = node.children;
          }
        });
        nowtree = nexttree;
        nowtreeP = nexttreeP;
      });
      var newnode;
      console.log("find path ok");
      if (ws.isFolder == 1)
      {
        console.log("isFloder");
        newnode = {
          text: ws.filename,
          children : [],
          isFolder : 1
        }
        nowtree.push(newnode);
        nowtreeP.push(newnode);
        console.log("pushed");
        callback();
      }
      else{
        newnode = {
          text: ws.filename,
          fid: ws.id,
        }
        /*find by id */
      }
     
      
    };
Tree.buildPrint = function(treeD,callback){
    
}
module.exports = Tree;