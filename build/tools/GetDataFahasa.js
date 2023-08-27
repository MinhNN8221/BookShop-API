"use strict";

function handleData(cat, start, xxx) {
    res = "";
    res2 = "";
    des = "'Morbi commodo a diam quis tempus. Nulla porta volutpat vulputate. Integer volutpat metus in leo tincidunt placerat. Aliquam molestie augue nec purus sollicitudin, eget congue elit tristique. Fusce eleifend maximus ex vel dapibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas ac dolor sit amet tortor luctus viverra. Duis sed dignissim arcu. Nulla pretium egestas nibh nec pulvinar. Vivamus augue elit, pharetra ac lacus vitae, lacinia ultrices nibh. Curabitur sed neque metus. Nullam in elit non neque suscipit tempor. Aliquam ullamcorper porttitor neque, sed blandit sem malesuada non. Nullam at pretium lorem, in egestas diam. In arcu velit, fringilla eu eros eu, rutrum scelerisque tellus. Sed sem tellus, consectetur tristique dictum viverra, molestie aliquet nisi.'";
    for (i = start; i < xxx.product_list.length + start; i++) {
        cur = xxx.product_list[i - start];
        if (cur.product_price) {
            res += "(" + i + ", '" + cur.product_name + "', " + des + ", " + cur.product_price.replaceAll(/\./g, "") + ", " + cur.product_finalprice.replaceAll(/\./g, "") + ", '" + cur.image_src + "', '', '" + cur.image_src + "', 0)," + "\n";
            res2 += "(" + i + ", " + cat + "),";
        }
    }
    console.log(res);
    console.log(res2);
}

fetch('https://www.fahasa.com/fahasa_catalog/product/loadproducts?category_id=207&currentPage=1&limit=100&order=num_orders&series_type=0').then(function (res) {
    return res.json();
}) // the .json() method parses the JSON response into a JS object literal
.then(function (data) {
    handleData(15, 869, data);
});