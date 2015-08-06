/// <reference path="../../../typings/tsd.d.ts" />
import {Inject} from 'utils/di';

export class TaskListComponent {

  private static selector = 'ngc-tasks';
  public static templateUrl = 'components/task-list/task-list-component.html';
  private static options = {};

  private _tasks;
  private _users;
  private _user;
  private _displayName;
  private _errorMessage;

  constructor(
    @Inject('$log') private $log,
    @Inject('router') private router,
    @Inject('authenticationStore') private authenticationStore,
    @Inject('tasksStore') private tasksStore,
    @Inject('usersStore') private usersStore,
    @Inject('tasksActions') private tasksActions
    ) {

      this.authenticationStore.addChangeListener(
        Rx.Observer.create(
          (user) => {
            this._user = user;
            //console.log(this.user);
            //console.log(this.user.data.username); 
          },
          (error) => this._errorMessage = error
        ));

      this.tasksStore.addChangeListener(
        Rx.Observer.create(
          (tasks) => this._tasks = tasks,
          (error) => this._errorMessage = error
        ));
        
      this.usersStore.addChangeListener(
        Rx.Observer.create(
          (users) => {
            this._users = users;
            this._displayName = this.usersStore
              .getUserDisplayName(this.user.data.username);
             
          },
          (error) => this._errorMessage = error
        ));
  }

  private addTask(task) {
    this.tasksActions.addTask(task);
    this.router.goToTaskList();  
  }

  private goToAddTask() {
    this.router.goToAddTask.bind(this.router);
  }
  
  private getDisplayName() {
    this.usersStore.getUserDisplayName(
      this.user.data.username);
  }
  
  get tasks() {
    return this._tasks;
  }
  
  get displayName() {
    return this._displayName;
  }
  
  get user() {
    return this._user;
  }
  get errorMessage() {
    return this._errorMessage;
  }
};

