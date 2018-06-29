---
title: My Theme
group: Getting started
order: 5
---

## What we are going to build

This page covers the fundamentals of the q-grid theme system. We will build the simplest one, which will contain only basic templates for cells.

{% docEditor "doc-qgrid-ng2-theme" %}

## Theme Component

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

## Theme Module

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

## Suggested links

* [List of available templates](https://github.com/qgrid/ng2/tree/master/src/theme/material/templates)