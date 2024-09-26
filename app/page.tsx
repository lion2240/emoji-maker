'use client'

import { useState } from 'react'
import EmojiForm from '@/components/emoji-form'
import EmojiGrid, { Emoji } from '@/components/emoji-grid'

export default function Home() {
  const [emojis, setEmojis] = useState<Emoji[]>([])

  const handleEmojiGenerated = (newEmoji: Emoji) => {
    setEmojis(prevEmojis => [newEmoji, ...prevEmojis])
  }

  const handleLike = (id: string) => {
    setEmojis(prevEmojis => prevEmojis.map(emoji => 
      emoji.id === id ? { ...emoji, likes: emoji.likes + 1 } : emoji
    ))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Emoji Maker</h1>
      <EmojiForm onEmojiGenerated={handleEmojiGenerated} />
      <EmojiGrid emojis={emojis} onLike={handleLike} />
    </div>
  )
}
