function generate(json, parent) {
    for (var attr in json) {
        var ele = document.createElement('li');
        if (!json[attr] || JSON.stringify(json[attr]) === "{}" || Object.prototype.toString.call(json[attr]) !== '[object Object]' ) {
            ele.innerHTML = ' <div class="space">' + '<span class="name">' + attr + '</span>' + '<span class="dot">:</span>' + json[attr] + '</div>';
        } else {
            ele.innerHTML = '<div class="space full"><span class="switch-open" onclick="toggle(this)"></span><input type="checkbox" onclick="checkChange(this)"></input>' + attr + '</div>';
            var nextParent = document.createElement('ul');
            ele.appendChild(nextParent);
            generate(json[attr], nextParent);
        }
        parent.appendChild(ele);
    }
}

function toggle(span) {
    var ele = span.parentNode.nextElementSibling;
    if (ele.style.display == 'none') {
        ele.style.display = 'block';
        span.className = 'switch-open';

    } else {
        ele.style.display = 'none';
        span.className = 'switch-close';
    }
}

function checkChange(span) {
    var oul = span.parentNode.nextElementSibling;
    if (span.checked) {
        for (var i = 0; i < oul.querySelectorAll('input').length; i++) {
            oul.querySelectorAll('input')[i].checked = true;
        }
    } else {
        for (var i = 0; i < oul.querySelectorAll('input').length; i++) {
            oul.querySelectorAll('input')[i].checked = false;
        }
    }
}

document.getElementById('check_jquery').addEventListener('click', function () {
    chrome.devtools.inspectedWindow.eval("window.location", function (result) {
        generate(result, document.getElementById('container'));
    });
});