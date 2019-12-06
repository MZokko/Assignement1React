class Task {
    constructor( key, description, _boolean, id) {
        this.taskKey = key;
        this.taskDesc = description;
        this.taskComplet =  _boolean;
        this.id = id
    };
}
export default Task;