import fs from "fs";
import path from "path";

export default function handler(req, res) {
    const songsDir = path.join(process.cwd(), "public", "songs");

    try {
        let files = fs.readdirSync(songsDir);
        let mp3Files = files.filter(file => file.endsWith(".mp3"));
        res.status(200).json(mp3Files);
    } catch (error) {
        res.status(500).json({ error: "Failed to read directory" });
    }
}
