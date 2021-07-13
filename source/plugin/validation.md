---
title: Validation
group: Plugins
order: 7
---

Validation plugin is based on language independent validation rules called LIVR.

{% docEditor "github/qgrid/ng2-example/tree/validation-basic/latest" %}

## Installation

Add angular component inside of q-grid component.

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="rows$ | async" [model]="gridModel">
         <q-grid-columns generation="deep">
         </q-grid-columns>

         <q-grid-validation>
            <q-grid-rule for="cell" 
                         key="salary" 
                         required>
            </q-grid-rule>
            <q-grid-rule for="cell" 
                         key="name"
                         [lengthBetween]="[3, 40]"
                         required >
            </q-grid-rule>
        </q-grid-validation>
    </q-grid>
   `
})
export class MyComponent implements AfterViewInit {
   rows$ = this.dataService.getRows();
   gridModel = this.qgrid.model();

   constructor(
      private dataService: MyDataService,
      private qgrid: Grid
   ) {
   }

   ngAfterViewInit() {
      this.gridModel.edit({
         mode: 'cell'
      });
   }
}
```

## Suggested Links

* [LIVR](https://github.com/koorchik/LIVR)
