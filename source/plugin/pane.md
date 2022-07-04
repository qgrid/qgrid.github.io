---
title: Pane
group: Plugins
order: 13
---
- [Installation](#installation)
- [How to open pane manually without trigger?](#how-to-open-pane-manually-without-trigger)

To show custom panels inside q-grid use `q-grid-pane` plugin.

{% docEditor "github/qgrid/ng2-example/tree/pane-basic/latest" %}

<a name="installation" href="#installation">
   Installation
</a>

Add angular component inside of q-grid component and override pange template regarding to the task.

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

<a name="how-to-open-pane-manually-without-trigger" href="#how-to-open-pane-manually-without-trigger">
   How to open pane manually without trigger?
</a>

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