const TARGET = process.env.npm_lifecycle_event; //判断环境

const CleanCSS = require('clean-css');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// for compatibility with optimize-css-assets-webpack-plugin
CleanCSS.process = function (input, opts) {
    var cleanCss;
    var optsTo = opts.to;

    delete opts.to;
    cleanCss = new CleanCSS(Object.assign({ returnPromise: true, rebaseTo: optsTo }, opts));

    return cleanCss.minify(input)
        .then(function (output) {
            return { css: output.styles };
        });
};

var options = {
    level: 2
};

if (TARGET == 'dev') {
    options = {
        // format: 'keep-breaks',
        format: 'beautify'
    }
}

module.exports = function() {
    return new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: CleanCSS,
        cssProcessorOptions: options,
        canPrint: true
    })
}