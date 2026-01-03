/*
TemplateMo 560 Astro Motion - Cleaned
*/

$(document).ready(function () {
  // Menu handling
  $(".navbar-nav .nav-link").on("click", function () {
    // Hide mobile menu
    $(".navbar-collapse").collapse("hide");

    // Update selected state
    $(".navbar-nav .nav-item").removeClass("selected");
    $(this).parent().addClass("selected");
  });

  // Close menu when clicking outside
  $(document).click(function (event) {
    var clickover = $(event.target);
    var _opened = $(".navbar-collapse").hasClass("show");
    if (_opened === true && !clickover.closest(".navbar").length) {
      $(".navbar-toggler").click();
    }
  });

  // Smooth scroll for anchor links (optional but nice)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100, // Offset for navbar
          behavior: "smooth",
        });
      }
    });
  });
});

$(window).on("load", function () {
  // Any load time logic if needed
});
