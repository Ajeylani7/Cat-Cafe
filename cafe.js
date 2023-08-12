// Adam Jeylani - Project 1 - WEBD-146

"use strict";

$(document).ready(() => {
  const item_costs = {
    espresso: 1.95,
    latte: 2.95,
    cappuccino: 3.45,
    coffee: 1.75,
    biscotti: 1.95,
    scone: 2.95,
  };
  $("ul img").each((index, element) => {
    const image = new Image();
    image.src = $(element).attr("id");
  });

  $("ul img").hover(
    function () {
      const rollover_image = $(this).attr("id");
      $(this).attr("src", rollover_image);
    },

    function () {
      const original_image = $(this).attr("src");
      $(this).attr("src", original_image);
    }
  );

  $("ul img").click(function () {
    const item_name = $(this).attr("alt");
    const item_price = item_costs[item_name.toLowerCase()];
    const all_items = `<option value="${item_price}">${item_name}</option>`;
    $("#order").append(all_items);

    let total_update = parseFloat($("#total").text().replace("Total: $", ""));
    if (isNaN(total_update)) {
      total_update = 0;
    }
    const new_total = total_update + item_price;
    $("#total").text(`Total: $${new_total.toFixed(2)}`);

    $("#bunny").removeClass("hidden");
  });

  $("#place_order").click(function () {
    const order_total = parseFloat($("#total").text().replace("Total: $", ""));
    const item_list = [];

    $("#order option").each(function () {
      item_list.push($(this).text());
    });

    sessionStorage.setItem("order_total", order_total.toFixed(2));
    sessionStorage.setItem("item_list", JSON.stringify(item_list));
    window.location.href = "checkout.html";
  });

  $("#clear_order").click(function () {
    $("#order").empty();
    $("#total").text("");

    $("#bunny").addClass("hidden");
  });

  if (window.location.pathname.endsWith("checkout.html")) {
    if (
      sessionStorage.getItem("order_total") &&
      sessionStorage.getItem("item_list")
    ) {
      const order_total = sessionStorage.getItem("order_total");
      const item_list = JSON.parse(sessionStorage.getItem("item_list"));
      $("#order_total").text("$" + order_total);

      const ordered_items = $("#items_ordered");
      item_list.forEach((item) => {
        const item_price = item_costs[item.toLowerCase()];
        const li = $("<li></li>").text(`${item} = $${item_price.toFixed(2)}`);
        ordered_items.append(li);
      });

      sessionStorage.removeItem("order_total");
      sessionStorage.removeItem("item_list");
    }
  }
});
