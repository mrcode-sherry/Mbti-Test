import fs from "fs";
import path from "path";
import gTTS from "gtts";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { text, lang } = await req.json();
    const filePath = path.join(process.cwd(), "public", "voice.mp3");

    const tts = new gTTS(text, lang);
    await new Promise((resolve, reject) => {
      tts.save(filePath, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    return NextResponse.json({ url: "/voice.mp3" });
  } catch (error) {
    console.error("TTS Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
