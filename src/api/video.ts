import path from 'path';
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

export default function GET(req: NextApiRequest, res: NextApiResponse) {
    const videoPath = path.resolve(
        process.env.VIDEO_PATH || "D:/My Data/Hackathons/robofest/finalwebui/public/output_video.mp4"
    );

    if (!fs.existsSync(videoPath)) {
        res.status(404).send("Video not found");
        return;
    }

    res.setHeader('Content-Type', 'video/mp4');
    const fileStream = fs.createReadStream(videoPath);
    fileStream.pipe(res);
}
