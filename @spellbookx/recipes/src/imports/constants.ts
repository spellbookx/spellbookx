/**
 * @file constants.ts
 * Standard import groups and patterns shared across Spellbookx configurations.
 */

/**
 * Empty string separator indicating a blank line between import groups.
 */
export const separator = '';

/**
 * Alias for `separator` indicating a blank line between import groups.
 */
export const newline = separator;

/**
 * Short alias for `separator` indicating a blank line between import groups.
 */
export const nl = separator;

/**
 * Dotenv environment configuration packages (`@dotenvx/dotenvx`, `dotenv`).
 */
export const dotenv = ['@dotenvx/dotenvx', 'dotenv'] as const;

/**
 * Side-effect imports identifier pattern.
 */
export const sideEffects = [String.raw`^\u0000`] as const;

/**
 * Environment variable module aliases (`@env`).
 */
export const env = ['@env'] as const;

/**
 * Node.js built-in modules and `node:` prefix.
 */
export const builtinModules = [
  'assert',
  'async_hooks',
  'buffer',
  'child_process',
  'cluster',
  'console',
  'constants',
  'crypto',
  'dgram',
  'dns',
  'domain',
  'events',
  'fs',
  'http',
  'https',
  'http2',
  'inspector',
  'module',
  'net',
  'os',
  'path',
  'perf_hooks',
  'process',
  'punycode',
  'querystring',
  'readline',
  'repl',
  'stream',
  'string_decoder',
  'test',
  'timers',
  'tls',
  'trace_events',
  'tty',
  'url',
  'util',
  'v8',
  'vm',
  'wasi',
  'worker_threads',
  'zlib',
  'node:',
] as const;

/**
 * Server and backend application frameworks.
 */
export const backendFrameworks = [
  '@fastify',
  '@hapi/hapi',
  '@koa/koa',
  '@nestjs',
  'express',
  'fastify',
  'hapi',
  'koa',
  'loopback',
  'nest',
  'sails',
] as const;

/**
 * Express, Koa, and Fastify backend middleware and logging libraries.
 */
export const backendMiddlewares = [
  'body-parser',
  'connect-redis',
  'cookie-parser',
  'cors',
  'express-rate-limit',
  'express-session',
  'helmet',
  'morgan',
  'passport',
  'pino-',
  'redis',
  'winston',
] as const;

/**
 * Core frontend UI frameworks (React, Vue, Svelte, Angular, Solid).
 */
export const uiFrameworks = [
  '@angular',
  'react',
  'solid-js',
  'svelte',
  'vue',
] as const;

/**
 * React ecosystem packages including router, helmet, and internationalization.
 */
export const reactPackages = [
  '@tanstack/router',
  'react-dom',
  'react-helmet',
  'react-intl',
  'react-router',
  'react-router-dom',
] as const;

/**
 * Fullstack meta-frameworks (Next.js, Remix, SvelteKit, Nuxt, Gatsby).
 */
export const fullstackFrameworks = [
  '@nuxt/kit',
  '@remix-run',
  '@sveltejs/kit',
  'gatsby',
  'next',
] as const;

/**
 * React Native, Expo, and mobile application navigation libraries.
 */
export const reactNativeExpo = [
  '@expo',
  String.raw`^@expo\/`,
  '@react-native',
  'expo',
  'expo-',
  'react-native',
  'react-navigation',
] as const;

/**
 * Client-side state management libraries (Redux, Zustand, MobX, Jotai, Recoil, Valtio).
 */
export const stateManagement = [
  '@reduxjs/toolkit',
  'jotai',
  'mobx',
  'recoil',
  'redux',
  'valtio',
  'zustand',
] as const;

/**
 * Data fetching, API clients, and GraphQL libraries (React Query, SWR, Axios, Apollo).
 */
export const dataFetching = [
  '@apollo/client',
  '@tanstack/react-query',
  'axios',
  'graphql',
  'swr',
] as const;

/**
 * UI component and design system libraries (MUI, Radix, Tailwind, Shadcn, Chakra).
 */
export const uiLibraries = [
  '@chakra-ui',
  '@headlessui/react',
  '@lottiefiles',
  '@material-ui',
  '@mui',
  '@nextui-org/react',
  '@radix-ui',
  '@pittorica/pitto',
  'radix-ui',
  'antd',
  'framer-motion',
  'native-base',
  'react-native-paper',
  'shadcn-ui',
  'tailwindcss',
] as const;

/**
 * CSS-in-JS, styling utilities, class merging, and animation libraries.
 */
export const cssInJs = [
  '@emotion',
  'class-variance-authority',
  'clsx',
  'lucide-react',
  'styled-components',
  'tailwind-merge',
  'twin.macro',
  'tw-animate-css',
] as const;

/**
 * Icon sets and component icon packages (Lucide, FontAwesome, React Icons, Tabler).
 */
export const icons = [
  String.raw`^@expo\/vector-icons`,
  '@fortawesome',
  '@tabler/icons-react',
  'lucide',
  'react-feather',
  'react-icons',
  'react-native-feather',
  'react-native-vector-icons',
] as const;

/**
 * Unit, integration, and end-to-end testing frameworks (Vitest, Jest, Playwright, Cypress, Testing Library).
 */
export const testing = [
  '@testing-library',
  'cypress',
  'jest',
  'playwright',
  'vitest',
] as const;

/**
 * Third-party dependencies matching tokens and general npm module patterns.
 */
export const thirdParty = [
  '<THIRD_PARTY_MODULES>',
  '^[a-z]',
  String.raw`^@\w`,
] as const;

/**
 * Monorepo workspace package scope prefixes.
 */
export const monorepo = [
  '@org/',
  '^@my-org/',
  '^@workspace/',
  '^@repo/',
  '^@spellbookx/',
  '^@sbx/',
] as const;

/**
 * Application internal path aliases (`@/`, `~/`, `#/`).
 */
export const internalAliases = ['@/', '~/', '#/'] as const;

/**
 * Static media and font asset file patterns (video, audio, images, fonts, lottie).
 */
export const assets = [
  String.raw`^.+\.(avi|mkv|mov|mp4|webm)$`,
  String.raw`^.+\.(mp3|ogg|wav|weba)$`,
  String.raw`^.+\.(gif|jpe?g|png|svg|webp)$`,
  String.raw`^.+\.lottie$`,
  String.raw`^.+\.(eot|otf|ttf|woff|woff2)$`,
] as const;

/**
 * JSON file patterns.
 */
export const json = [String.raw`^.+\.json$`] as const;

/**
 * Stylesheet and preprocessor file patterns (`.css`, `.scss`, `.less`).
 */
export const styles = [
  String.raw`^.+\.less$`,
  String.raw`^.+\.s?css$`,
] as const;

/**
 * Relative file path patterns (`../`, `./`).
 */
export const relative = ['../', './', String.raw`^\.?\.\/`] as const;
