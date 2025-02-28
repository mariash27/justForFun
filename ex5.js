const tree = {
    value: "root",
    children: [
      {
        value: "child1",
        children: [
          { value: "child1.1", children: [] },
          { value: "child1.2", children: [] }
        ]
      },
      {
        value: "child2",
        children: [
          {
            value: "child2.1",
            children: [
              { value: "child2.1.1", children: [] }
            ]
          }
        ]
      }
    ]
  };

  
function treeStructure(tree, level = 0){
    let spaces = '  '.repeat(level)
    console.log(`${spaces}- ${tree.value}`)
    
    if(tree.children && tree.children.length > 0){
        for(let i = 0; i<tree.children.length; i++){
        let currentNode = tree.children[i]
        treeStructure(currentNode, level + 1)
    }
    }
    
}

function countNodes(tree){
    let count = 1;
    if(tree.children && tree.children.length > 0 ){
        for(let i = 0; i < tree.children.length; i++ ){
            let currentNode = tree.children[i]
            count += countNodes(currentNode)
        }
        
    }
    return count
}

treeStructure(tree)

console.log(`Total:${countNodes(tree)}`)