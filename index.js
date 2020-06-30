const rootNode1 = {
  name: 'Level 0',
  children: [],
  parent: null
};

const level1Child = {
  name: 'Level 1',
  children: [],
  parent: rootNode1
};

const level1AChild = {
  name: 'Level 1A',
  children: [],
  parent: level1Child
};

const level1BChild = {
  name: 'Level 1B',
  children: [],
  parent: level1Child
};

const level1B2Child = {
  name: 'Level 1B 2',
  children: [],
  parent: level1BChild
};

const level1B3Child = {
  name: 'Level 1B 3',
  children: [],
  parent: level1BChild
};

const level2Child = {
  name: 'Level 2',
  children: [],
  parent: rootNode1
};

rootNode1.children.push(level1Child);
rootNode1.children.push(level2Child);

level1Child.children.push(level1AChild);
level1Child.children.push(level1BChild);

level1BChild.children.push(level1B2Child);
level1BChild.children.push(level1B3Child);


const rootNode2 = {
  name: 'Another root level',
  children: [],
  parent: null
};

const subLevel3Child = {
  name: 'Sub Level 3',
  children: [],
  parent: rootNode2
};

const subLevel4Child = {
  name: 'Sub Level 4',
  children: [],
  parent: rootNode2
};

rootNode2.children.push(subLevel3Child);
rootNode2.children.push(subLevel4Child);

const subLevel4AChild = {
  name: 'Sub Level 4A',
  children: [],
  parent: subLevel4Child
};

subLevel4Child.children.push(subLevel4AChild);

const nodes = [
  rootNode1,
  rootNode2
];

function App() {
  return <WorkFlowyList nodes={nodes} />;
}

function WorkFlowyList({nodes, depth = 0}) {
  const [currentDepth, setDepth] = React.useState(depth);
  const [currentPath, setPath] = React.useState([]);
  const handleChildSelect = (depth, id) => {
    setDepth(depth + 1);
    setPath(currentPath.concat(id));
  };
  const foundNode = findNodeFromPath(nodes, currentPath);
  const title = foundNode ? foundNode.name : 'None';
  return (
    <div style={{margin: '0 auto', paddingTop: '10vh', maxWidth: 660}}>
      <BreadCrumbsNavigation
        nodes={nodes}
        path={currentPath}
        currentDepth={currentDepth}
      />
      <h1 style={title === 'None' ? {color: 'lightgray'} : {}}>{title}</h1>
      <TreeList
        nodes={foundNode ? foundNode.children : nodes}
        depth={depth}
        onChildSelect={handleChildSelect}
      />
    </div>
  )
}

function findNodeFromPath(nodes, path) {
  const recurse = (currentNodes, pathIndex, previousNode = null) => {
    if (pathIndex === path.length) {
      return previousNode;
    }
    const name = path[pathIndex];
    const nextNode = currentNodes.find(n => n.name === name);
    return recurse(nextNode.children, pathIndex + 1, nextNode); 
  }
  if (path.length === 0) {
    return undefined;
  }
  return recurse(nodes, 0);
}

function BreadCrumbsNavigation({path}) {
  if (path.length === 0) {
    return <ul style={{listStyleType: 'none', color: 'white'}}><li>.</li></ul>
  }
  return (
    <ul style={{listStyleType: 'none'}}>
      {path.map((segment, index) => <BreadCrumb key={index} isFirstSegment={index === 0}>{segment}</BreadCrumb>)}
    </ul>
  );
}

function BreadCrumb({children, isFirstSegment}) {
  const margin = isFirstSegment ? 0 : 8;
  return (
    <li style={{display: 'inline-block', marginLeft: margin}}>
      {!isFirstSegment && <span style={{display: 'inline-block', marginRight: margin}}>›</span>}
      <a>{children}</a>
    </li>
  );
}

function TreeList({
  nodes,
  onChildSelect,
  depth = 0
}) {
  if (nodes.length === 0) {
    return null;
  }

  return (
    <ul>
      {
        nodes.map((node, index) => (
          <li key={index}>
            <button
              onClick={() => onChildSelect(depth, node.name)}
              disabled={node.children.length === 0}>
              {depth}: {node.name}
            </button>
          </li>
        ))
      }
    </ul>
  );
}

function getPath(node) {
  const recurse = (currentNode, path = []) => {
    if (!currentNode.parent) {
      return path;
    }
    const nextPath = path.concat(currentNode.parent.name);
    return recurse(currentNode.parent, nextPath);
  };
  const path = recurse(node, []);
  return path.reverse();
}


ReactDOM.render(<App />, document.getElementById('root'));
