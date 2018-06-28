---
title: Architecture
group: Getting started
order: 3
---

## DOM

The q-grid internally uses basic DOM table elements, but there is no any component or service which works with core DOM directly. The q-grid populates an abstraction called `DOM Table` which encapsulates any low-level work with core DOM. This abstraction benefits:

* Simple access to the columns, rows and cells. Work with `DOM Table` is alike to use 2d array instead of boilerplate selectors.
* Development transparency of the fixed header, footer, rows and columns.
* No worries about how to handle row and column spans.
* Style API maintenance becomes easy, smooth and fast.
* Everything can be virtualized without writing much of special code.

## The Grid Model

The q-grid introduces work item called `model`. In development terms the q-grid model can be described as a data-driven reactive state storage

> Note that q-grid model implements `immutable` pattern, to change any model property a new instance should be created.

```javascript
// Works
myModel.dataChanged.on(e => alert('It works!'));
myModel.data({ rows: rows.concat(newRow) }); 

// Doesn't work
myModel.dataChanged.on(e => alert('Never happens'));

const { rows } = myModel.data();
rows.push(newRow);
```

There are two 2 to obtain access to the q-grid model. One of them is to use `ViewChild` selector and retrieve model from the `GridComponent`, another to add `Grid` service to the q-grid host component and create a new model.

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

## The reactive idea

Lets look how model changes can be handled.

* By using `on` method, if the event fired before subscription, it will be lost for the new handler.

```javascript
gridModel.data({ rows: myRows });
gridModel.dataChanged.on(e => /* :-( */));
```

* By using `watch` method, if the event fired before subscription, the q-grid will artificially emit the latest event argument to the added handler.

```javascript
gridModel.data({ rows: myRows });
gridModel.dataChanged.watch(e => /* :-) */);
```

## Plugins

The main benefit of the q-grid model concept is a tight control over the q-grid state. Model instance becomes an entry point for the q-grid behavior transformations. The plugin system uses this feature to be simple and clear. Along with `DOM table`, plugins can be designed as standalone units without any q-grid internal infrastructure knowledge. Note that all components except table core units are plugins.

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

## Data Pipe

The q-grid pipe is a series of methods that grid invokes asynchronously anytime refresh is required. Every pipe in the series gets data from previous one, handles it and passes to the next one. This basic concept allows to modify how data rows are processed to display the data. Here is the default pipeline:

```typescript
[
   qgrid.pipe.data,
   qgrid.pipe.filter,
   qgrid.pipe.sort,
   qgrid.pipe.memo,
   qgrid.pipe.group, 
   qgrid.pipe.pivot,
   qgrid.pipe.column,
   qgrid.pipe.pagination,
   qgrid.pipe.view
];
```
