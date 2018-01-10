---
title: ActionModel
type: api
group: API
order: 0
---
A class to handle and visualize custom user behaviors(like add or delete row).
Action bar plugin uses this model to draw buttons to execute commands.


Property|Type|Description<a class="github-link2" target="_blank" href="https://github.com/qgrid/ng2/tree/master/core/action/action.model.js"><span>action.model.js</span></a>
---|---|---
items|`Action[]`|List of actions that will be added to the command manager.
manager|`CommandManager`|Command manager is responsible for the next questions:<br>* What commands can be executed.<br>* How(e.g. in which order) commands should be executed.
shortcut|`Shortcut`|This service connects keydown events with commands.

