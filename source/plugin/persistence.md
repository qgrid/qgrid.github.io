---
title: State Persistence
group: Plugins
order: 9
---

Use persistence plugin to save and restore q-grid state.

{% docEditor "github/qgrid/ng2-example/tree/persistence-basic/latest" %}

## Installation

<!-- Add persistence module to imports section.

```typescript
import { GridModule } from 'ng2-qgrid';
import { ThemeModule } from 'ng2-qgrid/theme/material';
import { PersistenceModule } from 'ng2-qgrid/plugin/persistence';

@NgModule({
   imports: [
      GridModule,
      ThemeModule,
      PersistenceModule
   ]
})
export class AppModule {
}
``` -->

Add angular component inside of q-grid component, after that persistance action should appear in the top toolbar.

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid>
         <q-grid-persistence></q-grid-persistence>
      </q-grid>
   `
})
export class MyComponent {
}
```

## How to save/load state on server?

Use `persistence` model to override default behavior.

```typescript
@Component({
   template: `
      <q-grid [model]="gridModel">
         <q-grid-persistence></q-grid-persistence>
      </q-grid>
   `
})
export class MyComponent implements AfterViewInit {
   gridModel: GridModel;

   constructor(qgrid: Grid, private dataService: MyDataService) {
      this.gridModel = qgrid.model();
   }

   ngAfterViewInit() {
     this.gridModel.persistence({
       storage: this.buildStorage()
     });
   }

   buildStorage() {
      return {
         getItem: id =>
            new Promise<any>(resolve => {
               this.dataService
                  .getState(id)
                  .subscribe(resolve);
            }),
         setItem: (id, state) =>
            new Promise(resolve => {
               this.dataService
                  .setState(id, state)
                  .subscribe(resolve);
            })
      };
   }
```
