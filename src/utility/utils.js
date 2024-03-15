export const scrollToBottom = () => {
  var secondContent = document.getElementById(
    "bottom",
  );
  var leftSection = document.getElementById("top");
  if (leftSection) {
    leftSection.scrollTop = secondContent.offsetTop + secondContent.offsetHeight;
  }
}
export const responseParser = (data, domain) => {
  const pluckingregex = /[\[|\(]https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9]{1,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)[\)|\]]/gm
  const here = /\[here\]/gm
  const url = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9]{1,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gm
  const imgurl = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9]{1,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)\.jpg|\.png/gm
  const newline = /(?:\r\n|\r|\n)/g

  data = data.replaceAll(newline, ' <br>');
  data = data.replaceAll(here, "")

  //replaces most of the urls with working hyperlinks or image src
  data = data.replace(pluckingregex, function (matched) {
    if (matched.match(imgurl)) {
      return ` <img src=${matched.match(url)[0]} class="product-image"/>`
    }
    else {
      return ` <a href=${matched.match(url)[0]} target="_blank" class="hyperlink"> Go to Page </a>`
    }
  })

  data = convertRelativeToAbsolute(data, domain)
  data = boldify(data)
  return data;
}

function convertRelativeToAbsolute(inputString, domain = "https://www.shiseido.com") {
  // Regular expression to match relative URLs in brackets ending with ".html"
  // var relativeUrlRegex = /\((\/[^)]+\.html)\)/g;
  var relativeUrlRegex = /\(([^)]+)\)/g;

  // Replace relative URLs with absolute URLs in anchor tags
  var resultString = inputString.replace(relativeUrlRegex, function (match, p1) {
    // Construct absolute URL by concatenating domain and relative path
    var absoluteUrl = domain + p1.trim();
    // Create an HTML anchor tag
    return '<a href="' + absoluteUrl + '" target="_blank" class="hyperlink"> Go to Page </a>';
  });

  return resultString;
}

function boldify(sentence) {
  // Regular expression to match words enclosed within **
  var regex = /\*\*(.*?)\*\*/g;

  // Replace matched words with bold tags
  var result = sentence.replace(regex, "<b>$1</b>");

  return result;
}

