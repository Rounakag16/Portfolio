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
      const banner = post.cover_image || post.social_image || "./assets/images/FriendFi-banner.svg";
      const category = (post.tag_list && post.tag_list[0]) || "Blog";
      li.innerHTML = [
        '<a href="#" data-id="' + post.id + '" data-url="' + post.url + '">',
        '  <figure class="blog-banner-box">',
        '    <img src="' + banner + '" alt="' + post.title + '" loading="lazy">',
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
      listEl.appendChild(li);
    });
  }

  function openPost(id, fallbackUrl) {
    fetch("https://dev.to/api/articles/" + id)
      .then(function (res) {
        if (!res.ok) throw new Error("Article not found");
        return res.json();
      })
      .then(function (post) {
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
        // fall back to opening the post directly on dev.to
        if (fallbackUrl) window.open(fallbackUrl, "_blank", "noopener");
      });
  }

  listEl.addEventListener("click", function (e) {
    const link = e.target.closest("[data-id]");
    if (!link) return;
    e.preventDefault();
    openPost(link.getAttribute("data-id"), link.getAttribute("data-url"));
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
    return fetch("/.netlify/functions/devto-posts")
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (Array.isArray(data)) return data;
        throw new Error((data && data.error) || "function returned no posts");
      });
  }

  function fetchViaPublicApi() {
    return fetch("https://dev.to/api/articles?username=" + encodeURIComponent(DEVTO_USERNAME))
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
