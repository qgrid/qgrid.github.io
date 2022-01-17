---
title: Row Details
group: Features
order: 9
---
- [How to expand or collapse all row details?](#how-to-expand-or-collapse-all-row-details)
- [How to disable/hide expand button?](#How-to-disable/hide-expand-button)
- [How to show nested q-grid in details template?](#how-to-show-nested-q-grid-in-details-template)
- [How to hide row details expand column?](#how-to-hide-row-details-expand-column)
- [How to expand details on row click or on keyboard event?](#how-to-expand-details-on-row-click-or-on-keyboard-event)
- [Suggested Links](#suggested-links)

There are situations when additional information need to be showing by expanding row, row details can help to handle this.

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="rows$ | async" [model]="gridModel">
         <q-grid-columns generation="deep"></q-grid-columns>

         <q-grid-row>
            <ng-template for="details" let-$cell>
               {{ $cell.row.item.number }}
            </ng-template>
         </q-grid-row>
      </q-grid>
   `
})
export class MyComponent implements AfterViewInit {
   gridModel = this.qgrid.model();
   rows$ = this.dataService.getRows();

   constructor(
      private dataService: MyDataService,
      private qgrid: Grid
   ) {
   }

   ngAfterViewInit() {
      this.gridModel.row({
         unit: 'details',
         mode: 'multiple',
      });
   }
}
```

{% docEditor "github/qgrid/ng2-example/tree/details-row-api/latest" %}

> Use `$cell.row.item` in template to get access to the data row.

<a name="how-to-expand-or-collapse-all-row-details" href="#how-to-expand-or-collapse-all-row-details">
   How to expand or collapse all row details?
</a>

Update `status` property in row model.

```typescript
const { rows } = gridModel.data();
const expand = true;
gridModel.row({
   status: new Map(
      rows.map<[any, RowDetailsStatus]>((x) => [
         x,
         new RowDetailsStatus(expand),
      ])
   ),
});
```

<a name="how-to-disable/hide-expand-button" href="#how-to-disable/hide-expand-button">
   How to disable/hide expand button?
</a>

Use `toggle` command from row model.

```typescript
gridModel.row({
   toggle: new Command({
      canExecute: ({ row }) => false,
   }),
});
```

<a name="how-to-show-nested-q-grid-in-details-template" href="#how-to-show-nested-q-grid-in-details-template">
   How to show nested q-grid in details template?
</a>

Use let-`$cell` to pass data to the function that will return details rows.

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="rows$ | async" [model]="gridModel">
         <q-grid-columns generation="deep">
         </q-grid-columns>

         <q-grid-row>
            <ng-template for="details" let-$cell>
               <q-grid [rows]="getDetailsRows($cell.row.item) | async">
                  <q-grid-columns generation="deep">
                  </q-grid-columns>
               </q-grid>
            </ng-template>
         </q-grid-row>
      </q-grid>
   `
})
export class MyComponent implements AfterViewInit {
   gridModel = this.qgrid.model();
   rows$ = this.dataService.getRows();
   cache = new Map<string, Observable<Atom[]>>();

   constructor(
      private dataService: MyDataService,
      private qgrid: Grid
   ) {
   }

   ngAfterViewInit() {
      this.gridModel.row({
          unit: 'details',
          mode: 'single'
      });
   }

   getDetailsRows(atom: Atom) {
      let rows$ = this.cache.get(atom.phase);
      if (!rows$) {
         const byPhase = row => row.phase === atom.phase;

         rows$ =
            dataService
               .getRows()
               .pipe(
                  map(rows => rows.filter(byPhase))
               ));

         this.cache.set(atom.phase, rows$);
      }

      return rows$;
   }
}
```

{% docEditor "github/qgrid/ng2-example/tree/details-row-grid/latest" %}


<a name="how-to-hide-row-details-expand-column" href="#how-to-hide-row-details-expand-column">
   How to hide row details expand column?
</a>

Use `[isVisible]` attribute of `row-expand` column type.

```typescript
<q-grid [rows]="rows$ | async">
   <q-grid-columns>
      <q-grid-column type="row-expand"
                     [isVisible]="false">
      </q-grid-column>
   </q-grid-columns>
</q-grid>
```

<a name="how-to-expand-details-on-row-click-or-on-keyboard-event" href="#how-to-expand-details-on-row-click-or-on-keyboard-event">
   How to expand details on row click or on keyboard event?
</a>

Mouse and keyboard API provides services over user interactions, consider to use to implement manual details manipulations.

{% docEditor "github/qgrid/ng2-example/tree/details-row-custom/latest" %}

<a name="suggested-links" href="#suggested-links">
   Suggested Links
</a>

* [Keyboard API](/reference/keyboard.html)
* [Mouse API](/reference/mouse.html)
