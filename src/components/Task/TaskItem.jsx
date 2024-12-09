import React,{useState} from `react`;

const TaskItem = ({task,onToggleComplete,onEdit,onDelete}) => {
    //Local state for editing
    const [isEditing,setIsEditing] = useState(false);
    const[editTitle,setEditTitle] = useState(task.title);

    const handelEdit=()=>{
        setIsEditing(true);
    }

    const handleSave=()=>{
        if(editTitle.trim()){
            onEdit(task.id,editTitle);
            setIsEditing(false);
        }
    };

    return(
        <div styl{{display:`flex`,alignItem:`center`,marginBottom:`10px`}}>

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
            onBlur={handleSave}
            onKeyDown={(e)=>e.key === `Enter` && handleSave()}
            style={{flexGrow:1,margin:`10px`}}
            ></input>
        ):(
        // Not in editing mode
        <span
            style={{
                textDecoration: teak.isComplete?`line-through`:`none`,
                flexGrow:1,
                marginRight:`10px`,
            }}
        >{task.title}</span>
        )}

        // Handel buttons here
        {!isEditing &&(
            <div>
            <button onClick={handelEdit} style = {{marginRight:`10px`}}>
            Edit</button>
            <button onClick={()=> onDelete(task.id)}>
            Delete</button>
            </div>
        )}
        </div>
);
};

export default TaskItem;