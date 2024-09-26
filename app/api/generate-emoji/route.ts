import { NextResponse } from 'next/server'
import Replicate from 'replicate'

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
})

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()

    const output = await replicate.run(
      "fofr/sdxl-emoji:dee76b5afde21b0f01ed7925f0665b7e879c50ee718c5f78a9d38e04d523cc5e",
      {
        input: {
          prompt: "A TOK emoji of a "+prompt,
          apply_watermark: false
        }
      }
    )

    if (Array.isArray(output) && output.length > 0) {
      return NextResponse.json({ success: true, imageUrl: output[0] })
    } else {
      throw new Error('Invalid output from Replicate')
    }
  } catch (error) {
    console.error('Error generating emoji:', error)
    return NextResponse.json({ success: false, error: 'Failed to generate emoji' }, { status: 500 })
  }
}