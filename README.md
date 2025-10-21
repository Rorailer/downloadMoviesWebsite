# Movie Discovery Web App
# Pagination

The app features a responsive pagination component for browsing large lists of movies. Pagination automatically updates and rerenders whenever the current page changes, ensuring a smooth user experience.

- **Desktop View:**
    - Displays page buttons with ellipsis for long lists.
    - Always shows the first and last page, with a window of pages around the current selection.
    - The current page is highlighted and non-clickable.
- **Mobile View:**
    - Shows simple navigation with "Back", "Next", and the current page number.
    - Optimized for touch and small screens.

Recent improvements ensure that pagination rerenders instantly when the user selects a new page, and the button logic avoids duplicates or non-functional buttons.

This is a web application built with React that allows users to discover, search, and view details about movies. It fetches data from the YTS API and provides an interface to select movies for download.

## Features

- **Browse Movies**: On launch, the app displays a grid of the latest and most popular movies.
- **Search Functionality**: Users can search for movies using the navigation bar.
- **Detailed Movie Popup**: Clicking on a movie card opens a detailed popup with:
  - Movie title, year, and genres.
  - A brief summary of the plot.
  - An embedded YouTube trailer.
  - Options to download the movie in 1080p or 720p.
- **Responsive Design**: The layout and images adapt to different screen sizes.
- **Loading Animations**: Smooth animations provide feedback to the user while data is being fetched.
- **Webhook Integration**: Download requests are sent to an n8n webhook, which can be configured to trigger actions like adding a torrent to a download client.

## Tech Stack

- **Frontend**: React.js, Vite
- **Styling**: CSS
- **Animations**: Anime.js
- **Linting**: ESLint

## APIs Used

- **Movie Data**: [YTS API (v2)](https://yts.mx/api)
- **Download Handling**: A custom [n8n](https://n8n.io/) webhook.

## Project Structure

```
src/
├── App.jsx           # Main application component
├── main.jsx          # Entry point of the React app
├── assets/           # Static assets like images
├── components/       # Reusable React components
│   ├── card.jsx      # Movie card component
│   ├── navbar.jsx    # Navigation bar with search
│   └── popup.jsx     # Popup for movie details
├── css/              # CSS stylesheets
│   ├── card.css
│   ├── Details.css
│   ├── home.css
│   ├── navbar.css
│   └── popup.css
├── scripts/          # API interaction logic
│   ├── torrentApi.jsx # Handles sending data to the n8n webhook
│   └── ytsApi.jsx     # Fetches movie data from the YTS API
└── webpages/         # Main pages of the application
    ├── Details.jsx   # (Not currently used)
    └── Home.jsx      # The main page with the movie grid
```

## How It Works

1.  **`App.jsx`**: The root component that renders the `Home` page.
2.  **`Home.jsx`**: This is the main component that manages the state for the list of movies (`movies`), the visibility of the popup (`isPopupVisible`), and the loading state (`isLoading`).
    -   It fetches an initial list of movies from the YTS API using `featurePage()` from `ytsApi.jsx`.
    -   It renders a grid of `Card` components, passing movie details to each.
    -   When a search is performed, it calls `searchMovies()` to get new results.
3.  **`card.jsx`**: Displays a movie's cover image, title, and year. When clicked, it updates the `isPopupVisible` state in the `Home` component to show the `Popup`.
4.  **`popup.jsx`**: This component is rendered when `isPopupVisible` contains movie data.
    -   It displays detailed information about the movie.
    -   It includes an `iframe` for the YouTube trailer.
    -   The download buttons (`1080p`, `720p`) trigger the `handleDownload` function, which finds the correct torrent URL.
5.  **`torrentApi.jsx`**: The `sendToN8nWebhook` function is called with the torrent URL. It sends a `POST` request to a predefined n8n webhook URL, passing the magnet link and movie title. This decouples the frontend from the download client.
6.  **`ytsApi.jsx`**: Contains functions to interact with the YTS API for fetching featured movies, movie details, and search results.

## Getting Started

### Prerequisites

- Node.js
- A package manager like `npm`, `yarn`, or `bun`. This project uses `bun`.

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd <project-directory>
    ```
3.  Install the dependencies:
    ```bash
    bun install
    ```

### Running the Development Server

To run the app in development mode, use:

```bash
bun run dev
```

This will start the Vite development server, and you can view the application at `http://localhost:5173` (or another port if 5173 is in use).

### Building for Production

To create a production build of the app, run:

```bash
bun run build
```

This will create a `dist` folder with the optimized and minified files ready for deployment.

### Linting

To run the linter and check for code quality issues, use:

```bash
bun run lint
```

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# downloadMoviesWebsite ()
