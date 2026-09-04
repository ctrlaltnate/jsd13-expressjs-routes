import express from "express";
const app = express();

import v1Router from "./routes/v1/index.js";

app.use(express.json());
app.use("/api/v1", v1Router);

app.get("/", (req, res) => {
  res.send(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Express Matrix</title>

    <script src="https://cdn.tailwindcss.com"></script>

    <style>
      body {
        margin: 0;
        overflow: hidden;
        background: #000;
      }

      #matrix-canvas {
        position: fixed;
        inset: 0;
        width: 100%;
        height: 100%;
      }

      .matrix-panel {
        background: rgba(0, 8, 2, 0.82);
        border: 1px solid rgba(34, 197, 94, 0.45);
        box-shadow:
          0 0 30px rgba(34, 197, 94, 0.15),
          inset 0 0 30px rgba(34, 197, 94, 0.05);
        backdrop-filter: blur(6px);
      }

      .matrix-text {
        text-shadow:
          0 0 5px #22c55e,
          0 0 15px rgba(34, 197, 94, 0.7);
      }
    </style>
  </head>

  <body class="min-h-screen text-green-400">
    <canvas id="matrix-canvas" aria-hidden="true"></canvas>

    <main class="relative z-10 flex min-h-screen items-center justify-center p-6">
      <section class="matrix-panel w-full max-w-2xl rounded-xl p-8 font-mono">
        <div class="mb-6 text-xs uppercase tracking-[0.35em] text-green-700">
          System connection established
        </div>

        <h1 class="matrix-text text-3xl font-bold tracking-tight text-green-400 md:text-4xl">
          Hello Client, I am your Server!
        </h1>

        <p class="mt-4 leading-relaxed text-green-600">
          The Express system is online. Your connection has been accepted.
        </p>

        <div class="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="/users"
            class="inline-flex items-center rounded border border-green-500
                   bg-green-500/10 px-5 py-2.5 text-sm font-bold
                   uppercase tracking-wider text-green-400 transition
                   hover:bg-green-500 hover:text-black
                   focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            GET /users
          </a>

          <span class="text-xs text-green-800">
            Try POST / PUT / DELETE using your API client.
          </span>
        </div>

        <footer class="mt-10 border-t border-green-950 pt-5 text-xs text-green-800">
          Express server // status: operational
        </footer>
      </section>
    </main>

    <script>
      const canvas = document.getElementById("matrix-canvas");
      const context = canvas.getContext("2d");

      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789" +
        "アイウエオカキクケコサシスセソタチツテト" +
        "ナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

      const fontSize = 16;
      let columns = 0;
      let drops = [];
      let animationTimer;

      function resizeCanvas() {
        const pixelRatio = window.devicePixelRatio || 1;

        canvas.width = window.innerWidth * pixelRatio;
        canvas.height = window.innerHeight * pixelRatio;
        canvas.style.width = window.innerWidth + "px";
        canvas.style.height = window.innerHeight + "px";

        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

        columns = Math.ceil(window.innerWidth / fontSize);
        drops = Array.from(
          { length: columns },
          () => Math.floor(Math.random() * -50)
        );
      }

      function drawMatrix() {
        context.fillStyle = "rgba(0, 0, 0, 0.06)";
        context.fillRect(0, 0, window.innerWidth, window.innerHeight);

        context.font = fontSize + "px monospace";

        for (let column = 0; column < drops.length; column++) {
          const character =
            characters[Math.floor(Math.random() * characters.length)];

          const x = column * fontSize;
          const y = drops[column] * fontSize;

          context.fillStyle =
            Math.random() > 0.97 ? "#d1fae5" : "#00ff41";

          context.fillText(character, x, y);

          if (
            y > window.innerHeight &&
            Math.random() > 0.975
          ) {
            drops[column] = 0;
          }

          drops[column]++;
        }
      }

      function startAnimation() {
        clearInterval(animationTimer);
        animationTimer = setInterval(drawMatrix, 45);
      }

      resizeCanvas();

      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        startAnimation();
      } else {
        context.fillStyle = "#000";
        context.fillRect(0, 0, window.innerWidth, window.innerHeight);
      }

      window.addEventListener("resize", resizeCanvas);
    </script>
  </body>
</html>`);
}

/****************************************************/
const port = 3001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Server is running at http://localhost:${port}`);
});