
var File = require("./basicfileop")
var Tree = {};
Array.prototype.remove=function(index){  
  var len = this.length;
  for (var i = index; i < len  ; i++)
  {
    this[i] = this[i+1];
  }
  this.pop();
};
Tree.newnode = function(path, ws, treeD, treeP, callback) {
      console.log(ws);
      console.log("new node");
      var nowtree = treeD;
      var nowtreeP = treeP;
      path.split('\.').forEach(function(foldername) {
        var nexttree = nowtree;
        var nexttreeP = nowtreeP;
        console.log("in splite")
        console.log(foldername)
        console.log(nowtreeP);
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
      console.log(nowtree);
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
        callback(null);
      }
      else{
        console.log(ws);
        newnode = {
          fid: ws.id,
          isFolder : 0
        }
        console.log("add node");
        console.log(newnode);
        File.infobyid(ws.id, function(err,info) {
            if (err) {
                console.log(err);
                callback(err);
            }
            else{
                console.log(info);
                newnode.text = info.filename;
                newnode.size = info.length;
                nowtree.push(newnode);
                nowtreeP.push(newnode);
                callback(null);
            }
        });
        /*find by id */
      }
     
      
    };
Tree.delnode = function(path, name, treeD, treeP, callback) {
      console.log("new node");
      var nowtree = treeD;
      var nowtreeP = treeP;
      path.split('\.').forEach(function(foldername) {
        var nexttree = nowtree;
        var nexttreeP = nowtreeP;
        console.log("in splite")
        console.log(foldername)
        console.log(nowtreeP);
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
      var indexx=0,index;
      console.log(name);
      nowtree.forEach(function(node) {
        indexx++;
        if (node.text == name) {
            console.log('find');
            index=indexx-1;
            return true;
        } 
      });
      console.log(index);
      console.log(nowtree);
      if (nowtree[index].isFolder == 1){
        //TODO: recursive delete all node;
        nowtree.remove(index); 
        nowtreeP.remove(index);
        console.log(nowtreeP);
        callback(null);
      }
      else
      {
        File.removebyid(nowtree[index].fid, function(error) {
          if (error){
            console.log(error);
          } else {
            nowtree.remove(index);
            nowtreeP.remove(index);
            callback(null);
          }
        });
      }     
    };
Tree.move = function(oldpath, name, newpath, treeD, treeP, callback) {
      console.log("new node");
      var nowtree = treeD;
      var nowtreeP = treeP;
      oldpath.split('\.').forEach(function(foldername) {
        var nexttree = nowtree;
        var nexttreeP = nowtreeP;
        console.log("in splite")
        console.log(foldername)
        console.log(nowtreeP);
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
      var indexx=0,index;
      console.log(name);
      nowtree.forEach(function(node) {
        indexx++;
        if (node.text == name) {
            console.log('find');
            index=indexx-1;
            return true;
        } 
      });
      console.log(index);
      console.log(nowtree);
      var nowtree2 = treeD;
      var nowtreeP2 = treeP;
      newpath.split('\.').forEach(function(foldername) {
        var nexttree = nowtree;
        var nexttreeP = nowtreeP;
        console.log("in splite")
        console.log(foldername)
        console.log(nowtreeP);
        nowtree2.forEach(function(node) {
          if (node.text == foldername) {
            nexttree = node.children;
          }
        });
        nowtreeP2.forEach(function(node) {
          if (node.text == foldername) {
            nexttreeP = node.children;
          }
        });
        nowtree2 = nexttree;
        nowtreeP2 = nexttreeP;
      });
      nowtree2.push(nowtree[index]);
      nowtreeP2.push(nowtreeP[index]);
      nowtree.remove(index); 
      nowtreeP.remove(index);
      callback(null);
    };
Tree.renamenode = function(path, oname, nname, treeD, treeP, callback) {
      console.log("new node");
      var nowtree = treeD;
      var nowtreeP = treeP;
      path.split('\.').forEach(function(foldername) {
        var nexttree = nowtree;
        var nexttreeP = nowtreeP;
        console.log("in splite")
        console.log(foldername)
        console.log(nowtreeP);
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
      var indexx=0,index;
      nowtree.forEach(function(node) {
        indexx++;
        if (node.text == oname) {
            console.log('find');
            index=indexx-1;
            return true;
        } 
      });
      console.log(index);
      console.log(nowtree);
      nowtree[index].text = nname;
      nowtreeP[index].text = nname;
      callback(null);
    };
Tree.buildPrint = function(treeD,callback){
    callback(treeD);
};
module.exports = Tree;