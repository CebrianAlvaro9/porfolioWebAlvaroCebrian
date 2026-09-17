import assert from "node:assert/strict"
import { existsSync, readFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import test from "node:test"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const read = (file) => {
  const absolutePath = resolve(root, file)
  return existsSync(absolutePath) ? readFileSync(absolutePath, "utf8") : ""
}

test("the layout mounts one shared cinematic effects controller", () => {
  const layout = read("src/layouts/Layout.astro")
  const effects = read("src/components/ScrollEffects.astro")

  assert.match(layout, /ScrollEffects/)
  assert.match(effects, /data-snow-cursor/)
})

test("interactive page layers expose reveal and hero scroll contracts", () => {
  const page = read("src/pages/index.astro")
  const projects = read("src/components/Projects.astro")

  assert.match(page, /data-reveal/)
  assert.match(page, /data-scroll-hero/)
  assert.match(projects, /data-card-tilt/)
})

test("the effects controller has native, accessible progressive enhancement", () => {
  const effects = read("src/components/ScrollEffects.astro")

  assert.match(effects, /IntersectionObserver/)
  assert.match(effects, /requestAnimationFrame/)
  assert.match(effects, /prefers-reduced-motion/)
  assert.match(effects, /pointermove/)
})

test("the portfolio content keeps the updated profile, timeline, and featured project", () => {
  const hero = read("src/components/Hero.astro")
  const about = read("src/components/AboutMe.astro")
  const experience = read("src/components/Experience.astro")
  const projects = read("src/components/Projects.astro")

  assert.match(hero, /avatar\.png/)
  assert.match(about, /avatar\.png/)
  assert.match(experience, /Junio 2023 - Marzo 2025/)
  assert.match(experience, /Marzo 2025 - Abril 2026/)
  assert.match(experience, /Fútbol Emotion/)
  assert.match(experience, /Frontend Intern/)
  assert.match(experience, /Como becario/)
  assert.doesNotMatch(experience, /date: "Anteriormente"/)
  assert.match(projects, /FUEL APP/)
  assert.match(projects, /https:\/\/cebrianalvaro9\.github\.io\/fuel-app\//)
  assert.match(projects, /https:\/\/github\.com\/CebrianAlvaro9\/fuel-app/)
  assert.match(projects, /gasolineras en España/)
  assert.match(projects, /opciones más baratas/)
})

test("the shirt palette and Fuel dashboard image have dedicated UI contracts", () => {
  const styles = read("src/styles/global.css")
  const projects = read("src/components/Projects.astro")

  assert.match(styles, /--shirt-lilac:/)
  assert.match(styles, /\.project-card--fuel/)
  assert.match(styles, /aspect-ratio: 16 \/ 9/)
  assert.match(projects, /project-card--fuel/)
  assert.match(projects, /project-image/)
})
