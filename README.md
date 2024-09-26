# HackerNews App

This app interacts with the HackerNews API to analyze story titles.

## Endpoints

1. **GET /hackernews/top-words/latest**
   - Returns the top 10 most occurring words in the titles of the last 25 stories.

2. **GET /hackernews/top-words/last-week**
   - Returns the top 10 most occurring words in the titles of the last week's stories.

3. **GET /hackernews/top-words/high-karma-users**
   - Returns the top 10 most occurring words in titles of the last 600 stories from users with at least 10,000 karma.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/hackernews-app.git
   cd hackernews-app
