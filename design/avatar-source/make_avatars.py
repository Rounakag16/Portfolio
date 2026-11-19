"""
Turn the avatar artwork in this folder into web-ready poses in public/avatar/.

    python design/avatar-source/make_avatars.py

For each source image it removes the flat beige background (flood fill from the edges, so the
character's outlines stop it), trims to the character, places it bottom-centred on a transparent
5:6 canvas (the ratio Avatar.tsx expects) and saves public/avatar/<pose>.png. It also cuts a
square head crop for the "head" pose. Add a new source file to POSES to publish another pose,
then add the pose name to READY in src/components/Avatar.tsx.
"""
from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

HERE = Path(__file__).parent
OUT = HERE.parent.parent / "public" / "avatar"

POSES = {
    "Cheerful Waving.png": "waving",
    "Frustrated Man.png": "facepalm",
    "Cheering Celebration.png": "celebrating",
    "Master Photo.jpg": "laptop",
    "Cheerful Double-Pointing Left.png": "pointing-left",
    "Cheerful Double-Pointing Right.png": "pointing-right",
    "Thoughtful.png": "thinking",
}
HEAD_FROM = "pointing-right"
CANVAS = (600, 720)  # 5:6, sharp at 2x for the largest on-page size (~190px wide)
TOLERANCE = 34  # max RGB distance from the sampled background that still counts as background


def remove_background(img: Image.Image) -> Image.Image:
    rgb = np.asarray(img.convert("RGB"), dtype=np.int16)
    h, w, _ = rgb.shape
    border = np.concatenate([rgb[0], rgb[-1], rgb[:, 0], rgb[:, -1]])
    bg = np.median(border, axis=0)
    close = np.sqrt(((rgb - bg) ** 2).sum(axis=2)) <= TOLERANCE

    # Flood fill from every edge pixel through "close to background" pixels only.
    seen = np.zeros((h, w), dtype=bool)
    q = deque()
    for x in range(w):
        for y in (0, h - 1):
            if close[y, x] and not seen[y, x]:
                seen[y, x] = True; q.append((y, x))
    for y in range(h):
        for x in (0, w - 1):
            if close[y, x] and not seen[y, x]:
                seen[y, x] = True; q.append((y, x))
    while q:
        y, x = q.popleft()
        for ny, nx in ((y - 1, x), (y + 1, x), (y, x - 1), (y, x + 1)):
            if 0 <= ny < h and 0 <= nx < w and not seen[ny, nx] and close[ny, nx]:
                seen[ny, nx] = True; q.append((ny, nx))

    # Also clear large enclosed background areas (e.g. the gap between legs). Small ones, like the
    # whites of the eyes or teeth, stay: they're part of the drawing.
    min_hole = int(h * w * 0.004)
    hole_seen = seen.copy()
    for sy, sx in zip(*np.nonzero(close & ~seen)):
        if hole_seen[sy, sx]:
            continue
        region = [(sy, sx)]; hole_seen[sy, sx] = True; i = 0
        while i < len(region):
            y, x = region[i]; i += 1
            for ny, nx in ((y - 1, x), (y + 1, x), (y, x - 1), (y, x + 1)):
                if 0 <= ny < h and 0 <= nx < w and not hole_seen[ny, nx] and close[ny, nx]:
                    hole_seen[ny, nx] = True; region.append((ny, nx))
        if len(region) >= min_hole:
            ys, xs = zip(*region); seen[list(ys), list(xs)] = True

    alpha = Image.fromarray(np.where(seen, 0, 255).astype(np.uint8))
    # Pull the edge in by a pixel and soften it, so no beige fringe shows on other backgrounds.
    alpha = alpha.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.8))
    out = img.convert("RGBA")
    out.putalpha(alpha)
    return out


def fit(img: Image.Image, size, anchor_bottom=True, pad=0.04) -> Image.Image:
    img = img.crop(img.getchannel("A").getbbox())
    cw, ch = size
    scale = min(cw * (1 - 2 * pad) / img.width, ch * (1 - pad) / img.height)
    img = img.resize((round(img.width * scale), round(img.height * scale)), Image.LANCZOS)
    canvas = Image.new("RGBA", size, (0, 0, 0, 0))
    x = (cw - img.width) // 2
    y = ch - img.height if anchor_bottom else (ch - img.height) // 2
    canvas.paste(img, (x, y), img)
    return canvas


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    cut = {}
    for src, pose in POSES.items():
        img = remove_background(Image.open(HERE / src))
        cut[pose] = img
        fit(img, CANVAS).save(OUT / f"{pose}.png", optimize=True)
        print("saved", pose)

    # Head: head and shoulders from the top of the figure, used for the chat avatar and as the
    # Person image in search results.
    fig = cut[HEAD_FROM]
    fig = fig.crop(fig.getchannel("A").getbbox())
    head = fig.crop((int(fig.width * 0.10), 0, int(fig.width * 0.74), int(fig.width * 0.62)))
    fit(head, (480, 576), anchor_bottom=True, pad=0.02).save(OUT / "head.png", optimize=True)
    print("saved head")


if __name__ == "__main__":
    main()
