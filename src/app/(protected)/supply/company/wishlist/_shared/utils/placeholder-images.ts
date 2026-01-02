// Placeholder images for products without images
export const PRODUCT_PLACEHOLDER_IMAGES = [
  "https://media.istockphoto.com/id/1053820220/tr/foto%C4%9Fraf/%C3%A7anta-sokakta-oturan-kad%C4%B1n-k%C4%B1demli.jpg?s=612x612&w=0&k=20&c=d7-XoPORvT1nVLnaIsAay99jMHvSE0wY-pXgq3UMtdg=",
  "https://media.istockphoto.com/id/480556950/tr/foto%C4%9Fraf/temple-in-reflection.jpg?s=612x612&w=0&k=20&c=Xes-CwUSQRA8_i41U5SeohkvxifqgeCx017gEZBU_fk=",
  "https://media.istockphoto.com/id/609686580/tr/foto%C4%9Fraf/girl-in-st-petersburg.jpg?s=612x612&w=0&k=20&c=wmLinUuKJlKbm7jxSau3r-n4ZYsuPufW7nsgFuiXOc8=",
  "https://media.istockphoto.com/id/1159164272/tr/foto%C4%9Fraf/pasta-haz%C4%B1rlama.jpg?s=612x612&w=0&k=20&c=ZlsNwg-rtm2xIyHCi8hTyM6VaXOf34fTKugP8dpSu54=",
  "https://media.istockphoto.com/id/1148009067/tr/foto%C4%9Fraf/ortak-starling-pili%C3%A7-ve-ebeveyn.jpg?s=612x612&w=0&k=20&c=cbiqUuhDWNXngoGyF-iJNGdEHPzJAxRwTQ1I_w7hUkw=",
  "https://media.istockphoto.com/id/187494109/tr/foto%C4%9Fraf/black-rubber-duck-in-a-row-of-yellow-rubber-ducks.jpg?s=612x612&w=0&k=20&c=Pu1NrvvIRVYvEolC2ueDLNqN_q6o50D_XHhCFsD2tmg=",
  "https://media.istockphoto.com/id/1011777484/tr/foto%C4%9Fraf/bulut-f%C4%B1rt%C4%B1na-g%C3%B6ky%C3%BCz%C3%BC-ile-k%C4%B1rsal-manzara-%C3%BCzerinde-y%C4%B1ld%C4%B1r%C4%B1m.jpg?s=612x612&w=0&k=20&c=E_IMkM3bDDubsN1srz_-fPaX2yM2LyhB9KkmLXHrq6o=",
  "https://media.istockphoto.com/id/1162416364/tr/foto%C4%9Fraf/mutlu-do%C4%9Fum-g%C3%BCn%C3%BC-k%C3%B6pe%C4%9Fi.jpg?s=612x612&w=0&k=20&c=m--0mHdHIZ81AClMsvxVwDjyXh4k8UalUTvDpfter_Y=",
  "https://media.istockphoto.com/id/1162401822/tr/foto%C4%9Fraf/monument-vadisi-nde-gece-f%C4%B1rt%C4%B1na.jpg?s=612x612&w=0&k=20&c=A6BRiLBsawwXQzoMZhb5d2MNN9I9dTydxycoLD1rpDs=",
  "https://media.istockphoto.com/id/685591246/tr/foto%C4%9Fraf/ucube-pembe-plastik-flamingo.jpg?s=612x612&w=0&k=20&c=wjqtJv35qdULKqJmqzzJBFivwdE2dT5CKlEJH9IfCBU=",
];

/**
 * Returns a consistent placeholder image based on an index
 * If no index provided, returns a random placeholder
 */
export const getRandomPlaceholderImage = (index?: number): string => {
  if (index !== undefined) {
    return PRODUCT_PLACEHOLDER_IMAGES[
      index % PRODUCT_PLACEHOLDER_IMAGES.length
    ];
  }
  const randomIndex = Math.floor(
    Math.random() * PRODUCT_PLACEHOLDER_IMAGES.length
  );
  return PRODUCT_PLACEHOLDER_IMAGES[randomIndex];
};
