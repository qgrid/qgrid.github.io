---
title: Row Details
group: Features
order: 9
---

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

## How to expand or collapse all row details?

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

## How to disable/hide expand button?

Use `toggle` command from row model.

```typescript
gridModel.row({
   toggle: new Command({
      canExecute: ({ row }) => false,
   }),
});
```

## How to show nested q-grid in details template?

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

## How to hide row details expand column?

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

## How to expand details on row click or on keyboard event?

Mouse and keyboard API provides services over user interactions, consider to use to implement manual details manipulations.

{% docEditor "github/qgrid/ng2-example/tree/details-row-custom/latest" %}

## Suggested Links

* [Keyboard API](/reference/keyboard.html)
* [Mouse API](/reference/mouse.html)
