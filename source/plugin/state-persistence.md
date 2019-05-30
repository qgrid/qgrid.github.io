---
title: State Persistence
group: Plugins
order: 6
---

Use persistence plugin to save and restore q-grid state.

{% docEditor "github/qgrid/ng2-example/tree/persistence-basic/latest" %}

## Installation

Add persistence module to imports section.

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
```

Add angular component inside of q-grid component, after that a new action should appear.

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

```typescript
@Component({
   template: `
      <q-grid [model]="gridModel">
         <q-grid-persistence></q-grid-persistence>
      </q-grid>
   `
})
export class MyComponent {
   @ViewChild(GridComponent) myGrid: GridComponent;

   constructor(private dataService: DataService) {
   }

   ngAfterViewInit() {
     this.myGrid.model.persistence({
       storage: this.buildStorage()
     });
   }

   buildStorage() {
      return {
         getItem: id =>
            new Promise(resolve => {
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
}
```