---
title: Toolbar
group: Plugins
order: 10
---

Use toolbar plugin to customize toolbar templates.

{% docEditor "github/qgrid/ng2-example/tree/dynamic-column-model/latest" %}

## Installation

Add toolbar module to imports section.

```typescript
import { GridModule } from 'ng2-qgrid';
import { ThemeModule } from 'ng2-qgrid/theme/material';
import { ToolbarModule } from 'ng2-qgrid/plugin/toolbar';

@NgModule({
   imports: [
      GridModule,
      ThemeModule,
      ToolbarModule
   ]
})
export class AppModule {
}
```

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