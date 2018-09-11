---
title: Architecture
group: Getting started
order: 3
---

## DOM

The q-grid internally uses basic DOM table elements, but there is no any component or service which works with core DOM directly. The q-grid populates an abstraction called `DOM Table` which encapsulates any low-level work with core DOM. The benefits:

* Simple access to the columns, rows and cells. Work with `DOM Table` just like using 2d array instead of complex selectors.
* Development transparency of the fixed header, footer, rows and columns.
* Much easier to handle row and column spans.
* Style API maintenance becomes easy and fast.
* Virtualization can be engaged without special code writing.

## The Grid Model

The q-grid introduces work item called `model`. In development terms the q-grid model can be described as a data-driven reactive state storage

> Note that q-grid model implements `immutable` pattern, to change any model property a new instance should be created.

```javascript
// Works
gridModel.dataChanged.on(e => alert('It works!'));
gridModel.data({ rows: rows.concat(newRow) }); 

// Doesn't work
gridModel.dataChanged.on(e => alert('Never happens'));

const { rows } = gridModel.data();
rows.push(newRow);
```

There are 2 ways to obtain access to the q-grid model. One of them is to use `ViewChild` selector and retrieve model from the `GridComponent` in ngAfterViewInit hook, another, to add `Grid` service to the host component and create a new q-grid model.

```typescript
import { Grid, GridModel } from 'ng2-qgrid';

@Component({
   selector: 'my-component',
   template: '<q-grid [model]="gridModel"></q-grid>'
})
export class MyComponent {
   gridModel: GridModel;

   constructor(qgrid: Grid, dataService: MyDataService) {
      this.gridModel = qgrid.model();
      dataService
            .getRows()
            .subscribe(rows => this.gridModel.data({ rows }));
   }
}
```

## Reactive Idea

Any registered entity in the model gets own `Changed` event hook, which can be used to handle model modifications. There are 2 ways to work with event handlers.

* By using `on` method, if the event fired before subscription, it will be lost for the new handler.

```javascript
gridModel.data({ rows: myRows });
gridModel.dataChanged.on(e => /* :-( */));
```

* By using `watch` method, if the event fired before subscription, the q-grid will artificially emit the latest event argument to a new handler.

```javascript
gridModel.data({ rows: myRows });
gridModel.dataChanged.watch(e => /* :-) */);
```

## Plugins

The main benefit of the q-grid model concept is a tight control over the q-grid state. The model instance becomes an entry point for the q-grid behavior transformations. The plugin system uses this feature to be simple and clear. Along with `DOM table`, plugins can be designed as standalone units without any q-grid internal infrastructure knowledge. Note that all components except table core units are plugins.

## Template System

All plugins and cell renderers use q-grid template primitives. The basic concept is to utilize pair of `ng-container` and `ng-template` instances by using unique identifiers.

* Use `ng-template[key]` to add ng-template content to the internal template store under the `"key"` id.

```html
<ng-template key="toolbar-top.tpl.html">
	<q-grid-caption></q-grid-caption>
</ng-template>
```

* `ng-template[for]` acts the same as `ng-template[key]`, but has a lower priority and wont rewrite `"key"` templates in the store. Client code need to use it for templates safety.

```html
<q-grid-column type="text">
      <ng-template for="body" let-$cell>
	      {{$cell.value}}
	</ng-template>
</q-grid-column>
```

* Use `ng-container[key]` to replace ng-container content with a `ng-template[key|for]` keeping.

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

## The Scene

A class that contains the q-grid pipe results, actually `qgrid.pipe.view` pipe fills the scene, further the q-grid renderer outputs rows and columns using the scene model. Another attribute of the scene is `status`, it's used by internal routines to manage the q-grid readiness.

## Suggested links
* [How to build a plugin](plugin.html)
* [How to make a custom theme](theme.html)