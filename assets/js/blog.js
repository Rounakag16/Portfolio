"use strict";

/**
 * Blog powered by dev.to.
 *
 * Publish a post on dev.to and it shows up here automatically the next
 * time someone loads this page — nothing to sync by hand, no rebuild
 * needed. Reading the full post also happens on this site, styled to
 * match the rest of the portfolio, instead of sending people away.
 *
 * SETUP: put your dev.to username below.
 *
 * CUSTOM THUMBNAILS: drop an image into assets/blogs/ named exactly
 * after a post's title (e.g. "Building FriendFi in 24 Hours.jpg") to use
 * it instead of dev.to's auto-generated cover image. See
 * assets/blogs/README.md for details. If no local match exists, the
 * dev.to cover image is used; if neither exists, no thumbnail is shown.
 */
const DEVTO_USERNAME = "rounakag";

(function () {
  const listView = document.querySelector("[data-blog-list-view]");
  const readerView = document.querySelector("[data-blog-reader-view]");
  const listEl = document.querySelector("[data-blog-posts-list]");
  const emptyMsg = document.querySelector("[data-blog-empty-msg]");
  const backBtn = document.querySelector("[data-blog-back-btn]");
  const readerMeta = document.querySelector("[data-blog-reader-meta]");
  const readerTitle = document.querySelector("[data-blog-reader-title]");
  const readerBody = document.querySelector("[data-blog-reader-body]");

  if (!listEl) return; // blog markup not on this page

  function formatDate(iso) {
    const d = new Date(iso);
    if (isNaN(d)) return iso;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }

  function slugify(str) {
    return String(str)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  // Builds an ordered list of image URLs to try for a post's thumbnail:
  // exact-title match in assets/blogs/, then a slugified-filename match,
  // then dev.to's own cover image, in that order.
  function bannerCandidates(post) {
    const exts = ["jpg", "jpeg", "png", "webp"];
    const names = [post.title, slugify(post.title)];
    const candidates = [];
    names.forEach(function (name) {
      exts.forEach(function (ext) {
        candidates.push("./assets/blogs/" + encodeURIComponent(name) + "." + ext);
      });
    });
    const devtoCover = post.cover_image || post.social_image;
    if (devtoCover) candidates.push(devtoCover);
    return candidates;
  }

  // Global fallback handler used by the inline onerror on each thumbnail
  // <img>. Walks through the remaining candidate URLs; if none load, the
  // whole thumbnail box is hidden so the card just shows text.
  window.__blogImgFallback = function (img) {
    const remaining = (img.getAttribute("data-fallbacks") || "").split("|").filter(Boolean);
    if (!remaining.length) {
      const box = img.closest(".blog-banner-box");
      if (box) box.style.display = "none";
      return;
    }
    const next = remaining.shift();
    img.setAttribute("data-fallbacks", remaining.join("|"));
    img.src = next;
  };

  function showEmpty(message) {
    listEl.innerHTML = "";
    if (emptyMsg) {
      emptyMsg.textContent = message;
      emptyMsg.style.display = "block";
      listEl.appendChild(emptyMsg);
    }
  }

  function renderList(posts) {
    listEl.innerHTML = "";

    if (!posts.length) {
      showEmpty("No posts yet — check back soon.");
      return;
    }

    posts.forEach(function (post) {
      const li = document.createElement("li");
      li.className = "blog-post-item";
      li.setAttribute("data-post-id", post.id);

      const candidates = bannerCandidates(post);
      const firstSrc = candidates.shift();
      const category = (post.tag_list && post.tag_list[0]) || "Blog";

      li.innerHTML = [
        '<a href="#" data-id="' + post.id + '" data-url="' + post.url + '">',
        '  <figure class="blog-banner-box">',
        firstSrc
          ? '    <img src="' + firstSrc + '" data-fallbacks="' + candidates.join("|") +
            '" onerror="window.__blogImgFallback(this)" alt="' + post.title + '" loading="lazy">'
          : "",
        '  </figure>',
        '  <div class="blog-content">',
        '    <div class="blog-meta">',
        '      <p class="blog-category">' + category + '</p>',
        '      <span class="dot"></span>',
        '      <time datetime="' + post.published_at + '">' + formatDate(post.published_at) + '</time>',
        '    </div>',
        '    <h3 class="h3 blog-item-title">' + post.title + '</h3>',
        '    <p class="blog-text">' + (post.description || "") + '</p>',
        '  </div>',
        '</a>'
      ].join("");

      if (!firstSrc) {
        li.querySelector(".blog-banner-box").style.display = "none";
      }

      listEl.appendChild(li);
    });
  }

  function showUnavailable() {
    readerMeta.innerHTML = "";
    readerTitle.textContent = "This post is no longer available";
    readerBody.innerHTML = "<p>It looks like this post was removed or unpublished on dev.to. Please go back and pick another one.</p>";
    listView.style.display = "none";
    readerView.style.display = "block";
    window.scrollTo(0, 0);
  }

  function openPost(id, fallbackUrl, cardEl) {
    fetch("https://dev.to/api/articles/" + id, { cache: "no-store" })
      .then(function (res) {
        if (res.status === 404) {
          if (cardEl) cardEl.remove();
          showUnavailable();
          return null;
        }
        if (!res.ok) throw new Error("Article not found");
        return res.json();
      })
      .then(function (post) {
        if (!post) return; // 404 already handled above
        const tags = (post.tag_list && post.tag_list.join(" · ")) || "Blog";
        readerMeta.innerHTML = [
          '<p class="blog-category">' + tags + '</p>',
          '<span class="dot"></span>',
          '<time datetime="' + post.published_at + '">' + formatDate(post.published_at) + '</time>'
        ].join("");
        readerTitle.textContent = post.title;
        readerBody.innerHTML = post.body_html +
          '<p style="margin-top:24px;"><a class="text-link" href="' + post.url +
          '" target="_blank" rel="noopener" style="display:inline;">Read & comment on DEV →</a></p>';

        listView.style.display = "none";
        readerView.style.display = "block";
        window.scrollTo(0, 0);
      })
      .catch(function () {
        // genuine network error (not a 404) — try opening it directly
        if (fallbackUrl) window.open(fallbackUrl, "_blank", "noopener");
      });
  }

  listEl.addEventListener("click", function (e) {
    const link = e.target.closest("[data-id]");
    if (!link) return;
    e.preventDefault();
    const cardEl = link.closest("[data-post-id]");
    openPost(link.getAttribute("data-id"), link.getAttribute("data-url"), cardEl);
  });

  if (backBtn) {
    backBtn.addEventListener("click", function () {
      readerView.style.display = "none";
      listView.style.display = "block";
    });
  }

  if (!DEVTO_USERNAME || DEVTO_USERNAME === "your-devto-username") {
    showEmpty("Add your dev.to username in assets/js/blog.js to show posts here.");
    return;
  }

  function fetchViaFunction() {
    return fetch("/.netlify/functions/devto-posts", { cache: "no-store" })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (Array.isArray(data)) return data;
        throw new Error((data && data.error) || "function returned no posts");
      });
  }

  function fetchViaPublicApi() {
    return fetch("https://dev.to/api/articles?username=" + encodeURIComponent(DEVTO_USERNAME), { cache: "no-store" })
      .then(function (res) { return res.json(); })
      .then(function (data) { return Array.isArray(data) ? data : []; });
  }

  fetchViaFunction()
    .catch(fetchViaPublicApi)
    .then(function (posts) {
      renderList(posts);
    })
    .catch(function () {
      showEmpty("Couldn't load posts from dev.to right now — please check back later.");
    });
})();
