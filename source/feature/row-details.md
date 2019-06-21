---
title: Row Details
group: Features
order: 9
---

There are situations when additional information need to be showing by expanding row row details can help to handle this.

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="rows$ | async">
         <q-grid-columns generation="deep"></q-grid-columns>

         <q-grid-row>
            <ng-template for="details" let-$cell>
               {{$cell.row.item.number}}
            </ng-template>
         </q-grid-row>
      </q-grid>
   `
})
export class MyComponent {
   @ViewChild(GridComponent) myGrid: GridComponent;   
   rows$: Observable<[]>;

   constructor(dataService: MyDataService) {
      this.rows$ = dataService.getRows();
   }

   ngAfterViewInit() {
      const { model } = this.myGrid;

      model.row({
          unit: 'details',
          mode: 'multiple'
      });
   }
}
```

{% docEditor "github/qgrid/ng2-example/tree/details-row-api/latest" %}

> Use `$cell.row.item` in template to get access to the data row.

## How to expand expand or collapse all row details?

Update `status` property in row model.

```typescript
ngAfterViewInit() {
   const { model } = this.myGrid;

   const { rows } = model.data();
   const expand = true;
   model.row({
      status: new Map(rows.map<[any, RowDetailsStatus]>(x => [x, new RowDetailsStatus(expand)]))
   });
}
```

## How to disable/hide expand button?

Use `toggle` command from row model.

```typescript
ngAfterViewInit() {
   const { model } = this.myGrid;

   model.row({
      toggle: new Command({
         canExecute: ({ row }) => false
      })
   });
}
```

## How to show nested q-grid in details template?

Use let-`$cell` to pass data to the function that will return details rows.

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="rows$ | async">
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
export class MyComponent {
   @ViewChild(GridComponent) myGrid: GridComponent;   
   rows$: Observable<[]>;
   cache = new Map<string, Observable<Atom[]>>();

   constructor(private dataService: MyDataService) {
      this.rows$ = dataService.getRows();
   }

   ngAfterViewInit() {
      const { model } = this.myGrid;

      model.row({
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