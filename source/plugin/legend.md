---
title: Legend
group: Features
order: 4
---

To show hints or additional information use `q-grid-legend` component.

```html
<q-grid>
   <q-grid-legend>
      <ng-template for="content">
         <ul class="q-grid-legend-list">
            <li>
               <div class="q-grid-legend-item Gas"></div>Gas
            </li>
            <li>
               <div class="q-grid-legend-item Solid"></div>Solid
            </li>
         </ul>
      </ng-template>
   <q-grid-legend>
</q-grid>
```

{% docEditor "github/qgrid/ng2-example/tree/legend-grid-basic/latest" %}
