import { Storage, File } from 'megajs'

export var storage: Storage;

export const initMega = async () => {
    const email = process.env.MEGA_EMAIL;
    const password =  process.env.MEGA_PASSWORD;
    if (!email || !password) {
        throw new Error('Cannot find email and password')
    }

    storage = new Storage({
        email: email,
        password: password,
        userAgent: 'ExampleApplication/1.0'
    })

    await storage.ready;
    
}

export const readImage = async (url: string): Promise<string | null> => {
    try {
        if (!url.startsWith("https://mega.nz")) {
            return url;
        }
        const file = await File.fromURL(url).loadAttributes();
        const buffer = await file.downloadBuffer({});
        
        // Determine the file type from the MIME type (assuming the file has a MIME type attribute)
        // You might need to adjust this based on the actual MIME type or file extension
        const mimeType = 'image/jpeg'; // Replace with actual MIME type if available

        // Convert the buffer to a base64 string
        const base64String = buffer.toString('base64');
        
        // Create the data URL
        const dataUrl = `data:${mimeType};base64,${base64String}`;

        return dataUrl;
    } catch (error) {
        console.error('Error reading image from MEGA:', error);
        return null;
    }
}