const precss = require('precss')
const fs = require('fs')
const postcss = require('postcss')
const autoprefixer = require('autoprefixer')
const nano = require('cssnano')
const listSelectorsPlugin = require('list-selectors').plugin;

let mySelectorList;

fs.readFile('src/onefile.css', (err, css) => {
    postcss([precss, autoprefixer, nano])
        .process(css, { from: 'src/onefile.css', to: 'src/onestyle.less' })
        .then(result => {
            fs.writeFile('src/onestyle.less', result.css, () => true)
            if (result.map) {
                fs.writeFile('src/onestyle.less.map', result.map, () => true)
            }
        })
})

let css = fs.readFileSync('src/onestyle.less', 'utf8');
let listOpts = { include: ['ids', 'classes'] };
postcss(listSelectorsPlugin(listOpts, function (list) { mySelectorList = list; }))
    .process(css)
    .then(function () {
        console.log(mySelectorList);
    });