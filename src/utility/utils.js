export const scrollToBottom = () => {
  var secondContent = document.getElementById(
    "bottom",
  );
  var leftSection = document.getElementById("top");
  if (leftSection) {
    leftSection.scrollTop = secondContent.offsetTop + secondContent.offsetHeight;
  }
}
export const responseParser = (data) => {
  const pluckingregex = /\(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9]{1,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)\)/gm
  const here = /\[here\]/gm
  const url = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9]{1,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gm
  const newline = /(?:\r\n|\r|\n)/g

  data = data.replaceAll(newline, ' <br>');
  data = data.replaceAll(here, "")
  data = data.replace(pluckingregex, function (matched) {

    return ` <br/> <a href=${matched.match(url)[0]} target="_blank" classname="hyperlink"> Go to Page </a>`
  })

  return data;
}