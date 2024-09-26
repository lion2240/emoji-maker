'use client'

import Image from 'next/image'
import { Heart, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { downloadImage } from '@/utils/downloadImage'
import { useState } from 'react'

export type Emoji = {
  id: string
  imageUrl: string
  prompt: string
  likes: number
}

interface EmojiGridProps {
  emojis: Emoji[]
  onLike: (id: string) => void
  onUnlike: (id: string) => void
}

export default function EmojiGrid({ emojis, onLike, onUnlike }: EmojiGridProps) {
  const [likedEmojis, setLikedEmojis] = useState<Set<string>>(new Set())

  const handleDownload = (imageUrl: string, prompt: string) => {
    const fileName = `emoji-${prompt.replace(/\s+/g, '-').toLowerCase()}.png`;
    downloadImage(imageUrl, fileName);
  }

  const handleLikeToggle = (id: string) => {
    if (likedEmojis.has(id)) {
      // Unlike
      const newLikedEmojis = new Set(likedEmojis)
      newLikedEmojis.delete(id)
      setLikedEmojis(newLikedEmojis)
      onUnlike(id)
    } else {
      // Like
      setLikedEmojis(new Set(likedEmojis).add(id))
      onLike(id)
    }
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
              onClick={() => handleLikeToggle(emoji.id)}
              className="text-white mr-2"
            >
              <Heart className={likedEmojis.has(emoji.id) ? 'fill-current text-red-500' : ''} />
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