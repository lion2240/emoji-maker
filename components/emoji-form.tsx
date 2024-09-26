'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from 'lucide-react'

type Emoji = {
  id: string
  imageUrl: string
  prompt: string
  likes: number
}

interface EmojiFormProps {
  onEmojiGenerated: (newEmoji: Emoji) => void
}

export default function EmojiForm({ onEmojiGenerated }: EmojiFormProps) {
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/generate-emoji', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ prompt }),
       })
       const data = await response.json()
      
      if (data.success) {
        const newEmoji: Emoji = {
          id: Date.now().toString(), // Use a proper ID generation method in production
          imageUrl: data.imageUrl,
          prompt: prompt,
          likes: 0
        }
        onEmojiGenerated(newEmoji)
        
        toast({
          title: 'Emoji generated successfully!',
          description: 'Your new emoji has been added to the grid.',
        })
      } else {
        throw new Error(data.error || 'Failed to generate emoji')
      }
    } catch (error) {
      console.error('Error generating emoji:', error)
      toast({
        title: 'Error',
        description: 'Failed to generate emoji. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
      setPrompt('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Enter emoji prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate Emoji'
          )}
        </Button>
      </div>
    </form>
  )
}