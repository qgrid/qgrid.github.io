---
title: How to made a theme
group: Customization
order: 2
---
- [Theme Component](#theme-component)
- [Theme Module](#theme-module)
- [Suggested Links](#suggested-links)

This page covers the fundamentals of the q-grid theme system. We will build the simplest one, which will contain only basic templates for cells.

{% docEditor "doc-qgrid-ng2-theme" %}

<a name="theme-component" href="#theme-component">
   Theme Component
</a>

All plugins including cell renderers are using q-grid template system. Finally, theme component should contain necessary set of `ng-template[key]` directives to fit theme requirements.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'q-grid-theme',
  template: `
      <ng-template key="body-cell-text.tpl.html" let-$cell>
          {{$cell.label}}
      </ng-template>
      <ng-template key="head-cell-text.tpl.html" let-$cell>
          {{$cell.column.title}}
      </ng-template>
    `
})
export class ThemeComponent {
}
```
<a name="theme-module" href="#theme-module">
   Theme Module
</a>

* Put `ThemeComponent` into the `entryComponents` section to support dynamic loading.
* Add `TemplateModule` into the `imports` section to enable ng-template[key] directive.
* Inject `ThemeService` to the module `constructor`.
* Setup `theme name` property which will be added to the `q-grid-view` component as css class.
* Setup `theme component` property to provide type for the q-grid `component factory`.

```typescript
import { NgModule } from '@angular/core';
import { TemplateModule, ThemeService } from 'ng2-qgrid';
import { ThemeComponent } from './theme.component';

@NgModule({
  declarations: [
    ThemeComponent
  ],
  imports: [    
    TemplateModule
  ],
  entryComponents: [
    ThemeComponent
  ]
})
export class ThemeModule {
  constructor(theme: ThemeService) {
    theme.name = 'my-theme';
    theme.component = ThemeComponent;
  }
}

```

<a name="suggested-links" href="#suggested-links">
   Suggested Links
</a>

* [Material theme](https://github.com/qgrid/ng2/tree/master/src/theme/material)
* [Basic theme](https://github.com/qgrid/ng2/tree/master/src/theme/basic)