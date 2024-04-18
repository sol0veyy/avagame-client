const {nextui} = require("@nextui-org/react");

module.exports = {
    content: [
      './src/**/*.{tsx,ts}',
      './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
      extend: {},
    },
    darkMode: "class",
    plugins: [nextui()],
}