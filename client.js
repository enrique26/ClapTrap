// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import { ReactInstance, Surface } from 'react-360-web';

function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    ...options,
  });

   const SIZE = 600;
   const SIZE2 = 800;


   // SPHERE
   const sphereSurface = new Surface(
     1300,
     1100,
     Surface.SurfaceShape.Flat,
   );
   sphereSurface.setAngle(Math.PI, 0);
   r360.renderToSurface(
     r360.createRoot('Puzzle', { name: 'Puzzle' }),
     sphereSurface,
   );

   // CAPSULE
  const capsuleSurface = new Surface(
    SIZE2,
    SIZE2,
    Surface.SurfaceShape.Flat,
  );
  capsuleSurface.setAngle(Math.PI / 2, 0);
  r360.renderToSurface(
    r360.createRoot('Deer', { name: 'Capsule' }),
    capsuleSurface,
  );

  // CUBE
   const cubeSurface = new Surface(
     SIZE2,
     SIZE2,
     Surface.SurfaceShape.Flat,
   );
   cubeSurface.setAngle(-1 * Math.PI / 2, 0);
   r360.renderToSurface(
     r360.createRoot('Wolf', { name: 'Cube' }),
     cubeSurface,
   );

  const flatC = new Surface(
    1000,
    800,
    Surface.SurfaceShape.Cylinder,
  );
  // Render your app content to the default cylinder surface
  // flatC.setAngle(0,0.5);
  r360.renderToSurface(
    r360.createRoot('Clap360', { name:"main"/* initial props */ }),
    flatC
  );

  // Load the initial environment
  r360.compositor.setBackground(r360.getAssetURL('city.jpg'));

}

window.React360 = {init};
