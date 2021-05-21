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
      <q-grid [rows]="rows$ | async" [model]="gridModel">
         <q-grid-columns generation="deep">
         </q-grid-columns>	
      </q-grid>
   `
})
export class MyComponent implements AfterViewInit {
   gridModel: GridModel;
   rows$: Observable<[]>;

   constructor(dataService: MyDataService, qgrid: Grid) {
      this.rows$ = dataService.getRows();
      this.gridModel = qgrid.model();
   }

   ngAfterViewInit() {
      this.gridModel.scroll({
         mode: 'virtual'
      });

      this.gridModel.pagination({
         size: 20
      });
   }
}
```

## How to implement infinite scroll?

Override default pipeline with serve call on the top.

```typescript
@Component({
   template: '<q-grid [model]="gridModel"></q-grid>',
})
export class MyComponent implements AfterViewInit {
   gridModel: GridModel;
   constructor(private qgrid: Grid, private dataService: MyDataService) {
      this.gridModel = qgrid.model();
   }

   ngAfterViewInit() {
      const { pipeUnit } = this.qgrid;

      this.gridModel.scroll({
         mode: "virtual",
      });

      this.gridModel.data({
         pipe: [
            (rows, context, next) => {
               const { skip } = this.gridModel.fetch();
               const { size } = this.gridModel.pagination();

               this.dataService.getAtoms().subscribe((atoms) => {
                  const newPage = atoms.slice(skip, skip + size);
                  next(rows.concat(newPage));
               });
            },
         ].concat(pipeUnit.view),
      });
   }
}
```

{% docEditor "github/qgrid/ng2-example/tree/scroll-virtual-infinite/latest" %}
