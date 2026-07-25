# Custom blog thumbnails

Drop an image in this folder to use it as the thumbnail for a specific
dev.to post, instead of the cover image dev.to generated.

**File name must match the post's exact title** (same spelling, spacing,
and punctuation), with one of these extensions: `.jpg`, `.jpeg`, `.png`,
or `.webp`.

Example — a post titled:

    Building FriendFi in 24 Hours

should have a file at:

    assets/blogs/Building FriendFi in 24 Hours.jpg

If no matching file is found, the site falls back to the cover image
from dev.to. If neither exists, the post card just shows without a
thumbnail — nothing breaks.
