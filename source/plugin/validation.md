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
      <q-grid [rows]="rows$ | async">
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
export class MyComponent {
   @ViewChild(GridComponent) myGrid: GridComponent;
   rows$: Observable<any[]>;

   constructor(dataService: MyDataService) {
      this.rows$ = dataService.getRows();
   }

   ngAfterViewInit() {
      this.myGrid.model.edit({
         mode: 'cell'
      });
   }
}
```

## Suggested Links

* [LIVR](https://github.com/koorchik/LIVR)