import { FileVideo, Upload } from 'lucide-react'
import { Separator } from './ui/separator'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { ChangeEvent, FormEvent, useMemo, useRef, useState } from 'react'
import { getFFmpeg } from '@/lib/ffmpeg'
import { fetchFile } from '@ffmpeg/util'

export default function VideoInputForm(){
    const [videoFile, setVideoFile] = useState<File | null>(null)
    const promptInputRef = useRef<HTMLTextAreaElement>(null)

    function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
        const { files } = event.currentTarget
        if(!files) return 
        setVideoFile(files[0])
    }

    async function convertVideoToAudio(video: File){
      const ffmpeg = await getFFmpeg()  
      await ffmpeg.writeFile('input.mp4', await fetchFile(video))

      ffmpeg.on('log', log => console.log('LOG: ',log))
      ffmpeg.on('progress', progress => {
        console.log('PROGRESS: ', Math.round(progress.progress*100))
      })
      await ffmpeg.exec([
        '-i', 
        'input.mp4',
        '-map',
        '0:a',
        '-b:a', 
        '20k', 
        '-acodec',
        'libmp3lame',
        'output.mp3'
      ])

      const data = await ffmpeg.readFile('output.mp3')
      const audioFileBlob = new Blob([data], { type: 'audio/mpeg'})
      const audioFile = new File([audioFileBlob], 'audio.mp3', { type: 'audio/mpeg'}) 
      console.log('LOG: ', 'Convert finished')
    }

    async function handleUploadVideo(event: FormEvent<HTMLFormElement>){
        event.preventDefault()
        const prompt = promptInputRef.current?.value

        if(!videoFile) return
        const audioFile = await convertVideoToAudio(videoFile)
    }

    const previewUrl = useMemo(() => {
        if(!videoFile) return null
        return URL.createObjectURL(videoFile)
    }, [videoFile])

    return(
          <form onSubmit={handleUploadVideo} className="space-y-6">
            <label 
              htmlFor="video" 
              className="overflow-hidden relative border w-full flex aspect-video rounded-md cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5"
            >
                {previewUrl ? (
                    <video 
                        src={previewUrl} 
                        controls={false} 
                        className='w-full h-full absolute inset pointer-events-none'
                        />
                ) : (
                    <>
                        <FileVideo className="h-4 w-4" />
                        Selecione um vídeo
                    </>
                )}
            </label>
            <input 
              className="sr-only"
              type="file" 
              id="video" 
              onChange={handleFileSelected}
              accept="video/mp4"/>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="transcription_prompt">Prompt de transcrição</Label>
              <Textarea 
                ref={promptInputRef}
                id="transcription_prompt" 
                placeholder="Inclua palavras-chave mencionadas no vídeo separadas por vírgula"
                className="resize-none h-20 p-4 leading-relaxed"/>
            </div>
            <Button type="submit" className="w-full">
              Carregar vídeo
              <Upload className="w-4 h-4 ml-2" />
            </Button>
          </form>

    )
}