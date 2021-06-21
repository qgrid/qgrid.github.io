---
title: Selection
group: Features
order: 2
---

There are situations when a user need to select rows or cells fortunately q-grid provides rich model to handle selections.

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="rows$ | async" [model]="gridModel">
         <q-grid-columns generation="deep"></q-grid-columns>
      </q-grid>
      `
})
export class MyComponent implements AfterViewInit {
   rows$ = this.dataService.getRows();
   gridModel = this.qgrid.model();

   constructor(
      private dataService: MyDataService,
      private qgrid: Grid
   ) {
   }

   ngAfterViewInit() {
      this.gridModel.selection({
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

* Use `single` mode when only one row/column could be selected.
* Use `singleOnly` mode when only one row/column could be selected and prevent unselecting by repeating clicks or key events.
* Use `multiple` mode when several rows/columns could be selected.
* Use `range` mode when drag and drop selection should be turned on.

```typescript
gridModel.selection({
   mode: 'multiple'
});
```

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
   template: '<q-grid [model]="gridModel"></q-grid>'
})
export class MyComponent implements AfterViewInit {
   gridModel = this.qgrid.model();

   constructor(private qgrid: Grid) {}

   ngAfterViewInit() {
      this.gridModel.selectionChanged.on((e) => {
         if (e.hasChanges('items')) {
            const { items } = e.state;
            console.log(items);
         }
      });
   }
}
```

## How to restrict selection only on checkbox click?

Set selection `area` property to `custom` if clicking to q-grid body should not lead to row selection.

## How to prevent unselecting if row was clicked again?

If `singleOne` mode is not a case use `selectionChange` event. Next lines prevent unselecting of row that was double clicked.

```typescript
gridModel.selectionChanged.on((e) => {
   const change = e.changes['items'];
   if (change) {
      const { newValue, oldValue } = change;
      const noSelection = !newValue.length;
      if (noSelection) {
         gridModel.selection({
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

Sometimes it's required to fill selection items properties with something different from just row references. To override default behavior selection `key` property could be overridden.

```typescript
gridModel.selection({
   key: {
      row: (row) => row.myNumberId,
      column: (column) => column.key
   }
});

const rowIds = [0, 1, 4];
gridModel.selection({
   items: rowIds
});
```

## How to disable particular rows from being selected?

Use `toggle` command to disable particular checkboxes.

```typescript
gridModel.selection({
   toggle: new Command({
      canExecute: (e) => {
         const target = e.items[0];
         return target.gender === 'male';
      }
   })
});
```

## What shortcuts does selection implement by default?

* `space|shift+space` - toggle row.
* `shift+up` - toggle previous row.
* `shift+down` - `toggle next row.
* `ctrl+space` - toggle column.
* `shift+right` - toggle next column.
* `shift+left` - toggle previous column.
* `ctrl+a` - select all.

## How to override default selection shortcuts?

Use `shortcut` property from selection model.

```typescript
gridModel.selection({
   shortcut: {
      ...model.selection().shortcut,
      toggleRow: 'space'
   },
});
```

## How to handle click events?

q-grid does not provide custom click event, but it's always possible to use standard `(click)` directive. Use selection and click `$event` to identify what being clicked.

```html
<q-grid (click)="onClick($event)"></q-grid>
```
