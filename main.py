import os
from PIL import Image


def create_thumbnails(image_folder, thumbnail_size=(512, 512)):
    thumbnail_folder = os.path.join(image_folder, "thumbnails")
    os.makedirs(thumbnail_folder, exist_ok=True)

    for filename in os.listdir(image_folder):
        file_path = os.path.join(image_folder, filename)

        if os.path.isfile(file_path) and filename.lower().endswith((".png", ".jpg", ".jpeg", ".bmp", ".gif")):
            thumbnail_path = os.path.join(thumbnail_folder, filename)
            if os.path.exists(thumbnail_path):
                continue
            try:
                with Image.open(file_path) as img:
                    img.thumbnail(thumbnail_size)
                    img.save(thumbnail_path)
                    print(f"Thumbnail created: {thumbnail_path}")
            except Exception as e:
                print(f"Error processing {filename}: {e}")


if __name__ == "__main__":
    image_folder = "images"  # Change this if needed
    create_thumbnails(image_folder)
