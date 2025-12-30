// Placeholder images for products without images
export const PRODUCT_PLACEHOLDER_IMAGES = [
  "https://media.istockphoto.com/id/1943833207/tr/foto%C4%9Fraf/woman-playing-in-club-soccer-tournament-giving-daughter-a-hug-on-the-sidelines.jpg?s=2048x2048&w=is&k=20&c=Sxrxd_c1VNJQI6wHyXgpc2E5j-iRmLpM4nPnsXbHyvU=",
  "https://media.istockphoto.com/id/2177952659/tr/foto%C4%9Fraf/dad-needs-face-paint.jpg?s=2048x2048&w=is&k=20&c=B32ciPizNTTdpZN2w9FXhwQuIbJ66VDm7OFRR4dnj2k=",
  "https://media.istockphoto.com/id/1889829405/tr/foto%C4%9Fraf/group-of-volunteers-preparing-for-renovating.jpg?s=612x612&w=0&k=20&c=vHD4sXLyoljgNASDrzB2EesR9Bn2hB2MoyYjI7pxcSU=",
  "https://media.istockphoto.com/id/1213544256/tr/foto%C4%9Fraf/arkada%C5%9Flar-%C3%A7im-%C3%BCzerinde-oturan-ve-yaz-holi-festivalinde-e%C4%9Flenmek.jpg?s=612x612&w=0&k=20&c=0sFHRjDO_Y-N6pu5n9LGBFZppgtG7nFkn4sR97tmMQk=",
  "https://media.istockphoto.com/id/1356364287/tr/foto%C4%9Fraf/close-up-of-human-hand-planting-seedling-in-soil.jpg?s=612x612&w=0&k=20&c=lXthKDVfF9Y8pR3Clss7lqBXLvbxBCr7GJ_-FZKlops=",
  "https://media.istockphoto.com/id/1411772543/tr/foto%C4%9Fraf/side-view-of-cheerful-male-and-female-volunteers-sorting-donation-boxes.jpg?s=612x612&w=0&k=20&c=7YdXmH5qx8P46jKYQqmL4z_MqKKCQm6eOvh4vRfXNg4=",
  "https://media.istockphoto.com/id/1432945701/tr/foto%C4%9Fraf/happy-children-playing-outdoors.jpg?s=612x612&w=0&k=20&c=8p8h_iP7qT2TJUqLQZkz7rVfYq5YsXYpz9lQ8tR5yK8=",
  "https://media.istockphoto.com/id/1369509413/tr/foto%C4%9Fraf/young-woman-volunteering-at-food-bank.jpg?s=612x612&w=0&k=20&c=M5TqMh6C8pXQ6bX7zJ8hZ9cK6qY8jQ9TmD5gX8tY6bE=",
  "https://media.istockphoto.com/id/1303835904/tr/foto%C4%9Fraf/group-of-diverse-people-working-together.jpg?s=612x612&w=0&k=20&c=7dY5jL9qK6pR8hT9zJ7cV8mN6bX5tQ9wP7gY8jK6rT8=",
  "https://media.istockphoto.com/id/1318134789/tr/foto%C4%9Fraf/happy-family-enjoying-summer-day.jpg?s=612x612&w=0&k=20&c=8T5rQ9pJ7mK6hL8jY9tR7bN6cZ5qP8wX7gT9jL6sY8=",
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
