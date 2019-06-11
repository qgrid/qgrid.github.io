---
title: Virtualization
group: Features
order: 19
---

> Don't use virtualization in the production code, it's in BETA .

Use pagination size to define number of rows that will be materialized.

```typescript
@Component({
   template: `
      <q-grid [rows]="rows$ | async">
         <q-grid-columns generation="deep">
         </q-grid-columns>	
      </q-grid>
   `
})
export class MyComponent implements AfterViewInit {
   @ViewChild(GridComponent) myGrid;
   rows$: Observable<[]>;

   constructor(dataService: MyDataService) {
      this.rows$ = dataService.getRows();
   }
   
   ngAfterViewInit() {
      const { model } = this.myGrid;

      model.scroll({
         mode: 'virtual'
      });

      model.pagination({
         size: 20
      });
   }		
}
```

## How to implement infinite scroll?

Override default pipeline with serve call on the top.

```typescript
@Component({
   template: '<q-grid></q-grid>'
})
export class MyComponent implements AfterViewInit {
   @ViewChild(GridComponent) myGrid;

   constructor( 
      private qgrid: Grid,
      private dataService: DataService
   ) {
   }

   ngAfterViewInit() {
      const { model } = this.myGrid;
      const { pipeUnit } = this.qgrid;

      model.scroll({
         mode: 'virtual'
      });

      model.data({
         pipe: [
            (rows, context, next) => {
               const { skip } = model.fetch();
               const { size } = model.pagination();

               this.dataService
                  .getAtoms()
                  .subscribe(atoms => {
                     const newPage = atoms.slice(skip, skip + size);
                     next(rows.concat(newPage));
                  });

            }]
            .concat(pipeUnit.view)
      });
   }
}
```

{% docEditor "github/qgrid/ng2-example/tree/scroll-virtual-infinite/latest" %}
