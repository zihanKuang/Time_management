import React ,{Children, createContext,useContext,useState} from "react";

// 创建上下文
const TaskContext = createContext();

//自定义hook，用于消费任务上下文
export const useTask = () => useContext(TaskContext);

//提供者组件
export const TaskProvider = ({Children}) => {
    // 不要直接更新，会出问题 无法触发数据更新

    const [tasks,setTasks] = useState({
        "2024-12-01":[{id:1,title:"Task 1",completed:false}],
        "2024-12-05":[
            {id:2,title:"Task 123",completed:false},
            {id:3,title:"Task 234",completed:true},
        ],
    })

    const toggleTaskStatus = (date,id) => {
        // 深度拷贝当前任务状态
        const tasksForDate = tasks[date] ? [...tasks[date]]:[];
        // 找到需要修改的任务
        const updatedTasks = tasksForDate.map((task)=>
            task.id === id?{...task,isComplete:!task.isComplete}:task
        );
        // 更新状态
        setTasks({...tasks,[date]:updatedTasks});
    };

    const editTask = (date,id,newTitle) => {
         // 深度拷贝当前任务状态
         const tasksForDate = tasks[date] ? [...tasks[date]]:[];
         // 找到需要修改的任务
         const updatedTasks = tasksForDate.map((task)=>
             task.id === id?{...task,title:newTitle}:task
         );
         // 更新状态
         setTasks({...tasks,[date]:updatedTasks});
    };

    const deleteTask = (date,id) => {
        // 获取指定日期的任务列表
        // 如果该日期有任务，用 [...tasks[date]] 创建任务数组的拷贝（避免直接修改原状态）
        // 如果该日期没有任务（tasks[date] 是 undefined），返回空数组 []。
        const tasksForDate = tasks[date] ? [...tasks[date]]:[];
        // 过滤掉指定任务
        // 只保留 task.id 不等于 id 的任务
        const updatedTasks = tasksForDate.filter((task) => {
            return task.id !== id
    });
        // { ...tasks }创建当前 tasks 状态的浅拷贝，保留原有的其他日期任务。
        // [date]: updatedTasks 更新指定日期的任务列表为 updatedTasks，即过滤掉目标任务后的新数组。
        setTasks({...tasks,[date]:updatedTasks});
    };

    const fetchTasks = (date) => tasks[date] || [];

    return(
        <TaskContext.Provider value={{tasks,toggleTaskStatus,editTask,deleteTask,fetchTasks}}>
            {Children}
        </TaskContext.Provider>

    )

}
