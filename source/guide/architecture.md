---
title: Architecture
type: guide
group: Getting started
order: 3
---


## DOM

q-grid uses basic DOM table elements, but there is no any component or service which works with core DOM directly. q-grid has an abstraction called `DOM Table` that encapsulates any low-level work with core DOM. The abstraction benefits:

* Simple access to the columns, rows and cells. Use it is alike to use 2d array instead of boilerplate selectors.
* Development transparency of the fixed header, footer, rows and columns, colSpans and rowSpans.
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

The main benefit of the q-grid model concept is a tight control over the q-grid state. Model instance becomes an entry point for the q-grid behavior transformations. The plugin system uses this feature to be simple and clear. Along with `DOM table`, plugins can be designed as standalone units without any q-grid internal infrastructure knowledge. Note, that all components except table core units are plugins.

## Template System

All plugins including cell renderers are using q-grid template system. The basic concept is to utilize pair of `ng-container` and `ng-template` primitives by using unique identifiers.

* `ng-template[key]` q-grid adds the ng-template content to the internal template store under the `"key"` id.

```html
<ng-template key="toolbar-top.tpl.html">
	<q-grid-caption></q-grid-caption>
</ng-template>
```

* `ng-template[for]` acts the same as `ng-template[key]`, but `"for"` id has a lower priority and wont rewrite `"key"` id in the template store. q-grid client code is required to use it for the basic templates safety.

```html
<q-grid-column type="text">
      <ng-template for="body" let-$cell>
	      {{$cell.value}}
	</ng-template>
</q-grid-column>
```

* `ng-container[key]` q-grid replaces the ng-container and its content with a `ng-template[key|for]` keeping.

```html
<ng-container key="toolbar-top.tpl.html">
</ng-container>
```
