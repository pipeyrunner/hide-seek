import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
	title: 'Jet Lag',
	tagline: 'Hide and Seek',
	favicon: 'img/favicon.ico',

	// Set the production url of your site here
	url: 'https://your-docusaurus-site.example.com',
	// Set the /<baseUrl>/ pathname under which your site is served
	// For GitHub pages deployment, it is often '/<projectName>/'
	baseUrl: '/',

	// GitHub pages deployment config.
	// If you aren't using GitHub pages, you don't need these.
	organizationName: 'teakivy', // Usually your GitHub org/user name.
	projectName: 'jet-lag', // Usually your repo name.

	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',

	// Even if you don't use internationalization, you can use this field to set
	// useful metadata like html lang. For example, if your site is Chinese, you
	// may want to replace "en" with "zh-Hans".
	i18n: {
		defaultLocale: 'en',
		locales: ['en'],
	},

	presets: [
		[
			'classic',
			{
				docs: {
					sidebarPath: './sidebars.ts',
					// Please change this to your repo.
					// Remove this to remove the "edit this page" links.
				},
				// blog: {
				//   showReadingTime: true,
				//   feedOptions: {
				//     type: ['rss', 'atom'],
				//     xslt: true,
				//   },
				//   // Please change this to your repo.
				//   // Remove this to remove the "edit this page" links.
				//   editUrl:
				//     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
				//   // Useful options to enforce blogging best practices
				//   onInlineTags: 'warn',
				//   onInlineAuthors: 'warn',
				//   onUntruncatedBlogPosts: 'warn',
				// },
				theme: {
					customCss: './src/css/custom.css',
				},
			} satisfies Preset.Options,
		],
	],

	themeConfig: {
		colorMode: {
			defaultMode: 'light',
			disableSwitch: true,
			respectPrefersColorScheme: false,
		},
		// Replace with your project's social card
		image: 'img/docusaurus-social-card.jpg',
		navbar: {
			title: 'Hide and Seek',
			logo: {
				alt: 'Jet Lag Logo',
				src: 'img/jetlag.png',
			},
			items: [
				{
					type: 'docSidebar',
					sidebarId: 'tutorialSidebar',
					position: 'left',
					label: 'Правила',
				},
				{ to: '/cards', label: 'Карты', position: 'left' },
				{
					to: '/investigation/matching',
					label: 'Списки вопросов',
					position: 'left',
					activeBaseRegex: '/investigation/',
				},
				{
					to: '/your_deck',
					label: 'Ваша колода',
					position: 'left',
				},

				{ to: '/map_generator', label: 'Генератор карт', position: 'right' },
				{
					href: 'https://t.me/cult_bochki',
					label: 'ТГ',
					position: 'right',
				},
			],
		},
		footer: {
			style: 'dark',
			links: [
				{
					title: 'Hide and Seek',
					items: [
						{
							label: 'Правила',
							to: '/docs/quick_start_guide',
						},
						{
							label: 'Карты',
							to: '/cards',
						},
						{
							label: 'Списки вопросов',
							to: '/investigation/matching',
						},
						{
							label: 'Справка',
							to: '/disclaimer',
						},
					],
				},
				{
					title: 'Community',
					items: [
						{
							label: 'YouTube',
							href: 'https://www.youtube.com/c/jetlagthegame',
						},
						
					],
				},
				{
					title: 'From the Creator',
					items: [
						{
							label: 'Portfolio',
							href: 'https://collinj.dev',
						},
						{
							label: 'GitHub',
							href: 'https://github.com/teakivy',
						},
						{
							label: 'X/Twitter',
							href: 'https://twitter.com/TeakIvyYT',
						},
					],
				},
			],
			copyright: `Мы не являемся создателями игры. Перед вами онлайн версия карточной игры, переведенная на русский язык для удобство использования.`,
		},
		prism: {
			theme: prismThemes.github,
			darkTheme: prismThemes.dracula,
		},
	} satisfies Preset.ThemeConfig,
};

export default config;
