---
title: Architecture
type: guide
group: Getting started
order: 3
---


## DOM

q-grid uses basic DOM table elements, but there is no any component or service which works with core DOM directly. q-grid has an abstraction called `DOM Table` that encapsulates any low-level work with core DOM. The abstraction benefits:

* Simple access to the columns, rows and cells. Use it is alike to use 2d array instead of boilerplate selectors.
* Development transparency of the fixed header, footer, rows and columns, colspans and rowspans.
* Required Style API maintenance is simple, smooth and fast.
* Everything can be virtualized without special code.

## Grid Model

q-grid introduces work item called `model`. In development terms q-grid model is a data-driven state storage with some basic constraints:

* There is only one way to get/set state.
* Model state is immutable.

```javascript
// Works
myModel.dataChanged.on(e => alert('It works!'));
myModel.data({ rows: rows.concat(newRow) }); 

// Doesn't work
myModel.dataChanged.on(e => alert('Never happens'));

const { rows } = myModel.data();
rows.push(newRow);
```

To setup `q-grid model` just add `Grid` service to the component and create your own model. Further typescript will force you to do the right things.

```typescript
import { Grid, GridModel } from 'ng2-qgrid';

@Component({
   selector: 'my-component',
   template: '<q-grid [model]="myModel"></q-grid>'
})
export class MyComponent {
   myModel: GridModel;

   constructor(qgrid: Grid, dataService: MyDataService) {
      this.myModel = qgrid.model();
      dataService
            .getRows()
            .subscribe(rows => this.myModel.data({ rows }));
   }
}
```

## Plugins

The main benefit of the q-grid model concept is a tight control over the q-grid state. Model instance becomes an entry point for the q-grid behavior transformations. The plugin system uses this feature to be simple and clear. Along with `DOM table`, plugins can be designed as standalone units without any q-grid internal infrastructure knowledge.