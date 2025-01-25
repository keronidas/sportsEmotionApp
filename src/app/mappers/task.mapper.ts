import { RESTTask } from "../interfaces/rest-task.interface";
import { Task } from "../interfaces/task.interface";

export class TaskMapper {

    static mapRestTaskToTask(restTask: RESTTask): Task {
        return {
            userId: restTask.userId,
            id: restTask.id,
            title: restTask.title,
            completed: restTask.completed
        }
    }

    static mapRestTaskArrayToTaskArray(restTasks: RESTTask[]): Task[] {
        return restTasks.map((task) => this.mapRestTaskToTask(task))
    }

}