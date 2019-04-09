---
title: Validation
group: Features
order: 9
---

The q-grid validation is based on language independent validation rules called LIVR. Use `q-grid-rule` component to specify which specifications should be applied to appropriate column.

```html
<q-grid editMode="cell">
    <q-grid-validation>
        <q-grid-rule for="cell" key="salary" required></q-grid-rule>
        <q-grid-rule for="cell" key="name" required [lengthBetween]="[3, 40]"></q-grid-rule>
    </q-grid-validation>
</q-grid>
```

{% docEditor "github/qgrid/ng2-example/tree/validation-basic/latest" %}

## Suggested Links

* [LIVR](https://github.com/koorchik/LIVR)