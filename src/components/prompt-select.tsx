import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "./ui/select"
import { Label } from "./ui/label"
import { api } from "@/lib/axios"
import { useEffect, useState } from "react"

type Prompt = {
    id: string
    title: string
    template: string
}

type PromptSelectProps ={ 
    onPromptSelected: (template: string) => void
}

export function PromptSelect({onPromptSelected}: PromptSelectProps){
    const [prompts, setPrompts] = useState<Prompt[] | null>(null)

    useEffect(() => {
        api.get('/prompts').then(response => {
            console.log(response.data)
            setPrompts(response.data)
        })
    }, [])

    function handlePromptSelect(promptId: string){
        const selectedPrompt = prompts?.find(prompt => prompt.id === promptId)
        if(!selectedPrompt) return

        onPromptSelected(selectedPrompt.template)
    }

    return(
        <div className="space-y-2">
            <Label>Prompt</Label>
            <Select onValueChange={handlePromptSelect}>
                <SelectTrigger>
                    <SelectValue placeholder="Selecione um prompt"/>
                </SelectTrigger>
                <SelectContent>
                    {prompts?.map(prompt => { return(
                        <SelectItem key={prompt.id} value={prompt.id}>{prompt.title}</SelectItem>
                    )})}
                </SelectContent>
            </Select>
        </div>

    )
}