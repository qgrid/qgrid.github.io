---
title: Virtualization
group: Features
order: 19
---
- [How to implement infinite scroll?](#how-to-implement-infinite-scroll)

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
   gridModel = this.qgrid.model();
   rows$ = this.dataService.getRows();

   constructor(
      private dataService: MyDataService,
      private qgrid: Grid
   ) {
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

<a name="#how-to-implement-infinite-scroll">
   How to implement infinite scroll?
</a>

Override default pipeline with serve call on the top.

```typescript
@Component({
   template: '<q-grid [model]="gridModel"></q-grid>',
})
export class MyComponent implements AfterViewInit {
   gridModel = this.qgrid.model();

   constructor(
      private qgrid: Grid,
      private dataService: MyDataService
   ) {
   }

   ngAfterViewInit() {
      const { pipeUnit } = this.qgrid;

      this.gridModel.scroll({
         mode: 'virtual'
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
         ].concat(pipeUnit.view)
      });
   }
}
```

{% docEditor "github/qgrid/ng2-example/tree/scroll-virtual-infinite/latest" %}
