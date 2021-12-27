---
title: State Persistence
group: Plugins
order: 9
---
- [Installation](#installation)
- [How to save/load state on server?](#how-to-save/load-state-on-server)


Use persistence plugin to save and restore q-grid state.

{% docEditor "github/qgrid/ng2-example/tree/persistence-basic/latest" %}

<a name="installation" href="#installation">
   Installation
</a>

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

<a name="how-to-save/load-state-on-server" href="#how-to-save/load-state-on-server">
   How to save/load state on server?
</a>

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
   gridModel = this.qgrid.model();

   constructor(
      private qgrid: Grid,
      private dataService: MyDataService
   ) {
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
