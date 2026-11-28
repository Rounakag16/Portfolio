"""
Turn the avatar artwork in this folder into web-ready poses in public/avatar/.

    python design/avatar-source/make_avatars.py

Every source is a transparent PNG named after its pose (`waving.png` -> pose "waving"). For each
one the script trims to the character, places it bottom-centred on a transparent 5:6 canvas (the
ratio Avatar.tsx expects) and saves public/avatar/<pose>.png. It also writes a head-and-shoulders
`head.png` from `face-happy.png`, used for the chat avatar and as the Person image in search results.

To add a pose: drop `<pose>.png` (background already removed) in this folder, run the script, and
add the name to the Pose type in src/components/Avatar.tsx.
"""
from pathlib import Path

from PIL import Image

HERE = Path(__file__).parent
OUT = HERE.parent.parent / "public" / "avatar"

HEAD_FROM = "face-happy.png"
NOT_POSES = {HEAD_FROM}
CANVAS = (600, 720)  # 5:6, sharp at 2x for the largest on-page size (~190px wide)


def trim(img: Image.Image) -> Image.Image:
    # Ignore near-invisible fringe pixels so they don't widen the crop.
    alpha = img.getchannel("A").point(lambda a: 255 if a > 8 else 0)
    return img.crop(alpha.getbbox())


def fit(img: Image.Image, size, pad=0.04) -> Image.Image:
    img = trim(img)
    cw, ch = size
    scale = min(cw * (1 - 2 * pad) / img.width, ch * (1 - pad) / img.height)
    img = img.resize((round(img.width * scale), round(img.height * scale)), Image.LANCZOS)
    canvas = Image.new("RGBA", size, (0, 0, 0, 0))
    canvas.paste(img, ((cw - img.width) // 2, ch - img.height), img)
    return canvas


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for src in sorted(HERE.glob("*.png")):
        if src.name in NOT_POSES:
            continue
        fit(Image.open(src).convert("RGBA"), CANVAS).save(OUT / src.name, optimize=True)
        print("saved", src.stem)

    # Head: the top of the expression portrait, so the face fills a small round frame.
    face = trim(Image.open(HERE / HEAD_FROM).convert("RGBA"))
    head = face.crop((0, 0, face.width, round(face.width * 0.9)))
    fit(head, (480, 576), pad=0.02).save(OUT / "head.png", optimize=True)
    print("saved head")


if __name__ == "__main__":
    main()
