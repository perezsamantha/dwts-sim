# DWTS Simulator

## Overview

This is a simulator inspired by the dance competition television series Dancing with the Stars currently airing on [ABC](https://abc.com) and [Disney+](https://disneyplus.com). Similar to the concept of the show, users are able to customize their own cast and simulate a season of DWTS using randomized songs, styles, and scores. Users have the ability to save their custom casts for use in future simulations.

This simulator was inspired by [BrantSteele](https://brantsteele.com/), which hosts simulations for other competition shows, including Big Brother, The Hunger Games, RuPaul's Drag Race, and Survivor.

## Development

This sim is currently a frontend-only progressive web app. There is no authentication system as users are not required to create an account to use the sim. Stored data (former celebrities, professional dancers, and music) is fetched through JSON files. Any casts saved by the user will be stored and retrieved from their browser's local storage.

### Technologies Used

- [Typescript](https://www.typescriptlang.org/) - High-level programming language with static typing for better error-catching and overall development
- [Next.js](https://nextjs.org/docs) - React framework for building full-stack web applications using server-side rendering and static website generation
- [Chakra UI](https://chakra-ui.com/) - Modular and accessible component library that provides building blocks for React applications
- [TailwindCSS](https://tailwindcss.com/) - Modern CSS framework used for building custom user interfaces
- [Zustand](https://docs.pmnd.rs/zustand) - Simple and intuitive state management solution for React applications
- [Immer](https://immerjs.github.io/immer/) - Middleware that simplifies handling immutable states
- [Spotify Embeds](https://developer.spotify.com/documentation/embeds) - Interactive audio previews provided directly from Spotify

## Credit

All credit surrounding simulator concepts relating to 'Dancing with the Stars' and preset images within the app belongs to ABC Network, BBC Global, and Disney+. No copyright was intended.
