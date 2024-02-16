# DWTS Simulator

## Overview

This is a simulator inspired by the dance competition television series Dancing with the Stars airing every fall on [ABC](https://abc.com) and [Disney+](https://disneyplus.com). The show follows celebrities as they are paired up with professional dancers and compete for judges' points and audience votes over the course of several weeks to crown a winning team. Similar to the concept of the show, simulation users are able to customize their own cast and simulate a season of DWTS using randomized songs, styles, and scores. Users have the ability to save their custom casts for use in future simulations.

This sim was inspired by [BrantSteele](https://brantsteele.com/), which hosts simulations for other competition shows/media, including Big Brother, The Hunger Games, RuPaul's Drag Race, and Survivor.

Music plays an important role in DWTS and it was essential to bring that element to the simulator. Dances will feature a song preview, provided through Spotify, to give users the opportunity to discover new music and become more immersed in the sim. The music bank consists entirely of songs suggested by members of the DWTS community and songs used previously on the show. Each song in the bank corresponds to a respective style of dance based on the song's genre, mood, tempo, etc. Users are able to view the [Spotify Playlist](https://open.spotify.com/playlist/7uYftq6IC0p2GJ5SSfDQQf?si=bd6c99fbc1ed401e) equivalent of the bank and submit additional song requests through a [Google Form](https://forms.gle/vUC4rnQ6dU2AdUPK6) provided in the app.

## Development

This simulator is a progressive web app that uses a PostgreSQL database to store/retrieve cast members seen on the show (professional dancers and celebrities) and the extensive music bank described above. There is no authentication system as users are not required to create an account to use the sim. Any casts saved by the user will be stored/retrieved from their browser's local storage.

### Technologies Used

- [Typescript](https://www.typescriptlang.org/) - High-level programming language with static typing for better error-catching and overall development
- [Next.js](https://nextjs.org/docs) - React framework for building full-stack web applications using server-side rendering and static website generation
- [Chakra UI](https://chakra-ui.com/) - Modular and accessible component library that provides building blocks for React applications
- [TailwindCSS](https://tailwindcss.com/) - Modern CSS framework used for building custom user interfaces
- [Zustand](https://docs.pmnd.rs/zustand) - Simple and intuitive state management solution for React applications
- [Immer](https://immerjs.github.io/immer/) - Middleware that simplifies handling immutable states
- [PostgreSQL](https://www.postgresql.org/) - Relational database management system with focus on SQL compliance and extensibility
- [Spotify Embeds](https://developer.spotify.com/documentation/embeds) - Interactive audio previews provided directly through Spotify

## Credit

All credit surrounding simulator concepts relating to 'Dancing with the Stars' and preset images within the app belongs to ABC Network, BBC Global, and Disney+. No copyright was intended.
