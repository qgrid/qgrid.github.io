---
title: How to write a plugin
group: Customization
order: 1
---
- [What we are going to build](#what-we-are-going-to-build)
- [The Command](#the-command)
- [Pager Template](#pager-template)
- [Plugin Service](#plugin-service)
- [Pager Component](#pager-component)
- [Coming Soon](#coming-soon)

The main benefit of the q-grid model concept is a tight control over the q-grid state. The model instance becomes an entry point for the q-grid behavior transformations. The plugin system uses this feature to be simple and clear. Along with `DOM table`, plugins can be designed as standalone units without any q-grid internal infrastructure knowledge. Note that all components except table core units are plugins.

<a name="#what-we-are-going-to-build">
   What we are going to build
</a>

This page covers the fundamentals of the q-grid plugin system. We will build a custom pager that allows to switch between data pages using mouse clicks or keyboard keys.

{% docEditor "doc-qgrid-ng2-plugin" %}

<a name="#the-command">
   The Command
</a>

The q-grid utilizes `command` class as an object-oriented callback to implement interaction patterns. Here are some major properties that q-grid command has:

* `execute` method runs the code identified by the command object. 
* `canExecute` method indicates if a command can be executed.
* `shortcut` is a sequence of keyboard key codes to execute the command(e.g. 'shift+a', 'ctrl+s', 'f2').

Note that it's not enough just to setup `shortcut` property. In the final code next two lines have to be added to enable keyboard bindings.

```typescript
const { shortcut, manager } = this.plugin.model.action();
shortcut.register(manager, [this.gotoNext, this.gotoPrev]);
```

<a name="#pager-template">
   Pager Template
</a>

To show list of available pages we iterate through the component pages property and disable current page button. 

```html
<ul>
	<li *ngFor="let page of pages">
        <button (click)="goto.execute(page)" 
                [disabled]="!goto.canExecute(page)">
			{{page + 1}}
		</button>
	</li>
</ul>

```

<a name="#plugin-service">
    Plugin Service
</a>

* `GridPlugin` service is used to access q-grid model. Note that in 99% `GridPlugin` should be added to the component `providers`. This ensures that all model resources, like event handlers, will be disposed automatically when the component is destroyed. 

* Also `GridPlugin` service provides access to the q-grid DOM abstraction through the `table` property, which could be used in the complicated cases.

<a name="#pager-component">
    Pager Component
</a>

GridPlugin serves as endpoint to access the q-grid model. Commands are convenient abstractions to handle keyboard and mouse events. It's not required to use commands but this is a way how q-grid interaction model is built internally.

```typescript
import { Component, OnInit } from '@angular/core';
import { GridPlugin, Command } from 'ng2-qgrid';

@Component({
    selector: 'my-pager',
    providers: [GridPlugin],
    templateUrl: 'my-pager.component.html'
})
class MyPagerComponent {
    goto = new Command({
        execute: page => this.currentPage = page,
        canExecute: page => page !== this.currentPage
    });

    gotoNext = new Command({
        execute: () => this.currentPage = this.currentPage + 1,
        canExecute: () => this.currentPage < this.numberOfPages - 1,
        shortcut: 'ctrl+right'
    });

    gotoPrev = new Command({
        execute: () => this.currentPage = this.currentPage - 1,
        canExecute: () => this.currentPage > 0,
        shortcut: 'ctrl+left'
    });

    constructor(private plugin: GridPlugin) {}

    ngOnInit() {
        // Enable column shortcuts for the commands
        const { shortcut, manager } = this.plugin.model.action();
        shortcut.register(manager, [this.gotoNext, this.gotoPrev]);
    }

    get pages() {
        return Array.from(Array(this.numberOfPages).keys());
    }

    get currentPage() {
        return this.plugin.model.pagination().current;
    }

    set currentPage(value) {
        this.plugin.model.pagination({ current: value });
    }

    private get numberOfPages() {
        const { count, size } = this.plugin.model.pagination();
        return Math.max(1, Math.ceil(count / size));
    }
}
```

<a name="#coming-soon">
   Coming Soon
</a>

Any of the q-grid peripheral components like sorting, pager and filtration are designed using plugin model. Right now it's about 18 plugins that are coming with q-grid module. To reduce final bundle size in terms of minimal q-grid functionality these plugins will be placed under the separate module which required to be added separately.