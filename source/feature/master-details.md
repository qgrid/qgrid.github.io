---
title: Master-Details
group: Features
order: 18
---

Use master selection event to filter out rows of details grid.

```typescript
@Component({
   selector: 'example-master-details-basic',
   template: `
      <q-grid #master
              [rows]="masterRows$ | async">
         <q-grid-columns generation="deep"></q-grid-columns>
      </q-grid>

      <q-grid [rows]="detailsRows$ | async">
         <q-grid-columns generation="deep"></q-grid-columns>
      </q-grid>
   `,
})
export class ExampleMasterDetailsBasicComponent {
   @ViewChild('master') masterGrid: GridComponent

   masterRows$: Observable<Human[]>;
   detailsRows$: Observable<Human[]>;

   constructor(dataService: MyDataService) {
      this.masterRows$ = dataService.getPeople();
   }
   
   ngAfterViewInit() {
      const { model } = this.masterGrid;

      model.selectionChanged.watch(e => {
         const items = e.state.items;
         if (items.length) {
            const { likes } = items[0];

            this.detailsRows = this.dataService
               .getPeople()
               .pipe(
                  map(humans => humans.filter(human => likes.every(like => human.likes.indexOf(like) >= 0))
               ));
         }
      });
   }
}
```

{% docEditor "github/qgrid/ng2-example/tree/master-details-basic/latest" %}