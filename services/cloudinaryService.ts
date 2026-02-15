import { Cloudinary } from "@cloudinary/url-gen";

export const CLOUDINARY_CLOUD_NAME = process.env
  .EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME as string;
export const CLOUDINARY_UPLOAD_PRESET = process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string; // Should be an unsigned preset

export const cld = new Cloudinary({
    cloud: {
        cloudName: CLOUDINARY_CLOUD_NAME,
    },
});


export const uploadToCloudinary = async (uri: string): Promise<string> => {
    const formData = new FormData();

    // Create a blob-like object for the file
    const fileData = {
        uri,
        type: 'image/jpeg',
        name: 'upload.jpg',
    };

    formData.append("file", fileData as any);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
                method: "POST",
                body: formData,
            }
        );

        const data = await response.json();

        if (data.secure_url) {
            return data.secure_url;
        } else {
            console.error("Cloudinary Response Error:", data);
            throw new Error(data.error?.message || "Cloudinary upload failed");
        }
    } catch (error: any) {
        console.error("Cloudinary Upload Error:", error);
        throw new Error(error.message || "Network error during Cloudinary upload");
    }
};
