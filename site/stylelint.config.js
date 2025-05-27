export default {
	extends: ['stylelint-config-standard', 'stylelint-config-html/svelte'],
	rules: {
		'selector-pseudo-class-no-unknown': [
			true,
			{
				ignorePseudoClasses: ['global']
			}
		]
	},
	overrides: [
		{
			files: ['**/*.svelte'],
			customSyntax: 'postcss-html'
		}
	],
	ignoreFiles: ['build/**', 'coverage/**', 'dist/**', '.svelte-kit/**', 'node_modules/**']
};
