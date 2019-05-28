---
title: Legend
group: Plugins
order: 4
---

To show hints or additional information use `q-grid-legend` plugin.

{% docEditor "github/qgrid/ng2-example/tree/legend-grid-basic/latest" %}

## Installation

Add legend module to imports section.

```typescript
import { GridModule } from 'ng2-qgrid';
import { ThemeModule } from 'ng2-qgrid/theme/material';
import { ConditionBuilderModule } from 'ng2-qgrid/plugin/legend';

@NgModule({
   imports: [
      GridModule,
      ThemeModule,
      LegendModule
   ]
})
export class AppModule {
}
```

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