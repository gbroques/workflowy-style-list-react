const nodes = [
  {
    name: 'Level 0',
    children: [
      {
        name: 'Level 1',
        children: [
          {
            name: 'Level 1A',
            children: []
          },
          {
            name: 'Level 1B',
            children: []
          }
        ]
      },
      {
        name: 'Level 2',
        children: []
      }
    ]
  },
  {
    name: 'Another root level',
    children: []
  }
];

function App() {
  return <TreeList nodes={nodes} />;
}

function TreeList({nodes, depth = 0}) {
  const [currentDepth, setDepth] = React.useState(depth);
  if (nodes.length === 0) {
    return null;
  }
  const handleNextDepth = React.useCallback(event => {
    event.stopPropagation();
    const nextDepth = currentDepth + 1;
    setDepth(nextDepth);
  }, [currentDepth]);
  return (
    <ul>
      {
        nodes.map((node, index) => (
          <li key={index}>
            <button
              onClick={handleNextDepth}
              disabled={node.children.length === 0}>
              {depth}: {node.name}
            </button>
            {
              currentDepth > depth &&
                <TreeList nodes={node.children} depth={depth + 1} />
            }
          </li>
        ))
      }
    </ul>
  );
}


ReactDOM.render(<App />, document.getElementById('root'));
