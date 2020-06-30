# WorkFlowy Style List React

A React component for displaying infinitely nestable lists and tree structures in a manageable way similar to the productivity app [WorkFlowy](https://workflowy.com/).

![Demo](demo.gif)

## Features
* Display one level at a time
* Allow infinite drill-down or nesting
* Display where you are in the tree as a bread-crumbs style navigation

## How to Run
1. Install dependencies

   npm install

2. Run the http server

   npx http-server -c-1

3. Navigate to http://127.0.0.1:8080/


## Usage
The `TreeList` component takes the following structure, and renders the below list.

```js
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
  }
];

function App() {
  return <TreeList nodes={nodes} />;
}
```

`App` renders:
```html
<ul>
  <li>
    Level 0
    <ul>
      <li>
        Level 1
        <ul>
          <li>Level 1A</li>
          <li>Level 1B</li>
        </ul>
      </li>
      <li>Level 2</li>
    </ul>
  </li>
  <li>Another root level</li>
</ul>
```