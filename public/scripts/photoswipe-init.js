import PhotoSwipeLightbox from 'photoswipe/lightbox';

const initGalleries = async () => {
  const galleryEls = document.querySelectorAll('[id^="project-gallery-"]');
  for (const galleryEl of galleryEls) {
    if (galleryEl.__pswpInit) continue;

    const anchors = Array.from(galleryEl.querySelectorAll('a[href]'));
    if (anchors.length === 0) continue;

    await Promise.all(
      anchors.map((anchor) => {
        anchor.dataset.pswpWidth = '1350';
        anchor.dataset.pswpHeight = '900';
      })
    );

    const lightbox = new PhotoSwipeLightbox({
      gallery: galleryEl,
      children: 'a',
      pswpModule: () => import('photoswipe').then((mod) => mod.default),
      showHideAnimationType: 'fade',
      loop: true,
      bgOpacity: 0.8,
      spacing: 0.1,
    });

    lightbox.init();
    galleryEl.__pswpInit = true;
  }
};

document.addEventListener('DOMContentLoaded', initGalleries);
window.__initProjectGalleries = initGalleries;
