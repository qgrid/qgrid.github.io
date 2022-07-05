---
title: Reference
group: Column Types
order: 7
---
- [Default template and specific properties](#default-template-and-specific-properties)

Use this column type when need to handle reference values, the `reference value` term describes data which can be defined using a key/value pair relationship.

```typescript
@Component({
    template: `<q-grid [rows]="rows$ | async" [model]="gridModel"></q-grid>`
})
export class MyComponent {
   gridModel = qgrid
      .model()
      .data({
         columns: [
            { key: 'friends', editorOptions: friendsOptions }
         ]
      });

   friendsOptions: EditorOptions = {
      modelFactory: ({ row, reference }) => {
         const friendsModel = this.qgrid.model();

         this.dataService
            .getFriends(row.myId)
            .subscribe(rows => model.data({ rows }));

        return friendsModel;
      }
   };

   constructor(
      private qgrid: Grid,
      private dataService: MyDataService
   ) {
   }
```

{% docEditor "github/qgrid/ng2-example/tree/column-reference-basic/latest" %}

<a name="default-template-and-specific-properties" href="#default-template-and-specific-properties">
   Default template and specific properties
</a>

* Use `[editorOptions]` to configure reference selection. The `modelFactory` callback from `[editorOptions]` returns model to expose another q-grid in a popup for user selection.

```html
<q-grid>
   <q-grid-columns>
      <q-grid-column type="reference">
         <ng-template for="body" let-$cell let-$view="$view">	
            <span>{{$cell.label}}</span>
            <button *ngIf="$view.edit.cell.canEdit($cell)"
                    (disabled)="!$view.edit.cell.enter.canExecute($cell)"
                    (click)="$view.edit.cell.enter.execute($cell)"             
                    type="button"
                    mat-icon-button
                    class="q-grid-reference-edit q-grid-edit-trigger"
                    tabindex="-1">
               <mat-icon matSuffix class="q-grid-icon">
                  search
               </mat-icon>
            </button>
         </ng-template>
      </q-grid-column>
   </q-grid-columns>
</q-grid>
```