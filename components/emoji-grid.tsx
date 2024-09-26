'use client'

import Image from 'next/image'
import { Heart, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

export type Emoji = {
  id: string
  imageUrl: string
  prompt: string
  likes: number
}

interface EmojiGridProps {
  emojis: Emoji[]
  onLike: (id: string) => void
}

export default function EmojiGrid({ emojis, onLike }: EmojiGridProps) {
  const handleDownload = (imageUrl: string, prompt: string) => {
    // TODO: Implement download functionality
    console.log(`Downloading emoji: ${prompt}`)
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {emojis.map((emoji) => (
        <div key={emoji.id} className="relative group">
          <Image
            src={emoji.imageUrl}
            alt={emoji.prompt}
            width={200}
            height={200}
            className="w-full h-auto rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onLike(emoji.id)}
              className="text-white mr-2"
            >
              <Heart className={emoji.likes > 0 ? 'fill-current' : ''} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDownload(emoji.imageUrl, emoji.prompt)}
              className="text-white"
            >
              <Download />
            </Button>
          </div>
          <p className="mt-2 text-sm text-center">{emoji.prompt}</p>
          <p className="text-sm text-center text-gray-500">{emoji.likes} likes</p>
        </div>
      ))}
    </div>
  )
}