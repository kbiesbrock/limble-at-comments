Project Instructions

Why:
When our customers are working on Tasks inside of Limble, there is a comment section that allows them to leave details on that Task. This is often used to let others know what is going on for that specific Task. In this case, they are waiting for parts:

This helps them communicate back and forth with each other on Tasks they need to complete.
The Improvement:
Currently, this feature works great, but there is no way to quickly tag people to bring them into the conversation. A user can say they are waiting on parts, but they can't say "@Bryan, please order parts for me."

Ideally, they would be able to do something like this:

How:
For example, Slack does this beautifully in their system:

As demonstrated in the image above, when typing @, Slack gives a popup that shows a list of people. From that list, you can click a name, add the person to the textbox, and after pressing enter, it will trigger a JavaScript function that will tag the person into the conversation.
The Build:
Build a simple Angular (latest) app that has this functionality:
A list of comments
A field that can allow people to add new comments
The field should be able to detect when you type in someone's name starting with an @, similar to the example in Slack. Here is a static set of users:
```
[
  {'userID' : 1, 'name' : 'Kevin'},
  {'userID' : 2, 'name' : 'Jeff'},
  {'userID' : 3, 'name' : 'Bryan'},
  {'userID' : 4, 'name' : 'Gabbey'},
]
```
When the entry is entered, it needs to detect which user was typed in and trigger a JavaScript function that alerts the person who is tagged.
The primary purpose of this project is to get the detect @user portion ready to port into our comment feature inside of Limble, so don't worry about things like persistence. You should make the styling of the dropdown and tagging of users look and function well, as that is what is being ported over. There is only one rule: don't use a library that provides this functionality; we want to see how you write it.
Make whatever changes you need to get the repo in a good place for demo. We don’t expect production code, but we’d like to see how far you get in the time you can commit to this. Once you have completed the project, please send us a link to your code or zip, and we will schedule a final interview to review your project and discuss your solution. In the meantime, our Recruiting team will follow up with a separate email containing additional information on processing payment for your time spent completing the project.



# Limble

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
