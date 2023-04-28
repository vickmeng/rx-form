module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'standard',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      // jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-alert': 2, // 禁止使用alert confirm prompt
    'no-console': 2, // 禁止使用console
    'no-const-assign': 2, // 禁止修改const声明的变量
    'no-constant-condition': 2, // 禁止在条件中使用常量表达式 if(true) if(1)
    'no-debugger': 2, // 禁止使用debugger
    'no-extra-semi': 2, // 禁止多余的冒号
    'no-func-assign': 2, // 禁止重复的函数声明
    'no-irregular-whitespace': 2, // 不能有不规则的空格
    'no-multiple-empty-lines': [2, { max: 2 }], // 空行最多不能超过2行
    'no-nested-ternary': 2, // 禁止使用嵌套的三目运算
    'no-redeclare': 2, // 禁止重复声明变量
    'no-sequences': 1, // 禁止使用逗号运算符
    'no-shadow': 2, // 外部作用域中的变量不能与它所包含的作用域中的变量或参数同名
    'no-shadow-restricted-names': 2, // 严格模式中规定的限制标识符不能作为声明时的变量名使用
    'no-spaced-func': 1, // 函数调用时 函数名与()之间不能有空格
    'no-trailing-spaces': 2, // 一行结束后面不要有空格
    'no-undef': 2, // 不能有未定义的变量
    'no-use-before-define': 0, // 未定义前不能使用
    'no-var': 0, // 禁用var，用let和const代替
    'no-with': 2, // 禁用with
    'array-bracket-spacing': [2, 'never'], // 是否允许非空数组里面有多余的空格
    complexity: [1, 20], // 循环复杂度
    'default-case': 2, // switch语句最后必须有default
    eqeqeq: 2, // 必须使用全等
    'max-lines': [2, 1000], // 强制最大行数
    'max-params': [1, 5], // 函数最多只能有5个参数
    'new-parens': 2, // new时必须加小括号
    quotes: [2, 'single'], // 引号类型 `` "" ''
    'jsx-quotes': 0,
    strict: 2, // 使用严格模式
    'use-isnan': 2, // 禁止比较时使用NaN，只能用isNaN()
    'import/order': [
      'error',
      {
        groups: ['external', 'builtin', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
      },
    ],
    'space-before-function-paren': 0,
    'space-in-parens': 0,
    'func-call-spacing': 0,
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
};
