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

function TreeList({nodes}) {
  if (nodes.length === 0) {
    return null;
  }
  return (
    <ul>
      {
        nodes.map((node, index) => (
          <li key={index}>
            {node.name}
            <TreeList nodes={node.children} />
          </li>
        ))
      }
    </ul>
  );
}


ReactDOM.render(<App />, document.getElementById('root'));
