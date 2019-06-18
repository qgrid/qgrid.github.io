---
title: Edit Form
group: Plugins
order: 12
---

{% docEditor "github/qgrid/ng2-example/tree/edit-form-basic/latest" %}

## Installation

<!-- Add dropdown module to imports section.

```typescript
import { GridModule } from 'ng2-qgrid';
import { ThemeModule } from 'ng2-qgrid/theme/material';
import { EditFormModule } from 'ng2-qgrid/plugin/edit-form';

@NgModule({
   imports: [
      GridModule,
      ThemeModule,
      EditFormModule
   ]
})
export class AppModule {
}
``` -->

Use `dropdown` as a column editor.

```typescript
@Component({
   selector: 'my-component',
   template: `
     <q-grid [rows]="rows$ | async">
         <q-grid-columns generation="deep">
            <q-grid-column key="editForm" 
                           type="row-options" 
                           pin="left">
               <ng-template for="body" let-$cell>
                  <q-grid-edit-form-trigger [cell]="$cell" [caption]="$cell.row.name">
                   </q-grid-edit-form-trigger>
               </ng-template>
            </q-grid-column>
         </q-grid-columns>
      </q-grid>
   `
})
export class MyComponent implements AfterViewInit {
   rows$: Observable<any[]>;

   constructor(dataService: MyDataService) {
      this.$rows = dataService.getData();
   }

   ngAfterViewInit() {
      const { model } = this.myGrid;

      model.edit({
         mode: 'row',
      });
   }
}
```