---
title: Editing
group: Features
order: 11
---

- [How to access edit events in q-grid?](#how-to-access-edit-events-in-q-grid)
- [How to enable batch edit?](#how-to-enable-batch-edit)
- [How to disable edit mode for the particular column?](#how-to-disable-edit-mode-for-the-particular-column)
- [How to add a new row to the end?](#how-to-add-a-new-row-to-the-end)
- [How to add delete button and implement row deletion?](#how-to-add-delete-button-and-implement-row-deletion)
- [How to change edit shortcuts?](#how-to-change-edit-shortcuts)
- [How to prevent value change it it's empty?](#How-to-prevent-value-change-it-it's-empty)
- [How to enter or exit edit mode?](#how-to-enter-or-exit-edit-mode)
- [How to disable edit mode?](#how-to-disable-edit-mode)
- [Suggested Links](#suggested-links)
      
There are situations when the end user need to edit data, in this case just setup edit mode equals to `cell` to turn on editing.

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="rows$ | async" [model]="gridModel">
         <q-grid-columns generation="deep"></q-grid-columns>
      </q-grid>
   `
})
export class MyComponent implements AfterViewInit {
   rows$ = this.dataService.getRows();
   gridModel = this.qgrid.model();

   constructor(
      private dataService: MyDataService,
      private qgrid: Grid
   ) {
   }

   ngAfterViewInit() {
      this.gridModel.edit({
         mode: 'cell',
      });
   }
}
```

{% docEditor "github/qgrid/ng2-example/tree/edit-cell-basic/latest" %}

<a name="how-to-access-edit-events-in-q-grid" href="#how-to-access-edit-events-in-q-grid">
   How to access edit events in q-grid?
</a>

Edit model force to use commands to control editing.

```typescript
gridModel.edit({
   mode: 'cell',
   enter: new Command({
      canExecute: e => e.column.type === 'number'
   }),
   commit: new Command({
      execute: e => console.log(e.newValue)
   })
});
```
<a name="how-to-enable-batch-edit" href="#how-to-enable-batch-edit">
   How to enable batch edit?
</a>

Use edit `method` property to activate batch editing, it activates cell handler that could be dragged to apply start cell value to the next selection.

```typescript
gridModel.edit({
   mode: 'cell',
   method: 'batch'
});

```

{% docEditor "github/qgrid/ng2-example/tree/edit-cell-batch/latest" %}

<a name="how-to-disable-edit-mode-for-the-particular-column" href="#how-to-disable-edit-mode-for-the-particular-column">
   How to disable edit mode for the particular column?
</a>

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

<a name="how-to-add-a-new-row-to-the-end" href="#how-to-add-a-new-row-to-the-end">
   How to add a new row to the end?
</a>

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
   rows$ = this.dataService.getRows();
   gridModel = this.qgrid.model();

   addRow = new Command({
      execute: () => {
         const atom = new Atom();
         const rows = Array.from(this.gridModel.data().rows).concat([atom]);
         this.gridModel.data({ rows });

         const service = this.qgrid.service(this.gridModel);
         service.focus(rows.length - 1);
      },
   });

   constructor(
      private dataService: MyDataService,
      private qgrid: Grid
   ) {
   }
}
```

<a name="how-to-add-delete-button-and-implement-row-deletion" href="#how-to-add-delete-button-and-implement-row-deletion">
   How to add delete button and implement row deletion?
</a>

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
   rows$ = this.dataService.getRows();
   gridModel = this.qgrid.model();

   deleteRow = new Command({
      execute: (row: Human) => {
         const rows = this.gridModel.data().rows.filter((x) => x !== row);
         this.gridModel.data({ rows });
      }
   });

   constructor(
      private dataService: MyDataService,
      private qgrid: Grid
   ) {
   }
}
```
<a name="how-to-change-edit-shortcuts" href="#how-to-change-edit-shortcuts">
   How to change edit shortcuts?
</a>

Use shortcuts properties from the edit model to change commit or cancel keys.

```typescript
gridModel.edit({
   mode: 'cell',
   commitShortcuts: {
      $default: 'tab|shift+tab|enter|ctrl+s',
      bool: 'tab|shift+tab|left|right|up|down|home|end|pageUp|pageDown'
   }
});

```

<a name="how-to-prevent-value-change-it-it's-empty" href="#how-to-prevent-value-change-it-it's-empty">
   How to prevent value change it it's empty?
</a>

Use `canExecute` method in `commit` command to decide if cell value should be changed.

```typescript
gridModel.edit({
   commit: new Command({
      canExecute: e => !!e.newValue
   })
});
```

<a name="how-to-enter-or-exit-edit-mode" href="#how-to-enter-or-exit-edit-mode">
   How to enter or exit edit mode?
</a>

Use `state` property in edit model. Use `view` or `edit` to define mode.

```typescript
gridModel.edit({
   state: 'edit'
});
```

<a name="how-to-disable-edit-mode" href="#how-to-disable-edit-mode">
   How to disable edit mode?
</a>


Just set edit mode equals to `null`.

```typescript
gridModel.edit({
   mode: null
});
```
<a name="suggested-links" href="#suggested-links">
   Suggested Links
</a>

* [Data manipulation plugin](/plugin/data-manipulation.md)
* [Edit form plugin](/plugin/edit-form.md)
