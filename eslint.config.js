import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'no-console': 'warn',
    'unused-imports/no-unused-vars': 'warn',
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 1,
      },
      multiline: {
        max: 1,
      },
    }],
    'vue/max-len': ['error', {
      code: 80,
      template: 80,
      tabWidth: 2,
      ignoreComments: true,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true,
      ignoreHTMLAttributeValues: true,
      ignoreHTMLTextContents: true,
    }],
    'style/newline-per-chained-call': ['error', {
      ignoreChainWithDepth: 2,
    }],
  },
})
