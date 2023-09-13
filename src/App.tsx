import { Button } from "./components/ui/button"
import { Github } from 'lucide-react'
import { Separator } from "./components/ui/separator"
import { Textarea } from "./components/ui/textarea"

export function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-6 py-3 flex items-center justify-between border-b">
        <h1>upload.ai</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Desenvolvido com ❤️</span>
          <Separator orientation="vertical" className="h-6"/>
          <Button variant="outline"><Github className="w-4 h-4 mr-2"/>Github</Button>
        </div>
      </div>
      {/* main */}
      <main className="flex-1 p-6 flex gap-6">
        <div className="flex flex-col flex-1 gap-4">
          <div className="grid grid-rows-2 gap-4 flex-1">
            <Textarea />
            <Textarea />
          </div>
          <p className="text-sm text-muted-foreground">Lembre-se: você pode usar a variável <code className="text-violet-400">{'{'}transcription{'}'}</code> no seu prompt para adicionar o conteúdo da transcrição no vídeo selecionado</p>
        </div>
        <aside className="w-80"></aside>
      </main>
    </div>
  )
}

