import React,{useState} from `react`;

const TaskItem = ({task,onToggleComplete,onEdit,onDelete}) => {
    //Local state for editing
    const [isEditing,setIsEditing] = useState(false);
    const[editTitle,setEditTitle] = useState(task.title);

    const handleSave=()=>{
        if(editTitle.trim()){
            onEdit(task.id,editTitle);// 调用父组件传递的onEdit函数
            setIsEditing(false);// 退出编辑模式
        }
    };

    return(
        <div 
        style={{
            display:`flex`,
            alignItems:`center`,
            marginBottom:`10px`,
        }}>

        <input
            type="checkbox"
            checked ={task.isComplete}
            onChange={()=> onToggleComplete(task.id)}
            style={{marginRight:`10px`}}
        ></input>

        // If is in editing mode
        {isEditing?(
            <input
            type="text"
            value={editTitle}
            onChange={(e)=> setEditTitle(e.target.value)}
            onBlur={handleSave} // save when losing focus
            onKeyDown={(e)=>e.key === `Enter` && handleSave()} // save on Enter
            style={{flexGrow:1,marginRight:`10px`}}
            ></input>
        ):(
        // Not in editing mode
        <span
            style={{
                textDecoration: task.isComplete?`line-through`:`none`,
                flexGrow:1,
                marginRight:`10px`,
            }}
        >{task.title}
        </span>
        )}

        // Handel buttons here
        {!isEditing &&(
            <div>
                <button onClick={()=>setIsEditing(true)} style = {{marginRight:`10px`}}>
                    Edit
                </button>
                <button onClick={()=> onDelete(task.id)}>
                    Delete
                </button>
            </div>
        )}
        </div>
);
};

export default TaskItem;