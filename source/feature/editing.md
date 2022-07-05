---
title: Editing
group: Features
order: 11
---

- [How to access edit events in q-grid?](#how-to-access-edit-events-in-q-grid)
- [How to enable batch edit?](#how-to-enable-batch-edit)
- [How to disable edit mode for the particular column?](#how-to-disable-edit-mode-for-the-particular-column)
- [How to add a new row to the end?](#how-to-add-a-new-row-to-the-end)
- [How to change edit shortcuts?](#how-to-change-edit-shortcuts)
- [How to prevent value change when it's empty?](#How-to-prevent-value-change-when-it's-empty)
- [How to enter or exit edit mode?](#how-to-enter-or-exit-edit-mode)
- [How to disable edit mode?](#how-to-disable-edit-mode)
- [Suggested Links](#suggested-links)
      
There are situations when the end user need to edit data, in this case just setup edit mode equals to `cell` to turn on editing.

```typescript
qgrid
   .model()
   .edit({
      mode: 'cell',
   });
```

{% docEditor "github/qgrid/ng2-example/tree/edit-cell-basic/latest" %}

<a name="how-to-access-edit-events-in-q-grid" href="#how-to-access-edit-events-in-q-grid">
   How to access edit events in q-grid?
</a>

Use appropriate commands from the q-grid model to control editing.

```typescript
qgrid
   .model()
   .edit({
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

Set `method` equals to `batch` to activate batch editing. The special cell handler will be displayed that could be dragged to apply start cell value to the future selection.

```typescript
qgrid
   .model()
   .edit({
      mode: 'cell',
      method: 'batch'
   });
```

<a name="how-to-disable-edit-mode-for-the-particular-column" href="#how-to-disable-edit-mode-for-the-particular-column">
   How to disable edit mode for the particular column?
</a>

Use `canEdit` property in the column definition.

```typescript
qgrid
   .model();
   .data({
      columns: [
         { key: 'name', type: 'text', canEdit: false },
         { key: 'age', type: 'number' },
      ]
   });
```

<a name="how-to-add-a-new-row-to-the-end" href="#how-to-add-a-new-row-to-the-end">
   How to add a new row to the end?
</a>

Use data model and focus service, the same logic will be for the row deletion. 

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="rows$ | async" 
              [model]="gridModel">

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
   gridModel = this.qgrid
      .model()
      .columnList({
         generation: 'deep'
      });

   addRow = new Command({
      execute: () => {
         const model = this.gridModel;

         model.data({ 
            rows: model.data().rows.concat([new Atom()]) 
         });

         this.qgrid
            .service(model);
            .focus(rows.length - 1);
      },
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
qgrid
   model()
   .edit({
      mode: 'cell',
      commitShortcuts: {
         $default: 'tab|shift+tab|enter|ctrl+s',
         bool: 'tab|shift+tab|left|right|up|down|home|end|pageUp|pageDown'
      }
   });
```

<a name="how-to-prevent-value-change-when-it's-empty" href="#how-to-prevent-value-change-when-it's-empty">
   How to prevent value change when it's empty?
</a>

Use `canExecute` method in `commit` command to decide if cell value need to be changed.

```typescript
qgrid
   .model()
   .edit({
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
qgrid
   .model()
   .edit({
      state: 'edit'
   });
```

> It won't work if the q-grid not in the edit mode.

<a name="how-to-disable-edit-mode" href="#how-to-disable-edit-mode">
   How to disable edit mode?
</a>

Just set edit mode equals to `null`.

```typescript
qgrid
   .model()
   .edit({
      mode: null
   });
```
<a name="suggested-links" href="#suggested-links">
   Suggested Links
</a>

* [Data manipulation plugin](/plugin/data-manipulation.md)
* [Edit form plugin](/plugin/edit-form.md)
