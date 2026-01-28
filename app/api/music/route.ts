import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
    const musicDirectory = path.join(process.cwd(), 'public')

    try {
        const files = fs.readdirSync(musicDirectory)
        const mp3Files = files
            .filter(file => file.endsWith('.mp3'))
            .sort((a, b) => a.localeCompare(b))
            .map((file, index) => ({
                id: index,
                name: file.replace('.mp3', ''),
                file: `/${file}`
            }))

        return NextResponse.json(mp3Files)
    } catch (error) {
        console.error('Error reading music directory:', error)
        return NextResponse.json({ error: 'Failed to read music directory' }, { status: 500 })
    }
}
