import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
	title: 'Jet Lag The Game',
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
					editUrl: 'https://github.com/teakivy/jet-lag/tree/master/',
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
		// Replace with your project's social card
		image: 'img/docusaurus-social-card.jpg',
		navbar: {
			title: 'Hide and Seek',
			logo: {
				alt: 'My Site Logo',
				src: 'img/jetlag.png',
			},
			items: [
				{
					type: 'docSidebar',
					sidebarId: 'tutorialSidebar',
					position: 'left',
					label: 'Rulebook',
				},
				{ to: '/deck', label: 'Hider Deck', position: 'left' },
				{ to: '/matching', label: 'Investigation Book', position: 'left' },
				{
					href: 'https://github.com/teakivy/jet-lag',
					label: 'GitHub',
					position: 'right',
				},
			],
		},
		footer: {
			style: 'dark',
			links: [
				{
					title: 'Rulebook',
					items: [
						{
							label: 'Quick Start Guide',
							to: '/docs/quick_start_guide',
						},
						{
							label: 'Setting Up Your Map',
							to: '/docs/setting_up_your_map',
						},
						{
							label: 'Seeking',
							to: '/docs/seeking',
						},
						{
							label: 'Hiding',
							to: '/docs/hiding',
						},
						{
							label: 'General Tips',
							to: '/docs/general_tips',
						},
						{
							label: 'Experimental Game Designs',
							to: '/docs/experimental_game_designs',
						},
					],
				},
				{
					title: 'Community',
					items: [
						{
							label: 'Nebula',
							href: 'https://nebula.tv/jetlag',
						},
						{
							label: 'YouTube',
							href: 'https://www.youtube.com/c/jetlagthegame',
						},
						{
							label: 'Discord',
							href: 'https://discord.com/invite/jetlag',
						},
					],
				},
				{
					title: 'More',
					items: [
						{
							label: 'Blog',
							to: '/blog',
						},
						{
							label: 'GitHub',
							href: 'https://github.com/facebook/docusaurus',
						},
					],
				},
			],
			copyright: `Copyright © ${new Date().getFullYear()} Collin Jones. Built with Docusaurus. Not affiliated with Jet Lag The Game or Wendover Productions.`,
		},
		prism: {
			theme: prismThemes.github,
			darkTheme: prismThemes.dracula,
		},
	} satisfies Preset.ThemeConfig,
};

export default config;
