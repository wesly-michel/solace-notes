import { NoteData} from "./App"
import { NoteForm } from "./NoteForm"

type NewNotesProps = {
    onSubmit: (data: NoteData) => void
}

export function NewNote ({ onSubmit}: NewNotesProps){
    return (    
        <div>
            <h1 className="mb-4">New Note</h1>
            <NoteForm onSubmit={onSubmit}/>
        </div>
    )
}

