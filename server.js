const EventEmitter = require('events')

class Server extends EventEmitter{
    constructor(client){
        super()
        this.tasks = {}
        this.taskId = 1
        process.nextTick(()=>{
            this.emit('response','Type a command')
        })
        this.emit('response', 'Type a command ')
        client.on('command',(command,args)=>{
            switch(command){
                case 'help' :
                case 'add'  :
                case 'ls'   :
                case 'delete':
                    this[command](args)
                    break
                default:
                    this.emit('response', 'Unknown commanda')         
            }
        })
    }
    tasksString(){
        return Object.keys(this.tasks).map(key=>{
            return `${key}: ${this.tasks[key]}`
        }).join('\n')
    }
    help(){
        this.emit('response',`All commands
        add task
        ls
        delete :id
        `)
    }
    add(args){
        this.tasks[this.taskId] = args.join(' ')
        this.emit('response',`Added task ${this.taskId} \n ${this.tasks[this.taskId]}`)
        this.taskId++
    }
    ls(){
            this.tasksString().length >0 
        ?   this.emit('response',`Tasks:\n ${this.tasksString()}`)
        :   this.emit('response',`Tasks are empty`)
        
    }
    delete(args){
       if(this.tasks.length >0){
        delete(this.tasks[args[0]])
        this.emit('response',`Deleted task ${args[0]}`)
       }else{
        this.emit('response',`No tasks available`)   
       }
    }
}

module.exports = (client)=> new Server(client) 