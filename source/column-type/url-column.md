---
title: Url & Email
group: Column Types
order: 12
---

To show url links with appropriate editors this column type could be used.

```html
<q-grid>
   <q-grid-columns>
      <q-grid-column type="url" key="mySite">
      </q-grid-column>
   </q-grid-columns>
</q-grid>
```

{% docEditor "github/qgrid/ng2-example/tree/column-url-basic/latest" %}

## Email

To show email links with appropriate editors this column type could be used. 

```html
<q-grid>
   <q-grid-columns>
      <q-grid-column type="email" key="mailbox">
      </q-grid-column>
   </q-grid-columns>
</q-grid>
```

{% docEditor "github/qgrid/ng2-example/tree/column-email-basic/latest" %}

## Default template and specific properties

* If column `label` property is set up default editor will contain two input fields respectively for the value and for the label.

```html
<q-grid>
   <q-grid-columns>
      <q-grid-column type="text">
         <ng-template for="body" let-$cell let-$view="$view">	
            <a [attr.href]="$cell.value">
               {{$cell.label || $cell.value}}
            </a>
            <button *ngIf="$view.edit.cell.canEdit($cell)"
                    class="q-grid-url-edit q-grid-edit-trigger"
                    mat-icon-button
                    aria-label="url"                    
                    [disabled]="!$view.edit.cell.enter.canExecute($cell)"
                    (click)="$view.edit.cell.enter.execute($cell)"
                    tabindex="-1">
                <mat-icon class="q-grid-icon">edit</mat-icon>
            </button>         
        </ng-template>
      </q-grid-column>
   </q-grid-columns>
</q-grid>
```