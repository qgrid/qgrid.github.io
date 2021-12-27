---
title: Toolbar
group: Plugins
order: 10
---
- [Installation](#installation)

Use toolbar plugin to customize toolbar templates.

{% docEditor "github/qgrid/ng2-example/tree/dynamic-column-model/latest" %}

<a name="#installation">
   Installation
</a>

Add angular component inside of q-grid component. `Top`, `right`, `bottom` and `left`  areas are supported.

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="rows$ | async">
         <q-grid-toolbar>
            <ng-template for="bottom">
               <my-pager></my-pager>
            </ng-template>
         </q-grid-toolbar>
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