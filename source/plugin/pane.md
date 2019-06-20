---
title: Pane
group: Plugins
order: 13
---

To show custom panels inside q-grid use `q-grid-pane` plugin.

{% docEditor "github/qgrid/ng2-example/tree/pane-basic/latest" %}

## Installation

<!-- Add pane module to imports section.

```typescript
import { GridModule } from 'ng2-qgrid';
import { ThemeModule } from 'ng2-qgrid/theme/material';
import { PaneModule } from 'ng2-qgrid/plugin/pane';

@NgModule({
   imports: [
      GridModule,
      ThemeModule,
      PaneModule
   ]
})
export class AppModule {
}
``` -->

Add angular component inside of q-grid component and override legend template regarding to the task.

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="rows$ | async">
         <q-grid-columns generation="deep">
         </q-grid-columns>

         <q-grid-pane trigger="selection.items">
            <ng-template for="right"
                     let-$pane
                     let-$cell="cell">
               <button (click)="$pane.close('right')">
                  Close
               </button>

               <h2>{{$cell.row.fullName}}</h2>
            </ng-template>
         </q-grid-pane>
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

## How to open pane manually without trigger?

Get access to `PaneComponent` and use `open` or `close` method.

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="rows$ | async">
         <q-grid-columns generation="deep">
         </q-grid-columns>

         <q-grid-actions>
            <q-grid-action icon="details"
                           title="Open Pane"
                           [command]="openPane">
            </q-grid-action>
         </q-grid-actions>

        <q-grid-pane>
            <ng-template for="right">
               Hello!
            </ng-template>
         </q-grid-pane>
      </q-grid>
   `
})
export class MyComponent {
	@ViewChild(PaneComponent) pane: PaneComponent;
	rows$: Observable<Human[]>;

	openPane = new Command({
		execute: () => this.pane.open('right'),
	});

	constructor(dataService: DataService) {
		this.rows$ = dataService.getPeople();
	}
}
```