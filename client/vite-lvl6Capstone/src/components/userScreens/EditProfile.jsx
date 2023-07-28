import React from "react";


export default function EditProfile(){
const maxLength = 100
const [text , setText ] = React.useState('')
    return(
        <div className="editContainer">
            <textarea
                value={text}
                maxLength={maxLength}
                onChange={(e) => setText(e.target.value.slice(0, maxLength))}
            />
            <p>
                Remaining Characters: {maxLength - text.length}/{maxLength}
            </p>
    </div>
    )
}