const CRACOLessPlugin = require('craco-less');
const CRACOAntDesignPlugin = require("craco-antd");
const CRACOAlias = require("craco-alias");
const path = require("path");

module.exports = {
    plugins: [
        {
            plugin: CRACOAntDesignPlugin,
            options: {
                customizeThemeLessPath: path.join(__dirname, "src/theme.less"),
            },
        },
        {
            plugin: CRACOLessPlugin,
            options: {
                cssLoaderOptions: {
                    modules: {localIdentName: '[local]_[hash:base64:5]'},
                },
                modifyLessRule: function (lessRule, _context) {
                    lessRule.test = /\.(module)\.(less)$/;
                    lessRule.exclude = path.join(__dirname, 'node_modules');
                    return lessRule;
                }
            }
        },
        {
            plugin: CRACOAlias,
            options: {
                source: "tsconfig",
                baseUrl: "./src",
                tsConfigPath: "./tsconfig.path.json"
            }
        }
    ]
};