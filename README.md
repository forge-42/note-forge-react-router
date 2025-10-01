# NoteForge - Next.js App Router to React Router Migration Example

This is a fork of OrcDev [NoteForge](https://github.com/TheOrcDev/noteforge) that is an example of how to fully migrate from Next.js App Router to React Router framework mode.

You can use the link from above to see the reference project that is fully written in Next.js App Router.

If you're trying to migrate your Next.js project to React Router, you can reference the livestream where I did the migration step by step: 

https://youtube.com/live/0nH7kpXShys 

## Migration guide
 
This project migrated a fully fledged Next.js App Router project to React Router framework mode. After the migration I've realised that the
migration to TanStack Start would be almost the same as the migration to React Router framework mode, so you can use this guide to migrate to either of those two.

The only difference between the two is how you define the routes, the rest is more or less the same. With that being said here's a step by step guide on how to migrate
from Next.js to React Router framework mode or TanStack Start:

https://tanstack.com/start/latest/docs/framework/react/migrate-from-next-js

After you follow the guide above, you can use this repository as a reference on how to implement certain features that are not covered in the guide, such as authentication, 
etc in React Router framework mode.