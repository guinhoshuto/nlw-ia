import { Button } from "./components/ui/button"
import { Wand2 } from 'lucide-react'
import { Separator } from "./components/ui/separator"
import { Textarea } from "./components/ui/textarea"
import { Label } from "./components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select"
import { Slider } from "./components/ui/slider"
import VideoInputForm from "./components/video-input-form"
import { PromptSelect } from "./components/prompt-select"
import { Header } from "./components/header"

export function App() {
  function handlePromptSelect(template: string){
    
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {/* main */}
      <main className="flex-1 p-6 flex gap-6">
        <div className="flex flex-col flex-1 gap-4">
          <div className="grid grid-rows-2 gap-4 flex-1">
            <Textarea 
              className="resize-none leading-relaxed p-5"
              placeholder="Inclua o prompt para a IA..."/>
            <Textarea 
              className="resize-none leading-relaxed p-5"
              placeholder="Resultado gerado pela IA..." 
              readOnly/>
          </div>
          <p className="text-sm text-muted-foreground">Lembre-se: você pode usar a variável <code className="text-violet-400">{'{'}transcription{'}'}</code> no seu prompt para adicionar o conteúdo da transcrição no vídeo selecionado</p>
        </div>
        <aside className="w-80 space-y-6">
          <VideoInputForm />
          <Separator />

          <form className="space-y-6">
            <PromptSelect onPromptSelected={handlePromptSelect} />

            <Separator />

            <div className="space-y-2">
              <Label>Modelo</Label>
              <Select disabled defaultValue="gpt3.5">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
                </SelectContent>
              </Select>
              <span className="block text-sm text-muted-foreground italic">
                Você poderá customizar essa opção em breve
              </span>
            </div>

            <Separator />

            <div className="space-y-4">
              <Label>Temperatura</Label>
              <Slider 
                min={0}
                max={1}
                step={0.1}
              />
              <span className="block text-sm text-muted-foreground italic leading-relaxed">
                Valores mais altos tendem a deixar o resultado mais criativo e e com possíveis erros
              </span>
            </div>

            <Separator />

            <Button className="w-full" type="submit">
              Executar
              <Wand2 className="w-4 h-4 ml-2"/>
            </Button>
            
          </form>
        </aside>
      </main>
    </div>
  )
}

