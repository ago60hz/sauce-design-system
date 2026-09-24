import { promises as fs } from "fs"
import os from "os"
import path from "path"
import * as React from "react"
import tailwind from "@tailwindcss/postcss"
import postcss from "postcss"
import { renderToStaticMarkup } from "react-dom/server"

import { Preview } from "./playground/preview"

// Registry components compile with the classic JSX runtime under tsx, and a few
// of them never import React, so expose it globally for server rendering.
Object.assign(globalThis, { React })

const WWW = process.cwd()
const PLAYGROUND = path.resolve(WWW, "../../playground/index.html")
const STYLES = path.join(WWW, "styles")

function replaceBetween(source: string, name: string, content: string) {
  const start = `<!-- ${name}:START -->`
  const end = `<!-- ${name}:END -->`
  const from = source.indexOf(start)
  const to = source.indexOf(end)
  if (from === -1 || to === -1) {
    throw new Error(`Missing ${start} / ${end} markers in ${PLAYGROUND}`)
  }
  return (
    source.slice(0, from + start.length) +
    "\n" +
    content +
    "\n" +
    source.slice(to)
  )
}

async function buildPreviewCss(markupFile: string) {
  const globals = await fs.readFile(path.join(STYLES, "globals.css"), "utf8")
  const input = globals
    .replace('@import "tailwindcss";', '@import "tailwindcss" source(none);')
    .replace(/^@source .*$/m, `@source "${markupFile}";`)
  const result = await postcss([
    tailwind({ optimize: { minify: true } }),
  ]).process(input, {
    from: path.join(STYLES, "globals.css"),
  })
  return result.css
}

async function main() {
  const markup = renderToStaticMarkup(React.createElement(Preview))
  const tmp = await fs.mkdtemp(path.join(os.tmpdir(), "sauce-playground-"))
  const markupFile = path.join(tmp, "preview.html")
  await fs.writeFile(markupFile, markup)

  const css = await buildPreviewCss(markupFile)
  const tokens = await fs.readFile(path.join(STYLES, "tokens.css"), "utf8")

  let html = await fs.readFile(PLAYGROUND, "utf8")
  html = replaceBetween(html, "PREVIEW", `<style>${css}</style>\n${markup}`)
  html = replaceBetween(
    html,
    "TOKENS",
    `<script type="text/plain" id="bundled-tokens">\n${tokens.replace(/<\/script/gi, "<\\/script")}</script>`
  )
  await fs.writeFile(PLAYGROUND, html)
  await fs.rm(tmp, { recursive: true, force: true })

  console.log(
    `Playground preview rebuilt: ${(css.length / 1024).toFixed(1)} KB CSS, ${(markup.length / 1024).toFixed(1)} KB markup.`
  )
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
