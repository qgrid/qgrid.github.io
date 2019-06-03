---
title: Selection
group: Features
order: 2
---

There are situations when the end user need to select rows or cells, q-grid provides rich model to handle selection.

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="rows$ | async">
         <q-grid-columns generation="deep"></q-grid-columns>
      </q-grid>
      `
})
export class MyComponent implements AfterViewInit {
   @ViewChild(GridComponent) myGrid: GridComponent;   
   rows$: Observable<[]>;

   constructor(dataService: MyDataService) {
      this.rows$ = dataService.getRows();
   }

   ngAfterViewInit() {
      const { model } = this.myGrid;

      model.selection({
         unit: 'row',
         mode: 'multiple',
         area: 'body'            
      });
   }
}
```

{% docEditor "github/qgrid/ng2-example/tree/select-row-basic/latest" %}

## How to change selection mode?

Use `mode` property to change selection mode.

* Use  `single` mode when only one row/column should be selected.
* Use `multiple` mode when several rows/columns could be selected.
* Use `range` mode when drag and drop selection should be turned on.

## How to change what should be selectable?

Use `unit` property to say q-grid what is a selectable element.
   
* Use `row` value when row can be selected by clicking on checkbox.
* Use `cell` value when cell can be selected by click.
* Use `column` value when column can be selected by click.
* Use `mix` unit to make both rows and cells selectable.

## How to listen selection changes?

Use q-grid model to get list of selected items.

```typescript
@Component({
   selector: 'my-component',
   template: '<q-grid></q-grid>'
})
export class MyComponent implements AfterViewInit {
   @ViewChild(GridComponent) myGrid: GridComponent;   

   ngAfterViewInit() {
      const { model } = this.myGrid;

      model.selectionChanged.on(e => {
         if (e.hasChanges('items')) {
            const { items } = e.state;
            console.log(items);
         }
      });
   }
}
```

## How to restrict selection only on checkbox click?

If clicking to q-grid body should not lead to row selection set selection `area` property to `custom`.

## How to prevent unselecting if row was clicked again?

Use `change` information to manipulate with logic of selection. Next lines prevent unselecting of row that was double clicked.

```typescript
model.selectionChanged.on(e => {
   const change = e.changes['items'];
   if (change) {
      const { newValue, oldValue } = change;
      if (!newValue.length) {
         model.selection({
            items: oldValue
         });
      }
   }
});
```

## How to hide column with check-boxes?

Use `[isVisible]` input of to hide/show select column.

```html
<q-grid selectionUnit="row">
   <q-grid-columns>
      <q-grid-column type="select" [isVisible]="false">
      </q-grid-column>
   </q-grid-columns>
</q-grid>
```

## How to select rows by id?

To override what is located in `items` property selection `key` could be overridden.

```typescript
model.selection({       
   key: {
      row: row => row.myNumberId,
      column: column => column.key
   }
});

model.selection({
   items: [0, 1, 2]
});
```