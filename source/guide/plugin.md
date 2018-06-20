---
title: My Plugin
type: guide
group: Getting started
order: 4
---

## What we are going to build

This page covers the fundamentals of the q-grid plugin system. We will build a custom pager that allows to switch between data pages using mouse clicks or keyboard keys.

{% docEditor "doc-qgrid-ng2-plugin" %}

## The Command

q-grid utilizes `command` class as an object-oriented callback to implement interaction patterns. Here are some major properties that q-grid command has:

* `execute` method runs the code identified by the command object. 
* `canExecute` method indicates if a command can be executed.
* `shortcut` is a sequence of keyboard key codes to execute the command(e.g. 'shift+a', 'ctrl+s', 'f2').

Note, that it's not enough just to setup `shortcut` property. In the final code you can find these two lines that utilize special services to bind key presses and commands.

```typescript
const { shortcut, manager } = this.plugin.model.action();
shortcut.register(manager, [this.gotoNext, this.gotoPrev]);
```

## Pager template

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

## The Plugin Service

* `GridPlugin` service is used to access q-grid model. Note, that in 99% `GridPlugin` should be added to the component `providers`. This ensures that all model resources, like event handlers, will be disposed automatically when the component is destroyed. 
* Also `GridPlugin` service provides access to the q-grid DOM abstraction through the `table` property, which could be used for more complicated cases than pager plugin.

## Pager component

GridPluing serves as endpoint to access q-grid model and commands are convenient abstractions to handle keyboard and mouse events.

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