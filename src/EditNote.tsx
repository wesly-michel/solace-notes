import { NoteData } from "./App"
import { NoteForm } from "./NoteForm"
import { useNote } from "./NoteLayout"

type EditNotesProps = {
    onSubmit: (id: string, data: NoteData) => void
}

export function EditNote ({ onSubmit  }: EditNotesProps){
    const note = useNote()
    return (    
        <div>
            <h1 className="mb-4">Edit Note</h1>
            <NoteForm 
                title={note.title}
                body={note.body}
                onSubmit={data => onSubmit(note.id, data)} 
/>
        </div>
    )
}

