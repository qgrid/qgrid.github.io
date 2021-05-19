---
title: Editing
group: Features
order: 11
---

There are situations when the end user need to edit data, in this case just setup edit mode equals to `cell` to turn on editing.

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="rows$ | async" [model]="gridModel">
         <q-grid-columns generation="deep"></q-grid-columns>
      </q-grid>
   `,
})
export class MyComponent implements AfterViewInit {
   rows$: Observable<[]>;
   gridModel: GridModel;

   constructor(dataService: MyDataService) {
      this.rows$ = dataService.getRows();
      this.gridModel = qgrid.model();
   }

   ngAfterViewInit() {
      this.gridModel.edit({
         mode: 'cell',
      });
   }
}
```

{% docEditor "github/qgrid/ng2-example/tree/edit-cell-basic/latest" %}

## How to access edit events in q-grid?

Edit model force to use commands to control editing.

```typescript
ngAfterViewInit() {
   this.gridModel.edit({
      mode: 'cell',
      enter: new Command({
         canExecute: e => e.column.type === 'number'
      }),
      commit: new Command({
         execute: e => console.log(e.newValue)
      })
   });
}
```

## How to enable batch edit?

Use edit `method` property to activate batch editing, it activates cell handler that could be dragged to apply start cell value to the next selection.

```typescript
ngAfterViewInit() {
   this.gridModel.edit({
      mode: 'cell',
      method: 'batch'
   });
}
```

{% docEditor "github/qgrid/ng2-example/tree/edit-cell-batch/latest" %}

## How to disable edit mode for the particular column?

Use `canEdit` attribute to not allow editing of the column.

```html
<q-grid [rows]="rows$ | async">
   <q-grid-columns generation="deep">
      <q-grid-column type="text" 
                     key="guid"
                     [canEdit]="false">
      </q-grid-column>
   </q-grid-columns>
</q-grid>
```

## How to add a new row to the end?

Use data model and focus service.

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="rows$ | async" [model]="gridModel">
         <q-grid-columns generation="deep"></q-grid-columns>
         <q-grid-actions>
            <q-grid-action id="addRow"
                           title="Add Row"
                           icon="add"
                           [command]="addRow">
            </q-grid-action>
         </q-grid-actions>
      </q-grid>
   `
})
export class MyComponent {
   rows$: Observable<[]>;
   gridModel: GridModel;

   addRow = new Command({
      execute: () => {
         const atom = new Atom();
         const rows = Array.from(this.gridModel.data().rows).concat([atom]);
         this.gridModel.data({ rows });

         const service = this.qgrid.service(this.gridModel);
         service.focus(rows.length - 1);
      },
   });

   constructor(dataService: MyDataService) {
      this.rows$ = dataService.getRows();
      this.gridModel = qgrid.model();
   }
}
```

## How to add delete button and implement row deletion?

Use data model.

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="rows$ | async" [model]="gridModel">
         <q-grid-columns generation="deep">
            <q-grid-column type="row-options"
                           key="rowOptions"
                           [canEdit]="false">
               <ng-template for="body"
                            let-$cell>
                  <button (click)="deleteRow.execute($cell.row)">
                     DELETE
                  </button>
               </ng-template>
            </q-grid-column>
         </q-grid-columns>
      </q-grid>
   `,
})
export class MyComponent {
   rows$: Observable<[]>;
   gridModel: GridModel;

   deleteRow = new Command({
      execute: (row: Human) => {
         const rows = this.gridModel.data().rows.filter((x) => x !== row);
         this.gridModel.data({ rows });
      },
   });

   constructor(dataService: MyDataService) {
      this.rows$ = dataService.getRows();
      this.gridModel = qgrid.model();
   }
}
```

## How to change edit shortcuts?

Use shortcuts properties from the edit model to change commit or cancel keys.

```typescript
ngAfterViewInit() {
   this.gridModel.edit({
      mode: 'cell',
      commitShortcuts: {
         $default: 'tab|shift+tab|enter|ctrl+s',
         bool: 'tab|shift+tab|left|right|up|down|home|end|pageUp|pageDown'
      }
   });
}
```

## How to prevent value change it it's empty?

Use `canExecute` method in `commit` command to decide if cell value should be changed.

```typescript
ngAfterViewInit() {
   this.gridModel.edit({
      commit: new Command({
         canExecute: e => !!e.newValue
      })
   });
}
```

## How to enter or exit edit mode?

Use `state` property in edit model. Use `view` or `edit` to define mode.

```typescript
ngAfterViewInit() {
   this.gridModel.edit({
      state: 'edit'
   });
}
```

## How to disable edit mode?

Just set edit mode equals to `null`.

```typescript
ngAfterViewInit() {
   this.gridModel.edit({
      mode: null
   });
}
```

## Suggested Links

* [Data manipulation plugin](/plugin/data-manipulation.md)
* [Edit form plugin](/plugin/edit-form.md)
