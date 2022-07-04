---
title: Selection
group: Features
order: 2
---

- [How to change selection mode?](#how-to-change-selection-mode)
- [How to change what should be selectable?](#how-to-change-what-should-be-selectable)
- [How to listen selection changes?](#how-to-listen-selection-changes)
- [How to restrict selection only on checkbox click?](#how-to-restrict-selection-only-on-checkbox-click)
- [How to prevent unselecting if row was clicked again?](#how-to-prevent-unselecting-if-row-was-clicked-again)
- [How to hide column with check-boxes?](#how-to-hide-column-with-check-boxes)
- [How to select rows by id?](#how-to-select-rows-by-id)
- [How to disable particular rows from being selected?](#how-to-disable-particular-rows-from-being-selected)
- [What shortcuts does selection implement by default?](#what-shortcuts-does-selection-implement-by-default)
- [How to override default selection shortcuts?](#how-to-override-default-selection-shortcuts)
- [How to handle click events?](#how-to-handle-click-events)

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

<a name="how-to-change-selection-mode" href="#how-to-change-selection-mode">
   How to change selection mode?
</a>

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

<a name="how-to-change-what-should-be-selectable" href="#how-to-change-what-should-be-selectable">
   How to change what should be selectable?
</a>

Use `unit` property to say q-grid what is a selectable element.
   
* Use `row` value when row can be selected by clicking on checkbox.
* Use `cell` value when cell can be selected by click.
* Use `column` value when column can be selected by click.
* Use `mix` unit to make both rows and cells selectable.

<a name="how-to-listen-selection-changes" href="how-to-listen-selection-changes">
   How to listen selection changes?
</a>

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

<a name="how-to-restrict-selection-only-on-checkbox-click" href="#how-to-restrict-selection-only-on-checkbox-click">
   How to restrict selection only on checkbox click?
</a>

Set selection `area` property to `custom` if clicking to q-grid body should not lead to row selection.

<a name="how-to-prevent-unselecting-if-row-was-clicked-again" href="#how-to-prevent-unselecting-if-row-was-clicked-again">
   How to prevent unselecting if row was clicked again?
</a>

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

<a name="how-to-hide-column-with-check-boxes" href="#how-to-hide-column-with-check-boxes">
   How to hide column with check-boxes?
</a>

Use `[isVisible]` input of to hide/show select column.

```html
<q-grid selectionUnit="row">
   <q-grid-columns>
      <q-grid-column type="select" [isVisible]="false">
      </q-grid-column>
   </q-grid-columns>
</q-grid>
```

<a name="how-to-select-rows-by-id" href="#how-to-select-rows-by-id">
   How to select rows by id?
</a>

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

<a name="how-to-disable-particular-rows-from-being-selected" href="#how-to-disable-particular-rows-from-being-selected">
   How to disable particular rows from being selected?
</a>

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

<a name="what-shortcuts-does-selection-implement-by-default" href="#what-shortcuts-does-selection-implement-by-default">
   What shortcuts does selection implement by default?
</a>

* `space|shift+space` - toggle row.
* `shift+up` - toggle previous row.
* `shift+down` - `toggle next row.
* `ctrl+space` - toggle column.
* `shift+right` - toggle next column.
* `shift+left` - toggle previous column.
* `ctrl+a` - select all.

<a name="how-to-override-default-selection-shortcuts" href="#how-to-override-default-selection-shortcuts">
   How to override default selection shortcuts?
</a>

Use `shortcut` property from selection model.

```typescript
gridModel.selection({
   shortcut: {
      ...model.selection().shortcut,
      toggleRow: 'space'
   },
});
```

<a name="how-to-handle-click-events" href="#how-to-handle-click-events">
   How to handle click events?
</a>

q-grid does not provide custom click event, but it's always possible to use standard `(click)` directive. Use selection and click `$event` to identify what being clicked.

```html
<q-grid (click)="onClick($event)"></q-grid>
```
