---
title: Legend
group: Plugins
order: 5
---

To show hints or additional information use `q-grid-legend` plugin.

{% docEditor "github/qgrid/ng2-example/tree/legend-grid-basic/latest" %}

## Installation

Add angular component inside of q-grid component and override legend template regarding to the task.

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="rows$ | async">
         <q-grid-columns generation="deep">
         </q-grid-columns>

         <q-grid-legend>
            <ng-template for="content">
               <ul class="q-grid-legend-list">
                 <li><div class="q-grid-legend-item gas"></div>Gas</li>
                 <li><div class="q-grid-legend-item solid"></div>Solid</li>
               </ul>
            </ng-template>
         <q-grid-legend>
      </q-grid>
   `
})
export class MyComponent {
   rows$: Observable<any[]>;

   constructor(dataService: MyDataService) {
      this.rows$ = dataService.getRows();
   }
}
```