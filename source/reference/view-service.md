---
title: View Service
type: guide
group: Reference
order: 6
---

Use this service to take control over any possible actions in the q-grid scope. `$view` service is a facade for several micro utilities that are responsible for the q-grid rendering and interaction models. Here are the list of available routines:

```html
<q-grid>
   <q-grid-columns>
      <q-grid-column type="number">
         <ng-template for="edit" let-$cell let-$view="$view">
            <input type="number"
                   q-grid-focus
                   [(ngModel)]="$view.edit.cell.value"
                   (blur)="$view.edit.cell.exit.execute($cell)" />
         </ng-template>
      </q-grid-column>
   </q-grid-columns>
</q-grid>
```

* body
* edit
* filter
* foot
* group
* head
* highlight
* layout
* nav
* pagination
* row
* rowDetails
* scroll
* selection
* sort
* style