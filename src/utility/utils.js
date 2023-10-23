export const scrollToBottom = () => {
  var secondContent = document.getElementById(
    "bottom",
  );
  var leftSection = document.getElementById("top");
  if (leftSection) {
    leftSection.scrollTop = secondContent.offsetTop + secondContent.offsetHeight;
  }
}