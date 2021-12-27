---
title: Template System
group: Customization
order: 0
---
- [ng-template[for]](#ng-template-for)
- [ng-container[key]](#ng-container-key)
- [Suggested Links](#suggested-links)

To support custom cell renderers and different ui frameworks q-grid introduces entry points to control look and feel.

<a name="ng-template-for" href="#ng-template-for">
   ng-template[for]
</a>

The receiving element is `ng-template` that allows to define content under some key by assign it to `for` attribute.

```html
<q-grid>
    <q-grid-toolbar>
	    <ng-template for="top">
		    <q-grid-caption></q-grid-caption>
		</ng-template>
	</q-grid-toolbar>
</q-grid>
```

<a name="ng-container-key" href="#ng-container-key">
   ng-container[key]
</a>

Internally q-grid utilizes template definitions to build a final markup. Usually q-grid users do not worry about this till they start to work on q-grid contribution.

```typescript
@Component({
	selector: 'q-grid-core-toolbar',
	template: '<ng-container key="toolbar-{{position}}.tpl.html"></ng-container>'
})
export class ToolbarCoreComponent {
	@Input() position: 'top' | 'right' | 'bottom' | 'left';;
}
```

<a name="suggested-links" href="#suggested-links">
   Suggested Links
</a>

* [List of available material theme templates](https://github.com/qgrid/ng2/tree/master/src/theme/material/templates)
* [List of available basic theme templates](https://github.com/qgrid/ng2/tree/master/src/theme/basic/templates)