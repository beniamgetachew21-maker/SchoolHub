import os
import sys

try:
    from PIL import Image
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pillow"])
    from PIL import Image

def main():
    image_path = r"C:\Users\BeniamG\.gemini\antigravity\brain\9e190af5-a987-4d19-838b-695cc208378e\media__1773230116119.jpg"
    output_dir = r"d:\Projects\studio-school\public\avatars"
    
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    img = Image.open(image_path)
    width, height = img.size

    cols = 5
    rows = 2

    cell_width = width / cols
    cell_height = height / rows

    names = [
        "aida.jpg", "bekele.jpg", "meaza.jpg", "tadesse.jpg", "lydia.jpg",
        "saron.jpg", "elias.jpg", "kebede.jpg", "hirut.jpg", "abiy.jpg"
    ]

    for row in range(rows):
        for col in range(cols):
            idx = row * cols + col
            
            # Base cell box
            left = col * cell_width
            upper = row * cell_height
            right = (col + 1) * cell_width
            lower = (row + 1) * cell_height
            
            # Let's crop inward to drop the white borders and text below
            # Horizontally inward 5% on each side
            pad_x = cell_width * 0.05
            # Vertically inward 5% from top, 20% from bottom (to remove the label)
            pad_y_top = cell_height * 0.05
            pad_y_bottom = cell_height * 0.20

            box = (
                int(left + pad_x),
                int(upper + pad_y_top),
                int(right - pad_x),
                int(lower - pad_y_bottom)
            )

            cropped = img.crop(box)
            output_path = os.path.join(output_dir, names[idx])
            cropped.save(output_path, quality=95)
            print(f"Saved {names[idx]}")

if __name__ == "__main__":
    main()
