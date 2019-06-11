---
title: Row Details
group: Features
order: 9
---

There are situations when the end user need to show additional information for the rows in the q-grid, row details can help with that.

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
const { model } = this.myGrid;

const expand = true;
model.row({
   status: new Map(model.data().rows.map<[any, RowDetailsStatus]>(x => [x, new RowDetailsStatus(expand)]))
});
```

## How to disable expand button?

Use `toggle` command from row model.

```typescript
const { model } = this.myGrid;

model.row({
   toggle: new Command({
      canExecute: ({ row }) => false
   })
});
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
         rows$ = 
            dataService
               .getRows()
               .pipe(
                  map(rows => rows.filter(row => row.phase === atom.phase)
               ));

			this.cache.set(atom.phase, rows$);
		}

		return subject;
	}
}
```

{% docEditor "github/qgrid/ng2-example/tree/details-row-grid/latest" %}