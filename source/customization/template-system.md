---
title: Template System
group: Customization
order: 0
---

All plugins and cell renderers use q-grid template primitives. The basic concept is to utilize pair of `ng-container` and `ng-template` instances by using unique identifiers.

* Use `ng-template[key]` to add ng-template content to the internal template store under the `"key"` id.

```html
<ng-template key="toolbar-top.tpl.html">
	<q-grid-caption></q-grid-caption>
</ng-template>
```

* `ng-template[for]` acts the same as `ng-template[key]`, but has a lower priority and wont rewrite `"key"` templates in the store. Client code need to use it for templates safety.

```html
<q-grid-column type="text">
      <ng-template for="body" let-$cell>
	      {{$cell.value}}
	</ng-template>
</q-grid-column>
```

* Use `ng-container[key]` to replace ng-container content with a `ng-template[key|for]` keeping.

```html
<ng-container key="toolbar-top.tpl.html">
</ng-container>
```