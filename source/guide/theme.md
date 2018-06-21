---
title: My Theme
group: Getting started
order: 5
---

## What we are going to build

This page covers the fundamentals of the q-grid theme system. We will build the simplest one, which will contain only basic templates for cells.

{% docEditor "doc-qgrid-ng2-theme" %}

## Unit Templates

Adds the ng-template content to the internal template store under the `"key"` id

```typescript
import { Component } from '@angular/core';

@Component({
    selector: 'my-theme-body-cell',
    template: `
      <ng-template key="body-cell-text.tpl.html"
                   let-$cell>
        {{$cell.label}}
      </ng-template>
      `
})
export class BodyCellComponent {
}
```

## Theme Component

```typescript
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'q-grid-theme',
    template: `
        <my-theme-body-cell></my-theme-body-cell>
        <my-theme-head-cell></my-theme-head-cell>
    `,
	encapsulation: ViewEncapsulation.None
})
export class ThemeComponent {
}
```

## Theme Module

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateModule, ThemeService } from 'ng2-qgrid';
import { ThemeComponent } from './theme.component';
import { BodyCellComponent } from './components/body-cell.component';
import { HeadCellComponent } from './components/head-cell.component';

@NgModule({
  declarations: [
    ThemeComponent,
    BodyCellComponent,
    HeadCellComponent
  ],
  exports: [
    ThemeComponent
  ],
  imports: [
    CommonModule,
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


