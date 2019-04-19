---
title: State Persistence
group: Features
order: -1
---

To allow save/load q-grid state use `q-grid-persistence` component, both client and server side configurations are supported.

```typescript
@Component({
   template: `
      <q-grid [model]="gridModel">
         <q-grid-persistence></q-grid-persistence>
      </q-grid>
   `
})
export class MyComponent {
   gridModel: GridModel;

   constructor(private dataService: DataService, private qgrid: Grid) {
      this.gridModel = this.qgrid.model();
      this.gridModel.persistence({
         storage: this.buildStorage()
      });
   }

   buildStorage() {
      return {
         getItem: id =>
            new Promise(resolve => {
               this.dataService
                  .getRows(id)
                  .subscribe(resolve);
            }),
         setItem: (id, items) =>
            new Promise(resolve => {
               this.dataService
                  .setRows(id, items)
                  .subscribe(resolve);
            })
      };
   }
}
```

{% docEditor "github/qgrid/ng2-example/tree/focus-cell-auto/latest" %}