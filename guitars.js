(() => {
  "use strict";

  const viewer = document.querySelector("#guitar-viewer");
  const viewerImage = document.querySelector("#viewer-image");
  const viewerTitle = document.querySelector("#viewer-title");
  const closeButton = document.querySelector("#viewer-close");
  const openButtons = document.querySelectorAll(".guitar-open");

  if (!viewer || !viewerImage || !viewerTitle || !closeButton) {
    return;
  }

  const openViewer = (button) => {
    const imagePath = button.dataset.image;
    const title = button.dataset.title;

    if (!imagePath || !title) {
      return;
    }

    viewerImage.src = imagePath;
    viewerImage.alt = `Enlarged view of ${title}`;
    viewerTitle.textContent = title;
    viewer.showModal();
  };

  openButtons.forEach((button) => {
    button.addEventListener("click", () => openViewer(button));
  });

  closeButton.addEventListener("click", () => viewer.close());

  viewer.addEventListener("click", (event) => {
    if (event.target === viewer) {
      viewer.close();
    }
  });

})();
