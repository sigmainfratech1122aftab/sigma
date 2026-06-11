# Random Joke Generator

A fun and interactive random joke generator that fetches jokes from the JokeAPI.

## Features

🎭 **Multiple Joke Types**
- Any (random mix)
- General jokes
- Programming jokes
- Knock-knock jokes

⚡ **Quick Actions**
- Get random jokes with one click
- Copy joke to clipboard
- Share jokes (native share on supported browsers)
- Real-time joke counter

✨ **Beautiful UI**
- Modern glassmorphism design
- Smooth animations
- Responsive layout
- Loading states

## How to Use

1. Open `index.html` in your web browser
2. Click "Get Joke" to load a random joke
3. Filter by joke type using the buttons
4. Copy the joke or share it with friends
5. Press Enter to quickly get another joke

## API Used

**JokeAPI v2** - https://v2.jokeapi.dev/

Free and open-source API providing jokes in JSON format.

## Files

- `index.html` - Main HTML structure
- `styles.css` - Styling with gradients and animations
- `script.js` - Joke fetching and UI logic
- `README.md` - Documentation

## Customization

### Add Custom Categories

Edit the `setJokeType()` function and add categories:

```javascript
// Example: Adding Dark jokes
if (selectedType === 'dark') {
    url += '/Dark';
}
```

Then add a button in HTML:

```html
<button class="filter-btn" data-type="dark" onclick="setJokeType('dark')">Dark</button>
```

### Modify API Endpoint

Change the `API_BASE` variable in `script.js`:

```javascript
const API_BASE = 'https://your-joke-api.com/joke';
```

## Browser Compatibility

- Chrome/Edge 60+
- Firefox 55+
- Safari 12+
- Opera 47+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Features Explained

### Copy to Clipboard

uses the modern Clipboard API to copy jokes.

### Native Sharing

On supported platforms (mobile devices), uses the Web Share API for native sharing.

### Keyboard Shortcuts

- Press `Enter` to get a new joke quickly

## Error Handling

- Graceful fallback if API is unavailable
- Network error messages
- Disabled buttons during loading

## License

Open source - Free to use and modify
