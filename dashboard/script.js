function toggleThemeMenu() {
  let menu = document.getElementById("themeMenu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function setTheme(theme) {
  document.body.className = theme;
  document.getElementById("themeMenu").style.display = "none";
}
